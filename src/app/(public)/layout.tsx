import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import { getFooter, getNav, getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(`https://${site.domain}`),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      url: `https://${site.domain}`,
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [site, nav, footer] = await Promise.all([getSite(), getNav(), getFooter()]);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header site={site} nav={nav} />
      <main className="flex-1">{children}</main>
      <Footer site={site} footer={footer} />
      <FloatingSocial site={site} labels={footer.floating} />
    </div>
  );
}
