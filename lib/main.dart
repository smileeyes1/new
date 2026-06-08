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
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('الرئيسية'),
          centerTitle: true,
        ),
        body: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'التطبيق يعمل ✅',
                style: TextStyle(fontSize: 22),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => const SecondScreen(), // ✅ مهم: => وليس =&gt;
                    ),
                  );
                },
                child: const Text('انتقل للصفحة الثانية'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// صفحة ثانية بسيطة للتأكد أن التنقّل يعمل
class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('الصفحة الثانية'),
          centerTitle: true,
        ),
        body: const Center(
          child: Text(
            'تم الانتقال بنجاح ✅',
            style: TextStyle(fontSize: 22),
          ),
        ),
      ),
    );
  }
}
