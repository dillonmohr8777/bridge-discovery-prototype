import type { MemberRole } from "@/lib/types";

export type JoinStep = 1 | 2 | 3 | 4;

export type JoinField = {
  id: string;
  label: string;
  kind: "text" | "textarea";
  required: boolean;
};

export type EvidenceSlot = {
  id: string;
  label: string;
  hint: string;
  required: boolean;
};

export type JoinRole = {
  name: MemberRole;
  description: string;
  nextTitle: string;
  requirements: string;
  detailFields: JoinField[];
  evidenceSlots: EvidenceSlot[];
};

const ownerAndContact: JoinField[] = [
  { id: "contactOwner", label: "Contact owner", kind: "text", required: true },
];

const einEvidence: EvidenceSlot = {
  id: "einEvidence",
  label: "EIN confirmation",
  hint: "IRS CP 575, Letter 147C, or another approved EIN confirmation. Stored privately and never shown on a public profile.",
  required: true,
};

const licenseEvidence = (label: string, hint: string): EvidenceSlot => ({
  id: "licenseEvidence",
  label,
  hint,
  required: true,
});

const authorityEvidence: EvidenceSlot = {
  id: "authorityEvidence",
  label: "Applicant authority",
  hint: "Government-issued ID plus proof you own, manage, or represent this organization.",
  required: true,
};

function orgEvidence(licenseLabel: string, licenseHint: string): EvidenceSlot[] {
  return [einEvidence, licenseEvidence(licenseLabel, licenseHint), authorityEvidence];
}

