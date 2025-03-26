import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:http/http.dart' as http;


class AuthController with ChangeNotifier {
  final String _apiUrl = 'https://popbeachclub.com/api/2025-01/graphql.json';
  final String _accessToken = '0b19ca6d0a05c2f922d857d4820c4a7a'; // Replace with actual token
  final String _googleSheet = "https://script.google.com/macros/s/AKfycbxQTk3OecsnWjz5-L_qqyBV-KJe-97wSnNqojVx_fF03AOwMwvPtjBCLOwH2LGaRT17Bg/exec";

  

  Future<Map<String, dynamic>?> login(String email, String password) async {
    final HttpLink httpLink = HttpLink(
      _apiUrl,
      defaultHeaders: {
        'X-Shopify-Storefront-Access-Token': _accessToken,
        'Content-Type': 'application/json',
      },
    );

    final GraphQLClient client = GraphQLClient(
      link: httpLink,
      cache: GraphQLCache(),
    );

    const String loginMutation = """
    mutation LoginAccount(\$email: String!, \$password: String!) {
      customerAccessTokenCreate(
        input: {
          email: \$email
          password: \$password
        }
      ) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          message
        }
      }
    }
    """;

    final MutationOptions options = MutationOptions(
      document: gql(loginMutation),
      variables: {'email': email, 'password': password},
    );

    final QueryResult result = await client.mutate(options);

    if (result.hasException) {
      print('Error: ${result.exception.toString()}');
      return null;
    }

    final data = result.data?['customerAccessTokenCreate'];

    if (data != null) {
      if (data['customerUserErrors'].isNotEmpty) {
        // Handle user errors
        print('Login failed: ${data['customerUserErrors'][0]['message']}');
        return {
          'error': true,
          'message': data['customerUserErrors'][0]['message'],
        };
      }

      // Successful login response
      return {
        'accessToken': data['customerAccessToken']['accessToken'],
        'expiresAt': data['customerAccessToken']['expiresAt'],
        'error': false,
      };
    }

    return {'error': true, 'message': 'Unknown error occurred'};
  }

Future<Map<String, dynamic>?> registerUser(String firstName, String lastName, String email, String password) async {
  final HttpLink httpLink = HttpLink(
    _apiUrl,
    defaultHeaders: {
      'X-Shopify-Storefront-Access-Token': _accessToken,
      'Content-Type': 'application/json',
    },
  );

  final GraphQLClient client = GraphQLClient(
    link: httpLink,
    cache: GraphQLCache(),
  );

  const String mutation = """
    mutation RegisterAccount(
      \$firstName: String!,
      \$lastName: String!,
      \$email: String!,
      \$password: String!,
      \$acceptsMarketing: Boolean = false
    ) {
      customerCreate(
        input: {
          email: \$email,
          password: \$password,
          firstName: \$firstName,
          lastName: \$lastName,
          acceptsMarketing: \$acceptsMarketing
        }
      ) {
        customer {
          id
        }
        customerUserErrors {
          code
          message
        }
      }
    }
  """;

  final MutationOptions options = MutationOptions(
    document: gql(mutation),
    variables: {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
    },
  );

  try {
    final QueryResult result = await client.mutate(options);

    if (result.hasException) {
      Fluttertoast.showToast(msg: "❌ Error: ${result.exception.toString()}");
      debugPrint("GraphQL Exception: ${result.exception.toString()}");
      return {'error': true, 'message': result.exception.toString()};
    }

    final data = result.data?["customerCreate"];

    if (data == null) {
      Fluttertoast.showToast(msg: "❌ Unexpected error occurred.");
      debugPrint("Unexpected response: ${result.data}");
      return {'error': true, 'message': 'Unexpected error occurred'};
    }

    if (data["customer"] != null) {
      String customerId = data["customer"]["id"];
      // Fluttertoast.showToast(msg: "✅ Registration Successful! ID: $customerId");
      debugPrint("Customer Created: ID -> $customerId");
      return {'error': false, 'customerId': customerId};
    } else if (data["customerUserErrors"] != null && (data["customerUserErrors"] as List).isNotEmpty) {
      String errorMessage = data["customerUserErrors"][0]["message"];
      Fluttertoast.showToast(msg: "❌ Registration Failed: $errorMessage");
      debugPrint("Customer Error: ${data["customerUserErrors"]}");
      return {'error': true, 'message': errorMessage};
    } else {
      Fluttertoast.showToast(msg: "❌ Unknown error occurred.");
      debugPrint("Unknown Error Response: ${result.data}");
      return {'error': true, 'message': 'Unknown error occurred'};
    }
  } catch (error) {
    Fluttertoast.showToast(msg: "❌ Error: $error");
    debugPrint("Exception Caught: $error");
    return {'error': true, 'message': error.toString()};
  }
}

Future<bool> registerGuest(String firstName, String lastName, String email) async {
    try {
      final response = await http.post(
        Uri.parse(_googleSheet),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
        }),
      );
      
      return response.statusCode == 200;
    } catch (error) {
      print('Error inserting data: $error');
      return false;
    }
  }

}
