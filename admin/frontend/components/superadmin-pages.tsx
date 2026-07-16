"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock3,
  Database,
  Download,
  Filter,
  HardDrive,
  Lock,
  Mail,
  MoreHorizontal,
  Search,
  Server,
} from "lucide-react";
import { ModuleMark, type MarkKind } from "@/components/module-mark";
import { superAdminTitleFromSlug } from "@/lib/superadmin-navigation";

type Props = { segments: string[] };

const schools = [
  { id: "SCH-001", name: "Vidya Sanskar School", city: "New Delhi", plan: "Premium", users: "2,184", status: "Active", health: "Good", renewal: "18 Aug 2026" },
  { id: "SCH-002", name: "Green Valley Public School", city: "Jaipur", plan: "Standard", users: "1,046", status: "Trial", health: "Review", renewal: "22 Jul 2026" },
  { id: "SCH-003", name: "North Star Academy", city: "Lucknow", plan: "Standard", users: "864", status: "Active", health: "Good", renewal: "04 Sep 2026" },
  { id: "SCH-004", name: "Riverdale International", city: "Gurugram", plan: "Enterprise", users: "3,420", status: "Active", health: "Good", renewal: "12 Dec 2026" },
  { id: "SCH-005", name: "Little Scholars School", city: "Noida", plan: "Standard", users: "588", status: "Suspended", health: "Blocked", renewal: "Overdue" },
];

const subscriptions = [
  { school: "Vidya Sanskar School", plan: "Premium", amount: "Rs 25,000", status: "Paid", renewal: "18 Aug 2026" },
  { school: "Green Valley Public School", plan: "Standard", amount: "Rs 10,000", status: "Trial", renewal: "22 Jul 2026" },
  { school: "Little Scholars School", plan: "Standard", amount: "Rs 10,000", status: "Overdue", renewal: "05 Jul 2026" },
  { school: "Riverdale International", plan: "Enterprise", amount: "Rs 58,000", status: "Paid", renewal: "12 Dec 2026" },
];

const supportTickets = [
  { id: "TKT-401", school: "Green Valley Public School", title: "Payment gateway callback failed", priority: "High", status: "Open", owner: "Billing" },
  { id: "TKT-402", school: "Vidya Sanskar School", title: "Timetable upload stuck for Class 8", priority: "Medium", status: "Open", owner: "Support" },
  { id: "TKT-403", school: "North Star Academy", title: "Request support access for data import", priority: "High", status: "Approval needed", owner: "Platform" },
];

const securityRows = [
  { item: "Failed login cluster", school: "Vidya Sanskar School", signal: "38 attempts", status: "Review" },
  { item: "Blocked IP", school: "Platform firewall", signal: "103.48.12.8", status: "Blocked" },
  { item: "Admin MFA missing", school: "Green Valley Public School", signal: "1 admin", status: "Action needed" },
  { item: "Support access request", school: "North Star Academy", signal: "Import assistance", status: "Approval needed" },
];

const auditRows = [
  ["Krishna Verma", "created a school", "Green Valley Public School", "Today, 11:42 AM"],
  ["Platform Support", "requested support access", "North Star Academy", "Today, 10:18 AM"],
  ["Billing Manager", "updated subscription", "Riverdale International", "Yesterday, 4:10 PM"],
  ["System", "completed nightly backup", "42 schools", "Yesterday, 2:00 AM"],
];

