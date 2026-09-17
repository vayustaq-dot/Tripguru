export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/char-dham", label: "Char Dham" },
  { href: "/helicopter", label: "Helicopter" },
  { href: "/packages", label: "Temple Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const packageOptions = [
  { value: "char-dham", label: "Char Dham Yatra" },
  { value: "helicopter", label: "Helicopter Packages" },
  { value: "kedarnath", label: "Kedarnath Package" },
  { value: "badrinath", label: "Badrinath Package" },
  { value: "varanasi", label: "Varanasi / Kashi" },
  { value: "other", label: "Other Temple Package" },
] as const;
