import 'package:flutter/material.dart';
import 'package:popbeachclub/constants/global.dart';
import 'package:popbeachclub/guest.dart';
import 'package:popbeachclub/home-screen.dart';
import 'package:popbeachclub/login-screen.dart';
import 'package:popbeachclub/signup-screen.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Skip for Now button
              // Align(
              //   alignment: Alignment.topRight,
              //   child: Padding(
              //     padding: const EdgeInsets.only(top: 16.0),
              //     child: TextButton(
              //       onPressed: () {
              //         // Handle skip action
              //       },
              //       style: TextButton.styleFrom(
              //         backgroundColor: const Color(0xFFEEEEEE),
              //         padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              //         shape: RoundedRectangleBorder(
              //           borderRadius: BorderRadius.circular(8),
              //         ),
              //       ),
              //       child: Row(
              //         mainAxisSize: MainAxisSize.min,
              //         children:  [
              //           InkWell(
              //             onTap: ()=>Navigator.push(context, MaterialPageRoute(builder: (context)=>HomeScreen())),
              //             child: Text(
              //               'Skip for Now',
              //               style: TextStyle(
              //                 color: Color(0xFF888888),
              //                 fontSize: 16,
              //               ),
              //             ),
              //           ),
              //           SizedBox(width: 8),
              //           Icon(
              //             Icons.arrow_forward,
              //             color: Color(0xFF888888),
              //             size: 20,
              //           ),
              //         ],
              //       ),
              //     ),
              //   ),
              // ),
              
              const Spacer(flex: 1),
              
              // Logo
              // Center(
              //   child: SizedBox(
              //     height: 120,
              //     width: 120,
              //     child: Stack(
              //       children: [
              //         // Turquoise P with dots
              //         // Positioned(
              //         //   left: 0,
              //         //   top: 10,
              //         //   child: Container(
              //         //     height: 60,
              //         //     width: 45,
              //         //     decoration: BoxDecoration(
              //         //       color: const Color(0xFF4ECDC4),
              //         //       borderRadius: BorderRadius.circular(12),
              //         //       border: Border.all(color: const Color(0xFF2A4D9B), width: 2),
              //         //     ),
              //         //     child: Stack(
              //         //       children: List.generate(
              //         //         8,
              //         //         (index) => Positioned(
              //         //           left: index < 4 ? 0 : 41,
              //         //           top: (index % 4) * 15 + 3,
              //         //           child: Container(
              //         //             width: 4,
              //         //             height: 4,
              //         //             decoration: const BoxDecoration(
              //         //               color: Color(0xFFFFD700),
              //         //               shape: BoxShape.circle,
              //         //             ),
              //         //           ),
              //         //         ),
              //         //       ),
              //         //     ),
              //         //   ),
              //         // ),
              //         // Blue O
              //         Positioned(
              //           left: 30,
              //           top: 0,
              //           child: Container(
              //             height: 60,
              //             width: 40,
              //             decoration: BoxDecoration(
              //               color: const Color(0xFF2A4D9B),
              //               borderRadius: BorderRadius.circular(20),
              //               border: Border.all(color: const Color(0xFF2A4D9B), width: 2),
              //             ),
              //             child: Center(
              //               child: Container(
              //                 height: 20,
              //                 width: 20,
              //                 decoration: BoxDecoration(
              //                   color: Colors.white,
              //                   borderRadius: BorderRadius.circular(10),
              //                 ),
              //               ),
              //             ),
              //           ),
              //         ),
              //         // Yellow P
              //         Positioned(
              //           left: 55,
              //           top: 10,
              //           child: Container(
              //             height: 60,
              //             width: 40,
              //             decoration: BoxDecoration(
              //               color: const Color(0xFFFFD700),
              //               borderRadius: BorderRadius.circular(12),
              //               border: Border.all(color: const Color(0xFF2A4D9B), width: 2),
              //             ),
              //           ),
              //         ),
              //         // Pink P
              //         Positioned(
              //           left: 80,
              //           top: 20,
              //           child: Container(
              //             height: 60,
              //             width: 40,
              //             decoration: BoxDecoration(
              //               color: const Color(0xFFE94EC7),
              //               borderRadius: BorderRadius.circular(12),
              //               border: Border.all(color: const Color(0xFF2A4D9B), width: 2),
              //             ),
              //           ),
              //         ),
              //       ],
              //     ),
              //   ),
              // ),
              Center(
                child: SizedBox(
                  height: 120,
                  width: 120,
                  child: Image.asset(logo,width: 50,)
                ),
              ),
              
              const SizedBox(height: 40),
              
              // Welcome Text
              const Text(
                'Welcome to\nPopbeachclub',
                style: TextStyle(
                  color: Color(0xFF2A4D9B),
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  height: 1.2,
                ),
                textAlign: TextAlign.left,
              ),
              
              const SizedBox(height: 20),
              
              // Subtitle
              const Text(
                'Book your reservations, track your reward points and check in all within the app.',
                style: TextStyle(
                  color: Color(0xFF333333),
                  fontSize: 18,
                  height: 1.4,
                ),
                textAlign: TextAlign.left,
              ),
              
              const Spacer(flex: 1),
              
              // Log in Button
              ElevatedButton(
                onPressed: ()=>Navigator.push(context, MaterialPageRoute(builder: (context)=>LoginScreen())),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF4CAF50),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'Log in',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              
              const SizedBox(height: 16),
              
              // Create account Button
              OutlinedButton(
                onPressed: ()=>Navigator.push(context, MaterialPageRoute(builder: (context)=>SignupScreen())),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Color(0xFFDDDDDD), width: 1),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'Create account',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              
              const SizedBox(height: 16),

              OutlinedButton(
                onPressed: ()=>Navigator.push(context, MaterialPageRoute(builder: (context)=>GuestSignupScreen())),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Color(0xFFDDDDDD), width: 1),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text(
                  'Guest signup',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }
}

