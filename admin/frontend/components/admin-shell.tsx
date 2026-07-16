"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Bell, ChevronDown, ChevronLeft, CircleHelp, Menu,
  PanelLeftClose, Plus, X,
} from "lucide-react";
import { adminNavigation, schoolConfig, utilityNavigation } from "@/lib/admin-navigation";
import { ModuleMark } from "@/components/module-mark";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    // Search hotkey removed
  }, []);

  const activeGroup = useMemo(
    () => [...adminNavigation, ...utilityNavigation].find((group) => group.match.some((prefix) => pathname.startsWith(prefix))),
    [pathname]
  );

  const sidebar = (
    <>
      <div className="brand-row">
        <Link href="/admin/dashboard" className="brand" aria-label="Samvarg Solutions ERP home">
          <span className="brand-mark">N</span>
          {!collapsed && <span><strong>SAMVARG SOLUTIONS ERP</strong><small>School workspace</small></span>}
        </Link>
        <button className="icon-button desktop-collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar">
          <PanelLeftClose size={18} />
        </button>
        <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
      </div>

      <nav className="sidebar-nav" aria-label="Admin navigation">
        {!collapsed && <p className="nav-caption">School management</p>}
        {adminNavigation.map((group) => {
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
        {utilityNavigation.map((group) => {
          return <Link key={group.href} href={group.href} className={`support-link ${activeGroup?.label === group.label ? "active" : ""}`}><ModuleMark kind={group.mark} size={19} variant="icon" />{!collapsed && <span>{group.label}</span>}</Link>;
        })}
        <button className="support-link"><CircleHelp size={18} />{!collapsed && <span>Help & support</span>}</button>
        {!collapsed && <div className="sync-status"><i /> All systems operational</div>}
      </div>
    </>
  );

  return (
    <div className={`admin-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar desktop-sidebar">{sidebar}</aside>
      {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}
      <aside className={`sidebar mobile-sidebar ${mobileOpen ? "open" : ""}`}>{sidebar}</aside>

      <div className="admin-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
            <button className="back-button" aria-label="Go back"><ChevronLeft size={18} /></button>
          </div>
          <Link href="/admin/dashboard" className="topbar-school" aria-label={`${schoolConfig.name} dashboard`}>
            <span><strong className="school-name-full">{schoolConfig.name}</strong><strong className="school-name-short">{schoolConfig.shortName}</strong><small>Admin workspace · {schoolConfig.academicYear}</small></span>
          </Link>
          <div className="topbar-actions">
            <Link className="quick-add" href="/admin/students/add-student"><Plus size={17} /><span>Add student</span></Link>
            <button className="icon-button alert-button" aria-label="Notifications"><Bell size={19} /><i /></button>
            <button className="profile-button">
              <span className="profile-avatar">AR</span><span className="profile-copy"><strong>Ananya Rao</strong><small>School administrator</small></span><ChevronDown size={15} />
            </button>
          </div>
        </header>
        <main className="page-canvas">{children}</main>
      </div>

    </div>
  );
}
