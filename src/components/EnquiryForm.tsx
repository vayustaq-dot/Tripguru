"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryResult } from "@/app/enquiry-actions";
import type { LabelsContent } from "@/lib/content";

/** Submissions land in the admin Enquiries inbox. */
export default function EnquiryForm({ labels }: { labels: LabelsContent["homeForm"] }) {
  const [state, action, pending] = useActionState<EnquiryResult | null, FormData>(
    (_prev, formData) => submitEnquiry("home", formData),
    null,
  );
  const sent = state?.ok === true;

  const field =
    "w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors";

  return (
    <form className="space-y-4" action={action}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="name" required placeholder={labels.namePlaceholder} className={field} />
        <input type="tel" name="phone" required placeholder={labels.phonePlaceholder} className={field} />
      </div>
      <select
        name="package"
        defaultValue=""
        className={`${field} text-white/70 appearance-none`}
        aria-label={labels.packagePlaceholder}
      >
        <option value="" className="text-foreground">
          {labels.packagePlaceholder}
        </option>
        {labels.packageOptions.map((opt) => (
          <option key={opt} value={opt} className="text-foreground">
            {opt}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        rows={3}
        placeholder={labels.messagePlaceholder}
        className={`${field} resize-none`}
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors tracking-wide disabled:opacity-60"
      >
        {pending ? labels.sendingLabel : sent ? labels.sentLabel : labels.submitLabel}
      </button>
      {sent && (
        <p className="text-accent text-xs" role="status">
          {labels.thanksMessage}
        </p>
      )}
      {state?.error && (
        <p className="text-destructive text-xs" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
