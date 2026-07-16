"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  Check,
  Clock3,
  Download,
  FileText,
  Filter,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Send,
  UploadCloud,
} from "lucide-react";
import { ModuleMark, type MarkKind } from "@/components/module-mark";
import { teacherConfig, teacherTitleFromSlug } from "@/lib/teacher-navigation";

type Props = { segments: string[] };
type StatusTone = "positive" | "negative" | "warning" | "neutral";

const teacherClasses = [
  { id: "10-b", name: "Class 10-B", subject: "Science", room: "Lab 2", students: 42, attendance: "95%", next: "Today, 12:10 PM", role: "Class teacher" },
  { id: "9-a", name: "Class 9-A", subject: "Science", room: "Room 204", students: 46, attendance: "92%", next: "Today, 1:05 PM", role: "Subject teacher" },
  { id: "8-a", name: "Class 8-A", subject: "Science", room: "Room 108", students: 48, attendance: "88%", next: "Today, 11:20 AM", role: "Subject teacher" },
  { id: "7-c", name: "Class 7-C", subject: "Science", room: "Room 112", students: 48, attendance: "94%", next: "Tomorrow, 9:15 AM", role: "Subject teacher" },
];

const assignedStudents = [
  { roll: "01", id: "STU-1024", initials: "AS", name: "Aarav Sharma", className: "10-B", attendance: "94.2%", score: "84", alert: "None", status: "Active" },
  { roll: "02", id: "STU-1025", initials: "DM", name: "Diya Mehta", className: "10-B", attendance: "97.8%", score: "91", alert: "None", status: "Active" },
  { roll: "03", id: "STU-1026", initials: "KS", name: "Kabir Singh", className: "10-B", attendance: "86.5%", score: "68", alert: "Attendance review", status: "Review" },
  { roll: "04", id: "STU-1027", initials: "MP", name: "Myra Patel", className: "10-B", attendance: "92.1%", score: "78", alert: "None", status: "Active" },
  { roll: "05", id: "STU-1028", initials: "VG", name: "Vihaan Gupta", className: "10-B", attendance: "89.4%", score: "72", alert: "Needs support", status: "Review" },
  { roll: "06", id: "STU-1029", initials: "AJ", name: "Anaya Joshi", className: "10-B", attendance: "95.7%", score: "88", alert: "None", status: "Active" },
];

const timetable = [
  { period: "1", time: "08:10 - 08:55", className: "10-B", subject: "Science", room: "Lab 2", status: "Completed" },
  { period: "2", time: "09:00 - 09:45", className: "Free period", subject: "Planning", room: "Staff room", status: "Open" },
  { period: "3", time: "11:20 - 12:05", className: "8-A", subject: "Science", room: "Room 108", status: "Attendance pending" },
  { period: "4", time: "12:10 - 12:55", className: "10-B", subject: "Science practical", room: "Lab 2", status: "Upcoming" },
  { period: "5", time: "01:05 - 01:50", className: "9-A", subject: "Science", room: "Room 204", status: "Upcoming" },
];

const leaveRequests = [
  { id: "SLV-804", type: "Casual leave", dates: "17 Jul - 18 Jul 2026", days: "2 days", reason: "Family commitment", status: "Pending" },
  { id: "SLV-781", type: "Sick leave", dates: "04 Jul 2026", days: "1 day", reason: "Medical appointment", status: "Approved" },
  { id: "SLV-748", type: "Casual leave", dates: "21 Jun 2026", days: "1 day", reason: "Personal work", status: "Approved" },
];

const announcements = [
  { title: "Staff meeting moved to Friday", audience: "Teaching staff", date: "Today, 9:00 AM", body: "The weekly staff meeting will be held at 2:30 PM on Friday in the conference room.", status: "New" },
  { title: "Term I assessment dates published", audience: "Classes 6-10", date: "12 Jul 2026", body: "Exam dates are now available. Teachers should complete marks entry setup this week.", status: "Read" },
  { title: "Science lab maintenance", audience: "Science department", date: "11 Jul 2026", body: "Lab 2 will be unavailable after 2:00 PM on Wednesday.", status: "Read" },
];

const holidays = [
  { date: "15 Aug", day: "Saturday", title: "Independence Day", applies: "Students and staff", type: "National holiday" },
  { date: "29 Aug", day: "Saturday", title: "School foundation day", applies: "Whole school", type: "School event" },
  { date: "02 Oct", day: "Friday", title: "Gandhi Jayanti", applies: "Students and staff", type: "National holiday" },
];

const messages = [
  { id: 1, initials: "AR", name: "Academic office", context: "School office", preview: "Please submit Class 8-A attendance before noon.", time: "10:35 AM", unread: 1 },
  { id: 2, initials: "RS", name: "Rakesh Sharma", context: "Parent - Aarav, 10-B", preview: "Can we discuss the science project feedback?", time: "Yesterday", unread: 0 },
  { id: 3, initials: "10", name: "Class 10-B parents", context: "42 families", preview: "Thank you for sharing the practical schedule.", time: "12 Jul", unread: 0 },
];

