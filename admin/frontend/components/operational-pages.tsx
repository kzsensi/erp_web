"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ModuleMark, type MarkKind } from "@/components/module-mark";

type OperationalProps = { area: string; page: string };
type StaffMode = "all-staff" | "teachers" | "non-teaching";
type LeaveStatus = "Pending" | "Approved" | "Rejected";

const staffRecords = [
  { id: "STF-001", initials: "NK", name: "Nisha Kapoor", type: "Teaching", role: "Senior Teacher", department: "Science", phone: "+91 98765 21040", attendance: "96.8%", status: "Active" },
  { id: "STF-014", initials: "RM", name: "Rohan Mehta", type: "Teaching", role: "Class Teacher · 10-B", department: "Mathematics", phone: "+91 98102 11428", attendance: "94.5%", status: "Active" },
  { id: "STF-027", initials: "PS", name: "Priya Sharma", type: "Teaching", role: "Primary Teacher", department: "Primary Wing", phone: "+91 98918 77240", attendance: "97.2%", status: "Active" },
  { id: "STF-042", initials: "AS", name: "Aditya Singh", type: "Teaching", role: "Sports Teacher", department: "Physical Education", phone: "+91 99583 16220", attendance: "91.6%", status: "On leave" },
  { id: "STF-063", initials: "SK", name: "Suman Khanna", type: "Non-teaching", role: "Accountant", department: "Accounts", phone: "+91 98111 28543", attendance: "98.1%", status: "Active" },
  { id: "STF-071", initials: "VR", name: "Vikram Rao", type: "Non-teaching", role: "Office Assistant", department: "Administration", phone: "+91 99712 40331", attendance: "95.9%", status: "Active" },
  { id: "STF-084", initials: "MJ", name: "Manoj Joshi", type: "Non-teaching", role: "Transport Manager", department: "Transport", phone: "+91 98913 56610", attendance: "93.7%", status: "Active" },
];

const studentAttendance = [
  { no: "01", id: "STU-1024", initials: "AS", name: "Aarav Sharma", className: "10-B", in: "07:54 AM", out: "—", status: "Present" },
  { no: "02", id: "STU-1025", initials: "DM", name: "Diya Mehta", className: "10-B", in: "08:01 AM", out: "—", status: "Present" },
  { no: "03", id: "STU-1026", initials: "KS", name: "Kabir Singh", className: "10-B", in: "—", out: "—", status: "Absent" },
  { no: "04", id: "STU-1027", initials: "MP", name: "Myra Patel", className: "10-B", in: "08:08 AM", out: "—", status: "Late" },
  { no: "05", id: "STU-1028", initials: "VG", name: "Vihaan Gupta", className: "10-B", in: "—", out: "—", status: "Leave" },
  { no: "06", id: "STU-1029", initials: "AJ", name: "Anaya Joshi", className: "10-B", in: "07:58 AM", out: "—", status: "Present" },
];

const staffAttendance = staffRecords.map((item, index) => ({
  ...item,
  in: index === 3 ? "—" : ["07:42 AM", "07:51 AM", "07:47 AM", "—", "08:02 AM", "07:56 AM", "08:06 AM"][index],
  out: "—",
  dayStatus: index === 3 ? "Leave" : index === 6 ? "Late" : "Present",
}));

const leaveSeed = [
  { id: "LEV-2401", initials: "KS", name: "Kabir Singh", detail: "Class 10-B · STU-1026", from: "15 Jul 2026", to: "16 Jul 2026", days: "2 days", reason: "Family function", status: "Pending" as LeaveStatus },
  { id: "LEV-2402", initials: "DM", name: "Diya Mehta", detail: "Class 8-A · STU-1025", from: "14 Jul 2026", to: "14 Jul 2026", days: "1 day", reason: "Medical appointment", status: "Pending" as LeaveStatus },
  { id: "LEV-2395", initials: "VG", name: "Vihaan Gupta", detail: "Class 5-B · STU-1028", from: "10 Jul 2026", to: "11 Jul 2026", days: "2 days", reason: "Unwell", status: "Approved" as LeaveStatus },
];

const staffLeaveSeed = [
  { id: "SLV-801", initials: "AS", name: "Aditya Singh", detail: "Sports Teacher · Physical Education", from: "13 Jul 2026", to: "15 Jul 2026", days: "3 days", reason: "Personal leave", status: "Approved" as LeaveStatus },
  { id: "SLV-804", initials: "NK", name: "Nisha Kapoor", detail: "Senior Teacher · Science", from: "17 Jul 2026", to: "18 Jul 2026", days: "2 days", reason: "Family commitment", status: "Pending" as LeaveStatus },
  { id: "SLV-805", initials: "VR", name: "Vikram Rao", detail: "Office Assistant · Administration", from: "20 Jul 2026", to: "20 Jul 2026", days: "1 day", reason: "Medical appointment", status: "Pending" as LeaveStatus },
];

