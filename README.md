# NEUAURA — modular intelligence experience

A responsive React 19 / Vite / TypeScript product experience, using React Three Fiber 9, Three.js and GSAP ScrollTrigger. The repository was empty when inspected; no existing application, product models or founder-supplied transformation video were available.

## Run

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run test:model
npm run build
npm run preview
```

Node 22.12 or newer is recommended. `dist/` is the deployable static output. A server is intentionally unnecessary for the unconnected enquiry preview.

## What works

- Original graphite / titanium identity, local variable fonts and responsive editorial sections.
- Interactive PBR product geometry, drag rotation, reset, automatic studio turn and an expanded viewer with focus management and Escape dismissal.
- Desktop scroll sequence: eyewear → linear core release → separated components → wristband docking → pendant docking → collection.
- Independent wearing-configuration and stage selectors. Mobile and reduced-motion experiences use tap-driven stages.
- Exactly one reusable electronic core in each assembly. Its camera, button, indicator, dimensions and meshes remain unchanged. In the collection, the core is docked in the wristband and the other two cradles are empty.
- Keyboard-operated intelligence and business tabs, a clearly labelled illustrative dashboard, an interactive sample follow-up, accessibility directions and privacy disclosures.
- Editable content, roadmap, model mapping, statuses and social links in `src/content/site.ts`.
- Native required-field/email validation, trimmed input checks, a truthful unsent state and downloadable enquiry text.
- System reduced-motion preference plus an explicit footer control, lazy 3D loading, capped device pixel ratio, viewport-based render pausing and GPU resource disposal.
- Semantic headings, focus styles, labelled controls, skip navigation, page metadata, a canonical URL, PNG social card and favicon.

## Product asset status

**All product geometry is an original, provisional concept fallback, not an inspected Kimi model or validated hardware design.** No third-party product imagery, geometry, logos or footage is used. The gallery uses original vector illustrations and the main product views use actual interactive geometry.

Add inspected assets in `public/models/neuaura/`, then follow its README. The central manifest and GLTF loader support independently mapped assembly nodes. Actual asset dimensions, origin placement and docking anchors must be verified before replacing the concept; no vendor hierarchy is assumed.

No device specifications, certifications, accuracy claims, launch dates, customer results, partnerships or live business integrations are claimed. The intelligence dashboard and communication workflows are clearly labelled concepts.

## Enquiry delivery

By default, **no enquiry is sent, persisted, or reported as received**. The visitor can prepare and download a local copy. This is the brief's permitted integration-ready demo state.

To connect a real service, copy `.env.example` to `.env.local` and set `VITE_ENQUIRY_ENDPOINT` to a public HTTPS endpoint. It receives:

```json
{
  "name": "string",
  "email": "string",
  "organisation": "string",
  "interest": "string",
  "message": "string"
}
```

The adapter reports acceptance only for a successful HTTP response containing `{ "accepted": true }`. Implement server validation, origin configuration, spam/rate limiting and your actual storage/delivery policy in that service. Never expose provider credentials through a `VITE_` variable. A twelve-second timeout or an unconfirmed response leaves the details available for retry/download.

## Verification

Model verification exercises 101 poses and asserts stable core identity, unchanged child mesh identities, fixed dimensions, linear initial extraction, docking anchors and visible component objects throughout the sequence.

Browser checks during development covered desktop (1440 × 1000) and mobile (390 × 844), hero configuration selection, mobile navigation, explorer stages/reset/expansion, Escape dismissal, intelligence tabs, business tabs/sample task, accessibility direction, privacy disclosure, native form validation, truthful demo result, enquiry download and reduced-motion controls. All anchor targets resolve; mobile rendered controls and headings stay inside the viewport. Browser console errors were checked and resolved. Verification screenshots are kept in the ignored `artifacts/` directory.

Build/type/lint and model checks should be rerun after changing assets or animation anchors. Physical fit, hardware feasibility and real service delivery require the actual supplied assets and configured service; browser validation is not hardware validation.

## Structure

```text
src/content/site.ts             Editable copy, roadmap, configuration and assets
src/components/three/           PBR assembly, poses, lighting and canvas lifecycle
src/components/product/         Scroll/tap explorer, detail gallery and final reveal
src/components/intelligence/    Workflow, business concepts and sample dashboard
src/components/accessibility/  Communication vision and conceptual pathways
src/components/privacy/        Privacy principles and development roadmap
src/components/contact/        Accessible enquiry interface
src/lib/enquiry.ts              Delivery adapter and local download
scripts/verify-model.mjs        Shared-core invariant checks
.openai/hosting.json            Private Sites identity and static output
```

Reference study is recorded in `docs/references.md`. DM Sans and Manrope are self-hosted under their included SIL Open Font Licenses in `public/fonts/`.
