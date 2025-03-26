// // Login Screen
// import 'package:flutter/material.dart';
// import 'package:popbeachclub/constants/global.dart';
// import 'package:popbeachclub/controller/auth.dart';
// import 'package:popbeachclub/signup-screen.dart';

// class LoginScreen extends StatefulWidget {
//   const LoginScreen({Key? key}) : super(key: key);

//   @override
//   State<LoginScreen> createState() => _LoginScreenState();
// }

// class _LoginScreenState extends State<LoginScreen> {
//   bool _obscurePassword = true;
//   bool _rememberMe = false;


//   void loginUser() async {
//   AuthController authController = AuthController();
//   final response = await authController.login('test@example.com', 'password123');

//   if (response != null && response['error'] == false) {
//     print('✅ Login Successful!');
//     print('🔑 Token: ${response['accessToken']}');
//     print('🕒 Expires At: ${response['expiresAt']}');
//   } else {
//     print('❌ Login Failed: ${response?['message']}');
//   }
// }


//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.white,
//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 0,
//         leading: IconButton(
//           icon: const Icon(Icons.arrow_back, color: Color(0xFF2A4D9B)),
//           onPressed: () => Navigator.of(context).pop(),
//         ),
//       ),
//       body: SingleChildScrollView(
//         child: Padding(
//           padding: const EdgeInsets.symmetric(horizontal: 24.0),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.stretch,
//             children: [
//               const SizedBox(height: 20),
              
//               // Logo
//               Center(
//                 child: SizedBox(
//                   height: 100,
//                   width: 100,
//                   child: Center(
//                 child: SizedBox(
//                   height: 120,
//                   width: 150,
//                   child: Image.asset(logo)
//                 ),
//               ),
                 
//                 ),
//               ),
              
//               const SizedBox(height: 30),
              
//               // Login Title
//               const Text(
//                 'Welcome Back',
//                 style: TextStyle(
//                   color: Color(0xFF2A4D9B),
//                   fontSize: 36,
//                   fontWeight: FontWeight.bold,
//                 ),
//                 textAlign: TextAlign.center,
//               ),
              
//               const SizedBox(height: 10),
              
//               const Text(
//                 'Log in to your account',
//                 style: TextStyle(
//                   color: Color(0xFF9E9E9E),
//                   fontSize: 16,
//                 ),
//                 textAlign: TextAlign.center,
//               ),
              
//               const SizedBox(height: 40),
              
//               // Email Field
//               const Text(
//                 'EMAIL',
//                 style: TextStyle(
//                   color: Color(0xFF9E9E9E),
//                   fontSize: 14,
//                   letterSpacing: 1.2,
//                 ),
//                 textAlign: TextAlign.center,
//               ),
//               const SizedBox(height: 8),
//               TextField(
//                 decoration: InputDecoration(
//                   filled: true,
//                   fillColor: const Color(0xFFF0F0F0),
//                   hintText: 'Enter your email',
//                   hintStyle: const TextStyle(color: Colors.grey),
//                   contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(8),
//                     borderSide: BorderSide.none,
//                   ),
//                 ),
//                 keyboardType: TextInputType.emailAddress,
//               ),
              
//               const SizedBox(height: 20),
              
//               // Password Field
//               const Text(
//                 'PASSWORD',
//                 style: TextStyle(
//                   color: Color(0xFF9E9E9E),
//                   fontSize: 14,
//                   letterSpacing: 1.2,
//                 ),
//                 textAlign: TextAlign.center,
//               ),
//               const SizedBox(height: 8),
//               TextField(
//                 obscureText: _obscurePassword,
//                 decoration: InputDecoration(
//                   filled: true,
//                   fillColor: const Color(0xFFF0F0F0),
//                   hintText: 'Enter your password',
//                   hintStyle: const TextStyle(color: Colors.grey),
//                   contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(8),
//                     borderSide: BorderSide.none,
//                   ),
//                   suffixIcon: IconButton(
//                     icon: Icon(
//                       _obscurePassword ? Icons.visibility : Icons.visibility_off,
//                       color: Colors.grey,
//                     ),
//                     onPressed: () {
//                       setState(() {
//                         _obscurePassword = !_obscurePassword;
//                       });
//                     },
//                   ),
//                 ),
//               ),
              
