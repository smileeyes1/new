import 'package:equatable/equatable.dart';

abstract class Failure extends Equatable {
  final String message;
  final String? code;
  final dynamic exception;
  
  const Failure({
    required this.message,
    this.code,
    this.exception,
  });

  @override
  List<Object?> get props => [message, code, exception];
}

class ServerFailure extends Failure {
  const ServerFailure({
    required String message,
    String? code,
    dynamic exception,
  }) : super(
    message: message,
    code: code ?? 'SERVER_ERROR',
    exception: exception,
  );
}

class NetworkFailure extends Failure {
  const NetworkFailure({
    required String message,
    String? code,
    dynamic exception,
  }) : super(
    message: message,
    code: code ?? 'NETWORK_ERROR',
    exception: exception,
  );
}

class CacheFailure extends Failure {
  const CacheFailure({
    required String message,
    String? code,
    dynamic exception,
  }) : super(
    message: message,
    code: code ?? 'CACHE_ERROR',
    exception: exception,
  );
}

class ValidationFailure extends Failure {
  const ValidationFailure({
    required String message,
    String? code,
    dynamic exception,
  }) : super(
    message: message,
    code: code ?? 'VALIDATION_ERROR',
    exception: exception,
  );
}

class UnknownFailure extends Failure {
  const UnknownFailure({
    required String message,
    String? code,
    dynamic exception,
  }) : super(
    message: message,
    code: code ?? 'UNKNOWN_ERROR',
    exception: exception,
  );
}

class TimeoutFailure extends Failure {
  const TimeoutFailure({
    required String message,
    String? code,
    dynamic exception,
  }) : super(
    message: message,
    code: code ?? 'TIMEOUT_ERROR',
    exception: exception,
  );
}