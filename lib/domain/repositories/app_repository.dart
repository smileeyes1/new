import 'package:teacher_zero_effort_app/core/result/result.dart';
import 'package:teacher_zero_effort_app/domain/entities/app_info.dart';

abstract class AppRepository {
  Future<Result<AppInfo>> getAppInfo();
  Future<Result<void>> initializeApp();
  Future<Result<void>> clearCache();
}
