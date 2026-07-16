import type { MarkKind } from "@/components/module-mark";

export type NavGroup = {
  label: string;
  shortLabel?: string;
  href: string;
  mark: MarkKind;
  match: string[];
};

export const adminNavigation: NavGroup[] = [
  { label: "Dashboard", href: "/admin/dashboard", mark: "dashboard", match: ["/admin/dashboard"] },
  { label: "Students", href: "/admin/students", mark: "students", match: ["/admin/students"] },
  { label: "Staff", href: "/admin/staff", mark: "staff", match: ["/admin/staff"] },
  { label: "Attendance", href: "/admin/attendance", mark: "attendance", match: ["/admin/attendance"] },
  { label: "Leave", href: "/admin/leave", mark: "leave", match: ["/admin/leave"] },
  { label: "Fees", href: "/admin/fees", mark: "fees", match: ["/admin/fees"] },
  { label: "Communication", href: "/admin/communication", mark: "communication", match: ["/admin/communication"] },
  { label: "Holidays", href: "/admin/events-holidays", mark: "holidays", match: ["/admin/events-holidays"] },
  { label: "Timetable", href: "/admin/timetable", mark: "timetable", match: ["/admin/timetable"] },
  { label: "Examinations", href: "/admin/examinations", mark: "exams", match: ["/admin/examinations"] },
];

export const utilityNavigation: NavGroup[] = [
  { label: "Settings", href: "/admin/settings", mark: "settings", match: ["/admin/settings", "/admin/setup"] },
];

export const schoolConfig = {
  name: "Vidya Sanskar School",
  shortName: "Vidya Sanskar",
  initials: "VS",
  academicYear: "2026–27",
};

export function titleFromSlug(value: string) {
  return value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
