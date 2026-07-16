"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  Bus,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Send,
  ShieldCheck,
} from "lucide-react";
import { ModuleMark, type MarkKind } from "@/components/module-mark";
import { familyConfig, familyTitleFromSlug } from "@/lib/family-navigation";

type Props = { segments: string[] };

const children = [
  { id: "aarav", initials: "AS", name: "Aarav Sharma", className: "Class 10-B", admission: "STU-1024", attendance: "94.2%", today: "Present", bus: "Route 01", feeDue: "Rs 33,600", result: "84%" },
  { id: "priya", initials: "PS", name: "Priya Sharma", className: "Class 4-A", admission: "STU-1188", attendance: "97.1%", today: "Present", bus: "Route 01", feeDue: "Rs 0", result: "A" },
];

const homework = [
  { id: "HW-101", child: "Aarav Sharma", className: "10-B", subject: "Science", title: "Chapter 4 worksheet", due: "Tomorrow", status: "Pending", teacher: "Nisha Kapoor" },
  { id: "HW-102", child: "Aarav Sharma", className: "10-B", subject: "Mathematics", title: "Quadratic equations practice", due: "16 Jul", status: "Submitted", teacher: "Rohan Mehta" },
  { id: "HW-103", child: "Priya Sharma", className: "4-A", subject: "English", title: "Reading journal page 18", due: "Today", status: "Pending", teacher: "Meera Nair" },
];

const attendanceDays = [
  ["13 Jul", "Present", "7:54 AM", "School gate"],
  ["12 Jul", "Present", "7:58 AM", "School gate"],
  ["11 Jul", "Holiday", "-", "School holiday"],
  ["10 Jul", "Late", "8:08 AM", "Class teacher notified"],
  ["09 Jul", "Present", "7:51 AM", "School gate"],
  ["08 Jul", "Leave", "-", "Approved leave"],
];

const resultRows = [
  ["Science", "84", "100", "A", "Good practical work"],
  ["Mathematics", "91", "100", "A+", "Excellent"],
  ["English", "78", "100", "B+", "Improve writing detail"],
  ["Social Science", "81", "100", "A", "Consistent"],
];

const feeRows = [
  ["Term II tuition fee", "15 Jul 2026", "Rs 24,000", "Due"],
  ["Transport Jul-Sep", "10 Jul 2026", "Rs 7,800", "Overdue"],
  ["Activity fee", "01 Aug 2026", "Rs 1,800", "Upcoming"],
];

const messages = [
  { id: 1, initials: "NK", name: "Nisha Kapoor", context: "Science teacher - Aarav", preview: "Aarav's science project feedback is ready.", time: "10:42 AM", unread: 1 },
  { id: 2, initials: "OF", name: "School office", context: "Accounts", preview: "Term II fee reminder has been generated.", time: "Yesterday", unread: 0 },
  { id: 3, initials: "RT", name: "Route 01 transport", context: "Bus updates", preview: "Route 01 is expected on time today.", time: "12 Jul", unread: 0 },
];

const calendarItems = [
  { date: "15 Aug", day: "Saturday", title: "Independence Day", note: "School holiday", tone: "holiday" },
  { date: "22 Jul", day: "Wednesday", title: "Parent-teacher meeting", note: "Class 10-B - 11:30 AM", tone: "event" },
  { date: "04 Aug", day: "Tuesday", title: "Term I assessment begins", note: "Classes 6-10", tone: "exam" },
];

const documents = [
  ["Fee receipt - April 2026", "PDF", "Available"],
  ["Report card - Term I", "PDF", "Available"],
  ["Bonafide certificate", "Request", "Can request"],
  ["Transport pass", "PDF", "Available"],
];

