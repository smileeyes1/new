class AppConstants {
  // Durations
  static const Duration animationDuration = Duration(milliseconds: 300);
  static const Duration snackBarDuration = Duration(seconds: 2);
  static const Duration debounceDelay = Duration(milliseconds: 500);
  
  // Sizes
  static const double defaultPadding = 16.0;
  static const double smallPadding = 8.0;
  static const double largePadding = 24.0;
  static const double borderRadius = 8.0;
  
  // Constraints
  static const int maxNameLength = 100;
  static const int maxDescriptionLength = 500;
  static const int minPasswordLength = 8;
  
  // Cache
  static const int cacheMaxAge = 3600; // 1 hour
  static const String cacheBoxName = 'app_cache';
}

class ErrorMessages {
  static const String networkError = 'خطأ في الاتصال';
  static const String serverError = 'خطأ في الخادم';
  static const String validationError = 'بيانات غير صحيحة';
  static const String unknownError = 'حدث خطأ غير متوقع';
  static const String timeoutError = 'انتهت مهلة الاتصال';
  static const String cacheError = 'خطأ في تحميل البيانات المخزنة';
}

class SuccessMessages {
  static const String operationSuccess = 'تمت العملية بنجاح';
  static const String dataSaved = 'تم حفظ البيانات';
  static const String dataDeleted = 'تم حذف البيانات';
  static const String dataUpdated = 'تم تحديث البيانات';
}