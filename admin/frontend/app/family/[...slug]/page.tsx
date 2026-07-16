import { FamilyModulePage } from "@/components/family-pages";

export default async function FamilyRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <FamilyModulePage segments={slug} />;
}
