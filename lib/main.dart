import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:teacher_zero_effort_app/core/di/service_locator.dart';
import 'package:teacher_zero_effort_app/core/logger/app_logger.dart';
import 'package:teacher_zero_effort_app/core/theme/app_theme.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/app_viewmodel.dart';
import 'package:teacher_zero_effort_app/presentation/pages/home_page.dart';

future void main() async {
  // Ensure Flutter binding is initialized
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize service locator
  await initServiceLocator();
  
  AppLogger.info('Application started');
  
  runApp(const TeacherApp());
}

class TeacherApp extends StatelessWidget {
  const TeacherApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<AppViewModel>(
          create: (_) => getIt<AppViewModel>(),
        ),
      ],
      child: MaterialApp(
        title: 'تطبيق المعلم بلا جهد',
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        themeMode: ThemeMode.light,
        home: const HomePage(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
