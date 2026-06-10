import 'package:teacher_zero_effort_app/core/result/result.dart';
import 'package:teacher_zero_effort_app/domain/entities/teacher_entities.dart';

abstract class TeacherRepository {
  Future<Result<List<Lesson>>> getLessons(String teacherId, {DateTime? fromDate, DateTime? toDate});
  Future<Result<void>> saveLesson(Lesson lesson);
  Future<Result<void>> updateLesson(Lesson lesson);
  
  Future<Result<List<Attendance>>> getAttendance(String lessonId);
  Future<Result<void>> saveAttendance(Attendance attendance);
  
  Future<Result<List<Grade>>> getGrades(String studentId);
  Future<Result<void>> saveGrade(Grade grade);
  
  Future<Result<List<Student>>> getStudents(String teacherId);
  Future<Result<Student>> getStudentDetails(String studentId);
  
  Future<Result<ClassReport>> generateClassReport(String teacherId, String className);
  Future<Result<void>> saveClassReport(ClassReport report);
  
  Future<Result<ActivityReport>> createActivityReport(ActivityReport report);
  Future<Result<List<ActivityReport>>> getActivityReports(String teacherId);
  
  Future<Result<DailyReport>> saveDailyReport(DailyReport report);
  Future<Result<List<DailyReport>>> getDailyReports(String teacherId, {int limit = 30});
  
  Future<Result<List<Announcement>>> getAnnouncements();
  Future<Result<void>> markAnnouncementAsRead(String announcementId);
  
  Future<Result<String>> exportToExcel(String teacherId, String reportType);
  Future<Result<String>> generatePDF(String reportType, dynamic data);
}