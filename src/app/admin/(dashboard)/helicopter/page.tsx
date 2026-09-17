import CollectionEditor from "@/components/admin/CollectionEditor";
import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import StringListEditor from "@/components/admin/StringListEditor";
import { helicopterPackageSchema } from "@/lib/admin-schema";
import { helicopterPageSchema } from "@/lib/page-schemas";
import { getHelicopter } from "@/lib/content";
import {
  saveHelicopterNotes,
  saveHelicopterPackages,
  saveSection,
} from "@/app/admin/content-actions";

export default async function AdminHelicopter() {
  const { packages, notes, page } = await getHelicopter();

  return (
    <>
      <PageHeader
        title="Helicopter packages"
        description="Packages and the numbered booking notes shown under “Important Information”."
      />

      <CollectionEditor
        initialItems={packages as unknown as Record<string, unknown>[]}
        schema={helicopterPackageSchema}
        save={saveHelicopterPackages}
        addLabel="Add package"
        emptyMessage="No helicopter packages yet."
      />

      <section className="mt-14 bg-card border border-border rounded-sm p-6 max-w-3xl">
        <h2 className="font-heading text-2xl text-foreground mb-1">Important information</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Weather, weight limits, season and medical notes. Numbered automatically.
        </p>
        <StringListEditor
          initialItems={notes}
          save={saveHelicopterNotes}
          addLabel="Add note"
          multiline
        />
      </section>
      <section className="mt-14">
        <h2 className="font-heading text-2xl text-foreground mb-1">Page copy</h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">Hero, benefit cards, section headings and the bottom banner.</p>
        <ObjectEditor
          initialValue={page as unknown as Record<string, unknown>}
          fields={helicopterPageSchema}
          save={saveSection.bind(null, "helicopter", "page")}
        />
      </section>

    </>
  );
}