const hubs: Record<string, {
  eyebrow: string;
  title: string;
  description: string;
  actions: Array<{ title: string; description: string; href: string; kind: MarkKind; meta: string; primary?: boolean }>;
}> = {
  children: {
    eyebrow: "Linked children",
    title: "Children",
    description: "Choose a child to see attendance, timetable, homework, fees and results in one place.",
    actions: [
      { title: "Aarav Sharma", description: "Class 10-B overview with today's status and school updates.", href: "/family/children/aarav", kind: "students", meta: "Present today", primary: true },
      { title: "Priya Sharma", description: "Class 4-A overview with attendance and homework.", href: "/family/children/priya", kind: "students", meta: "Present today" },
    ],
  },
  attendance: {
    eyebrow: "Daily status",
    title: "Attendance",
    description: "See whether your children reached school, and check monthly attendance clearly.",
    actions: [
      { title: "Today", description: "Both linked children are marked present today.", href: "/family/attendance/today", kind: "attendance", meta: "2 present", primary: true },
      { title: "Monthly calendar", description: "Review present, absent, late, leave and holiday days.", href: "/family/attendance/monthly", kind: "holidays", meta: "July 2026" },
      { title: "Ask for correction", description: "Raise a correction request if something looks wrong.", href: "/family/attendance/correction-request", kind: "leave", meta: "Admin review" },
    ],
  },
  homework: {
    eyebrow: "Learning tasks",
    title: "Homework",
    description: "A parent-friendly list of what is due, submitted, or needs attention.",
    actions: [
      { title: "Open homework", description: "See pending and submitted work for linked children.", href: "/family/homework/list", kind: "timetable", meta: "3 tasks", primary: true },
      { title: "Submission history", description: "Review recently submitted work.", href: "/family/homework/history", kind: "settings", meta: "Mock view" },
    ],
  },
  fees: {
    eyebrow: "Payments",
    title: "Fees",
    description: "Clear due amount, receipt history and payment action without accounting complexity.",
    actions: [
      { title: "Due fees", description: "View fee heads and due dates.", href: "/family/fees/due", kind: "fees", meta: "Rs 33,600", primary: true },
      { title: "Pay now", description: "Preview payment flow for selected dues.", href: "/family/fees/pay-now", kind: "fees", meta: "Mock payment" },
      { title: "Receipts", description: "Download previous receipts.", href: "/family/fees/receipts", kind: "settings", meta: "4 receipts" },
    ],
  },
  results: {
    eyebrow: "Academic progress",
    title: "Results",
    description: "Simple marks, grades and teacher remarks for parents.",
    actions: [
      { title: "Latest result", description: "View Term I subject-wise scores.", href: "/family/results/latest", kind: "exams", meta: "84% Science", primary: true },
      { title: "Report cards", description: "Open downloadable report cards.", href: "/family/results/report-cards", kind: "settings", meta: "2 available" },
    ],
  },
  messages: {
    eyebrow: "Communication",
    title: "Messages",
    description: "Teacher and school-office communication in one safe place.",
    actions: [
      { title: "Inbox", description: "Read and reply to permitted conversations.", href: "/family/messages/inbox", kind: "communication", meta: "1 unread", primary: true },
      { title: "Announcements", description: "School notices for your children.", href: "/family/announcements", kind: "communication", meta: "3 notices" },
    ],
  },
  calendar: {
    eyebrow: "School calendar",
    title: "Calendar",
    description: "Upcoming holidays, exams and parent meetings.",
    actions: [
      { title: "Upcoming", description: "See the next school events affecting your family.", href: "/family/calendar/upcoming", kind: "holidays", meta: "3 items", primary: true },
      { title: "Events", description: "School events and parent meetings.", href: "/family/events", kind: "timetable", meta: "2 events" },
    ],
  },
  documents: {
    eyebrow: "Downloads",
    title: "Documents",
    description: "Receipts, report cards, certificates and school documents.",
    actions: [
      { title: "Available documents", description: "Download already generated files.", href: "/family/documents/list", kind: "settings", meta: "4 files", primary: true },
      { title: "Request certificate", description: "Ask school office for a new document.", href: "/family/documents/request", kind: "settings", meta: "Mock request" },
    ],
  },
};

