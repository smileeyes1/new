import 'package:equatable/equatable.dart';

class AppInfo extends Equatable {
  final String appName;
  final String version;
  final int buildNumber;
  final String packageName;
  final DateTime buildTime;
  final bool isDebug;

  const AppInfo({
    required this.appName,
    required this.version,
    required this.buildNumber,
    required this.packageName,
    required this.buildTime,
    required this.isDebug,
  });

  @override
  List<Object> get props => [
    appName,
    version,
    buildNumber,
    packageName,
    buildTime,
    isDebug,
  ];
}

class AppState extends Equatable {
  final String status; // idle, loading, success, error
  final String? message;
  final AppInfo? appInfo;
  final bool isInitialized;

  const AppState({
    this.status = 'idle',
    this.message,
    this.appInfo,
    this.isInitialized = false,
  });

  AppState copyWith({
    String? status,
    String? message,
    AppInfo? appInfo,
    bool? isInitialized,
  }) {
    return AppState(
      status: status ?? this.status,
      message: message ?? this.message,
      appInfo: appInfo ?? this.appInfo,
      isInitialized: isInitialized ?? this.isInitialized,
    );
  }

  @override
  List<Object?> get props => [status, message, appInfo, isInitialized];
}