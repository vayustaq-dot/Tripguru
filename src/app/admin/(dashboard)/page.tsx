import Link from "next/link";
import {
  ChevronRight,
  FileText,
  Footprints,
  Home,
  Inbox,
  MessageSquare,
  Mountain,
  Navigation,
  Plane,
  Settings,
  Tag,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import {
  getCharDham,
  getDestinations,
  getEnquiries,
  getHelicopter,
  getSite,
  getTreks,
} from "@/lib/content";

export default async function AdminDashboard() {
  const [charDham, helicopter, destinations, treks, enquiries, site] = await Promise.all([
    getCharDham(),
    getHelicopter(),
    getDestinations(),
    getTreks(),
    getEnquiries(),
    getSite(),
  ]);

  const destinationCount = destinations.stateGroups.reduce(
    (n, g) => n + g.destinations.length,
    0,
  );
  const unread = enquiries.items.filter((e) => !e.read).length;

  const cards = [
    {
      href: "/admin/enquiries",
      icon: Inbox,
      label: "Enquiries",
      value: `${enquiries.items.length}`,
      note: unread > 0 ? `${unread} unread` : "All caught up",
      highlight: unread > 0,
    },
    {
      href: "/admin/char-dham",
      icon: Mountain,
      label: "Char Dham packages",
      value: `${charDham.packages.length}`,
      note: "Packages, inclusions",
    },
    {
      href: "/admin/helicopter",
      icon: Plane,
      label: "Helicopter packages",
      value: `${helicopter.packages.length}`,
      note: "Packages, booking notes",
    },
    {
      href: "/admin/destinations",
      icon: Footprints,
      label: "Temple destinations",
      value: `${destinationCount}`,
      note: `Across ${destinations.stateGroups.length} states`,
    },
    {
      href: "/admin/treks",
      icon: Mountain,
      label: "Treks",
      value: `${treks.treks.length}`,
      note: `${treks.grades.length} difficulty grades`,
    },
    {
      href: "/admin/site",
      icon: Settings,
      label: "Site settings",
      value: site.phone,
      note: "Contact details, address",
      small: true,
    },
  ];

  const pageCards = [
    { href: "/admin/home", icon: Home, label: "Home page", note: "Hero, cards, testimonials" },
    { href: "/admin/about", icon: FileText, label: "About page", note: "Story, values, team" },
    { href: "/admin/contact", icon: MessageSquare, label: "Contact page", note: "Headings, office hours" },
    { href: "/admin/nav", icon: Navigation, label: "Menu & footer", note: "Navigation, footer links" },
    { href: "/admin/labels", icon: Tag, label: "Buttons & labels", note: "Form fields, button text" },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Everything on the public site is editable here. Changes go live as soon as you save."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map(({ href, icon: Icon, label, value, note, highlight, small }) => (
          <Link
            key={href}
            href={href}
            className={`group bg-card border rounded-sm p-5 hover:shadow-md transition-all ${
              highlight ? "border-primary" : "border-border hover:border-primary/40"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                <Icon size={18} className="text-primary" />
              </div>
              <ChevronRight
                size={16}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <p className={`font-heading text-foreground ${small ? "text-xl" : "text-3xl"}`}>
              {value}
            </p>
            <p className="text-sm font-medium text-foreground mt-0.5">{label}</p>
            <p
              className={`text-xs mt-0.5 ${
                highlight ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {note}
            </p>
          </Link>
        ))}
      </div>

      <h2 className="font-heading text-2xl text-foreground mt-12 mb-4">Page copy</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {pageCards.map(({ href, icon: Icon, label, note }) => (
          <Link
            key={href}
            href={href}
            className="group bg-card border border-border rounded-sm p-5 flex items-center gap-4 hover:border-primary/40 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{note}</p>
            </div>
            <ChevronRight
              size={16}
              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