export function FamilyModulePage({ segments }: Props) {
  const area = segments[0] ?? "dashboard";
  const page = segments[segments.length - 1] ?? area;
  const child = area === "children" && segments[1] ? children.find((item) => item.id === segments[1]) : null;

  if (child) return <ChildOverview child={child} tab={segments[2] ?? "overview"} />;
  if (area === "attendance" && ["today", "monthly", "attendance"].includes(page)) return <AttendancePage />;
  if (area === "attendance" && page === "correction-request") return <SimpleFamilyForm kind="leave" eyebrow="Attendance" title="Ask for correction" description="Tell the school if an attendance entry looks wrong." fields={["Child", "Date", "Current status", "Correction needed", "Reason"]} submit="Send request" />;
  if (area === "homework") return <HomeworkPage history={page === "history"} />;
  if (area === "fees" && page === "pay-now") return <PayFeesPage />;
  if (area === "fees" && (page === "due" || page === "fees")) return <FeesPage />;
  if (area === "fees" && page === "receipts") return <DocumentsPage receiptsOnly />;
  if (area === "results" && (page === "latest" || page === "results")) return <ResultsPage />;
  if (area === "results" && page === "report-cards") return <DocumentsPage reportOnly />;
  if (area === "messages" && (page === "inbox" || page === "messages")) return <MessagesPage />;
  if (area === "announcements") return <AnnouncementsPage />;
  if ((area === "calendar" && ["upcoming", "calendar"].includes(page)) || area === "events") return <CalendarPage eventsOnly={area === "events"} />;
  if (area === "documents" && page === "request") return <SimpleFamilyForm kind="settings" eyebrow="Documents" title="Request certificate" description="Ask the school office for an official document." fields={["Child", "Document type", "Purpose", "Needed by", "Note"]} submit="Send request" />;
  if (area === "documents") return <DocumentsPage />;
  if (area === "support") return <SupportPage />;
  if (area === "security" || area === "family-profile") return <FamilyProfilePage />;
  if (hubs[area]) return <FamilyHub area={area} />;

  return <FamilyHub area="children" />;
}

function FamilyHub({ area }: { area: string }) {
  const hub = hubs[area] ?? hubs.children;
  return (
    <div className="family-hub page-stack">
      <header className="family-page-intro">
        <span><ModuleMark kind={hub.actions[0].kind} size={58} /></span>
        <div><p className="eyebrow">{hub.eyebrow}</p><h1>{hub.title}</h1><p>{hub.description}</p></div>
      </header>
      <section className={`family-hub-grid count-${hub.actions.length}`}>
        {hub.actions.map((action) => (
          <Link href={action.href} className={action.primary ? "primary" : ""} key={action.title}>
            <span><ModuleMark kind={action.kind} size={70} /></span>
            <div><small>{action.meta}</small><strong>{action.title}</strong><p>{action.description}</p></div>
            <ArrowRight size={24} />
          </Link>
        ))}
      </section>
    </div>
  );
}

