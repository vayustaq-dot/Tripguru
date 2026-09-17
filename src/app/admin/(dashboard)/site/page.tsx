import PageHeader from "@/components/admin/PageHeader";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { getSite } from "@/lib/content";

export default async function SiteSettingsPage() {
  const site = await getSite();
  return (
    <>
      <PageHeader
        title="Site settings"
        description="Contact details used across every page — header, footer, enquiry buttons and WhatsApp links."
      />
      <SiteSettingsForm site={site} />
    </>
  );
}