const hubs: Record<string, {
  eyebrow: string;
  title: string;
  description: string;
  actions: Array<{ title: string; description: string; href: string; kind: MarkKind; meta: string; primary?: boolean }>;
}> = {
  schools: {
    eyebrow: "School management",
    title: "Schools",
    description: "Create schools, monitor health, manage admins, modules and support access.",
    actions: [
      { title: "All schools", description: "Search active, trial and suspended schools.", href: "/superadmin/schools/all-schools", kind: "students", meta: "42 schools", primary: true },
      { title: "Add school", description: "Create a school and its first administrator.", href: "/superadmin/schools/add-school", kind: "students", meta: "New onboarding" },
      { title: "Suspended schools", description: "Review schools blocked for billing or security.", href: "/superadmin/schools/suspended", kind: "settings", meta: "1 suspended" },
    ],
  },
  subscriptions: {
    eyebrow: "Billing",
    title: "Subscriptions",
    description: "Plans, invoices, renewals and payment health across schools.",
    actions: [
      { title: "School subscriptions", description: "Review current plans and renewal dates.", href: "/superadmin/subscriptions/schools", kind: "fees", meta: "42 records", primary: true },
      { title: "Plans", description: "Standard, Premium and Enterprise plan settings.", href: "/superadmin/subscriptions/plans", kind: "fees", meta: "3 plans" },
      { title: "Overdue", description: "Schools with pending invoices.", href: "/superadmin/subscriptions/overdue", kind: "fees", meta: "1 overdue" },
    ],
  },
  "platform-users": {
    eyebrow: "Internal users",
    title: "Platform users",
    description: "Super admins, support team and billing users. This is not school staff.",
    actions: [
      { title: "Super admins", description: "Manage platform administrator accounts.", href: "/superadmin/platform-users/super-admins", kind: "staff", meta: "3 users", primary: true },
      { title: "Support team", description: "Support users and access limits.", href: "/superadmin/platform-users/support-team", kind: "communication", meta: "8 users" },
      { title: "Roles", description: "Platform-level roles and permissions.", href: "/superadmin/platform-users/roles", kind: "settings", meta: "5 roles" },
    ],
  },
  support: {
    eyebrow: "Support operations",
    title: "Support",
    description: "Tickets, school issues and audited remote access requests.",
    actions: [
      { title: "Tickets", description: "Open school support tickets.", href: "/superadmin/support/tickets", kind: "communication", meta: "6 open", primary: true },
      { title: "Access requests", description: "Approve time-limited support access.", href: "/superadmin/support/access-requests", kind: "settings", meta: "1 approval" },
      { title: "School issues", description: "Track unresolved platform issues by school.", href: "/superadmin/support/school-issues", kind: "dashboard", meta: "4 issues" },
    ],
  },
  security: {
    eyebrow: "Platform security",
    title: "Security",
    description: "Failed logins, suspicious activity, blocked IPs, MFA and sessions.",
    actions: [
      { title: "Security center", description: "Review suspicious signals and required actions.", href: "/superadmin/security/center", kind: "settings", meta: "4 alerts", primary: true },
      { title: "Failed logins", description: "Login attempts across schools.", href: "/superadmin/security/failed-logins", kind: "attendance", meta: "38 today" },
      { title: "Active sessions", description: "Review and revoke platform sessions.", href: "/superadmin/security/sessions", kind: "staff", meta: "214 active" },
    ],
  },
  system: {
    eyebrow: "Infrastructure",
    title: "System health",
    description: "API, database, background jobs, backups, storage and integrations.",
    actions: [
      { title: "Health overview", description: "Current platform health and uptime.", href: "/superadmin/system/health", kind: "dashboard", meta: "Online", primary: true },
      { title: "Backups", description: "Backup and restore-test status.", href: "/superadmin/system/backups", kind: "settings", meta: "2 failed checks" },
      { title: "Background jobs", description: "Reports, SMS, imports and exports.", href: "/superadmin/system/jobs", kind: "attendance", meta: "12 queued" },
    ],
  },
  templates: {
    eyebrow: "Shared templates",
    title: "Templates",
    description: "Platform SMS, email, receipt, certificate and report-card templates.",
    actions: [
      { title: "SMS templates", description: "Reusable messages for attendance, fees and alerts.", href: "/superadmin/templates/sms", kind: "communication", meta: "18 templates", primary: true },
      { title: "Email templates", description: "School onboarding, reset and billing emails.", href: "/superadmin/templates/email", kind: "communication", meta: "11 templates" },
      { title: "Receipt templates", description: "Receipt and certificate layout settings.", href: "/superadmin/templates/receipts", kind: "fees", meta: "4 formats" },
    ],
  },
};

