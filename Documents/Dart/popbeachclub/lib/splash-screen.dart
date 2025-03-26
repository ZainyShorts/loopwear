import 'dart:async';

import 'package:flutter/material.dart';
import 'package:popbeachclub/constants/global.dart';
import 'package:popbeachclub/welcome-screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 3), () {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const WelcomeScreen()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo
            SizedBox(
              height: 150,
              width: 200,
              child: Center(
                child: SizedBox(
                  height: 120,
                  width: 150,
                  child: Image.asset(logo,)
                ),
              ),
             
            ),
            const SizedBox(height: 20),
            // Colorful Text
            RichText(
              text: const TextSpan(
                children: [
                  TextSpan(
                    text: 'P',
                    style: TextStyle(
                      color: Color(0xFF4ECDC4),
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  TextSpan(
                    text: 'o',
                    style: TextStyle(
                      color: Color(0xFF2A4D9B),
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  TextSpan(
                    text: 'p',
                    style: TextStyle(
                      color: Color(0xFFFFD700),
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  TextSpan(
                    text: 'b',
                    style: TextStyle(
                      color: Color(0xFFE94EC7),
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  TextSpan(
                    text: 'eachclub',
                    style: TextStyle(
                      color: Color(0xFF2A4D9B),
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
