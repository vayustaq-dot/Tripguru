import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CircleCheck, MapPin, MessageCircle, Phone, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getAbout, getSite } from "@/lib/content";
import { iconFor } from "@/lib/icons";

/** Statically rendered; admin saves call revalidatePath, this is the safety net. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getAbout();
  return { title: meta.title, description: meta.description };
}

export default async function AboutPage() {
  const [site, about] = await Promise.all([getSite(), getAbout()]);
  const { hero, stats, story, values, team, office, ctaCard } = about;

  return (
    <>
      <PageHero
        image={hero.image}
        alt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      {/* Stats band */}
      <section className="bg-primary text-primary-foreground py-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/20">
            {stats.map((s, i) => {
              const Icon = iconFor(s.icon);
              return (
                <Reveal key={s.label} delay={80 * i} className="py-10 px-6 text-center">
                  <Icon size={24} className="mx-auto mb-3 opacity-70" />
                  <p className="font-heading text-3xl md:text-4xl mb-1">{s.value}</p>
                  <p className="text-primary-foreground/70 text-sm">{s.label}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal axis="x" className="relative">
              <Image
                src={story.image}
                alt={story.imageAlt}
                width={800}
                height={480}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-[480px] object-cover rounded-sm"
              />
              <div className="absolute -bottom-5 -right-5 bg-primary text-primary-foreground rounded-sm p-6 shadow-xl">
                <p className="font-heading text-4xl font-bold">{story.badgeValue}</p>
                <p className="text-primary-foreground/80 text-sm mt-0.5">{story.badgeLabel}</p>
              </div>
            </Reveal>
            <div>
              <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
                {story.eyebrow}
              </Reveal>
              <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                {story.headingLineOne}
                <br />
                {story.headingLineTwo}
              </Reveal>
              <Reveal as="p" delay={120} className="text-muted-foreground leading-relaxed mb-5">
                {story.paraOne}
              </Reveal>
              <Reveal as="p" delay={160} className="text-muted-foreground leading-relaxed mb-5">
                {story.paraTwo}
              </Reveal>
              <Reveal as="p" delay={200} className="text-muted-foreground leading-relaxed mb-8">
                {story.paraThreeBefore}
                <a
                  href={site.sisterFirm.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  {site.sisterFirm.name}
                </a>
                {story.paraThreeAfter}
              </Reveal>
              <Reveal delay={240} className="space-y-3">
                {story.assurances.map((line) => (
                  <div key={line} className="flex items-start gap-3">
                    <CircleCheck size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground text-sm">{line}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {values.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground">
              {values.heading}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.items.map((v, i) => {
              const Icon = iconFor(v.icon);
              return (
                <Reveal
                  key={v.title}
                  delay={80 * i}
                  className="bg-card border border-border rounded-sm p-7 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {team.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground">
              {team.heading}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.members.map((member, i) => (
              <Reveal
                key={member.name}
                delay={80 * i}
                className="bg-card border border-border rounded-sm p-7 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users size={26} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-xs font-medium mb-4 tracking-wide">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office + CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
                {office.eyebrow}
              </Reveal>
              <Reveal as="h2" delay={80} className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                {office.heading}
              </Reveal>
              <Reveal delay={120} className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-0.5">{office.addressLabel}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                      {site.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-0.5">{office.phoneLabel}</p>
                    <a href={site.phoneHref} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {site.phone}
                    </a>
                    <br />
                    <a href={site.whatsappHref} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                      {office.whatsappPrefix}
                      {site.whatsapp}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-0.5">{office.emailLabel}</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors block"
                    >
                      {site.email}
                    </a>
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {office.whatsappPrefix}
                      {site.whatsapp}
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={160} className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">{office.sisterLabel}</p>
                <a
                  href={site.sisterFirm.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  {site.sisterFirm.name} &rarr;
                </a>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {site.sisterFirm.href.replace(/^https?:\/\//, "")}
                </p>
              </Reveal>
            </div>

            <Reveal className="bg-foreground rounded-sm p-8 text-white">
              <p className="text-accent text-xs font-medium tracking-widest uppercase mb-3">{ctaCard.eyebrow}</p>
              <h3 className="font-heading text-3xl text-white mb-3">{ctaCard.heading}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">{ctaCard.body}</p>
              <div className="space-y-3">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors"
                >
                  <MessageCircle size={16} /> {ctaCard.whatsappLabel}
                </a>
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 text-white font-semibold text-sm rounded-sm hover:bg-white/10 transition-colors"
                >
                  <Phone size={16} /> {ctaCard.callPrefix}
                  {site.phone}
                </a>
                <Link
                  href={ctaCard.enquiryHref}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 text-white font-semibold text-sm rounded-sm hover:bg-white/10 transition-colors"
                >
                  {ctaCard.enquiryLabel}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
