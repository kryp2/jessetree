export type Translation = {
  code: string;
  name: string;
  language: string;
  language_name: string;
  direction: 'ltr' | 'rtl';
  verse_count: number;
};

export type Book = {
  code: string;
  name: string;
  order: number;
  chapter_count: number;
  verse_count: number;
  testament: 'old' | 'new';
};

export type Chapter = {
  number: number;
  verse_count: number;
};

export type Verse = {
  translation: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  txid: string;
  block_height: number;
  book_root?: string;
  chapter_root?: string;
};

export type ParallelVerse = {
  translation: string;
  translation_name: string;
  language: string;
  language_name: string;
  direction: 'ltr' | 'rtl';
  text: string;
  txid: string;
  block_height: number;
};

export interface BibleSource {
  listTranslations(): Promise<Translation[]>;
  listBooks(translation: string): Promise<Book[]>;
  listChapters(translation: string, book: string): Promise<Chapter[]>;
  getChapter(translation: string, book: string, chapter: number): Promise<Verse[]>;
  getVerse(
    translation: string,
    book: string,
    chapter: number,
    verse: number
  ): Promise<Verse | null>;
  getParallel(book: string, chapter: number, verse: number): Promise<ParallelVerse[]>;
  close(): Promise<void>;
}
