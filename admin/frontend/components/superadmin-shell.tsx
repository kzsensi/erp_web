"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import {
  superAdminConfig,
  superAdminNavigation,
  superAdminUtilityNavigation,
} from "@/lib/superadmin-navigation";

export function SuperAdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const activeGroup = useMemo(
    () => [...superAdminNavigation, ...superAdminUtilityNavigation].find((group) => group.match.some((prefix) => pathname.startsWith(prefix))),
    [pathname]
  );

  const sidebar = (
    <>
      <div className="brand-row">
        <Link href="/superadmin/dashboard" className="brand" aria-label="Super admin dashboard">
          <span className="brand-mark">N</span>
          {!collapsed && <span><strong>SAMVARG SOLUTIONS ERP</strong><small>Super admin</small></span>}
        </Link>
        <button className="icon-button desktop-collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar">
          <PanelLeftClose size={18} />
        </button>
        <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
      </div>

      <nav className="sidebar-nav" aria-label="Super admin navigation">
        {!collapsed && <p className="nav-caption">Platform operations</p>}
        {superAdminNavigation.map((group) => {
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
        {superAdminUtilityNavigation.map((group) => (
          <Link key={group.href} href={group.href} className={`support-link ${activeGroup?.label === group.label ? "active" : ""}`}>
            <ModuleMark kind={group.mark} size={19} variant="icon" />{!collapsed && <span>{group.label}</span>}
          </Link>
        ))}
        <button className="support-link"><CircleHelp size={18} />{!collapsed && <span>Help & support</span>}</button>
        {!collapsed && <div className="sync-status"><i /> Platform healthy</div>}
      </div>
    </>
  );

  return (
    <div className={`admin-shell superadmin-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar desktop-sidebar">{sidebar}</aside>
      {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}
      <aside className={`sidebar mobile-sidebar ${mobileOpen ? "open" : ""}`}>{sidebar}</aside>

      <div className="admin-main">
        <header className="topbar superadmin-topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
            <button className="back-button" aria-label="Go back"><ChevronLeft size={18} /></button>
          </div>
          <Link href="/superadmin/dashboard" className="topbar-school" aria-label="Platform dashboard">
            <span>
              <strong className="school-name-full">{superAdminConfig.companyName}</strong>
              <strong className="school-name-short">{superAdminConfig.shortName}</strong>
              <small>{superAdminConfig.workspace}</small>
            </span>
          </Link>
          <div className="topbar-actions">
            <Link className="quick-add superadmin-add" href="/superadmin/schools/add-school"><Plus size={17} /><span>Add school</span></Link>
            <button className="icon-button alert-button" aria-label="Notifications"><Bell size={19} /><i /></button>
            <button className="profile-button">
              <span className="profile-avatar">{superAdminConfig.operatorInitials}</span>
              <span className="profile-copy"><strong>{superAdminConfig.operatorName}</strong><small>{superAdminConfig.role}</small></span>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>
        <main className="page-canvas superadmin-canvas">{children}</main>
      </div>
    </div>
  );
}
