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
const { initialInteractions: records, initialCommitments: commitments } =
  await bundle("src/content/demo.ts");
const { buildBusinessContext } = await bundle("src/lib/intelligence.ts");
const { searchDemo } = await bundle("src/lib/demo.ts");
for (const record of records) {
  const output = buildBusinessContext(record, commitments);
  assert.equal(output.interactionId, record.id);
  assert.equal(output.context.customerNeed, record.needs);
  assert.equal(output.context.openConcern, record.objection);
  assert.equal(output.source.organisation, record.organisation);
  assert.equal(output.recordState, "draft_requires_review");
  assert.equal(
    output.destination.connection,
    "preview_only_no_external_connection",
  );
  assert(
    output.context.commitments.every((c) =>
      commitments.some(
        (x) => x.interactionId === record.id && x.action === c.action,
      ),
    ),
    "No cross-customer commitment leakage",
  );
  assert.equal(
    buildBusinessContext({ ...record, reviewed: true }, commitments)
      .recordState,
    "reviewed_sample",
  );
}
assert.equal(
  searchDemo(
    records,
    commitments,
    "What are customers asking for?",
    "northstar-01",
  ).length,
  records.length,
);
assert.equal(
  searchDemo(
    records,
    commitments,
    "Which customer concerns are open?",
    "northstar-01",
  ).length,
  records.length,
);
const service = records.filter((r) => r.kind === "Service & operations");
assert.equal(service.length, 1);
assert(
  searchDemo(service, commitments, "customer needs", "service-03").every(
    (r) => r.recordId === "service-03",
  ),
);
console.log(
  "PASS · three business workflows · source-linked needs and concerns · customer-isolated commitments · draft/review state · preview-only BMS payload",
);
