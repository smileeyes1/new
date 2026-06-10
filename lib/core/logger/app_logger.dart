import 'package:logger/logger.dart';
import 'package:teacher_zero_effort_app/config/app_config.dart';

class AppLogger {
  static final _logger = Logger(
    filter: ProductionFilter(),
    printer: PrettyPrinter(
      methodCount: 2,
      errorMethodCount: 8,
      lineLength: 120,
      colors: true,
      printEmojis: true,
      dateTimeFormat: DateTimeFormat.onlyTimeAndSec,
    ),
    output: ConsoleOutput(),
  );

  static void debug(String message, [dynamic error, StackTrace? stackTrace]) {
    if (AppConfig.enableLogging) {
      _logger.d(message, error: error, stackTrace: stackTrace);
    }
  }

  static void info(String message) {
    if (AppConfig.enableLogging) {
      _logger.i(message);
    }
  }

  static void warning(String message, [dynamic error]) {
    if (AppConfig.enableLogging) {
      _logger.w(message, error: error);
    }
  }

  static void error(
    String message, [
    dynamic error,
    StackTrace? stackTrace,
  ]) {
    if (AppConfig.enableLogging) {
      _logger.e(message, error: error, stackTrace: stackTrace);
    }
  }

  static void verbose(String message) {
    if (AppConfig.enableLogging && AppConfig.enableLogging) {
      _logger.v(message);
    }
  }
}

class ProductionFilter extends LogFilter {
  @override
  bool shouldLog(LogEvent event) {
    return AppConfig.enableLogging;
  }
}

class ConsoleOutput extends LogOutput {
  @override
  void output(OutputEvent event) {
    for (var line in event.lines) {
      print(line);
    }
  }
}