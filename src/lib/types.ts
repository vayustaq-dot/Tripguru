export type ItineraryStop = {
  stage: string;
  detail: string;
};

export type TourPackage = {
  image: string;
  badge: string;
  badgeTone: "primary" | "accent";
  title: string;
  subtitle: string;
  price: string;
  /** [duration, group size, starting point] */
  meta: string[];
  features: string[];
  itinerary: ItineraryStop[];
};
