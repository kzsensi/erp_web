import { TeacherModulePage } from "@/components/teacher-pages";

export default async function TeacherRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <TeacherModulePage segments={slug} />;
}