const dues = [
  { id: "STU-1024", initials: "AS", name: "Aarav Sharma", className: "10-B", guardian: "Rakesh Sharma", phone: "+91 98765 43210", due: "₹33,600", since: "10 Jul 2026", status: "Overdue" },
  { id: "STU-1026", initials: "KS", name: "Kabir Singh", className: "6-C", guardian: "Amar Singh", phone: "+91 98100 44921", due: "₹24,000", since: "15 Jul 2026", status: "Due soon" },
  { id: "STU-1028", initials: "VG", name: "Vihaan Gupta", className: "5-B", guardian: "Kunal Gupta", phone: "+91 99201 88216", due: "₹16,800", since: "10 Jul 2026", status: "Overdue" },
  { id: "STU-1031", initials: "RA", name: "Riya Arora", className: "9-C", guardian: "Manish Arora", phone: "+91 98990 42219", due: "₹12,400", since: "20 Jul 2026", status: "Due soon" },
  { id: "STU-1034", initials: "RT", name: "Reyansh Tiwari", className: "7-A", guardian: "Sonal Tiwari", phone: "+91 98180 72261", due: "₹28,500", since: "05 Jul 2026", status: "Overdue" },
];

const feeStructures = [
  { group: "Pre-Primary", classes: "Nursery–KG", tuition: "₹2,800 / month", annual: "₹8,500", transport: "Optional", total: "₹42,100", updated: "08 Apr 2026" },
  { group: "Primary", classes: "Class 1–5", tuition: "₹3,400 / month", annual: "₹10,000", transport: "₹2,600 / month", total: "₹50,800", updated: "08 Apr 2026" },
  { group: "Middle", classes: "Class 6–8", tuition: "₹4,200 / month", annual: "₹12,000", transport: "₹2,600 / month", total: "₹62,400", updated: "10 Apr 2026" },
  { group: "Secondary", classes: "Class 9–10", tuition: "₹5,200 / month", annual: "₹14,000", transport: "₹2,800 / month", total: "₹76,400", updated: "10 Apr 2026" },
  { group: "Senior Secondary", classes: "Class 11–12", tuition: "₹6,100 / month", annual: "₹16,000", transport: "₹2,800 / month", total: "₹89,200", updated: "12 Apr 2026" },
];

const threads = [
  { id: 1, initials: "RS", name: "Rakesh Sharma", context: "Parent · Aarav, 10-B", preview: "Thank you, I received the timetable.", time: "10:42 AM", unread: 0 },
  { id: 2, initials: "NK", name: "Nisha Kapoor", context: "Senior Teacher · Science", preview: "Can the lab schedule be updated?", time: "9:18 AM", unread: 2 },
  { id: 3, initials: "P8", name: "Parents · Class 8-A", context: "32 recipients", preview: "Reminder: orientation starts at 10:30.", time: "Yesterday", unread: 0 },
  { id: 4, initials: "TM", name: "Teaching staff", context: "78 recipients", preview: "The staff meeting has moved to Friday.", time: "12 Jul", unread: 0 },
];

const announcements = [
  { title: "Parent orientation · Classes 6–10", audience: "Parents and class teachers", body: "The parent orientation will begin at 10:30 AM in the main auditorium.", published: "Today, 8:15 AM", reach: "486 delivered", status: "Published" },
  { title: "Inter-school quiz selection", audience: "Students · Classes 8–10", body: "Interested students can submit their names to their class teacher by Wednesday.", published: "12 Jul 2026", reach: "312 delivered", status: "Published" },
  { title: "Monsoon uniform reminder", audience: "All parents", body: "Please send a labelled raincoat and an additional pair of socks with students.", published: "Scheduled · 15 Jul, 7:00 AM", reach: "1,208 recipients", status: "Scheduled" },
];

const timetables = [
  { className: "10-A", teacher: "Rohan Mehta", file: "class-10-a-term-1.pdf", updated: "12 Jul 2026, 3:40 PM", version: "Version 3", status: "Published" },
  { className: "10-B", teacher: "Nisha Kapoor", file: "class-10-b-term-1.pdf", updated: "12 Jul 2026, 3:28 PM", version: "Version 2", status: "Published" },
  { className: "9-A", teacher: "Priya Sharma", file: "class-9-a-term-1.png", updated: "10 Jul 2026, 1:15 PM", version: "Version 1", status: "Published" },
  { className: "8-A", teacher: "Mohit Verma", file: "class-8-a-draft.pdf", updated: "09 Jul 2026, 4:05 PM", version: "Draft", status: "Draft" },
  { className: "7-B", teacher: "Anjali Nair", file: "class-7-b-term-1.pdf", updated: "08 Jul 2026, 11:20 AM", version: "Version 1", status: "Published" },
];

