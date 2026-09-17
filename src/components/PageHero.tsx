import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function PageHero({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  className = "h-[60vh] min-h-[400px]",
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <section className={`relative ${className} flex items-end overflow-hidden`}>
      <div className="absolute inset-0">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-gray-900/10" />
      </div>
      <div className="relative container mx-auto px-4 pb-14">
        <div className="max-w-2xl">
          <Reveal as="p" className="text-accent font-medium tracking-[0.2em] uppercase text-xs mb-3">
            {eyebrow}
          </Reveal>
          <Reveal as="h1" delay={80} className="font-heading text-5xl md:text-6xl text-white leading-tight mb-4">
            {title}
          </Reveal>
          {subtitle && (
            <Reveal as="p" delay={160} className="text-white/75 text-lg leading-relaxed max-w-xl">
              {subtitle}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
