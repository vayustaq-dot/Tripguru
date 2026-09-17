"use server";

import { randomUUID } from "node:crypto";
import { getEnquiries, writeContent, type Enquiry } from "@/lib/content";

export type EnquiryResult = { ok: boolean; error?: string };

const MAX_STORED = 2000;
const cap = (s: FormDataEntryValue | null, n: number) => String(s ?? "").trim().slice(0, n);

/**
 * Public endpoint: anyone can submit, so every field is length-capped and the
 * stored list is trimmed to keep the JSON file bounded.
 */
export async function submitEnquiry(
  source: "contact" | "home",
  formData: FormData,
): Promise<EnquiryResult> {
  const name = cap(formData.get("name"), 120);
  const phone = cap(formData.get("phone"), 40);

  if (!name || !phone) return { ok: false, error: "Please enter your name and phone number." };

  const entry: Enquiry = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    source,
    name,
    phone,
    email: cap(formData.get("email"), 160) || undefined,
    package: cap(formData.get("package"), 120) || undefined,
    pilgrims: cap(formData.get("pilgrims"), 10) || undefined,
    date: cap(formData.get("date"), 30) || undefined,
    message: cap(formData.get("message"), 2000) || undefined,
    read: false,
  };

  try {
    const current = await getEnquiries();
    const items = [entry, ...current.items].slice(0, MAX_STORED);
    await writeContent("enquiries", { items });
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please call or WhatsApp us instead." };
  }
}