const examSessions = [
  { date: "04 Aug", day: "Tuesday", subject: "English Language", classes: "Classes 6–10", time: "9:00–11:00 AM", rooms: "12 rooms", status: "Confirmed" },
  { date: "06 Aug", day: "Thursday", subject: "Mathematics", classes: "Classes 6–10", time: "9:00–11:00 AM", rooms: "12 rooms", status: "Confirmed" },
  { date: "08 Aug", day: "Saturday", subject: "Science", classes: "Classes 6–10", time: "9:00–11:00 AM", rooms: "12 rooms", status: "Confirmed" },
  { date: "11 Aug", day: "Tuesday", subject: "Social Science", classes: "Classes 6–10", time: "9:00–11:00 AM", rooms: "12 rooms", status: "Draft" },
  { date: "13 Aug", day: "Thursday", subject: "Second Language", classes: "Classes 6–10", time: "9:00–11:00 AM", rooms: "12 rooms", status: "Draft" },
];

export function OperationalPage({ area, page }: OperationalProps) {
  if (area === "attendance" && (page === "student-attendance" || page === "staff-attendance")) return <AttendanceRegister staff={page === "staff-attendance"} />;
  if (area === "staff" && (["all-staff", "teachers", "non-teaching"] as string[]).includes(page)) return <StaffDirectory mode={page as StaffMode} />;
  if (area === "setup" && page === "departments") return <DepartmentsPage />;
  if (area === "leave" && (page === "student-leave" || page === "staff-leave")) return <LeaveRequests staff={page === "staff-leave"} />;
  if (area === "fees" && page === "due-list") return <DuesList />;
  if (area === "fees" && page === "fee-structure") return <FeeStructure />;
  if (area === "communication" && page === "messages") return <MessagesPage />;
  if (area === "communication" && page === "announcements") return <AnnouncementsPage />;
  if (area === "events-holidays" && page === "add-holiday") return <HolidayForm />;
  if (area === "timetable" && page === "all") return <TimetableList />;
  if (area === "examinations" && page === "exam-schedule") return <ExamSchedule />;
  return null;
}

