export type WorkspaceTab =
  | "Overview"
  | "Interactions"
  | "People"
  | "Organisations"
  | "Commitments"
  | "Follow-ups"
  | "Search";
export const workspaceTabs: WorkspaceTab[] = [
  "Overview",
  "Interactions",
  "People",
  "Organisations",
  "Commitments",
  "Follow-ups",
  "Search",
];
export interface Interaction {
  id: string;
  title: string;
  date: string;
  kind: "Field sales" | "Business development" | "Service & operations";
  person: string;
  organisation: string;
  role: string;
  initials: string;
  transcript: { speaker: string; text: string }[];
  summary: string;
  needs: string;
  objection: string;
  decision: string;
  reviewed: boolean;
}
export interface Commitment {
  id: string;
  interactionId: string;
  action: string;
  owner: string;
  deadline: string;
  confirmed: boolean;
  completed: boolean;
  followUp: string;
}
export const initialInteractions: Interaction[] = [
  {
    id: "northstar-01",
    title: "Northstar · Customer visit",
    date: "23 Oct 2026",
    kind: "Field sales",
    person: "Arjun Mehta",
    organisation: "Northstar Components",
    role: "Procurement lead · fictional",
    initials: "AM",
    transcript: [
      {
        speaker: "Arjun Mehta",
        text: "We need an updated proposal and product specifications to plan our next purchase.",
      },
      {
        speaker: "Demo representative",
        text: "I can share the revised scope and product specifications by Friday.",
      },
      {
        speaker: "Arjun Mehta",
        text: "The implementation timeline is unclear. Please include a delivery schedule in the revised proposal.",
      },
    ],
    summary:
      "Arjun needs product specifications and a revised proposal to plan the next purchase. The implementation timeline remains unclear; a delivery schedule would help.",
    needs: "Updated proposal and product specifications.",
    objection: "Implementation timeline needs clarification.",
    decision: "Include a delivery schedule in the revised proposal.",
    reviewed: false,
  },
  {
    id: "meridian-02",
    title: "Meridian · Partnership discussion",
    date: "22 Oct 2026",
    kind: "Business development",
    person: "Leena Rao",
    organisation: "Meridian Studio",
    role: "Partnerships lead · fictional",
    initials: "LR",
    transcript: [
      {
        speaker: "Leena Rao",
        text: "We would like to understand the proposed partner workflow and responsibilities.",
      },
      {
        speaker: "Demo representative",
        text: "I will prepare a short partnership outline for review next week.",
      },
      {
        speaker: "Leena Rao",
        text: "Let’s review the outline before planning a further discussion.",
      },
    ],
    summary:
      "Leena discussed a potential partner workflow. Responsibilities need clarification. Both parties proposed reviewing a partnership outline before the next discussion.",
    needs: "A partnership outline and a clear division of responsibilities.",
    objection: "Partner responsibilities need clarification.",
    decision: "Review a partnership outline before the next discussion.",
    reviewed: false,
  },
  {
    id: "service-03",
    title: "Cedarfield · Service visit",
    date: "24 Oct 2026",
    kind: "Service & operations",
    person: "Priya Sen",
    organisation: "Cedarfield Services",
    role: "Operations contact · fictional",
    initials: "PS",
    transcript: [
      {
        speaker: "Priya Sen",
        text: "We need a service plan for the equipment at our two customer sites.",
      },
      {
        speaker: "Demo representative",
        text: "I will prepare service options and an escalation contact by Monday.",
      },
      {
        speaker: "Priya Sen",
        text: "Response times have been unclear. Please include a written support schedule.",
      },
    ],
    summary:
      "Priya requested a service plan across two customer sites. Unclear response times are an open concern. Service options, a support schedule and an escalation contact would help.",
    needs:
      "A service plan for two customer sites and a written support schedule.",
    objection: "Service response times and escalation contacts are unclear.",
    decision: "Compare service options with a written support schedule.",
    reviewed: false,
  },
];
export const initialCommitments: Commitment[] = [
  {
    id: "commitment-01",
    interactionId: "northstar-01",
    action: "Share revised scope",
    owner: "Demo representative",
    deadline: "Friday · sample deadline",
    confirmed: false,
    completed: false,
    followUp:
      "Prepare an updated proposal with specifications and a delivery schedule.",
  },
  {
    id: "commitment-02",
    interactionId: "meridian-02",
    action: "Prepare partnership outline",
    owner: "Demo representative",
    deadline: "Next week · sample deadline",
    confirmed: false,
    completed: false,
    followUp:
      "Prepare a partnership outline for review before the next discussion.",
  },
  {
    id: "commitment-03",
    interactionId: "service-03",
    action: "Prepare service options and escalation contact",
    owner: "Demo representative",
    deadline: "Monday · sample deadline",
    confirmed: false,
    completed: false,
    followUp:
      "Prepare service options and a written support schedule for the customer.",
  },
];
export const sampleQueries = [
  "What are customers asking for?",
  "Which customer concerns are open?",
  "What did this customer request last time?",
  "Which commitments are pending?",
  "Show decisions related to the revised proposal.",
  "Find the last interaction with this organisation.",
];
export interface GraphEntity {
  id: string;
  type: string;
  title: string;
  description: string;
  recordId: string;
  tab: WorkspaceTab;
  x: number;
  y: number;
}
export const graphEntities: GraphEntity[] = [
  {
    id: "person",
    type: "PERSON",
    title: "Arjun Mehta",
    description:
      "A fictional contact linked to a confirmed organisation and a sample customer visit.",
    recordId: "northstar-01",
    tab: "People",
    x: 19,
    y: 29,
  },
  {
    id: "organisation",
    type: "ORGANISATION",
    title: "Northstar Components",
    description:
      "A fictional organisation with a continuous record of interactions, requirements and open commitments.",
    recordId: "northstar-01",
    tab: "Organisations",
    x: 19,
    y: 72,
  },
  {
    id: "interaction",
    type: "INTERACTION",
    title: "Customer visit",
    description:
      "The source interaction connects the person, organisation and extracted business context. Open it to review the illustrative transcript.",
    recordId: "northstar-01",
    tab: "Interactions",
    x: 45,
    y: 48,
  },
  {
    id: "need",
    type: "CUSTOMER NEED",
    title: "Updated proposal & specifications",
    description:
      "Arjun requested an updated proposal and product specifications. The extracted requirement remains subject to human review.",
    recordId: "northstar-01",
    tab: "Interactions",
    x: 75,
    y: 15,
  },
  {
    id: "objection",
    type: "OBJECTION",
    title: "Clarify implementation timeline",
    description:
      "The implementation timeline needs clarification. Retain the objection alongside its source context.",
    recordId: "northstar-01",
    tab: "Interactions",
    x: 79,
    y: 39,
  },
  {
    id: "decision",
    type: "DECISION",
    title: "Include a delivery schedule",
    description:
      "A delivery schedule requested in the fictional customer visit, linked to the original source and available for correction.",
    recordId: "northstar-01",
    tab: "Interactions",
    x: 78,
    y: 64,
  },
  {
    id: "commitment",
    type: "COMMITMENT",
    title: "Share revised scope",
    description:
      "A suggested commitment owned by the demo representative. It needs explicit user confirmation.",
    recordId: "northstar-01",
    tab: "Commitments",
    x: 67,
    y: 86,
  },
  {
    id: "deadline",
    type: "DEADLINE",
    title: "Friday",
    description:
      "The illustrative deadline mentioned in the source conversation. Confirm timing before relying on it.",
    recordId: "northstar-01",
    tab: "Commitments",
    x: 40,
    y: 88,
  },
  {
    id: "followup",
    type: "FOLLOW-UP ACTION",
    title: "Updated proposal & schedule",
    description:
      "Prepare an updated proposal with specifications and a delivery schedule. Review extracted context and confirm any consequential action first.",
    recordId: "northstar-01",
    tab: "Follow-ups",
    x: 45,
    y: 12,
  },
];
export const graphEdges = [
  ["person", "organisation"],
  ["person", "interaction"],
  ["organisation", "interaction"],
  ["interaction", "need"],
  ["interaction", "objection"],
  ["interaction", "decision"],
  ["decision", "commitment"],
  ["commitment", "deadline"],
  ["commitment", "followup"],
  ["interaction", "followup"],
];
