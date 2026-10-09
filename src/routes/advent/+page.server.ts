import type { PageServerLoad } from './$types';
import { hungCount, iso, parseDate, pickTranslation, season, seasonYear } from '$lib/advent/plan';
import { translationMeta } from '$lib/data/catalog';

export const load: PageServerLoad = async ({ url }) => {
  // `?today=YYYY-MM-DD` previews the tree on another date.
  const fixedToday = parseDate(url.searchParams.get('today'));
  const today = fixedToday ?? iso(new Date());
  const year = seasonYear(today);
  const days = season(year);
  const t = pickTranslation(url.searchParams.get('t'));
  return {
    year,
    days,
    today,
    fixedToday,
    hung: hungCount(days, today),
    translation: { code: t, ...translationMeta(t) },
    explicitTranslation: url.searchParams.has('t')
  };
};
