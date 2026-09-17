/**
 * Field definitions that drive the admin editors. One generic renderer walks
 * these, so adding a field to a content type is a one-line change here rather
 * than a new form component.
 */
export type Field =
  | { kind: "text"; name: string; label: string; placeholder?: string; help?: string; width?: "full" | "half" }
  | { kind: "textarea"; name: string; label: string; rows?: number; help?: string }
  | { kind: "select"; name: string; label: string; options: string[]; width?: "full" | "half" }
  | { kind: "image"; name: string; label: string; help?: string; width?: "full" | "half" }
  | { kind: "stringList"; name: string; label: string; addLabel: string; help?: string }
  | { kind: "objectList"; name: string; label: string; addLabel: string; titleKey: string; fields: Field[] }
  | { kind: "group"; name: string; label: string; fields: Field[]; help?: string };

export type Schema = {
  /** Key whose value labels each row in the collapsed list. */
  titleKey: string;
  subtitleKey?: string;
  fields: Field[];
};

const badgeTones = ["primary", "accent"];

export const charDhamPackageSchema: Schema = {
  titleKey: "title",
  subtitleKey: "subtitle",
  fields: [
    { kind: "text", name: "title", label: "Package name", width: "half" },
    { kind: "text", name: "subtitle", label: "Subtitle", placeholder: "Kedarnath · Badrinath", width: "half" },
    { kind: "text", name: "price", label: "Price", placeholder: "₹18,999", width: "half" },
    { kind: "text", name: "badge", label: "Badge", placeholder: "Most Popular", width: "half" },
    { kind: "select", name: "badgeTone", label: "Badge colour", options: badgeTones, width: "half" },
    { kind: "image", name: "image", label: "Image", help: "Path under /public, e.g. /images/char-dham/hero.jpg", width: "half" },
    { kind: "stringList", name: "meta", label: "Quick facts", addLabel: "Add fact", help: "Shown in order: duration, group size, starting point." },
    { kind: "stringList", name: "features", label: "What's included", addLabel: "Add feature" },
    {
      kind: "objectList",
      name: "itinerary",
      label: "Day-wise itinerary",
      addLabel: "Add day",
      titleKey: "stage",
      fields: [
        { kind: "text", name: "stage", label: "Days / route", placeholder: "Day 1–2 — Haridwar → Yamunotri" },
        { kind: "textarea", name: "detail", label: "Detail", rows: 2 },
      ],
    },
  ],
};

export const helicopterPackageSchema: Schema = {
  titleKey: "title",
  subtitleKey: "subtitle",
  fields: [
    { kind: "text", name: "title", label: "Package name", width: "half" },
    { kind: "text", name: "subtitle", label: "Subtitle", width: "half" },
    { kind: "text", name: "price", label: "Price", placeholder: "₹8,500", width: "half" },
    { kind: "text", name: "priceNote", label: "Price note", placeholder: "per person (one way)", width: "half" },
    { kind: "text", name: "badge", label: "Badge", placeholder: "Most Booked", width: "half" },
    { kind: "select", name: "badgeTone", label: "Badge colour", options: badgeTones, width: "half" },
    { kind: "stringList", name: "meta", label: "Quick facts", addLabel: "Add fact", help: "Shown in order: duration, then group size." },
    { kind: "stringList", name: "highlights", label: "Package highlights", addLabel: "Add highlight" },
    {
      kind: "objectList",
      name: "schedule",
      label: "Schedule",
      addLabel: "Add stop",
      titleKey: "title",
      fields: [
        { kind: "text", name: "time", label: "Time", placeholder: "06:00 AM", width: "half" },
        { kind: "text", name: "title", label: "Step", placeholder: "Helicopter Departure", width: "half" },
        { kind: "textarea", name: "detail", label: "Detail", rows: 2 },
      ],
    },
  ],
};

export const stateGroupSchema: Schema = {
  titleKey: "state",
  fields: [
    { kind: "text", name: "state", label: "State", width: "half" },
    { kind: "select", name: "tone", label: "Accent colour", options: ["primary", "accent", "secondary"], width: "half" },
    {
      kind: "objectList",
      name: "destinations",
      label: "Destinations",
      addLabel: "Add destination",
      titleKey: "name",
      fields: [
        { kind: "text", name: "name", label: "Destination" },
        { kind: "textarea", name: "blurb", label: "Description", rows: 2 },
      ],
    },
  ],
};

export const trekSchema: Schema = {
  titleKey: "title",
  subtitleKey: "region",
  fields: [
    { kind: "text", name: "title", label: "Trek name", width: "half" },
    { kind: "text", name: "region", label: "Region", placeholder: "Uttarakhand", width: "half" },
    { kind: "text", name: "price", label: "Price", placeholder: "₹8,499", width: "half" },
    { kind: "text", name: "badge", label: "Badge", placeholder: "Most Popular", width: "half" },
    { kind: "text", name: "difficulty", label: "Difficulty", placeholder: "Easy-Moderate", width: "half" },
    { kind: "text", name: "difficultyClasses", label: "Difficulty colour classes", placeholder: "bg-lime-100 text-lime-700 border-lime-200", width: "half" },
    { kind: "textarea", name: "blurb", label: "Description", rows: 3 },
    { kind: "stringList", name: "highlights", label: "Highlights", addLabel: "Add highlight" },
    {
      kind: "objectList",
      name: "stats",
      label: "Stats",
      addLabel: "Add stat",
      titleKey: "label",
      fields: [
        { kind: "text", name: "label", label: "Label", placeholder: "Duration", width: "half" },
        { kind: "text", name: "value", label: "Value", placeholder: "6 Days", width: "half" },
      ],
    },
    {
      kind: "objectList",
      name: "seasons",
      label: "Seasons",
      addLabel: "Add season",
      titleKey: "label",
      fields: [
        { kind: "text", name: "label", label: "Season", placeholder: "Winter", width: "half" },
        { kind: "text", name: "classes", label: "Colour classes", placeholder: "bg-blue-50 text-blue-600", width: "half" },
      ],
    },
  ],
};

export const gradeSchema: Schema = {
  titleKey: "label",
  fields: [
    { kind: "text", name: "label", label: "Grade", width: "half" },
    { kind: "text", name: "borderClass", label: "Border class", placeholder: "border-green-400", width: "half" },
    { kind: "text", name: "badgeClasses", label: "Badge classes", placeholder: "bg-green-100 text-green-700" },
    { kind: "textarea", name: "description", label: "Description", rows: 2 },
    { kind: "text", name: "examples", label: "Examples", placeholder: "Dayara Bugyal, Nag Tibba" },
  ],
};

/** Blank record shaped by a schema, used when adding a new item. */
export function emptyRecord(fields: Field[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.kind === "group") out[f.name] = emptyRecord(f.fields);
    else if (f.kind === "stringList" || f.kind === "objectList") out[f.name] = [];
    else if (f.kind === "select") out[f.name] = f.options[0];
    else out[f.name] = "";
  }
  return out;
}
