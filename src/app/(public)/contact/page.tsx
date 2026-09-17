import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { getContact, getLabels, getSite, type ContactCard, type SiteSettings } from "@/lib/content";
import { iconFor } from "@/lib/icons";

/** Statically rendered; admin saves call revalidatePath, this is the safety net. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContact();
  return { title: meta.title, description: meta.description };
}

/** Each contact card pulls its value from site settings, so there is one source of truth. */
function cardValue(card: ContactCard, site: SiteSettings) {
  if (card.kind === "phone") return { value: site.phone, href: site.phoneHref };
  if (card.kind === "whatsapp") return { value: site.whatsapp, href: site.whatsappHref };
  return { value: site.email, href: `mailto:${site.email}` };
}

export default async function ContactPage() {
  const [site, contact, labels] = await Promise.all([getSite(), getContact(), getLabels()]);
  const { hero, bar, form, details } = contact;

  const whatsappPrefilled = `${site.whatsappHref}?text=${encodeURIComponent(details.whatsappPrefill)}`;

  return (
    <>
      <section className="bg-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Reveal as="p" className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-3">
              {hero.eyebrow}
            </Reveal>
            <Reveal as="h1" delay={80} className="font-heading text-4xl md:text-6xl text-white mb-4">
              {hero.title}
            </Reveal>
            <Reveal as="p" delay={160} className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
              {hero.body}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-5 text-sm font-medium">
            <a href={site.phoneHref} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={16} /> {bar.callPrefix}
              {site.phone}
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <MessageCircle size={16} /> {bar.whatsappPrefix}
              {site.whatsapp}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail size={16} /> {site.email}
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <Reveal as="p" className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
                {form.eyebrow}
              </Reveal>
              <Reveal as="h2" delay={80} className="font-heading text-3xl md:text-4xl text-foreground mb-8">
                {form.heading}
              </Reveal>
              <Reveal delay={120}>
                <ContactForm labels={labels.contactForm} />
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                <Reveal>
                  <p className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">
                    {details.eyebrow}
                  </p>
                  <h2 className="font-heading text-3xl text-foreground mb-6">{details.heading}</h2>
                </Reveal>

                {details.cards.map((card, i) => {
                  const Icon = iconFor(card.icon);
                  const { value, href } = cardValue(card, site);
                  return (
                    <Reveal key={card.kicker} delay={60 * i} className="flex gap-4 p-5 bg-card border border-border rounded-sm">
                      <div className="shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{card.kicker}</p>
                        <a href={href} className="text-foreground font-semibold text-sm hover:text-primary transition-colors">
                          {value}
                        </a>
                        <p className="text-muted-foreground text-xs mt-0.5">{card.note}</p>
                      </div>
                    </Reveal>
                  );
                })}

                <Reveal delay={180} className="flex gap-4 p-5 bg-card border border-border rounded-sm">
                  <div className="shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                      {details.addressKicker}
                    </p>
                    <p className="text-foreground font-semibold text-sm whitespace-pre-line">{site.address}</p>
                  </div>
                </Reveal>

                <Reveal delay={240} className="flex gap-4 p-5 bg-card border border-border rounded-sm">
                  <div className="shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                      {details.hoursKicker}
                    </p>
                    <p className="text-foreground font-semibold text-sm">{details.hoursPrimary}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{details.hoursSecondary}</p>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <a
                    href={whatsappPrefilled}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-semibold text-sm rounded-sm hover:bg-[#1ebe5d] transition-colors"
                  >
                    <MessageCircle size={16} /> {details.whatsappCtaLabel}
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
