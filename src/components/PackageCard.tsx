import Image from "next/image";
import {
  ChevronRight,
  CircleCheckBig,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { fillTemplate } from "@/lib/template";
import type { LabelsContent, SiteSettings } from "@/lib/content";
import type { TourPackage } from "@/lib/types";

const metaIcons = [Clock, Users, MapPin];

export default function PackageCard({
  pkg,
  site,
  labels,
}: {
  pkg: TourPackage;
  site: SiteSettings;
  labels: LabelsContent["packageCard"];
}) {
  const enquiry = `${site.whatsappHref}?text=${encodeURIComponent(
    fillTemplate(labels.enquiryTemplate, { title: pkg.title }),
  )}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-card border border-border rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div className="lg:col-span-2 relative h-64 lg:h-auto min-h-[260px]">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        {pkg.badge && (
          <span
            className={`absolute top-4 left-4 z-10 text-white text-xs font-semibold px-3 py-1 rounded-sm ${
              pkg.badgeTone === "accent" ? "bg-accent" : "bg-primary"
            }`}
          >
            {pkg.badge}
          </span>
        )}
      </div>

      <div className="lg:col-span-3 p-7 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
            <div>
              <h3 className="font-heading text-2xl text-foreground">{pkg.title}</h3>
              <p className="text-primary text-sm font-medium mt-0.5">{pkg.subtitle}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">{labels.priceLabel}</p>
              <p className="font-heading text-3xl text-primary">{pkg.price}</p>
              <p className="text-xs text-muted-foreground">{labels.perPerson}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 my-4 text-sm text-muted-foreground">
            {pkg.meta.map((m, i) => {
              const Icon = metaIcons[i] ?? Clock;
              return (
                <span key={m} className="flex items-center gap-1.5">
                  <Icon size={15} className="text-primary" />
                  {m}
                </span>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-5">
            {pkg.features.map((f) => (
              <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CircleCheckBig size={15} className="text-primary mt-0.5 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {pkg.itinerary.length > 0 && (
            <details className="group mb-5">
              <summary className="cursor-pointer text-sm font-semibold text-primary flex items-center gap-1.5 select-none list-none">
                <ChevronRight size={15} className="transition-transform group-open:rotate-90" />
                {labels.itineraryLabel}
              </summary>
              <div className="mt-4 space-y-3 pl-4 border-l-2 border-muted">
                {pkg.itinerary.map((stop) => (
                  <div key={stop.stage}>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {stop.stage}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {stop.detail}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <a
            href={enquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
          >
            <MessageCircle size={16} /> {labels.whatsappLabel}
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-semibold rounded-sm hover:bg-muted transition-colors"
          >
            <Phone size={16} /> {labels.callLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
