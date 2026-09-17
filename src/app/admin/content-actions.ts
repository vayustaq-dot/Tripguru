"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import {
  readContent,
  getCharDham,
  getDestinations,
  getEnquiries,
  getHelicopter,
  getTreks,
  writeContent,
  type SiteSettings,
} from "@/lib/content";

export type SaveResult = { ok: boolean; error?: string };

async function guard(): Promise<SaveResult | null> {
  if (!(await isAuthenticated())) return { ok: false, error: "Your session expired. Sign in again." };
  return null;
}

function parseRows(json: string): Record<string, unknown>[] {
  const parsed = JSON.parse(json);
  if (!Array.isArray(parsed)) throw new Error("Expected a list of items.");
  for (const row of parsed) {
    if (typeof row !== "object" || row === null || Array.isArray(row)) {
      throw new Error("Each item must be an object.");
    }
  }
  return parsed as Record<string, unknown>[];
}

/** Public routes are statically rendered, so each save must invalidate them. */
function refresh(paths: string[]) {
  for (const p of [...paths, "/"]) revalidatePath(p);
}

async function save(
  json: string,
  apply: (rows: Record<string, unknown>[]) => Promise<void>,
  paths: string[],
): Promise<SaveResult> {
  const denied = await guard();
  if (denied) return denied;
  try {
    await apply(parseRows(json));
    refresh(paths);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not save." };
  }
}

export async function saveCharDhamPackages(json: string): Promise<SaveResult> {
  return save(
    json,
    async (rows) => {
      const current = await getCharDham();
      await writeContent("char-dham", { ...current, packages: rows as never });
    },
    ["/char-dham"],
  );
}

export async function saveCharDhamLists(json: string): Promise<SaveResult> {
  const denied = await guard();
  if (denied) return denied;
  try {
    const { included, notIncluded } = JSON.parse(json);
    if (!Array.isArray(included) || !Array.isArray(notIncluded)) {
      throw new Error("Both lists must be arrays.");
    }
    const current = await getCharDham();
    await writeContent("char-dham", { ...current, included, notIncluded });
    refresh(["/char-dham"]);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not save." };
  }
}

export async function saveHelicopterPackages(json: string): Promise<SaveResult> {
  return save(
    json,
    async (rows) => {
      const current = await getHelicopter();
      await writeContent("helicopter", { ...current, packages: rows as never });
    },
    ["/helicopter"],
  );
}

export async function saveHelicopterNotes(json: string): Promise<SaveResult> {
  const denied = await guard();
  if (denied) return denied;
  try {
    const notes = JSON.parse(json);
    if (!Array.isArray(notes)) throw new Error("Notes must be a list.");
    const current = await getHelicopter();
    await writeContent("helicopter", { ...current, notes });
    refresh(["/helicopter"]);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not save." };
  }
}

export async function saveDestinations(json: string): Promise<SaveResult> {
  return save(
    json,
    async (rows) => {
      const current = await getDestinations();
      await writeContent("destinations", { ...current, stateGroups: rows as never });
    },
    ["/packages"],
  );
}

export async function saveTreks(json: string): Promise<SaveResult> {
  return save(
    json,
    async (rows) => {
      const current = await getTreks();
      await writeContent("treks", { ...current, treks: rows as never });
    },
    ["/trekking"],
  );
}

export async function saveGrades(json: string): Promise<SaveResult> {
  return save(
    json,
    async (rows) => {
      const current = await getTreks();
      await writeContent("treks", { ...current, grades: rows as never });
    },
    ["/trekking"],
  );
}

export async function saveSite(_prev: SaveResult | null, formData: FormData): Promise<SaveResult> {
  const denied = await guard();
  if (denied) return denied;
  try {
    const get = (k: string) => String(formData.get(k) ?? "").trim();
    const digits = (s: string) => s.replace(/[^\d+]/g, "");

    const phone = get("phone");
    const whatsapp = get("whatsapp");

    const next: SiteSettings = {
      name: get("name"),
      logo: get("logo") || "/images/logo.png",
      domain: get("domain"),
      tagline: get("tagline"),
      description: get("description"),
      phone,
      phoneHref: `tel:${digits(phone)}`,
      whatsapp,
      whatsappHref: `https://wa.me/${digits(whatsapp).replace(/^\+/, "")}`,
      email: get("email"),
      instagram: get("instagram"),
      sisterFirm: { name: get("sisterFirmName"), href: get("sisterFirmHref") },
      address: get("address"),
    };

    if (!next.name || !next.phone) throw new Error("Business name and phone are required.");

    await writeContent("site", next);
    refresh(["/about", "/contact", "/char-dham", "/helicopter", "/packages", "/trekking"]);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not save." };
  }
}

export async function markEnquiry(id: string, read: boolean): Promise<SaveResult> {
  const denied = await guard();
  if (denied) return denied;
  const current = await getEnquiries();
  await writeContent("enquiries", {
    items: current.items.map((e) => (e.id === id ? { ...e, read } : e)),
  });
  revalidatePath("/admin/enquiries");
  return { ok: true };
}

export async function deleteEnquiry(id: string): Promise<SaveResult> {
  const denied = await guard();
  if (denied) return denied;
  const current = await getEnquiries();
  await writeContent("enquiries", { items: current.items.filter((e) => e.id !== id) });
  revalidatePath("/admin/enquiries");
  return { ok: true };
}

/** Files whose page copy can be edited generically. */
const EDITABLE = [
  "home",
  "about",
  "contact",
  "nav",
  "footer",
  "labels",
  "char-dham",
  "helicopter",
  "destinations",
  "treks",
] as const;
type EditableFile = (typeof EDITABLE)[number];

const PATHS: Record<EditableFile, string[]> = {
  home: ["/"],
  about: ["/about"],
  contact: ["/contact"],
  nav: ["/", "/about", "/contact", "/char-dham", "/helicopter", "/packages", "/trekking"],
  footer: ["/", "/about", "/contact", "/char-dham", "/helicopter", "/packages", "/trekking"],
  labels: ["/", "/contact", "/char-dham", "/helicopter", "/packages", "/trekking"],
  "char-dham": ["/char-dham"],
  helicopter: ["/helicopter"],
  destinations: ["/packages"],
  treks: ["/trekking"],
};

/**
 * Replaces one top-level key of a content file (or the whole file when `key`
 * is empty), merging so untouched keys survive. Bound per-page with `.bind`.
 */
export async function saveSection(
  file: EditableFile,
  key: string,
  json: string,
): Promise<SaveResult> {
  const denied = await guard();
  if (denied) return denied;
  if (!EDITABLE.includes(file)) return { ok: false, error: "Unknown content file." };

  try {
    const parsed = JSON.parse(json);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("Expected an object.");
    }
    const current = (await readContent(file as never)) as Record<string, unknown>;
    const next = key ? { ...current, [key]: parsed } : { ...current, ...parsed };
    await writeContent(file as never, next as never);
    refresh(PATHS[file]);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not save." };
  }
}