function FamilyIntro({ kind, eyebrow, title, description, actions }: { kind: MarkKind; eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return <header className="family-page-intro"><span><ModuleMark kind={kind} size={58} /></span><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{actions && <div className="family-page-actions">{actions}</div>}</header>;
}

function FamilyStatus({ value }: { value: string }) {
  const tone = ["Present", "Submitted", "Available", "Paid", "Read", "A", "A+"].includes(value)
    ? "good"
    : ["Pending", "Due", "Upcoming", "New", "Late"].includes(value)
      ? "warn"
      : ["Overdue", "Absent"].includes(value)
        ? "bad"
        : "calm";
  return <span className={`family-status ${tone}`}><i />{value}</span>;
}

function ChildOverview({ child, tab }: { child: typeof children[number]; tab: string }) {
  return (
    <div className="page-stack">
      <section className="family-child-hero">
        <div className="family-child-avatar">{child.initials}</div>
        <div><p className="eyebrow">Child overview</p><h1>{child.name}</h1><p>{child.className} - Admission {child.admission}</p></div>
        <FamilyStatus value={child.today} />
      </section>
      <section className="family-child-tabs">
        {["overview", "attendance", "homework", "fees", "results", "transport"].map((item) => <Link key={item} className={tab === item ? "active" : ""} href={`/family/children/${child.id}/${item}`}>{familyTitleFromSlug(item)}</Link>)}
      </section>
      {tab === "attendance" ? <AttendancePage embedded childName={child.name} /> : tab === "homework" ? <HomeworkPage embedded /> : tab === "fees" ? <FeesPage embedded /> : tab === "results" ? <ResultsPage embedded /> : tab === "transport" ? <TransportCard /> : <ChildOverviewContent child={child} />}
    </div>
  );
}

function ChildOverviewContent({ child }: { child: typeof children[number] }) {
  return <>
    <section className="family-metric-row">
      <article><span><ModuleMark kind="students" size={32} /></span><div><small>Today</small><strong>{child.today}</strong><p>Checked in at school</p></div></article>
      <article><span><ModuleMark kind="attendance" size={42} /></span><div><small>Attendance</small><strong>{child.attendance}</strong><p>This academic month</p></div></article>
      <article><span><ModuleMark kind="fees" size={32} /></span><div><small>Fee due</small><strong>{child.feeDue}</strong><p>Term II fee status</p></div></article>
      <article><span><ModuleMark kind="exams" size={42} /></span><div><small>Latest result</small><strong>{child.result}</strong><p>Recently published</p></div></article>
    </section>
    <div className="family-two-column">
      <HomeworkPage embedded compact />
      <TransportCard />
    </div>
  </>;
}

function AttendancePage({ embedded = false, childName = "Aarav Sharma" }: { embedded?: boolean; childName?: string }) {
  const body = (
    <>
      <section className="family-metric-row compact">
        <article><span><ModuleMark kind="students" size={32} /></span><div><small>Today</small><strong>Present</strong><p>{childName}</p></div></article>
        <article><span><ModuleMark kind="timetable" size={32} /></span><div><small>Check-in</small><strong>7:54 AM</strong><p>Main gate</p></div></article>
        <article><span><ModuleMark kind="attendance" size={42} /></span><div><small>Month</small><strong>94.2%</strong><p>July attendance</p></div></article>
      </section>
      <section className="family-panel">
        <header><div><p className="eyebrow">July 2026</p><h2>Attendance history</h2></div><Link href="/family/attendance/correction-request">Ask correction</Link></header>
        <div className="family-table-wrap"><table className="family-table"><thead><tr><th>Date</th><th>Status</th><th>Time</th><th>Note</th></tr></thead><tbody>{attendanceDays.map((row) => <tr key={row[0]}><td>{row[0]}</td><td><FamilyStatus value={row[1]} /></td><td>{row[2]}</td><td>{row[3]}</td></tr>)}</tbody></table></div>
      </section>
    </>
  );
  if (embedded) return body;
  return <div className="page-stack"><FamilyIntro kind="attendance" eyebrow="Attendance" title="Attendance" description="Clear daily and monthly attendance for linked children." />{body}</div>;
}

function HomeworkPage({ embedded = false, history = false, compact = false }: { embedded?: boolean; history?: boolean; compact?: boolean }) {
  const [filter, setFilter] = useState(history ? "Submitted" : "All");
  const rows = useMemo(() => homework.filter((item) => filter === "All" || item.status === filter), [filter]);
  const body = <section className="family-panel family-homework-panel"><header><div><p className="eyebrow">Homework</p><h2>{compact ? "Latest homework" : history ? "Submission history" : "Homework list"}</h2></div>{!compact && <div className="family-filter-pills">{["All", "Pending", "Submitted"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>}</header><div className="family-homework-list">{rows.slice(0, compact ? 2 : rows.length).map((item) => <article key={item.id}><span><ModuleMark kind="timetable" size={44} /></span><div><small>{item.subject} - {item.child}</small><strong>{item.title}</strong><p>Due: {item.due} - Teacher: {item.teacher}</p></div><FamilyStatus value={item.status} /></article>)}</div></section>;
  if (embedded) return body;
  return <div className="page-stack"><FamilyIntro kind="timetable" eyebrow="Homework" title="Homework" description="Large, simple task cards for pending and submitted homework." />{body}</div>;
}

function FeesPage({ embedded = false }: { embedded?: boolean }) {
  const body = <><section className="family-fee-hero"><div><p className="eyebrow">Fee due</p><h2>Rs 33,600</h2><p>Term II fees for Aarav Sharma are due by 15 July 2026.</p></div><Link href="/family/fees/pay-now"><CreditCard size={21} /> Pay now</Link></section><section className="family-panel"><header><div><p className="eyebrow">Breakdown</p><h2>Fee heads</h2></div><Link href="/family/fees/receipts">Receipts</Link></header><div className="family-table-wrap"><table className="family-table"><thead><tr><th>Fee head</th><th>Due date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{feeRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{index === 3 ? <FamilyStatus value={cell} /> : cell}</td>)}</tr>)}</tbody></table></div></section></>;
  if (embedded) return body;
  return <div className="page-stack"><FamilyIntro kind="fees" eyebrow="Fees" title="Fees" description="Payment information without confusing accounting controls." />{body}</div>;
}

