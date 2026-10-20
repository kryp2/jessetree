// "Similar verses": a computed layer, not cross-references.
//
// Each verse was embedded (embeddinggemma) and its nearest neighbours found
// across the whole Bible; the top five per verse ship as static JSON in
// data/similar/<translation>/<canonical book>/<chapter>.json. Refs inside the
// files use canonical (en_kjv) book codes. The generator lives in
// peck-recall/scripts/jessetree_anchor.py. The scores claim linguistic
// similarity only — the machine points, the reader interprets.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { bookMeta, fromCanonBook, toCanonBook } from '$lib/data/catalog';
import type { SimilarRef } from '$lib/data/types';

export type { SimilarRef };

export const SIMILAR_TRANSLATIONS = new Set(['en_kjv', 'no_1930']);

type RawEntry = { ref: string; s: number };

const DATA_DIR = join(process.cwd(), 'data', 'similar');
const cache = new Map<string, Record<string, RawEntry[]> | null>();

async function readChapterFile(
  translation: string,
  canonBook: string,
  chapter: number
): Promise<Record<string, RawEntry[]> | null> {
  const key = `${translation}/${canonBook}/${chapter}`;
  if (cache.has(key)) return cache.get(key)!;
  let parsed: Record<string, RawEntry[]> | null = null;
  try {
    const raw = await readFile(join(DATA_DIR, translation, canonBook, `${chapter}.json`), 'utf8');
    parsed = JSON.parse(raw);
  } catch {
    parsed = null;
  }
  if (cache.size > 2000) cache.clear();
  cache.set(key, parsed);
  return parsed;
}

function toRef(translation: string, e: RawEntry): SimilarRef | null {
  const [canon, ch, v] = e.ref.split('/');
  const book = fromCanonBook(translation, canon);
  if (!book) return null;
  return {
    book,
    book_name: bookMeta(book).name,
    chapter: Number(ch),
    verse: Number(v),
    score: e.s
  };
}

/** Similar verses for every verse in a chapter, keyed by verse number. */
export async function similarForChapter(
  translation: string,
  book: string,
  chapter: number
): Promise<Record<number, SimilarRef[]>> {
  if (!SIMILAR_TRANSLATIONS.has(translation)) return {};
  const canon = toCanonBook(translation, book);
  if (!canon) return {};
  const file = await readChapterFile(translation, canon, chapter);
  if (!file) return {};
  const out: Record<number, SimilarRef[]> = {};
  for (const [verse, entries] of Object.entries(file)) {
    out[Number(verse)] = entries.map((e) => toRef(translation, e)).filter((r) => r !== null);
  }
  return out;
}

/** Similar verses for a single verse (empty when none were computed). */
export async function similarForVerse(
  translation: string,
  book: string,
  chapter: number,
  verse: number
): Promise<SimilarRef[]> {
  const all = await similarForChapter(translation, book, chapter);
  return all[verse] ?? [];
}
