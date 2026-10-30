import assert from "node:assert/strict";
import { build } from "esbuild";
async function bundle(entry) {
  const { outputFiles } = await build({
    entryPoints: [entry],
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`
  );
}
const {
  initialInteractions: records,
  initialCommitments: commitments,
  sampleQueries,
} = await bundle("src/content/demo.ts");
const { searchDemo, canConfirm } = await bundle("src/lib/demo.ts");
for (const q of sampleQueries)
  assert(
    searchDemo(records, commitments, q, "northstar-01").length > 0,
    `Query should resolve actual data: ${q}`,
  );
assert.equal(
  searchDemo(records, commitments, "unknownabcdefgh", "northstar-01").length,
  0,
);
assert.equal(searchDemo(records, commitments, "", "northstar-01").length, 0);
assert(
  searchDemo(
    records,
    commitments,
    "What did this customer request last time?",
    "meridian-02",
  ).every((r) => r.recordId === "meridian-02"),
  "Selected relationship scopes customer context",
);
assert.equal(
  searchDemo(
    records,
    commitments.map((c) => ({ ...c, completed: true })),
    "Which commitments are pending?",
    "northstar-01",
  ).length,
  0,
  "Completed actions leave pending results",
);
const edited = records.map((r) => ({
  ...r,
  needs: "Replacement specification requirement",
  reviewed: true,
}));
assert(
  searchDemo(edited, commitments, "replacement", "northstar-01").some((r) =>
    r.text.includes("Replacement specification"),
  ),
  "Edited context is searchable",
);
assert.equal(canConfirm(undefined), false);
assert.equal(
  canConfirm(records[0]),
  false,
  "Unreviewed extraction cannot be confirmed",
);
assert.equal(
  canConfirm(edited[0]),
  true,
  "Human review opens the confirmation gate",
);
console.log(
  "PASS · all six sample queries · record scope · empty search · edited context · pending completion · review gate",
);
