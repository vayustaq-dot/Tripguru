import { MessageCircle } from "lucide-react";
import InstagramGlyph from "@/components/icons/InstagramGlyph";
import type { FooterContent, SiteSettings } from "@/lib/content";

export default function FloatingSocial({
  site,
  labels,
}: {
  site: SiteSettings;
  labels: FooterContent["floating"];
}) {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">
      <a
        href={site.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Follow ${site.name} on Instagram`}
        className="group relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        style={{
          background:
            "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
      >
        <InstagramGlyph size={22} className="text-white" />
        <span className="absolute right-14 bg-foreground text-background text-xs font-medium px-2.5 py-1 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {labels.instagramTooltip}
        </span>
      </a>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${site.name} on WhatsApp`}
        className="group relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-[#25D366]"
      >
        <MessageCircle size={22} className="text-white" />
        <span className="absolute right-14 bg-foreground text-background text-xs font-medium px-2.5 py-1 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {labels.whatsappTooltip}
        </span>
      </a>
    </div>
  );
}
