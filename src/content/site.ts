export type ProductMode = "glasses" | "wristband" | "pendant";
export const site = {
  name: "NEUAURA",
  status: "Concept / MVP in development",
  enquiryEndpoint: import.meta.env.VITE_ENQUIRY_ENDPOINT || "",
  socialLinks: [] as { label: string; url: string }[],
};
export const navigation = [
  { label: "Product", href: "#product" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "For business", href: "#business" },
  { label: "Our vision", href: "#accessibility" },
];
export const modes: {
  id: ProductMode;
  number: string;
  label: string;
  headline: string;
  description: string;
  details: string[];
  progress: number;
}[] = [
  {
    id: "glasses",
    number: "01",
    label: "Glasses",
    headline: "A familiar form.\nA new perspective.",
    description:
      "Everyday eyewear. A modular intelligence core. Designed to bring useful context closer, without getting in the way.",
    details: [
      "Smoked graphite frame",
      "Integrated camera housing concept",
      "Discreet microphone apertures",
      "Detachable right temple core",
    ],
    progress: 0,
  },
  {
    id: "wristband",
    number: "02",
    label: "Wristband",
    headline: "Your context.\nAlways at hand.",
    description:
      "The same electronic core, docked into a precision cradle. A compact configuration designed for a different rhythm.",
    details: [
      "Matte graphite strap",
      "Titanium docking cradle",
      "The same detachable electronics",
      "An ergonomic, considered silhouette",
    ],
    progress: 0.53,
  },
  {
    id: "pendant",
    number: "03",
    label: "Pendant",
    headline: "Less to carry.\nMore to connect.",
    description:
      "One core. An alternative everyday wearable form. A minimal pendant attachment keeps the intelligence close.",
    details: [
      "Satin titanium attachment",
      "Dark graphite chain",
      "Unchanged electronic core",
      "A quietly minimal design",
    ],
    progress: 0.81,
  },
];
export const roadmap = [
  {
    number: "01",
    title: "Industrial design",
    description:
      "Exploring the wearable forms and a shared modular architecture.",
    status: "Concept development",
  },
  {
    number: "02",
    title: "Software MVP",
    description:
      "Developing conversation processing, context and the intelligence dashboard.",
    status: "In development",
  },
  {
    number: "03",
    title: "Hardware integration",
    description:
      "Bringing the electronic core and the software platform together.",
    status: "Planned",
  },
  {
    number: "04",
    title: "Pilot validation",
    description:
      "Testing actual configurations and workflows with real people.",
    status: "Planned",
  },
];
export const useCases = [
  {
    id: "experience",
    name: "Customer experience",
    title: "Hear the patterns behind the conversations.",
    description:
      "From waiting times to service preferences, consented customer feedback could become structured themes that help teams see what matters.",
    themes: ["Waiting times", "Product quality", "Service experience"],
    note: "Explore recurring customer feedback",
    task: "Review feedback with the service team",
    observation: "Several sample conversations mention the collection queue.",
  },
  {
    id: "operations",
    name: "Frontline operations",
    title: "Bring the floor closer to the people making decisions.",
    description:
      "A development direction for cafes, restaurants, retail and service teams: organise recurring observations so operational issues are easier to spot.",
    themes: ["Shift handovers", "Stock availability", "Service flow"],
    note: "Surface recurring operational observations",
    task: "Discuss the shift handover process",
    observation:
      "A sample handover raises a question about product availability.",
  },
  {
    id: "team",
    name: "Team intelligence",
    title: "Keep the context. Carry the conversation forward.",
    description:
      "Turn consented discussions and verbal commitments into useful summaries, decisions and proposed follow-ups that people can review.",
    themes: ["Decisions", "Commitments", "Next steps"],
    note: "Retain important discussion context",
    task: "Review and assign the proposed follow-up",
    observation:
      "A sample team discussion includes a decision to revisit the proposal.",
  },
  {
    id: "systems",
    name: "Business systems",
    title: "Intelligence on top of your existing systems.",
    description:
      "A planned connection layer between useful real-world context and the calendars, tasks, dashboards and business management systems you already use.",
    themes: ["Business context", "Task management", "Planned connections"],
    note: "Connect context to authorised workflows",
    task: "Review the proposed workflow connection",
    observation:
      "A sample conversation suggests a follow-up for the operations board.",
  },
];
// No vendor asset has been supplied. Set a path only after inspecting its node hierarchy.
export const assetManifest = {
  source: "original-procedural-concept" as const,
  productionModelAvailable: false,
  assemblyUrl: null as string | null,
  nodeMapping: {
    frame: "glasses_frame",
    leftTemple: "left_temple",
    rightTemple: "right_temple",
    core: "neuaura_core",
    rail: "docking_rail",
    alignment: "alignment_components",
    wristband: "wristband_assembly",
    pendant: "pendant_assembly",
  },
  status: "Original concept visualisation. Product geometry is provisional.",
};
