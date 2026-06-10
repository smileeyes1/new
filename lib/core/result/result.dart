import 'package:equatable/equatable.dart';

/// BASE RESULT
abstract class Result<T> extends Equatable {
  const Result();

  R when<R>({
    required R Function(T data) success,
    required R Function(String message, String? code, dynamic error) failure,
  });
}

/// SUCCESS
class Success<T> extends Result<T> {
  final T data;

  const Success(this.data);

  @override
  R when<R>({
    required R Function(T data) success,
    required R Function(String message, String? code, dynamic error) failure,
  }) {
    return success(data);
  }

  @override
  List<Object?> get props => [data];
}

/// FAILURE
class Failure<T> extends Result<T> {
  final String message;
  final String? code;
  final dynamic error;

  const Failure({
    required this.message,
    this.code,
    this.error,
  });

  @override
  R when<R>({
    required R Function(T data) success,
    required R Function(String message, String? code, dynamic error) failure,
  }) {
    return failure(message, code, error);
  }

  @override
  List<Object?> get props => [message, code, error];
}

/// EXTENSION (compatibility layer)
extension ResultX<T> on Result<T> {
  T? getOrNull() {
    final self = this;
    if (self is Success<T>) return self.data;
    return null;
  }

  bool get isSuccess => this is Success<T>;
  bool get isFailure => this is Failure<T>;
}