//               const SizedBox(height: 20),
              
//               // Remember Me and Forgot Password
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   Row(
//                     children: [
//                       Checkbox(
//                         value: _rememberMe,
//                         onChanged: (value) {
//                           setState(() {
//                             _rememberMe = value ?? false;
//                           });
//                         },
//                         activeColor: const Color(0xFF2A4D9B),
//                       ),
//                       const Text(
//                         'Remember me',
//                         style: TextStyle(
//                           color: Color(0xFF9E9E9E),
//                           fontSize: 14,
//                         ),
//                       ),
//                     ],
//                   ),
//                   GestureDetector(
//                     onTap: () {
//                       // Handle forgot password
//                     },
//                     child: const Text(
//                       'Forgot Password?',
//                       style: TextStyle(
//                         color: Color(0xFF2A4D9B),
//                         fontSize: 14,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
              
//               const SizedBox(height: 40),
              
//               // Login Button
//               ElevatedButton(
//                 onPressed: () {
//                   // Handle login action
//                 },
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor: const Color(0xFF4CAF50),
//                   padding: const EdgeInsets.symmetric(vertical: 16),
//                   shape: RoundedRectangleBorder(
//                     borderRadius: BorderRadius.circular(8),
//                   ),
//                 ),
//                 child: const Text(
//                   'Log in',
//                   style: TextStyle(
//                     color: Colors.black,
//                     fontSize: 18,
//                     fontWeight: FontWeight.bold,
//                   ),
//                 ),
//               ),
              
//               const SizedBox(height: 20),
              
//               // Or continue with
//               Row(
//                 children: const [
//                   Expanded(child: Divider(color: Color(0xFFDDDDDD))),
//                   Padding(
//                     padding: EdgeInsets.symmetric(horizontal: 16.0),
//                     child: Text(
//                       'Or continue with',
//                       style: TextStyle(
//                         color: Color(0xFF9E9E9E),
//                         fontSize: 14,
//                       ),
//                     ),
//                   ),
//                   Expanded(child: Divider(color: Color(0xFFDDDDDD))),
//                 ],
//               ),
              
//               const SizedBox(height: 20),
              
//               // Social Login Buttons
//               // Row(
//               //   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//               //   children: [
//               //     _socialLoginButton(Icons.facebook, 'Facebook'),
//               //     _socialLoginButton(Icons.g_mobiledata, 'Google'),
//               //     _socialLoginButton(Icons.apple, 'Apple'),
//               //   ],
//               // ),
              
//               const SizedBox(height: 30),
              
//               // Don't have an account
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 children: [
//                   const Text(
//                     'Don\'t have an account? ',
//                     style: TextStyle(
//                       color: Color(0xFF9E9E9E),
//                       fontSize: 14,
//                     ),
//                   ),
//                   GestureDetector(
//                     onTap: () {
//                       Navigator.push(
//                         context,
//                         MaterialPageRoute(builder: (context) => const SignupScreen()),
//                       );
//                     },
//                     child: const Text(
//                       'Sign up',
//                       style: TextStyle(
//                         color: Color(0xFF2A4D9B),
//                         fontSize: 14,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
              
//               const SizedBox(height: 40),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
  
//   Widget _socialLoginButton(IconData icon, String platform) {
//     return InkWell(
//       onTap: () {
//         // Handle social login
//       },
//       child: Container(
//         padding: const EdgeInsets.all(12),
//         decoration: BoxDecoration(
//           border: Border.all(color: const Color(0xFFDDDDDD)),
//           borderRadius: BorderRadius.circular(8),
//         ),
//         child: Icon(
//           icon,
//           size: 30,
//           color: platform == 'Facebook' 
//               ? const Color(0xFF1877F2) 
//               : platform == 'Google' 
//                   ? const Color(0xFFDB4437)
//                   : Colors.black,
//         ),
//       ),
//     );
//   }
// }


import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:popbeachclub/constants/global.dart';
import 'package:popbeachclub/controller/auth.dart';
import 'package:popbeachclub/home-screen.dart';
import 'package:popbeachclub/signup-screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _rememberMe = false;
  bool loading = false;

  void loginUser() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        loading = true;
      });
      AuthController authController = AuthController();
      final response = await authController.login(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );

      if (response != null && response['error'] == false) {
        Fluttertoast.showToast(msg: "✅ Login Successful!", gravity: ToastGravity.BOTTOM);
        print('🔑 Token: ${response['accessToken']}');
        print('🕒 Expires At: ${response['expiresAt']}');
        setState(() {
        loading = false;
        Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const HomeScreen()),
      );
      });
      } else {
        Fluttertoast.showToast(msg: "❌ Login Failed: ${response?['message']}", gravity: ToastGravity.BOTTOM);
        setState(() {
        loading = false;
      });
      }
    }
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
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 20),
                Center(
                  child: SizedBox(height: 120, width: 150, child: Image.asset(logo)),
                ),
                const SizedBox(height: 30),
                const Text(
                  'Welcome Back',
                  style: TextStyle(
                    color: Color(0xFF2A4D9B),
                    fontSize: 36,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                const Text(
                  'Log in to your account',
                  style: TextStyle(color: Color(0xFF9E9E9E), fontSize: 16),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 40),
                const Text('EMAIL', style: TextStyle(color: Color(0xFF9E9E9E), fontSize: 14)),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: const Color(0xFFF0F0F0),
                    hintText: 'Enter your email',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide.none,
                    ),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your email';
                    } else if (!value.contains("@")) {
                      return 'Enter a valid email @ missing';
                    }else if (!value.contains(".")) {
                      return 'Enter a valid email . missing';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                const Text('PASSWORD', style: TextStyle(color: Color(0xFF9E9E9E), fontSize: 14)),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: const Color(0xFFF0F0F0),
                    hintText: 'Enter your password',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide.none,
                    ),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword ? Icons.visibility : Icons.visibility_off,
                        color: Colors.grey,
                      ),
                      onPressed: () {
                        setState(() {
                          _obscurePassword = !_obscurePassword;
                        });
                      },
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your password';
                    } else if (value.length < 6) {
                      return 'Password must be at least 6 characters';
                    }
                    return null;
                  },
                ),
                // const SizedBox(height: 20),
                // Row(
                //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                //   children: [
                //     Row(
                //       children: [
                //         Checkbox(
                //           value: _rememberMe,
                //           onChanged: (value) {
                //             setState(() {
                //               _rememberMe = value ?? false;
                //             });
                //           },
                //           activeColor: const Color(0xFF2A4D9B),
                //         ),
                //         const Text('Remember me', style: TextStyle(color: Color(0xFF9E9E9E), fontSize: 14)),
                //       ],
                //     ),
                //     GestureDetector(
                //       onTap: () {},
                //       child: const Text(
                //         'Forgot Password?',
                //         style: TextStyle(color: Color(0xFF2A4D9B), fontSize: 14, fontWeight: FontWeight.bold),
                //       ),
                //     ),
                //   ],
                // ),
                const SizedBox(height: 40),
                ElevatedButton(
                  onPressed: loginUser,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF4CAF50),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  child:  Text( loading ? 'Loading...' :'Log in', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(height: 30),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text("Don't have an account? ", style: TextStyle(color: Color(0xFF9E9E9E), fontSize: 14)),
                    GestureDetector(
                      onTap: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const SignupScreen())),
                      child: const Text('Sign up', style: TextStyle(color: Color(0xFF2A4D9B), fontSize: 14, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
