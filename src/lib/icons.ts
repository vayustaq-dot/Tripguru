import {
  Award,
  Calendar,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleCheckBig,
  Clock,
  Footprints,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Plane,
  Send,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Content stores icons by name so they can be chosen in the admin.
 * Anything unrecognised falls back to a neutral mark rather than crashing.
 */
export const icons = {
  Award,
  Calendar,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleCheckBig,
  Clock,
  Footprints,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Plane,
  Send,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

export function iconFor(name: string | undefined): LucideIcon {
  return icons[name as IconName] ?? CircleCheck;
}
