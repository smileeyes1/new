import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:teacher_zero_effort_app/main.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/app_viewmodel.dart';
import 'package:teacher_zero_effort_app/domain/entities/app_info.dart';

void main() {
  group('TeacherApp Widget Tests', () {
    testWidgets('App renders home page', (WidgetTester tester) async {
      // Build our app
      await tester.pumpWidget(const TeacherApp());

      // Verify app renders
      expect(find.byType(MaterialApp), findsOneWidget);
    });

    testWidgets('Counter increments when fab is pressed',
        (WidgetTester tester) async {
      await tester.pumpWidget(const TeacherApp());

      // Find the counter FAB and tap it
      expect(find.byIcon(Icons.add), findsOneWidget);
      await tester.tap(find.byIcon(Icons.add));
      await tester.pump();

      // Verify counter incremented
      expect(find.text('1'), findsOneWidget);
    });

    testWidgets('HomePage displays title',
        (WidgetTester tester) async {
      await tester.pumpWidget(const TeacherApp());

      // Verify title is displayed
      expect(find.text('تطبيق المعلم بلا جهد'), findsWidgets);
    });
  });
}
