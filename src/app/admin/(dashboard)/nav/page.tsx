import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import { saveSection } from "@/app/admin/content-actions";
import { getFooter, getNav } from "@/lib/content";
import { footerSchema, navSchema } from "@/lib/page-schemas";

export default async function AdminNav() {
  const [nav, footer] = await Promise.all([getNav(), getFooter()]);
  return (
    <>
      <PageHeader
        title="Menu & footer"
        description="The top navigation and everything in the footer, including both link columns."
      />

      <section className="mb-14">
        <h2 className="font-heading text-2xl text-foreground mb-4">Top menu</h2>
        <ObjectEditor
          initialValue={nav as unknown as Record<string, unknown>}
          fields={navSchema}
          save={saveSection.bind(null, "nav", "")}
        />
      </section>

      <section>
        <h2 className="font-heading text-2xl text-foreground mb-4">Footer</h2>
        <ObjectEditor
          initialValue={footer as unknown as Record<string, unknown>}
          fields={footerSchema}
          save={saveSection.bind(null, "footer", "")}
        />
      </section>
    </>
  );
}
