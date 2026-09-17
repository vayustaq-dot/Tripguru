import type { Field } from "@/lib/admin-schema";
import { iconNames } from "@/lib/icons";

/** Shared field builders so the page schemas stay readable. */
const text = (name: string, label: string, half = true, placeholder?: string): Field =>
  ({ kind: "text", name, label, width: half ? "half" : "full", placeholder });
const area = (name: string, label: string, rows = 3): Field =>
  ({ kind: "textarea", name, label, rows });
const icon = (name = "icon", label = "Icon"): Field =>
  ({ kind: "select", name, label, options: iconNames as unknown as string[], width: "half" });
const group = (name: string, label: string, fields: Field[], help?: string): Field =>
  ({ kind: "group", name, label, fields, help });
const list = (name: string, label: string, addLabel: string, help?: string): Field =>
  ({ kind: "stringList", name, label, addLabel, help });
const objects = (name: string, label: string, addLabel: string, titleKey: string, fields: Field[]): Field =>
  ({ kind: "objectList", name, label, addLabel, titleKey, fields });

const metaFields = [text("title", "Browser / SEO title", false), area("description", "Search description", 2)];
const linkFields = [text("label", "Label"), text("href", "Link")];
const featureFields = [icon(), text("title", "Title"), area("body", "Description", 2)];

export const homeSchema: Field[] = [
  group("hero", "Hero", [
    text("eyebrow", "Eyebrow", false),
    text("titleTop", "Heading line 1"),
    text("titleAccent", "Heading line 2 (accent)"),
    area("body", "Intro paragraph", 3),
    text("image", "Background image", true, "/images/home/hero.jpg"),
    text("imageAlt", "Image alt text"),
    group("primaryCta", "Primary button", linkFields),
    group("secondaryCta", "Secondary button", linkFields),
  ]),
  objects("trustBadges", "Trust badges (under the hero)", "Add badge", "label", [icon(), text("label", "Text")]),
  group("paths", "“Choose Your Sacred Path” section", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    text("linkLabel", "Card link text", true, "View Packages"),
    group("primary", "Large card", [
      text("eyebrow", "Card eyebrow"),
      text("title", "Card title"),
      area("body", "Card description", 2),
      text("image", "Image"),
      text("imageAlt", "Image alt text"),
      text("alt", "Alt text"),
      text("href", "Link"),
    ]),
    objects("cards", "Small cards", "Add card", "title", [
      text("title", "Title"),
      text("href", "Link"),
      area("body", "Description", 2),
      text("image", "Image"),
      text("alt", "Alt text"),
    ]),
  ]),
  group("whyUs", "“Journey With Confidence” section", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    area("body", "Paragraph", 3),
    text("image", "Image"),
    text("imageAlt", "Image alt text"),
    text("statValue", "Badge number", true, "10,000+"),
    text("statLabel", "Badge label"),
    objects("features", "Feature points", "Add feature", "title", featureFields),
  ]),
  group("featured", "Featured packages section", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    text("priceLabel", "Price label", true, "Starting from"),
    text("priceNote", "Price suffix", true, "/person"),
    text("itemCtaLabel", "Card button label"),
    text("itemCtaHref", "Card button link"),
    text("ctaLabel", "Bottom button label"),
    text("ctaHref", "Bottom button link"),
    objects("items", "Cards", "Add card", "title", [
      text("title", "Display title"),
      text("duration", "Duration"),
      text("ref", "Linked package name", true, "Kedarnath Yatra"),
      { kind: "select", name: "source", label: "Price comes from", options: ["", "char-dham", "helicopter"], width: "half" },
      text("price", "Price (only if not linked)", true, "₹5,999"),
      text("badge", "Badge"),
      text("image", "Image"),
      text("alt", "Alt text"),
    ]),
  ]),
  group("testimonials", "Testimonials", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    objects("items", "Reviews", "Add review", "name", [
      text("name", "Name"),
      text("trip", "Package taken"),
      area("quote", "Quote", 3),
    ]),
  ]),
  group("cta", "Bottom enquiry section", [
    text("image", "Image"),
    text("imageAlt", "Image alt text"),
    text("eyebrow", "Image eyebrow"),
    text("lineOne", "Image line 1"),
    text("lineTwo", "Image line 2"),
    text("formEyebrow", "Form eyebrow"),
    text("formHeading", "Form heading"),
    area("formBody", "Form intro", 2),
    text("locationLabel", "Location shown under form"),
  ]),
];

