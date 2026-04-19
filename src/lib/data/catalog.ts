// Static catalog metadata for translations, books, and testaments.
// The canonical_tree table stores machine codes; this layer supplies
// human-readable names, language metadata, and ordering.

export type TranslationMeta = {
  name: string;
  language: string;
  language_name: string;
  direction: 'ltr' | 'rtl';
};

export const TRANSLATIONS: Record<string, TranslationMeta> = {
  no_1930: { name: 'Norsk (1930)', language: 'no', language_name: 'Norsk', direction: 'ltr' },
  kjv: { name: 'King James Version', language: 'en', language_name: 'English', direction: 'ltr' },
  asv: { name: 'American Standard Version', language: 'en', language_name: 'English', direction: 'ltr' },
  web: { name: 'World English Bible', language: 'en', language_name: 'English', direction: 'ltr' },
  bbe: { name: 'Bible in Basic English', language: 'en', language_name: 'English', direction: 'ltr' },
  ylt: { name: "Young's Literal Translation", language: 'en', language_name: 'English', direction: 'ltr' },
  dby: { name: 'Darby Translation', language: 'en', language_name: 'English', direction: 'ltr' },
  akjv: { name: 'American King James', language: 'en', language_name: 'English', direction: 'ltr' },
  he_wlc: { name: 'Westminster Leningrad Codex', language: 'he', language_name: 'עברית', direction: 'rtl' },
  grc_nt: { name: 'Greek New Testament', language: 'grc', language_name: 'Ἑλληνικά', direction: 'ltr' },
  lat_vulgate: { name: 'Vulgata', language: 'la', language_name: 'Latina', direction: 'ltr' }
};

export type BookMeta = {
  name: string;
  order: number;
  testament: 'old' | 'new';
};

// Canonical ordering + English display names for the 66-book Protestant canon.
// Book codes match lowercase English names posted on-chain.
export const BOOKS: Record<string, BookMeta> = {
  // Old Testament
  genesis: { name: 'Genesis', order: 1, testament: 'old' },
  exodus: { name: 'Exodus', order: 2, testament: 'old' },
  leviticus: { name: 'Leviticus', order: 3, testament: 'old' },
  numbers: { name: 'Numbers', order: 4, testament: 'old' },
  deuteronomy: { name: 'Deuteronomy', order: 5, testament: 'old' },
  joshua: { name: 'Joshua', order: 6, testament: 'old' },
  judges: { name: 'Judges', order: 7, testament: 'old' },
  ruth: { name: 'Ruth', order: 8, testament: 'old' },
  '1_samuel': { name: '1 Samuel', order: 9, testament: 'old' },
  '2_samuel': { name: '2 Samuel', order: 10, testament: 'old' },
  '1_kings': { name: '1 Kings', order: 11, testament: 'old' },
  '2_kings': { name: '2 Kings', order: 12, testament: 'old' },
  '1_chronicles': { name: '1 Chronicles', order: 13, testament: 'old' },
  '2_chronicles': { name: '2 Chronicles', order: 14, testament: 'old' },
  ezra: { name: 'Ezra', order: 15, testament: 'old' },
  nehemiah: { name: 'Nehemiah', order: 16, testament: 'old' },
  esther: { name: 'Esther', order: 17, testament: 'old' },
  job: { name: 'Job', order: 18, testament: 'old' },
  psalms: { name: 'Psalms', order: 19, testament: 'old' },
  proverbs: { name: 'Proverbs', order: 20, testament: 'old' },
  ecclesiastes: { name: 'Ecclesiastes', order: 21, testament: 'old' },
  song_of_solomon: { name: 'Song of Solomon', order: 22, testament: 'old' },
  isaiah: { name: 'Isaiah', order: 23, testament: 'old' },
  jeremiah: { name: 'Jeremiah', order: 24, testament: 'old' },
  lamentations: { name: 'Lamentations', order: 25, testament: 'old' },
  ezekiel: { name: 'Ezekiel', order: 26, testament: 'old' },
  daniel: { name: 'Daniel', order: 27, testament: 'old' },
  hosea: { name: 'Hosea', order: 28, testament: 'old' },
  joel: { name: 'Joel', order: 29, testament: 'old' },
  amos: { name: 'Amos', order: 30, testament: 'old' },
  obadiah: { name: 'Obadiah', order: 31, testament: 'old' },
  jonah: { name: 'Jonah', order: 32, testament: 'old' },
  micah: { name: 'Micah', order: 33, testament: 'old' },
  nahum: { name: 'Nahum', order: 34, testament: 'old' },
  habakkuk: { name: 'Habakkuk', order: 35, testament: 'old' },
  zephaniah: { name: 'Zephaniah', order: 36, testament: 'old' },
  haggai: { name: 'Haggai', order: 37, testament: 'old' },
  zechariah: { name: 'Zechariah', order: 38, testament: 'old' },
  malachi: { name: 'Malachi', order: 39, testament: 'old' },
  // New Testament
  matthew: { name: 'Matthew', order: 40, testament: 'new' },
  mark: { name: 'Mark', order: 41, testament: 'new' },
  luke: { name: 'Luke', order: 42, testament: 'new' },
  john: { name: 'John', order: 43, testament: 'new' },
  acts: { name: 'Acts', order: 44, testament: 'new' },
  romans: { name: 'Romans', order: 45, testament: 'new' },
  '1_corinthians': { name: '1 Corinthians', order: 46, testament: 'new' },
  '2_corinthians': { name: '2 Corinthians', order: 47, testament: 'new' },
  galatians: { name: 'Galatians', order: 48, testament: 'new' },
  ephesians: { name: 'Ephesians', order: 49, testament: 'new' },
  philippians: { name: 'Philippians', order: 50, testament: 'new' },
  colossians: { name: 'Colossians', order: 51, testament: 'new' },
  '1_thessalonians': { name: '1 Thessalonians', order: 52, testament: 'new' },
  '2_thessalonians': { name: '2 Thessalonians', order: 53, testament: 'new' },
  '1_timothy': { name: '1 Timothy', order: 54, testament: 'new' },
  '2_timothy': { name: '2 Timothy', order: 55, testament: 'new' },
  titus: { name: 'Titus', order: 56, testament: 'new' },
  philemon: { name: 'Philemon', order: 57, testament: 'new' },
  hebrews: { name: 'Hebrews', order: 58, testament: 'new' },
  james: { name: 'James', order: 59, testament: 'new' },
  '1_peter': { name: '1 Peter', order: 60, testament: 'new' },
  '2_peter': { name: '2 Peter', order: 61, testament: 'new' },
  '1_john': { name: '1 John', order: 62, testament: 'new' },
  '2_john': { name: '2 John', order: 63, testament: 'new' },
  '3_john': { name: '3 John', order: 64, testament: 'new' },
  jude: { name: 'Jude', order: 65, testament: 'new' },
  revelation: { name: 'Revelation', order: 66, testament: 'new' }
};

export function translationMeta(code: string): TranslationMeta {
  return (
    TRANSLATIONS[code] ?? {
      name: code,
      language: 'en',
      language_name: code,
      direction: 'ltr'
    }
  );
}

export function bookMeta(code: string): BookMeta {
  return BOOKS[code] ?? { name: code, order: 999, testament: 'old' };
}
