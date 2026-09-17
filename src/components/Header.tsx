"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Footprints, Menu, Phone, X } from "lucide-react";
import type { NavContent, SiteSettings } from "@/lib/content";

export default function Header({ site, nav }: { site: SiteSettings; nav: NavContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-card border-b border-border">
      <div className="bg-primary text-primary-foreground py-1.5 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <span className="font-medium tracking-wide">{site.tagline}</span>
          <div className="flex items-center gap-5">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Phone size={12} />
              <span>{site.phone}</span>
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <span>WhatsApp: {site.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={site.logo}
              alt={site.name}
              width={200}
              height={48}
              priority
              className="h-12 w-auto object-contain shrink-0"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-5" aria-label="Main navigation">
            {nav.links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary relative group ${
                    active ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href={nav.trekking.href}
              className="flex items-center gap-1.5 text-sm font-semibold px-3.5 py-1.5 rounded-sm border transition-colors border-accent text-accent hover:bg-accent/10"
            >
              <Footprints size={13} />
              {nav.trekking.label}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={nav.bookNow.href}
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors tracking-wide"
            >
              {nav.bookNow.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {[...nav.links, nav.trekking].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={nav.bookNow.href}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center items-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors tracking-wide"
            >
              {nav.bookNow.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
