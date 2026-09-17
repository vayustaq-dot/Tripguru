"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ExternalLink,
  FileText,
  Footprints,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Mountain,
  Navigation,
  Plane,
  Settings,
  Tag,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/auth-actions";

const groups: { heading?: string; items: NavItem[] }[] = [
  {
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
    ],
  },
  {
    heading: "Pages",
    items: [
      { href: "/admin/home", label: "Home page", icon: Home },
      { href: "/admin/about", label: "About page", icon: FileText },
      { href: "/admin/contact", label: "Contact page", icon: MessageSquare },
    ],
  },
  {
    heading: "Packages",
    items: [
      { href: "/admin/char-dham", label: "Char Dham", icon: Mountain },
      { href: "/admin/helicopter", label: "Helicopter", icon: Plane },
      { href: "/admin/destinations", label: "Destinations", icon: Footprints },
      { href: "/admin/treks", label: "Treks", icon: Mountain },
    ],
  },
  {
    heading: "Site-wide",
    items: [
      { href: "/admin/nav", label: "Menu & footer", icon: Navigation },
      { href: "/admin/labels", label: "Buttons & labels", icon: Tag },
      { href: "/admin/site", label: "Site settings", icon: Settings },
    ],
  },
];

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = (
    <nav className="space-y-5" aria-label="Admin navigation">
      {groups.map((group, gi) => (
        <div key={group.heading ?? gi} className="space-y-1">
          {group.heading && (
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.heading}
            </p>
          )}
          {group.items.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="lg:hidden sticky top-0 z-40 bg-card border-b border-border px-4 h-14 flex items-center justify-between">
        <span className="font-heading text-xl text-foreground">TrippGuru Admin</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="p-2 hover:bg-muted rounded-sm transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <div className="flex">
        <aside
          className={`${
            open ? "block" : "hidden"
          } lg:block fixed lg:sticky top-14 lg:top-0 inset-x-0 lg:inset-x-auto z-30 lg:h-screen w-full lg:w-60 shrink-0 bg-card border-r border-border p-4 overflow-y-auto`}
        >
          <div className="hidden lg:block mb-6 px-3">
            <span className="font-heading text-2xl text-foreground">TrippGuru</span>
            <p className="text-xs text-muted-foreground">Content admin</p>
          </div>

          {links}

          <div className="mt-6 pt-4 border-t border-border space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
            >
              <ExternalLink size={16} />
              View site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium text-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
