# jessetree

> *"A shoot will come up from the stump of Jesse; from his roots a Branch will bear fruit."* — Isaiah 11:1

An open-source reader for Bible translations posted to **Bitcoin** via the [Bitcoin Schema](https://bitcoinschema.org) protocol.

Every verse is an on-chain transaction. The reader is a window onto the canonical tree — the dominant branch chosen per `(translation, book, chapter, verse)` across a forest of historical posting attempts. The discarded branches remain on-chain as an audit trail; the canonical tree is what you read.

**Live:** [jessetree.xyz](https://jessetree.xyz) *(coming soon)*

## What's in the tree

Eleven translations, 320,494 verses, all posted on mainnet under the `peck.cross` app tag:

- Hebrew Tanakh (`he_wlc` — Westminster Leningrad Codex)
- Greek New Testament (`grc_nt`)
- English (KJV, ASV, WEB, BBE)
- Norwegian (1930)
- …and more

## The metaphor

In the medieval Christian tradition, a **Jesse Tree** is a tree hung with ornaments representing biblical figures leading to Christ. Each ornament is a story, a prophecy, a name.

On jessetree, each ornament is a **Bitcoin transaction**. Verifiable, immutable, hung permanently on the tree. You can inspect the origin, the history, the lineage of every verse — because each one has a txid.

## Stack

- **SvelteKit** (SSR) + **Tailwind Typography**
- **PostgreSQL** (`canonical_tree` table) for clean traversal
- Fallback to **peck-reader** HTTP API for forkers without DB access
- **Cloud Run** deploy, Cloudflare front

## Data source

Two backends, selected via `JESSETREE_DATA_SOURCE`:

- `postgres` — direct SQL against `peck_db` (requires Cloud SQL proxy or peck-to dev env)
- `peck-reader` — HTTP against a public read-only API (anyone can fork and run)

## Running locally

```bash
cp .env.example .env
# edit .env — set either Postgres creds or PECK_READER_URL
npm install
npm run dev
```

## Contributing

MIT licensed. PRs welcome for:

- Additional translations (post on-chain under `peck.cross`, then add to the reader)
- UX improvements for long-form reading
- Cross-reference support (Treasury of Scripture Knowledge seed, etc.)
- Accessibility

## License

MIT — see [LICENSE](./LICENSE).

Source: https://github.com/kryp2/jessetree

The biblical texts themselves are public domain. The code is free. The tree grows.
