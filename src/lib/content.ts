import "server-only";
import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import type { TourPackage } from "@/lib/types";
import type { HeliPackage } from "@/data/helicopter";
import type { StateGroup } from "@/data/packages";
import type { Grade, Trek } from "@/data/trekking";

/**
 * Content lives as JSON on disk rather than in a database: the whole site is
 * well under a hundred records, one person edits it at a time, and keeping it
 * as files means every change is diffable in git.
 */
const CONTENT_DIR = process.env.CONTENT_DIR || join(process.cwd(), "content");

export type SiteSettings = {
  name: string;
  logo: string;
  domain: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  instagram: string;
  sisterFirm: { name: string; href: string };
  address: string;
};

export type CharDhamContent = {
  packages: TourPackage[];
  included: string[];
  notIncluded: string[];
  page: CharDhamPage;
};

export type HelicopterContent = { packages: HeliPackage[]; notes: string[]; page: HelicopterPage };
export type DestinationsContent = { stateGroups: StateGroup[]; page: DestinationsPage };
export type TreksContent = {
  treks: Trek[];
  grades: Grade[];
  stats: { value: string; label: string }[];
  page: TreksPage;
};

export type Enquiry = {
  id: string;
  receivedAt: string;
  source: "contact" | "home";
  name: string;
  phone: string;
  email?: string;
  package?: string;
  pilgrims?: string;
  date?: string;
  message?: string;
  read: boolean;
};

export type Cta = { label: string; href: string };
export type IconItem = { icon: string; label: string };
export type FeatureItem = { icon: string; title: string; body: string };
export type PathCard = { href: string; image: string; alt: string; title: string; body: string; eyebrow?: string };
export type FeaturedItem = {
  ref: string;
  source: string;
  badge: string;
  image: string;
  alt: string;
  title: string;
  duration: string;
  price: string;
};
export type Testimonial = { quote: string; name: string; trip: string };

export type HomeContent = {
  hero: {
    image: string; imageAlt: string; eyebrow: string; titleTop: string;
    titleAccent: string; body: string; primaryCta: Cta; secondaryCta: Cta;
  };
  trustBadges: IconItem[];
  paths: { eyebrow: string; heading: string; linkLabel: string; primary: PathCard; cards: PathCard[] };
  whyUs: {
    eyebrow: string; heading: string; body: string; image: string; imageAlt: string;
    statValue: string; statLabel: string; features: FeatureItem[];
  };
  featured: {
    eyebrow: string; heading: string; priceNote: string; priceLabel: string;
    itemCtaLabel: string; itemCtaHref: string; ctaLabel: string; ctaHref: string;
    items: FeaturedItem[];
  };
  testimonials: { eyebrow: string; heading: string; items: Testimonial[] };
  cta: {
    image: string; imageAlt: string; eyebrow: string; lineOne: string; lineTwo: string;
    formEyebrow: string; formHeading: string; formBody: string; locationLabel: string;
  };
};

export type StatItem = { icon: string; value: string; label: string };
export type TeamMember = { name: string; role: string; bio: string };

export type AboutContent = {
  meta: { title: string; description: string };
  hero: { image: string; imageAlt: string; eyebrow: string; title: string; subtitle: string };
  stats: StatItem[];
  story: {
    eyebrow: string; headingLineOne: string; headingLineTwo: string;
    paraOne: string; paraTwo: string; paraThreeBefore: string; paraThreeAfter: string;
    image: string; imageAlt: string; badgeValue: string; badgeLabel: string; assurances: string[];
  };
  values: { eyebrow: string; heading: string; items: FeatureItem[] };
  team: { eyebrow: string; heading: string; members: TeamMember[] };
  office: {
    eyebrow: string; heading: string; addressLabel: string; phoneLabel: string;
    whatsappPrefix: string; emailLabel: string; sisterLabel: string;
  };
  ctaCard: {
    eyebrow: string; heading: string; body: string; whatsappLabel: string;
    callPrefix: string; enquiryLabel: string; enquiryHref: string;
  };
};

export type ContactCard = { kind: string; icon: string; kicker: string; note: string };

export type ContactContent = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; body: string };
  bar: { callPrefix: string; whatsappPrefix: string };
  form: { eyebrow: string; heading: string };
  details: {
    eyebrow: string; heading: string; cards: ContactCard[];
    addressKicker: string; hoursKicker: string; hoursPrimary: string; hoursSecondary: string;
    whatsappCtaLabel: string; whatsappPrefill: string;
  };
};

export type Meta = { title: string; description: string };
export type Section = { eyebrow?: string; heading: string; body?: string };

export type CharDhamPage = {
  meta: Meta;
  hero: { image: string; imageAlt: string; eyebrow: string; title: string; subtitle: string };
  infoBand: IconItem[];
  packagesSection: Section;
  inclusions: { eyebrow: string; heading: string; includedHeading: string; notIncludedHeading: string };
  cta: { eyebrow: string; heading: string; body: string; whatsappText: string };
};

