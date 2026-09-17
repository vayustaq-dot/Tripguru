import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import { saveSection } from "@/app/admin/content-actions";
import { getAbout } from "@/lib/content";
import { aboutSchema } from "@/lib/page-schemas";

export default async function AdminAbout() {
  const about = await getAbout();
  return (
    <>
      <PageHeader
        title="About page"
        description="Your story, stats, core values and team. Address and phone come from Site settings."
      />
      <ObjectEditor
        initialValue={about as unknown as Record<string, unknown>}
        fields={aboutSchema}
        save={saveSection.bind(null, "about", "")}
      />
    </>
  );
}
