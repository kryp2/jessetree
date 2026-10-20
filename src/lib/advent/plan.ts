// The Jesse Tree: one ornament a day from the first Sunday of Advent to
// Christmas Eve, following the line from creation through the stump of Jesse
// to Christ. The reading list follows the classic ecumenical Jesse Tree
// sequence. Scripture is always shown verbatim from the chain; nothing here is
// commentary — only a figure, a symbol and a reference.
//
// Advent is 22–28 days long depending on the weekday of Christmas, so the plan
// has 28 ornaments. In shorter years the ornaments with a `drop` rank are left
// out, lowest rank first, until the plan fits the season.

export type Reading = {
  book: string; // canonical (en_kjv) book code
  chapter: number;
  from: number;
  to: number;
  /** The verse whose "similar verses" form the day's thread. */
  key: number;
};

export type Ornament = {
  slug: string;
  figure: string;
  symbol: SymbolName;
  symbolLabel: string;
  reading: Reading;
  drop?: number;
};

export type SymbolName =
  | 'world' | 'fruit' | 'rainbow' | 'stars' | 'ram' | 'ladder' | 'coat'
  | 'bush' | 'lamb' | 'bread' | 'tablets' | 'trumpet' | 'wheat' | 'stump'
  | 'harp' | 'temple' | 'fire' | 'light' | 'heart' | 'fish' | 'lion'
  | 'house' | 'censer' | 'lily' | 'square' | 'shell' | 'star' | 'manger';

const r = (book: string, chapter: number, from: number, to: number, key: number): Reading => ({
  book, chapter, from, to, key
});

export const ORNAMENTS: Ornament[] = [
  { slug: 'creation', figure: 'Creation', symbol: 'world', symbolLabel: 'The world', reading: r('genesis', 1, 1, 5, 1) },
  { slug: 'adam-and-eve', figure: 'Adam and Eve', symbol: 'fruit', symbolLabel: 'The fruit', reading: r('genesis', 3, 1, 15, 15) },
  { slug: 'noah', figure: 'Noah', symbol: 'rainbow', symbolLabel: 'The rainbow', reading: r('genesis', 9, 8, 17, 13) },
  { slug: 'abraham', figure: 'Abraham', symbol: 'stars', symbolLabel: 'The stars', reading: r('genesis', 15, 1, 6, 6) },
  { slug: 'isaac', figure: 'Isaac', symbol: 'ram', symbolLabel: 'The ram', reading: r('genesis', 22, 1, 14, 8) },
  { slug: 'jacob', figure: 'Jacob', symbol: 'ladder', symbolLabel: 'The ladder', reading: r('genesis', 28, 10, 17, 12) },
  { slug: 'joseph-of-egypt', figure: 'Joseph', symbol: 'coat', symbolLabel: 'The coat', reading: r('genesis', 50, 15, 21, 20) },
  { slug: 'moses', figure: 'Moses', symbol: 'bush', symbolLabel: 'The burning bush', reading: r('exodus', 3, 1, 14, 14) },
  { slug: 'passover', figure: 'The Passover', symbol: 'lamb', symbolLabel: 'The lamb', reading: r('exodus', 12, 1, 13, 13) },
  { slug: 'manna', figure: 'Manna', symbol: 'bread', symbolLabel: 'The bread', reading: r('exodus', 16, 11, 18, 15), drop: 1 },
  { slug: 'the-law', figure: 'The Law', symbol: 'tablets', symbolLabel: 'The tablets', reading: r('exodus', 20, 1, 17, 3), drop: 2 },
  { slug: 'joshua', figure: 'Joshua', symbol: 'trumpet', symbolLabel: 'The trumpet', reading: r('joshua', 1, 1, 9, 9), drop: 3 },
  { slug: 'ruth', figure: 'Ruth', symbol: 'wheat', symbolLabel: 'The sheaf', reading: r('ruth', 4, 13, 17, 17) },
  { slug: 'jesse', figure: 'Jesse', symbol: 'stump', symbolLabel: 'The stump and the shoot', reading: r('isaiah', 11, 1, 10, 1) },
  { slug: 'david', figure: 'David', symbol: 'harp', symbolLabel: 'The harp', reading: r('1-samuel', 16, 1, 13, 13) },
  { slug: 'solomon', figure: 'Solomon', symbol: 'temple', symbolLabel: 'The temple', reading: r('1-kings', 3, 5, 12, 9), drop: 4 },
  { slug: 'elijah', figure: 'Elijah', symbol: 'fire', symbolLabel: 'The fire', reading: r('1-kings', 18, 30, 39, 39), drop: 6 },
  { slug: 'isaiah', figure: 'Isaiah', symbol: 'light', symbolLabel: 'The great light', reading: r('isaiah', 9, 2, 7, 6) },
  { slug: 'jeremiah', figure: 'Jeremiah', symbol: 'heart', symbolLabel: 'The new heart', reading: r('jeremiah', 31, 31, 34, 33) },
  { slug: 'jonah', figure: 'Jonah', symbol: 'fish', symbolLabel: 'The great fish', reading: r('jonah', 2, 1, 10, 9), drop: 5 },
  { slug: 'daniel', figure: 'Daniel', symbol: 'lion', symbolLabel: 'The lion', reading: r('daniel', 6, 16, 23, 22) },
  { slug: 'micah', figure: 'Micah', symbol: 'house', symbolLabel: 'Bethlehem', reading: r('micah', 5, 2, 5, 2) },
  { slug: 'zechariah-and-elizabeth', figure: 'Zechariah and Elizabeth', symbol: 'censer', symbolLabel: 'The incense', reading: r('luke', 1, 5, 17, 17) },
  { slug: 'mary', figure: 'Mary', symbol: 'lily', symbolLabel: 'The lily', reading: r('luke', 1, 26, 38, 31) },
  { slug: 'joseph', figure: 'Joseph', symbol: 'square', symbolLabel: "The carpenter's square", reading: r('matthew', 1, 18, 25, 21) },
  { slug: 'john-the-baptist', figure: 'John the Baptist', symbol: 'shell', symbolLabel: 'The shell', reading: r('luke', 1, 67, 79, 78) },
  { slug: 'the-star', figure: 'The Promise', symbol: 'star', symbolLabel: 'The star', reading: r('numbers', 24, 15, 19, 17) },
  { slug: 'jesus', figure: 'Jesus', symbol: 'manger', symbolLabel: 'The manger', reading: r('luke', 2, 1, 14, 11) }
];

