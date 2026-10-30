import type { Commitment, Interaction } from "../content/demo";
export function buildBusinessContext(
  record: Interaction,
  commitments: Commitment[],
) {
  return {
    notice:
      "Fictional local demonstration. Not transmitted to any business system.",
    interactionId: record.id,
    workflow: record.kind,
    source: {
      person: record.person,
      organisation: record.organisation,
      date: record.date,
      input: "Illustrative consented conversation",
    },
    context: {
      summary: record.summary,
      customerNeed: record.needs,
      openConcern: record.objection,
      decision: record.decision,
      commitments: commitments
        .filter((c) => c.interactionId === record.id)
        .map((c) => ({
          action: c.action,
          owner: c.owner,
          deadline: c.deadline,
          confirmed: c.confirmed,
        })),
    },
    recordState: record.reviewed ? "reviewed_sample" : "draft_requires_review",
    destination: {
      categories: ["Business Management System", "CRM", "Owner workspace"],
      connection: "preview_only_no_external_connection",
    },
  };
}
