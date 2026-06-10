import 'package:equatable/equatable.dart';

abstract class Result<T> extends Equatable {
  const Result();

  @override
  List<Object?> get props => [];
}

class Success<T> extends Result<T> {
  final T data;

  const Success(this.data);

  @override
  List<Object?> get props => [data];
}

class Failure<T> extends Result<T> {
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

extension ResultExtension<T> on Result<T> {
  R fold<R>(
    R Function(Failure<T> failure) onFailure,
    R Function(Success<T> success) onSuccess,
  ) {
    final value = this;

    if (value is Success<T>) {
      return onSuccess(value);
    } else if (value is Failure<T>) {
      return onFailure(value);
    }

    throw Exception('Unknown Result type');
  }

  bool get isSuccess => this is Success<T>;
  bool get isFailure => this is Failure<T>;

  T? getOrNull() {
    final value = this;
    if (value is Success<T>) {
      return value.data;
    }
    return null;
  }
}