// ── Calendar ────────────────────────────────────────────────────────────────
// Dates are plain calendar dates (UTC midnight) so the season is the same
// wherever the server runs; "today" is decided by the caller.

export type Day = {
  n: number; // 1-based day of Advent
  date: string; // YYYY-MM-DD
  ornament: Ornament;
};

const DAY_MS = 86_400_000;

function utc(y: number, m: number, d: number): Date {
  return new Date(Date.UTC(y, m - 1, d));
}

export function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** First Sunday of Advent: the fourth Sunday before Christmas Day. */
export function adventStart(year: number): Date {
  const christmas = utc(year, 12, 25);
  const dow = christmas.getUTCDay(); // 0 = Sunday
  const sundayBefore = christmas.getTime() - (dow === 0 ? 7 : dow) * DAY_MS;
  return new Date(sundayBefore - 21 * DAY_MS);
}

/** The ornaments for one year's Advent, Advent Sunday … Christmas Eve. */
export function season(year: number): Day[] {
  const start = adventStart(year);
  const length = Math.round((utc(year, 12, 24).getTime() - start.getTime()) / DAY_MS) + 1;
  const toDrop = ORNAMENTS.length - length;
  const dropped = new Set(
    ORNAMENTS.filter((o) => o.drop !== undefined)
      .sort((a, b) => a.drop! - b.drop!)
      .slice(0, Math.max(0, toDrop))
      .map((o) => o.slug)
  );
  return ORNAMENTS.filter((o) => !dropped.has(o.slug)).map((ornament, i) => ({
    n: i + 1,
    date: iso(new Date(start.getTime() + i * DAY_MS)),
    ornament
  }));
}

/** The Advent season to show on `today`: this year's, or next year's after Christmas. */
export function seasonYear(today: string): number {
  const [y, m, d] = today.split('-').map(Number);
  return m === 12 && d > 25 ? y + 1 : y;
}

/** How many ornaments are hung on `today` (0 before Advent, all after). */
export function hungCount(days: Day[], today: string): number {
  return days.filter((d) => d.date <= today).length;
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  });
}

// ── Translations ────────────────────────────────────────────────────────────
// Translations whose book codes we can map from the canonical plan.
export const ADVENT_TRANSLATIONS = ['en_kjv', 'no_1930', 'en_asv', 'en_bbe', 'de_schlachter', 'es_rvr'];
export const DEFAULT_TRANSLATION = 'en_kjv';

export function pickTranslation(t: string | null): string {
  return t && ADVENT_TRANSLATIONS.includes(t) ? t : DEFAULT_TRANSLATION;
}

/** Valid YYYY-MM-DD from a query param, else null. */
export function parseDate(s: string | null): string | null {
  return s && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) ? s : null;
}
