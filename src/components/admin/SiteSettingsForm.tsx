"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";
import { saveSite, type SaveResult } from "@/app/admin/content-actions";
import type { SiteSettings } from "@/lib/content";

const input =
  "w-full px-3 py-2 border border-border rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
const label = "block text-sm font-medium text-foreground mb-1.5";

function Field({
  name,
  label: text,
  defaultValue,
  help,
  type = "text",
  rows,
}: {
  name: string;
  label: string;
  defaultValue: string;
  help?: string;
  type?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className={label} htmlFor={name}>
        {text}
      </label>
      {rows ? (
        <textarea id={name} name={name} rows={rows} defaultValue={defaultValue} className={`${input} resize-none`} />
      ) : (
        <input id={name} name={name} type={type} defaultValue={defaultValue} className={input} />
      )}
      {help && <p className="text-xs text-muted-foreground mt-1">{help}</p>}
    </div>
  );
}

export default function SiteSettingsForm({ site }: { site: SiteSettings }) {
  const [state, action, pending] = useActionState<SaveResult | null, FormData>(saveSite, null);

  return (
    <form action={action} className="max-w-2xl space-y-8">
      <section className="bg-card border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-heading text-xl text-foreground">Business</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field name="name" label="Business name" defaultValue={site.name} />
          <Field name="domain" label="Domain" defaultValue={site.domain} />
        </div>
        <Field name="logo" label="Logo image" defaultValue={site.logo} help="Path under /public, e.g. /images/logo.png" />
        <Field name="tagline" label="Tagline" defaultValue={site.tagline} help="Shown in the top bar and page titles." />
        <Field
          name="description"
          label="Search description"
          defaultValue={site.description}
          rows={3}
          help="Used as the meta description for search engines."
        />
      </section>

      <section className="bg-card border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-heading text-xl text-foreground">Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field name="phone" label="Phone" defaultValue={site.phone} help="Call links are generated from this." />
          <Field name="whatsapp" label="WhatsApp" defaultValue={site.whatsapp} help="wa.me links are generated from this." />
        </div>
        <Field name="email" label="Email" defaultValue={site.email} type="email" />
        <Field name="address" label="Office address" defaultValue={site.address} rows={2} />
        <Field name="instagram" label="Instagram URL" defaultValue={site.instagram} />
      </section>

      <section className="bg-card border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-heading text-xl text-foreground">Sister firm</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field name="sisterFirmName" label="Name" defaultValue={site.sisterFirm.name} />
          <Field name="sisterFirmHref" label="Website" defaultValue={site.sisterFirm.href} />
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save settings"}
        </button>
        {state?.ok && (
          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
            <Check size={16} /> Saved &amp; published
          </span>
        )}
        {state?.error && <span className="text-sm text-destructive">{state.error}</span>}
      </div>
    </form>
  );
}
