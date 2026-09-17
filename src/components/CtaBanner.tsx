import { MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { SiteSettings } from "@/lib/content";

export default function CtaBanner({
  eyebrow = "Ready to Begin?",
  title,
  body,
  whatsappText,
  site,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  whatsappText: string;
  site: SiteSettings;
}) {
  const href = `${site.whatsappHref}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center">
        <Reveal as="p" className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-3">
          {eyebrow}
        </Reveal>
        <Reveal as="h2" delay={80} className="font-heading text-3xl md:text-4xl text-white mb-4">
          {title}
        </Reveal>
        <Reveal as="p" delay={120} className="text-white/60 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          {body}
        </Reveal>
        <Reveal delay={160} className="flex flex-wrap justify-center gap-4">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors"
          >
            <MessageCircle size={16} /> WhatsApp Enquiry
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-semibold text-sm rounded-sm hover:bg-white/10 transition-colors"
          >
            <Phone size={16} /> {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
