import 'package:flutter/material.dart';

void main() => runApp(const TeacherApp());

class TeacherApp extends StatelessWidget {
  const TeacherApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Teacher Zero Effort',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const Directionality(
        textDirection: TextDirection.rtl,
        child: AppShell(),
      ),
    );
  }
}

/// ✅ AppShell: يجمع "كل شيء بنيناه" في مكان واحد بدون تعقيد.
/// - تبويب 1: الرئيسية + زر الانتقال (الشاشتين التجريبية لكن مفيدة للتحقق)
/// - تبويب 2: تطبيق واقعي بسيط: مهام للمعلم (إضافة/تعديل/حذف/إنجاز/بحث) بدون باكجات
/// - تبويب 3: معلومات/إعدادات بسيطة
class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _index = 0;

  final _pages = const [
    HomeScreen(),
    TasksScreen(),
    AboutScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final titles = const ['الرئيسية', 'مهام المعلم', 'حول التطبيق'];

    return Scaffold(
      appBar: AppBar(
        title: Text(titles[_index]),
        centerTitle: true,
      ),
      body: SafeArea(child: _pages[_index]),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'الرئيسية',
          ),
          NavigationDestination(
            icon: Icon(Icons.checklist_outlined),
            selectedIcon: Icon(Icons.checklist),
            label: 'المهام',
          ),
          NavigationDestination(
            icon: Icon(Icons.info_outline),
            selectedIcon: Icon(Icons.info),
            label: 'حول',
          ),
        ],
      ),
    );
  }
}

/// ✅ (1) الرئيسية + التنقل (كل ما بنيته سابقًا يظهر هنا)
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'التطبيق يعمل ✅',
              style: TextStyle(fontSize: 22),
            ),
            const SizedBox(height: 14),
            FilledButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const SecondScreen()),
                );
              },
              child: const Text('انتقل للصفحة الثانية'),
            ),
            const SizedBox(height: 10),
            Text(
              'ملاحظة: يمكنك الرجوع بالسهم أو زر الرجوع.',
              style: TextStyle(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

/// ✅ الصفحة الثانية (للتحقق أن التنقل يعمل)
class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('الصفحة الثانية'),
        centerTitle: true,
      ),
      body: const SafeArea(
        child: Center(
          child: Text(
            'تم الانتقال بنجاح ✅',
            style: TextStyle(fontSize: 22),
          ),
        ),
      ),
    );
  }
}

/// ✅ (2) تطبيق واقعي: مهام المعلم (بدون أي dependency)
/// - إضافة مهمة
/// - تعديل مهمة
/// - حذف مهمة
/// - تعليم كمكتملة
/// - بحث
class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> {
  final List<_Task> _tasks = [];
  String _query = '';

  List<_Task> get _filtered {
    final q = _query.trim();
    if (q.isEmpty) return _tasks;
    return _tasks.where((t) {
      return t.title.contains(q) || (t.note?.contains(q) ?? false);
    }).toList();
  }

  void _addTask() => _openEditor();
  void _editTask(_Task task) => _openEditor(task: task);

