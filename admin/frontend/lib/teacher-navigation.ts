import type { MarkKind } from "@/components/module-mark";

export type TeacherNavGroup = {
  label: string;
  href: string;
  mark: MarkKind;
  match: string[];
};

export const teacherNavigation: TeacherNavGroup[] = [
  { label: "Dashboard", href: "/teacher/dashboard", mark: "dashboard", match: ["/teacher/dashboard"] },
  { label: "My profile", href: "/teacher/profile", mark: "staff", match: ["/teacher/profile"] },
  { label: "My timetable", href: "/teacher/timetable", mark: "timetable", match: ["/teacher/timetable"] },
  { label: "My classes", href: "/teacher/classes", mark: "students", match: ["/teacher/classes"] },
  { label: "Students", href: "/teacher/students", mark: "students", match: ["/teacher/students"] },
  { label: "Attendance", href: "/teacher/attendance", mark: "attendance", match: ["/teacher/attendance"] },
  { label: "Marks", href: "/teacher/exams", mark: "exams", match: ["/teacher/exams"] },
  { label: "Leave", href: "/teacher/leave", mark: "leave", match: ["/teacher/leave"] },
  { label: "Messages", href: "/teacher/communication", mark: "communication", match: ["/teacher/communication"] },
  { label: "Holidays", href: "/teacher/events-holidays", mark: "holidays", match: ["/teacher/events-holidays"] },
];

export const teacherUtilityNavigation: TeacherNavGroup[] = [
  { label: "Support", href: "/teacher/support", mark: "settings", match: ["/teacher/support"] },
];

export const teacherConfig = {
  schoolName: "Vidya Sanskar School",
  schoolShortName: "Vidya Sanskar",
  academicYear: "2026-27",
  teacherName: "Nisha Kapoor",
  teacherInitials: "NK",
  teacherCode: "STF-001",
  role: "Senior Science Teacher",
  workspace: "Teacher workspace",
};

export function teacherTitleFromSlug(value: string) {
  return value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
