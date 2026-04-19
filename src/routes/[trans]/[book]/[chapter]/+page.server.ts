import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getBibleSource } from '$lib/data';
import { bookMeta, translationMeta } from '$lib/data/catalog';

export const load: PageServerLoad = async ({ params }) => {
  const chapter = parseInt(params.chapter, 10);
  if (!Number.isFinite(chapter) || chapter < 1) throw error(400, 'bad chapter');

  const src = getBibleSource();
  const [verses, chapters] = await Promise.all([
    src.getChapter(params.trans, params.book, chapter),
    src.listChapters(params.trans, params.book)
  ]);
  if (verses.length === 0) throw error(404, 'chapter not found');

  const idx = chapters.findIndex((c) => c.number === chapter);
  const prev = idx > 0 ? chapters[idx - 1].number : null;
  const next = idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1].number : null;

  return {
    translation: { code: params.trans, ...translationMeta(params.trans) },
    book: { code: params.book, ...bookMeta(params.book) },
    chapter,
    verses,
    prev,
    next
  };
};