const hubs: Record<string, {
  eyebrow: string;
  title: string;
  description: string;
  actions: Array<{ title: string; description: string; href: string; kind: MarkKind; meta: string; primary?: boolean }>;
}> = {
  classes: {
    eyebrow: "Assigned sections",
    title: "My classes",
    description: "Open only the classes and subjects assigned to this teacher.",
    actions: [
      { title: "Class 10-B", description: "Class teacher view with students, attendance, homework and marks.", href: "/teacher/classes/10-b", kind: "students", meta: "42 students", primary: true },
      { title: "Class 8-A", description: "Science subject register and pending attendance.", href: "/teacher/classes/8-a", kind: "attendance", meta: "Attendance pending" },
      { title: "Class 9-A", description: "Science marks and exam readiness.", href: "/teacher/classes/9-a", kind: "exams", meta: "46 students" },
    ],
  },
  students: {
    eyebrow: "Student access",
    title: "Assigned students",
    description: "Search students connected to your classes without exposing full admin records.",
    actions: [
      { title: "View assigned students", description: "Search by name, roll number or admission number.", href: "/teacher/students/assigned", kind: "students", meta: "184 visible students", primary: true },
      { title: "Class 10-B students", description: "Open the class teacher student list.", href: "/teacher/classes/10-b/students", kind: "students", meta: "42 students" },
      { title: "Students needing review", description: "Attendance or academic support flags.", href: "/teacher/students/review", kind: "attendance", meta: "8 students" },
    ],
  },
  attendance: {
    eyebrow: "Daily register",
    title: "Attendance",
    description: "Mark attendance for assigned classes and review submitted registers.",
    actions: [
      { title: "Mark attendance", description: "Submit today's attendance for a selected class.", href: "/teacher/attendance/mark", kind: "attendance", meta: "Class 8-A pending", primary: true },
      { title: "Submitted attendance", description: "Review registers already submitted by you.", href: "/teacher/attendance/submitted", kind: "attendance", meta: "2 submitted today" },
      { title: "Correction request", description: "Ask admin to update a locked attendance entry.", href: "/teacher/attendance/correction-request", kind: "leave", meta: "Approval required" },
    ],
  },
  exams: {
    eyebrow: "Marks and exams",
    title: "Marks",
    description: "Enter marks only for subjects and classes assigned to this teacher.",
    actions: [
      { title: "Marks entry", description: "Enter marks for the selected exam and subject.", href: "/teacher/exams/marks-entry", kind: "exams", meta: "36 pending", primary: true },
      { title: "Submitted marks", description: "Review marks submitted for verification.", href: "/teacher/exams/submitted-marks", kind: "exams", meta: "2 classes submitted" },
      { title: "Exam schedule", description: "View upcoming exams for your classes.", href: "/teacher/exams/schedule", kind: "timetable", meta: "Term I" },
    ],
  },
  leave: {
    eyebrow: "Staff leave",
    title: "Leave",
    description: "Apply for leave and track your own requests.",
    actions: [
      { title: "Apply leave", description: "Submit dates, type and reason to school admin.", href: "/teacher/leave/apply", kind: "leave", meta: "New request", primary: true },
      { title: "My leave requests", description: "Review pending, approved and rejected requests.", href: "/teacher/leave/requests", kind: "leave", meta: "1 pending" },
    ],
  },
  communication: {
    eyebrow: "Communication",
    title: "Messages",
    description: "Message school office, assigned class parents and permitted student groups.",
    actions: [
      { title: "Messages", description: "Open direct and group conversations.", href: "/teacher/communication/messages", kind: "communication", meta: "1 unread", primary: true },
      { title: "Announcements", description: "Read school notices relevant to you.", href: "/teacher/communication/announcements", kind: "communication", meta: "3 notices" },
    ],
  },
  "events-holidays": {
    eyebrow: "School calendar",
    title: "Holidays",
    description: "Read holidays and school events that affect your timetable.",
    actions: [
      { title: "Holiday list", description: "View upcoming holidays and school events.", href: "/teacher/events-holidays/holidays", kind: "holidays", meta: "3 upcoming", primary: true },
      { title: "Events", description: "View class events and teacher duties.", href: "/teacher/events-holidays/events", kind: "timetable", meta: "2 duties" },
    ],
  },
};

export function TeacherModulePage({ segments }: Props) {
  const area = segments[0] ?? "dashboard";
  const page = segments[segments.length - 1] ?? area;
  const classMatch = area === "classes" && segments[1] && teacherClasses.some((item) => item.id === segments[1]);

  if (area === "profile") return <TeacherProfile />;
  if (area === "timetable") return <TeacherTimetable />;
  if (classMatch) return <ClassWorkspace classId={segments[1]} tab={segments[2]} />;
  if (area === "students" && (page === "students" || page === "assigned" || page === "review")) return <AssignedStudents reviewOnly={page === "review"} />;
  if (area === "attendance" && page === "mark") return <MarkAttendance />;
  if (area === "attendance" && page === "submitted") return <SubmittedAttendance />;
  if (area === "attendance" && page === "correction-request") return <CorrectionRequest />;
  if (area === "exams" && page === "marks-entry") return <MarksEntry />;
  if (area === "exams" && page === "submitted-marks") return <SubmittedMarks />;
  if (area === "exams" && page === "schedule") return <ExamScheduleView />;
  if (area === "leave" && page === "apply") return <LeaveApply />;
  if (area === "leave" && page === "requests") return <LeaveRequests />;
  if (area === "communication" && page === "messages") return <TeacherMessages />;
  if (area === "communication" && page === "announcements") return <TeacherAnnouncements />;
  if (area === "events-holidays" && (page === "holidays" || page === "events")) return <HolidayList events={page === "events"} />;
  if (area === "support") return <SupportPage />;
  if (hubs[area]) return <TeacherHub area={area} />;

  return <TeacherHub area="classes" />;
}

