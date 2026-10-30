# NEUAURA V1 verification — 30 October 2026

The website was inspected in the Codex in-app browser against the local Vite app at desktop 1440 × 1000, tablet 768 × 1024 and mobile 390 × 844.

## Observed working

- Software-first hero, 13 main sections plus footer, valid internal anchors, correct metadata and five correct founder email links.
- All six workflow tabs, keyboard progression, all nine relationship graph nodes, connected context inspection and graph-to-workspace selection. Mobile graph selector opens the same entities.
- All seven workspace views. Source transcript inspection, context correction, explicit review checkbox, saved reviewed state and review gate on sharing/commitment confirmation.
- Sharing confirmation opens, cancels and explicitly confirms a simulation. No external information is sent.
- Reviewed source enables commitment confirmation. Confirmed commitments enable a suggested follow-up, editable draft and separate confirmation. Completed simulated follow-ups disappear from pending search results.
- Search resolves customer requirements, pending commitments, revised-proposal decisions and the last interaction for the selected organisation. Edits are reflected. Unknown queries produce an empty state.
- Workflow filter selects the matching fictional organisation; commitment status filtering and clear filter work. Reset restores the sample. Export produces local fictional JSON.
- Consent required before starting; active, pause, resume and stopped states work. Context can be edited, reviewed and shared only through a separate confirmation.
- Pendant/wristband selection, mechanical stage selection, automatic rotation, reset, material details, expansion and Escape dismissal. Mobile uses tap stages. Reduced motion disables automatic rotation and makes transitions immediate.
- Pilot required-field validity, valid fictional input, honest unsent state, populated founder email draft link and downloaded text containing all seven submitted fields. The email link was inspected without sending a message.
- Founder note and correct direct `mailto:mukkararamesh2005@gmail.com` link, with optional subject on appropriate contact links.
- Mobile navigation and workspace navigation. No page overflow or out-of-bounds controls/headings at tested mobile dimensions. Expanded viewer horizontal overflow was found and fixed. Technical labels were enlarged.
- Browser console inspected with no errors or warnings from the app in the final fresh-load check.

## Automated checks

`npm run lint`, `npm run typecheck`, `npm run test:model`, `npm run test:demo`, and `npm run build` passed.

The model test exercises 101 poses, stable core and child mesh identity, fixed dimensions, linear release, wrist alignment and the final single-core/two-cradle composition. The demo test exercises real fixture queries, edited values, selected context, empty results, completed actions and review gating.

The production build emits Vite's advisory about the lazy-loaded Three.js engine chunk exceeding 500 kB. The main application and product canvas are separately split; the engine is approximately 188 kB compressed. No build errors occurred.

## Boundaries

This verifies a browser-local product demonstration. No real recordings, AI backend, external integration or enquiry delivery service are connected. The form prepares a draft. Product models are provisional original geometry, with no physical fit or manufacturing validation. The named primary overview and final production GLBs were not available; the supplied V1 brief defines the implemented scope.

Screenshots are in the ignored `artifacts/` directory and are not included in the deployed static output.
