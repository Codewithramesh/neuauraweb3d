import type { Commitment, Interaction, WorkspaceTab } from "../content/demo";
export interface SearchResult {
  id: string;
  type: string;
  title: string;
  text: string;
  recordId: string;
  tab: WorkspaceTab;
}
export function searchDemo(
  records: Interaction[],
  commitments: Commitment[],
  query: string,
  selectedId: string,
): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const selected = records.find((r) => r.id === selectedId) || records[0];
  const results: SearchResult[] = [];
  if (
    /customers.*(ask|need)|customer (needs|requirements)|business needs/.test(q)
  )
    return records.map((r) => ({
      id: `${r.id}-needs`,
      type: "CUSTOMER NEED",
      title: r.organisation,
      text: r.needs,
      recordId: r.id,
      tab: "Interactions",
    }));
  if (/concern|objection/.test(q))
    return records.map((r) => ({
      id: `${r.id}-concern`,
      type: "OPEN CONCERN",
      title: r.organisation,
      text: r.objection,
      recordId: r.id,
      tab: "Interactions",
    }));
  if (/commitment|pending|follow.up/.test(q)) {
    for (const c of commitments.filter((c) => !c.completed)) {
      const record = records.find((r) => r.id === c.interactionId);
      if (!record) continue;
      results.push({
        id: c.id,
        type: "PENDING COMMITMENT",
        title: c.action,
        text: `${record.organisation} · ${c.deadline} · ${c.confirmed ? "Confirmed in sample" : "Awaiting confirmation"}`,
        recordId: record.id,
        tab: "Commitments",
      });
    }
    return results;
  }
  if (/last|previous/.test(q) && /interaction|organisation/.test(q))
    return selected
      ? [
          {
            id: selected.id,
            type: "INTERACTION",
            title: selected.title,
            text: selected.summary,
            recordId: selected.id,
            tab: "Interactions",
          },
        ]
      : [];
  if (/request|need/.test(q) && /customer|last|time|request/.test(q))
    return selected
      ? [
          {
            id: `${selected.id}-needs`,
            type: "CUSTOMER NEED",
            title: selected.organisation,
            text: selected.needs,
            recordId: selected.id,
            tab: "Interactions",
          },
        ]
      : [];
  const stop = new Set([
    "what",
    "which",
    "show",
    "find",
    "the",
    "this",
    "with",
    "did",
    "was",
    "said",
    "are",
    "for",
    "and",
    "related",
    "to",
    "of",
    "a",
    "an",
    "is",
    "me",
    "all",
  ]);
  const tokens = q
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !stop.has(t));
  for (const r of records) {
    const fields = /decision/.test(q)
      ? [["DECISION", r.decision]]
      : [
          ["SUMMARY", r.summary],
          ["CUSTOMER NEED", r.needs],
          ["OBJECTION", r.objection],
          ["DECISION", r.decision],
        ];
    for (const [type, text] of fields) {
      const haystack =
        `${r.title} ${r.person} ${r.organisation} ${text}`.toLowerCase();
      const words = tokens.filter((t) => t !== "decisions" && t !== "decision");
      if (
        words.length
          ? words.some((t) => haystack.includes(t))
          : /decision/.test(q)
      )
        results.push({
          id: `${r.id}-${type}`,
          type,
          title: r.title,
          text,
          recordId: r.id,
          tab: "Interactions",
        });
    }
  }
  return results;
}
export function canConfirm(record: Interaction | undefined) {
  return record?.reviewed === true;
}
