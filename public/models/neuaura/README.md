# NEUAURA V1 model handoff

The website uses original, provisional procedural geometry. No final production assembly was supplied. There are exactly two future configurations: pendant and screenless watch-style wristband, using one identical electronic core.

To integrate inspected assets:

1. Add a GLB assembly here and inspect its hierarchy, units and docking coordinates.
2. Set `assemblyUrl`, `productionModelAvailable`, `source` and the actual `nodeMapping` in `src/content/site.ts`.
3. Map three independently movable groups: core, pendant assembly and wristband assembly. Keep the camera, button and indicator parented to the same core. Do not duplicate the core.
4. Adapt anchors in `src/components/three/assembly.ts` to verified physical coordinates. Preserve the supplied geometry and proportions.
5. Verify release, rotation, alignment, docking and the final detached-core composition, including reduced-motion tap stages.
6. Rerun model and browser checks. Change concept labels only when supported by evidence.

The loader verifies mapped nodes and retains the labelled fallback when mapping fails. Hero and explorer are separate views of the same product concept. Neither procedural geometry nor browser checks validate manufacturing feasibility.
