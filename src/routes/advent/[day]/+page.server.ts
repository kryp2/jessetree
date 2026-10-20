import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getBibleSource } from '$lib/data';
import { bookMeta, fromCanonBook, translationMeta } from '$lib/data/catalog';
import { similarForVerse } from '$lib/server/similar';
import { iso, parseDate, pickTranslation, season, seasonYear } from '$lib/advent/plan';

export const load: PageServerLoad = async ({ params, url }) => {
  const fixedToday = parseDate(url.searchParams.get('today'));
  const today = fixedToday ?? iso(new Date());
  const year = seasonYear(today);
  const days = season(year);

  const idx = days.findIndex((d) => d.ornament.slug === params.day);
  if (idx < 0) {
    // Unknown slug, or an ornament left out of this year's shorter Advent.
    throw error(404, 'This ornament is not on the tree this year');
  }
  const day = days[idx];

  const t = pickTranslation(url.searchParams.get('t'));
  const r = day.ornament.reading;
  const book = fromCanonBook(t, r.book);
  if (!book) throw error(404, 'reading not available in this translation');

  const [chapter, similar] = await Promise.all([
    getBibleSource().getChapter(t, book, r.chapter),
    similarForVerse(t, book, r.chapter, r.key)
  ]);
  const verses = chapter.filter((v) => v.verse >= r.from && v.verse <= r.to);
  if (verses.length === 0) throw error(404, 'reading not found');

  return {
    year,
    day,
    total: days.length,
    prev: idx > 0 ? days[idx - 1] : null,
    next: idx < days.length - 1 ? days[idx + 1] : null,
    translation: { code: t, ...translationMeta(t) },
    explicitTranslation: url.searchParams.has('t'),
    fixedToday,
    book: { code: book, ...bookMeta(book) },
    verses,
    similar
  };
};
