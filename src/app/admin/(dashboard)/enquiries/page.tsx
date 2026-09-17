import PageHeader from "@/components/admin/PageHeader";
import EnquiryList from "@/components/admin/EnquiryList";
import { getEnquiries } from "@/lib/content";

export default async function AdminEnquiries() {
  const { items } = await getEnquiries();
  return (
    <>
      <PageHeader
        title="Enquiries"
        description="Booking enquiries submitted from the website. Call or WhatsApp straight from here."
      />
      <EnquiryList initial={items} />
    </>
  );
}
