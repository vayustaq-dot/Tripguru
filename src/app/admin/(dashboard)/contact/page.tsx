import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import { saveSection } from "@/app/admin/content-actions";
import { getContact } from "@/lib/content";
import { contactSchema } from "@/lib/page-schemas";

export default async function AdminContactPage() {
  const contact = await getContact();
  return (
    <>
      <PageHeader
        title="Contact page"
        description="Headings, office hours and the contact cards. Phone, email and address come from Site settings."
      />
      <ObjectEditor
        initialValue={contact as unknown as Record<string, unknown>}
        fields={contactSchema}
        save={saveSection.bind(null, "contact", "")}
      />
    </>
  );
}
