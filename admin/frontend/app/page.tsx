"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, Users, GraduationCap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="landing-container">
      <div className="landing-card">
        {/* Logo Section */}
        <div className="logo-section">
          <Image
            src="/samvargsolutions_logo.png"
            alt="Samvarg Solutions Logo"
            width={180}
            height={60}
            priority
            className="logo-img"
          />
        </div>

        {/* Header Section */}
        <header className="header-section">
          <span className="eyebrow">workspace selection</span>
          <h1 className="main-title">SAMVARG SOLUTIONS</h1>
          <p className="sub-title">School ERP and Management System</p>
        </header>

        {/* Profile Selector Grid */}
        <div className="profiles-grid">
          {/* Admin Card */}
          <Link href="/admin/dashboard" className="profile-card admin-card">
            <div className="icon-wrapper admin-icon">
              <Shield size={28} />
            </div>
            <h3>Admin Portal</h3>
            <p>
              Manage student admissions, staff registers, timetable uploads, holidays, and school-wide fee structures.
            </p>
            <span className="action-link">
              Enter Workspace <ArrowRight size={14} />
            </span>
          </Link>

          {/* Parent Card */}
          <Link href="/family/dashboard" className="profile-card parent-card">
            <div className="icon-wrapper parent-icon">
              <Users size={28} />
            </div>
            <h3>Parent & Student Portal</h3>
            <p>
              Track daily attendance, view exam grades, check homework, pay dues online, and read school announcements.
            </p>
            <span className="action-link">
              Enter Portal <ArrowRight size={14} />
            </span>
          </Link>

          {/* Teacher Card */}
          <Link href="/teacher/dashboard" className="profile-card teacher-card">
            <div className="icon-wrapper teacher-icon">
              <GraduationCap size={28} />
            </div>
            <h3>Teacher Portal</h3>
            <p>
              Log student attendance, record test marks, coordinate classroom timetables, and message family guardians.
            </p>
            <span className="action-link">
              Enter Workspace <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* Footer info */}
        <footer className="landing-footer">
          <div className="status-indicator">
            <span className="status-dot"></span>
            All systems online & secure
          </div>
          <p>© {new Date().getFullYear()} Samvarg Solutions. All rights reserved.</p>
        </footer>
      </div>

      {/* Styled Raw CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .landing-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 80% 20%, #eaf2f7, transparent 40%),
                      radial-gradient(circle at 20% 80%, #e9f4ef, transparent 40%),
                      #f5f7f8;
          padding: 40px 20px;
          box-sizing: border-box;
        }
        .landing-card {
          width: 100%;
          max-width: 1040px;
          background: #ffffff;
          border: 1px solid #e1e7eb;
          border-radius: 20px;
          box-shadow: 0 1px 3px rgba(20, 41, 55, 0.02),
                      0 12px 36px rgba(20, 41, 55, 0.04);
          padding: 56px 48px;
          box-sizing: border-box;
          text-align: center;
        }
        .logo-section {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }
        .logo-img {
          object-fit: contain;
          max-height: 60px;
          width: auto;
        }
        .header-section {
          margin-bottom: 40px;
        }
        .eyebrow {
          display: block;
          font-size: 10px;
          font-weight: 750;
          color: #356c8c;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 8px;
        }
        .main-title {
          font-size: 28px;
          font-weight: 800;
          color: #141d30;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }
        .sub-title {
          font-size: 14px;
          color: #667580;
          margin: 0;
        }
        .profiles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }
        .profile-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 36px 24px 32px;
          background: #ffffff;
          border: 1px solid #e1e7eb;
          border-radius: 16px;
          text-decoration: none;
          color: #17232d;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(20, 41, 55, 0.01);
        }
        .profile-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: transparent;
          transition: background-color 0.2s ease;
        }
        .profile-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(20, 41, 55, 0.05),
                      0 2px 4px rgba(20, 41, 55, 0.02);
        }
        .admin-card::after {
          background: #141d30;
        }
        .admin-card:hover {
          border-color: #141d30;
        }
        .parent-card::after {
          background: #356c8c;
        }
        .parent-card:hover {
          border-color: #356c8c;
        }
        .teacher-card::after {
          background: #267659;
        }
        .teacher-card:hover {
          border-color: #267659;
        }
        .icon-wrapper {
          width: 58px;
          height: 58px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: transform 0.2s ease;
        }
        .profile-card:hover .icon-wrapper {
          transform: scale(1.05);
        }
        .admin-icon {
          background: #eaf1f5;
          color: #141d30;
        }
        .parent-icon {
          background: #eaf2f7;
          color: #356c8c;
        }
        .teacher-icon {
          background: #e9f4ef;
          color: #267659;
        }
        .profile-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 10px;
          color: #141d30;
        }
        .profile-card p {
          font-size: 12px;
          color: #667580;
          line-height: 1.6;
          margin: 0 0 24px;
          flex-grow: 1;
        }
        .action-link {
          font-size: 12px;
          font-weight: 650;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .admin-card .action-link {
          color: #141d30;
          background: #eaf1f5;
        }
        .admin-card:hover .action-link {
          color: #ffffff;
          background: #141d30;
        }
        .parent-card .action-link {
          color: #356c8c;
          background: #eaf2f7;
        }
        .parent-card:hover .action-link {
          color: #ffffff;
          background: #356c8c;
        }
        .teacher-card .action-link {
          color: #267659;
          background: #e9f4ef;
        }
        .teacher-card:hover .action-link {
          color: #ffffff;
          background: #267659;
        }
        .landing-footer {
          border-top: 1px solid #e1e7eb;
          padding-top: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #667580;
          font-weight: 500;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          background-color: #267659;
          border-radius: 50%;
          box-shadow: 0 0 0 3px #e9f4ef;
        }
        .landing-footer p {
          font-size: 10px;
          color: #89959e;
          margin: 0;
        }
        @media (max-width: 900px) {
          .profiles-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .landing-card {
            padding: 40px 24px;
          }
        }
      ` }} />
    </div>
  );
}
