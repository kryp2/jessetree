import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getBibleSource } from '$lib/data';

// Single-verse lookup used by the verse panel to preview similar verses.
export const GET: RequestHandler = async ({ params, setHeaders }) => {
  const chapter = parseInt(params.chapter, 10);
  const verse = parseInt(params.verse, 10);
  if (!Number.isFinite(chapter) || !Number.isFinite(verse)) throw error(400, 'bad reference');
  const v = await getBibleSource().getVerse(params.trans, params.book, chapter, verse);
  if (!v) throw error(404, 'verse not found');
  setHeaders({ 'cache-control': 'public, max-age=86400' });
  return json({ text: v.text, txid: v.txid, block_height: v.block_height });
};
