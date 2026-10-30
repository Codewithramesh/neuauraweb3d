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
  kind: "Field sales" | "Business development";
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
    title: "Northstar · Customer meeting",
    date: "23 Oct 2026",
    kind: "Field sales",
    person: "Arjun Mehta",
    organisation: "Northstar Components",
    role: "Procurement lead · fictional",
    initials: "AM",
    transcript: [
      {
        speaker: "Arjun Mehta",
        text: "We would like the updated proposal and product specifications before the next review.",
      },
      {
        speaker: "Demo representative",
        text: "I can share a revised scope by Friday, after our internal approval.",
      },
      {
        speaker: "Arjun Mehta",
        text: "The implementation timeline still needs clarification. Let’s review the revised proposal first.",
      },
    ],
    summary:
      "Arjun requested an updated proposal and product specifications. The implementation timeline needs clarification. The next step is to review a revised proposal.",
    needs: "Updated proposal and product specifications.",
    objection: "Implementation timeline needs clarification.",
    decision: "Review the revised proposal.",
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
    followUp: "Prepare and send the updated proposal after approval.",
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
];
export const sampleQueries = [
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
      "A fictional contact linked to a confirmed organisation and a sample customer meeting.",
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
    title: "Customer meeting",
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
    title: "Review the revised proposal",
    description:
      "A proposed decision extracted from the sample meeting, available for verification and correction.",
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
    title: "Prepare proposal after approval",
    description:
      "Prepare and send the updated proposal after approval. Review extracted context and confirm any consequential action first.",
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
