"use client";

import { useState, useTransition } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Mail,
  MessageCircle,
  Phone,
  Trash2,
  Users,
} from "lucide-react";
import { deleteEnquiry, markEnquiry } from "@/app/admin/content-actions";
import type { Enquiry } from "@/lib/content";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const waHref = (phone: string) =>
  `https://wa.me/${phone.replace(/[^\d]/g, "")}`;

export default function EnquiryList({ initial }: { initial: Enquiry[] }) {
  const [items, setItems] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [, startTransition] = useTransition();

  const visible = filter === "unread" ? items.filter((e) => !e.read) : items;
  const unread = items.filter((e) => !e.read).length;

  const toggleRead = (e: Enquiry) => {
    const read = !e.read;
    setItems((prev) => prev.map((x) => (x.id === e.id ? { ...x, read } : x)));
    startTransition(() => {
      markEnquiry(e.id, read);
    });
  };

  const remove = (e: Enquiry) => {
    if (!confirm(`Delete the enquiry from ${e.name}?`)) return;
    setItems((prev) => prev.filter((x) => x.id !== e.id));
    startTransition(() => {
      deleteEnquiry(e.id);
    });
  };

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground border border-dashed border-border rounded-sm p-12 text-center">
        No enquiries yet. Submissions from the contact form and the homepage form land here.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-medium transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {f === "all" ? `All (${items.length})` : `Unread (${unread})`}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {visible.map((e) => {
          const open = openId === e.id;
          return (
            <div
              key={e.id}
              className={`border rounded-sm bg-card overflow-hidden ${
                e.read ? "border-border" : "border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpenId(open ? null : e.id);
                    if (!e.read) toggleRead(e);
                  }}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left"
                  aria-expanded={open}
                >
                  {open ? (
                    <ChevronDown size={15} className="text-primary shrink-0" />
                  ) : (
                    <ChevronRight size={15} className="text-muted-foreground shrink-0" />
                  )}
                  {!e.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm truncate ${e.read ? "text-foreground" : "font-semibold text-foreground"}`}>
                      {e.name}
                      {e.package && (
                        <span className="text-muted-foreground font-normal"> &middot; {e.package}</span>
                      )}
                    </span>
                    <span className="block text-xs text-muted-foreground truncate">
                      {e.phone} &middot; {fmt(e.receivedAt)}
                    </span>
                  </span>
                </button>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleRead(e)}
                    className="px-2 py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {e.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    onClick={() => remove(e)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {open && (
                <div className="border-t border-border p-4 bg-muted/20 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {e.email && (
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={14} className="text-primary" /> {e.email}
                      </p>
                    )}
                    {e.pilgrims && (
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Users size={14} className="text-primary" /> {e.pilgrims} pilgrims
                      </p>
                    )}
                    {e.date && (
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={14} className="text-primary" /> {e.date}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground/70">
                      via {e.source === "home" ? "homepage form" : "contact page"}
                    </p>
                  </div>

                  {e.message && (
                    <p className="text-sm text-foreground/80 leading-relaxed bg-card border border-border rounded-sm p-3 whitespace-pre-wrap">
                      {e.message}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={`tel:${e.phone.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-sm hover:bg-primary/90 transition-colors"
                    >
                      <Phone size={13} /> Call
                    </a>
                    <a
                      href={waHref(e.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-primary text-primary text-xs font-semibold rounded-sm hover:bg-primary/5 transition-colors"
                    >
                      <MessageCircle size={13} /> WhatsApp
                    </a>
                    {e.email && (
                      <a
                        href={`mailto:${e.email}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-border text-foreground text-xs font-semibold rounded-sm hover:bg-muted transition-colors"
                      >
                        <Mail size={13} /> Email
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
