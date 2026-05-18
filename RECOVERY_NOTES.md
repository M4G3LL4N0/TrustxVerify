# TrustxVerify Recovery Notes

TrustxVerify has been restored around the product truth: the trust layer for global commerce.

Recovered priorities:

- Use pnpm only.
- Keep Supabase access lazy and schema-scoped to `trustxverify`.
- Preserve `.env.local` and `.env.example`.
- Keep the MVP focused on search, report intake, entity details, moderation, scoring, and connections.
- Do not deploy or push automatically.

Current return path:

```bash
cd /Users/joshuadavis/startups/trustxverify
pnpm install
pnpm build
vercel --prod
```

Run `supabase/trustxverify_schema.sql` in Supabase before expecting live database-backed search and reporting.
