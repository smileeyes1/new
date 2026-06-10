import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:teacher_zero_effort_app/domain/usecases/teacher_usecases.dart';
import 'package:teacher_zero_effort_app/domain/entities/teacher_entities.dart';
import 'package:teacher_zero_effort_app/core/logger/app_logger.dart';

class TeacherViewModel extends ChangeNotifier {
  final SaveLessonUseCase saveLessonUseCase;
  final GetLessonsUseCase getLessonsUseCase;
  final SaveAttendanceUseCase saveAttendanceUseCase;
  final SaveGradeUseCase saveGradeUseCase;
  final GetStudentsUseCase getStudentsUseCase;
  final GenerateClassReportUseCase generateClassReportUseCase;
  final SaveDailyReportUseCase saveDailyReportUseCase;
  final GetAnnouncementsUseCase getAnnouncementsUseCase;
  final CreateActivityReportUseCase createActivityReportUseCase;
  final ExportToExcelUseCase exportToExcelUseCase;
  final GeneratePDFUseCase generatePDFUseCase;

  String? _teacherId;
  List<Lesson> _lessons = [];
  List<Student> _students = [];
  List<Announcement> _announcements = [];
  List<DailyReport> _dailyReports = [];
  String _status = 'idle';
  String? _message;

  TeacherViewModel({
    required this.saveLessonUseCase,
    required this.getLessonsUseCase,
    required this.saveAttendanceUseCase,
    required this.saveGradeUseCase,
    required this.getStudentsUseCase,
    required this.generateClassReportUseCase,
    required this.saveDailyReportUseCase,
    required this.getAnnouncementsUseCase,
    required this.createActivityReportUseCase,
    required this.exportToExcelUseCase,
    required this.generatePDFUseCase,
  });

  // Getters
  String? get teacherId => _teacherId;
  List<Lesson> get lessons => _lessons;
  List<Student> get students => _students;
  List<Announcement> get announcements => _announcements;
  List<DailyReport> get dailyReports => _dailyReports;
  String get status => _status;
  String? get message => _message;
  bool get isLoading => _status == 'loading';

  // Initialize
  void setTeacherId(String id) {
    _teacherId = id;
    _loadInitialData();
  }

  Future<void> _loadInitialData() async {
    if (_teacherId == null) return;
    
    _updateStatus('loading');
    try {
      await Future.wait([
        _loadStudents(),
        _loadAnnouncements(),
        _loadDailyReports(),
      ]);
      _updateStatus('success');
    } catch (e) {
      AppLogger.error('Error loading initial data', e);
      _updateStatus('error');
      _message = 'فشل تحميل البيانات';
    }
  }

  // Lessons
  Future<void> saveLessonData(Lesson lesson) async {
    _updateStatus('loading');
    try {
      final result = await saveLessonUseCase.call(lesson);
      result.fold(
        (failure) {
          _updateStatus('error');
          _message = failure.message;
          AppLogger.error('Failed to save lesson', failure.exception);
        },
        (_) {
          _lessons.add(lesson);
          _updateStatus('success');
          _message = 'تم حفظ الدرس بنجاح';
          notifyListeners();
        },
      );
    } catch (e) {
      _updateStatus('error');
      _message = 'خطأ غير متوقع';
      AppLogger.error('Error saving lesson', e);
    }
  }

  Future<void> _loadStudents() async {
    if (_teacherId == null) return;
    try {
      final result = await getStudentsUseCase.call(_teacherId!);
      result.fold(
        (failure) {
          AppLogger.error('Failed to load students', failure.exception);
        },
        (students) {
          _students = students;
          notifyListeners();
        },
      );
    } catch (e) {
      AppLogger.error('Error loading students', e);
    }
  }

  Future<void> _loadAnnouncements() async {
    try {
      final result = await getAnnouncementsUseCase.call();
      result.fold(
        (failure) {
          AppLogger.error('Failed to load announcements', failure.exception);
        },
        (announcements) {
          _announcements = announcements;
          notifyListeners();
        },
      );
    } catch (e) {
      AppLogger.error('Error loading announcements', e);
    }
  }