export function SuperAdminModulePage({ segments }: Props) {
  const area = segments[0] ?? "dashboard";
  const page = segments[segments.length - 1] ?? area;

  if (area === "schools" && page === "add-school") return <AddSchoolPage />;
  if (area === "schools" && (page === "all-schools" || page === "schools" || page === "suspended")) return <SchoolsPage suspended={page === "suspended"} />;
  if (area === "subscriptions" && ["schools", "subscriptions", "overdue"].includes(page)) return <SubscriptionsPage overdue={page === "overdue"} />;
  if (area === "subscriptions" && page === "plans") return <PlansPage />;
  if (area === "platform-users" && ["super-admins", "support-team", "roles", "platform-users"].includes(page)) return <PlatformUsersPage mode={page} />;
  if (area === "support" && ["tickets", "support", "school-issues"].includes(page)) return <SupportTicketsPage />;
  if (area === "support" && page === "access-requests") return <AccessRequestsPage />;
  if (area === "security") return <SecurityPage detail={page} />;
  if (area === "system") return <SystemPage detail={page} />;
  if (area === "audit-logs") return <AuditLogsPage />;
  if (area === "templates") return <TemplatesPage type={page} />;
  if (area === "settings") return <SettingsPage />;
  if (hubs[area]) return <SuperAdminHub area={area} />;
  return <SuperAdminHub area="schools" />;
}

function SuperAdminHub({ area }: { area: string }) {
  const hub = hubs[area] ?? hubs.schools;
  return (
    <div className="superadmin-hub page-stack">
      <SuperIntro kind={hub.actions[0].kind} eyebrow={hub.eyebrow} title={hub.title} description={hub.description} />
      <section className={`superadmin-hub-grid count-${hub.actions.length}`}>
        {hub.actions.map((action) => (
          <Link href={action.href} className={action.primary ? "primary" : ""} key={action.title}>
            <span><ModuleMark kind={action.kind} size={68} /></span>
            <div><small>{action.meta}</small><strong>{action.title}</strong><p>{action.description}</p></div>
            <ArrowRight size={23} />
          </Link>
        ))}
      </section>
    </div>
  );
}

