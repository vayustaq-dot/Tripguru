import type { Metadata } from "next";
import Image from "next/image";
import { CircleAlert, CircleCheck, MessageCircle, Phone } from "lucide-react";
import HeliPackageCard from "@/components/HeliPackageCard";
import Reveal from "@/components/Reveal";
import { getHelicopter, getLabels, getSite } from "@/lib/content";
import { iconFor } from "@/lib/icons";

/** Statically rendered; admin saves call revalidatePath, this is the safety net. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getHelicopter();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function HelicopterPage() {
  const [{ packages, notes, page }, site, labels] = await Promise.all([
    getHelicopter(),
    getSite(),
    getLabels(),
  ]);
  const ctaHref = `${site.whatsappHref}?text=${encodeURIComponent(page.cta.whatsappText)}`;

  return (
    <>
      <section className="relative h-[65vh] min-h-[460px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={page.hero.image} alt={page.hero.imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-gray-900/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-14">
          <div className="max-w-2xl">
            <Reveal as="p" className="text-accent font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {page.hero.eyebrow}
            </Reveal>
            <Reveal as="h1" delay={80} className="font-heading text-5xl md:text-6xl text-white leading-tight mb-4">
              {page.hero.title}
            </Reveal>
            <Reveal as="p" delay={140} className="text-white/75 text-lg leading-relaxed mb-6 max-w-xl">
              {page.hero.body}
            </Reveal>
            <Reveal delay={200} className="flex flex-wrap gap-5 text-white/80 text-sm">
              {page.hero.points.map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <CircleCheck size={15} className="text-accent" /> {p}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {page.benefits.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl text-foreground">
              {page.benefits.heading}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {page.benefits.items.map((b, i) => {
              const Icon = iconFor(b.icon);
              return (
                <Reveal key={b.title} delay={70 * i} className="bg-card border border-border rounded-sm p-6 text-center">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {page.packagesSection.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground">
              {page.packagesSection.heading}
            </Reveal>
            <Reveal as="p" delay={120} className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              {page.packagesSection.body}
            </Reveal>
          </div>
          <div className="space-y-10">
            {packages.map((pkg) => (
              <Reveal key={pkg.title}>
                <HeliPackageCard pkg={pkg} site={site} labels={labels.heliCard} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Reveal className="flex items-center gap-3 mb-6">
              <CircleAlert size={28} className="text-primary shrink-0" />
              <div>
                <p className="text-primary font-medium tracking-[0.2em] uppercase text-xs">
                  {page.notesSection.eyebrow}
                </p>
                <h2 className="font-heading text-3xl text-foreground">{page.notesSection.heading}</h2>
              </div>
            </Reveal>
            <Reveal as="ul" delay={80} className="space-y-3">
              {notes.map((note, i) => (
                <li
                  key={note}
                  className="flex items-start gap-3 text-sm text-muted-foreground bg-card border border-border rounded-sm p-4"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold mt-0.5">
                    {i + 1}
                  </span>
                  {note}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <Reveal as="h2" className="font-heading text-3xl md:text-4xl text-primary-foreground mb-3">
            {page.cta.heading}
          </Reveal>
          <Reveal as="p" delay={80} className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            {page.cta.body}
          </Reveal>
          <Reveal delay={140} className="flex flex-wrap justify-center gap-4">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-semibold text-sm rounded-sm hover:bg-white/90 transition-colors"
            >
              <Phone size={16} /> {site.phone}
            </a>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold text-sm rounded-sm hover:bg-white/10 transition-colors"
            >
              <MessageCircle size={16} /> {page.cta.whatsappLabel}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