function TeacherHub({ area }: { area: string }) {
  const hub = hubs[area] ?? hubs.classes;
  return (
    <div className="focused-hub page-stack">
      <header className="focused-hub-heading">
        <div><p className="eyebrow">{hub.eyebrow}</p><h1>{hub.title}</h1><p>{hub.description}</p></div>
      </header>
      <section>
        <div className="focused-section-title"><h2>Choose a teacher task</h2><p>Only role-relevant actions are shown in this workspace.</p></div>
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

function TeacherPageIntro({ kind, eyebrow, title, description, actions }: { kind: MarkKind; eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return (
    <header className="op-page-intro">
      <div className="op-title-mark"><ModuleMark kind={kind} size={30} variant="icon" /></div>
      <div className="op-title-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>
      {actions && <div className="op-header-actions">{actions}</div>}
    </header>
  );
}

function TeacherStats({ items }: { items: Array<{ label: string; value: string; note: string; tone?: string }> }) {
  return <section className="op-stat-grid">{items.map((item) => <article key={item.label} className={item.tone ?? ""}><p>{item.label}</p><strong>{item.value}</strong><small>{item.note}</small></article>)}</section>;
}

function Status({ value }: { value: string }) {
  const tone: StatusTone = ["Active", "Approved", "Completed", "Submitted", "Read"].includes(value)
    ? "positive"
    : ["Rejected", "Absent", "Locked"].includes(value)
      ? "negative"
      : ["Pending", "Review", "Attendance pending", "Upcoming", "New"].includes(value)
        ? "warning"
        : "neutral";
  return <span className={`op-status ${tone}`}><i />{value}</span>;
}

function Person({ initials, name, detail }: { initials: string; name: string; detail: string }) {
  return <div className="op-person"><span>{initials}</span><div><strong>{name}</strong><small>{detail}</small></div></div>;
}

function TeacherProfile() {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "classes", "documents"];
  return (
    <div className="page-stack teacher-profile-page">
      {/* Hero banner */}
      <section className="teacher-hero-banner">
        <div className="teacher-hero-gradient" />
        <div className="teacher-hero-content">
          <div className="teacher-hero-avatar">NK</div>
          <div className="teacher-hero-info">
            <p className="eyebrow" style={{ color: "rgba(255,255,255,.7)", marginBottom: 4 }}>Teacher Profile</p>
            <h1 style={{ margin: "0 0 4px", color: "#fff", fontSize: "clamp(22px,2.5vw,32px)", letterSpacing: "-.04em" }}>{teacherConfig.teacherName}</h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,.75)", fontSize: 12 }}>{teacherConfig.role} &nbsp;·&nbsp; Employee {teacherConfig.teacherCode} &nbsp;·&nbsp; Science Dept.</p>
          </div>
          <div className="teacher-hero-meta">
            <span className="op-status positive"><i /> Active</span>
            <div className="teacher-hero-contacts">
              <span><Phone size={13} /> +91 98765 21040</span>
              <span><Mail size={13} /> nisha.kapoor@vidyasanskar.edu</span>
            </div>
          </div>
        </div>

        {/* Quick KPI ribbon inside banner */}
        <div className="teacher-hero-kpi">
          <div><strong>96.8%</strong><span>Attendance this month</span></div>
          <div><strong>184</strong><span>Assigned students</span></div>
          <div><strong>4</strong><span>Classes taught</span></div>
          <div><strong>1</strong><span>Pending leave</span></div>
        </div>
      </section>

      <section className="teacher-profile-tabs">
        {tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{teacherTitleFromSlug(item)}</button>)}
      </section>

      {tab === "overview" && (
        <div className="teacher-profile-overview-grid">
          {/* Left column */}
          <div className="teacher-profile-left">
            <section className="op-panel">
              <div className="op-panel-heading"><div><h2>Official details</h2><p>Visible to the school office and permitted admin users.</p></div></div>
              <dl className="teacher-detail-list">
                <div><dt>Department</dt><dd>Science</dd></div>
                <div><dt>Designation</dt><dd>Senior Teacher</dd></div>
                <div><dt>Joining date</dt><dd>04 Apr 2019</dd></div>
                <div><dt>Class teacher</dt><dd>Class 10-B</dd></div>
                <div><dt>Subjects</dt><dd>Science, Biology practicals</dd></div>
                <div><dt>Experience</dt><dd>7 years</dd></div>
              </dl>
            </section>

            {/* Today's schedule mini-list */}
            <section className="op-panel">
              <div className="op-panel-heading"><div><h2>Today&apos;s schedule</h2><p>Periods remaining for today.</p></div><Link href="/teacher/timetable" className="op-text-button">Full timetable</Link></div>
              <div className="teacher-today-schedule">
                {timetable.map((item) => (
                  <div key={item.period} className={`teacher-schedule-row ${item.status === "Attendance pending" ? "urgent" : item.status === "Completed" ? "done" : ""}`}>
                    <span className="teacher-schedule-time">{item.time}</span>
                    <div className="teacher-schedule-info">
                      <strong>{item.className}</strong>
                      <small>{item.subject} &nbsp;·&nbsp; {item.room}</small>
                    </div>
                    <Status value={item.status} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="teacher-profile-right">
            {/* Notifications */}
            <section className="op-panel teacher-notif-panel">
              <div className="op-panel-heading"><div><h2>Notifications</h2><p>Recent alerts from the school system.</p></div><span className="teacher-notif-badge">3 new</span></div>
              <div className="teacher-notif-list">
                {[
                  { kind: "communication", title: "Staff meeting moved to Friday", sub: "Today, 9:00 AM", tone: "new" },
                  { kind: "leave", title: "Leave request SLV-781 approved", sub: "Yesterday", tone: "" },
                  { kind: "attendance", title: "Class 8-A attendance pending", sub: "Due by 12:15 PM", tone: "urgent" },
                  { kind: "exams", title: "Term I assessment dates published", sub: "12 Jul 2026", tone: "" },
                ].map((n) => (
                  <div key={n.title} className={`teacher-notif-item ${n.tone}`}>
                    <span className="teacher-notif-icon">
                      <ModuleMark kind={n.kind} size={28} variant="illustration" />
                    </span>
                    <div>
                      <strong>{n.title}</strong>
                      <small>{n.sub}</small>
                    </div>
                    {n.tone === "new" && <span className="teacher-notif-dot" />}
                  </div>
                ))}
              </div>
            </section>

            {/* Quick actions */}
            <section className="op-panel">
              <div className="op-panel-heading"><div><h2>Quick actions</h2></div></div>
              <div className="teacher-quick-actions">
                <Link href="/teacher/attendance/mark" className="teacher-quick-action-card primary-action">
                  <span><ModuleMark kind="attendance" size={30} variant="illustration" /></span>
                  <div><strong>Mark attendance</strong><small>Class 8-A pending</small></div>
                  <ArrowRight size={16} className="qa-arrow" />
                </Link>
                <Link href="/teacher/exams/marks-entry" className="teacher-quick-action-card">
                  <span><ModuleMark kind="exams" size={30} variant="illustration" /></span>
                  <div><strong>Enter marks</strong><small>36 pending entries</small></div>
                  <ArrowRight size={16} className="qa-arrow" />
                </Link>
                <Link href="/teacher/communication/messages" className="teacher-quick-action-card">
                  <span><ModuleMark kind="communication" size={30} variant="illustration" /></span>
                  <div><strong>Messages</strong><small>1 unread</small></div>
                  <ArrowRight size={16} className="qa-arrow" />
                </Link>
                <Link href="/teacher/leave/apply" className="teacher-quick-action-card">
                  <span><ModuleMark kind="leave" size={30} variant="illustration" /></span>
                  <div><strong>Apply leave</strong><small>New request</small></div>
                  <ArrowRight size={16} className="qa-arrow" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}

      {tab === "classes" && <ClassCards />}
      {tab === "documents" && <DocumentsPanel />}
    </div>
  );
}

function ClassCards() {
  return <section className="teacher-class-grid">{teacherClasses.map((item) => <ClassCard key={item.id} item={item} />)}</section>;
}

function ClassCard({ item }: { item: typeof teacherClasses[number] }) {
  return (
    <Link href={`/teacher/classes/${item.id}`} className="teacher-class-card">
      <span><ModuleMark kind="students" size={36} variant="illustration" /></span>
      <div><small>{item.role}</small><h3>{item.name}</h3><p>{item.subject} - {item.room}</p></div>
      <footer><b>{item.students} students</b><strong>{item.next}</strong></footer>
    </Link>
  );
}



function DocumentsPanel() {
  return <section className="op-panel"><div className="op-panel-heading"><div><h2>Documents</h2><p>Private employee files stay visible only to authorized admin users and this employee.</p></div><button className="secondary-button"><UploadCloud size={16} /> Upload</button></div><div className="teacher-document-list">{["Appointment letter", "Qualification certificate", "ID proof", "Training certificate"].map((item) => <article key={item}><FileText size={18} /><div><strong>{item}</strong><small>Uploaded - PDF</small></div><button className="op-text-button">View</button></article>)}</div></section>;
}

function TeacherTimetable() {
  const [day, setDay] = useState("Monday");
  return (
    <div className="page-stack op-page">
      <TeacherPageIntro kind="timetable" eyebrow="My schedule" title="My timetable" description="Today's periods, room allocation and attendance status." actions={<button className="secondary-button"><Download size={16} /> Download</button>} />
      <section className="teacher-day-switcher">{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((item) => <button key={item} className={day === item ? "active" : ""} onClick={() => setDay(item)}>{item}</button>)}</section>
      <section className="op-panel teacher-timetable-panel">
        {timetable.map((item) => <article key={item.period}>
          <time><strong>Period {item.period}</strong><span>{item.time}</span></time>
          <div><h3>{item.className}</h3><p>{item.subject}</p></div>
          <span>{item.room}</span>
          <Status value={item.status} />
          <Link href={item.className.includes("Class") || /^\d/.test(item.className) ? `/teacher/classes/${item.className.toLowerCase().replace("class ", "").replace(" ", "-")}` : "/teacher/timetable"}>Open</Link>
        </article>)}
      </section>
    </div>
  );
}

function ClassWorkspace({ classId, tab }: { classId: string; tab?: string }) {
  const classInfo = teacherClasses.find((item) => item.id === classId) ?? teacherClasses[0];
  const active = tab ?? "overview";
  return (
    <div className="page-stack op-page">
      <TeacherPageIntro kind="students" eyebrow={classInfo.role} title={classInfo.name} description={`${classInfo.subject} - ${classInfo.students} students - ${classInfo.room}`} actions={<Link className="primary-button" href={`/teacher/classes/${classInfo.id}/attendance`}>Mark attendance</Link>} />
      <section className="teacher-class-tabs">
        {["overview", "students", "attendance", "marks"].map((item) => <Link key={item} className={active === item ? "active" : ""} href={`/teacher/classes/${classInfo.id}/${item}`}>{teacherTitleFromSlug(item)}</Link>)}
      </section>
      {active === "students" ? <AssignedStudents className={classInfo.name.replace("Class ", "")} embedded /> : active === "attendance" ? <MarkAttendance embedded /> : active === "marks" ? <MarksEntry embedded /> : active === "messages" ? <TeacherMessages compact /> : active === "homework" ? <HomeworkPanel /> : <ClassOverview classInfo={classInfo} />}
    </div>
  );
}

function ClassOverview({ classInfo }: { classInfo: typeof teacherClasses[number] }) {
  const reviewStudents = assignedStudents.filter((s) => s.status === "Review");
  return (
    <>
      {/* 3-stat banner */}
      <div className="class-overview-banner">
        <div className="class-stat-card">
          <span className="class-stat-icon"><ModuleMark kind="students" size={34} variant="illustration" /></span>
          <div>
            <strong>{classInfo.students}</strong>
            <p>Total students</p>
          </div>
        </div>
        <div className="class-stat-card green">
          <span className="class-stat-icon"><ModuleMark kind="attendance" size={34} variant="illustration" /></span>
          <div>
            <strong>{classInfo.attendance}</strong>
            <p>Attendance this month</p>
          </div>
        </div>
        <div className="class-stat-card amber">
          <span className="class-stat-icon"><ModuleMark kind="exams" size={34} variant="illustration" /></span>
          <div>
            <strong>Unit Test I</strong>
            <p>Next exam due</p>
          </div>
        </div>
      </div>

      <div className="class-overview-grid">
        {/* Today's period for this class */}
        <section className="op-panel">
          <div className="op-panel-heading">
            <div><h2>Today&apos;s class periods</h2><p>Periods scheduled for {classInfo.name} today.</p></div>
            <Link href={`/teacher/classes/${classInfo.id}/attendance`} className="primary-button" style={{ fontSize: 11 }}>Mark attendance</Link>
          </div>
          <div className="teacher-today-schedule">
            {timetable.filter((p) => p.className === classInfo.id.toUpperCase().replace("-", "-") || p.className.toLowerCase().includes(classInfo.id)).slice(0, 3).length > 0
              ? timetable.filter((p) => p.className.toLowerCase().includes(classInfo.id.split("-")[0])).slice(0, 3).map((item) => (
                <div key={item.period} className={`teacher-schedule-row ${item.status === "Attendance pending" ? "urgent" : item.status === "Completed" ? "done" : ""}`}>
                  <span className="teacher-schedule-time">{item.time}</span>
                  <div className="teacher-schedule-info">
                    <strong>Period {item.period}</strong>
                    <small>{item.subject} · {item.room}</small>
                  </div>
                  <Status value={item.status} />
                </div>
              ))
              : timetable.slice(0, 3).map((item) => (
                <div key={item.period} className={`teacher-schedule-row ${item.status === "Attendance pending" ? "urgent" : item.status === "Completed" ? "done" : ""}`}>
                  <span className="teacher-schedule-time">{item.time}</span>
                  <div className="teacher-schedule-info">
                    <strong>Period {item.period}</strong>
                    <small>{item.subject} · {item.room}</small>
                  </div>
                  <Status value={item.status} />
                </div>
              ))
            }
          </div>
        </section>

        {/* Students needing attention (only if any) */}
        {reviewStudents.length > 0 && (
          <section className="op-panel">
            <div className="op-panel-heading">
              <div><h2>Attention needed</h2><p>{reviewStudents.length} student{reviewStudents.length > 1 ? "s" : ""} flagged for review.</p></div>
              <Link href={`/teacher/classes/${classInfo.id}/students`} className="op-text-button">All students</Link>
            </div>
            <div className="teacher-alert-list">
              {reviewStudents.map((student) => (
                <article key={student.id}>
                  <Person initials={student.initials} name={student.name} detail={`${student.id} — ${student.attendance} attendance`} />
                  <Status value="Review" />
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function AssignedStudents({ reviewOnly = false, className, embedded = false }: { reviewOnly?: boolean; className?: string; embedded?: boolean }) {
  const rows = useMemo(() => assignedStudents.filter((student) => (!reviewOnly || student.status === "Review") && (!className || student.className === className)), [reviewOnly, className]);
  const content = (
    <section className="op-panel">
      <div className="op-filter-row">
        <div className="op-search wide"><Search size={15} /><input placeholder="Search name, roll no. or admission no." /></div>
        <label>Class<select><option>All assigned classes</option><option>Class 10-B</option><option>Class 9-A</option><option>Class 8-A</option></select></label>
        <label>Status<select><option>All visible students</option><option>Needs review</option><option>Active</option></select></label>
      </div>
      <div className="op-table-wrap"><table className="op-table"><thead><tr><th>Roll</th><th>Student</th><th>Class</th><th>Attendance</th><th>Last score</th><th>Alert</th><th>Status</th></tr></thead><tbody>{rows.map((student) => <tr key={student.id}><td>{student.roll}</td><td><Person initials={student.initials} name={student.name} detail={student.id} /></td><td><strong>{student.className}</strong></td><td>{student.attendance}</td><td>{student.score}/100</td><td>{student.alert}</td><td><Status value={student.status} /></td></tr>)}</tbody></table></div>
    </section>
  );
  if (embedded) return content;
  return <div className="page-stack op-page"><TeacherPageIntro kind="students" eyebrow="Assigned students" title={reviewOnly ? "Students needing review" : "Assigned students"} description="Teachers can only see students from assigned classes and subjects." />{content}</div>;
}

function MarkAttendance({ embedded = false }: { embedded?: boolean }) {
  const [state, setState] = useState<Record<string, string>>(() => Object.fromEntries(assignedStudents.map((student) => [student.id, "Present"])));
  const present = Object.values(state).filter((value) => value === "Present").length;
  const content = (
    <>
      <section className="register-context"><div><label>Class & section<button>8-A</button></label><label>Date<button>13 July 2026</button></label><label>Subject<button>Science</button></label></div><span><Clock3 size={16} /> Register closes at 12:15 PM</span></section>
      <section className="data-panel register-panel"><div className="register-summary"><div><p>Present</p><strong>{present}</strong></div><div><p>Absent</p><strong>{assignedStudents.length - present}</strong></div><div><p>Leave</p><strong>0</strong></div><div className="op-bulk-actions"><button className="secondary-button" onClick={() => setState(Object.fromEntries(assignedStudents.map((student) => [student.id, "Present"])))}>Mark all present</button><button className="secondary-button" onClick={() => setState(Object.fromEntries(assignedStudents.map((student) => [student.id, "Absent"])))}>Mark all absent</button></div></div><div className="table-wrap"><table className="data-table register-table"><thead><tr><th>Roll no.</th><th>Student</th><th>Attendance</th><th>Remark</th></tr></thead><tbody>{assignedStudents.map((student) => <tr key={student.id}><td>{student.roll}</td><td><Person initials={student.initials} name={student.name} detail={student.id} /></td><td><div className="attendance-toggle">{["Present", "Absent", "Leave"].map((value) => <button key={value} className={state[student.id] === value ? `active ${value.toLowerCase()}` : ""} onClick={() => setState({ ...state, [student.id]: value })}>{value}</button>)}</div></td><td><input className="remark-input" placeholder="Add remark" /></td></tr>)}</tbody></table></div><footer className="register-footer"><p><Check size={16} /> Frontend preview only. Backend will validate teacher assignment.</p><div><button className="secondary-button">Save draft</button><button className="primary-button">Submit attendance</button></div></footer></section>
    </>
  );
  if (embedded) return content;
  return <div className="page-stack"><TeacherPageIntro kind="attendance" eyebrow="Daily register" title="Mark attendance" description="Mark attendance for one assigned class. No school-wide register is exposed here." />{content}</div>;
}

function SubmittedAttendance() {
  return <SimpleTablePage kind="attendance" eyebrow="Daily register" title="Submitted attendance" description="Registers submitted by this teacher." columns={["Class", "Date", "Submitted", "Present", "Absent", "Status"]} rows={[["10-B", "13 Jul 2026", "08:58 AM", "40", "2", "Submitted"], ["9-A", "13 Jul 2026", "10:08 AM", "44", "2", "Submitted"], ["8-A", "13 Jul 2026", "-", "-", "-", "Pending"]]} />;
}

function CorrectionRequest() {
  return <FormPage kind="leave" eyebrow="Attendance correction" title="Request correction" description="Locked attendance needs admin approval before it changes." fields={["Class", "Student", "Date", "Current status", "Requested status", "Reason"]} submit="Send correction request" />;
}

function MarksEntry({ embedded = false }: { embedded?: boolean }) {
  const [scores, setScores] = useState<Record<string, string>>(() => Object.fromEntries(assignedStudents.map((student, index) => [student.id, index < 4 ? student.score : ""])));
  const completed = Object.values(scores).filter(Boolean).length;
  const content = (
    <>
      <section className="register-context"><div><label>Class<button>9-A</button></label><label>Exam<button>Unit Test I</button></label><label>Subject<button>Science</button></label></div><span><Clock3 size={16} /> Maximum marks: 100</span></section>
      <section className="data-panel register-panel"><div className="register-summary"><div><p>Students</p><strong>{assignedStudents.length}</strong></div><div><p>Marks entered</p><strong>{completed}</strong></div><div><p>Pending</p><strong>{assignedStudents.length - completed}</strong></div><button className="secondary-button">Import marks</button></div><div className="table-wrap"><table className="data-table register-table"><thead><tr><th>Roll no.</th><th>Student</th><th>Marks</th><th>Remark</th></tr></thead><tbody>{assignedStudents.map((student) => <tr key={student.id}><td>{student.roll}</td><td><Person initials={student.initials} name={student.name} detail={student.id} /></td><td><input className="marks-input" value={scores[student.id]} onChange={(event) => setScores({ ...scores, [student.id]: event.target.value })} placeholder="-" /></td><td><input className="remark-input" placeholder="Optional" /></td></tr>)}</tbody></table></div><footer className="register-footer"><p><Check size={16} /> Marks stay editable until admin verification locks them.</p><div><button className="secondary-button">Save draft</button><button className="primary-button">Submit marks</button></div></footer></section>
    </>
  );
  if (embedded) return content;
  return <div className="page-stack"><TeacherPageIntro kind="exams" eyebrow="Marks entry" title="Enter marks" description="Only assigned subject and class combinations are available." />{content}</div>;
}

function SubmittedMarks() {
  return <SimpleTablePage kind="exams" eyebrow="Marks" title="Submitted marks" description="Marks submitted by this teacher and waiting for verification." columns={["Class", "Exam", "Subject", "Submitted", "Average", "Status"]} rows={[["10-B", "Unit Test I", "Science", "12 Jul 2026", "78.5", "Submitted"], ["9-A", "Practical", "Science", "10 Jul 2026", "82.1", "Submitted"], ["8-A", "Unit Test I", "Science", "-", "-", "Pending"]]} />;
}

function ExamScheduleView() {
  return <SimpleTablePage kind="timetable" eyebrow="Exam schedule" title="My exam schedule" description="Upcoming exam duties and assigned subject windows." columns={["Date", "Class", "Subject", "Time", "Room", "Status"]} rows={[["04 Aug", "10-B", "Science", "9:00 - 11:00 AM", "Room 12", "Upcoming"], ["08 Aug", "9-A", "Science", "9:00 - 11:00 AM", "Room 08", "Upcoming"], ["11 Aug", "8-A", "Science", "9:00 - 11:00 AM", "Room 05", "Upcoming"]]} />;
}

function LeaveApply() {
  return <FormPage kind="leave" eyebrow="Staff leave" title="Apply leave" description="Submit a simple leave request. Admin approval will decide the final status." fields={["Leave type", "From date", "To date", "Substitute suggestion", "Reason"]} submit="Submit leave request" />;
}

function LeaveRequests() {
  return <div className="page-stack op-page"><TeacherPageIntro kind="leave" eyebrow="Staff leave" title="My leave requests" description="Track leave status without opening staff HR controls." /><TeacherStats items={[{ label: "Available casual leave", value: "8", note: "Days remaining" }, { label: "Pending", value: "1", note: "Awaiting admin", tone: "amber" }, { label: "Approved this year", value: "6", note: "Leave days", tone: "green" }, { label: "Rejected", value: "0", note: "This year" }]} /><section className="op-panel"><div className="op-leave-list teacher-leave-list">{leaveRequests.map((item) => <article key={item.id}><div><strong>{item.type}</strong><small>{item.id}</small></div><div className="op-leave-reason"><small>Dates</small><strong>{item.dates}</strong></div><div className="op-leave-reason"><small>Reason</small><strong>{item.reason}</strong></div><Status value={item.status} /><button className="op-text-button">View</button></article>)}</div></section></div>;
}

function TeacherMessages({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(1);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const thread = messages.find((item) => item.id === active) ?? messages[0];
  const send = () => { if (draft.trim()) { setSent([...sent, draft.trim()]); setDraft(""); } };
  const content = <section className="op-messaging teacher-messaging"><aside className="op-thread-panel"><div className="op-thread-head"><strong>Conversations</strong><span>1 unread</span></div><div className="op-search wide"><Search size={15} /><input placeholder="Search conversations" /></div><nav>{messages.map((item) => <button className={active === item.id ? "active" : ""} key={item.id} onClick={() => setActive(item.id)}><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.preview}</small></div><time>{item.time}</time>{item.unread > 0 && <b>{item.unread}</b>}</button>)}</nav></aside><div className="op-conversation"><header><Person initials={thread.initials} name={thread.name} detail={thread.context} /><button>View context</button></header><div className="op-message-stream"><div className="op-day-divider"><span>Today</span></div><article className="received"><p>{thread.preview}</p><time>{thread.time}</time></article><article className="sent"><p>I will check and update this before the end of the school day.</p><time>Just now - Draft preview</time></article>{sent.map((message, index) => <article className="sent" key={index}><p>{message}</p><time>Just now - Sent</time></article>)}</div><footer className="op-message-composer"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message..." /><div><button>Attach file</button><span>Backend will enforce recipient permissions</span><button className="primary-button" onClick={send}><Send size={15} /> Send</button></div></footer></div></section>;
  if (compact) return content;
  return <div className="page-stack op-page"><TeacherPageIntro kind="communication" eyebrow="Communication" title="Messages" description="Teacher messaging is limited to assigned families, school office and permitted groups." actions={<button className="primary-button"><MessageSquare size={16} /> New message</button>} />{content}</div>;
}

function TeacherAnnouncements() {
  return <div className="page-stack op-page"><TeacherPageIntro kind="communication" eyebrow="School notices" title="Announcements" description="Notices relevant to this teacher and their classes." /><section className="op-panel"><div className="op-announcement-list">{announcements.map((item) => <article key={item.title}><div className="op-announcement-symbol"><Bell size={19} /></div><div><span>{item.audience}</span><h3>{item.title}</h3><p>{item.body}</p><footer><small>{item.date}</small></footer></div><Status value={item.status} /><button className="op-more">...</button></article>)}</div></section></div>;
}

function HolidayList({ events = false }: { events?: boolean }) {
  const rows = events ? [
    { date: "22 Jul", day: "Wednesday", title: "Science exhibition planning", applies: "Science department", type: "Teacher duty" },
    { date: "29 Aug", day: "Saturday", title: "School foundation day", applies: "Whole school", type: "Event duty" },
  ] : holidays;
  return <div className="page-stack op-page"><TeacherPageIntro kind="holidays" eyebrow="School calendar" title={events ? "Events" : "Holiday list"} description="Read-only calendar items that affect teacher schedules." /><section className="op-panel"><div className="teacher-calendar-list">{rows.map((item) => <article key={item.title}><time><strong>{item.date}</strong><small>{item.day}</small></time><div><h3>{item.title}</h3><p>{item.applies}</p></div><Status value={item.type} /></article>)}</div></section></div>;
}

function SupportPage() {
  return <div className="page-stack op-page"><TeacherPageIntro kind="settings" eyebrow="Help" title="Teacher support" description="Simple support options for classroom workflow issues." /><section className="teacher-support-grid">{[["Attendance issue", "Attendance is locked or student list is wrong."], ["Marks entry issue", "Exam, subject or marks entry is unavailable."], ["Timetable issue", "Period, room or class assignment looks incorrect."], ["Account issue", "Password, profile or notification problem."]].map(([title, detail]) => <article key={title}><span><ModuleMark kind="settings" size={34} variant="illustration" /></span><h3>{title}</h3><p>{detail}</p><button className="secondary-button">Create ticket</button></article>)}</section></div>;
}

function HomeworkPanel() {
  return <section className="op-panel"><div className="op-panel-heading"><div><h2>Homework</h2><p>Create and review homework for this assigned class.</p></div><button className="primary-button">Assign homework</button></div><div className="teacher-document-list">{["Chapter 4 worksheet", "Lab observation notes", "Revision questions"].map((item, index) => <article key={item}><FileText size={18} /><div><strong>{item}</strong><small>{index === 0 ? "12 submissions pending" : "Published"}</small></div><button className="op-text-button">Open</button></article>)}</div></section>;
}

function SimpleTablePage({ kind, eyebrow, title, description, columns, rows }: { kind: MarkKind; eyebrow: string; title: string; description: string; columns: string[]; rows: string[][] }) {
  return <div className="page-stack op-page"><TeacherPageIntro kind={kind} eyebrow={eyebrow} title={title} description={description} actions={<button className="secondary-button"><Filter size={16} /> Filters</button>} /><section className="op-panel"><div className="op-table-wrap"><table className="op-table"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{index === row.length - 1 ? <Status value={cell} /> : <strong>{cell}</strong>}</td>)}</tr>)}</tbody></table></div></section></div>;
}

function FormPage({ kind, eyebrow, title, description, fields, submit }: { kind: MarkKind; eyebrow: string; title: string; description: string; fields: string[]; submit: string }) {
  const [saved, setSaved] = useState(false);
  return <div className="page-stack focused-form-page"><header className="focused-form-heading"><span><ModuleMark kind={kind} size={32} /></span><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></header>{saved && <div className="op-success-notice"><strong>Request saved</strong><span>This is mock frontend state. Backend approval workflow will be connected later.</span><button onClick={() => setSaved(false)}>Dismiss</button></div>}<section className="simple-focused-form"><div className="form-intro"><span>1</span><div><h2>Required details</h2><p>Keep the form short so teachers can finish quickly.</p></div></div><div className="field-grid">{fields.map((field, index) => <label className={`field ${field === "Reason" ? "full" : ""}`} key={field}><span>{field}{index < 3 && <b>*</b>}</span>{field === "Reason" ? <textarea placeholder={`Enter ${field.toLowerCase()}`} /> : field.includes("date") || field.includes("Date") ? <input type="date" /> : <input placeholder={`Enter ${field.toLowerCase()}`} />}</label>)}</div><footer className="simple-form-actions"><button className="secondary-button">Cancel</button><button className="primary-button" onClick={() => setSaved(true)}>{submit}<ArrowRight size={16} /></button></footer></section></div>;
}