function SuperIntro({ kind, eyebrow, title, description, actions }: { kind: MarkKind; eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return <header className="superadmin-intro"><span><ModuleMark kind={kind} size={58} /></span><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{actions && <div className="superadmin-intro-actions">{actions}</div>}</header>;
}

function SuperStatus({ value }: { value: string }) {
  const tone = ["Active", "Good", "Paid", "Online", "Healthy", "Resolved"].includes(value)
    ? "good"
    : ["Trial", "Review", "Open", "Approval needed", "Action needed"].includes(value)
      ? "warn"
      : ["Suspended", "Blocked", "Overdue", "Failed"].includes(value)
        ? "bad"
        : "calm";
  return <span className={`super-status ${tone}`}><i />{value}</span>;
}

function SchoolsPage({ suspended = false }: { suspended?: boolean }) {
  const rows = schools.filter((school) => !suspended || school.status === "Suspended");
  return (
    <div className="page-stack">
      <SuperIntro kind="students" eyebrow="School management" title={suspended ? "Suspended schools" : "All schools"} description="Platform-level school list with billing, health and status. Daily school records stay inside each school workspace." actions={<Link href="/superadmin/schools/add-school">Add school</Link>} />
      <SuperStats items={[["Total schools", "42", "38 active"], ["Trial schools", "3", "2 need follow-up"], ["Suspended", "1", "Billing overdue"], ["Avg health", "96%", "Across platform"]]} />
      <section className="superadmin-panel">
        <TableToolbar placeholder="Search school name, city or ID" />
        <div className="super-table-wrap"><table className="super-table"><thead><tr><th>School</th><th>City</th><th>Plan</th><th>Users</th><th>Status</th><th>Health</th><th>Renewal</th><th /></tr></thead><tbody>{rows.map((school) => <tr key={school.id}><td><SuperPerson initials={school.name.slice(0, 2).toUpperCase()} name={school.name} detail={school.id} /></td><td>{school.city}</td><td>{school.plan}</td><td>{school.users}</td><td><SuperStatus value={school.status} /></td><td><SuperStatus value={school.health} /></td><td>{school.renewal}</td><td><button className="icon-button"><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}

function AddSchoolPage() {
  const [step, setStep] = useState(1);
  const steps = ["School profile", "First admin", "Plan", "Modules", "Review"];
  return (
    <div className="page-stack">
      <SuperIntro kind="students" eyebrow="Onboarding" title="Add school" description="Create one school, first admin login, plan and enabled modules in a guided flow." />
      <section className="superadmin-form-shell">
        <aside>{steps.map((item, index) => <button key={item} className={step === index + 1 ? "active" : ""} onClick={() => setStep(index + 1)}><span>{index + 1}</span><strong>{item}</strong></button>)}</aside>
        <div className="superadmin-form-card">
          <header><p className="eyebrow">Step {step}</p><h2>{steps[step - 1]}</h2><p>Keep onboarding simple for your team. Backend will later create school, admin and default permissions in a transaction.</p></header>
          {step === 5 ? <ReviewBox /> : <div className="super-form-grid">{formFieldsForStep(step).map((field) => <label key={field}><span>{field}</span><input placeholder={`Enter ${field.toLowerCase()}`} /></label>)}</div>}
          <footer><button>Save draft</button><button onClick={() => setStep(Math.min(5, step + 1))}>{step === 5 ? "Create school" : "Continue"}<ArrowRight size={18} /></button></footer>
        </div>
      </section>
    </div>
  );
}

function formFieldsForStep(step: number) {
  if (step === 1) return ["School name", "School code", "City", "Board affiliation", "School email", "School phone"];
  if (step === 2) return ["Admin full name", "Admin phone", "Admin email", "Temporary password"];
  if (step === 3) return ["Plan", "Billing cycle", "Start date", "Trial ends on"];
  return ["Students module", "Attendance module", "Fees module", "Family portal"];
}

function ReviewBox() {
  return <div className="super-review-box">{["School profile complete", "First admin ready", "Premium monthly plan selected", "Core modules enabled"].map((item) => <article key={item}><Check size={17} /><strong>{item}</strong></article>)}</div>;
}

function SubscriptionsPage({ overdue = false }: { overdue?: boolean }) {
  const rows = subscriptions.filter((item) => !overdue || item.status === "Overdue");
  return <SimpleDataPage kind="fees" eyebrow="Billing" title={overdue ? "Overdue subscriptions" : "School subscriptions"} description="Plans, renewal dates and invoice status across schools." columns={["School", "Plan", "Amount", "Status", "Renewal"]} rows={rows.map((item) => [item.school, item.plan, item.amount, item.status, item.renewal])} />;
}

function PlansPage() {
  return <div className="page-stack"><SuperIntro kind="fees" eyebrow="Billing" title="Plans" description="Simple commercial plans for school onboarding." /><section className="super-plan-grid">{[["Standard", "Rs 10,000", "Core ERP for small schools"], ["Premium", "Rs 25,000", "Advanced reports and priority support"], ["Enterprise", "Custom", "Dedicated database or server"]].map((plan) => <article key={plan[0]}><span><ModuleMark kind="fees" size={54} /></span><h2>{plan[0]}</h2><strong>{plan[1]}</strong><p>{plan[2]}</p><button>Edit plan</button></article>)}</section></div>;
}

function PlatformUsersPage({ mode }: { mode: string }) {
  const title = mode === "platform-users" ? "Platform users" : superAdminTitleFromSlug(mode);
  return <SimpleDataPage kind="staff" eyebrow="Internal access" title={title} description="Internal users only. These accounts are not school staff accounts." columns={["User", "Role", "MFA", "Last active", "Status"]} rows={[["Krishna Verma", "Super admin", "Enabled", "Today", "Active"], ["Asha Mehta", "Support lead", "Enabled", "Today", "Active"], ["Billing Desk", "Billing manager", "Enabled", "Yesterday", "Active"], ["Support Intern", "Support viewer", "Missing", "12 Jul", "Review"]]} />;
}

function SupportTicketsPage() {
  return <SimpleDataPage kind="communication" eyebrow="Support" title="Support tickets" description="School support issues and owner queue." columns={["Ticket", "School", "Issue", "Priority", "Status", "Owner"]} rows={supportTickets.map((item) => [item.id, item.school, item.title, item.priority, item.status, item.owner])} />;
}

function AccessRequestsPage() {
  return <div className="page-stack"><SuperIntro kind="settings" eyebrow="Support access" title="Remote access requests" description="Time-limited, reason-required support access. Every approval must be audited." /><section className="superadmin-panel"><div className="super-access-list">{["North Star Academy import assistance", "Green Valley billing verification", "Vidya Sanskar timetable debugging"].map((item, index) => <article key={item}><span><Lock size={22} /></span><div><strong>{item}</strong><small>{index === 0 ? "Awaiting approval" : "Completed and logged"}</small></div><SuperStatus value={index === 0 ? "Approval needed" : "Resolved"} /><button>{index === 0 ? "Review" : "View log"}</button></article>)}</div></section></div>;
}

function SecurityPage({ detail }: { detail: string }) {
  const title = detail === "security" ? "Security center" : superAdminTitleFromSlug(detail);
  return <SimpleDataPage kind="settings" eyebrow="Platform security" title={title} description="Security events are reviewed at platform level, not inside daily school workflows." columns={["Signal", "Scope", "Detail", "Status"]} rows={securityRows.map((item) => [item.item, item.school, item.signal, item.status])} />;
}

function SystemPage({ detail }: { detail: string }) {
  const title = detail === "system" ? "System health" : superAdminTitleFromSlug(detail);
  return <div className="page-stack"><SuperIntro kind="dashboard" eyebrow="Infrastructure" title={title} description="API, database, backups, storage, integrations and background jobs." /><section className="super-system-grid">{[["API servers", "Online", Server], ["PostgreSQL", "Healthy", Database], ["Object storage", "68% used", HardDrive], ["Nightly backups", "2 failed checks", AlertTriangle], ["Background jobs", "12 queued", Clock3], ["Email and SMS", "Online", Mail]].map(([label, value, Icon]) => { const TypedIcon = Icon as typeof Server; return <article key={label as string}><span><TypedIcon size={26} /></span><strong>{label as string}</strong><SuperStatus value={value as string} /><p>Last checked just now</p></article>; })}</section></div>;
}

function AuditLogsPage() {
  return <SimpleDataPage kind="attendance" eyebrow="Audit" title="Audit logs" description="Important platform actions, support access and school changes." columns={["Actor", "Action", "Resource", "Time"]} rows={auditRows} />;
}

function TemplatesPage({ type }: { type: string }) {
  const title = type === "templates" ? "Templates" : superAdminTitleFromSlug(type);
  return <SimpleDataPage kind="communication" eyebrow="Templates" title={title} description="Reusable platform templates for SMS, email, receipts and certificates." columns={["Template", "Channel", "Used for", "Status"]} rows={[["Fee reminder", "SMS", "Parent dues", "Active"], ["Welcome admin", "Email", "School onboarding", "Active"], ["Password reset", "Email", "Auth", "Active"], ["Receipt format", "PDF", "Fees", "Review"]]} />;
}

function SettingsPage() {
  return <div className="page-stack"><SuperIntro kind="settings" eyebrow="Platform settings" title="Settings" description="Global settings for platform behavior, alerts and support controls." /><section className="superadmin-panel super-settings-grid">{["Require MFA for super admins", "Log every support access", "Send backup failure alerts", "Block school data browsing by default"].map((item) => <label key={item}><input type="checkbox" defaultChecked /><span>{item}</span></label>)}</section></div>;
}

function SimpleDataPage({ kind, eyebrow, title, description, columns, rows }: { kind: MarkKind; eyebrow: string; title: string; description: string; columns: string[]; rows: string[][] }) {
  return <div className="page-stack"><SuperIntro kind={kind} eyebrow={eyebrow} title={title} description={description} actions={<button className="secondary-button"><Download size={16} /> Export</button>} /><section className="superadmin-panel"><TableToolbar placeholder={`Search ${title.toLowerCase()}`} /><div className="super-table-wrap"><table className="super-table"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}<th /></tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{index === row.length - 1 ? <SuperStatus value={cell} /> : cell}</td>)}<td><button className="icon-button"><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div></section></div>;
}

function SuperStats({ items }: { items: Array<[string, string, string]> }) {
  return <section className="super-stat-row">{items.map(([label, value, note]) => <article key={label}><p>{label}</p><strong>{value}</strong><small>{note}</small></article>)}</section>;
}

function TableToolbar({ placeholder }: { placeholder: string }) {
  return <div className="super-table-toolbar"><div><Search size={18} /><input placeholder={placeholder} /></div><button><Filter size={16} /> Filters</button></div>;
}

function SuperPerson({ initials, name, detail }: { initials: string; name: string; detail: string }) {
  return <div className="super-person"><span>{initials}</span><div><strong>{name}</strong><small>{detail}</small></div></div>;
}
