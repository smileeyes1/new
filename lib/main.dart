import 'package:flutter/material.dart';

void main() => runApp(const TeacherZeroEffortApp());

class TeacherZeroEffortApp extends StatelessWidget {
  const TeacherZeroEffortApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Teacher Zero Effort',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        body: Center(
          child: Text(
            'التطبيق يعمل ✅',
            style: TextStyle(fontSize: 22),
          ),
        ),
      ),
    );
  }
}