function PageIntro({ kind, eyebrow, title, description, actions }: { kind: MarkKind; eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return <header className="op-page-intro"><div className="op-title-mark"><ModuleMark kind={kind} size={30} /></div><div className="op-title-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{actions && <div className="op-header-actions">{actions}</div>}</header>;
}

function StatCards({ items }: { items: Array<{ label: string; value: string; note: string; tone?: string }> }) {
  return <section className="op-stat-grid">{items.map(item => <article key={item.label} className={item.tone ?? ""}><p>{item.label}</p><strong>{item.value}</strong><small>{item.note}</small></article>)}</section>;
}

function Status({ value }: { value: string }) {
  const tone = ["Present", "Active", "Approved", "Published", "Confirmed"].includes(value) ? "positive" : ["Absent", "Rejected", "Overdue"].includes(value) ? "negative" : ["Pending", "Late", "Due soon", "Scheduled"].includes(value) ? "warning" : "neutral";
  return <span className={`op-status ${tone}`}><i />{value}</span>;
}

function Person({ initials, name, detail }: { initials: string; name: string; detail: string }) {
  return <div className="op-person"><span>{initials}</span><div><strong>{name}</strong><small>{detail}</small></div></div>;
}

function AttendanceRegister({ staff }: { staff: boolean }) {
  const rows = staff ? staffAttendance : studentAttendance;
  const total = staff ? 112 : 1248;
  const present = staff ? 108 : 1158;
  return <div className="page-stack op-page">
    <PageIntro kind="attendance" eyebrow="Daily register" title={staff ? "Staff attendance" : "Student attendance"} description={staff ? "Review teaching and non-teaching staff check-in for today." : "Review class-wise presence, absence, late arrival and leave."} actions={<><button className="secondary-button">Download report</button><button className="primary-button">Mark attendance</button></>} />
    <StatCards items={[{ label: staff ? "Total staff" : "Total students", value: total.toLocaleString("en-IN"), note: staff ? "78 teaching · 34 non-teaching" : "Across 36 class sections" }, { label: "Present", value: present.toLocaleString("en-IN"), note: staff ? "96.4% attendance" : "92.8% attendance", tone: "green" }, { label: "Absent", value: staff ? "3" : "72", note: "Not checked in", tone: "red" }, { label: "Late / leave", value: staff ? "5" : "18", note: "Recorded separately", tone: "amber" }]} />
    <section className="op-panel">
      <div className="op-filter-row"><div className="op-date-nav"><button>‹</button><strong>Monday, 13 July 2026</strong><button>›</button></div><label>{staff ? "Staff type" : "Class"}<select><option>{staff ? "All staff" : "Class 10"}</option><option>{staff ? "Teaching" : "Class 9"}</option><option>{staff ? "Non-teaching" : "Class 8"}</option></select></label>{!staff && <label>Section<select><option>Section B</option><option>Section A</option><option>All sections</option></select></label>}<label>Status<select><option>All statuses</option><option>Present</option><option>Absent</option><option>Late</option><option>Leave</option></select></label><div className="op-search"><span>⌕</span><input placeholder="Search name or ID" /></div></div>
      <div className="op-context-line"><span><i /> Device sync completed at 8:15 AM</span><strong>Showing {rows.length} of {total.toLocaleString("en-IN")} records</strong></div>
      <div className="op-table-wrap"><table className="op-table"><thead><tr><th>{staff ? "Employee" : "Roll no."}</th><th>{staff ? "Department & role" : "Student"}</th><th>Check-in</th><th>Check-out</th><th>Status</th><th>Remark</th></tr></thead><tbody>{rows.map((row) => {
        const staffRow = "dayStatus" in row;
        return <tr key={row.id}><td>{staffRow ? <Person initials={row.initials} name={row.name} detail={row.id} /> : row.no}</td><td>{staffRow ? <><strong>{row.department}</strong><small className="op-cell-sub">{row.role}</small></> : <Person initials={row.initials} name={row.name} detail={`${row.id} · ${row.className}`} />}</td><td><strong>{row.in}</strong></td><td>{row.out}</td><td><Status value={staffRow ? row.dayStatus : row.status} /></td><td><button className="op-text-button">Add remark</button></td></tr>;
      })}</tbody></table></div>
      <footer className="op-table-footer"><span>Data shown is mock frontend data</span><div><button disabled>Previous</button><button className="active">1</button><button>2</button><button>Next</button></div></footer>
    </section>
  </div>;
}

function StaffDirectory({ mode }: { mode: StaffMode }) {
  const rows = useMemo(() => staffRecords.filter(item => mode === "all-staff" || (mode === "teachers" ? item.type === "Teaching" : item.type === "Non-teaching")), [mode]);
  const title = mode === "all-staff" ? "All staff" : mode === "teachers" ? "Teaching staff" : "Non-teaching staff";
  return <div className="page-stack op-page">
    <PageIntro kind="staff" eyebrow="Employee directory" title={title} description={mode === "all-staff" ? "Search and manage every school employee from one directory." : mode === "teachers" ? "Teachers, class assignments and academic departments." : "Administration, accounts, transport and support employees."} actions={<Link href="/admin/staff/add-staff" className="primary-button">Add staff</Link>} />
    <StatCards items={[{ label: "All staff", value: "112", note: "106 active" }, { label: "Teaching", value: "78", note: "Across 12 subjects", tone: "green" }, { label: "Non-teaching", value: "34", note: "Across 8 departments" }, { label: "On leave today", value: "4", note: "All approved", tone: "amber" }]} />
    <section className="op-panel">
      <div className="op-directory-tabs"><Link className={mode === "all-staff" ? "active" : ""} href="/admin/staff/all-staff">All staff <span>112</span></Link><Link className={mode === "teachers" ? "active" : ""} href="/admin/staff/teachers">Teaching <span>78</span></Link><Link className={mode === "non-teaching" ? "active" : ""} href="/admin/staff/non-teaching">Non-teaching <span>34</span></Link></div>
      <div className="op-filter-row"><div className="op-search wide"><span>⌕</span><input placeholder="Search name, employee ID or phone" /></div><label>Department<select><option>All departments</option><option>Science</option><option>Mathematics</option><option>Administration</option><option>Accounts</option></select></label><label>Status<select><option>Active staff</option><option>On leave</option><option>Inactive</option></select></label><button className="secondary-button">Export list</button></div>
      <div className="op-table-wrap"><table className="op-table"><thead><tr><th>Employee</th><th>Staff type</th><th>Role</th><th>Department</th><th>Phone</th><th>Attendance</th><th>Status</th><th /></tr></thead><tbody>{rows.map(item => <tr key={item.id}><td><Person initials={item.initials} name={item.name} detail={item.id} /></td><td><span className="op-type-chip">{item.type}</span></td><td>{item.role}</td><td>{item.department}</td><td>{item.phone}</td><td><strong>{item.attendance}</strong></td><td><Status value={item.status} /></td><td><button className="op-more">•••</button></td></tr>)}</tbody></table></div>
      <footer className="op-table-footer"><span>Showing {rows.length} sample records</span><div><button disabled>Previous</button><button className="active">1</button><button>2</button><button>Next</button></div></footer>
    </section>
  </div>;
}

function DepartmentsPage() {
  const departments = [
    { code: "SCI", name: "Science", head: "Nisha Kapoor", staff: 14, teaching: 13, color: "blue" },
    { code: "MAT", name: "Mathematics", head: "Rohan Mehta", staff: 11, teaching: 11, color: "teal" },
    { code: "PRI", name: "Primary Wing", head: "Priya Sharma", staff: 24, teaching: 22, color: "amber" },
    { code: "ADM", name: "Administration", head: "Meera Bhatia", staff: 9, teaching: 0, color: "rose" },
    { code: "ACC", name: "Accounts", head: "Suman Khanna", staff: 6, teaching: 0, color: "violet" },
    { code: "TRN", name: "Transport", head: "Manoj Joshi", staff: 18, teaching: 0, color: "green" },
  ];
  return <div className="page-stack op-page"><PageIntro kind="staff" eyebrow="Staff setup" title="Departments" description="The small set of departments used to organise school employees." actions={<button className="primary-button">Add department</button>} />
    <section className="op-department-overview"><div><span>8</span><p><strong>Active departments</strong><small>Across teaching and operations</small></p></div><div><span>112</span><p><strong>Assigned staff</strong><small>Every employee has a department</small></p></div><div><span>0</span><p><strong>Unassigned staff</strong><small>No action required</small></p></div></section>
    <section className="op-panel"><div className="op-panel-heading"><div><h2>School departments</h2><p>Select a department to view or update its staff structure.</p></div><div className="op-search"><span>⌕</span><input placeholder="Search departments" /></div></div><div className="op-department-grid">{departments.map(item => <button key={item.code} className="op-department-card"><span className={item.color}>{item.code}</span><div><h3>{item.name}</h3><p>Head: {item.head}</p><footer><small>{item.staff} staff</small><small>{item.teaching ? `${item.teaching} teaching` : "Non-teaching"}</small></footer></div><i /></button>)}</div></section>
  </div>;
}

function LeaveRequests({ staff }: { staff: boolean }) {
  const [rows, setRows] = useState(staff ? staffLeaveSeed : leaveSeed);
  const update = (id: string, status: LeaveStatus) => setRows(current => current.map(item => item.id === id ? { ...item, status } : item));
  return <div className="page-stack op-page"><PageIntro kind="leave" eyebrow="Requests & approvals" title={staff ? "Staff leave" : "Student leave"} description={staff ? "Review staff availability and decide pending leave requests." : "Review student requests, dates, reasons and approval status."} actions={!staff && <Link className="primary-button" href="/admin/leave/student-leave-form">Add student leave</Link>} />
    <StatCards items={[{ label: "Pending", value: String(rows.filter(x => x.status === "Pending").length), note: "Awaiting decision", tone: "amber" }, { label: "Approved this month", value: staff ? "18" : "42", note: staff ? "31 leave days" : "58 leave days", tone: "green" }, { label: staff ? "Staff away today" : "Students away today", value: staff ? "4" : "16", note: "Approved leave" }, { label: "Rejected this month", value: staff ? "2" : "5", note: "Reason recorded", tone: "red" }]} />
    <section className="op-panel"><div className="op-directory-tabs"><button className="active">All requests <span>{rows.length}</span></button><button>Pending <span>{rows.filter(x => x.status === "Pending").length}</span></button><button>Approved</button><button>Rejected</button></div><div className="op-filter-row"><div className="op-search wide"><span>⌕</span><input placeholder={`Search ${staff ? "staff" : "student"} name or ID`} /></div><label>Date range<select><option>This month</option><option>Today</option><option>Next 7 days</option></select></label><label>{staff ? "Department" : "Class"}<select><option>All {staff ? "departments" : "classes"}</option></select></label></div>
      <div className="op-leave-list">{rows.map(item => <article key={item.id}><Person initials={item.initials} name={item.name} detail={item.detail} /><div className="op-leave-dates"><span><small>From</small><strong>{item.from}</strong></span><i>→</i><span><small>To</small><strong>{item.to}</strong></span><b>{item.days}</b></div><div className="op-leave-reason"><small>Reason</small><strong>{item.reason}</strong></div><Status value={item.status} /><div className="op-leave-actions">{item.status === "Pending" ? <><button onClick={() => update(item.id, "Rejected")}>Reject</button><button className="approve" onClick={() => update(item.id, "Approved")}>Approve</button></> : <button>View</button>}</div></article>)}</div>
    </section>
  </div>;
}

function DuesList() {
  const [reminded, setReminded] = useState<string[]>([]);
  return <div className="page-stack op-page"><PageIntro kind="fees" eyebrow="Fee management" title="Dues list" description="Find outstanding balances and follow up with the right families." actions={<button className="secondary-button">Download dues</button>} />
    <StatCards items={[{ label: "Total outstanding", value: "₹4.20L", note: "286 students", tone: "red" }, { label: "Overdue", value: "₹1.14L", note: "Past due date", tone: "amber" }, { label: "Due this week", value: "₹1.86L", note: "124 students" }, { label: "Collected this month", value: "₹18.4L", note: "81% of expected", tone: "green" }]} />
    <section className="op-panel"><div className="op-filter-row"><div className="op-search wide"><span>⌕</span><input placeholder="Search student, admission no. or guardian" /></div><label>Class<select><option>All classes</option><option>Class 10</option><option>Class 9</option></select></label><label>Due status<select><option>All outstanding</option><option>Overdue</option><option>Due soon</option></select></label><label>Fee head<select><option>All fee heads</option><option>Tuition fee</option><option>Transport</option></select></label></div>
      <div className="op-bulk-bar"><label><input type="checkbox" /> Select all on this page</label><span>Use selection to send a single reminder to multiple families.</span><button className="secondary-button">Send bulk reminder</button></div>
      <div className="op-table-wrap"><table className="op-table"><thead><tr><th /><th>Student</th><th>Class</th><th>Guardian</th><th>Due date</th><th>Outstanding</th><th>Status</th><th>Follow-up</th></tr></thead><tbody>{dues.map(item => <tr key={item.id}><td><input type="checkbox" /></td><td><Person initials={item.initials} name={item.name} detail={item.id} /></td><td><strong>{item.className}</strong></td><td><strong>{item.guardian}</strong><small className="op-cell-sub">{item.phone}</small></td><td>{item.since}</td><td><strong className="op-due-amount">{item.due}</strong></td><td><Status value={item.status} /></td><td><button className={reminded.includes(item.id) ? "op-reminded" : "op-text-button"} onClick={() => setReminded([...reminded, item.id])}>{reminded.includes(item.id) ? "Reminder sent" : "Send reminder"}</button></td></tr>)}</tbody></table></div>
    </section>
  </div>;
}

function FeeStructure() {
  const [year, setYear] = useState("2026–27");
  return <div className="page-stack op-page"><PageIntro kind="fees" eyebrow="Fee management" title="Fee structure" description="Class-wise fee heads, instalments and totals for the active academic year." actions={<button className="primary-button">Create fee structure</button>} />
    <section className="op-year-banner"><div><p>Academic year</p><select value={year} onChange={e => setYear(e.target.value)}><option>2026–27</option><option>2025–26</option></select></div><span><strong>{year === "2026–27" ? "Active structure" : "Previous structure"}</strong><small>5 class groups · 8 fee heads · Quarterly and monthly instalments</small></span><button className="secondary-button">Manage fee heads</button></section>
    <section className="op-panel"><div className="op-panel-heading"><div><h2>Class-wise structure</h2><p>Amounts shown exclude optional transport unless assigned.</p></div><div className="op-search"><span>⌕</span><input placeholder="Search class group" /></div></div><div className="op-table-wrap"><table className="op-table op-fee-table"><thead><tr><th>Class group</th><th>Classes</th><th>Tuition fee</th><th>Annual charges</th><th>Transport</th><th>Annual total</th><th>Updated</th><th /></tr></thead><tbody>{feeStructures.map(item => <tr key={item.group}><td><strong>{item.group}</strong></td><td>{item.classes}</td><td>{item.tuition}</td><td>{item.annual}</td><td>{item.transport}</td><td><strong className="op-total-fee">{item.total}</strong></td><td>{item.updated}</td><td><button className="op-text-button">Edit</button></td></tr>)}</tbody></table></div></section>
    <section className="op-fee-heads"><header><div><h2>Fee heads in this structure</h2><p>These heads can be assigned monthly, quarterly, annually or once.</p></div></header><div>{[["Tuition fee","Monthly","Required"],["Annual charges","Annually","Required"],["Development fee","Annually","Required"],["Computer fee","Quarterly","Class dependent"],["Transport fee","Monthly","Optional"],["Activity fee","Annually","Required"]].map(row => <article key={row[0]}><span>₹</span><div><strong>{row[0]}</strong><small>{row[1]}</small></div><b>{row[2]}</b></article>)}</div></section>
  </div>;
}

function MessagesPage() {
  const [active, setActive] = useState(1);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const thread = threads.find(x => x.id === active) ?? threads[0];
  const send = () => { if (draft.trim()) { setSent([...sent, draft.trim()]); setDraft(""); } };
  return <div className="page-stack op-page"><PageIntro kind="communication" eyebrow="School communication" title="Messages" description="Direct and group conversations with parents, students and staff." actions={<button className="primary-button">New message</button>} />
    <section className="op-messaging"><aside className="op-thread-panel"><div className="op-thread-head"><strong>Conversations</strong><span>2 unread</span></div><div className="op-search wide"><span>⌕</span><input placeholder="Search conversations" /></div><nav>{threads.map(item => <button className={active === item.id ? "active" : ""} key={item.id} onClick={() => setActive(item.id)}><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.preview}</small></div><time>{item.time}</time>{item.unread > 0 && <b>{item.unread}</b>}</button>)}</nav></aside>
      <div className="op-conversation"><header><Person initials={thread.initials} name={thread.name} detail={thread.context} /><button>View details</button></header><div className="op-message-stream"><div className="op-day-divider"><span>Today</span></div><article className="received"><p>Good morning. Could you please confirm whether the updated timetable has been published?</p><time>9:34 AM</time></article><article className="sent"><p>Yes, the revised timetable is now available in the student portal. It is effective from tomorrow.</p><time>9:41 AM · Delivered</time></article><article className="received"><p>{thread.preview}</p><time>10:42 AM</time></article>{sent.map((message, index) => <article className="sent" key={index}><p>{message}</p><time>Just now · Sent</time></article>)}</div><footer className="op-message-composer"><textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Write a message…" /><div><button>Attach file</button><span>Enter to send later with backend</span><button className="primary-button" onClick={send}>Send message</button></div></footer></div>
      <aside className="op-context-panel"><div className="op-context-person"><span>{thread.initials}</span><h3>{thread.name}</h3><p>{thread.context}</p></div><dl><div><dt>Preferred channel</dt><dd>Portal + SMS</dd></div><div><dt>Last contacted</dt><dd>Today, 10:42 AM</dd></div><div><dt>Messages this term</dt><dd>12</dd></div></dl><button>Open related profile</button></aside>
    </section>
  </div>;
}

