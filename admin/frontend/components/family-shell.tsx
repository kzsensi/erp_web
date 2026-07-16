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
  X,
} from "lucide-react";
import { ModuleMark } from "@/components/module-mark";
import { familyConfig, familyNavigation, familyUtilityNavigation } from "@/lib/family-navigation";

export function FamilyShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const activeGroup = useMemo(
    () => [...familyNavigation, ...familyUtilityNavigation].find((group) => group.match.some((prefix) => pathname.startsWith(prefix))),
    [pathname]
  );

  const sidebar = (
    <>
      <div className="brand-row">
        <Link href="/family/dashboard" className="brand" aria-label="Family portal home">
          <span className="brand-mark">N</span>
          {!collapsed && <span><strong>SAMVARG SOLUTIONS ERP</strong><small>Family portal</small></span>}
        </Link>
        <button className="icon-button desktop-collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar">
          <PanelLeftClose size={18} />
        </button>
        <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
      </div>

      <nav className="sidebar-nav" aria-label="Family navigation">
        {!collapsed && <p className="nav-caption">Parent essentials</p>}
        {familyNavigation.map((group) => {
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
        {familyUtilityNavigation.map((group) => (
          <Link key={group.href} href={group.href} className={`support-link ${activeGroup?.label === group.label ? "active" : ""}`}>
            <ModuleMark kind={group.mark} size={19} variant="icon" />{!collapsed && <span>{group.label}</span>}
          </Link>
        ))}
        <button className="support-link"><CircleHelp size={18} />{!collapsed && <span>Help & support</span>}</button>
        {!collapsed && <div className="sync-status"><i /> Family updates live</div>}
      </div>
    </>
  );

  return (
    <div className={`admin-shell family-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar desktop-sidebar">{sidebar}</aside>
      {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}
      <aside className={`sidebar mobile-sidebar ${mobileOpen ? "open" : ""}`}>{sidebar}</aside>

      <div className="admin-main">
        <header className="topbar family-topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
            <button className="back-button" aria-label="Go back"><ChevronLeft size={18} /></button>
          </div>
          <Link href="/family/dashboard" className="topbar-school" aria-label={`${familyConfig.schoolName} family dashboard`}>
            <span>
              <strong className="school-name-full">{familyConfig.schoolName}</strong>
              <strong className="school-name-short">{familyConfig.schoolShortName}</strong>
              <small>{familyConfig.workspace} - {familyConfig.academicYear}</small>
            </span>
          </Link>
          <div className="topbar-actions">
            <Link className="quick-add family-pay-button" href="/family/fees/pay-now">Pay fees</Link>
            <button className="icon-button alert-button" aria-label="Notifications"><Bell size={19} /><i /></button>
            <button className="profile-button">
              <span className="profile-avatar">{familyConfig.guardianInitials}</span>
              <span className="profile-copy"><strong>{familyConfig.guardianName}</strong><small>{familyConfig.role}</small></span>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>
        <main className="page-canvas family-canvas">{children}</main>
      </div>
    </div>
  );
}
