# Launch Readiness: Trustxverify

## Launch Status
- Current label: **LOCAL REVIEW READY**
- Reason: Portfolio build PASS; claim register installed.
- What is ready: Local `pnpm build`; repo routes
- What is not ready: PUBLIC sharing; unverified live URLs; traction claims
- What is demo only: /demo — TrustEntityCheckDemo
- What is planned: Production auth, billing, live integrations (unless in repo)
- What is blocked: None documented
- What is stale: STALE — curl failed from automation host on prior batch
- What is risky: Compliance, security, medical, or financial claims without proof — see CLAIM_REGISTER.md

## Local Review
- Local command: `cd /Users/joshuadavis/startups/trustxverify && pnpm install && pnpm dev`
- Routes to inspect: `/`, `/demo`, `/search`
- Expected behavior: /demo — TrustEntityCheckDemo
- Known limitations: Not live fraud DB; static report-demo is narrative only
- Manual checks:
  - [ ] Build: `pnpm build`
  - [ ] Demo labels visible on metrics
  - [ ] No fake traction in hero copy
  - [ ] Export/copy actions work if present

## Claim Safety
- Claims safe to publish: Product description as hypothesis; DEMO-labeled interactions
- Claims that need proof: Live URL uptime, customer counts, revenue, compliance
- Claims to remove or weaken: Any VERIFIED label without build or curl proof

## Launch Gate
- Build status: **PASS**
- Main route status: expected OK locally
- CTA status: verify manually in dev
- MVP interaction status: DEMO route documented
- Mobile status: verify manually
- Trust/factuality status: use CLAIM_REGISTER.md
- Secrets/build artifacts status: do not commit .env
- Human approval needed: before any `vercel --prod` or public claim upgrades
- Final label: **LOCAL REVIEW READY** (PUBLIC READY: **no**; DEMO READY: yes (label all demo outputs))