function PayFeesPage() {
  const [done, setDone] = useState(false);
  return <div className="page-stack"><FamilyIntro kind="fees" eyebrow="Payment" title="Pay fees" description="Mock payment preview. Backend will later connect to a secure gateway." />{done && <div className="family-success"><Check size={18} /><strong>Payment preview completed</strong><span>No real payment was made.</span></div>}<section className="family-pay-layout"><div className="family-panel"><header><div><p className="eyebrow">Selected dues</p><h2>Amount to pay</h2></div></header><div className="family-pay-total"><span>Term II fee + transport</span><strong>Rs 31,800</strong><p>Activity fee can be paid later.</p></div><div className="family-homework-list">{feeRows.slice(0, 2).map((row) => <article key={row[0]}><span><CreditCard size={24} /></span><div><strong>{row[0]}</strong><p>{row[1]}</p></div><b>{row[2]}</b></article>)}</div></div><aside className="family-panel family-payment-method"><header><div><p className="eyebrow">Method</p><h2>Choose payment</h2></div></header><button className="active">UPI</button><button>Card</button><button>Net banking</button><button>Cash at school office</button><Link href="/family/fees/pay-now" onClick={() => setDone(true)}>Continue payment</Link></aside></section></div>;
}

function ResultsPage({ embedded = false }: { embedded?: boolean }) {
  const body = <><section className="family-result-hero"><div><p className="eyebrow">Latest result</p><h2>Term I Assessment</h2><p>Aarav Sharma - Class 10-B</p></div><strong>84%</strong></section><section className="family-panel"><header><div><p className="eyebrow">Subject marks</p><h2>Marks and remarks</h2></div><button className="secondary-button"><Download size={17} /> Download</button></header><div className="family-table-wrap"><table className="family-table"><thead><tr><th>Subject</th><th>Marks</th><th>Max</th><th>Grade</th><th>Remark</th></tr></thead><tbody>{resultRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{index === 3 ? <FamilyStatus value={cell} /> : cell}</td>)}</tr>)}</tbody></table></div></section></>;
  if (embedded) return body;
  return <div className="page-stack"><FamilyIntro kind="exams" eyebrow="Results" title="Results" description="Parent-friendly marks, grades and teacher feedback." />{body}</div>;
}

function MessagesPage() {
  const [active, setActive] = useState(1);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const thread = messages.find((item) => item.id === active) ?? messages[0];
  const send = () => { if (draft.trim()) { setSent([...sent, draft.trim()]); setDraft(""); } };
  return <div className="page-stack"><FamilyIntro kind="communication" eyebrow="Messages" title="Messages" description="Safe conversations with school office, teachers and transport." /><section className="family-messages"><aside><div className="family-search"><Search size={18} /><input placeholder="Search messages" /></div>{messages.map((item) => <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => setActive(item.id)}><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.preview}</small></div><time>{item.time}</time>{item.unread > 0 && <b>{item.unread}</b>}</button>)}</aside><div className="family-chat"><header><span>{thread.initials}</span><div><h2>{thread.name}</h2><p>{thread.context}</p></div></header><main><article className="received"><p>{thread.preview}</p><time>{thread.time}</time></article><article className="sent"><p>Thank you. I will review this today.</p><time>Draft preview</time></article>{sent.map((item, index) => <article className="sent" key={index}><p>{item}</p><time>Just now</time></article>)}</main><footer><textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a reply..." /><button onClick={send}><Send size={18} /> Send</button></footer></div></section></div>;
}