function AnnouncementsPage() {
  const [composer, setComposer] = useState(false);
  const [published, setPublished] = useState(false);
  return <div className="page-stack op-page"><PageIntro kind="communication" eyebrow="School communication" title="Announcements" description="Publish important updates to selected classes, parents or staff." actions={<button className="primary-button" onClick={() => setComposer(!composer)}>{composer ? "Close composer" : "Create announcement"}</button>} />
    <StatCards items={[{ label: "Published this month", value: "12", note: "Across all audiences" }, { label: "Scheduled", value: "3", note: "Next: 15 Jul", tone: "amber" }, { label: "Delivery rate", value: "98.6%", note: "Portal, SMS and email", tone: "green" }, { label: "Failed delivery", value: "17", note: "Contact data missing", tone: "red" }]} />
    {composer && <section className="op-announcement-composer"><div className="op-composer-main"><div className="form-intro"><span>1</span><div><h2>Compose announcement</h2><p>Select recipients before publishing.</p></div></div><label>Announcement title<input placeholder="Example: Parent orientation update" /></label><label>Message<textarea placeholder="Write a clear announcement…" /></label></div><aside><h3>Audience</h3><label>Send to<select><option>Selected classes</option><option>All students & parents</option><option>All staff</option><option>Whole school</option></select></label><label>Classes<select><option>Classes 6–10</option><option>Class 10 only</option></select></label><label className="op-check"><input type="checkbox" defaultChecked /> Portal notification</label><label className="op-check"><input type="checkbox" defaultChecked /> SMS</label><label className="op-check"><input type="checkbox" /> Email</label><div><button className="secondary-button">Save draft</button><button className="primary-button" onClick={() => { setPublished(true); setComposer(false); }}>Publish now</button></div></aside></section>}
    {published && <div className="op-success-notice"><strong>Announcement published</strong><span>The selected recipients will receive it through the chosen channels.</span><button onClick={() => setPublished(false)}>Dismiss</button></div>}
    <section className="op-panel"><div className="op-directory-tabs"><button className="active">All announcements <span>15</span></button><button>Published <span>12</span></button><button>Scheduled <span>3</span></button><button>Drafts <span>2</span></button></div><div className="op-announcement-list">{announcements.map(item => <article key={item.title}><div className="op-announcement-symbol"><ModuleMark kind="communication" size={23} /></div><div><span>{item.audience}</span><h3>{item.title}</h3><p>{item.body}</p><footer><small>{item.published}</small><small>{item.reach}</small></footer></div><Status value={item.status} /><button className="op-more">•••</button></article>)}</div></section>
  </div>;
}

