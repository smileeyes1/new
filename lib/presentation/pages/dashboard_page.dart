import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/teacher_viewmodel.dart';
import 'package:teacher_zero_effort_app/presentation/pages/attendance_page.dart';
import 'package:teacher_zero_effort_app/presentation/pages/grades_page.dart';
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
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<TeacherViewModel>().setTeacherId('teacher_001');
    });
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      title: '🏫 لوحة المعلم الفلسطيني',
      body: Consumer<TeacherViewModel>(
        builder: (context, viewModel, _) {
          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // تحية يومية
                _buildGreeting(),
                const SizedBox(height: 24),

                // الإجراءات السريعة الأساسية (الأكثر استخداماً)
                _buildPrimaryActions(context),
                const SizedBox(height: 24),

                // الإجراءات الثانوية
                _buildSecondaryActions(context),
                const SizedBox(height: 24),

                // ملخص سريع
                _buildQuickSummary(viewModel),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildGreeting() {
    final now = DateTime.now();
    final greeting = now.hour < 12
        ? 'صباح الخير'
        : now.hour < 17
            ? 'مساء الخير'
            : 'تصبح على خير';

    return Card(
      color: Colors.blue.shade50,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            const Text('👋', style: TextStyle(fontSize: 32)),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '$greeting معلمنا الفاضل',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  Text(
                    'نحن هنا لتسهيل عملك اليومي',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPrimaryActions(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '⚡ الإجراءات الأساسية (تستخدمها كل يوم)',
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
            QuickActionCard(
              icon: Icons.person_check,
              label: 'تسجيل الحضور',
              color: Colors.green,
              onTap: () => _navigateTo(context, const AttendancePage()),
            ),
            QuickActionCard(
              icon: Icons.grade,
              label: 'إدخال الدرجات',
              color: Colors.orange,
              onTap: () => _navigateTo(context, const GradesPage()),
            ),
            QuickActionCard(
              icon: Icons.assignment,
              label: 'واجب منزلي',
              color: Colors.purple,
              onTap: () => _showComingSoon(context),
            ),
            QuickActionCard(
              icon: Icons.note_add,
              label: 'تقرير يومي',
              color: Colors.blue,
              onTap: () => _showComingSoon(context),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSecondaryActions(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '📋 إجراءات أخرى',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _buildActionChip(
              context,
              'إضافة درس',
              Icons.book,
              Colors.indigo,
            ),
            _buildActionChip(
              context,
              'الإعلانات',
              Icons.notifications,
              Colors.red,
            ),
            _buildActionChip(
              context,
              'التقارير',
              Icons.assessment,
              Colors.teal,
            ),
            _buildActionChip(
              context,
              'الطلاب',
              Icons.groups,
              Colors.cyan,
            ),
            _buildActionChip(
              context,
              'تصدير',
              Icons.download,
              Colors.lime,
            ),
            _buildActionChip(
              context,
              'المزيد',
              Icons.more_horiz,
              Colors.grey,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildActionChip(BuildContext context, String label, IconData icon, Color color) {
    return ActionChip(
      avatar: Icon(icon, color: Colors.white),
      label: Text(label),
      backgroundColor: color,
      labelStyle: const TextStyle(color: Colors.white),
      onPressed: () => _showComingSoon(context),
    );
  }

  Widget _buildQuickSummary(TeacherViewModel viewModel) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '📊 ملخص سريع',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: StatisticCard(
                title: 'عدد الطلاب',
                value: viewModel.students.length.toString(),
                subtitle: 'طالب وطالبة',
                color: Colors.blue,
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: StatisticCard(
                title: 'الإعلانات',
                value: viewModel.announcements.length.toString(),
                subtitle: 'إعلان جديد',
                color: Colors.orange,
              ),
            ),
          ],
        ),
      ],
    );
  }

  void _navigateTo(BuildContext context, Widget page) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => page));
  }

  void _showComingSoon(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('🔄 قريباً... هذه الميزة قيد التطوير'),
        duration: Duration(seconds: 2),
      ),
    );
  }
}
