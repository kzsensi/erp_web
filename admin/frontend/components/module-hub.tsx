import Link from "next/link";
import { ModuleMark, type MarkKind } from "@/components/module-mark";

type HubAction = {
  title: string;
  description: string;
  href: string;
  kind: MarkKind;
  meta: string;
  primary?: boolean;
};

type HubConfig = {
  eyebrow: string;
  title: string;
  description: string;
  guidance: string;
  actions: HubAction[];
};

const hubs: Record<string, HubConfig> = {
  students: {
    eyebrow: "Student records",
    title: "Students",
    description: "Everything needed to add a student, find a record, or complete missing documents.",
    guidance: "Use View students for almost all daily work. Status and class filters are available inside the directory.",
    actions: [
      { title: "View students", description: "Search by name, admission number, class, section or status.", href: "/admin/students/all-students", kind: "students", meta: "1,248 student records", primary: true },
      { title: "Add student", description: "Create one student record with a guided admission form.", href: "/admin/students/add-student", kind: "students", meta: "New admission" },
      { title: "Documents pending", description: "See students whose required records are still incomplete.", href: "/admin/students/documents-pending", kind: "students", meta: "18 need attention" },
    ],
  },
  staff: {
    eyebrow: "Employee records",
    title: "Staff",
    description: "Manage teaching and non-teaching employees without splitting daily work across many pages.",
    guidance: "Teaching and non-teaching staff use one directory. Open a filtered view when you need a specific group.",
    actions: [
      { title: "View all staff", description: "Search every employee and open their complete profile.", href: "/admin/staff/all-staff", kind: "staff", meta: "112 staff members", primary: true },
      { title: "Add staff", description: "Create a new employee record and assign their staff type.", href: "/admin/staff/add-staff", kind: "staff", meta: "New employee" },
      { title: "Teaching staff", description: "Open the staff directory already filtered to teachers.", href: "/admin/staff/teachers", kind: "staff", meta: "78 teachers" },
      { title: "Non-teaching staff", description: "View administration, transport and support employees.", href: "/admin/staff/non-teaching", kind: "staff", meta: "34 employees" },
      { title: "Departments", description: "Maintain the small list of departments used in staff records.", href: "/admin/setup/departments", kind: "staff", meta: "8 departments" },
    ],
  },
  attendance: {
    eyebrow: "Daily operations",
    title: "Attendance",
    description: "Download the exact student or staff attendance record you need.",
    guidance: "Choose a report, select the date and class or staff category, then download Excel or PDF.",
    actions: [
      { title: "Download attendance", description: "Use clear prefilters for student or staff, date range, class and section.", href: "/admin/attendance/download", kind: "attendance", meta: "Excel or PDF", primary: true },
      { title: "Student attendance", description: "Review today’s class-wise attendance before exporting.", href: "/admin/attendance/student-attendance", kind: "attendance", meta: "92.8% today" },
      { title: "Staff attendance", description: "Review teaching and non-teaching presence for today.", href: "/admin/attendance/staff-attendance", kind: "attendance", meta: "96.4% today" },
    ],
  },
  leave: {
    eyebrow: "Requests & approvals",
    title: "Leave",
    description: "Keep student and staff leave separate, while reviewing both from one clear place.",
    guidance: "New student leave is entered from the form. Existing requests stay in their own student and staff lists.",
    actions: [
      { title: "Student leave form", description: "Record a new student leave request for the selected dates.", href: "/admin/leave/student-leave-form", kind: "leave", meta: "New request", primary: true },
      { title: "Student leave list", description: "Review pending, approved and rejected student requests.", href: "/admin/leave/student-leave", kind: "leave", meta: "3 pending" },
      { title: "Staff leave", description: "Review staff requests, dates and approval status.", href: "/admin/leave/staff-leave", kind: "staff", meta: "4 pending" },
    ],
  },
  fees: {
    eyebrow: "Fee management",
    title: "Fees",
    description: "Focus only on what the school needs now: the fee plan and pending dues.",
    guidance: "Fee Structure defines what each class must pay. Dues List shows who still has an outstanding balance.",
    actions: [
      { title: "Dues list", description: "Filter unpaid and overdue balances by class, section and due date.", href: "/admin/fees/due-list", kind: "fees", meta: "₹4.2L outstanding", primary: true },
      { title: "Fee structure", description: "Create or update class-wise fee heads and instalments.", href: "/admin/fees/fee-structure", kind: "fees", meta: "Academic year 2026–27" },
    ],
  },
  communication: {
    eyebrow: "School communication",
    title: "Messages & announcements",
    description: "Send one clear update to a class, students, parents, teachers or all staff.",
    guidance: "Choose the audience before composing. Delivery options will connect to the backend later.",
    actions: [
      { title: "New message", description: "Choose recipients and compose an individual or group message.", href: "/admin/communication/messages", kind: "communication", meta: "Direct communication", primary: true },
      { title: "Announcement", description: "Send an important update to a class or the whole school.", href: "/admin/communication/announcements", kind: "communication", meta: "Broad update" },
      { title: "Sent messages", description: "Review previously sent communication and its audience.", href: "/admin/communication/delivery-reports", kind: "communication", meta: "Delivery history" },
    ],
  },
  "events-holidays": {
    eyebrow: "School calendar",
    title: "Holidays",
    description: "Add holidays and keep one simple list for the active academic year.",
    guidance: "Add a holiday once; it will later appear automatically for students and staff.",
    actions: [
      { title: "Add holiday", description: "Enter the holiday name, date, audience and a short note.", href: "/admin/events-holidays/add-holiday", kind: "holidays", meta: "New calendar item", primary: true },
      { title: "View holidays", description: "Review, search and update this year’s holiday list.", href: "/admin/events-holidays/holidays", kind: "holidays", meta: "14 holidays" },
    ],
  },
  timetable: {
    eyebrow: "Class schedule",
    title: "Timetable",
    description: "Upload a class timetable quickly without building a complex academic setup module.",
    guidance: "Select the class and section, upload the timetable, then publish. It will later be sent to that class’s students and teachers.",
    actions: [
      { title: "Upload class timetable", description: "Choose a class and section, then upload a PDF or image timetable.", href: "/admin/timetable/upload", kind: "timetable", meta: "Recommended", primary: true },
      { title: "View uploaded timetables", description: "See the latest published file for every class and section.", href: "/admin/timetable/all", kind: "timetable", meta: "36 class sections" },
    ],
  },
  examinations: {
    eyebrow: "Examinations",
    title: "Exams & results",
    description: "A deliberately short examination area for the first release.",
    guidance: "Keep the first version to exam dates and results. Advanced grading and promotion workflows can be added later.",
    actions: [
      { title: "Exam schedule", description: "Create and view class-wise examination dates and subjects.", href: "/admin/examinations/exam-schedule", kind: "exams", meta: "Plan dates", primary: true },
      { title: "Results", description: "Open class results and record marks for the selected exam.", href: "/admin/examinations/marks-entry", kind: "exams", meta: "Enter marks" },
    ],
  },
};

export function ModuleHub({ area }: { area: string }) {
  const hub = hubs[area] ?? hubs.students;
  return (
    <div className="focused-hub page-stack">
      <header className="focused-hub-heading">
        <div><p className="eyebrow">{hub.eyebrow}</p><h1>{hub.title}</h1><p>{hub.description}</p></div>
        
      </header>


      <section>
        <div className="focused-section-title"><h2>What would you like to do?</h2><p>Choose one task to continue.</p></div>
        <div className={`focused-action-grid count-${hub.actions.length}`}>
          {hub.actions.map((action) => (
            <Link href={action.href} className={action.primary ? "primary" : ""} key={action.title}>
              <span className="focused-action-mark"><ModuleMark kind={action.kind} size={64} /></span>
              <div><strong>{action.title}</strong><p>{action.description}</p><small>{action.meta}</small></div>
              <i className="card-arrow" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
