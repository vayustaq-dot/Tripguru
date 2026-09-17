import CollectionEditor from "@/components/admin/CollectionEditor";
import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import { gradeSchema, trekSchema } from "@/lib/admin-schema";
import { treksPageSchema } from "@/lib/page-schemas";
import { getTreks } from "@/lib/content";
import {
  saveGrades,
  saveSection,
  saveTreks,
} from "@/app/admin/content-actions";

export default async function AdminTreks() {
  const { treks, grades, page } = await getTreks();

  return (
    <>
      <PageHeader
        title="Treks"
        description="Trekking packages, plus the difficulty grade guide shown at the bottom of the page."
      />

      <CollectionEditor
        initialItems={treks as unknown as Record<string, unknown>[]}
        schema={trekSchema}
        save={saveTreks}
        addLabel="Add trek"
        emptyMessage="No treks yet."
      />

      <div className="mt-14">
        <h2 className="font-heading text-2xl text-foreground mb-1">Difficulty grade guide</h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
          Each grade explains what a trekker should expect. Colour classes are Tailwind utilities.
        </p>
        <CollectionEditor
          initialItems={grades as unknown as Record<string, unknown>[]}
          schema={gradeSchema}
          save={saveGrades}
          addLabel="Add grade"
          emptyMessage="No grades yet."
        />
      </div>
      <section className="mt-14">
        <h2 className="font-heading text-2xl text-foreground mb-1">Page copy</h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">Hero, search labels, difficulty-guide heading and the bottom banner.</p>
        <ObjectEditor
          initialValue={page as unknown as Record<string, unknown>}
          fields={treksPageSchema}
          save={saveSection.bind(null, "treks", "page")}
        />
      </section>

    </>
  );
}
