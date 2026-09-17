import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import { saveSection } from "@/app/admin/content-actions";
import { getLabels } from "@/lib/content";
import { labelsSchema } from "@/lib/page-schemas";

export default async function AdminLabels() {
  const labels = await getLabels();
  return (
    <>
      <PageHeader
        title="Buttons & form labels"
        description="Reusable interface text — button labels, form fields, placeholders and the pre-filled WhatsApp messages."
      />
      <ObjectEditor
        initialValue={labels as unknown as Record<string, unknown>}
        fields={labelsSchema}
        save={saveSection.bind(null, "labels", "")}
      />
    </>
  );
}
