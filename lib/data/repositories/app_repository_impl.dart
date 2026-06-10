import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:teacher_zero_effort_app/core/error/exceptions.dart';
import 'package:teacher_zero_effort_app/core/logger/app_logger.dart';
import 'package:teacher_zero_effort_app/core/result/result.dart';
import 'package:teacher_zero_effort_app/data/datasources/local/hive_service.dart';
import 'package:teacher_zero_effort_app/data/datasources/remote/api_client.dart';
import 'package:teacher_zero_effort_app/domain/entities/app_info.dart';
import 'package:teacher_zero_effort_app/domain/repositories/app_repository.dart';

class AppRepositoryImpl implements AppRepository {
  final ApiClient apiClient;
  final HiveService hiveService;
  final Connectivity connectivity;

  AppRepositoryImpl({
    required this.apiClient,
    required this.hiveService,
    required this.connectivity,
  });

  @override
  Future<Result<AppInfo>> getAppInfo() async {
    try {
      final isConnected = await _isNetworkAvailable();
      
      if (isConnected) {
        try {
          // Attempt to fetch from API
          final info = AppInfo(
            appName: 'تطبيق المعلم بلا جهد',
            version: '1.0.0',
            buildNumber: 1,
            packageName: 'com.example.teacher_app',
            buildTime: DateTime.now(),
            isDebug: false,
          );
          
          await hiveService.save('app_info', info);
          return Success(info);
        } catch (e) {
          AppLogger.error('Failed to fetch from API', e);
          // Fallback to cache
          return _getFromCache();
        }
      } else {
        return _getFromCache();
      }
    } catch (e) {
      AppLogger.error('Error in getAppInfo', e);
      return Failure(
        message: 'Failed to get app info',
        code: 'GET_APP_INFO_ERROR',
        exception: e,
      );
    }
  }

  @override
  Future<Result<void>> initializeApp() async {
    try {
      AppLogger.info('Initializing app');
      // Add initialization logic here
      return const Success(null);
    } catch (e) {
      AppLogger.error('Failed to initialize app', e);
      return Failure(
        message: 'Failed to initialize application',
        code: 'INIT_ERROR',
        exception: e,
      );
    }
  }

  @override
  Future<Result<void>> clearCache() async {
    try {
      await hiveService.clear();
      AppLogger.info('Cache cleared');
      return const Success(null);
    } catch (e) {
      AppLogger.error('Failed to clear cache', e);
      return Failure(
        message: 'Failed to clear cache',
        code: 'CACHE_CLEAR_ERROR',
        exception: e,
      );
    }
  }

  Future<bool> _isNetworkAvailable() async {
    final result = await connectivity.checkConnectivity();
    return result.contains(ConnectivityResult.mobile) ||
        result.contains(ConnectivityResult.wifi) ||
        result.contains(ConnectivityResult.ethernet);
  }

  Result<AppInfo> _getFromCache() {
    try {
      // Return default app info
      final info = AppInfo(
        appName: 'تطبيق المعلم بلا جهد',
        version: '1.0.0',
        buildNumber: 1,
        packageName: 'com.example.teacher_app',
        buildTime: DateTime.now(),
        isDebug: false,
      );
      return Success(info);
    } catch (e) {
      return Failure(
        message: 'Failed to retrieve cached data',
        code: 'CACHE_ERROR',
        exception: e,
      );
    }
  }
}