  Future<void> _loadDailyReports() async {
    if (_teacherId == null) return;
    try {
      final result = await getDailyReports();
      result.fold(
        (failure) {
          AppLogger.error('Failed to load daily reports', failure.exception);
        },
        (reports) {
          _dailyReports = reports;
          notifyListeners();
        },
      );
    } catch (e) {
      AppLogger.error('Error loading daily reports', e);
    }
  }

  // Attendance
  Future<void> saveAttendanceData(Attendance attendance) async {
    try {
      final result = await saveAttendanceUseCase.call(attendance);
      result.fold(
        (failure) {
          _message = failure.message;
          AppLogger.error('Failed to save attendance', failure.exception);
        },
        (_) {
          _message = 'تم حفظ الحضور بنجاح';
          notifyListeners();
        },
      );
    } catch (e) {
      _message = 'خطأ في حفظ الحضور';
      AppLogger.error('Error saving attendance', e);
    }
  }

  // Grades
  Future<void> saveGradeData(Grade grade) async {
    try {
      final result = await saveGradeUseCase.call(grade);
      result.fold(
        (failure) {
          _message = failure.message;
          AppLogger.error('Failed to save grade', failure.exception);
        },
        (_) {
          _message = 'تم حفظ الدرجة بنجاح';
          notifyListeners();
        },
      );
    } catch (e) {
      _message = 'خطأ في حفظ الدرجة';
      AppLogger.error('Error saving grade', e);
    }
  }

  // Daily Reports
  Future<Result<DailyReport>> saveDailyReportData(DailyReport report) async {
    return await saveDailyReportUseCase.call(report);
  }

  Future<Result<List<DailyReport>>> getDailyReports() async {
    if (_teacherId == null) return const Failure(message: 'No teacher ID');
    return Success([]);
  }

  // Activity Reports
  Future<void> createActivityReportData(ActivityReport report) async {
    _updateStatus('loading');
    try {
      final result = await createActivityReportUseCase.call(report);
      result.fold(
        (failure) {
          _updateStatus('error');
          _message = failure.message;
          AppLogger.error('Failed to create activity report', failure.exception);
        },
        (_) {
          _updateStatus('success');
          _message = 'تم إنشاء تقرير النشاط بنجاح';
          notifyListeners();
        },
      );
    } catch (e) {
      _updateStatus('error');
      _message = 'خطأ في إنشاء التقرير';
      AppLogger.error('Error creating activity report', e);
    }
  }

  // Class Reports
  Future<void> generateReport(String className) async {
    if (_teacherId == null) return;
    _updateStatus('loading');
    try {
      final result = await generateClassReportUseCase.call(_teacherId!, className);
      result.fold(
        (failure) {
          _updateStatus('error');
          _message = failure.message;
          AppLogger.error('Failed to generate report', failure.exception);
        },
        (_) {
          _updateStatus('success');
          _message = 'تم إنشاء التقرير بنجاح';
          notifyListeners();
        },
      );
    } catch (e) {
      _updateStatus('error');
      _message = 'خطأ في إنشاء التقرير';
      AppLogger.error('Error generating report', e);
    }
  }

  // Export
  Future<void> exportData(String reportType) async {
    if (_teacherId == null) return;
    _updateStatus('loading');
    try {
      final result = await exportToExcelUseCase.call(_teacherId!, reportType);
      result.fold(
        (failure) {
          _updateStatus('error');
          _message = failure.message;
          AppLogger.error('Failed to export', failure.exception);
        },
        (filePath) {
          _updateStatus('success');
          _message = 'تم تصدير البيانات بنجاح: $filePath';
          notifyListeners();
        },
      );
    } catch (e) {
      _updateStatus('error');
      _message = 'خطأ في التصدير';
      AppLogger.error('Error exporting', e);
    }
  }

  // Helper
  void _updateStatus(String status) {
    _status = status;
    notifyListeners();
  }

  void clearMessage() {
    _message = null;
    notifyListeners();
  }
}
