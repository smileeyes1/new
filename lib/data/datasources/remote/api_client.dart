import 'package:dio/dio.dart';
import 'package:teacher_zero_effort_app/config/app_config.dart';
import 'package:teacher_zero_effort_app/core/error/exceptions.dart';
import 'package:teacher_zero_effort_app/core/logger/app_logger.dart';

class ApiClient {
  final Dio _dio;
  late final String _baseUrl = EnvironmentConfig.apiBaseUrl;

  ApiClient(this._dio) {
    _configureDio();
  }

  void _configureDio() {
    _dio.options = BaseOptions(
      baseUrl: _baseUrl,
      connectTimeout: AppConfig.apiTimeout,
      receiveTimeout: AppConfig.apiTimeout,
      sendTimeout: AppConfig.apiTimeout,
      contentType: 'application/json',
      validateStatus: (status) => status! < 500,
    );

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          AppLogger.debug('API Request: ${options.method} ${options.path}');
          return handler.next(options);
        },
        onResponse: (response, handler) {
          AppLogger.debug(
            'API Response: ${response.statusCode} ${response.path}',
          );
          return handler.next(response);
        },
        onError: (error, handler) {
          AppLogger.error(
            'API Error: ${error.message}',
            error.exception,
            error.stackTrace,
          );
          return handler.next(error);
        },
      ),
    );

    _dio.interceptors.add(
      RetryInterceptor(
        maxRetries: AppConfig.maxRetries,
        retryDelay: AppConfig.retryDelay,
      ),
    );
  }

  Future<T> get<T>({
    required String endpoint,
    Map<String, dynamic>? queryParameters,
    required T Function(Map<String, dynamic>) fromJson,
  }) async {
    try {
      final response = await _dio.get<Map<String, dynamic>>(
        endpoint,
        queryParameters: queryParameters,
      );

      if (response.statusCode == 200) {
        return fromJson(response.data ?? {});
      } else {
        throw ServerException(
          message: response.statusMessage ?? 'Unknown error',
          statusCode: response.statusCode,
        );
      }
    } on DioException catch (e) {
      throw _handleDioException(e);
    }
  }

  Future<T> post<T>({
    required String endpoint,
    required Map<String, dynamic> body,
    required T Function(Map<String, dynamic>) fromJson,
  }) async {
    try {
      final response = await _dio.post<Map<String, dynamic>>(
        endpoint,
        data: body,
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return fromJson(response.data ?? {});
      } else {
        throw ServerException(
          message: response.statusMessage ?? 'Unknown error',
          statusCode: response.statusCode,
        );
      }
    } on DioException catch (e) {
      throw _handleDioException(e);
    }
  }

  Future<void> delete({
    required String endpoint,
  }) async {
    try {
      final response = await _dio.delete(endpoint);

      if (response.statusCode != 200 && response.statusCode != 204) {
        throw ServerException(
          message: response.statusMessage ?? 'Unknown error',
          statusCode: response.statusCode,
        );
      }
    } on DioException catch (e) {
      throw _handleDioException(e);
    }
  }

  AppException _handleDioException(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return TimeoutException(
          message: 'Connection timeout',
          originalException: error,
        );
      case DioExceptionType.badResponse:
        final statusCode = error.response?.statusCode;
        return ServerException(
          message: error.response?.statusMessage ?? 'Server error',
          statusCode: statusCode,
          originalException: error,
        );
      case DioExceptionType.connectionError:
        return NetworkException(
          message: 'Network error',
          originalException: error,
        );
      default:
        return AppException(
          message: error.message ?? 'Unknown error',
          originalException: error,
        );
    }
  }
}

class RetryInterceptor extends Interceptor {
  final int maxRetries;
  final Duration retryDelay;

  int _retryCount = 0;

  RetryInterceptor({
    required this.maxRetries,
    required this.retryDelay,
  });

  @override
  Future<void> onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    if (_shouldRetry(err) && _retryCount < maxRetries) {
      _retryCount++;
      AppLogger.debug('Retrying request (${_retryCount}/$maxRetries)');
      await Future.delayed(retryDelay);
      return handler.resolve(await _retry(err.requestOptions));
    }
    _retryCount = 0;
    return handler.next(err);
  }

  Future<Response> _retry(RequestOptions requestOptions) async {
    final options = Options(
      method: requestOptions.method,
      headers: requestOptions.headers,
    );
    return Dio().request<dynamic>(
      requestOptions.baseUrl + requestOptions.path,
      data: requestOptions.data,
      queryParameters: requestOptions.queryParameters,
      options: options,
    );
  }

  bool _shouldRetry(DioException error) {
    return error.type == DioExceptionType.connectionTimeout ||
        error.type == DioExceptionType.sendTimeout ||
        error.type == DioExceptionType.receiveTimeout ||
        error.type == DioExceptionType.connectionError;
  }
}
