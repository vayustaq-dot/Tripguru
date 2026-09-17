import type { Metadata } from "next";
import { CircleCheckBig } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import PackageCard from "@/components/PackageCard";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getCharDham, getLabels, getSite } from "@/lib/content";
import { iconFor } from "@/lib/icons";

/** Statically rendered; admin saves call revalidatePath, this is the safety net. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCharDham();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function CharDhamPage() {
  const [{ packages, included, notIncluded, page }, site, labels] = await Promise.all([
    getCharDham(),
    getSite(),
    getLabels(),
  ]);

  return (
    <>
      <PageHero
        className="h-[60vh] min-h-[420px]"
        image={page.hero.image}
        alt={page.hero.imageAlt}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
      />

      <section className="bg-primary text-primary-foreground py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-5 text-sm font-medium">
            {page.infoBand.map((item) => {
              const Icon = iconFor(item.icon);
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <Icon size={16} className="opacity-80" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {page.packagesSection.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground">
              {page.packagesSection.heading}
            </Reveal>
            <Reveal as="p" delay={120} className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              {page.packagesSection.body}
            </Reveal>
          </div>

          <div className="space-y-14">
            {packages.map((pkg) => (
              <Reveal key={pkg.title}>
                <PackageCard pkg={pkg} site={site} labels={labels.packageCard} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {page.inclusions.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground">
              {page.inclusions.heading}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Reveal className="bg-card border border-border rounded-sm p-7">
              <h3 className="font-heading text-2xl text-foreground mb-5">{page.inclusions.includedHeading}</h3>
              <ul className="space-y-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CircleCheckBig size={15} className="text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} className="bg-card border border-border rounded-sm p-7">
              <h3 className="font-heading text-2xl text-foreground mb-5">{page.inclusions.notIncludedHeading}</h3>
              <ul className="space-y-2.5">
                {notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-3.5 h-3.5 rounded-full border border-muted-foreground/40 mt-0.5 shrink-0 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={page.cta.eyebrow}
        title={page.cta.heading}
        body={page.cta.body}
        whatsappText={page.cta.whatsappText}
        site={site}
      />
    </>
  );
}