function AnnouncementsPage() {
  return <div className="page-stack"><FamilyIntro kind="communication" eyebrow="Announcements" title="Announcements" description="School notices relevant to your children." /><section className="family-panel"><div className="family-announcement-list">{["Parent orientation on Friday", "Monsoon uniform reminder", "Term assessment schedule published"].map((item, index) => <article key={item}><span><Bell size={22} /></span><div><small>{index === 0 ? "New" : "Published"}</small><strong>{item}</strong><p>{index === 0 ? "Class 10-B parents are invited at 11:30 AM." : "Tap to read the complete notice."}</p></div><ArrowRight size={20} /></article>)}</div></section></div>;
}

function CalendarPage({ eventsOnly = false }: { eventsOnly?: boolean }) {
  const rows = eventsOnly ? calendarItems.filter((item) => item.tone !== "holiday") : calendarItems;
  return <div className="page-stack"><FamilyIntro kind="holidays" eyebrow="Calendar" title={eventsOnly ? "Events" : "Calendar"} description="Upcoming holidays, exams and parent meetings in one clean list." /><section className="family-panel"><div className="family-calendar-list">{rows.map((item) => <article key={item.title}><time><strong>{item.date.split(" ")[0]}</strong><small>{item.date.split(" ")[1]}</small></time><div><h3>{item.title}</h3><p>{item.day} - {item.note}</p></div><FamilyStatus value={familyTitleFromSlug(item.tone)} /></article>)}</div></section></div>;
}

function DocumentsPage({ receiptsOnly = false, reportOnly = false }: { receiptsOnly?: boolean; reportOnly?: boolean }) {
  const rows = documents.filter((row) => receiptsOnly ? row[0].includes("Fee") : reportOnly ? row[0].includes("Report") : true);
  return <div className="page-stack"><FamilyIntro kind="settings" eyebrow="Documents" title={receiptsOnly ? "Receipts" : reportOnly ? "Report cards" : "Documents"} description="Download available files or request a new certificate." actions={<Link href="/family/documents/request">Request document</Link>} /><section className="family-panel"><div className="family-document-grid">{rows.map((row) => <article key={row[0]}><span><ModuleMark kind="timetable" size={32} /></span><div><strong>{row[0]}</strong><p>{row[1]}</p></div><FamilyStatus value={row[2]} /><button>Open</button></article>)}</div></section></div>;
}

function TransportCard() {
  return <section className="family-panel family-transport-card"><header><div><p className="eyebrow">Transport</p><h2>Route 01</h2></div><Bus size={28} /></header><div className="family-route-map"><span className="home"><MapPin size={18} /></span><span className="bus"><Bus size={22} /></span><span className="school"><ModuleMark kind="students" size={36} /></span></div><dl><div><dt>Status</dt><dd>Expected on time</dd></div><div><dt>Pickup</dt><dd>Green Park stop</dd></div><div><dt>Driver</dt><dd>Rajesh Kumar</dd></div></dl></section>;
}

function SupportPage() {
  return <div className="page-stack"><FamilyIntro kind="settings" eyebrow="Support" title="Support" description="Simple help options for parents." /><section className="family-support-grid">{[["Attendance issue", "Attendance does not look correct."], ["Fee payment issue", "Payment failed or receipt missing."], ["Transport issue", "Bus route or status problem."], ["Account help", "Login, password or profile issue."]].map(([title, detail]) => <article key={title}><span><ModuleMark kind="settings" size={32} /></span><h3>{title}</h3><p>{detail}</p><button>Create ticket</button></article>)}</section></div>;
}

function FamilyProfilePage() {
  return <div className="page-stack"><FamilyIntro kind="settings" eyebrow="Family profile" title={familyConfig.guardianName} description="Parent account, contact details and security settings." /><section className="family-profile-grid"><div className="family-panel"><header><div><p className="eyebrow">Contact</p><h2>Primary guardian</h2></div></header><div className="family-contact-list"><span><Phone size={18} /> +91 98765 43210</span><span><Mail size={18} /> rakesh.sharma@example.com</span><span><MapPin size={18} /> Saket, New Delhi</span></div></div><div className="family-panel"><header><div><p className="eyebrow">Security</p><h2>Account safety</h2></div></header><div className="family-contact-list"><span><ShieldCheck size={18} /> Password changed 21 days ago</span><span><CheckCircle2 size={18} /> Two linked children verified</span><span><Bell size={18} /> SMS alerts enabled</span></div></div></section></div>;
}

