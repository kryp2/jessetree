# Similar verses (computed)

Top-5 nearest neighbours for every verse, per translation:
`<translation>/<canonical book>/<chapter>.json` → `{ "<verse>": [{ "ref": "book/chapter/verse", "s": score }] }`.

- Book codes in paths and refs are canonical en_kjv slugs; `src/lib/data/catalog.ts`
  maps them to each translation's own codes.
- Computed from the on-chain verse text with embeddinggemma (cosine similarity),
  generator: `peck-recall/scripts/jessetree_anchor.py`.
- This is a **language-similarity signal, not a cross-reference list**. It claims
  only that two verses sound alike. Known artefact: psalm superscriptions
  ("A Psalm of David") cluster with each other.
- Scripture texts are public domain; this derived data is MIT like the code.