export type HelicopterPage = {
  meta: Meta;
  hero: { image: string; imageAlt: string; eyebrow: string; title: string; body: string; points: string[] };
  benefits: { eyebrow: string; heading: string; items: FeatureItem[] };
  packagesSection: Section;
  notesSection: { eyebrow: string; heading: string };
  cta: { heading: string; body: string; whatsappText: string; whatsappLabel: string };
};

export type DestinationsPage = {
  meta: Meta;
  hero: {
    image: string; imageAlt: string; eyebrow: string; title: string; body: string;
    groupToursLabel: string; destinationsSuffix: string; statesSuffix: string;
  };
  stats: { value: string; label: string; auto: string }[];
  search: { placeholder: string; allLabel: string; emptyLinkLabel: string };
  customCta: { eyebrow: string; heading: string; body: string; callPrefix: string; whatsappLabel: string };
};

export type TreksPage = {
  meta: Meta;
  hero: { image: string; imageAlt: string; eyebrow: string; title: string; body: string; points: IconItem[] };
  gradesSection: Section;
  search: { placeholder: string; filtersLabel: string; emptyLinkLabel: string };
  cta: { eyebrow: string; heading: string; body: string; callPrefix: string; whatsappLabel: string; whatsappText: string };
};

export type NavLink = { label: string; href: string };

export type NavContent = {
  links: NavLink[];
  trekking: NavLink;
  bookNow: NavLink;
};

export type FooterContent = {
  blurb: string;
  quote: string;
  columns: { heading: string; links: NavLink[] }[];
  contactHeading: string;
  whatsappLabel: string;
  legal: {
    rightsText: string;
    sisterPrefix: string;
    privacy: NavLink;
    terms: NavLink;
  };
  floating: { instagramTooltip: string; whatsappTooltip: string };
};

export type LabelsContent = {
  packageCard: {
    priceLabel: string; perPerson: string; itineraryLabel: string;
    whatsappLabel: string; callLabel: string; enquiryTemplate: string;
  };
  heliCard: {
    priceLabel: string; highlightsHeading: string; scheduleHeading: string; ratedLabel: string;
    whatsappLabel: string; bookLabel: string; bookHref: string; enquiryTemplate: string;
  };
  destinationCard: {
    whatsappLabel: string; quoteLabel: string; quoteHref: string; enquiryTemplate: string;
    countSuffixOne: string; countSuffixMany: string;
  };
  trekCard: {
    perPerson: string; whatsappLabel: string; bookLabel: string; bookHref: string;
    foundSuffixOne: string; foundSuffixMany: string; difficultyLabel: string;
    regionLabel: string; allLabel: string; enquiryTemplate: string;
  };
  homeForm: {
    namePlaceholder: string; phonePlaceholder: string; packagePlaceholder: string;
    messagePlaceholder: string; submitLabel: string; sendingLabel: string; sentLabel: string;
    thanksMessage: string; packageOptions: string[];
  };
  contactForm: {
    nameLabel: string; namePlaceholder: string; phoneLabel: string; phonePlaceholder: string;
    emailLabel: string; emailPlaceholder: string; packageLabel: string; packagePlaceholder: string;
    pilgrimsLabel: string; pilgrimsPlaceholder: string; dateLabel: string; messageLabel: string;
    messagePlaceholder: string; submitLabel: string; sendingLabel: string; sentLabel: string;
    thanksMessage: string; packageOptions: string[];
  };
};

export type EnquiriesContent = { items: Enquiry[] };

type Files = {
  site: SiteSettings;
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  nav: NavContent;
  footer: FooterContent;
  labels: LabelsContent;
  "char-dham": CharDhamContent;
  helicopter: HelicopterContent;
  destinations: DestinationsContent;
  treks: TreksContent;
  enquiries: EnquiriesContent;
};

export async function readContent<K extends keyof Files>(name: K): Promise<Files[K]> {
  const raw = await readFile(join(CONTENT_DIR, `${name}.json`), "utf8");
  return JSON.parse(raw) as Files[K];
}

/**
 * Write to a temp file and rename, so a crash mid-write cannot leave a
 * half-written file that would break the public site on next read.
 */
export async function writeContent<K extends keyof Files>(name: K, data: Files[K]): Promise<void> {
  const target = join(CONTENT_DIR, `${name}.json`);
  await mkdir(dirname(target), { recursive: true });
  const tmp = `${target}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  await rename(tmp, target);
}

export const getSite = () => readContent("site");
export const getHome = () => readContent("home");
export const getAbout = () => readContent("about");
export const getContact = () => readContent("contact");
export const getNav = () => readContent("nav");
export const getFooter = () => readContent("footer");
export const getLabels = () => readContent("labels");
export const getCharDham = () => readContent("char-dham");
export const getHelicopter = () => readContent("helicopter");
export const getDestinations = () => readContent("destinations");
export const getTreks = () => readContent("treks");
export const getEnquiries = () => readContent("enquiries");
