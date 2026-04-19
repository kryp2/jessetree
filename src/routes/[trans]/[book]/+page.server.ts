import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getBibleSource } from '$lib/data';
import { bookMeta, translationMeta } from '$lib/data/catalog';

export const load: PageServerLoad = async ({ params }) => {
  const src = getBibleSource();
  const chapters = await src.listChapters(params.trans, params.book);
  if (chapters.length === 0) throw error(404, 'book not found in this translation');
  return {
    translation: { code: params.trans, ...translationMeta(params.trans) },
    book: { code: params.book, ...bookMeta(params.book) },
    chapters
  };
};
