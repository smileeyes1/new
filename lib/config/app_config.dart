class AppConfig {
  static const String appName = 'تطبيق المعلم بلا جهد';
  static const String appVersion = '1.0.0';
  static const int buildNumber = 1;
  static const Duration apiTimeout = Duration(seconds: 30);
  static const int maxRetries = 3;
  static const Duration retryDelay = Duration(seconds: 2);
  static const String baseUrl = 'https://api.example.com';
  static const bool enableLogging = true;
  static const bool enableCrashlytics = false;
}

enum Environment { development, staging, production }

class EnvironmentConfig {
  static Environment environment = Environment.development;
  
  static String get apiBaseUrl {
    switch (environment) {
      case Environment.production:
        return 'https://api.prod.example.com';
      case Environment.staging:
        return 'https://api.staging.example.com';
      case Environment.development:
        return 'https://api.dev.example.com';
    }
  }
  
  static bool get enableDebugging {
    return environment != Environment.production;
  }
}