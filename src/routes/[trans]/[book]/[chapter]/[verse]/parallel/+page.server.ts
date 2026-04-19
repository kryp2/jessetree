import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getBibleSource } from '$lib/data';
import { bookMeta, translationMeta } from '$lib/data/catalog';

export const load: PageServerLoad = async ({ params }) => {
  const chapter = parseInt(params.chapter, 10);
  const verse = parseInt(params.verse, 10);
  if (!Number.isFinite(chapter) || !Number.isFinite(verse)) throw error(400, 'bad reference');

  const src = getBibleSource();
  const translations = await src.getParallel(params.book, chapter, verse);
  if (translations.length === 0) throw error(404, 'verse not found in any translation');

  return {
    translation: { code: params.trans, ...translationMeta(params.trans) },
    book: { code: params.book, ...bookMeta(params.book) },
    chapter,
    verse,
    translations
  };
};
