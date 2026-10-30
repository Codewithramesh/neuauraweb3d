# NEUAURA production model handoff

No Kimi 3D Make or other product assets were supplied with this repository.
The website currently uses an original, provisional procedural assembly.

To integrate an inspected assembly:

1. Add `neuaura-modular-assembly.glb` here.
2. Inspect its hierarchy and use metres or a consistently normalised scale.
3. Update `assetManifest.assemblyUrl`, `productionModelAvailable`, `source` and `nodeMapping` in `src/content/site.ts`. The `source` type is intentionally explicit; update it to identify the actual supplied asset.
4. The mapped components must be independently movable, with a common assembly coordinate system. Core submeshes (camera, button, indicator) must stay parented to the same `neuaura_core` group.
5. Adapt the engineering anchors in `src/components/three/assembly.ts` to the actual docking coordinates. Supplied geometry is preserved; do not force a vendor model into assumed dimensions.
6. Verify every mechanical stage and update concept labels only when appropriate.

The loader checks for all mapped nodes. Missing nodes keep the original, labelled concept visible and emit an explicit console error. Separate vendor exports should first be assembled into these independently movable groups. No vendor mesh names or dimensions have been assumed to exist.

The procedural implementation uses one electronic core per scene. The collection view shows the core docked in the wristband and empty glasses/pendant cradles. Hero and explorer canvases are independent views of the same concept; they are not claims of separate electronics.
