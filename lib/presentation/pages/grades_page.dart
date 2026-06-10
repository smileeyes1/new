import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:teacher_zero_effort_app/core/services/palestinian_utilities.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/teacher_viewmodel.dart';
import 'package:teacher_zero_effort_app/presentation/widgets/app_scaffold.dart';

class GradesPage extends StatefulWidget {
  const GradesPage({Key? key}) : super(key: key);

  @override
  State<GradesPage> createState() => _GradesPageState();
}

class _GradesPageState extends State<GradesPage> {
  late Map<String, Map<String, double>> studentGrades = {};
  String? selectedGradeType = 'نشاط يومي';

  final List<String> gradeTypes = [
    'نشاط يومي',
    'اختبار قصير',
    'امتحان نهائي',
  ];

  @override
  void initState() {
    super.initState();
    _initializeGrades();
  }

  void _initializeGrades() {
    final students = context.read<TeacherViewModel>().students;
    for (var student in students) {
      studentGrades[student.id] = {
        'نشاط يومي': 0,
        'اختبار قصير': 0,
        'امتحان نهائي': 0,
      };
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      title: '📊 إدارة الدرجات',
      body: Consumer<TeacherViewModel>(
        builder: (context, viewModel, _) {
          return Column(
            children: [
              // اختيار نوع الدرجة
              Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: Row(
                  children: [
                    const Text('نوع الدرجة: '),
                    Expanded(
                      child: DropdownButton<String>(
                        value: selectedGradeType,
                        items: gradeTypes
                            .map((type) => DropdownMenuItem(
                                  value: type,
                                  child: Text(type),
                                ))
                            .toList(),
                        onChanged: (value) {
                          setState(() => selectedGradeType = value);
                        },
                        isExpanded: true,
                      ),
                    ),
                  ],
                ),
              ),
              // قائمة الطلاب مع إدخال الدرجات
              Expanded(
                child: ListView.builder(
                  itemCount: viewModel.students.length,
                  itemBuilder: (context, index) {
                    final student = viewModel.students[index];
                    final grades = studentGrades[student.id] ?? {};
                    final currentGrade =
                        grades[selectedGradeType ?? 'نشاط يومي'] ?? 0;

                    // حساب الدرجة النهائية
                    final finalGrade = GradeManager.calculateFinalGrade(
                      grades['نشاط يومي'] ?? 0,
                      grades['اختبار قصير'] ?? 0,
                      grades['امتحان نهائي'] ?? 0,
                    );

                    return Card(
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      child: ListTile(
                        title: Text(student.name),
                        subtitle: Text(
                          '${GradeManager.getGradeDescription(finalGrade)} | الدرجة النهائية: ${finalGrade.toStringAsFixed(2)}',
                        ),
                        trailing: SizedBox(
                          width: 100,
                          child: TextFormField(
                            initialValue: currentGrade.toString(),
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                              hintText: 'من 100',
                              suffixText: '/100',
                              contentPadding: const EdgeInsets.symmetric(
                                vertical: 8,
                                horizontal: 8,
                              ),
                            ),
                            onChanged: (value) {
                              if (value.isNotEmpty) {
                                final grade = double.tryParse(value) ?? 0;
                                setState(() {
                                  studentGrades[student.id]?[
                                      selectedGradeType ?? 'نشاط يومي'] = grade;
                                });
                              }
                            },
                          ),
                        ),
                        leading: Text(
                          GradeManager.getGradeEmoji(finalGrade),
                          style: const TextStyle(fontSize: 20),
                        ),
                        onTap: () => _showStudentGradeDetails(context, student),
                      ),
                    );
                  },
                ),
              ),
              // زر حفظ
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton.icon(
                      icon: const Icon(Icons.save),
                      label: const Text('💾 حفظ'),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('تم حفظ الدرجات')),
                        );
                      },
                    ),
                    ElevatedButton.icon(
                      icon: const Icon(Icons.print),
                      label: const Text('📋 طباعة'),
                      onPressed: () => _generateGradesReport(context, viewModel),
                    ),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  void _showStudentGradeDetails(BuildContext context, student) {
    final grades = studentGrades[student.id] ?? {};
    final finalGrade = GradeManager.calculateFinalGrade(
      grades['نشاط يومي'] ?? 0,
      grades['اختبار قصير'] ?? 0,
      grades['امتحان نهائي'] ?? 0,
    );

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('📊 درجات ${student.name}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildGradeDetail('نشاط يومي (20%)', grades['نشاط يومي'] ?? 0),
            _buildGradeDetail('اختبار قصير (30%)', grades['اختبار قصير'] ?? 0),
            _buildGradeDetail(
              'امتحان نهائي (50%)',
              grades['امتحان نهائي'] ?? 0,
            ),
            const Divider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('الدرجة النهائية:',
                    style: TextStyle(fontWeight: FontWeight.bold)),
                Text(
                  '${finalGrade.toStringAsFixed(2)}/100',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: finalGrade >= 70 ? Colors.green : Colors.red,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('إغلاق'),
          ),
        ],
      ),
    );
  }

  Widget _buildGradeDetail(String label, double grade) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Text(
            '${grade.toStringAsFixed(0)}/100',
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }

  void _generateGradesReport(BuildContext context, TeacherViewModel viewModel) {
    // حساب إحصائيات الفصل
    double totalGrades = 0;
    int gradeCount = 0;
    Map<String, int> distribution = {
      'excellent': 0,
      'very_good': 0,
      'good': 0,
      'acceptable': 0,
      'weak': 0,
    };

    for (var grades in studentGrades.values) {
      final finalGrade = GradeManager.calculateFinalGrade(
        grades['نشاط يومي'] ?? 0,
        grades['اختبار قصير'] ?? 0,
        grades['امتحان نهائي'] ?? 0,
      );
      totalGrades += finalGrade;
      gradeCount++;

      if (finalGrade >= 90) distribution['excellent'] = distribution['excellent']! + 1;
      else if (finalGrade >= 80) distribution['very_good'] = distribution['very_good']! + 1;
      else if (finalGrade >= 70) distribution['good'] = distribution['good']! + 1;
      else if (finalGrade >= 60) distribution['acceptable'] = distribution['acceptable']! + 1;
      else distribution['weak'] = distribution['weak']! + 1;
    }

    final classAverage = gradeCount > 0 ? totalGrades / gradeCount : 0;
    final passedCount = gradeCount - (distribution['weak'] ?? 0);

    final report = ReportFormatter.formatFinalReport(
      'الفصل الدراسي',
      viewModel.students.length,
      passedCount,
      distribution['weak'] ?? 0,
      classAverage,
      distribution,
    );

    _showReportDialog(context, report);
  }

  void _showReportDialog(BuildContext context, String report) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('📊 تقرير الدرجات'),
        content: SingleChildScrollView(
          child: Text(report, style: const TextStyle(fontFamily: 'monospace')),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('إغلاق'),
          ),
        ],
      ),
    );
  }
}
