# jessetree

Open-source Bible reader rendering `peck.cross` Bitcoin Schema verses from `canonical_tree` in peck_db.

## Stack
SvelteKit (SSR, adapter-node), Tailwind + Typography, `pg` for Postgres. Data layer abstracted in `src/lib/data/` with two implementations: `postgres` (default, direct Cloud SQL) and `peck-reader` (HTTP, for OSS forkers without DB access).

## Data shape
Reads from `canonical_tree` joined with `pecks`:
- `canonical_tree(app, translation, work, book, chapter, leaf_no, leaf_kind, txid, book_root, chapter_root, block_height)` — scoped to `app='peck.cross'`, `leaf_kind='verse'`
- `pecks.content` supplies verse text via `txid` join

## Routes
- `/` translations
- `/[trans]` books (OT/NT split by catalog.ts)
- `/[trans]/[book]` chapters
- `/[trans]/[book]/[chapter]` reader with verse-anchored deep links (#v5), drop-cap, chain-badge per verse
- `/[trans]/[book]/[chapter]/[verse]/parallel` same verse across all translations

## Dev
```bash
cp .env.example .env   # set PGPASSWORD
npm install
npm run dev            # needs Cloud SQL proxy on 127.0.0.1:5433 OR point at peck-reader
```

## Deploy
Cloud Run via Dockerfile. Domain `jessetree.xyz` (DNS zone set up in gen-lang-client-0447933194).
