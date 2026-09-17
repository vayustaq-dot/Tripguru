import CollectionEditor from "@/components/admin/CollectionEditor";
import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import StringListEditor from "@/components/admin/StringListEditor";
import { charDhamPackageSchema } from "@/lib/admin-schema";
import { charDhamPageSchema } from "@/lib/page-schemas";
import { getCharDham } from "@/lib/content";
import {
  saveCharDhamLists,
  saveCharDhamPackages,
  saveSection,
} from "@/app/admin/content-actions";

export default async function AdminCharDham() {
  const { packages, included, notIncluded, page } = await getCharDham();

  async function saveIncluded(json: string) {
    "use server";
    return saveCharDhamLists(JSON.stringify({ included: JSON.parse(json), notIncluded }));
  }
  async function saveNotIncluded(json: string) {
    "use server";
    return saveCharDhamLists(JSON.stringify({ included, notIncluded: JSON.parse(json) }));
  }

  return (
    <>
      <PageHeader
        title="Char Dham packages"
        description="Packages shown on the Char Dham page. Drag order with the arrows — the first one appears at the top."
      />

      <CollectionEditor
        initialItems={packages as unknown as Record<string, unknown>[]}
        schema={charDhamPackageSchema}
        save={saveCharDhamPackages}
        addLabel="Add package"
        emptyMessage="No packages yet. Add your first one."
      />

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-card border border-border rounded-sm p-6">
          <h2 className="font-heading text-2xl text-foreground mb-1">Included</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Applies to every Char Dham package.
          </p>
          <StringListEditor initialItems={included} save={saveIncluded} addLabel="Add inclusion" />
        </section>

        <section className="bg-card border border-border rounded-sm p-6">
          <h2 className="font-heading text-2xl text-foreground mb-1">Not included</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Set expectations up front to avoid booking disputes.
          </p>
          <StringListEditor
            initialItems={notIncluded}
            save={saveNotIncluded}
            addLabel="Add exclusion"
          />
        </section>
      </div>
      <section className="mt-14">
        <h2 className="font-heading text-2xl text-foreground mb-1">Page copy</h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">Hero, info bar, section headings and the bottom banner on the Char Dham page.</p>
        <ObjectEditor
          initialValue={page as unknown as Record<string, unknown>}
          fields={charDhamPageSchema}
          save={saveSection.bind(null, "char-dham", "page")}
        />
      </section>

    </>
  );
}
