import 'package:teacher_zero_effort_app/core/result/result.dart';
import 'package:teacher_zero_effort_app/domain/entities/teacher_entities.dart';
import 'package:teacher_zero_effort_app/domain/repositories/teacher_repository.dart';

class SaveLessonUseCase {
  final TeacherRepository repository;
  SaveLessonUseCase(this.repository);
  Future<Result<void>> call(Lesson lesson) => repository.saveLesson(lesson);
}

class GetLessonsUseCase {
  final TeacherRepository repository;
  GetLessonsUseCase(this.repository);
  Future<Result<List<Lesson>>> call(String teacherId, {DateTime? fromDate, DateTime? toDate}) =>
      repository.getLessons(teacherId, fromDate: fromDate, toDate: toDate);
}

class SaveAttendanceUseCase {
  final TeacherRepository repository;
  SaveAttendanceUseCase(this.repository);
  Future<Result<void>> call(Attendance attendance) => repository.saveAttendance(attendance);
}

class SaveGradeUseCase {
  final TeacherRepository repository;
  SaveGradeUseCase(this.repository);
  Future<Result<void>> call(Grade grade) => repository.saveGrade(grade);
}

class GetStudentsUseCase {
  final TeacherRepository repository;
  GetStudentsUseCase(this.repository);
  Future<Result<List<Student>>> call(String teacherId) => repository.getStudents(teacherId);
}

class GenerateClassReportUseCase {
  final TeacherRepository repository;
  GenerateClassReportUseCase(this.repository);
  Future<Result<ClassReport>> call(String teacherId, String className) =>
      repository.generateClassReport(teacherId, className);
}

class SaveDailyReportUseCase {
  final TeacherRepository repository;
  SaveDailyReportUseCase(this.repository);
  Future<Result<DailyReport>> call(DailyReport report) => repository.saveDailyReport(report);
}

class GetAnnouncementsUseCase {
  final TeacherRepository repository;
  GetAnnouncementsUseCase(this.repository);
  Future<Result<List<Announcement>>> call() => repository.getAnnouncements();
}

class CreateActivityReportUseCase {
  final TeacherRepository repository;
  CreateActivityReportUseCase(this.repository);
  Future<Result<ActivityReport>> call(ActivityReport report) => repository.createActivityReport(report);
}

class ExportToExcelUseCase {
  final TeacherRepository repository;
  ExportToExcelUseCase(this.repository);
  Future<Result<String>> call(String teacherId, String reportType) =>
      repository.exportToExcel(teacherId, reportType);
}

class GeneratePDFUseCase {
  final TeacherRepository repository;
  GeneratePDFUseCase(this.repository);
  Future<Result<String>> call(String reportType, dynamic data) =>
      repository.generatePDF(reportType, data);
}