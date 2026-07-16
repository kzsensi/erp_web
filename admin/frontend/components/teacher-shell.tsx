"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  CircleHelp,
  Menu,
  PanelLeftClose,
  Plus,
  X,
} from "lucide-react";
import { ModuleMark } from "@/components/module-mark";
import { teacherConfig, teacherNavigation, teacherUtilityNavigation } from "@/lib/teacher-navigation";

export function TeacherShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const activeGroup = useMemo(
    () => [...teacherNavigation, ...teacherUtilityNavigation].find((group) => group.match.some((prefix) => pathname.startsWith(prefix))),
    [pathname]
  );

  const sidebar = (
    <>
      <div className="brand-row">
        <Link href="/teacher/dashboard" className="brand" aria-label="Samvarg Solutions ERP teacher home">
          <span className="brand-mark">N</span>
          {!collapsed && <span><strong>SAMVARG SOLUTIONS ERP</strong><small>Teacher workspace</small></span>}
        </Link>
        <button className="icon-button desktop-collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar">
          <PanelLeftClose size={18} />
        </button>
        <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
      </div>

      <nav className="sidebar-nav" aria-label="Teacher navigation">
        {!collapsed && <p className="nav-caption">Classroom work</p>}
        {teacherNavigation.map((group) => {
          const groupActive = activeGroup?.label === group.label;
          return (
            <div className="nav-group" key={group.label}>
              <div className={`nav-primary ${groupActive ? "active" : ""}`}>
                <Link href={group.href} title={collapsed ? group.label : undefined}>
                  <ModuleMark kind={group.mark} size={20} variant="icon" />
                  {!collapsed && <span>{group.label}</span>}
                </Link>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {teacherUtilityNavigation.map((group) => (
          <Link key={group.href} href={group.href} className={`support-link ${activeGroup?.label === group.label ? "active" : ""}`}>
            <ModuleMark kind={group.mark} size={19} variant="icon" />{!collapsed && <span>{group.label}</span>}
          </Link>
        ))}
        <button className="support-link"><CircleHelp size={18} />{!collapsed && <span>Help & support</span>}</button>
        {!collapsed && <div className="sync-status"><i /> Teacher data synced</div>}
      </div>
    </>
  );

  return (
    <div className={`admin-shell teacher-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar desktop-sidebar">{sidebar}</aside>
      {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}
      <aside className={`sidebar mobile-sidebar ${mobileOpen ? "open" : ""}`}>{sidebar}</aside>

      <div className="admin-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
            <button className="back-button" onClick={() => router.back()} aria-label="Go back"><ChevronLeft size={18} /></button>
          </div>
          <Link href="/teacher/dashboard" className="topbar-school" aria-label={`${teacherConfig.schoolName} teacher dashboard`}>
            <span>
              <strong className="school-name-full">{teacherConfig.schoolName}</strong>
              <strong className="school-name-short">{teacherConfig.schoolShortName}</strong>
              <small>{teacherConfig.workspace} - {teacherConfig.academicYear}</small>
            </span>
          </Link>
          <div className="topbar-actions">
            <Link className="quick-add" href="/teacher/attendance/mark"><Plus size={17} /><span>Mark attendance</span></Link>
            <button className="icon-button alert-button" aria-label="Notifications"><Bell size={19} /><i /></button>
            <button className="profile-button">
              <span className="profile-avatar">{teacherConfig.teacherInitials}</span>
              <span className="profile-copy"><strong>{teacherConfig.teacherName}</strong><small>{teacherConfig.role}</small></span>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>
        <main className="page-canvas">{children}</main>
      </div>
    </div>
  );
}
