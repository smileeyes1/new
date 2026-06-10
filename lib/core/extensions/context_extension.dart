import 'package:flutter/material.dart';

extension ContextExtension on BuildContext {
  MediaQueryData get mediaQuery => MediaQuery.of(this);
  Size get screenSize => mediaQuery.size;
  EdgeInsets get viewInsets => mediaQuery.viewInsets;
  EdgeInsets get systemPadding => mediaQuery.padding;
  
  bool get isPortrait => screenSize.height > screenSize.width;
  bool get isLandscape => !isPortrait;
  
  bool get isMobile => screenSize.width < 600;
  bool get isTablet => screenSize.width >= 600 && screenSize.width < 1200;
  bool get isDesktop => screenSize.width >= 1200;
  
  ThemeData get theme => Theme.of(this);
  TextTheme get textTheme => theme.textTheme;
  ColorScheme get colorScheme => theme.colorScheme;
  
  double get width => screenSize.width;
  double get height => screenSize.height;
}

extension StringExtension on String {
  bool get isEmpty => trim().length == 0;
  bool get isNotEmpty => !isEmpty;
  
  String capitalize() {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1).toLowerCase()}';
  }
  
  bool isValidEmail() {
    final pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    return RegExp(pattern).hasMatch(this);
  }
  
  bool isValidPhone() {
    final pattern = r'^[0-9]{10,15}$';
    return RegExp(pattern).hasMatch(this.replaceAll(RegExp(r'[^0-9]'), ''));
  }
}