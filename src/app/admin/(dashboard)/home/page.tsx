import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import { saveSection } from "@/app/admin/content-actions";
import { getHome } from "@/lib/content";
import { homeSchema } from "@/lib/page-schemas";

export default async function AdminHome() {
  const home = await getHome();
  return (
    <>
      <PageHeader
        title="Home page"
        description="Every word on the homepage — hero, trust badges, cards, testimonials and the enquiry section."
      />
      <ObjectEditor
        initialValue={home as unknown as Record<string, unknown>}
        fields={homeSchema}
        save={saveSection.bind(null, "home", "")}
      />
    </>
  );
}
