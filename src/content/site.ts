export type ProductMode = "pendant" | "wristband";
export const site = {
  name: "NEUAURA",
  version: "V1",
  category: "Business Intelligence for Customer Relationships",
  tagline: "Human Intelligence Relationship Layer.",
  status: "Software MVP / Hardware in development",
  hardwareStatus: "Hardware concept / Industrial design in development",
  softwareStatus: "Interactive product concept",
  integrationStatus: "Planned · subject to pilot validation",
  sampleLabel: "Illustrative data — not a real customer record",
  founder: {
    name: "Ramesh Babu",
    role: "Founder, NEUAURA",
    email: "mukkararamesh2005@gmail.com",
  },
  enquiryEndpoint: import.meta.env.VITE_ENQUIRY_ENDPOINT || "",
  socialLinks: [] as { label: string; url: string }[],
};
export const founderMailto = `mailto:${site.founder.email}?subject=NEUAURA%20-%20Business%20Pilot%20Enquiry`;
export const navigation = [
  { label: "Architecture", href: "#platform" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Hardware", href: "#hardware" },
  { label: "Trust", href: "#trust" },
  { label: "Founder", href: "#founder" },
];
export const modes = [
  {
    id: "pendant" as const,
    number: "01",
    label: "Pendant",
    progress: 0,
    headline: "A minimal form.\nA purposeful presence.",
    description:
      "A future wearable concept for relevant business interactions, captured with appropriate consent.",
    details: [
      "Graphite titanium capsule",
      "Satin titanium cradle",
      "Minimal graphite chain",
      "Tactile control and visible status",
    ],
  },
  {
    id: "wristband" as const,
    number: "02",
    label: "Wristband",
    progress: 0.68,
    headline: "The same intelligence.\nA different way to wear.",
    description:
      "A screenless, watch-style configuration built around the very same detachable electronic core.",
    details: [
      "Matte, textured silicone strap",
      "Precision docking concept",
      "Minimal fastening mechanism",
      "The identical electronic core",
    ],
  },
];
export const useCases = [
  {
    number: "01",
    title: "Field sales",
    label: "INITIAL PILOT WORKFLOW",
    headline: "Understand the customer.\nKeep the relationship.",
    description:
      "Retain customer requirements, product specifications, pricing discussions, objections, decision-maker context and commercial commitments.",
    flow: [
      "Customer visit",
      "Structured requirements",
      "Sales context",
      "Business visibility",
    ],
    note: "An updated proposal. A clarified timeline. A next step worth remembering.",
  },
  {
    number: "02",
    title: "Business development",
    label: "INITIAL FOCUS",
    headline: "Connect the conversation\nto the business.",
    description:
      "Organise partnership discussions, opportunities, introductions, commercial proposals, meeting outcomes and follow-up commitments.",
    flow: [
      "Partnership discussion",
      "Opportunity context",
      "Agreed outcome",
      "Relationship intelligence",
    ],
    note: "A potential partner. A shared opportunity. A relationship with continuity.",
  },
];
export const roadmap = [
  {
    title: "Define",
    status: "INITIAL FOCUS",
    description:
      "Choose an initial customer profile, workflow and consent requirements.",
  },
  {
    title: "Software prototype",
    status: "IN DEVELOPMENT",
    description:
      "Capture/import, background processing, structured context, search and an owner view.",
  },
  {
    title: "Pilot",
    status: "PLANNED VALIDATION",
    description: "A limited B2B programme with agreed baseline measurements.",
  },
  {
    title: "Refine",
    status: "PILOT-LED",
    description:
      "Refine reliability and workflow fit. Prioritise APIs and integrations when pilot demand is validated.",
  },
  {
    title: "Wearable feasibility",
    status: "FUTURE DIRECTION",
    description:
      "Evaluate audio, battery, connectivity, controls, comfort, form and cost.",
  },
  {
    title: "Controlled hardware pilot",
    status: "SUBJECT TO VALIDATION",
    description:
      "A limited device run when the workflow and customer value justify it.",
  },
];
export const founderStatement = [
  "Business conversations are where relationships develop, customer needs become clear and important decisions take shape.",
  "Yet much of that information disappears into scattered notes, disconnected systems and forgotten follow-ups.",
  "I am building NEUAURA around a simple belief: important conversations should create lasting business context.",
  "Our goal is to combine an intelligent software layer with an evolving modular wearable ecosystem to help professionals retain what matters, connect relationships and turn conversations into meaningful action.",
  "We are starting by validating real business workflows with early pilot partners and building the technology around actual user needs.",
];
export const assetManifest = {
  source: "original-procedural-concept" as string,
  productionModelAvailable: false,
  assemblyUrl: null as string | null,
  nodeMapping: {
    core: "neuaura_core",
    pendant: "pendant_assembly",
    wristband: "wristband_assembly",
  },
  status: "Original industrial design concept. Geometry is provisional.",
};
