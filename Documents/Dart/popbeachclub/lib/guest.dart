import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:popbeachclub/controller/auth.dart';
import 'package:popbeachclub/home-screen.dart';
import 'package:popbeachclub/login-screen.dart';

class GuestSignupScreen extends StatefulWidget {
  const GuestSignupScreen({Key? key}) : super(key: key);

  @override
  State<GuestSignupScreen> createState() => _GuestSignupScreenState();
}

class _GuestSignupScreenState extends State<GuestSignupScreen> {
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  void _signUp() async {
  if (_formKey.currentState!.validate()) {
    setState(() {
      _isLoading = true;
    });

    AuthController authController = AuthController();

    final success = await authController.registerGuest(
      _firstNameController.text.trim(),
      _lastNameController.text.trim(),
      _emailController.text.trim(),
    );

    setState(() {
      _isLoading = false;
    });

    if (success) {
      Fluttertoast.showToast(msg: "✅ Guest Registration Successful!", gravity: ToastGravity.BOTTOM);
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const HomeScreen()),
      );
    } else {
      Fluttertoast.showToast(msg: "❌ Registration Failed", gravity: ToastGravity.BOTTOM);
    }
  }
}

  String? _validateField(String? value, String fieldName) {
    if (value == null || value.trim().isEmpty) {
      return '$fieldName is required';
    }
    return null;
  }

  String? _validateEmail(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Please enter your email';
    } else if (!value.contains("@") || !value.contains(".")) {
      return 'Enter a valid email';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF2A4D9B)),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),
              const Text(
                'Guest Signup',
                style: TextStyle(
                  color: Color(0xFF2A4D9B),
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  height: 1.2,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 30),
              _buildTextField('First Name', _firstNameController,
                  validator: (value) => _validateField(value, 'First Name')),
              const SizedBox(height: 20),
              _buildTextField('Last Name', _lastNameController,
                  validator: (value) => _validateField(value, 'Last Name')),
              const SizedBox(height: 20),
              _buildTextField('Email', _emailController,
                  isEmail: true, validator: _validateEmail),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: _isLoading ? null : _signUp,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFFD54F),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: _isLoading
                    ? const CircularProgressIndicator(color: Colors.black)
                    : const Text(
                        'Sign up',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(String label, TextEditingController controller,
      {bool isEmail = false, String? Function(String?)? validator}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: const TextStyle(
              color: Color(0xFF9E9E9E), fontSize: 14, letterSpacing: 1.2),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          keyboardType:
              isEmail ? TextInputType.emailAddress : TextInputType.text,
          validator: validator,
          decoration: InputDecoration(
            filled: true,
            fillColor: const Color(0xFFF0F0F0),
            hintText: 'Enter your $label',
            hintStyle: const TextStyle(color: Colors.grey),
            contentPadding:
                const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide.none,
            ),
          ),
        ),
      ],
    );
  }
}
