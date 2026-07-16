import { SuperAdminModulePage } from "@/components/superadmin-pages";

export default async function SuperAdminRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <SuperAdminModulePage segments={slug} />;
}
