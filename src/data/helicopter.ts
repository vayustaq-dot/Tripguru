export type HeliStop = { time: string; title: string; detail: string };

export type HeliPackage = {
  badge: string;
  badgeTone: "primary" | "accent";
  title: string;
  subtitle: string;
  meta: string[];
  price: string;
  priceNote: string;
  highlights: string[];
  schedule: HeliStop[];
};

export const helicopterPackages: HeliPackage[] = [
  {
    "badge": "Most Booked",
    "badgeTone": "primary",
    "title": "Kedarnath Helicopter Package",
    "subtitle": "Shiva's Sacred Abode by Air",
    "meta": [
      "1 Day (Same Day Return)",
      "Min 6 Pax"
    ],
    "price": "₹8,500",
    "priceNote": "per person (one way)",
    "highlights": [
      "Helicopter from Phata / Sersi / Guptkashi",
      "Landing at Kedarnath helipad",
      "VIP darshan arrangements",
      "Puja booking assistance",
      "Return helicopter included",
      "Experienced ground coordinator"
    ],
    "schedule": [
      {
        "time": "05:30 AM",
        "title": "Report at Helipad",
        "detail": "Arrive at Phata / Sersi helipad, check-in and briefing."
      },
      {
        "time": "06:00 AM",
        "title": "Helicopter Departure",
        "detail": "Scenic 10-minute flight over the Mandakini valley to Kedarnath."
      },
      {
        "time": "06:15 AM",
        "title": "Kedarnath Arrival",
        "detail": "Land at Kedarnath helipad, proceed to temple for darshan."
      },
      {
        "time": "07:00 AM",
        "title": "Temple Darshan & Puja",
        "detail": "VIP darshan, Rudrabhishek puja (optional), explore the sacred complex."
      },
      {
        "time": "09:00 AM",
        "title": "Return Flight",
        "detail": "Helicopter return to base helipad."
      },
      {
        "time": "10:00 AM",
        "title": "Trip Concludes",
        "detail": "Transfer back to hotel / onward journey."
      }
    ]
  },
  {
    "badge": "Luxury",
    "badgeTone": "accent",
    "title": "Char Dham by Helicopter",
    "subtitle": "All 4 Dhams — 5 Days",
    "meta": [
      "5 Days / 4 Nights",
      "Private Only"
    ],
    "price": "₹1,10,000",
    "priceNote": "per person (all inclusive)",
    "highlights": [
      "All 4 Dhams by helicopter",
      "Luxury hotel stays",
      "Private helicopter charter",
      "VIP darshan at all shrines",
      "All meals (veg) included",
      "Personal priest for pujas",
      "Luxury ground transport",
      "Dedicated trip manager"
    ],
    "schedule": [
      {
        "time": "Day 1",
        "title": "Dehradun Arrival",
        "detail": "Luxury hotel check-in, welcome dinner, trip briefing."
      },
      {
        "time": "Day 2",
        "title": "Yamunotri & Gangotri",
        "detail": "Helicopter to Kharsali (Yamunotri darshan), fly to Harsil (Gangotri darshan), return."
      },
      {
        "time": "Day 3",
        "title": "Kedarnath",
        "detail": "Helicopter to Kedarnath, VIP darshan, Rudrabhishek puja, return to Dehradun."
      },
      {
        "time": "Day 4",
        "title": "Badrinath",
        "detail": "Helicopter to Badrinath, VIP Abhishek puja, Mana village, Vasudhara Falls."
      },
      {
        "time": "Day 5",
        "title": "Departure",
        "detail": "Leisure morning, transfer to Dehradun airport."
      }
    ]
  },
  {
    "badge": "Popular",
    "badgeTone": "primary",
    "title": "Do Dham Helicopter Package",
    "subtitle": "Kedarnath & Badrinath",
    "meta": [
      "3 Days / 2 Nights",
      "Min 4 Pax"
    ],
    "price": "₹28,000",
    "priceNote": "per person (twin sharing)",
    "highlights": [
      "Kedarnath & Badrinath by helicopter",
      "Comfortable hotel stays",
      "VIP darshan at both shrines",
      "All meals included",
      "Experienced guide",
      "All permits included"
    ],
    "schedule": [
      {
        "time": "Day 1",
        "title": "Dehradun → Kedarnath",
        "detail": "Drive to Phata helipad, helicopter to Kedarnath, darshan, overnight at base."
      },
      {
        "time": "Day 2",
        "title": "Kedarnath → Badrinath",
        "detail": "Morning darshan, helicopter return, drive to Badrinath, evening aarti."
      },
      {
        "time": "Day 3",
        "title": "Badrinath Darshan & Return",
        "detail": "VIP darshan, Mana village, drive back to Dehradun."
      }
    ]
  },
  {
    "badge": "New",
    "badgeTone": "primary",
    "title": "Badrinath Helicopter Package",
    "subtitle": "Vishnu's Sacred Dham by Air",
    "meta": [
      "1 Day (Same Day Return)",
      "Min 6 Pax"
    ],
    "price": "₹9,500",
    "priceNote": "per person (one way)",
    "highlights": [
      "Helicopter from Dehradun / Haridwar",
      "Landing near Badrinath",
      "VIP darshan arrangements",
      "Tapt Kund holy dip",
      "Return helicopter included",
      "Ground coordinator support"
    ],
    "schedule": [
      {
        "time": "05:00 AM",
        "title": "Report at Helipad",
        "detail": "Arrive at Sahastradhara helipad, Dehradun, check-in."
      },
      {
        "time": "06:00 AM",
        "title": "Helicopter Departure",
        "detail": "Scenic flight over the Garhwal Himalayas to Badrinath."
      },
      {
        "time": "07:00 AM",
        "title": "Badrinath Arrival",
        "detail": "Tapt Kund dip, proceed to temple for VIP darshan."
      },
      {
        "time": "08:30 AM",
        "title": "Temple Darshan & Puja",
        "detail": "Abhishek puja (optional), explore Mana village."
      },
      {
        "time": "11:00 AM",
        "title": "Return Flight",
        "detail": "Helicopter return to Dehradun."
      },
      {
        "time": "12:30 PM",
        "title": "Trip Concludes",
        "detail": "Transfer back to hotel / onward journey."
      }
    ]
  }
];

export const helicopterNotes: string[] = [
  "Helicopter services are subject to weather conditions and DGCA regulations. Flights may be cancelled or rescheduled due to bad weather.",
  "Passengers must carry a valid government-issued photo ID. Weight limit per passenger is typically 80 kg (including luggage).",
  "Helicopter packages are available from May to June and September to November (season dependent).",
  "Advance booking of at least 15–30 days is strongly recommended, especially during peak season.",
  "Prices are indicative and subject to change based on availability and season. Final pricing confirmed at booking.",
  "Medical fitness is required. Passengers with serious heart conditions or respiratory issues should consult a doctor before booking."
];
