import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Database,
  HardDrive,
  MessageSquare,
  Server,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { ModuleMark } from "@/components/module-mark";

const metrics = [
  { label: "Active schools", value: "42", note: "3 trials convert this week", kind: "students", tone: "blue" },
  { label: "Total users", value: "18.4K", note: "Students, staff and families", kind: "staff", tone: "teal" },
  { label: "Monthly revenue", value: "Rs 8.2L", note: "92% collection health", kind: "fees", tone: "gold" },
  { label: "Security alerts", value: "4", note: "Need review today", kind: "settings", tone: "red" },
];

const priorityItems = [
  { title: "2 schools have failed backup checks", note: "Restore test pending for last night", href: "/superadmin/system/backups", icon: Database, tone: "red" },
  { title: "4 suspicious login clusters", note: "Repeated failed attempts across 3 schools", href: "/superadmin/security/suspicious-activity", icon: ShieldCheck, tone: "gold" },
  { title: "6 support tickets require owner response", note: "Payment gateway and timetable upload issues", href: "/superadmin/support/tickets", icon: MessageSquare, tone: "blue" },
];

const quickActions = [
  { title: "Add school", note: "Create school and first admin", href: "/superadmin/schools/add-school", kind: "students" },
  { title: "View schools", note: "Active, trial and suspended", href: "/superadmin/schools", kind: "students" },
  { title: "Security center", note: "Login events and blocked IPs", href: "/superadmin/security", kind: "settings" },
  { title: "System health", note: "API, jobs, DB and storage", href: "/superadmin/system", kind: "dashboard" },
  { title: "Subscriptions", note: "Plans, invoices and renewals", href: "/superadmin/subscriptions", kind: "fees" },
  { title: "Support queue", note: "School issues and access requests", href: "/superadmin/support", kind: "communication" },
];

const healthRows = [
  { label: "API servers", value: "99.98%", icon: Server },
  { label: "Database", value: "Healthy", icon: Database },
  { label: "Storage", value: "68% used", icon: HardDrive },
  { label: "Billing", value: "Online", icon: WalletCards },
];

export default function SuperAdminDashboardPage() {
  return (
    <div className="superadmin-home page-stack">
      <section className="superadmin-hero">
        <div>
          <p className="eyebrow">Monday, 13 July 2026</p>
          <h1>Platform control center</h1>
          <p>Manage schools, subscriptions, support, security and system health without touching daily school operations.</p>
          <div className="superadmin-hero-actions">
            <Link href="/superadmin/schools/add-school">Create school</Link>
            <Link href="/superadmin/security">Review security</Link>
          </div>
        </div>
        <aside>
          <span><ShieldCheck size={40} /></span>
          <h2>4 alerts need review</h2>
          <p>No school data access is shown here unless support access is explicitly approved and audited.</p>
        </aside>
      </section>

      <section className="superadmin-metric-grid">
        {metrics.map((item) => (
          <article key={item.label} className={item.tone}>
            <span><ModuleMark kind={item.kind} size={52} /></span>
            <div><p>{item.label}</p><strong>{item.value}</strong><small>{item.note}</small></div>
          </article>
        ))}
      </section>

      <div className="superadmin-dashboard-grid">
        <section className="superadmin-panel">
          <header><div><p className="eyebrow">Action required</p><h2>Platform priorities</h2></div><span>3 open</span></header>
          <div className="superadmin-priority-list">
            {priorityItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={item.title}>
                  <i className={item.tone}><Icon size={21} /></i>
                  <div><strong>{item.title}</strong><small>{item.note}</small></div>
                  <ArrowRight size={20} />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="superadmin-panel">
          <header><div><p className="eyebrow">Shortcuts</p><h2>Common platform actions</h2></div></header>
          <div className="superadmin-action-grid">
            {quickActions.map((item) => (
              <Link href={item.href} key={item.title}>
                <span><ModuleMark kind={item.kind} size={42} /></span>
                <div><strong>{item.title}</strong><small>{item.note}</small></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="superadmin-panel superadmin-health-panel">
          <header><div><p className="eyebrow">Live health</p><h2>System status</h2></div><Link href="/superadmin/system">Open</Link></header>
          <div>
            {healthRows.map((item) => {
              const Icon = item.icon;
              return <article key={item.label}><Icon size={21} /><span>{item.label}</span><strong>{item.value}</strong></article>;
            })}
          </div>
        </section>

        <section className="superadmin-panel superadmin-alert-panel">
          <header><div><p className="eyebrow">Security</p><h2>Recent signals</h2></div><AlertTriangle size={24} /></header>
          <div className="superadmin-signal-list">
            <article><strong>Failed logins increased</strong><small>Vidya Sanskar School - 38 attempts</small></article>
            <article><strong>New support access request</strong><small>Green Valley School - reason required</small></article>
            <article><strong>Backup restore test due</strong><small>3 schools pending monthly check</small></article>
          </div>
        </section>
      </div>
    </div>
  );
}
