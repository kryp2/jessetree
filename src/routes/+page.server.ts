import type { PageServerLoad } from './$types';
import { getBibleSource } from '$lib/data';

export const load: PageServerLoad = async () => {
  const src = getBibleSource();
  const translations = await src.listTranslations();
  return { translations };
};
