import 'package:equatable/equatable.dart';

class Teacher extends Equatable {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String school;
  final String subject;
  final String educationLevel;
  final int yearsExperience;
  final DateTime dateJoined;
  final bool isActive;

  const Teacher({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.school,
    required this.subject,
    required this.educationLevel,
    required this.yearsExperience,
    required this.dateJoined,
    this.isActive = true,
  });

  @override
  List<Object> get props => [
    id,
    name,
    email,
    phone,
    school,
    subject,
    educationLevel,
    yearsExperience,
    dateJoined,
    isActive,
  ];
}

class Student extends Equatable {
  final String id;
  final String name;
  final String grade;
  final String section;
  final DateTime dateOfBirth;
  final String parentPhone;
  final double gpa;
  final bool isActive;

  const Student({
    required this.id,
    required this.name,
    required this.grade,
    required this.section,
    required this.dateOfBirth,
    required this.parentPhone,
    required this.gpa,
    this.isActive = true,
  });

  @override
  List<Object> get props => [
    id,
    name,
    grade,
    section,
    dateOfBirth,
    parentPhone,
    gpa,
    isActive,
  ];
}

class Lesson extends Equatable {
  final String id;
  final String teacherId;
  final String subjectName;
  final String grade;
  final String section;
  final DateTime lessonDate;
  final String topic;
  final String objectives;
  final String teachingMethod;
  final String resources;
  final String assessment;
  final String notes;
  final int attendanceCount;
  final int totalStudents;

  const Lesson({
    required this.id,
    required this.teacherId,
    required this.subjectName,
    required this.grade,
    required this.section,
    required this.lessonDate,
    required this.topic,
    required this.objectives,
    required this.teachingMethod,
    required this.resources,
    required this.assessment,
    required this.notes,
    required this.attendanceCount,
    required this.totalStudents,
  });

  double get attendancePercentage => (attendanceCount / totalStudents) * 100;

  @override
  List<Object> get props => [
    id,
    teacherId,
    subjectName,
    grade,
    section,
    lessonDate,
    topic,
    objectives,
    teachingMethod,
    resources,
    assessment,
    notes,
    attendanceCount,
    totalStudents,
  ];
}

class Attendance extends Equatable {
  final String id;
  final String lessonId;
  final String studentId;
  final DateTime date;
  final bool isPresent;
  final String? excuse;

  const Attendance({
    required this.id,
    required this.lessonId,
    required this.studentId,
    required this.date,
    required this.isPresent,
    this.excuse,
  });

  @override
  List<Object?> get props => [
    id,
    lessonId,
    studentId,
    date,
    isPresent,
    excuse,
  ];
}

class Grade extends Equatable {
  final String id;
  final String lessonId;
  final String studentId;
  final double score;
  final String gradeType; // quiz, exam, homework, project, participation
  final String feedbackNotes;
  final DateTime dateGraded;

  const Grade({
    required this.id,
    required this.lessonId,
    required this.studentId,
    required this.score,
    required this.gradeType,
    required this.feedbackNotes,
    required this.dateGraded,
  });

  @override
  List<Object> get props => [
    id,
    lessonId,
    studentId,
    score,
    gradeType,
    feedbackNotes,
    dateGraded,
  ];
}

class ClassReport extends Equatable {
  final String id;
  final String teacherId;
  final String className;
  final String subject;
  final DateTime reportDate;
  final int totalStudents;
  final double averagePerformance;
  final double attendanceRate;
  final String strengthsAnalysis;
  final String weaknessesAnalysis;
  final String recommendations;

  const ClassReport({
    required this.id,
    required this.teacherId,
    required this.className,
    required this.subject,
    required this.reportDate,
    required this.totalStudents,
    required this.averagePerformance,
    required this.attendanceRate,
    required this.strengthsAnalysis,
    required this.weaknessesAnalysis,
    required this.recommendations,
  });

  @override
  List<Object> get props => [
    id,
    teacherId,
    className,
    subject,
    reportDate,
    totalStudents,
    averagePerformance,
    attendanceRate,
    strengthsAnalysis,
    weaknessesAnalysis,
    recommendations,
  ];
}

class ActivityReport extends Equatable {
  final String id;
  final String teacherId;
  final String activityType; // field_trip, competition, workshop, project
  final String title;
  final DateTime activityDate;
  final String description;
  final int participantsCount;
  final String outcomes;
  final List<String> photoPaths;
  final String supervisorName;
  final String supervisorFeedback;

  const ActivityReport({
    required this.id,
    required this.teacherId,
    required this.activityType,
    required this.title,
    required this.activityDate,
    required this.description,
    required this.participantsCount,
    required this.outcomes,
    required this.photoPaths,
    required this.supervisorName,
    required this.supervisorFeedback,
  });

  @override
  List<Object> get props => [
    id,
    teacherId,
    activityType,
    title,
    activityDate,
    description,
    participantsCount,
    outcomes,
    photoPaths,
    supervisorName,
    supervisorFeedback,
  ];
}

class Announcement extends Equatable {
  final String id;
  final String title;
  final String content;
  final DateTime datePublished;
  final String category; // circular, notice, urgent, event
  final bool isRequired;
  final List<String> attachmentPaths;

  const Announcement({
    required this.id,
    required this.title,
    required this.content,
    required this.datePublished,
    required this.category,
    required this.isRequired,
    required this.attachmentPaths,
  });

  @override
  List<Object> get props => [
    id,
    title,
    content,
    datePublished,
    category,
    isRequired,
    attachmentPaths,
  ];
}

class DailyReport extends Equatable {
  final String id;
  final String teacherId;
  final DateTime reportDate;
  final int lessonsDelivered;
  final int studentsPresent;
  final String activitiesPerformed;
  final String challengesFaced;
  final String plannedForNextDay;
  final String supervisorObservations;

  const DailyReport({
    required this.id,
    required this.teacherId,
    required this.reportDate,
    required this.lessonsDelivered,
    required this.studentsPresent,
    required this.activitiesPerformed,
    required this.challengesFaced,
    required this.plannedForNextDay,
    required this.supervisorObservations,
  });

  @override
  List<Object> get props => [
    id,
    teacherId,
    reportDate,
    lessonsDelivered,
    studentsPresent,
    activitiesPerformed,
    challengesFaced,
    plannedForNextDay,
    supervisorObservations,
  ];
}