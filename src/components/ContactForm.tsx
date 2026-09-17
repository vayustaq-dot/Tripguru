"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitEnquiry, type EnquiryResult } from "@/app/enquiry-actions";
import type { LabelsContent } from "@/lib/content";

const field =
  "w-full px-4 py-2.5 border border-border rounded-sm bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
const labelCls = "block text-sm font-medium text-foreground mb-1.5";

export default function ContactForm({ labels }: { labels: LabelsContent["contactForm"] }) {
  const [state, action, pending] = useActionState<EnquiryResult | null, FormData>(
    (_prev, formData) => submitEnquiry("contact", formData),
    null,
  );
  const sent = state?.ok === true;

  return (
    <form className="space-y-5" action={action}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="name">
            {labels.nameLabel} <span className="text-primary">*</span>
          </label>
          <input id="name" name="name" type="text" required placeholder={labels.namePlaceholder} className={field} />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">
            {labels.phoneLabel} <span className="text-primary">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required placeholder={labels.phonePlaceholder} className={field} />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="email">
          {labels.emailLabel}
        </label>
        <input id="email" name="email" type="email" placeholder={labels.emailPlaceholder} className={field} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="package">
            {labels.packageLabel}
          </label>
          <select id="package" name="package" defaultValue="" className={field}>
            <option value="">{labels.packagePlaceholder}</option>
            {labels.packageOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="pilgrims">
            {labels.pilgrimsLabel}
          </label>
          <input
            id="pilgrims"
            name="pilgrims"
            type="number"
            min={1}
            placeholder={labels.pilgrimsPlaceholder}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="date">
          {labels.dateLabel}
        </label>
        <input id="date" name="date" type="date" className={field} />
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          {labels.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={labels.messagePlaceholder}
          className={`${field} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        <Send size={16} />
        {pending ? labels.sendingLabel : sent ? labels.sentLabel : labels.submitLabel}
      </button>
      {sent && (
        <p className="text-primary text-sm" role="status">
          {labels.thanksMessage}
        </p>
      )}
      {state?.error && (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