export const aboutSchema: Field[] = [
  group("meta", "Page title & SEO", metaFields),
  group("hero", "Hero", [
    text("eyebrow", "Eyebrow"),
    text("title", "Heading"),
    area("subtitle", "Sub-heading", 2),
    text("image", "Image"),
    text("imageAlt", "Image alt text"),
  ]),
  objects("stats", "Stats band", "Add stat", "label", [icon(), text("value", "Value"), text("label", "Label")]),
  group("story", "Story section", [
    text("eyebrow", "Eyebrow"),
    text("headingLineOne", "Heading line 1"),
    text("headingLineTwo", "Heading line 2"),
    area("paraOne", "Paragraph 1", 3),
    area("paraTwo", "Paragraph 2", 3),
    area("paraThreeBefore", "Paragraph 3 (before sister firm link)", 2),
    area("paraThreeAfter", "Paragraph 3 (after sister firm link)", 2),
    text("image", "Image"),
    text("imageAlt", "Image alt text"),
    text("badgeValue", "Badge number"),
    text("badgeLabel", "Badge label"),
    list("assurances", "Checklist points", "Add point"),
  ]),
  group("values", "Core values", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    objects("items", "Values", "Add value", "title", featureFields),
  ]),
  group("team", "Team", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    objects("members", "Team members", "Add member", "name", [
      text("name", "Name"),
      text("role", "Role"),
      area("bio", "Bio", 3),
    ]),
  ]),
  group("office", "Office section labels", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    text("addressLabel", "Address label"),
    text("phoneLabel", "Phone label"),
    text("whatsappPrefix", "WhatsApp prefix"),
    text("emailLabel", "Email label"),
    text("sisterLabel", "Sister firm label"),
  ], "The address and phone number themselves come from Site settings."),
  group("ctaCard", "Enquiry card", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    area("body", "Body", 2),
    text("whatsappLabel", "WhatsApp button"),
    text("callPrefix", "Call button prefix"),
    text("enquiryLabel", "Enquiry button"),
    text("enquiryHref", "Enquiry button link"),
  ]),
];

export const contactSchema: Field[] = [
  group("meta", "Page title & SEO", metaFields),
  group("hero", "Hero", [text("eyebrow", "Eyebrow"), text("title", "Heading"), area("body", "Intro", 2)]),
  group("bar", "Contact bar", [text("callPrefix", "Call prefix"), text("whatsappPrefix", "WhatsApp prefix")]),
  group("form", "Form section", [text("eyebrow", "Eyebrow"), text("heading", "Heading")]),
  group("details", "Contact details panel", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    objects("cards", "Contact cards", "Add card", "kicker", [
      { kind: "select", name: "kind", label: "Shows", options: ["phone", "whatsapp", "email"], width: "half" },
      icon(),
      text("kicker", "Label"),
      text("note", "Small note"),
    ]),
    text("addressKicker", "Address label"),
    text("hoursKicker", "Hours label"),
    text("hoursPrimary", "Hours line 1"),
    text("hoursSecondary", "Hours line 2"),
    text("whatsappCtaLabel", "WhatsApp button"),
    area("whatsappPrefill", "Pre-filled WhatsApp message", 2),
  ]),
];

export const navSchema: Field[] = [
  objects("links", "Menu links", "Add link", "label", linkFields),
  group("trekking", "Trekking button", linkFields),
  group("bookNow", "Book Now button", linkFields),
];

