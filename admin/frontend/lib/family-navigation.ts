import type { MarkKind } from "@/components/module-mark";

export type FamilyNavGroup = {
  label: string;
  href: string;
  mark: MarkKind;
  match: string[];
};

export const familyNavigation: FamilyNavGroup[] = [
  { label: "Home", href: "/family/dashboard", mark: "dashboard", match: ["/family/dashboard"] },
  { label: "Children", href: "/family/children", mark: "students", match: ["/family/children"] },
  { label: "Attendance", href: "/family/attendance", mark: "attendance", match: ["/family/attendance"] },
  { label: "Homework", href: "/family/homework", mark: "timetable", match: ["/family/homework"] },
  { label: "Fees", href: "/family/fees", mark: "fees", match: ["/family/fees", "/family/payments"] },
  { label: "Results", href: "/family/results", mark: "exams", match: ["/family/results", "/family/exams"] },
  { label: "Messages", href: "/family/messages", mark: "communication", match: ["/family/messages", "/family/announcements"] },
  { label: "Calendar", href: "/family/calendar", mark: "holidays", match: ["/family/calendar", "/family/events"] },
  { label: "Documents", href: "/family/documents", mark: "settings", match: ["/family/documents"] },
];

export const familyUtilityNavigation: FamilyNavGroup[] = [
  { label: "Support", href: "/family/support", mark: "settings", match: ["/family/support"] },
];

export const familyConfig = {
  schoolName: "Vidya Sanskar School",
  schoolShortName: "Vidya Sanskar",
  academicYear: "2026-27",
  guardianName: "Rakesh Sharma",
  guardianInitials: "RS",
  role: "Parent account",
  workspace: "Family portal",
};

export function familyTitleFromSlug(value: string) {
  return value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
