"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, Filter, MessageCircle, Search } from "lucide-react";
import { fillTemplate } from "@/lib/template";
import type { LabelsContent, SiteSettings } from "@/lib/content";
import type { StateGroup } from "@/data/packages";

const toneBorder = {
  primary: "border-primary",
  accent: "border-accent",
  secondary: "border-secondary",
} as const;

export default function DestinationDirectory({
  stateGroups,
  site,
  search,
  labels,
}: {
  stateGroups: StateGroup[];
  site: SiteSettings;
  search: { placeholder: string; allLabel: string; emptyLinkLabel: string };
  labels: LabelsContent["destinationCard"];
}) {
  const [query, setQuery] = useState("");
  const [activeState, setActiveState] = useState<string | null>(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stateGroups
      .filter((g) => !activeState || g.state === activeState)
      .map((g) => {
        if (!q) return g;
        if (g.state.toLowerCase().includes(q)) return g;
        return {
          ...g,
          destinations: g.destinations.filter(
            (d) => d.name.toLowerCase().includes(q) || d.blurb.toLowerCase().includes(q),
          ),
        };
      })
      .filter((g) => g.destinations.length > 0);
  }, [query, activeState]);

  return (
    <>
      <section className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="relative mb-3">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={search.placeholder}
              aria-label="Search destinations"
              className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={15} className="shrink-0 text-muted-foreground" />
            <button
              type="button"
              onClick={() => setActiveState(null)}
              className={`shrink-0 px-3.5 py-1.5 rounded-sm text-xs font-medium transition-colors whitespace-nowrap ${
                activeState === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {search.allLabel}
            </button>
            {stateGroups.map((g) => (
              <button
                key={g.state}
                type="button"
                onClick={() => setActiveState(g.state)}
                className={`shrink-0 px-3.5 py-1.5 rounded-sm text-xs font-medium transition-colors whitespace-nowrap ${
                  activeState === g.state
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {g.state}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {groups.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-16">
              No destinations match &ldquo;{query}&rdquo;. Try another search, or{" "}
              <Link href="/contact" className="text-primary font-medium hover:underline">
                {search.emptyLinkLabel}
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {groups.map((g) => (
                <div
                  key={g.state}
                  className={`bg-card border border-border rounded-sm overflow-hidden border-t-4 ${toneBorder[g.tone]}`}
                >
                  <div className="px-6 py-4 bg-primary/5 border-b border-border">
                    <h2 className="font-heading text-xl text-foreground">{g.state}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {g.destinations.length}{" "}
                      {g.destinations.length === 1 ? labels.countSuffixOne : labels.countSuffixMany}
                    </p>
                  </div>
                  <ul className="divide-y divide-border">
                    {g.destinations.map((d) => (
                      <li key={d.name} className="group px-6 py-4 hover:bg-muted/40 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <ChevronRight size={14} className="text-primary shrink-0" />
                              <h3 className="font-semibold text-foreground text-sm">{d.name}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                              {d.blurb}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3 pl-5">
                          <a
                            href={`${site.whatsappHref}?text=${encodeURIComponent(
                              fillTemplate(labels.enquiryTemplate, { name: d.name, state: g.state }),
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-primary text-primary text-xs font-medium rounded-sm hover:bg-primary/5 transition-colors"
                          >
                            <MessageCircle size={13} /> {labels.whatsappLabel}
                          </a>
                          <Link
                            href={labels.quoteHref}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-sm hover:bg-primary/90 transition-colors"
                          >
                            {labels.quoteLabel} <ChevronRight size={13} />
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
