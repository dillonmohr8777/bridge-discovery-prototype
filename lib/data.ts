import type { Profile } from "./types";

// All member data is fictional sample content for the discovery prototype.
export const profiles: Profile[] = [
  {
    slug: "cascade-canna",
    name: "Cascade Canna Co.",
    role: "Brand",
    location: "Portland, Oregon",
    description: "Small-batch edibles built for dependable retail velocity.",
    specialties: ["Edibles", "Wholesale", "Woman-owned"],
    verified: true,
    initials: "CC",
    serving: "Serving Oregon and Washington",
    about:
      "Cascade creates small-batch edibles for independent dispensaries that want dependable sell-through, transparent ingredients, and responsive wholesale support.",
    lookingFor: ["Retail partnerships", "Regional distributors", "Event collaboration"],
    announcement: {
      title: "Now accepting Washington retail partners",
      body: "Our summer wholesale calendar is open through August 31.",
    },
  },
  {
    slug: "harbor-dispensary",
    name: "Harbor Dispensary",
    role: "Dispensary",
    location: "Baltimore, Maryland",
    description: "Community-first dispensary seeking premium regional partners.",
    specialties: ["Retail", "Education", "Maryland"],
    verified: true,
    initials: "HD",
    serving: "Serving the Baltimore metro area",
    about:
      "Harbor pairs a curated shelf with patient education, and looks for brands that can support in-store training and consistent regional supply.",
    lookingFor: ["Premium brands", "Educational partners", "Local events"],
    announcement: {
      title: "Fall shelf reset planning has started",
      body: "Submitting brands should share wholesale menus by September 15.",
    },
  },
  {
    slug: "northstar-sales",
    name: "Northstar Sales Group",
    role: "Sales rep",
    location: "Chicago, Illinois",
    description: "Multi-state representation for emerging cannabis operators.",
    specialties: ["Distribution", "B2B", "Midwest"],
    verified: false,
    initials: "NS",
    serving: "Serving Illinois, Michigan, and Missouri",
    about:
      "Northstar represents emerging brands across the Midwest with an emphasis on route density, retail education, and honest sell-through reporting.",
    lookingFor: ["Brands entering the Midwest", "Territory expansion", "Retail introductions"],
  },
  {
    slug: "mosaic-market",
    name: "Mosaic Market",
    role: "Retailer",
    location: "Phoenix, Arizona",
    description: "A curated retail network focused on trusted customer experiences.",
    specialties: ["Retail", "Multi-location", "Arizona"],
    verified: true,
    initials: "MM",
    serving: "Serving greater Phoenix from three locations",
    about:
      "Mosaic operates three storefronts with a shared buying team and looks for brands and representatives that can service multiple locations reliably.",
    lookingFor: ["Multi-store supply", "Category exclusives", "Merchandising support"],
  },
  {
    slug: "greenline-goods",
    name: "Greenline Goods",
    role: "Brand",
    location: "Trenton, New Jersey",
    description: "Modern wellness products with transparent sourcing.",
    specialties: ["Wellness", "CBD", "New Jersey"],
    verified: true,
    initials: "GG",
    serving: "Serving New Jersey and Pennsylvania",
    about:
      "Greenline builds wellness-focused products with published sourcing and third-party testing, aimed at retailers who lead with education.",
    lookingFor: ["East-coast retailers", "Distribution partners", "Wellness collaborations"],
    announcement: {
      title: "New lab-verified tincture line",
      body: "Wholesale samples are available for verified retail partners.",
    },
  },
  {
    slug: "union-street",
    name: "Union Street Collective",
    role: "Dispensary",
    location: "Boston, Massachusetts",
    description: "Independent operator building a stronger local supply chain.",
    specialties: ["Retail", "Local", "Massachusetts"],
    verified: false,
    initials: "US",
    serving: "Serving Boston and the North Shore",
    about:
      "Union Street prioritizes Massachusetts-grown supply and partners with local operators who value shorter, more transparent supply chains.",
    lookingFor: ["Local cultivators", "Craft brands", "Community events"],
  },
];

export function getProfile(slug: string): Profile | undefined {
  return profiles.find((profile) => profile.slug === slug);
}