function HolidayForm() {
  const [saved, setSaved] = useState(false);
  return <div className="page-stack op-page"><PageIntro kind="holidays" eyebrow="School calendar" title="Add holiday" description="Add one holiday and choose who should see it." />
    {saved && <div className="op-success-notice"><strong>Holiday added to the calendar</strong><span>Independence Day is now visible to the selected audience.</span><button onClick={() => setSaved(false)}>Dismiss</button></div>}
    <div className="op-form-layout"><section className="op-panel op-holiday-form"><div className="form-intro"><span>1</span><div><h2>Holiday details</h2><p>Required fields are marked with an asterisk.</p></div></div><div className="op-form-grid"><label className="full">Holiday name *<input defaultValue="Independence Day" /></label><label>Date *<input type="date" defaultValue="2026-08-15" /></label><label>Holiday type *<select><option>National holiday</option><option>School holiday</option><option>Regional holiday</option></select></label><label>Applies to *<select><option>Students and all staff</option><option>Students only</option><option>Staff only</option></select></label><label>Academic year<select><option>2026–27</option></select></label><label className="full">Short note<textarea defaultValue="School will remain closed. Regular classes resume on the next working day." /></label></div><footer className="simple-form-actions"><Link className="secondary-button" href="/admin/events-holidays">Cancel</Link><button className="primary-button" onClick={() => setSaved(true)}>Add holiday</button></footer></section>
      <aside className="op-holiday-preview"><p className="eyebrow">Calendar preview</p><div className="op-date-card"><strong>15</strong><span>August 2026</span><small>Saturday</small></div><h3>Independence Day</h3><p>National holiday</p><div><span><i />Students</span><span><i />Teaching staff</span><span><i />Non-teaching staff</span></div><small>This holiday will later sync automatically to student and staff calendars.</small></aside>
    </div>
  </div>;
}

