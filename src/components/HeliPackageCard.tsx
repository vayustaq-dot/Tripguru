import Link from "next/link";
import { ChevronRight, CircleCheck, Clock, MessageCircle, Star, Users } from "lucide-react";
import { fillTemplate } from "@/lib/template";
import type { LabelsContent, SiteSettings } from "@/lib/content";
import type { HeliPackage } from "@/data/helicopter";

const metaIcons = [Clock, Users];

export default function HeliPackageCard({
  pkg,
  site,
  labels,
}: {
  pkg: HeliPackage;
  site: SiteSettings;
  labels: LabelsContent["heliCard"];
}) {
  const enquiry = `${site.whatsappHref}?text=${encodeURIComponent(
    fillTemplate(labels.enquiryTemplate, { title: pkg.title }),
  )}`;

  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden">
      <div className="bg-primary/5 border-b border-border px-7 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          {pkg.badge && (
            <span
              className={`inline-block text-white text-xs font-semibold px-3 py-0.5 rounded-sm mb-2 ${
                pkg.badgeTone === "accent" ? "bg-accent" : "bg-primary"
              }`}
            >
              {pkg.badge}
            </span>
          )}
          <h3 className="font-heading text-2xl text-foreground">{pkg.title}</h3>
          <p className="text-primary text-sm font-medium mt-0.5">{pkg.subtitle}</p>
          <div className="flex flex-wrap gap-4 mt-1.5 text-xs text-muted-foreground">
            {pkg.meta.map((m, i) => {
              const Icon = metaIcons[i] ?? Clock;
              return (
                <span key={m} className="flex items-center gap-1">
                  <Icon size={13} /> {m}
                </span>
              );
            })}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">{labels.priceLabel}</p>
          <p className="font-heading text-3xl text-primary">{pkg.price}</p>
          <p className="text-xs text-muted-foreground">{pkg.priceNote}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="p-6">
          <h4 className="font-semibold text-foreground text-sm mb-4 uppercase tracking-wider">
            {labels.highlightsHeading}
          </h4>
          <ul className="space-y-2.5">
            {pkg.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CircleCheck size={15} className="text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 lg:col-span-2">
          <h4 className="font-semibold text-foreground text-sm mb-4 uppercase tracking-wider">
            {labels.scheduleHeading}
          </h4>
          <div className="space-y-3">
            {pkg.schedule.map((stop) => (
              <div key={stop.time + stop.title} className="flex gap-3">
                <span className="shrink-0 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-sm h-fit mt-0.5 whitespace-nowrap">
                  {stop.time}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{stop.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{stop.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-7 py-4 flex flex-wrap items-center justify-between gap-3 bg-muted/30">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className="fill-accent text-accent" />
          ))}
          <span className="text-xs text-muted-foreground ml-1.5">{labels.ratedLabel}</span>
        </div>
        <div className="flex gap-3">
          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-sm font-semibold rounded-sm hover:bg-primary/5 transition-colors"
          >
            <MessageCircle size={16} /> {labels.whatsappLabel}
          </a>
          <Link
            href={labels.bookHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
          >
            {labels.bookLabel} <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
