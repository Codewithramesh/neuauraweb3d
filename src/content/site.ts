export type ProductMode = "pendant" | "wristband";
export const site = {
  name: "NEUAURA",
  version: "V1",
  category: "Business Conversation Intelligence",
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
  { label: "Platform", href: "#platform" },
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
export const workflow = [
  {
    name: "Capture",
    title: "Begin with permission.",
    description:
      "Approved audio or notes input from phones, laptops and compatible existing devices.",
    example: "Customer visit · permitted input",
    detail:
      "The software pilot can begin with existing devices. Custom hardware is a future development direction.",
  },
  {
    name: "Transcribe",
    title: "Make the conversation readable.",
    description:
      "Convert permitted conversations into text for review and reference.",
    example: "“Could you share the revised scope and product specifications?”",
    detail:
      "Illustrative transcript. Transcription capability and reliability require validation in the intended workflow.",
  },
  {
    name: "Extract",
    title: "Bring important context into focus.",
    description:
      "Identify people, organisations, needs, objections, decisions, commitments and deadlines.",
    example: "Need: updated proposal / Commitment: share revised scope",
    detail:
      "Suggested extraction is a starting point. Identity and important details must be verified by a person.",
  },
  {
    name: "Review",
    title: "A human stays in the loop.",
    description:
      "Verify and correct the extracted information before it becomes a shared business record.",
    example: "Review → correct → confirm",
    detail:
      "The workspace below lets you edit sample context and explicitly mark it reviewed.",
  },
  {
    name: "Connect",
    title: "Build a continuous relationship history.",
    description:
      "Link the interaction to confirmed people and organisation records.",
    example: "Arjun Mehta → Northstar Components → customer meeting",
    detail:
      "Connect records when identity is known and confirmed. Never infer unapproved profiles.",
  },
  {
    name: "Follow up",
    title: "Make the next step deliberate.",
    description:
      "Prepare suggested actions and reminders for user review and confirmation.",
    example: "Prepare the updated proposal → review → approve the next action",
    detail:
      "Consequential external actions require appropriate confirmation. This demo performs no external actions.",
  },
];
export const useCases = [
  {
    number: "01",
    title: "Field sales",
    label: "PRIMARY MARKET ENTRY",
    headline: "Leave the visit.\nKeep the context.",
    description:
      "Retain customer requirements, product specifications, pricing discussions, objections, decision-maker context and commercial commitments.",
    flow: [
      "Customer visit",
      "Structured requirements",
      "Sales context",
      "Follow-up actions",
    ],
    note: "An updated proposal. A clarified timeline. A next step worth remembering.",
  },
  {
    number: "02",
    title: "Business development",
    label: "INITIAL FOCUS",
    headline: "Turn a good conversation\ninto a clear next step.",
    description:
      "Organise partnership discussions, opportunities, introductions, commercial proposals, meeting outcomes and follow-up commitments.",
    flow: [
      "Partnership discussion",
      "Opportunity context",
      "Agreed outcome",
      "Reviewed next step",
    ],
    note: "A potential partner. A shared opportunity. A relationship with continuity.",
  },
];
export const roadmap = [
  {
    title: "Define",
    status: "INITIAL FOCUS",
    description:
      "One initial customer profile. One repeatable business workflow.",
  },
  {
    title: "Software prototype",
    status: "IN DEVELOPMENT",
    description:
      "Capture/import, transcription, extraction, review, search and follow-up.",
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
      "Improve usability, reliability, extraction quality and workflow fit.",
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