function TimetableList() {
  const [selected, setSelected] = useState(timetables[0]);
  return <div className="page-stack op-page"><PageIntro kind="timetable" eyebrow="Class schedule" title="Uploaded timetables" description="Review the latest timetable file published for every class and section." actions={<Link className="primary-button" href="/admin/timetable/upload">Upload timetable</Link>} />
    <StatCards items={[{ label: "Class sections", value: "36", note: "Across Classes 1–12" }, { label: "Published", value: "32", note: "Visible to users", tone: "green" }, { label: "Draft", value: "3", note: "Not yet visible", tone: "amber" }, { label: "Missing", value: "1", note: "Needs upload", tone: "red" }]} />
    <div className="op-timetable-layout"><section className="op-panel"><div className="op-filter-row"><div className="op-search wide"><span>⌕</span><input placeholder="Search class or teacher" /></div><label>Class<select><option>All classes</option><option>Class 10</option><option>Class 9</option></select></label><label>Status<select><option>All statuses</option><option>Published</option><option>Draft</option></select></label></div><div className="op-timetable-list">{timetables.map(item => <button key={item.className} className={selected.className === item.className ? "active" : ""} onClick={() => setSelected(item)}><span className="op-class-block">{item.className}</span><div><strong>{item.className} timetable</strong><small>Class teacher: {item.teacher}</small></div><span><Status value={item.status} /><small>{item.updated}</small></span><i /></button>)}</div></section>
      <aside className="op-timetable-preview"><header><span><ModuleMark kind="timetable" size={27} /></span><div><h2>{selected.className} timetable</h2><p>{selected.version}</p></div><Status value={selected.status} /></header><div className="op-file-preview"><div className="op-mini-schedule">{["MON","TUE","WED","THU","FRI"].map((day, i) => <div key={day}><strong>{day}</strong><span>{["MAT","SCI","ENG","HIN","SST"][i]}</span><span>{["ENG","MAT","SCI","SST","MAT"][i]}</span><span>{["SCI","HIN","MAT","ENG","PE"][i]}</span></div>)}</div></div><dl><div><dt>File</dt><dd>{selected.file}</dd></div><div><dt>Class teacher</dt><dd>{selected.teacher}</dd></div><div><dt>Last updated</dt><dd>{selected.updated}</dd></div></dl><div className="op-preview-actions"><button className="secondary-button">Download</button><button className="primary-button">Replace file</button></div></aside>
    </div>
  </div>;
}

