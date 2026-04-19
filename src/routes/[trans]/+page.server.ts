import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getBibleSource } from '$lib/data';
import { translationMeta } from '$lib/data/catalog';

export const load: PageServerLoad = async ({ params }) => {
  const src = getBibleSource();
  const books = await src.listBooks(params.trans);
  if (books.length === 0) throw error(404, 'translation not found');
  return {
    translation: { code: params.trans, ...translationMeta(params.trans) },
    books
  };
};
