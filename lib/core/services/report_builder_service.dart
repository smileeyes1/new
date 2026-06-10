class ReportBuilderService {
  /// تقرير الحضور اليومي
  static String generateAttendanceReport(DateTime date, int present, int absent, int excused) {
    return '''
📊 تقرير الحضور
التاريخ: $date
━━━━━━━━━━━━━━━━━━
حاضرون: $present
غيابات: $absent  
معاذير: $excused
━━━━━━━━━━━━━━━━━━
نسبة الحضور: ${((present / (present + absent + excused)) * 100).toStringAsFixed(1)}%
    ''';
  }

  /// تقرير الأداء الشهري
  static String generateMonthlyPerformanceReport(
    String className,
    int totalStudents,
    double averageGrade,
    int excellentCount,
    int goodCount,
    int averageCount,
    int failCount,
  ) {
    return '''
📈 تقرير الأداء الشهري
الفصل: $className
━━━━━━━━━━━━━━━━━━
إجمالي الطلاب: $totalStudents
متوسط الدرجات: ${averageGrade.toStringAsFixed(2)}
━━━━━━━━━━━━━━━━━━
⭐ ممتاز: $excellentCount
✅ جيد: $goodCount
⚠️ متوسط: $averageCount
❌ ضعيف: $failCount
━━━━━━━━━━━━━━━━━━
    ''';
  }

  /// تقرير النشاطات والفعاليات
  static String generateActivityReport(
    String activityName,
    DateTime date,
    int participants,
    String outcomes,
  ) {
    return '''
🎯 تقرير النشاط
اسم النشاط: $activityName
التاريخ: $date
━━━━━━━━━━━━━━━━━━
عدد المشاركين: $participants
━━━━━━━━━━━━━━━━━━
المخرجات:
$outcomes
━━━━━━━━━━━━━━━━━━
    ''';
  }

  /// التقرير اليومي للإشراف
  static String generateDailySupervisorReport(
    DateTime date,
    int lessonsDelivered,
    String challengesFaced,
    String plannedForTomorrow,
  ) {
    return '''
📋 التقرير اليومي للإشراف
التاريخ: $date
━━━━━━━━━━━━━━━━━━
عدد الدروس المنفذة: $lessonsDelivered
━━━━━━━━━━━━━━━━━━
التحديات:
$challengesFaced
━━━━━━━━━━━━━━━━━━
المخطط ليوم غد:
$plannedForTomorrow
━━━━━━━━━━━━━━━━━━
    ''';
  }

  /// ملخص الطالب
  static String generateStudentSummary(
    String studentName,
    String className,
    double gpa,
    double attendanceRate,
    String behaviorRating,
  ) {
    return '''
👤 ملخص الطالب
الاسم: $studentName
الفصل: $className
━━━━━━━━━━━━━━━━━━
معدل النقاط: ${gpa.toStringAsFixed(2)}
نسبة الحضور: ${attendanceRate.toStringAsFixed(1)}%
تقييم السلوك: $behaviorRating
━━━━━━━━━━━━━━━━━━
    ''';
  }

  /// إحصائيات الفصل
  static String generateClassStatistics(
    String className,
    int totalStudents,
    double averageAttendance,
    double averagePerformance,
    int disciplinaryIssues,
  ) {
    return '''
📊 إحصائيات الفصل
الفصل: $className
━━━━━━━━━━━━━━━━━━
عدد الطلاب: $totalStudents
متوسط الحضور: ${averageAttendance.toStringAsFixed(1)}%
متوسط الأداء: ${averagePerformance.toStringAsFixed(2)}
مشاكل سلوكية: $disciplinaryIssues
━━━━━━━━━━━━━━━━━━
    ''';
  }

  /// تقرير المناهج والمحتوى
  static String generateCurriculumReport(
    String subject,
    int chaptersCompleted,
    int chaptersRemaining,
    String obstacles,
    String recommendations,
  ) {
    return '''
📚 تقرير المناهج
المادة: $subject
━━━━━━━━━━━━━━━━━━
الفصول المنجزة: $chaptersCompleted
الفصول المتبقية: $chaptersRemaining
━━━━━━━━━━━━━━━━━━
العوائق:
$obstacles
━━━━━━━━━━━━━━━━━━
التوصيات:
$recommendations
━━━━━━━━━━━━━━━━━━
    ''';
  }
}