export const footerSchema: Field[] = [
  area("blurb", "About paragraph", 3),
  area("quote", "Quote", 2),
  objects("columns", "Link columns", "Add column", "heading", [
    text("heading", "Column heading", false),
    objects("links", "Links", "Add link", "label", linkFields),
  ]),
  text("contactHeading", "Contact column heading"),
  text("whatsappLabel", "WhatsApp link text"),
  group("legal", "Bottom bar", [
    text("rightsText", "Rights text"),
    text("sisterPrefix", "Sister firm prefix"),
    group("privacy", "Privacy link", linkFields),
    group("terms", "Terms link", linkFields),
  ]),
  group("floating", "Floating buttons", [
    text("instagramTooltip", "Instagram tooltip"),
    text("whatsappTooltip", "WhatsApp tooltip"),
  ]),
];

const tpl = (name: string, label: string, help: string): Field =>
  ({ kind: "textarea", name, label, rows: 2, help });

export const labelsSchema: Field[] = [
  group("packageCard", "Package cards (Char Dham)", [
    text("priceLabel", "Price label"),
    text("perPerson", "Per-person text"),
    text("itineraryLabel", "Itinerary toggle"),
    text("whatsappLabel", "WhatsApp button"),
    text("callLabel", "Call button"),
    tpl("enquiryTemplate", "WhatsApp message", "{title} is replaced with the package name."),
  ]),
  group("heliCard", "Helicopter cards", [
    text("priceLabel", "Price label"),
    text("highlightsHeading", "Highlights heading"),
    text("scheduleHeading", "Schedule heading"),
    text("ratedLabel", "Rating text"),
    text("whatsappLabel", "WhatsApp button"),
    text("bookLabel", "Book button"),
    text("bookHref", "Book button link"),
    tpl("enquiryTemplate", "WhatsApp message", "{title} is replaced with the package name."),
  ]),
  group("destinationCard", "Destination rows", [
    text("whatsappLabel", "WhatsApp button"),
    text("quoteLabel", "Quote button"),
    text("quoteHref", "Quote button link"),
    text("countSuffixOne", "Count word (one)"),
    text("countSuffixMany", "Count word (many)"),
    tpl("enquiryTemplate", "WhatsApp message", "{name} and {state} are replaced automatically."),
  ]),
  group("trekCard", "Trek cards & filters", [
    text("perPerson", "Per-person text"),
    text("whatsappLabel", "WhatsApp button"),
    text("bookLabel", "Book button"),
    text("bookHref", "Book button link"),
    text("foundSuffixOne", "Result word (one)"),
    text("foundSuffixMany", "Result word (many)"),
    text("difficultyLabel", "Difficulty filter label"),
    text("regionLabel", "Region filter label"),
    text("allLabel", "“All” chip"),
    tpl("enquiryTemplate", "WhatsApp message", "{title} is replaced with the trek name."),
  ]),
  group("homeForm", "Homepage enquiry form", [
    text("namePlaceholder", "Name placeholder"),
    text("phonePlaceholder", "Phone placeholder"),
    text("packagePlaceholder", "Package dropdown placeholder"),
    text("messagePlaceholder", "Message placeholder"),
    text("submitLabel", "Submit button"),
    text("sendingLabel", "Sending text"),
    text("sentLabel", "Sent text"),
    area("thanksMessage", "Thank-you message", 2),
    list("packageOptions", "Package dropdown options", "Add option"),
  ]),
  group("contactForm", "Contact page form", [
    text("nameLabel", "Name label"),
    text("namePlaceholder", "Name placeholder"),
    text("phoneLabel", "Phone label"),
    text("phonePlaceholder", "Phone placeholder"),
    text("emailLabel", "Email label"),
    text("emailPlaceholder", "Email placeholder"),
    text("packageLabel", "Package label"),
    text("packagePlaceholder", "Package placeholder"),
    text("pilgrimsLabel", "Pilgrims label"),
    text("pilgrimsPlaceholder", "Pilgrims placeholder"),
    text("dateLabel", "Date label"),
    text("messageLabel", "Message label"),
    text("messagePlaceholder", "Message placeholder"),
    text("submitLabel", "Submit button"),
    text("sendingLabel", "Sending text"),
    text("sentLabel", "Sent text"),
    area("thanksMessage", "Thank-you message", 2),
    list("packageOptions", "Package dropdown options", "Add option"),
  ]),
];

