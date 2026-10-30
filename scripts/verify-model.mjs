import assert from "node:assert/strict";
import { build } from "esbuild";

// Exercise the actual model factory without a browser or GPU. This protects the
// brief's central constraint: one unchanged core through every mechanical pose.
const { outputFiles } = await build({
  entryPoints: ["src/components/three/assembly.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  define: { "import.meta.env": "{}" },
});
const { createConceptAssembly, applyAssemblyPose, disposeAssembly } =
  await import(
    `data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`
  );
const assembly = createConceptAssembly();
const core = assembly.core;
const camera = core.getObjectByName("core_camera");
const button = core.getObjectByName("core_button");
const indicator = core.getObjectByName("core_indicator");
assert(
  camera && button && indicator,
  "Core must own its camera, button and indicator",
);
const meshes = [];
core.traverse((node) => {
  if (node.isMesh) meshes.push([node.uuid, node.geometry.uuid]);
});
for (let step = 0; step <= 100; step++) {
  applyAssemblyPose(assembly, step / 100);
  assert.equal(assembly.core, core, "Core instance must never be replaced");
  assert.equal(
    assembly.root.getObjectsByProperty("name", "neuaura_core").length,
    1,
    "Exactly one core in the assembly",
  );
  assert.equal(core.getObjectByName("core_camera"), camera);
  assert.equal(core.getObjectByName("core_button"), button);
  assert.equal(core.getObjectByName("core_indicator"), indicator);
  assert.deepEqual(
    core.scale.toArray(),
    [1, 1, 1],
    "Core dimensions must remain unchanged",
  );
  const nextMeshes = [];
  core.traverse((node) => {
    if (node.isMesh) nextMeshes.push([node.uuid, node.geometry.uuid]);
  });
  assert.deepEqual(
    nextMeshes,
    meshes,
    "No core geometry may morph or be duplicated",
  );
  assembly.root.traverse((node) =>
    assert.equal(node.visible, true, "Components move; they do not disappear"),
  );
}
applyAssemblyPose(assembly, 0);
const before = core.position.clone();
applyAssemblyPose(assembly, 0.23);
assert.equal(core.position.x, before.x);
assert.equal(core.position.y, before.y);
assert(
  core.position.z > before.z,
  "Initial extraction must follow one linear rail",
);
applyAssemblyPose(assembly, 0.53);
assert.deepEqual(
  core.position.toArray(),
  [0, 1.39, 0],
  "Wristband docking anchor",
);
applyAssemblyPose(assembly, 0.81);
assert.deepEqual(
  core.position.toArray(),
  [0, 0, 0.23],
  "Pendant docking anchor",
);
applyAssemblyPose(assembly, 1);
assert.deepEqual(
  core.position.toArray(),
  [0.15, 1.39, 0.5],
  "Final shared core remains in wristband",
);
disposeAssembly(assembly);
console.log(
  "PASS · 101 mechanical poses · one unchanged core · stable camera / button / indicator · linear extraction · wristband and pendant docking · no hidden parts",
);
