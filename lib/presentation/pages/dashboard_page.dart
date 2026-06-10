import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/teacher_viewmodel.dart';
import 'package:teacher_zero_effort_app/presentation/widgets/app_scaffold.dart';
import 'package:teacher_zero_effort_app/presentation/widgets/teacher_widgets.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  @override
  void initState() {
    super.initState();
    // Initialize with demo teacher ID
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<TeacherViewModel>().setTeacherId('teacher_001');
    });
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      title: 'لوحة التحكم',
      body: Consumer<TeacherViewModel>(
        builder: (context, viewModel, _) {
          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Quick Actions
                _buildQuickActions(context, viewModel),
                const SizedBox(height: 24),

                // Statistics
                _buildStatistics(context, viewModel),
                const SizedBox(height: 24),

                // Recent Announcements
                _buildAnnouncementsSection(context, viewModel),
                const SizedBox(height: 24),

                // Daily Reports
                _buildDailyReportsSection(context, viewModel),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildQuickActions(BuildContext context, TeacherViewModel viewModel) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'الإجراءات السريعة',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 3,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          children: [
            QuickActionCard(
              icon: Icons.book,
              label: 'إضافة درس',
              color: Colors.blue,
              onTap: () => _navigateToAddLesson(context),
            ),
            QuickActionCard(
              icon: Icons.people,
              label: 'الحضور',
              color: Colors.green,
              onTap: () => _navigateToAttendance(context),
            ),
            QuickActionCard(
              icon: Icons.grade,
              label: 'الدرجات',
              color: Colors.orange,
              onTap: () => _navigateToGrades(context),
            ),
            QuickActionCard(
              icon: Icons.assessment,
              label: 'التقارير',
              color: Colors.purple,
              onTap: () => _navigateToReports(context),
            ),
            QuickActionCard(
              icon: Icons.event,
              label: 'الأنشطة',
              color: Colors.teal,
              onTap: () => _navigateToActivities(context),
            ),
            QuickActionCard(
              icon: Icons.file_download,
              label: 'تصدير',
              color: Colors.indigo,
              onTap: () => _showExportOptions(context),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStatistics(BuildContext context, TeacherViewModel viewModel) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'الإحصائيات',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          children: [
            StatisticCard(
              title: 'عدد الطلاب',
              value: '${viewModel.students.length}',
              subtitle: 'طالب وطالبة',
              color: Colors.blue,
            ),
            StatisticCard(
              title: 'الدروس المسجلة',
              value: '${viewModel.lessons.length}',
              subtitle: 'درس هذا الشهر',
              color: Colors.green,
            ),
            StatisticCard(
              title: 'الإعلانات',
              value: '${viewModel.announcements.length}',
              subtitle: 'إعلان جديد',
              color: Colors.orange,
            ),
            StatisticCard(
              title: 'التقارير اليومية',
              value: '${viewModel.dailyReports.length}',
              subtitle: 'تقرير هذا الشهر',
              color: Colors.purple,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildAnnouncementsSection(BuildContext context, TeacherViewModel viewModel) {
    if (viewModel.announcements.isEmpty) {
      return const SizedBox();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'الإعلانات الجديدة',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        ...viewModel.announcements.take(3).map((announcement) => Card(
          child: ListTile(
            leading: Icon(
              _getAnnouncementIcon(announcement.category),
              color: _getAnnouncementColor(announcement.category),
            ),
            title: Text(announcement.title),
            subtitle: Text(
              announcement.content,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            trailing: announcement.isRequired
                ? const Chip(
              label: Text('مهم'),
              backgroundColor: Colors.red,
            )
                : null,
          ),
        )),
      ],
    );
  }

  Widget _buildDailyReportsSection(BuildContext context, TeacherViewModel viewModel) {
    if (viewModel.dailyReports.isEmpty) {
      return const SizedBox();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'التقارير اليومية الأخيرة',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        ...viewModel.dailyReports.take(3).map((report) => Card(
          child: ListTile(
            leading: const Icon(Icons.calendar_today),
            title: Text(
              '${report.reportDate.day}/${report.reportDate.month}/${report.reportDate.year}',
            ),
            subtitle: Text(
              'دروس: ${report.lessonsDelivered} | حضور: ${report.studentsPresent}',
            ),
          ),
        )),
      ],
    );
  }

  IconData _getAnnouncementIcon(String category) {
    switch (category) {
      case 'circular':
        return Icons.mail;
      case 'notice':
        return Icons.notification_important;
      case 'urgent':
        return Icons.warning;
      case 'event':
        return Icons.event;
      default:
        return Icons.info;
    }
  }

  Color _getAnnouncementColor(String category) {
    switch (category) {
      case 'circular':
        return Colors.blue;
      case 'notice':
        return Colors.orange;
      case 'urgent':
        return Colors.red;
      case 'event':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  void _navigateToAddLesson(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('الذهاب إلى إضافة درس')),
    );
  }

  void _navigateToAttendance(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('الذهاب إلى الحضور')),
    );
  }

  void _navigateToGrades(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('الذهاب إلى الدرجات')),
    );
  }

  void _navigateToReports(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('الذهاب إلى التقارير')),
    );
  }

  void _navigateToActivities(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('الذهاب إلى الأنشطة')),
    );
  }

  void _showExportOptions(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('تصدير البيانات'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: const Text('تصدير إلى Excel'),
              leading: const Icon(Icons.table_chart),
              onTap: () {
                Navigator.pop(context);
                context.read<TeacherViewModel>().exportData('excel');
              },
            ),
            ListTile(
              title: const Text('تصدير إلى PDF'),
              leading: const Icon(Icons.picture_as_pdf),
              onTap: () {
                Navigator.pop(context);
                context.read<TeacherViewModel>().exportData('pdf');
              },
            ),
          ],
        ),
      ),
    );
  }
}
