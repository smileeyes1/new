import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:teacher_zero_effort_app/core/services/palestinian_utilities.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/teacher_viewmodel.dart';
import 'package:teacher_zero_effort_app/presentation/widgets/app_scaffold.dart';

class AttendancePage extends StatefulWidget {
  const AttendancePage({Key? key}) : super(key: key);

  @override
  State<AttendancePage> createState() => _AttendancePageState();
}

class _AttendancePageState extends State<AttendancePage> {
  late Map<String, bool> studentAttendance = {};
  late Map<String, String?> studentExcuses = {};
  String? selectedExcuse;

  @override
  void initState() {
    super.initState();
    _initializeAttendance();
  }

  void _initializeAttendance() {
    final students = context.read<TeacherViewModel>().students;
    for (var student in students) {
      studentAttendance[student.id] = true; // افتراض الحضور
      studentExcuses[student.id] = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      title: '📋 تسجيل الحضور',
      body: Consumer<TeacherViewModel>(
        builder: (context, viewModel, _) {
          return Column(
            children: [
              // زر حفظ التقرير
              Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.save),
                  label: const Text('💾 حفظ وطباعة التقرير'),
                  onPressed: () => _generateAttendanceReport(context, viewModel),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                  ),
                ),
              ),
              // قائمة الطلاب
              Expanded(
                child: ListView.builder(
                  itemCount: viewModel.students.length,
                  itemBuilder: (context, index) {
                    final student = viewModel.students[index];
                    final isPresent = studentAttendance[student.id] ?? true;
                    final excuse = studentExcuses[student.id];

                    return Card(
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      color: isPresent ? Colors.green.shade50 : Colors.red.shade50,
                      child: ListTile(
                        leading: GestureDetector(
                          onTap: () {
                            setState(() {
                              studentAttendance[student.id] = !isPresent;
                              if (isPresent) {
                                studentExcuses[student.id] = null;
                              }
                            });
                          },
                          child: Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: isPresent ? Colors.green : Colors.red,
                            ),
                            child: Center(
                              child: Text(
                                isPresent ? '✅' : '❌',
                                style: const TextStyle(fontSize: 24),
                              ),
                            ),
                          ),
                        ),
                        title: Text(student.name),
                        subtitle: isPresent
                            ? const Text('حاضر')
                            : (excuse != null
                                ? Text('معذرة: $excuse')
                                : const Text('غائب')),
                        trailing: !isPresent
                            ? PopupMenuButton<String>(
                                onSelected: (value) {
                                  setState(() {
                                    studentExcuses[student.id] = value;
                                  });
                                },
                                itemBuilder: (context) =>
                                    AttendanceManager.getCommonExcuses()
                                        .map((excuse) => PopupMenuItem(
                                              value: excuse,
                                              child: Text(excuse),
                                            ))
                                        .toList(),
                                child: const Text('اختر معذرة'),
                              )
                            : null,
                      ),
                    );
                  },
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  void _generateAttendanceReport(BuildContext context, TeacherViewModel viewModel) {
    final report = AttendanceManager.generateDailyAttendanceReport(
      DateTime.now(),
      [], // سيتم ملء البيانات من الخريطة
      viewModel.students,
    );

    _showReportDialog(context, report);
  }

  void _showReportDialog(BuildContext context, String report) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('📋 تقرير الحضور'),
        content: SingleChildScrollView(
          child: Text(report, style: const TextStyle(fontFamily: 'monospace')),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('إغلاق'),
          ),
          ElevatedButton(
            onPressed: () {
              // طباعة أو نسخ
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('تم نسخ التقرير')),
              );
            },
            child: const Text('📋 نسخ'),
          ),
        ],
      ),
    );
  }
}
