import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:teacher_zero_effort_app/data/datasources/local/hive_service.dart';
import 'package:teacher_zero_effort_app/data/datasources/remote/api_client.dart';
import 'package:teacher_zero_effort_app/data/repositories/app_repository_impl.dart';
import 'package:teacher_zero_effort_app/data/repositories/teacher_repository_impl.dart';
import 'package:teacher_zero_effort_app/domain/repositories/app_repository.dart';
import 'package:teacher_zero_effort_app/domain/repositories/teacher_repository.dart';
import 'package:teacher_zero_effort_app/domain/usecases/get_app_info.dart';
import 'package:teacher_zero_effort_app/domain/usecases/teacher_usecases.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/app_viewmodel.dart';
import 'package:teacher_zero_effort_app/presentation/viewmodels/teacher_viewmodel.dart';

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
  
  // Repositories
  sl.registerSingleton<AppRepository>(
    AppRepositoryImpl(
      apiClient: sl<ApiClient>(),
      hiveService: sl<HiveService>(),
      connectivity: sl<Connectivity>(),
    ),
  );
  
  sl.registerSingleton<TeacherRepository>(
    TeacherRepositoryImpl(
      apiClient: sl<ApiClient>(),
      hiveService: sl<HiveService>(),
    ),
  );
  
  // Use Cases
  sl.registerSingleton<GetAppInfoUseCase>(
    GetAppInfoUseCase(sl<AppRepository>()),
  );
  
  // Teacher Use Cases
  sl.registerSingleton<SaveLessonUseCase>(
    SaveLessonUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<GetLessonsUseCase>(
    GetLessonsUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<SaveAttendanceUseCase>(
    SaveAttendanceUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<SaveGradeUseCase>(
    SaveGradeUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<GetStudentsUseCase>(
    GetStudentsUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<GenerateClassReportUseCase>(
    GenerateClassReportUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<SaveDailyReportUseCase>(
    SaveDailyReportUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<GetAnnouncementsUseCase>(
    GetAnnouncementsUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<CreateActivityReportUseCase>(
    CreateActivityReportUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<ExportToExcelUseCase>(
    ExportToExcelUseCase(sl<TeacherRepository>()),
  );
  sl.registerSingleton<GeneratePDFUseCase>(
    GeneratePDFUseCase(sl<TeacherRepository>()),
  );
  
  // View Models
  sl.registerSingleton<AppViewModel>(
    AppViewModel(sl<GetAppInfoUseCase>()),
  );
  
  sl.registerSingleton<TeacherViewModel>(
    TeacherViewModel(
      saveLessonUseCase: sl<SaveLessonUseCase>(),
      getLessonsUseCase: sl<GetLessonsUseCase>(),
      saveAttendanceUseCase: sl<SaveAttendanceUseCase>(),
      saveGradeUseCase: sl<SaveGradeUseCase>(),
      getStudentsUseCase: sl<GetStudentsUseCase>(),
      generateClassReportUseCase: sl<GenerateClassReportUseCase>(),
      saveDailyReportUseCase: sl<SaveDailyReportUseCase>(),
      getAnnouncementsUseCase: sl<GetAnnouncementsUseCase>(),
      createActivityReportUseCase: sl<CreateActivityReportUseCase>(),
      exportToExcelUseCase: sl<ExportToExcelUseCase>(),
      generatePDFUseCase: sl<GeneratePDFUseCase>(),
    ),
  );
}

T getIt<T extends Object>() => sl<T>();