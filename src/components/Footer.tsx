import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import InstagramGlyph from "@/components/icons/InstagramGlyph";
import type { FooterContent, SiteSettings } from "@/lib/content";

export default function Footer({
  site,
  footer,
}: {
  site: SiteSettings;
  footer: FooterContent;
}) {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={site.logo}
                alt={site.name}
                width={160}
                height={40}
                className="h-10 w-auto object-contain shrink-0"
              />
            </Link>
            <p className="text-sm leading-relaxed text-background/60 mb-5">{footer.blurb}</p>
            <p className="text-xs italic text-accent/80 border-l-2 border-accent/40 pl-3">
              &ldquo;{footer.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on Instagram`}
                className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-background/50 hover:text-accent hover:border-accent transition-colors"
              >
                <InstagramGlyph size={16} />
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={footer.floating.whatsappTooltip}
                className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-background/50 hover:text-accent hover:border-accent transition-colors"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-background font-semibold text-sm uppercase tracking-widest mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-background font-semibold text-sm uppercase tracking-widest mb-5">
              {footer.contactHeading}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-3 text-sm text-background/60 hover:text-accent transition-colors"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-accent/60" />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappHref}
                  className="flex items-start gap-3 text-sm text-background/60 hover:text-accent transition-colors"
                >
                  <MessageCircle size={16} className="mt-0.5 shrink-0 text-accent/60" />
                  <span>{footer.whatsappLabel}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 text-sm text-background/60 hover:text-accent transition-colors"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-accent/60" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-background/60">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent/60" />
                  <span className="whitespace-pre-line">{site.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} {site.name}. {footer.legal.rightsText} | {site.domain}
          </p>
          <p className="text-xs text-background/30">
            {footer.legal.sisterPrefix}{" "}
            <a
              href={site.sisterFirm.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/60 hover:text-accent transition-colors"
            >
              {site.sisterFirm.name}
            </a>
          </p>
          <div className="flex gap-5">
            <Link
              href={footer.legal.privacy.href}
              className="text-xs text-background/40 hover:text-accent transition-colors"
            >
              {footer.legal.privacy.label}
            </Link>
            <Link
              href={footer.legal.terms.href}
              className="text-xs text-background/40 hover:text-accent transition-colors"
            >
              {footer.legal.terms.label}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