const heroFields = (): Field[] => [
  text("eyebrow", "Eyebrow"),
  text("title", "Heading"),
  text("image", "Background image"),
  text("imageAlt", "Image alt text"),
];

export const charDhamPageSchema: Field[] = [
  group("meta", "Page title & SEO", metaFields),
  group("hero", "Hero", [...heroFields(), area("subtitle", "Sub-heading", 3)]),
  objects("infoBand", "Info bar", "Add item", "label", [icon(), text("label", "Text")]),
  group("packagesSection", "Packages section", [
    text("eyebrow", "Eyebrow"), text("heading", "Heading"), area("body", "Intro", 3),
  ]),
  group("inclusions", "Inclusions section", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    text("includedHeading", "Included column heading"),
    text("notIncludedHeading", "Not included column heading"),
  ]),
  group("cta", "Bottom banner", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    area("body", "Body", 3),
    area("whatsappText", "WhatsApp message", 2),
  ]),
];

export const helicopterPageSchema: Field[] = [
  group("meta", "Page title & SEO", metaFields),
  group("hero", "Hero", [...heroFields(), area("body", "Intro", 3), list("points", "Hero bullets", "Add bullet")]),
  group("benefits", "Benefits section", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    objects("items", "Benefit cards", "Add benefit", "title", featureFields),
  ]),
  group("packagesSection", "Packages section", [
    text("eyebrow", "Eyebrow"), text("heading", "Heading"), area("body", "Intro", 3),
  ]),
  group("notesSection", "Important information heading", [text("eyebrow", "Eyebrow"), text("heading", "Heading")]),
  group("cta", "Bottom banner", [
    text("heading", "Heading"),
    area("body", "Body", 3),
    text("whatsappLabel", "WhatsApp button"),
    area("whatsappText", "WhatsApp message", 2),
  ]),
];

export const destinationsPageSchema: Field[] = [
  group("meta", "Page title & SEO", metaFields),
  group("hero", "Hero", [
    ...heroFields(),
    area("body", "Intro", 3),
    text("destinationsSuffix", "Destination count suffix"),
    text("statesSuffix", "State count suffix"),
    text("groupToursLabel", "Third hero bullet"),
  ]),
  objects("stats", "Stats band", "Add stat", "label", [
    text("label", "Label"),
    text("value", "Value (blank if auto)"),
    { kind: "select", name: "auto", label: "Auto value", options: ["", "destinations", "states"], width: "half" },
  ]),
  group("search", "Search bar", [
    text("placeholder", "Search placeholder", false),
    text("allLabel", "“All states” chip"),
    text("emptyLinkLabel", "No-results link text"),
  ]),
  group("customCta", "Custom packages banner", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    area("body", "Body", 3),
    text("callPrefix", "Call button prefix"),
    text("whatsappLabel", "WhatsApp button"),
  ]),
];

export const treksPageSchema: Field[] = [
  group("meta", "Page title & SEO", metaFields),
  group("hero", "Hero", [
    ...heroFields(),
    area("body", "Intro", 3),
    objects("points", "Hero bullets", "Add bullet", "label", [icon(), text("label", "Text")]),
  ]),
  group("gradesSection", "Difficulty guide heading", [
    text("eyebrow", "Eyebrow"), text("heading", "Heading"), area("body", "Intro", 2),
  ]),
  group("search", "Search bar", [
    text("placeholder", "Search placeholder", false),
    text("filtersLabel", "Filters button"),
    text("emptyLinkLabel", "No-results link text"),
  ]),
  group("cta", "Bottom banner", [
    text("eyebrow", "Eyebrow"),
    text("heading", "Heading"),
    area("body", "Body", 3),
    text("callPrefix", "Call button prefix"),
    text("whatsappLabel", "WhatsApp button"),
    area("whatsappText", "WhatsApp message", 2),
  ]),
];
