"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  MessageCircle,
  Mountain,
  Search,
  Star,
  Users,
} from "lucide-react";
import { fillTemplate } from "@/lib/template";
import type { LabelsContent, SiteSettings } from "@/lib/content";
import type { Trek } from "@/data/trekking";

const statIcons = [Clock, Mountain, Users];

export default function TrekDirectory({
  treks,
  site,
  search,
  labels,
}: {
  treks: Trek[];
  site: SiteSettings;
  search: { placeholder: string; filtersLabel: string; emptyLinkLabel: string };
  labels: LabelsContent["trekCard"];
}) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);

  const difficulties = useMemo(
    () => [...new Set(treks.map((t) => t.difficulty))],
    [],
  );
  const regions = useMemo(() => [...new Set(treks.map((t) => t.region))], []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return treks.filter((t) => {
      if (difficulty && t.difficulty !== difficulty) return false;
      if (region && t.region !== region) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.blurb.toLowerCase().includes(q) ||
        t.highlights.some((hl) => hl.toLowerCase().includes(q))
      );
    });
  }, [query, difficulty, region]);

  const chip = (active: boolean) =>
    `shrink-0 px-3 py-1 rounded-sm text-xs font-medium transition-colors whitespace-nowrap ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
    }`;

  return (
    <>
      <section className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={search.placeholder}
                aria-label="Search treks"
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${
                showFilters || difficulty || region
                  ? "border-primary text-primary"
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              <Filter size={15} />
              {search.filtersLabel}
            </button>
            <span className="text-xs text-muted-foreground ml-auto hidden sm:block">
              {visible.length}{" "}
              {visible.length === 1 ? labels.foundSuffixOne : labels.foundSuffixMany}
            </span>
          </div>

          {showFilters && (
            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs text-muted-foreground shrink-0 w-16">{labels.difficultyLabel}</span>
                <button type="button" onClick={() => setDifficulty(null)} className={chip(!difficulty)}>
                  {labels.allLabel}
                </button>
                {difficulties.map((d) => (
                  <button key={d} type="button" onClick={() => setDifficulty(d)} className={chip(difficulty === d)}>
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs text-muted-foreground shrink-0 w-16">{labels.regionLabel}</span>
                <button type="button" onClick={() => setRegion(null)} className={chip(!region)}>
                  {labels.allLabel}
                </button>
                {regions.map((r) => (
                  <button key={r} type="button" onClick={() => setRegion(r)} className={chip(region === r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          {visible.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-16">
              No treks match your filters.{" "}
              <Link href="/contact" className="text-primary font-medium hover:underline">
                {search.emptyLinkLabel}
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {visible.map((t) => (
                <div
                  key={t.title}
                  className="bg-card border border-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
                >
                  <div className="bg-primary/5 border-b border-border px-5 pt-5 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        {t.badge && (
                          <span className="inline-block text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-sm mb-2">
                            {t.badge}
                          </span>
                        )}
                        <h2 className="font-heading text-xl text-foreground leading-snug">{t.title}</h2>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin size={12} />
                          {t.region}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-heading text-xl text-primary">{t.price}</p>
                        <p className="text-xs text-muted-foreground">{labels.perPerson}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {t.stats.map((s, i) => {
                        const Icon = statIcons[i] ?? Clock;
                        return (
                          <div key={s.label} className="bg-background rounded-sm px-3 py-2 text-center">
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                              <Icon size={12} className="text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{s.label}</span>
                            </div>
                            <p className="text-xs font-semibold text-foreground">{s.value}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="px-5 py-4 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-sm border ${t.difficultyClasses}`}>
                        {t.difficulty}
                      </span>
                      {t.seasons.map((s) => (
                        <span
                          key={s.label}
                          className={`text-xs px-2 py-0.5 rounded-sm font-medium inline-flex items-center gap-1 ${s.classes}`}
                        >
                          <Calendar size={11} />
                          {s.label}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{t.blurb}</p>
                    <ul className="space-y-1.5 mb-5 flex-1">
                      {t.highlights.map((hl) => (
                        <li key={hl} className="flex items-start gap-2 text-xs text-foreground/80">
                          <Star size={12} className="text-accent mt-0.5 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 mt-auto">
                      <a
                        href={`${site.whatsappHref}?text=${encodeURIComponent(
                          fillTemplate(labels.enquiryTemplate, { title: t.title }),
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-primary text-primary text-xs font-semibold rounded-sm hover:bg-primary/5 transition-colors"
                      >
                        <MessageCircle size={13} /> {labels.whatsappLabel}
                      </a>
                      <Link
                        href={labels.bookHref}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-primary text-primary-foreground text-xs font-semibold rounded-sm hover:bg-primary/90 transition-colors"
                      >
                        {labels.bookLabel} <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
