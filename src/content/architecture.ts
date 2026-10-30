export const architectureLayers = [
  {
    name: "Customer",
    label: "REAL-WORLD INPUT",
    title: "Stay connected to the customer.",
    description:
      "Business understanding begins where customers explain what they need, what is unclear and what should happen next.",
    details: [
      "Customer visits and field conversations",
      "Products, requirements, objections and dates",
      "People and organisations, linked when identity is known",
    ],
    scope: "Initial validation: field sales and relationship workflows.",
  },
  {
    name: "Consent & capture",
    label: "CAPTURE LAYER",
    title: "Capture the interaction with permission.",
    description:
      "Approved audio or notes enter through a phone, desktop or compatible wearable. A future NEUAURA device becomes another interface to the same intelligence layer.",
    details: [
      "Informed consent and visible capture status",
      "User-controlled start, pause and stop",
      "Existing devices first; custom hardware later",
    ],
    scope: "Permission applies before recording and processing.",
  },
  {
    name: "Process & extract",
    label: "PROCESSING LAYER",
    title: "Let the intelligence work in the background.",
    description:
      "The proposed pipeline ingests permitted input, transcribes speech, cleans the text, summarises the interaction and extracts business entities into structured output.",
    details: [
      "People, organisations and products",
      "Customer needs, objections and decisions",
      "Commitments, deadlines and suggested follow-ups",
    ],
    scope:
      "Processing quality, latency, cost and reliability require pilot validation.",
  },
  {
    name: "Connect context",
    label: "CONTEXT LAYER",
    title: "Give each interaction a relationship history.",
    description:
      "Link useful context to the right customer, organisation and interaction, so the next conversation starts with what the business already knows.",
    details: [
      "Source-linked people and organisation records",
      "Searchable needs and previous interactions",
      "Correctable context with a clear record state",
    ],
    scope: "Known identity and user correction support reliable records.",
  },
  {
    name: "Business intelligence",
    label: "APPLICATION LAYER",
    title: "Help owners understand what customers are saying.",
    description:
      "Bring customer needs, open concerns and relationship updates into a useful business view. Teams can search the context and inspect the conversation behind it.",
    details: [
      "A qualitative customer briefing for owners",
      "Needs, concerns and relationship continuity",
      "Review, search, editing and basic export",
    ],
    scope:
      "Owner view shown as a concept. Advanced team analytics are a later roadmap item.",
  },
  {
    name: "BMS & CRM",
    label: "INTEGRATION LAYER",
    title: "Give business systems the missing customer context.",
    description:
      "Structured records can become useful input for Business Management Systems, CRM and team workflows, while the existing system continues to manage the business.",
    details: [
      "Basic export first",
      "APIs after the core workflow is validated",
      "Enterprise connections driven by actual pilot demand",
    ],
    scope: "Planned connectivity. No live BMS or CRM connection is claimed.",
  },
];
