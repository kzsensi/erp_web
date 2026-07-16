import Link from "next/link";
import { ModuleMark, type MarkKind } from "@/components/module-mark";
import { schoolConfig } from "@/lib/admin-navigation";

const overview: Array<{ label: string; value: string; note: string; kind: MarkKind; tone: string }> = [
  { label: "Students present", value: "1,158", note: "92.8% today", kind: "students", tone: "blue" },
  { label: "Staff present", value: "108", note: "4 on leave", kind: "staff", tone: "teal" },
  { label: "Pending dues", value: "₹4.2L", note: "286 students", kind: "fees", tone: "amber" },
  { label: "Leave requests", value: "7", note: "Waiting for review", kind: "leave", tone: "rose" },
];

const quickActions: Array<{ label: string; note: string; href: string; kind: MarkKind }> = [
  { label: "Add student", note: "Create a new admission", href: "/admin/students/add-student", kind: "students" },
  { label: "View students", note: "Search student records", href: "/admin/students/all-students", kind: "students" },
  { label: "Download attendance", note: "Filter and export a report", href: "/admin/attendance/download", kind: "attendance" },
  { label: "Send message", note: "Students, parents or staff", href: "/admin/communication/messages", kind: "communication" },
  { label: "View dues", note: "Follow up pending fees", href: "/admin/fees/due-list", kind: "fees" },
  { label: "Upload timetable", note: "Select class and publish", href: "/admin/timetable/upload", kind: "timetable" },
];

const attention = [
  { title: "18 student documents are incomplete", note: "Identity proof and guardian documents", href: "/admin/students/documents-pending", tag: "Students", tone: "amber" },
  { title: "7 leave requests need a decision", note: "3 student and 4 staff requests", href: "/admin/leave", tag: "Leave", tone: "rose" },
  { title: "Class 10-B attendance is below 85%", note: "Low for three consecutive days", href: "/admin/attendance/student-attendance", tag: "Attendance", tone: "blue" },
];

export default function DashboardPage() {
  return (
    <div className="essential-dashboard page-stack">
      <header className="essential-welcome">
        <div>
          <p className="eyebrow">Monday, 13 July 2026</p>
          <h1>Good afternoon, Ananya</h1>
          <p>{schoolConfig.name} · {schoolConfig.academicYear}</p>
        </div>
        <div className="school-day-status"><i /><span><strong>School day in progress</strong><small>Attendance closes at 4:00 PM</small></span></div>
      </header>

      <section className="essential-overview" aria-label="Important school numbers">
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
            <div><p className="eyebrow">Action required</p><h2>Needs your attention</h2></div>
            <span>3 priorities</span>
          </header>
          <div className="priority-list">
            {attention.map((item) => (
              <Link href={item.href} key={item.title}>
                <i className={item.tone} />
                <div><span>{item.tag}</span><strong>{item.title}</strong><small>{item.note}</small></div>
                <b>Review</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="quick-panel">
          <header className="essential-section-heading">
            <div><p className="eyebrow">Shortcuts</p><h2>Common actions</h2></div>
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