function SimpleFamilyForm({ kind, eyebrow, title, description, fields, submit }: { kind: MarkKind; eyebrow: string; title: string; description: string; fields: string[]; submit: string }) {
  const [saved, setSaved] = useState(false);
  return <div className="page-stack"><FamilyIntro kind={kind} eyebrow={eyebrow} title={title} description={description} />{saved && <div className="family-success"><Check size={18} /><strong>Request sent</strong><span>This is mock frontend state.</span></div>}<section className="family-form-card"><div className="family-form-grid">{fields.map((field, index) => <label key={field} className={field === "Reason" || field === "Note" ? "wide" : ""}><span>{field}{index < 3 && <b>*</b>}</span>{field === "Reason" || field === "Note" ? <textarea placeholder={`Enter ${field.toLowerCase()}`} /> : <input placeholder={`Enter ${field.toLowerCase()}`} />}</label>)}</div><footer><button>Cancel</button><button onClick={() => setSaved(true)}>{submit}<ArrowRight size={18} /></button></footer></section></div>;
}

const childCards = [
  { id: "aarav", name: "Aarav Sharma", className: "Class 10-B", status: "Present", note: "Checked in 7:54 AM", initials: "AS" },
  { id: "priya", name: "Priya Sharma", className: "Class 4-A", status: "Present", note: "Checked in 8:02 AM", initials: "PS" },
];

const homeActions = [
  { title: "Attendance", note: "Both children present today", href: "/family/attendance", kind: "attendance", value: "2/2" },
  { title: "Fees", note: "Term II due on 15 Jul", href: "/family/fees", kind: "fees", value: "Rs 33,600" },
  { title: "Results", note: "Science result published", href: "/family/results", kind: "exams", value: "84%" },
  { title: "Messages", note: "1 teacher message unread", href: "/family/messages", kind: "communication", value: "1" },
  { title: "Calendar", note: "Holiday on 15 Aug", href: "/family/calendar", kind: "holidays", value: "Next" },
];

const dayTimeline = [
  { time: "07:54 AM", title: "Aarav checked in", detail: "Main gate device", icon: CheckCircle2 },
  { time: "10:30 AM", title: "Science practical", detail: "Lab 2 - Class 10-B", icon: Clock3 },
  { time: "01:40 PM", title: "Bus departs", detail: "Route 01 - expected on time", icon: Bus },
];

const announcementsData = [
  { title: "Parent orientation on Friday", audience: "Class 10-B", body: "Class 10-B parents are invited at 11:30 AM in the school auditorium.", date: "Today, 9:00 AM", status: "New" },
  { title: "Monsoon uniform reminder", audience: "All classes", body: "Raincoats and monsoon shoes are allowed during heavy rains.", date: "12 Jul 2026", status: "Published" },
  { title: "Term assessment schedule published", audience: "Classes 6-10", body: "Exam schedule is now available under results and calendar sections.", date: "11 Jul 2026", status: "Published" },
];

