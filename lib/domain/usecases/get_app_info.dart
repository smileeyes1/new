import 'package:teacher_zero_effort_app/core/result/result.dart';
import 'package:teacher_zero_effort_app/domain/entities/app_info.dart';
import 'package:teacher_zero_effort_app/domain/repositories/app_repository.dart';

class GetAppInfoUseCase {
  final AppRepository repository;

  GetAppInfoUseCase(this.repository);

  Future<Result<AppInfo>> call() {
    return repository.getAppInfo();
  }
}
