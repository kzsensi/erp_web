"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle, ArrowLeft, ArrowRight, Bus, CalendarDays, Check,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign,
  Clock3, Download, FileBarChart, FileSpreadsheet, FileText, Filter, GraduationCap,
  IndianRupee, Info, Mail, MapPin, MoreHorizontal, Phone, Plus,
  Printer, ReceiptIndianRupee, Search, Settings2, ShieldCheck, UploadCloud,
  UserPlus, UsersRound, X,
} from "lucide-react";
import { titleFromSlug } from "@/lib/admin-navigation";
import { ModuleHub } from "@/components/module-hub";
import { ModuleMark } from "@/components/module-mark";
import { OperationalPage } from "@/components/operational-pages";

type Props = { segments: string[] };

const moduleDescriptions: Record<string, string> = {
  students: "Manage student records, admissions and academic information.",
  staff: "Manage teaching and non-teaching staff across the school.",
  academics: "Organise classes, subjects, timetables and academic planning.",
  examinations: "Plan examinations, enter marks and publish results.",
  attendance: "Monitor daily attendance and resolve corrections.",
  leave: "Review leave requests, balances and school availability.",
  fees: "Manage collections, outstanding dues and financial records.",
  communication: "Keep staff and families informed through one channel.",
  "events-holidays": "Plan school events, activities and holidays.",
  transport: "Manage routes, vehicles, drivers and student travel.",
  library: "Track the school catalogue, issues, returns and overdue books.",
  documents: "Create and manage official school documents.",
  reports: "Build, review and export operational school reports.",
  setup: "Configure the academic and administrative foundation of your school.",
  "audit-logs": "Review important activity and changes across the workspace.",
  settings: "Control school preferences, notifications and account defaults.",
};

const students = [
  { id: "STU-1024", name: "Aarav Sharma", initials: "AS", className: "10-B", guardian: "Rakesh Sharma", phone: "+91 98765 43210", attendance: "94.2%", status: "Active" },
  { id: "STU-1025", name: "Diya Mehta", initials: "DM", className: "8-A", guardian: "Neha Mehta", phone: "+91 98210 31476", attendance: "97.8%", status: "Active" },
  { id: "STU-1026", name: "Kabir Singh", initials: "KS", className: "6-C", guardian: "Amar Singh", phone: "+91 98100 44921", attendance: "86.5%", status: "Review" },
  { id: "STU-1027", name: "Myra Patel", initials: "MP", className: "9-A", guardian: "Bhavin Patel", phone: "+91 98989 21003", attendance: "92.1%", status: "Active" },
  { id: "STU-1028", name: "Vihaan Gupta", initials: "VG", className: "5-B", guardian: "Kunal Gupta", phone: "+91 99201 88216", attendance: "89.4%", status: "Active" },
  { id: "STU-1029", name: "Anaya Joshi", initials: "AJ", className: "7-A", guardian: "Ritu Joshi", phone: "+91 98188 23852", attendance: "95.7%", status: "Active" },
];

const reportLinks = {
  attendance: [
    ["student-daily-classwise", "Student daily · class-wise", "Daily presence summary for each class and section"],
    ["student-monthly-classwise", "Student monthly · class-wise", "Monthly attendance totals with percentage"],
    ["student-day-with-time", "Student day with time", "First-in and last-out device timings"],
    ["student-daywise-report", "Student day-wise report", "Individual attendance across a selected period"],
    ["employee-daily-categorywise", "Employee daily · category-wise", "Daily teaching and non-teaching attendance"],
    ["employee-monthly", "Employee monthly", "Monthly staff attendance summary"],
    ["employee-day-with-time", "Employee day with time", "Staff check-in and check-out timings"],
    ["employee-daywise-report", "Employee day-wise report", "Individual staff attendance history"],
  ],
};

