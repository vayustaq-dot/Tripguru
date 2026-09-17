import CollectionEditor from "@/components/admin/CollectionEditor";
import ObjectEditor from "@/components/admin/ObjectEditor";
import PageHeader from "@/components/admin/PageHeader";
import { stateGroupSchema } from "@/lib/admin-schema";
import { destinationsPageSchema } from "@/lib/page-schemas";
import { getDestinations } from "@/lib/content";
import {
  saveDestinations,
  saveSection,
} from "@/app/admin/content-actions";

export default async function AdminDestinations() {
  const { stateGroups, page } = await getDestinations();
  const total = stateGroups.reduce((n, g) => n + g.destinations.length, 0);

  return (
    <>
      <PageHeader
        title="Temple destinations"
        description={`${total} destinations across ${stateGroups.length} states. Open a state to edit the destinations inside it.`}
      />

      <CollectionEditor
        initialItems={stateGroups as unknown as Record<string, unknown>[]}
        schema={stateGroupSchema}
        save={saveDestinations}
        addLabel="Add state"
        emptyMessage="No states yet."
      />
      <section className="mt-14">
        <h2 className="font-heading text-2xl text-foreground mb-1">Page copy</h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">Hero, stats band, search labels and the custom-packages banner.</p>
        <ObjectEditor
          initialValue={page as unknown as Record<string, unknown>}
          fields={destinationsPageSchema}
          save={saveSection.bind(null, "destinations", "page")}
        />
      </section>

    </>
  );
}
