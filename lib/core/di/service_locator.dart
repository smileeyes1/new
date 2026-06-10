import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:teacher_zero_effort_app/data/datasources/local/hive_service.dart';
import 'package:teacher_zero_effort_app/data/datasources/remote/api_client.dart';
import 'package:teacher_zero_effort_app/data/repositories/app_repository_impl.dart';
import 'package:teacher_zero_effort_app/domain/repositories/app_repository.dart';
import 'package:teacher_zero_effort_app/domain/usecases/get_app_info.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/app_viewmodel.dart';

final sl = GetIt.instance;

future initServiceLocator() async {
  // External
  sl.registerSingleton<Dio>(Dio());
  sl.registerSingleton<Connectivity>(Connectivity());
  
  // Local Data Source
  final hiveService = HiveService();
  await hiveService.init();
  sl.registerSingleton<HiveService>(hiveService);
  
  // Remote Data Source
  sl.registerSingleton<ApiClient>(ApiClient(sl<Dio>()));
  
  // Repository
  sl.registerSingleton<AppRepository>(
    AppRepositoryImpl(
      apiClient: sl<ApiClient>(),
      hiveService: sl<HiveService>(),
      connectivity: sl<Connectivity>(),
    ),
  );
  
  // Use Cases
  sl.registerSingleton<GetAppInfoUseCase>(
    GetAppInfoUseCase(sl<AppRepository>()),
  );
  
  // View Models
  sl.registerSingleton<AppViewModel>(
    AppViewModel(sl<GetAppInfoUseCase>()),
  );
}

T getIt<T extends Object>() => sl<T>();