export function AdminModulePage({ segments }: Props) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const area = segments[0] ?? "admin";
  const page = segments[segments.length - 1] ?? area;
  const title = titleFromSlug(page);
  const isProfile = (area === "students" || area === "staff") && segments.length >= 3 && /^(STU|STF)-/i.test(segments[1]);
  const hubAreas = new Set(["students", "staff", "attendance", "leave", "fees", "communication", "events-holidays", "timetable", "examinations"]);
  const operationalRoutes = new Set([
    "attendance/student-attendance", "attendance/staff-attendance",
    "staff/all-staff", "staff/teachers", "staff/non-teaching", "setup/departments",
    "leave/student-leave", "leave/staff-leave", "fees/due-list", "fees/fee-structure",
    "communication/messages", "communication/announcements", "events-holidays/add-holiday",
    "timetable/all", "examinations/exam-schedule",
  ]);
  const operationalKey = `${area}/${page}`;

  if (segments.length === 1 && hubAreas.has(area)) return <ModuleHub area={area} />;
  if (operationalRoutes.has(operationalKey)) return <OperationalPage area={area} page={page} />;
  if (isProfile) return <ProfilePage type={area as "students" | "staff"} id={segments[1]} tab={page} />;
  if (page === "add-student" || page === "add-staff") return <AddRecordPage type={page === "add-student" ? "student" : "staff"} />;
  if (area === "attendance" && page === "download") return <AttendanceDownloadPage />;
  if (area === "timetable" && page === "upload") return <TimetableUploadPage />;
  if (area === "leave" && page === "student-leave-form") return <StudentLeaveFormPage />;
  if (area === "events-holidays" && page === "add-holiday") return <AddHolidayPage />;
  if (page === "bulk-import") return <ImportPage module={area} />;
  if (page.includes("calendar") || page === "holidays" || page === "events" || page === "timetable") return <CalendarPage module={area} title={title} />;
  if (page === "live-tracking") return <TrackingPage />;
  if (page === "mark-student-attendance" || page === "mark-staff-attendance" || page === "marks-entry") return <RegisterPage type={page} />;
  if ((page === "reports" && area === "attendance") || segments[1] === "reports") return <ReportsPage module={area} report={segments[2]} />;
  if (area === "reports" || page.includes("report") || page === "export-history") return <ReportBuilderPage module={area} title={title} />;
  if (area === "audit-logs" || page === "device-logs") return <LogsPage title={title} />;
  if (area === "settings" || area === "setup" || page.includes("settings") || page === "school-profile") return <SettingsPage title={title} />;
  if (page === "collect-fee") return <CollectFeePage />;

  return (
    <div className="page-stack">
      <PageHeader module={area} title={title} />
      <StatStrip module={area} page={page} />
      <section className="data-panel">
        <div className="table-toolbar">
          <div className="search-field"><Search size={17} /><input placeholder={`Search ${title.toLowerCase()}…`} /></div>
          <div className="toolbar-buttons">
            <button className="secondary-button filter-button" onClick={() => setFiltersOpen(!filtersOpen)}><Filter size={16} /> Filters <span className="filter-count">2</span></button>
            <button className="secondary-button"><Download size={16} /> <span>Export</span></button>
            <Link className="primary-button" href={primaryHref(area, page)}><Plus size={16} /> {primaryLabel(area, page)}</Link>
          </div>
        </div>
        {filtersOpen && <FilterBar />}
        <div className="view-tabs">{area === "students" ? <><button className="active">All students <span>1,248</span></button><button>Active <span>1,204</span></button><button>Incomplete records <span>26</span></button><button>Inactive <span>18</span></button><button>Alumni <span>342</span></button></> : area === "staff" ? <><button className="active">All staff <span>112</span></button><button>Teaching <span>78</span></button><button>Non-teaching <span>34</span></button><button>Inactive <span>6</span></button></> : <><button className="active">All <span>128</span></button><button>Active <span>114</span></button><button>Needs attention <span>9</span></button><button>Archived <span>5</span></button></>}</div>
        {area === "students" ? <StudentTable page={page} /> : <GenericTable module={area} title={title} />}
        <div className="table-footer"><p>Showing <strong>1–6</strong> of <strong>1,248</strong></p><div><button disabled><ChevronLeft size={16} /></button><button className="active">1</button><button>2</button><button>3</button><span>…</span><button>84</button><button><ChevronRight size={16} /></button></div></div>
      </section>
    </div>
  );
}

function PageHeader({ module, title }: { module: string; title: string }) {
  return (
    <header className="page-heading module-heading">
      <div><div className="breadcrumbs"><Link href="/admin/dashboard">Home</Link><ChevronRight size={13} /><span>{titleFromSlug(module)}</span>{title.toLowerCase() !== module && <><ChevronRight size={13} /><b>{title}</b></>}</div><h1>{title}</h1><p>{moduleDescriptions[module] ?? "Manage school information from one clear workspace."}</p></div>
    </header>
  );
}

function StatStrip({ module, page }: { module: string; page: string }) {
  const configs: Record<string, Array<[string, string, string]>> = {
    students: [["Total students", "1,248", "+18 this month"], ["Active", "1,204", "96.5% of total"], ["New admissions", "42", "2026–27"], ["Needs attention", "26", "Documents or attendance"]],
    staff: [["Total staff", "112", "+4 this term"], ["Teachers", "78", "69.6% of staff"], ["Non-teaching", "34", "Across 8 departments"], ["On leave today", "4", "3 approved, 1 pending"]],
    fees: [["Expected", "₹22.6L", "This month"], ["Collected", "₹18.4L", "81% of expected"], ["Outstanding", "₹4.2L", "286 students"], ["Overdue", "₹1.1L", "Past due date"]],
    transport: [["Active vehicles", "18", "All GPS online"], ["Routes", "14", "Across 42 stops"], ["Students", "684", "Assigned to transport"], ["Alerts", "2", "Need attention"]],
  };
  const data = configs[module] ?? [[`Total ${titleFromSlug(page)}`, "128", "Updated today"], ["Active", "114", "89% of total"], ["Pending", "9", "Needs review"], ["Updated today", "5", "Recent changes"]];
  return <section className="stat-strip">{data.map(([label, value, note], index) => <article key={label}><span className={`stat-dot tone-${index}`} /><div><p>{label}</p><strong>{value}</strong><small>{note}</small></div></article>)}</section>;
}