  Future<void> _openEditor({_Task? task}) async {
    final isEdit = task != null;
    final titleCtrl = TextEditingController(text: task?.title ?? '');
    final noteCtrl = TextEditingController(text: task?.note ?? '');

    final result = await showDialog<_EditorResult>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(isEdit ? 'تعديل مهمة' : 'إضافة مهمة'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titleCtrl,
                autofocus: true,
                decoration: const InputDecoration(
                  labelText: 'عنوان المهمة *',
                  hintText: 'مثال: تحضير درس الأسبوع القادم',
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: noteCtrl,
                maxLines: 3,
                decoration: const InputDecoration(
                  labelText: 'ملاحظة (اختياري)',
                  hintText: 'مثال: التسليم قبل الخميس',
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, null),
              child: const Text('إلغاء'),
            ),
            FilledButton(
              onPressed: () {
                final title = titleCtrl.text.trim();
                if (title.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('اكتب عنوان المهمة أولًا')),
                  );
                  return;
                }
                Navigator.pop(
                  context,
                  _EditorResult(
                    title: title,
                    note: noteCtrl.text.trim().isEmpty ? null : noteCtrl.text.trim(),
                  ),
                );
              },
              child: Text(isEdit ? 'حفظ' : 'إضافة'),
            ),
          ],
        );
      },
    );

    if (result == null) return;

    setState(() {
      if (isEdit) {
        task!.title = result.title;
        task.note = result.note;
      } else {
        _tasks.insert(
          0,
          _Task(
            id: DateTime.now().microsecondsSinceEpoch.toString(),
            title: result.title,
            note: result.note,
            done: false,
            createdAt: DateTime.now(),
          ),
        );
      }
    });
  }

  Future<void> _deleteTask(_Task task) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('حذف المهمة؟'),
        content: Text('هل تريد حذف: "${task.title}" ؟'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('إلغاء'),
          ),
          FilledButton.tonal(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('حذف'),
          ),
        ],
      ),
    );
    if (ok != true) return;

    setState(() => _tasks.removeWhere((t) => t.id == task.id));
  }

  void _toggleDone(_Task task) {
    setState(() => task.done = !task.done);
  }

  @override
  Widget build(BuildContext context) {
    final items = _filtered;

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
          child: TextField(
            onChanged: (v) => setState(() => _query = v),
            decoration: const InputDecoration(
              prefixIcon: Icon(Icons.search),
              hintText: 'ابحث عن مهمة…',
              border: OutlineInputBorder(),
            ),
          ),
        ),
        Expanded(
          child: items.isEmpty
              ? const Center(
                  child: Text(
                    'لا توجد مهام بعد.\nاضغط زر + لإضافة أول مهمة ✅',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 16),
                  ),
                )
              : ListView.separated(
                  padding: const EdgeInsets.fromLTRB(12, 8, 12, 90),
                  itemCount: items.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 8),
                  itemBuilder: (context, i) {
                    final t = items[i];
                    return Card(
                      child: ListTile(
                        leading: Icon(
                          t.done ? Icons.check_circle : Icons.circle_outlined,
                          color: t.done ? Colors.green : null,
                        ),
                        title: Text(
                          t.title,
                          style: TextStyle(
                            decoration: t.done ? TextDecoration.lineThrough : null,
                          ),
                        ),
                        subtitle: t.note == null
                            ? null
                            : Text(
                                t.note!,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                              ),
                        onTap: () => _toggleDone(t),
                        trailing: PopupMenuButton<String>(
                          onSelected: (v) {
                            if (v == 'edit') _editTask(t);
                            if (v == 'delete') _deleteTask(t);
                          },
                          itemBuilder: (_) => const [
                            PopupMenuItem(value: 'edit', child: Text('تعديل')),
                            PopupMenuItem(value: 'delete', child: Text('حذف')),
                          ],
                        ),
                      ),
                    );
                  },
                ),
        ),
        Padding(
          padding: const EdgeInsets.all(12),
          child: Align(
            alignment: Alignment.centerLeft,
            child: FloatingActionButton.extended(
              onPressed: _addTask,
              icon: const Icon(Icons.add),
              label: const Text('مهمة جديدة'),
            ),
          ),
        ),
      ],
    );
  }
}

/// ✅ (3) حول التطبيق (احترافي وبسيط)
class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Padding(
      padding: const EdgeInsets.all(18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Teacher Zero Effort',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: cs.primary,
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'تطبيق عملي للمعلم: مهام سريعة + واجهة عربية RTL.\n'
            'هذا الإصدار يركّز على البساطة والاستقرار.',
            style: TextStyle(fontSize: 16),
          ),
          const SizedBox(height: 16),
          Card(
            child: ListTile(
              leading: const Icon(Icons.verified),
              title: const Text('الحالة'),
              subtitle: const Text('التطبيق يعمل والتنقّل يعمل وقسم المهام جاهز ✅'),
            ),
          ),
          Card(
            child: ListTile(
              leading: const Icon(Icons.lightbulb_outline),
              title: const Text('الخطوة القادمة (اختيارية)'),
              subtitle: const Text('إضافة حفظ دائم للمهام (بدون تعقيد وبأقل تعديل).'),
            ),
          ),
        ],
      ),
    );
  }
}

/// موديل مهمة بسيط
class _Task {
  final String id;
  String title;
  String? note;
  bool done;
  final DateTime createdAt;

  _Task({
    required this.id,
    required this.title,
    this.note,
    required this.done,
    required this.createdAt,
  });
}

class _EditorResult {
  final String title;
  final String? note;

  _EditorResult({required this.title, required this.note});
}
