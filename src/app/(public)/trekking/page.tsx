import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import TrekDirectory from "@/components/TrekDirectory";
import { getLabels, getSite, getTreks } from "@/lib/content";
import { iconFor } from "@/lib/icons";

/** Statically rendered; admin saves call revalidatePath, this is the safety net. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getTreks();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function TrekkingPage() {
  const [{ treks, grades, stats: trekStats, page }, site, labels] = await Promise.all([
    getTreks(),
    getSite(),
    getLabels(),
  ]);

  return (
    <>
      <section className="relative h-[58vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={page.hero.image} alt={page.hero.imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-gray-900/10 pointer-events-none" />
        </div>
        <div className="relative container mx-auto px-4 pb-14">
          <div className="max-w-2xl">
            <Reveal as="p" className="text-accent font-medium tracking-[0.18em] uppercase text-xs mb-3">
              {page.hero.eyebrow}
            </Reveal>
            <Reveal as="h1" delay={80} className="font-heading text-5xl md:text-6xl text-white leading-tight mb-4">
              {page.hero.title}
            </Reveal>
            <Reveal as="p" delay={140} className="text-white/75 text-lg leading-relaxed max-w-xl mb-6">
              {page.hero.body}
            </Reveal>
            <Reveal delay={200} className="flex flex-wrap gap-6 text-white/70 text-sm">
              {page.hero.points.map((p) => {
                const Icon = iconFor(p.icon);
                return (
                  <span key={p.label} className="flex items-center gap-1.5">
                    <Icon size={15} className="text-accent" />
                    {p.label}
                  </span>
                );
              })}
            </Reveal>
          </div>
        </div>
      </section>

      <TrekDirectory treks={treks} site={site} search={page.search} labels={labels.trekCard} />

      <section className="py-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trekStats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-3xl md:text-4xl">{s.value}</p>
                <p className="text-primary-foreground/70 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Reveal as="p" className="text-primary font-medium tracking-[0.18em] uppercase text-xs mb-2">
              {page.gradesSection.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-3xl md:text-4xl text-foreground">
              {page.gradesSection.heading}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {grades.map((g, i) => (
              <Reveal
                key={g.label}
                delay={60 * i}
                className={`bg-card border-l-4 ${g.borderClass} border border-border rounded-sm p-5`}
              >
                <span className={`text-xs font-bold px-2.5 py-1 rounded-sm mb-3 inline-block ${g.badgeClasses}`}>
                  {g.label}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{g.description}</p>
                <p className="text-xs text-foreground/60 italic">e.g. {g.examples}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Reveal as="p" className="text-primary font-medium tracking-[0.18em] uppercase text-xs mb-3">
            {page.cta.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={80} className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            {page.cta.heading}
          </Reveal>
          <Reveal as="p" delay={120} className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            {page.cta.body}
          </Reveal>
          <Reveal delay={160} className="flex flex-wrap justify-center gap-4">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors"
            >
              <Phone size={16} /> {page.cta.callPrefix}
              {site.phone}
            </a>
            <a
              href={`${site.whatsappHref}?text=${encodeURIComponent(page.cta.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-primary text-primary font-semibold text-sm rounded-sm hover:bg-primary/5 transition-colors"
            >
              <MessageCircle size={16} /> {page.cta.whatsappLabel}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
