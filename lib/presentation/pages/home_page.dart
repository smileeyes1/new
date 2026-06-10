import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:teacher_zero_effort_app/core/di/service_locator.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/app_viewmodel.dart';
import 'package:teacher_zero_effort_app/presentation/widgets/app_scaffold.dart';
import 'package:teacher_zero_effort_app/presentation/widgets/error_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late AppViewModel _viewModel;
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    _viewModel = getIt<AppViewModel>();
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      title: 'تطبيق المعلم بلا جهد',
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'زيادة',
        child: const Icon(Icons.add),
      ),
      body: ChangeNotifierProvider.value(
        value: _viewModel,
        child: Consumer<AppViewModel>(
          builder: (context, viewModel, _) {
            if (viewModel.isLoading) {
              return const LoadingDisplay(message: 'جاري التحميل...');
            }

            if (viewModel.isError) {
              return ErrorDisplay(
                message: viewModel.state.message ?? 'حدث خطأ',
              );
            }

            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildWelcomeSection(context),
                  const SizedBox(height: 24),
                  _buildAppInfoCard(context, viewModel),
                  const SizedBox(height: 24),
                  _buildCounterSection(context),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildWelcomeSection(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'مرحباً بك',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 8),
        Text(
          'في تطبيق المعلم بلا جهد - نظام متكامل للمعلمين',
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            color: Colors.grey[600],
          ),
        ),
      ],
    );
  }

  Widget _buildAppInfoCard(BuildContext context, AppViewModel viewModel) {
    final appInfo = viewModel.state.appInfo;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'معلومات التطبيق',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            _buildInfoRow(context, 'الاسم:', appInfo?.appName ?? 'N/A'),
            _buildInfoRow(context, 'الإصدار:', appInfo?.version ?? 'N/A'),
            _buildInfoRow(
              context,
              'رقم البناء:',
              appInfo?.buildNumber.toString() ?? 'N/A',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(BuildContext context, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          Text(
            value,
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ],
      ),
    );
  }

  Widget _buildCounterSection(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'العداد',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            Center(
              child: Text(
                '$_counter',
                style: Theme.of(context).textTheme.displayLarge?.copyWith(
                  color: Theme.of(context).colorScheme.primary,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
