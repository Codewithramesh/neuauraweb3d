# NEUAURA V1 — Business Conversation Intelligence

A software-first business website and working, fictional product demonstration for field sales and business development. Built with React 19, Vite, TypeScript, React Three Fiber, Three.js and GSAP. The supplied V1 brief is the implementation source; the separately named primary overview and final production models were not available in the connected sources.

## Run and validate

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run test:model
npm run test:demo
npm run build
```

`dist/` is the static deployment. The existing Sites identity is preserved in `.openai/hosting.json`. Fonts are self-hosted with their SIL licences.

## Implemented experience

- Fourteen sections: business hero, business problem, six-stage workflow, nine-entity relationship graph, software workspace, business use cases, hardware explorer, integration architecture, trust demonstration, six-phase roadmap, pilot programme, founder, brand reveal and footer.
- Working workspace tabs: Overview, Interactions, People, Organisations, Commitments, Follow-ups and Search. Records and transcripts are inspectable; context can be edited and marked reviewed. Source review gates commitment confirmation, sharing and follow-up approval. Sharing/actions require a separate, explicit simulation confirmation.
- Search reads the fixture records and current edits. It includes four example queries, relationship context, empty results and links to source records. Filters, reset and fictional-data export work locally.
- Consent controls simulate start, pause, resume and stop. There is no microphone access. Context review and explicit sharing approval remain separate steps.
- Original, provisional 3D geometry: one electronic core, a pendant and a screenless watch-style wristband. The mechanical sequence releases the core, aligns it with the wrist cradle and finishes with one detached core between two empty cradles. No geometry is duplicated or morphed.
- Drag rotation, reset, expansion, tap-based mobile stages and reduced-motion mode. The canvas is lazy-loaded, pauses offscreen, caps resolution and disposes GPU resources. SVG fallback illustrations preserve the two-configuration concept.
- Ramesh Babu's supplied founder note, selectable email and real `mailto:` links. No invented biography or portrait.

## Honest capability boundaries

This is a browser-only demonstration with two entirely fictional interactions. Changes reset on reload. No production AI, recording, CRM, integration, identity resolution, remote storage, email sending or automatic commercial decisions are performed. Integration architecture, pilot measurements and future hardware are labelled as planned or in development. Product geometry does not establish physical feasibility.

## Pilot enquiry delivery

Seven required fields are validated: name, work email, organisation, role, number of potential users, business workflow and message. By default the form prepares an **unsent local draft**. The visitor can download it or open a populated email draft to the founder and send it themselves.

To connect delivery, copy `.env.example` to `.env.local` and configure a public HTTPS `VITE_ENQUIRY_ENDPOINT`. It receives JSON:

```json
{
  "name": "string",
  "email": "string",
  "organisation": "string",
  "role": "string",
  "users": 5,
  "workflow": "string",
  "message": "string"
}
```

The adapter reports receipt only after HTTP success and `{"accepted":true}`. The service must implement validation, origin configuration, rate limits and actual delivery/storage. Provider credentials must stay on the server. Timeout or unconfirmed receipt retains the draft for retry or download.

## Content and maintenance

- `src/content/site.ts`: brand, copy, founder, statuses, roadmap, two configurations and asset mapping.
- `src/content/demo.ts`: clearly fictional source transcripts, relationships, commitments and search examples.
- `src/lib/demo.ts`: search and review gate.
- `src/components/dashboard/`: workspace and confirmation flows.
- `src/components/three/`: shared-core geometry, mechanical poses, lighting and lifecycle.
- `src/components/hardware/`: scroll/tap explorer.
- `src/components/trust/`: conceptual consent and sharing controls.
- `src/components/pilot/` and `src/lib/enquiry.ts`: validated draft and optional delivery adapter.
- `public/models/neuaura/README.md`: model replacement contract.
- `docs/references.md`: design references and source boundaries.

Model checks verify 101 poses, one stable core, unchanged sensors and geometry, linear release, docking anchors and visible components. Demo checks cover queries, current edits, selected relationships, completion and the review gate. Browser verification covers the working flows, responsive layouts and reduced motion; screenshots are stored in the ignored `artifacts/` directory.
