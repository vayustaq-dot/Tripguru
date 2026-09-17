import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { getCharDham, getHelicopter, getHome, getLabels, getSite } from "@/lib/content";
import { iconFor } from "@/lib/icons";

/** Statically rendered; admin saves call revalidatePath, this is the safety net. */
export const revalidate = 60;

export default async function Home() {
  const [site, home, charDham, helicopter, labels] = await Promise.all([
    getSite(),
    getHome(),
    getCharDham(),
    getHelicopter(),
    getLabels(),
  ]);

  const { hero, trustBadges, paths, whyUs, featured, testimonials, cta } = home;

  /** A featured card can point at a real package so its price never drifts. */
  const priceOf = (item: (typeof featured.items)[number]) => {
    if (!item.ref) return item.price;
    const pool = item.source === "helicopter" ? helicopter.packages : charDham.packages;
    return pool.find((p) => p.title === item.ref)?.price ?? item.price;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-gray-900/20" />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <Reveal as="p" className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">
              {hero.eyebrow}
            </Reveal>
            <Reveal as="h1" delay={80} className="font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              {hero.titleTop}
              <span className="block text-accent">{hero.titleAccent}</span>
            </Reveal>
            <Reveal as="p" delay={160} className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              {hero.body}
            </Reveal>
            <Reveal delay={240} className="flex flex-wrap gap-4">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-colors text-sm tracking-wide"
              >
                {hero.primaryCta.label} <ChevronRight size={16} />
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/70 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors text-sm tracking-wide"
              >
                {hero.secondaryCta.label}
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-white/90 text-sm">
              {trustBadges.map((badge) => {
                const Icon = iconFor(badge.icon);
                return (
                  <div key={badge.label} className="flex items-center gap-2">
                    <Icon size={16} className="text-accent" />
                    <span className="font-medium tracking-wide">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Sacred Path */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {paths.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground">
              {paths.heading}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal className="md:row-span-2">
              <Link href={paths.primary.href} className="group relative block h-80 md:h-full min-h-[420px] overflow-hidden rounded-sm">
                <Image
                  src={paths.primary.image}
                  alt={paths.primary.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  {paths.primary.eyebrow && (
                    <p className="text-accent text-xs font-medium tracking-widest uppercase mb-2">
                      {paths.primary.eyebrow}
                    </p>
                  )}
                  <h3 className="font-heading text-3xl text-white mb-2">{paths.primary.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{paths.primary.body}</p>
                  <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                    {paths.linkLabel} <ChevronRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>

            {paths.cards.map((card, i) => (
              <Reveal key={card.href + card.title} delay={80 * (i + 1)}>
                <Link href={card.href} className="group relative block h-56 overflow-hidden rounded-sm">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl text-white mb-1">{card.title}</h3>
                    <p className="text-white/70 text-xs leading-relaxed mb-3">{card.body}</p>
                    <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                      {paths.linkLabel} <ChevronRight size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
                {whyUs.eyebrow}
              </Reveal>
              <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                {whyUs.heading}
              </Reveal>
              <Reveal as="p" delay={160} className="text-muted-foreground leading-relaxed mb-10">
                {whyUs.body}
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyUs.features.map((f, i) => {
                  const Icon = iconFor(f.icon);
                  return (
                    <Reveal key={f.title} delay={80 * i} className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{f.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
            <Reveal axis="x" className="relative">
              <Image
                src={whyUs.image}
                alt={whyUs.imageAlt}
                width={800}
                height={480}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-[480px] object-cover rounded-sm"
              />
              <div className="absolute -bottom-5 -left-5 bg-card border border-border rounded-sm p-5 shadow-lg">
                <p className="font-heading text-3xl text-primary font-bold">{whyUs.statValue}</p>
                <p className="text-muted-foreground text-sm mt-0.5">{whyUs.statLabel}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured packages */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {featured.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground">
              {featured.heading}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.items.map((pkg, i) => (
              <Reveal
                key={pkg.title}
                delay={80 * i}
                className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {pkg.badge && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-sm z-10">
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl text-foreground mb-1">{pkg.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{pkg.duration}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{featured.priceLabel}</p>
                      <p className="text-primary font-bold text-lg">
                        {priceOf(pkg)}
                        <span className="text-xs font-normal text-muted-foreground">{featured.priceNote}</span>
                      </p>
                    </div>
                    <Link
                      href={featured.itemCtaHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-sm hover:bg-primary/90 transition-colors"
                    >
                      {featured.itemCtaLabel} <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={featured.ctaHref}
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-primary text-primary font-semibold text-sm rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {featured.ctaLabel} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
              {testimonials.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className="font-heading text-4xl md:text-5xl text-foreground">
              {testimonials.heading}
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.items.map((t, i) => (
              <Reveal key={t.name} delay={80 * i} className="bg-card border border-border rounded-sm p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-primary text-xs mt-0.5">{t.trip}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + enquiry */}
      <section className="py-0 bg-background overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="relative h-72 lg:h-auto">
            <Image src={cta.image} alt={cta.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent" />
            <div className="absolute inset-0 flex items-end p-10">
              <div>
                <p className="text-accent text-xs font-medium tracking-widest uppercase mb-2">{cta.eyebrow}</p>
                <p className="font-heading text-3xl text-white leading-snug">
                  {cta.lineOne}
                  <br />
                  {cta.lineTwo}
                </p>
              </div>
            </div>
          </div>
          <Reveal axis="x" className="bg-foreground px-8 py-14 lg:px-14 flex flex-col justify-center">
            <p className="text-accent text-xs font-medium tracking-widest uppercase mb-3">{cta.formEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-2">{cta.formHeading}</h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">{cta.formBody}</p>
            <EnquiryForm labels={labels.homeForm} />
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-5">
              <a href={site.phoneHref} className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm">
                <Phone size={16} className="text-accent" />
                {site.phone}
              </a>
              <a href={site.whatsappHref} className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm">
                <MessageCircle size={16} className="text-accent" />
                WhatsApp
              </a>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={16} className="text-accent" />
                {cta.locationLabel}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