export function FamilyDashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="family-home page-stack">
      <section className="family-hero">
        <div className="family-hero-copy">
          <p className="eyebrow">Monday, 13 July 2026</p>
          <h1>Good afternoon, {familyConfig.guardianName.split(" ")[0]}</h1>
          <p>Everything important for your children is here. No digging through menus.</p>
          <div className="family-hero-actions">
            <Link href="/family/fees/pay-now"><CreditCard size={20} /> Pay due fees</Link>
            <Link href="/family/messages"><MessageSquare size={20} /> Open messages</Link>
          </div>
        </div>
        <div className="family-hero-card">
          <span className="family-hero-mark"><ModuleMark kind="students" size={72} /></span>
          <h2>School day is going well</h2>
          <p>Both linked children are marked present. Next update is the afternoon transport status.</p>
        </div>
      </section>

      <section className="family-child-strip" aria-label="Linked children">
        {childCards.map((child) => (
          <Link href={`/family/children/${child.id}`} key={child.id}>
            <span>{child.initials}</span>
            <div><strong>{child.name}</strong><small>{child.className}</small></div>
            <b>{child.status}</b>
            <em>{child.note}</em>
          </Link>
        ))}
      </section>

      {/* Tabs Switcher in Family App theme */}
      <section className="family-child-tabs" style={{ margin: "4px 0" }}>
        <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Overview</button>
        <button className={tab === "announcements" ? "active" : ""} onClick={() => setTab("announcements")}>Announcements</button>
      </section>

      {tab === "overview" ? (
        <>
          <section className="family-action-grid" aria-label="Most viewed parent actions">
            {homeActions.map((item) => (
              <Link href={item.href} key={item.title}>
                <span><ModuleMark kind={item.kind} size={58} /></span>
                <div><small>{item.title}</small><strong>{item.value}</strong><p>{item.note}</p></div>
                <ArrowRight size={22} />
              </Link>
            ))}
          </section>

          <div className="family-home-grid">
            <section className="family-panel family-today-panel">
              <header><div><p className="eyebrow">Today</p><h2>Aarav day</h2></div><Link href="/family/children/aarav">View child</Link></header>
              <div className="family-timeline">
                {dayTimeline.map((item) => {
                  const Icon = item.icon;
                  return <article key={item.title}><span><Icon size={20} /></span><time>{item.time}</time><div><strong>{item.title}</strong><small>{item.detail}</small></div></article>;
                })}
              </div>
            </section>

            <section className="family-panel family-payment-panel">
              <header><div><p className="eyebrow">Fees</p><h2>Payment due</h2></div><ModuleMark kind="fees" size={32} /></header>
              <div className="family-due-card">
                <span>Term II fees</span>
                <strong>Rs 33,600</strong>
                <p>Due by 15 July 2026 for Aarav Sharma.</p>
                <Link href="/family/fees/pay-now">Pay now</Link>
              </div>
            </section>

            <section className="family-panel family-message-panel">
              <header><div><p className="eyebrow">Communication</p><h2>Latest message</h2></div><Link href="/family/messages">All</Link></header>
              <article>
                <span>NK</span>
                <div><strong>Nisha Kapoor</strong><p>Aarav science project feedback is ready. Please review it when convenient.</p><small>Today, 10:42 AM</small></div>
              </article>
            </section>

            <section className="family-panel family-calendar-panel">
              <header><div><p className="eyebrow">Calendar</p><h2>Coming up</h2></div><ModuleMark kind="holidays" size={32} /></header>
              <div>
                <time><strong>15</strong><small>Aug</small></time>
                <span><strong>Independence Day</strong><small>School holiday for students and staff</small></span>
              </div>
            </section>
          </div>
        </>
      ) : (
        <section className="family-panel">
          <header>
            <div>
              <p className="eyebrow">Communication</p>
              <h2>Announcements</h2>
            </div>
          </header>
          <div className="family-announcement-list" style={{ padding: "0 18px 18px" }}>
            {announcementsData.map((item) => (
              <article key={item.title} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ width: "42px", height: "42px", borderRadius: "10px", display: "grid", placeItems: "center", background: "var(--navy-soft)", color: "var(--navy)", flexShrink: 0 }}>
                  <Bell size={20} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "9px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px", background: item.status === "New" ? "var(--red-soft)" : "var(--canvas)", color: item.status === "New" ? "var(--red)" : "var(--muted)" }}>
                      {item.status.toUpperCase()}
                    </span>
                    <small style={{ color: "var(--muted)", fontSize: "10px" }}>{item.date}</small>
                  </div>
                  <strong style={{ display: "block", fontSize: "14px", margin: "6px 0 2px" }}>{item.title}</strong>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: "11px", lineHeight: "1.4" }}>{item.body}</p>
                </div>
                <ArrowRight size={20} style={{ color: "var(--muted-2)", marginLeft: "12px" }} />
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
