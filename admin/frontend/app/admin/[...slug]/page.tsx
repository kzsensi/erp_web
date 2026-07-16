import { AdminModulePage } from "@/components/module-page";

export default async function ModuleRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <AdminModulePage segments={slug} />;
}
