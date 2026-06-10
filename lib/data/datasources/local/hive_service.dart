import 'package:hive_flutter/hive_flutter.dart';
import 'package:teacher_zero_effort_app/core/error/exceptions.dart';
import 'package:teacher_zero_effort_app/core/logger/app_logger.dart';

class HiveService {
  static const String _appBoxName = 'app_data';
  late Box<dynamic> _appBox;

  Future<void> init() async {
    try {
      await Hive.initFlutter();
      _appBox = await Hive.openBox(_appBoxName);
      AppLogger.info('Hive initialized successfully');
    } catch (e) {
      AppLogger.error('Failed to initialize Hive', e);
      throw CacheException(
        message: 'Failed to initialize local storage',
        originalException: e,
      );
    }
  }

  Future<void> save<T>(String key, T value) async {
    try {
      await _appBox.put(key, value);
      AppLogger.debug('Saved key: $key');
    } catch (e) {
      AppLogger.error('Failed to save key: $key', e);
      throw CacheException(
        message: 'Failed to save data',
        originalException: e,
      );
    }
  }

  T? get<T>(String key) {
    try {
      final value = _appBox.get(key);
      AppLogger.debug('Retrieved key: $key');
      return value as T?;
    } catch (e) {
      AppLogger.error('Failed to retrieve key: $key', e);
      throw CacheException(
        message: 'Failed to retrieve data',
        originalException: e,
      );
    }
  }

  Future<void> delete(String key) async {
    try {
      await _appBox.delete(key);
      AppLogger.debug('Deleted key: $key');
    } catch (e) {
      AppLogger.error('Failed to delete key: $key', e);
      throw CacheException(
        message: 'Failed to delete data',
        originalException: e,
      );
    }
  }

  Future<void> clear() async {
    try {
      await _appBox.clear();
      AppLogger.info('Cache cleared');
    } catch (e) {
      AppLogger.error('Failed to clear cache', e);
      throw CacheException(
        message: 'Failed to clear cache',
        originalException: e,
      );
    }
  }

  bool containsKey(String key) {
    return _appBox.containsKey(key);
  }

  Future<void> close() async {
    await _appBox.close();
  }
}
