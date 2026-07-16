import Link from "next/link";
import { ModuleMark, type MarkKind } from "@/components/module-mark";
import { teacherConfig } from "@/lib/teacher-navigation";

const overview: Array<{ label: string; value: string; note: string; kind: MarkKind; tone: string }> = [
  { label: "Classes today", value: "5", note: "2 completed", kind: "timetable", tone: "blue" },
  { label: "Attendance pending", value: "1", note: "Class 8-A", kind: "attendance", tone: "amber" },
  { label: "Students assigned", value: "184", note: "4 class sections", kind: "students", tone: "teal" },
  { label: "Marks pending", value: "36", note: "Science Unit Test", kind: "exams", tone: "rose" },
];

const priorities = [
  { title: "Mark attendance for Class 8-A", note: "Period 3 attendance is still open", href: "/teacher/attendance/mark", tag: "Attendance", tone: "amber" },
  { title: "Review 12 homework submissions", note: "Class 10-B Science assignment", href: "/teacher/classes/10-b/homework", tag: "Homework", tone: "blue" },
  { title: "Enter marks before 4:00 PM", note: "Class 9-A Science Unit Test", href: "/teacher/exams/marks-entry", tag: "Marks", tone: "rose" },
];

const quickActions: Array<{ label: string; note: string; href: string; kind: MarkKind }> = [
  { label: "My timetable", note: "See today's periods", href: "/teacher/timetable", kind: "timetable" },
  { label: "My classes", note: "Open assigned sections", href: "/teacher/classes", kind: "students" },
  { label: "Mark attendance", note: "Submit class register", href: "/teacher/attendance/mark", kind: "attendance" },
  { label: "Enter marks", note: "Update exam scores", href: "/teacher/exams/marks-entry", kind: "exams" },
  { label: "Apply leave", note: "Request staff leave", href: "/teacher/leave/apply", kind: "leave" },
  { label: "Messages", note: "Parents and school office", href: "/teacher/communication/messages", kind: "communication" },
];

export default function TeacherDashboardPage() {
  return (
    <div className="essential-dashboard teacher-dashboard page-stack">
      <header className="essential-welcome">
        <div>
          <p className="eyebrow">Monday, 13 July 2026</p>
          <h1>Good afternoon, {teacherConfig.teacherName.split(" ")[0]}</h1>
          <p>{teacherConfig.role} - {teacherConfig.schoolName}</p>
        </div>
        <div className="school-day-status"><i /><span><strong>Next period: Class 8-A</strong><small>Science - 11:20 AM in Lab 2</small></span></div>
      </header>

      <section className="essential-overview" aria-label="Important teacher numbers">
        {overview.map((item) => (
          <article key={item.label}>
            <span className={`overview-mark ${item.tone}`}><ModuleMark kind={item.kind} size={47} /></span>
            <div><p>{item.label}</p><strong>{item.value}</strong><small>{item.note}</small></div>
          </article>
        ))}
      </section>

      <div className="essential-grid">
        <section className="priority-panel">
          <header className="essential-section-heading">
            <div><p className="eyebrow">Action required</p><h2>Classroom priorities</h2></div>
            <span>3 open</span>
          </header>
          <div className="priority-list">
            {priorities.map((item) => (
              <Link href={item.href} key={item.title}>
                <i className={item.tone} />
                <div><span>{item.tag}</span><strong>{item.title}</strong><small>{item.note}</small></div>
                <b>Open</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="quick-panel">
          <header className="essential-section-heading">
            <div><p className="eyebrow">Shortcuts</p><h2>Common teacher actions</h2></div>
          </header>
          <div className="essential-actions">
            {quickActions.map((item) => (
              <Link href={item.href} key={item.label}>
                <span><ModuleMark kind={item.kind} size={42} /></span>
                <div><strong>{item.label}</strong><small>{item.note}</small></div>
                <i />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
