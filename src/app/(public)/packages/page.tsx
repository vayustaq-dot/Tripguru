import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, MessageCircle, Phone, Users } from "lucide-react";
import DestinationDirectory from "@/components/DestinationDirectory";
import Reveal from "@/components/Reveal";
import { getDestinations, getLabels, getSite } from "@/lib/content";

/** Statically rendered; admin saves call revalidatePath, this is the safety net. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getDestinations();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function PackagesPage() {
  const [{ stateGroups, page }, site, labels] = await Promise.all([
    getDestinations(),
    getSite(),
    getLabels(),
  ]);

  const totalDestinations = stateGroups.reduce((n, s) => n + s.destinations.length, 0);

  /** Stats marked `auto` stay in sync with the destination list automatically. */
  const stats = page.stats.map((s) => ({
    label: s.label,
    value:
      s.auto === "destinations"
        ? `${totalDestinations}+`
        : s.auto === "states"
          ? `${stateGroups.length}`
          : s.value,
  }));

  return (
    <>
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={page.hero.image} alt={page.hero.imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/92 via-gray-900/45 to-gray-900/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-14">
          <div className="max-w-2xl">
            <Reveal as="p" className="text-accent font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {page.hero.eyebrow}
            </Reveal>
            <Reveal as="h1" delay={80} className="font-heading text-5xl md:text-6xl text-white leading-tight mb-4">
              {page.hero.title}
            </Reveal>
            <Reveal as="p" delay={140} className="text-white/75 text-lg leading-relaxed max-w-xl mb-6">
              {page.hero.body}
            </Reveal>
            <Reveal delay={200} className="flex flex-wrap gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-accent" />
                {totalDestinations}
                {page.hero.destinationsSuffix}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-accent" />
                {stateGroups.length}
                {page.hero.statesSuffix}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={15} className="text-accent" />
                {page.hero.groupToursLabel}
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      <DestinationDirectory
        stateGroups={stateGroups}
        site={site}
        search={page.search}
        labels={labels.destinationCard}
      />

      <section className="py-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-3xl md:text-4xl">{s.value}</p>
                <p className="text-primary-foreground/70 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
            {page.customCta.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={80} className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            {page.customCta.heading}
          </Reveal>
          <Reveal as="p" delay={120} className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            {page.customCta.body}
          </Reveal>
          <Reveal delay={160} className="flex flex-wrap justify-center gap-4">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors"
            >
              <Phone size={16} /> {page.customCta.callPrefix}
              {site.phone}
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-primary text-primary font-semibold text-sm rounded-sm hover:bg-primary/5 transition-colors"
            >
              <MessageCircle size={16} /> {page.customCta.whatsappLabel}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