function ExamSchedule() {
  const [view, setView] = useState("schedule");
  return <div className="page-stack op-page"><PageIntro kind="exams" eyebrow="Examinations" title="Exam schedule" description="Plan subject dates, timings and rooms without a complex examination module." actions={<button className="primary-button">Create schedule</button>} />
    <section className="op-exam-banner"><div><p>Current examination</p><h2>Term I Assessment · 2026–27</h2><span>04–13 August 2026 · Classes 6–10</span></div><Status value="Draft" /><button className="secondary-button">Edit details</button></section>
    <section className="op-panel"><div className="op-directory-tabs"><button className={view === "schedule" ? "active" : ""} onClick={() => setView("schedule")}>Schedule</button><button className={view === "classes" ? "active" : ""} onClick={() => setView("classes")}>Class coverage</button><button className={view === "conflicts" ? "active" : ""} onClick={() => setView("conflicts")}>Conflicts <span>0</span></button></div><div className="op-filter-row"><label>Exam group<select><option>Term I Assessment</option><option>Unit Test I</option></select></label><label>Class<select><option>Classes 6–10</option><option>Class 10</option></select></label><div className="op-search wide"><span>⌕</span><input placeholder="Search subject" /></div><button className="secondary-button">Download schedule</button></div>
      {view === "schedule" && <div className="op-exam-list">{examSessions.map(item => <article key={item.date}><time><strong>{item.date.split(" ")[0]}</strong><span>{item.date.split(" ")[1]}</span><small>{item.day}</small></time><div className="op-exam-line"><span /><div><h3>{item.subject}</h3><p>{item.classes}</p></div><dl><div><dt>Time</dt><dd>{item.time}</dd></div><div><dt>Rooms</dt><dd>{item.rooms}</dd></div></dl><Status value={item.status} /><button className="op-text-button">Edit</button></div></article>)}</div>}
      {view === "classes" && <div className="op-class-coverage">{["Class 6","Class 7","Class 8","Class 9","Class 10"].map(item => <article key={item}><span><ModuleMark kind="exams" size={22} /></span><div><strong>{item}</strong><small>5 subjects · 184 students</small></div><b>Complete</b></article>)}</div>}
      {view === "conflicts" && <div className="op-empty-state"><span><ModuleMark kind="exams" size={36} /></span><h2>No scheduling conflicts</h2><p>No student, room or timing conflicts were found in this schedule.</p></div>}
    </section>
  </div>;
}
