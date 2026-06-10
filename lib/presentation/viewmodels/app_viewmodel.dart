import 'package:flutter/foundation.dart';
import 'package:teacher_zero_effort_app/core/logger/app_logger.dart';
import 'package:teacher_zero_effort_app/domain/entities/app_info.dart';
import 'package:teacher_zero_effort_app/domain/usecases/get_app_info.dart';

class AppViewModel extends ChangeNotifier {
  final GetAppInfoUseCase _getAppInfoUseCase;
  
  AppState _state = const AppState();
  
  AppViewModel(this._getAppInfoUseCase) {
    _initialize();
  }
  
  AppState get state => _state;
  
  Future<void> _initialize() async {
    try {
      _updateState(_state.copyWith(status: 'loading'));
      
      final result = await _getAppInfoUseCase.call();
      
      result.fold(
        (failure) {
          AppLogger.error('Failed to get app info: ${failure.message}');
          _updateState(
            _state.copyWith(
              status: 'error',
              message: failure.message,
            ),
          );
        },
        (success) {
          _updateState(
            _state.copyWith(
              status: 'success',
              appInfo: success.data,
              isInitialized: true,
            ),
          );
          AppLogger.info('App initialized successfully');
        },
      );
    } catch (e) {
      AppLogger.error('Error during initialization', e);
      _updateState(
        _state.copyWith(
          status: 'error',
          message: 'Failed to initialize application',
        ),
      );
    }
  }
  
  void _updateState(AppState newState) {
    _state = newState;
    notifyListeners();
  }
  
  bool get isLoading => _state.status == 'loading';
  bool get isError => _state.status == 'error';
  bool get isSuccess => _state.status == 'success';
  bool get isInitialized => _state.isInitialized;
}
