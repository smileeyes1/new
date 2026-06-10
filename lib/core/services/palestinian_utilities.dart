import 'package:flutter/material.dart';
import 'package:teacher_zero_effort_app/domain/entities/teacher_entities.dart';

class AttendanceManager {
  /// إدارة الحضور بأبسط طريقة ممكنة
  /// - تسجيل سريع: اضغط على اسم الطالب لإشارة الحضور
  /// - معاذير سريعة: اختر المعذرة من قائمة
  /// - تقارير تلقائية: توليد فوري

  static String generateDailyAttendanceReport(
    DateTime date,
    List<Attendance> attendances,
    List<Student> students,
  ) {
    int present = 0;
    int absent = 0;
    int excused = 0;
    List<String> excusedNames = [];

    for (var attendance in attendances) {
      if (attendance.isPresent) {
        present++;
      } else {
        if (attendance.excuse != null && attendance.excuse!.isNotEmpty) {
          excused++;
          final student = students.firstWhere(
            (s) => s.id == attendance.studentId,
            orElse: () => Student(
              id: '',
              name: 'غير معروف',
              grade: '',
              section: '',
              dateOfBirth: DateTime.now(),
              parentPhone: '',
              gpa: 0,
            ),
          );
          excusedNames.add('${student.name} (${attendance.excuse})');
        } else {
          absent++;
        }
      }
    }

    final attendanceRate = present + excused;
    final percentage = ((attendanceRate / students.length) * 100).toStringAsFixed(1);

    return '''
╔════════════════════════════════════════╗
║        تقرير الحضور اليومي             ║
║        📅 ${date.day}/${date.month}/${date.year}            ║
╚════════════════════════════════════════╝

👥 الإجمالي: ${students.length} طالب
✅ الحاضرون: $present
❌ الغياب: $absent
⚠️  معاذير: $excused

📊 نسبة الحضور: $percentage%

${excusedNames.isNotEmpty ? '📝 المعاذير:\n${excusedNames.map((name) => '  • $name').join('\\n')}\n' : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ ${DateTime.now().hour}:${DateTime.now().minute}
    ''';
  }

  static List<String> getCommonExcuses() => [
    'مرض',
    'ظروف عائلية',
    'سفر',
    'إجازة مرضية',
    'عملية جراحية',
    'وفاة قريب',
    'ظروف أمنية',
    'عطل سيارة',
    'أسباب أخرى',
  ];

  static String getExcuseEmoji(String excuse) {
    switch (excuse) {
      case 'مرض':
        return '🏥';
      case 'وفاة قريب':
        return '⚫';
      case 'ظروف أمنية':
        return '🚨';
      case 'سفر':
        return '✈️';
      default:
        return '⚠️';
    }
  }
}

class GradeManager {
  /// إدارة الدرجات بسهولة
  /// - حساب تلقائي للمعدلات
  /// - نسب معيارية (20% أنشطة + 30% اختبارات + 50% نهائي)
  /// - تحذيرات فورية للطلاب الضعفاء

  static const double activityWeight = 0.20; // 20%
  static const double quizWeight = 0.30; // 30%
  static const double examWeight = 0.50; // 50%

  static double calculateFinalGrade(double activity, double quiz, double exam) {
    return (activity * activityWeight) + (quiz * quizWeight) + (exam * examWeight);
  }

  static String getGradeEmoji(double grade) {
    if (grade >= 90) return '⭐⭐⭐⭐⭐'; // ممتاز
    if (grade >= 80) return '⭐⭐⭐⭐'; // جيد جداً
    if (grade >= 70) return '⭐⭐⭐'; // جيد
    if (grade >= 60) return '⭐⭐'; // مقبول
    return '⭐'; // ضعيف
  }

  static String getGradeDescription(double grade) {
    if (grade >= 90) return 'ممتاز جداً 🎉';
    if (grade >= 80) return 'جيد جداً ✨';
    if (grade >= 70) return 'جيد 👍';
    if (grade >= 60) return 'مقبول ⚠️';
    return 'يحتاج دعم 🆘';
  }

  static String generateGradeReport(String studentName, double finalGrade) {
    return '''
╔════════════════════════════════════════╗
║        تقرير الدرجة             ║
╚════════════════════════════════════════╝

👤 الطالب: $studentName
📊 الدرجة النهائية: ${finalGrade.toStringAsFixed(2)}/100

${getGradeEmoji(finalGrade)}
${getGradeDescription(finalGrade)}

${finalGrade < 70 ? '⚠️ تنبيه: الطالب يحتاج دعم إضافي' : '✅ أداء جيد'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ''';
  }
}

class ReportFormatter {
  /// صيغ تقارير احترافية جاهزة للطباعة والإرسال

  static String formatMonthlyReport(
    String className,
    String month,
    int totalLessons,
    double attendanceAverage,
    double performanceAverage,
    List<String> topStudents,
    List<String> needsSupport,
  ) {
    return '''
╔════════════════════════════════════════════════════╗
║         تقرير شهري - $month       ║
║         الفصل: $className                    ║
╚════════════════════════════════════════════════════╝

📊 الإحصائيات العامة:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📚 عدد الدروس المنفذة: $totalLessons
  👥 متوسط الحضور: ${attendanceAverage.toStringAsFixed(1)}%
  📈 متوسط الأداء: ${performanceAverage.toStringAsFixed(2)}/100

⭐ الطلاب المتفوقون:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${topStudents.map((name) => '  🏆 $name').join('\\n')}

🆘 يحتاجون دعماً:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${needsSupport.map((name) => '  ⚠️ $name').join('\\n')}

📝 ملاحظات:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
تاريخ التقرير: ${DateTime.now().day}/${DateTime.now().month}/${DateTime.now().year}
إمضاء المعلم: _______________
    ''';
  }

  static String formatFinalReport(
    String className,
    int totalStudents,
    int passedCount,
    int failedCount,
    double classAverage,
    Map<String, int> gradeDistribution,
  ) {
    final String gradeChart = '''
🎯 توزيع الدرجات:
  ⭐⭐⭐⭐⭐ (ممتاز 90+): ${gradeDistribution['excellent'] ?? 0}
  ⭐⭐⭐⭐ (جيد جداً 80-89): ${gradeDistribution['very_good'] ?? 0}
  ⭐⭐⭐ (جيد 70-79): ${gradeDistribution['good'] ?? 0}
  ⭐⭐ (مقبول 60-69): ${gradeDistribution['acceptable'] ?? 0}
  ⭐ (ضعيف <60): ${gradeDistribution['weak'] ?? 0}
    ''';

    return '''
╔════════════════════════════════════════════════════╗
║         التقرير النهائي للفصل              ║
║         $className                         ║
╚════════════════════════════════════════════════════╝

📊 الإحصائيات النهائية:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  👥 إجمالي الطلاب: $totalStudents
  ✅ الناجحون: $passedCount (${((passedCount/totalStudents)*100).toStringAsFixed(1)}%)
  ❌ الراسبون: $failedCount (${((failedCount/totalStudents)*100).toStringAsFixed(1)}%)
  📈 متوسط الفصل: ${classAverage.toStringAsFixed(2)}/100

$gradeChart

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
تاريخ التقرير: ${DateTime.now().day}/${DateTime.now().month}/${DateTime.now().year}
إمضاء المعلم: _______________
إمضاء المراقب: _______________
    ''';
  }
}