function StudentTable({ page }: { page: string }) {
  return (
    <div className="table-wrap"><table className="data-table"><thead><tr><th><input type="checkbox" aria-label="Select all" /></th><th>Student</th><th>Admission no.</th><th>Class</th><th>Guardian</th><th>Attendance</th><th>Status</th><th /></tr></thead><tbody>
      {students.map((student) => <tr key={student.id}><td><input type="checkbox" aria-label={`Select ${student.name}`} /></td><td><Link className="person-cell" href={`/admin/students/${student.id}/profile`}><span>{student.initials}</span><div><strong>{student.name}</strong><small>{student.phone}</small></div></Link></td><td><span className="mono-id">{student.id}</span></td><td><strong>{student.className}</strong></td><td>{student.guardian}</td><td><span className={Number(student.attendance.slice(0, 2)) < 90 ? "attendance-low" : ""}>{student.attendance}</span></td><td><span className={`status-badge ${student.status === "Review" ? "warning" : "success"}`}><i />{page === "inactive" ? "Inactive" : student.status}</span></td><td><button className="icon-button"><MoreHorizontal size={18} /></button></td></tr>)}
    </tbody></table></div>
  );
}

function GenericTable({ module, title }: { module: string; title: string }) {
  const rows = [
    ["Primary record", "REF-26071", "Academic office", "12 Jul 2026", "Active"],
    ["Secondary record", "REF-26072", "Administration", "12 Jul 2026", "Active"],
    ["Annual programme", "REF-26073", "School office", "11 Jul 2026", "Pending"],
    ["Classroom allocation", "REF-26074", "Academic office", "10 Jul 2026", "Active"],
    ["Parent request", "REF-26075", "Front desk", "09 Jul 2026", "Review"],
    ["Term configuration", "REF-26076", "Administration", "08 Jul 2026", "Active"],
  ];
  return <div className="table-wrap"><table className="data-table"><thead><tr><th><input type="checkbox" aria-label="Select all" /></th><th>{title.replace(/s$/, "")}</th><th>Reference</th><th>{module === "fees" ? "Amount" : "Owner"}</th><th>Last updated</th><th>Status</th><th /></tr></thead><tbody>{rows.map((row, index) => <tr key={row[1]}><td><input type="checkbox" aria-label={`Select ${row[0]}`} /></td><td><div className="record-cell"><span className={`record-icon tone-${index % 4}`}><FileText size={17} /></span><strong>{row[0]}</strong></div></td><td><span className="mono-id">{row[1]}</span></td><td>{module === "fees" ? `₹${[24000, 18500, 42000, 12800, 9400, 28600][index].toLocaleString("en-IN")}` : row[2]}</td><td>{row[3]}</td><td><span className={`status-badge ${row[4] === "Active" ? "success" : "warning"}`}><i />{row[4]}</span></td><td><button className="icon-button"><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div>;
}

function FilterBar() {
  return <div className="filter-bar"><label>Status<button>Active <ChevronDown size={14} /></button></label><label>Class<button>All classes <ChevronDown size={14} /></button></label><label>Academic year<button>2026–27 <ChevronDown size={14} /></button></label><button className="clear-filter"><X size={14} /> Clear all</button></div>;
}

function AddRecordPage({ type }: { type: "student" | "staff" }) {
  const [step, setStep] = useState(1);
  const student = type === "student";
  const steps = student ? ["Basic information", "Academic details", "Family & contact", "Documents", "Review"] : ["Basic information", "Employment", "Contact", "Documents", "Review"];
  return <div className="page-stack form-page"><header className="page-heading form-heading"><div><Link className="back-link" href={`/admin/${student ? "students/all-students" : "staff/all-staff"}`}><ArrowLeft size={16} /> Back to {student ? "students" : "staff"}</Link><h1>Add {type}</h1><p>Create a complete {type} record. You can save and continue later.</p></div><span className="draft-badge">Draft saved just now</span></header>
    <div className="form-layout"><aside className="stepper">{steps.map((label, index) => <button key={label} className={`${step === index + 1 ? "active" : ""} ${step > index + 1 ? "complete" : ""}`} onClick={() => setStep(index + 1)}><span>{step > index + 1 ? <Check size={15} /> : index + 1}</span><div><strong>{label}</strong><small>{index === 0 ? "Identity and personal details" : index === steps.length - 1 ? "Check before creating" : "Add supporting information"}</small></div></button>)}</aside>
      <section className="form-card"><div className="form-card-heading"><span>{step}</span><div><h2>{steps[step - 1]}</h2><p>{step === 1 ? `Enter the ${type}’s official details as they appear in school records.` : "Complete this section or save the record as a draft."}</p></div></div>
        {step === 1 ? <BasicInformationForm type={type} /> : step === steps.length ? <ReviewPanel type={type} /> : <SecondaryForm type={type} step={step} />}
        <footer className="form-actions"><button className="secondary-button">Save draft</button><div>{step > 1 && <button className="secondary-button" onClick={() => setStep(step - 1)}><ChevronLeft size={16} /> Back</button>}<button className="primary-button" onClick={() => setStep(Math.min(steps.length, step + 1))}>{step === steps.length ? `Create ${type}` : "Save & continue"}<ArrowRight size={16} /></button></div></footer>
      </section></div></div>;
}

function BasicInformationForm({ type }: { type: string }) {
  return <div className="form-body"><div className="photo-upload"><span><UserPlus size={22} /></span><div><strong>Profile photograph</strong><small>JPG or PNG, maximum 2 MB</small></div><button className="secondary-button">Upload photo</button></div><div className="field-grid"><Field label="First name" required placeholder="Enter first name" /><Field label="Last name" required placeholder="Enter last name" /><Field label="Date of birth" required type="date" /><Field label="Gender" required select placeholder="Select gender" /><Field label={type === "student" ? "Admission number" : "Employee ID"} required placeholder={type === "student" ? "e.g. VSS-2026-001" : "e.g. EMP-0102"} /><Field label="Blood group" select placeholder="Select blood group" /></div><div className="section-divider"><span>Additional information</span></div><div className="field-grid"><Field label="Aadhaar number" placeholder="Optional" /><Field label="Mother tongue" placeholder="Enter language" /><Field label="Nationality" placeholder="Indian" /><Field label="Religion" placeholder="Optional" /></div></div>;
}

function SecondaryForm({ type, step }: { type: string; step: number }) {
  return <div className="form-body"><div className="info-note"><Info size={17} /><span>This information can be changed later from the {type} profile.</span></div><div className="field-grid"><Field label={step === 2 ? (type === "student" ? "Class" : "Department") : "Primary contact name"} required select placeholder="Select an option" /><Field label={step === 2 ? (type === "student" ? "Section" : "Designation") : "Relationship"} required select placeholder="Select an option" /><Field label={step === 2 ? "Joining date" : "Mobile number"} required placeholder="Enter details" /><Field label={step === 2 ? "Academic year" : "Email address"} required placeholder="Enter details" /></div><div className="section-divider"><span>Notes</span></div><label className="field full"><span>Internal note</span><textarea placeholder="Add a note for the school office…" /></label></div>;
}

function ReviewPanel({ type }: { type: string }) {
  return <div className="form-body"><div className="review-success"><CheckCircle2 size={25} /><div><strong>Ready to create this {type}</strong><p>Required information is complete. Check the summary below before continuing.</p></div></div>{["Basic information", type === "student" ? "Academic details" : "Employment", "Contact information", "Documents"].map((item, index) => <div className="review-row" key={item}><span className={index === 3 ? "optional" : "done"}>{index === 3 ? "Optional" : <Check size={14} />}</span><div><strong>{item}</strong><small>{index === 0 ? "Aarav Sharma · 14 August 2011" : index === 1 ? "Class 10 · Section B · 2026–27" : index === 2 ? "Rakesh Sharma · +91 98765 43210" : "2 files uploaded"}</small></div><button>Edit</button></div>)}</div>;
}

function Field({ label, required, placeholder = "", type = "text", select }: { label: string; required?: boolean; placeholder?: string; type?: string; select?: boolean }) {
  return <label className="field"><span>{label}{required && <b>*</b>}</span>{select ? <button className="select-control" type="button">{placeholder}<ChevronDown size={15} /></button> : <input type={type} placeholder={placeholder} />}</label>;
}

function ImportPage({ module }: { module: string }) {
  return <div className="page-stack"><PageHeader module={module} title={`Import ${titleFromSlug(module)}`} /><section className="import-layout"><div className="upload-panel"><div className="upload-illustration"><FileSpreadsheet size={32} /></div><h2>Upload your spreadsheet</h2><p>Drag and drop a CSV or Excel file here, or choose a file from your computer.</p><button className="primary-button"><UploadCloud size={17} /> Choose file</button><small>CSV or XLSX · Maximum 10 MB · Up to 5,000 records</small></div><aside className="import-guide"><h3>Before you upload</h3>{["Download the provided template", "Keep column headings unchanged", "Use one row for each record", "Check dates use DD/MM/YYYY"].map((item, index) => <div key={item}><span>{index + 1}</span><p>{item}</p></div>)}<button className="secondary-button"><Download size={16} /> Download template</button><div className="privacy-note"><ShieldCheck size={18} /><p><strong>Your file stays private</strong><small>Uploaded data is visible only to authorised school administrators.</small></p></div></aside></section><section className="data-panel import-history"><div className="section-title"><div><p className="eyebrow">Recent activity</p><h2>Import history</h2></div></div><GenericTable module={module} title="Import" /></section></div>;
}

function ProfilePage({ type, id, tab }: { type: "students" | "staff"; id: string; tab: string }) {
  const student = type === "students";
  const tabs = student ? ["profile", "guardians", "attendance", "academics", "fees", "leave", "documents", "transport", "activity-log"] : ["profile", "employment", "assigned-classes", "attendance", "leave", "documents", "permissions", "activity-log"];
  return <div className="page-stack profile-page"><div className="profile-back"><Link href={`/admin/${type}/all-${type}`}><ArrowLeft size={16} /> All {type}</Link><div><button className="secondary-button"><Printer size={16} /> Print</button><button className="secondary-button"><MoreHorizontal size={17} /></button><button className="primary-button">Edit profile</button></div></div><section className="profile-hero"><div className="profile-person"><span className="large-avatar">{student ? "AS" : "NK"}</span><div><div className="profile-title"><h1>{student ? "Aarav Sharma" : "Nisha Kapoor"}</h1><span className="status-badge success"><i />Active</span></div><p>{student ? "Class 10-B · Admission no. STU-1024" : "Senior Teacher · Employee ID STF-042"}</p><div className="profile-contact"><span><Phone size={14} />+91 98765 43210</span><span><Mail size={14} />{student ? "rakesh.sharma@email.com" : "nisha.kapoor@vss.edu"}</span><span><MapPin size={14} />Delhi</span></div></div></div><div className="profile-score"><span>Attendance</span><strong>{student ? "94.2%" : "96.8%"}</strong><small>This academic year</small></div></section><nav className="profile-tabs">{tabs.map((item) => <Link className={tab === item ? "active" : ""} key={item} href={`/admin/${type}/${id}/${item}`}>{titleFromSlug(item)}</Link>)}</nav><ProfileTabContent tab={tab} student={student} /></div>;
}

function ProfileTabContent({ tab, student }: { tab: string; student: boolean }) {
  if (tab === "attendance") return <div className="profile-grid"><section className="panel profile-wide"><div className="section-title"><div><p className="eyebrow">Academic year 2026–27</p><h2>Attendance summary</h2></div><button className="secondary-button"><Download size={15} /> Export</button></div><div className="mini-stat-row"><div><span className="green-dot" /><strong>94.2%</strong><small>Overall attendance</small></div><div><strong>118</strong><small>Days present</small></div><div><strong>5</strong><small>Days absent</small></div><div><strong>2</strong><small>On leave</small></div></div><div className="month-heatmap">{Array.from({ length: 84 }).map((_, index) => <i key={index} className={index % 19 === 0 ? "absent" : index % 27 === 0 ? "leave" : "present"} />)}</div><div className="heatmap-key"><span><i className="present" />Present</span><span><i className="absent" />Absent</span><span><i className="leave" />Leave</span></div></section><aside className="panel"><div className="section-title"><div><h2>Recent absence</h2></div></div>{["09 July 2026", "26 June 2026", "14 May 2026"].map((date) => <div className="absence-row" key={date}><span><AlertCircle size={16} /></span><div><strong>{date}</strong><small>Absent · Full day</small></div></div>)}</aside></div>;
  return <div className="profile-grid"><section className="panel profile-wide"><div className="section-title"><div><p className="eyebrow">Record</p><h2>{titleFromSlug(tab)}</h2></div><button className="secondary-button">Edit section</button></div><div className="details-grid">{[["Full name", student ? "Aarav Rakesh Sharma" : "Nisha Raj Kapoor"], [student ? "Admission number" : "Employee ID", student ? "STU-1024" : "STF-042"], [student ? "Class & section" : "Department", student ? "10-B" : "Science"], ["Date of birth", student ? "14 August 2011" : "09 March 1989"], ["Gender", "—"], ["Blood group", "B+"], ["Academic year", "2026–27"], ["Joining date", "02 April 2021"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section><aside className="panel"><div className="section-title"><div><h2>Record health</h2></div></div><div className="completion-ring"><strong>92%</strong><span>Complete</span></div><ul className="check-list"><li><Check size={14} /> Basic information</li><li><Check size={14} /> Contact details</li><li><Check size={14} /> Required documents</li><li className="missing"><AlertCircle size={14} /> Medical information</li></ul></aside></div>;
}

function CalendarPage({ module, title }: { module: string; title: string }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return <div className="page-stack"><PageHeader module={module} title={title} /><section className="calendar-shell"><div className="calendar-toolbar"><div><button className="icon-button"><ChevronLeft size={18} /></button><button className="icon-button"><ChevronRight size={18} /></button><h2>July 2026</h2><button className="secondary-button">Today</button></div><div><span className="calendar-key"><i className="academic" />Academic</span><span className="calendar-key"><i className="event" />Event</span><span className="calendar-key"><i className="holiday" />Holiday</span><button className="primary-button"><Plus size={16} /> Add item</button></div></div><div className="calendar-grid">{days.map((day) => <div className="calendar-day-name" key={day}>{day}</div>)}{Array.from({ length: 35 }).map((_, index) => { const date = index - 1; return <div key={index} className={`calendar-cell ${date < 1 || date > 31 ? "muted" : ""} ${date === 13 ? "today" : ""}`}><span>{date < 1 ? 30 + date : date > 31 ? date - 31 : date}</span>{date === 6 && <button className="calendar-event academic">Term assessment</button>}{date === 13 && <button className="calendar-event event">Parent orientation</button>}{date === 17 && <button className="calendar-event holiday">School holiday</button>}{date === 24 && <button className="calendar-event academic">Report cards</button>}</div>; })}</div></section></div>;
}

function TrackingPage() {
  return <div className="page-stack"><PageHeader module="transport" title="Live Tracking" /><section className="tracking-shell"><aside className="vehicle-list"><div className="search-field"><Search size={16} /><input placeholder="Search route or vehicle" /></div><div className="vehicle-tabs"><button className="active">All 18</button><button>Moving 12</button><button>Stopped 6</button></div>{[["Route 01", "DL 1PC 2140", "Moving", "12 min early"], ["Route 04", "DL 1PC 2884", "Stopped", "At Green Park"], ["Route 07", "DL 1PC 3052", "Moving", "On time"], ["Route 11", "DL 1PC 4128", "Moving", "4 min late"]].map((row, index) => <button className={`vehicle-row ${index === 0 ? "active" : ""}`} key={row[0]}><span><Bus size={18} /></span><div><strong>{row[0]}</strong><small>{row[1]}</small></div><div><b className={row[2] === "Moving" ? "moving" : "stopped"}>{row[2]}</b><small>{row[3]}</small></div></button>)}</aside><div className="map-placeholder"><div className="map-roads road-one" /><div className="map-roads road-two" /><div className="map-roads road-three" /><span className="map-school"><GraduationCap size={20} /></span><span className="bus-pin pin-one"><Bus size={18} /></span><span className="bus-pin pin-two"><Bus size={18} /></span><span className="bus-pin pin-three"><Bus size={18} /></span><div className="map-card"><div className="map-card-head"><span><Bus size={20} /></span><div><strong>Route 01</strong><small>DL 1PC 2140 · 38 students</small></div><b>Moving</b></div><div className="map-stats"><span><small>Driver</small><strong>Rajesh Kumar</strong></span><span><small>Speed</small><strong>28 km/h</strong></span><span><small>Next stop</small><strong>Malviya Nagar</strong></span></div><button className="primary-button">View route details</button></div></div></section></div>;
}

function RegisterPage({ type }: { type: string }) {
  const marks = type === "marks-entry";
  const [present, setPresent] = useState<Record<number, boolean>>(() => Object.fromEntries(students.map((_, index) => [index, index !== 2])));
  const presentCount = Object.values(present).filter(Boolean).length;
  return <div className="page-stack"><PageHeader module={marks ? "examinations" : "attendance"} title={marks ? "Marks Entry" : titleFromSlug(type)} /><section className="register-context"><div><label>Class & section<button>10-B <ChevronDown size={15} /></button></label><label>{marks ? "Exam" : "Date"}<button>{marks ? "Term I assessment" : "13 July 2026"}<ChevronDown size={15} /></button></label>{marks && <label>Subject<button>Mathematics <ChevronDown size={15} /></button></label>}</div><span><Info size={16} /> {marks ? "Maximum marks: 100" : "Attendance closes at 4:00 PM"}</span></section><section className="data-panel register-panel"><div className="register-summary"><div><p>{marks ? "Students" : "Present"}</p><strong>{marks ? students.length : presentCount}</strong></div><div><p>{marks ? "Marks entered" : "Absent"}</p><strong>{marks ? 4 : students.length - presentCount}</strong></div><div><p>{marks ? "Class average" : "On leave"}</p><strong>{marks ? "78.5" : "0"}</strong></div><button className="secondary-button"><Check size={16} /> Mark all present</button></div><div className="table-wrap"><table className="data-table register-table"><thead><tr><th>Roll no.</th><th>Student</th><th>{marks ? "Marks obtained" : "Attendance"}</th><th>Remark</th></tr></thead><tbody>{students.map((student, index) => <tr key={student.id}><td>{index + 1}</td><td><div className="person-cell"><span>{student.initials}</span><div><strong>{student.name}</strong><small>{student.id}</small></div></div></td><td>{marks ? <input className="marks-input" defaultValue={index < 4 ? [84, 91, 68, 71][index] : ""} placeholder="—" /> : <div className="attendance-toggle"><button className={present[index] ? "active present" : ""} onClick={() => setPresent({ ...present, [index]: true })}>Present</button><button className={!present[index] ? "active absent" : ""} onClick={() => setPresent({ ...present, [index]: false })}>Absent</button><button>Leave</button></div>}</td><td><input className="remark-input" placeholder="Add remark" /></td></tr>)}</tbody></table></div><footer className="register-footer"><p><CheckCircle2 size={16} /> Changes are saved locally in this preview</p><div><button className="secondary-button">Save draft</button><button className="primary-button">Submit {marks ? "marks" : "attendance"}</button></div></footer></section></div>;
}

function ReportsPage({ module, report }: { module: string; report?: string }) {
  if (report) return <ReportBuilderPage module={module} title={titleFromSlug(report)} />;
  const links = reportLinks.attendance;
  return <div className="page-stack"><PageHeader module={module} title="Reports" /><div className="report-category"><div className="report-category-head"><span><GraduationCap size={22} /></span><div><h2>Student attendance</h2><p>Daily, monthly and device-time reports for students.</p></div></div><div className="report-link-grid">{links.slice(0, 4).map(([href, label, detail]) => <Link key={href} href={`/admin/attendance/reports/${href}`}><span><FileBarChart size={19} /></span><div><strong>{label}</strong><small>{detail}</small></div><ChevronRight size={17} /></Link>)}</div></div><div className="report-category"><div className="report-category-head"><span><UsersRound size={22} /></span><div><h2>Employee attendance</h2><p>Daily and monthly attendance for all employee categories.</p></div></div><div className="report-link-grid">{links.slice(4).map(([href, label, detail]) => <Link key={href} href={`/admin/attendance/reports/${href}`}><span><FileBarChart size={19} /></span><div><strong>{label}</strong><small>{detail}</small></div><ChevronRight size={17} /></Link>)}</div></div></div>;
}

function ReportBuilderPage({ module, title }: { module: string; title: string }) {
  return <div className="page-stack"><PageHeader module={module} title={title} /><section className="report-builder"><div className="report-filters"><label>Date range<button>01 July 2026 — 13 July 2026 <CalendarDays size={15} /></button></label><label>Class<button>All classes <ChevronDown size={15} /></button></label><label>Section<button>All sections <ChevronDown size={15} /></button></label><button className="primary-button">Generate report</button></div><div className="report-result"><div className="empty-report-icon"><FileBarChart size={29} /></div><h2>Your report is ready to configure</h2><p>Choose the filters above and select “Generate report” to preview the results.</p><div><button className="secondary-button"><FileSpreadsheet size={16} /> Export Excel</button><button className="secondary-button"><FileText size={16} /> Export PDF</button></div></div></section></div>;
}

function LogsPage({ title }: { title: string }) {
  return <div className="page-stack"><PageHeader module="audit-logs" title={title} /><section className="data-panel"><div className="table-toolbar"><div className="search-field"><Search size={17} /><input placeholder="Search by person, action or record…" /></div><div className="toolbar-buttons"><button className="secondary-button"><Filter size={16} /> Filters</button><button className="secondary-button"><Download size={16} /> Export</button></div></div><div className="activity-stream">{[["Ananya Rao", "updated a student profile", "Aarav Sharma · STU-1024", "2 minutes ago", "AR"], ["Rohan Mehta", "approved a leave request", "Nisha Kapoor · 14–15 July", "18 minutes ago", "RM"], ["System", "completed attendance device sync", "1,248 records processed", "42 minutes ago", "SY"], ["Priya Nair", "generated fee receipts", "24 receipts · ₹1,28,400", "1 hour ago", "PN"], ["Ananya Rao", "changed class teacher allocation", "Class 8-A · Nisha Kapoor", "Yesterday, 4:36 PM", "AR"]].map((row) => <div className="activity-row" key={row[3]}><span className="activity-avatar">{row[4]}</span><div><p><strong>{row[0]}</strong> {row[1]}</p><small>{row[2]}</small></div><time><Clock3 size={13} />{row[3]}</time><button className="icon-button"><MoreHorizontal size={17} /></button></div>)}</div></section></div>;
}

function SettingsPage({ title }: { title: string }) {
  return <div className="page-stack"><PageHeader module="setup" title={title} /><div className="settings-layout"><aside className="settings-nav"><button className="active"><Settings2 size={17} />General</button><button><CalendarDays size={17} />Academic</button><button><BellRingIcon />Notifications</button><button><ShieldCheck size={17} />Security & access</button></aside><section className="settings-card"><div className="settings-heading"><h2>{title}</h2><p>Keep the information used across official records and communication up to date.</p></div><div className="school-logo-upload"><span>VS</span><div><strong>School logo</strong><small>Square PNG or JPG, at least 256 × 256 px</small></div><button className="secondary-button">Change logo</button></div><div className="field-grid"><Field label="School name" required placeholder="Vidya Sanskar School" /><Field label="School code" placeholder="VSS-DL-1042" /><Field label="Board affiliation" select placeholder="Central Board of Secondary Education" /><Field label="Affiliation number" placeholder="2731042" /><Field label="School email" required placeholder="office@vidyasanskar.edu" /><Field label="School phone" required placeholder="+91 11 4123 8890" /></div><label className="field full"><span>School address</span><textarea defaultValue="A-14, Saket Institutional Area, New Delhi, Delhi 110017" /></label><footer className="settings-actions"><button className="secondary-button">Discard changes</button><button className="primary-button">Save changes</button></footer></section></div></div>;
}

function CollectFeePage() {
  return <div className="page-stack"><PageHeader module="fees" title="Collect Fee" /><section className="fee-search-card"><div><span><Search size={22} /></span><div><h2>Find a student</h2><p>Search by student name, admission number or guardian phone.</p></div></div><div className="fee-search"><Search size={18} /><input placeholder="Start typing a name or admission number…" /><button className="primary-button">Search</button></div></section><div className="fee-workspace"><section className="panel selected-student"><div className="selected-student-head"><span className="large-avatar small">AS</span><div><h2>Aarav Sharma</h2><p>STU-1024 · Class 10-B</p></div><span className="status-badge success"><i />Active</span></div><div className="fee-due-summary"><div><span>Total annual fee</span><strong>₹86,400</strong></div><div><span>Paid till date</span><strong>₹52,800</strong></div><div className="due"><span>Outstanding</span><strong>₹33,600</strong></div></div><div className="instalment-list">{[["Term II tuition fee", "Due 15 July 2026", "₹24,000"], ["Transport · Jul–Sep", "Due 10 July 2026", "₹7,800"], ["Activity fee", "Due 01 August 2026", "₹1,800"]].map((row, index) => <label key={row[0]}><input type="checkbox" defaultChecked={index < 2} /><span><strong>{row[0]}</strong><small>{row[1]}</small></span><b>{row[2]}</b></label>)}</div></section><section className="panel payment-card"><h2>Payment details</h2><Field label="Amount received" required placeholder="₹31,800" /><label className="field"><span>Payment method</span><div className="payment-methods"><button className="active"><IndianRupee size={17} />Cash</button><button><CircleDollarSign size={17} />UPI</button><button><ReceiptIndianRupee size={17} />Card / Bank</button></div></label><Field label="Payment date" required type="date" placeholder="" /><Field label="Reference number" placeholder="Optional" /><label className="field full"><span>Internal note</span><textarea placeholder="Add a note…" /></label><div className="payment-total"><span>Amount to collect</span><strong>₹31,800</strong></div><button className="primary-button full-button">Collect fee & generate receipt</button></section></div></div>;
}

function AttendanceDownloadPage() {
  return <div className="page-stack focused-form-page">
    <header className="focused-form-heading"><span><ModuleMark kind="attendance" size={32} /></span><div><p className="eyebrow">Attendance</p><h1>Download attendance</h1><p>Select exactly what you need. The preview updates before you download.</p></div></header>
    <section className="download-workspace">
      <div className="download-filters">
        <div className="form-intro"><span>1</span><div><h2>Choose report details</h2><p>Student and staff reports use different filters.</p></div></div>
        <div className="report-type-choice"><button className="active"><ModuleMark kind="students" size={23} /><span><strong>Student attendance</strong><small>Class and section-wise</small></span></button><button><ModuleMark kind="staff" size={23} /><span><strong>Staff attendance</strong><small>Teaching or non-teaching</small></span></button></div>
        <div className="field-grid"><Field label="From date" required type="date" /><Field label="To date" required type="date" /><Field label="Class" required select placeholder="Select class" /><Field label="Section" select placeholder="All sections" /></div>
        <label className="field full"><span>Attendance status</span><div className="prefilter-pills"><button className="active">All</button><button>Present</button><button>Absent</button><button>Leave</button></div></label>
      </div>
      <aside className="download-summary"><span className="summary-mark"><ModuleMark kind="attendance" size={34} /></span><p className="eyebrow">Your selection</p><h2>Student attendance</h2><dl><div><dt>Date range</dt><dd>01–13 July 2026</dd></div><div><dt>Class</dt><dd>All classes</dd></div><div><dt>Records</dt><dd>1,248 students</dd></div></dl><p className="summary-note">The file will include date, admission number, class, check-in time and status.</p><button className="primary-button full-button">Download Excel</button><button className="secondary-button full-button">Download PDF</button></aside>
    </section>
  </div>;
}

function TimetableUploadPage() {
  return <div className="page-stack focused-form-page">
    <header className="focused-form-heading"><span><ModuleMark kind="timetable" size={32} /></span><div><p className="eyebrow">Timetable</p><h1>Upload class timetable</h1><p>Publish one timetable to the students and teachers of a selected class.</p></div></header>
    <section className="upload-timetable-card">
      <div className="timetable-steps"><div className="active"><span>1</span><strong>Select class</strong></div><i /><div><span>2</span><strong>Upload file</strong></div><i /><div><span>3</span><strong>Review & publish</strong></div></div>
      <div className="timetable-form-grid"><Field label="Academic year" required select placeholder="2026–27" /><Field label="Class" required select placeholder="Select class" /><Field label="Section" required select placeholder="Select section" /><Field label="Effective from" required type="date" /></div>
      <div className="timetable-dropzone"><span><ModuleMark kind="timetable" size={40} /></span><h2>Drop timetable here</h2><p>Upload a PDF, PNG or JPG file up to 10 MB.</p><button className="secondary-button">Choose file</button></div>
      <div className="publish-note"><ModuleMark kind="communication" size={22} /><p><strong>What happens after publishing?</strong><small>This timetable will later appear automatically for all students and teachers assigned to the selected class.</small></p></div>
      <footer className="simple-form-actions"><Link href="/admin/timetable" className="secondary-button">Cancel</Link><button className="primary-button">Continue to review</button></footer>
    </section>
  </div>;
}

function StudentLeaveFormPage() {
  return <SimpleFocusedForm kind="leave" eyebrow="Student leave" title="Add student leave" description="Record a leave request in a few clear fields." fields={["Student", "Class & section", "Leave from", "Leave to", "Reason"]} submit="Save leave request" />;
}

function AddHolidayPage() {
  return <SimpleFocusedForm kind="holidays" eyebrow="School calendar" title="Add holiday" description="Add one holiday for the selected school audience." fields={["Holiday name", "Date", "Applies to", "Short note"]} submit="Add holiday" />;
}

function SimpleFocusedForm({ kind, eyebrow, title, description, fields, submit }: { kind: "leave" | "holidays"; eyebrow: string; title: string; description: string; fields: string[]; submit: string }) {
  return <div className="page-stack focused-form-page"><header className="focused-form-heading"><span><ModuleMark kind={kind} size={32} /></span><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></header><section className="simple-focused-form"><div className="form-intro"><span>1</span><div><h2>Required details</h2><p>Complete the information below. You can edit it later.</p></div></div><div className="field-grid">{fields.map((label, index) => <Field key={label} label={label} required={index < 3} select={label.includes("Student") || label.includes("Class") || label.includes("Applies")} type={label.includes("Date") || label.includes("from") || label.includes("to") ? "date" : "text"} placeholder={`Enter ${label.toLowerCase()}`} />)}</div><footer className="simple-form-actions"><button className="secondary-button">Cancel</button><button className="primary-button">{submit}</button></footer></section></div>;
}

function primaryHref(module: string, page: string) {
  if (module === "students") return "/admin/students/add-student";
  if (module === "staff") return "/admin/staff/add-staff";
  if (module === "fees") return "/admin/fees/collect-fee";
  if (module === "communication") return "/admin/communication/announcements";
  return `/admin/${module}/${page}`;
}

function primaryLabel(module: string, page: string) {
  if (module === "students") return "Add student";
  if (module === "staff") return "Add staff";
  if (module === "fees") return "Collect fee";
  if (module === "attendance") return "Mark attendance";
  if (module === "communication") return "Create announcement";
  if (module === "library") return "Add book";
  if (module === "documents") return "Generate document";
  if (module === "reports") return "Build report";
  if (page.toLowerCase().includes("admission")) return "New application";
  return "Add new";
}

function BellRingIcon() { return <span className="small-nav-icon">◌</span>; }