export const joinRoles: JoinRole[] = [
  {
    name: "Brand",
    description: "Show products, markets, and retail partnership needs.",
    nextTitle: "Organization details",
    requirements: "Legal name, public name, EIN, license, location, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "publicName", label: "Public name", kind: "text", required: true },
      { id: "ein", label: "EIN", kind: "text", required: true },
      { id: "license", label: "License", kind: "text", required: true },
      { id: "location", label: "Location", kind: "text", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Cannabis license", "License number document or regulator listing for the licensed address."),
  },
  {
    name: "Dispensary",
    description: "Find brands and representatives aligned with your customers.",
    nextTitle: "Organization details",
    requirements: "Legal name, dispensary license, locations, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "dispensaryLicense", label: "Dispensary license", kind: "text", required: true },
      { id: "locations", label: "Locations", kind: "textarea", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Dispensary license", "Active dispensary license for each listed location."),
  },
  {
    name: "Retailer",
    description: "Build a verified organization profile for partner discovery.",
    nextTitle: "Organization details",
    requirements: "Legal name, retail license or permit, locations, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "retailLicense", label: "Retail license or permit", kind: "text", required: true },
      { id: "locations", label: "Locations", kind: "textarea", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Retail license or permit", "Retail license or permit covering the listed locations."),
  },
  {
    name: "Sales rep",
    description: "Represent territories, specialties, and available relationships.",
    nextTitle: "Representative details",
    requirements: "Name, territories, current lines, references, and license where a state requires one.",
    detailFields: [
      { id: "name", label: "Name", kind: "text", required: true },
      { id: "territories", label: "Territories", kind: "textarea", required: true },
      { id: "currentLines", label: "Current lines", kind: "textarea", required: true },
      { id: "references", label: "References", kind: "textarea", required: true },
      { id: "license", label: "License where a state requires one", kind: "text", required: false },
    ],
    evidenceSlots: [
      {
        id: "identityEvidence",
        label: "Identity",
        hint: "Government-issued ID for the representative named in this application.",
        required: true,
      },
      {
        id: "licenseEvidence",
        label: "License or authorization",
        hint: "State license where required, or a signed authorization from a represented brand.",
        required: false,
      },
    ],
  },
  {
    name: "Cultivator",
    description: "Share cultivation capabilities, genetics, availability, and licensed markets.",
    nextTitle: "Cultivation details",
    requirements: "Legal name, EIN, cultivation license, facilities, markets, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "ein", label: "EIN", kind: "text", required: true },
      { id: "cultivationLicense", label: "Cultivation license", kind: "text", required: true },
      { id: "facilities", label: "Facilities", kind: "textarea", required: true },
      { id: "markets", label: "Markets", kind: "text", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Cultivation license", "Active cultivation license for the listed facilities."),
  },
  {
    name: "Manufacturer",
    description: "Connect products, production capacity, brands, and retail partners.",
    nextTitle: "Manufacturing details",
    requirements: "Legal name, EIN, manufacturing license, facilities, capabilities, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "ein", label: "EIN", kind: "text", required: true },
      { id: "manufacturingLicense", label: "Manufacturing license", kind: "text", required: true },
      { id: "facilities", label: "Facilities", kind: "textarea", required: true },
      { id: "capabilities", label: "Capabilities", kind: "textarea", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Manufacturing license", "Active manufacturing license for the listed facilities."),
  },
  {
    name: "Lab",
    description: "Keep current testing contacts, services, and intake information visible.",
    nextTitle: "Laboratory details",
    requirements: "Legal name, EIN, laboratory credentials, service markets, references, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "ein", label: "EIN", kind: "text", required: true },
      { id: "laboratoryCredentials", label: "Laboratory credentials", kind: "textarea", required: true },
      { id: "serviceMarkets", label: "Service markets", kind: "text", required: true },
      { id: "references", label: "References", kind: "textarea", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Laboratory credentials", "Accreditation or laboratory credential covering the listed services."),
  },
  {
    name: "Transport",
    description: "Publish licensed routes, capacity, and operational availability.",
    nextTitle: "Transport details",
    requirements: "Legal name, EIN, transport credentials, service area, references, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "ein", label: "EIN", kind: "text", required: true },
      { id: "transportCredentials", label: "Transport credentials", kind: "textarea", required: true },
      { id: "serviceArea", label: "Service area", kind: "text", required: true },
      { id: "references", label: "References", kind: "textarea", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Transport credentials", "Transport license or credential covering the listed service area."),
  },
  {
    name: "Bank",
    description: "Support verified cannabis operators with appropriate financial services.",
    nextTitle: "Financial service details",
    requirements: "Legal name, regulated entity information, service markets, references, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "regulatedEntity", label: "Regulated entity information", kind: "textarea", required: true },
      { id: "serviceMarkets", label: "Service markets", kind: "text", required: true },
      { id: "references", label: "References", kind: "textarea", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: [
      {
        id: "regulatedEvidence",
        label: "Regulated entity evidence",
        hint: "Charter, license, or other regulated-entity confirmation. EIN is collected only when the verification policy requires it.",
        required: true,
      },
      authorityEvidence,
    ],
  },
  {
    name: "Service",
    description: "Offer HVAC, electrical, construction, legal, accounting, and facility expertise.",
    nextTitle: "Service details",
    requirements: "Legal name, EIN, credentials, cannabis references, service area, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "ein", label: "EIN", kind: "text", required: true },
      { id: "credentials", label: "Credentials", kind: "textarea", required: true },
      { id: "cannabisReferences", label: "Cannabis references", kind: "textarea", required: true },
      { id: "serviceArea", label: "Service area", kind: "text", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Professional credentials", "License, insurance, or credential that supports the listed services."),
  },
  {
    name: "Media",
    description: "Publish credible cannabis reporting, education, and market explainers.",
    nextTitle: "Publisher details",
    requirements: "Publication name, editorial contact, coverage focus, references, and disclosure policy.",
    detailFields: [
      { id: "publicationName", label: "Publication name", kind: "text", required: true },
      { id: "editorialContact", label: "Editorial contact", kind: "text", required: true },
      { id: "coverageFocus", label: "Coverage focus", kind: "textarea", required: true },
      { id: "references", label: "References", kind: "textarea", required: true },
      { id: "disclosurePolicy", label: "Disclosure policy", kind: "textarea", required: true },
    ],
    evidenceSlots: [
      {
        id: "publicationEvidence",
        label: "Publication proof",
        hint: "A masthead, about page, or other proof of the named publication.",
        required: true,
      },
      {
        id: "disclosureEvidence",
        label: "Disclosure policy",
        hint: "The written disclosure policy that will apply to Bridge coverage.",
        required: true,
      },
    ],
  },
  {
    name: "Hydroponics",
    description: "Connect cultivation teams with equipment, systems, and facility support.",
    nextTitle: "Supplier details",
    requirements: "Legal name, EIN, product categories, service markets, references, and contact owner.",
    detailFields: [
      { id: "legalName", label: "Legal name", kind: "text", required: true },
      { id: "ein", label: "EIN", kind: "text", required: true },
      { id: "productCategories", label: "Product categories", kind: "textarea", required: true },
      { id: "serviceMarkets", label: "Service markets", kind: "text", required: true },
      { id: "references", label: "References", kind: "textarea", required: true },
      ...ownerAndContact,
    ],
    evidenceSlots: orgEvidence("Business registration", "Formation or tax confirmation plus any required supplier credential."),
  },
];

export type JoinDetails = Record<string, string>;
export type JoinEvidence = Record<string, { name: string; size: number } | null>;

export type JoinApplicationInput = {
  role: MemberRole;
  details: JoinDetails;
  evidence: JoinEvidence;
  contactEmail: string;
  contactPhone: string;
};

export type JoinApplicationReceipt = {
  status: "pending_review";
  applicationId: string;
};

export function getJoinRole(name: MemberRole): JoinRole {
  return joinRoles.find((role) => role.name === name) ?? joinRoles[0];
}

export function missingDetailFields(role: JoinRole, details: JoinDetails): string[] {
  return role.detailFields
    .filter((field) => field.required && !details[field.id]?.trim())
    .map((field) => field.label);
}

export function missingEvidenceSlots(role: JoinRole, evidence: JoinEvidence): string[] {
  return role.evidenceSlots
    .filter((slot) => slot.required && !evidence[slot.id]?.name)
    .map((slot) => slot.label);
}

export function missingContactFields(email: string, phone: string): string[] {
  const missing: string[] = [];
  if (!email.trim()) missing.push("Contact email");
  if (!phone.trim()) missing.push("Contact phone");
  return missing;
}

export async function submitJoinApplication(
  input: JoinApplicationInput,
  options?: { simulateFailure?: boolean },
): Promise<JoinApplicationReceipt> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (options?.simulateFailure) {
    throw new Error("Simulated network failure");
  }
  return {
    status: "pending_review",
    applicationId: `mock-join-${input.role.toLowerCase().replace(/\s+/g, "-")}`,
  };
}
