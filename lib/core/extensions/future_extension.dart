extension FutureExtension<T> on Future<T> {
  Future<T> timeout(Duration duration, {T? onTimeout}) {
    return Future.any([
      this,
      Future.delayed(duration).then((_) {
        if (onTimeout != null) return onTimeout as T;
        throw TimeoutException('Operation timed out');
      })
    ]);
  }
}

class TimeoutException implements Exception {
  final String message;
  TimeoutException(this.message);
  
  @override
  String toString() => 'TimeoutException: $message';
}