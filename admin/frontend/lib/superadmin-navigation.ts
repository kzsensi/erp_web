import type { MarkKind } from "@/components/module-mark";

export type SuperAdminNavGroup = {
  label: string;
  href: string;
  mark: MarkKind;
  match: string[];
};

export const superAdminNavigation: SuperAdminNavGroup[] = [
  { label: "Dashboard", href: "/superadmin/dashboard", mark: "dashboard", match: ["/superadmin/dashboard"] },
  { label: "Schools", href: "/superadmin/schools", mark: "students", match: ["/superadmin/schools"] },
  { label: "Add school", href: "/superadmin/schools/add-school", mark: "students", match: ["/superadmin/schools/add-school"] },
  { label: "Subscriptions", href: "/superadmin/subscriptions", mark: "fees", match: ["/superadmin/subscriptions"] },
  { label: "Platform users", href: "/superadmin/platform-users", mark: "staff", match: ["/superadmin/platform-users"] },
  { label: "Support", href: "/superadmin/support", mark: "communication", match: ["/superadmin/support"] },
  { label: "Security", href: "/superadmin/security", mark: "settings", match: ["/superadmin/security"] },
  { label: "System health", href: "/superadmin/system", mark: "dashboard", match: ["/superadmin/system"] },
  { label: "Audit logs", href: "/superadmin/audit-logs", mark: "attendance", match: ["/superadmin/audit-logs"] },
  { label: "Templates", href: "/superadmin/templates", mark: "communication", match: ["/superadmin/templates"] },
];

export const superAdminUtilityNavigation: SuperAdminNavGroup[] = [
  { label: "Settings", href: "/superadmin/settings", mark: "settings", match: ["/superadmin/settings"] },
];

export const superAdminConfig = {
  companyName: "Samvarg Solutions ERP",
  shortName: "Samvarg ERP",
  workspace: "Platform control",
  operatorName: "Krishna Verma",
  operatorInitials: "KV",
  role: "Super administrator",
};

export function superAdminTitleFromSlug(value: string) {
  return value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
