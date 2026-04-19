import type {
  BibleSource,
  Book,
  Chapter,
  ParallelVerse,
  Translation,
  Verse
} from './types.js';
import { bookMeta, resolveTestament, translationMeta } from './catalog.js';

type RawTranslation = { code: string; verse_count: number };
type RawBook = { code: string; chapter_count: number; verse_count: number };
type RawVerse = {
  translation: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  txid: string;
  block_height: number;
};

/**
 * PeckReaderBibleSource talks to a deployed peck-reader HTTP API.
 *
 * Expects the bible endpoints added in peck-reader/internal/handler/bible.go.
 * Endpoints mirror BibleSource one-to-one.
 */
export class PeckReaderBibleSource implements BibleSource {
  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) throw new Error(`${path} -> ${res.status}`);
    const body = (await res.json()) as { status: string; data: T; error?: string };
    if (body.status !== 'ok') throw new Error(body.error ?? `${path} returned non-ok`);
    return body.data;
  }

  async listTranslations(): Promise<Translation[]> {
    const raw = await this.get<RawTranslation[]>(`/v1/bible/translations`);
    return raw.map((r) => {
      const m = translationMeta(r.code);
      return {
        code: r.code,
        name: m.name,
        language: m.language,
        language_name: m.language_name,
        direction: m.direction,
        verse_count: r.verse_count
      };
    });
  }

  async listBooks(translation: string): Promise<Book[]> {
    const raw = await this.get<RawBook[]>(
      `/v1/bible/${encodeURIComponent(translation)}/books`
    );
    const books: Book[] = raw.map((r) => {
      const m = bookMeta(r.code);
      const testament = resolveTestament(translation, r.code) ?? m.testament;
      return {
        code: r.code,
        name: m.name,
        order: m.order,
        testament,
        chapter_count: r.chapter_count,
        verse_count: r.verse_count
      };
    });
    books.sort((a, b) => {
      if (a.testament !== b.testament) return a.testament === 'old' ? -1 : 1;
      if (a.order !== b.order) return a.order - b.order;
      return a.code.localeCompare(b.code);
    });
    return books;
  }

  listChapters(translation: string, book: string): Promise<Chapter[]> {
    return this.get<Chapter[]>(
      `/v1/bible/${encodeURIComponent(translation)}/${encodeURIComponent(book)}/chapters`
    );
  }

  getChapter(translation: string, book: string, chapter: number): Promise<Verse[]> {
    return this.get<RawVerse[]>(
      `/v1/bible/${encodeURIComponent(translation)}/${encodeURIComponent(book)}/${chapter}`
    );
  }

  getVerse(
    translation: string,
    book: string,
    chapter: number,
    verse: number
  ): Promise<Verse | null> {
    return this.get<RawVerse | null>(
      `/v1/bible/${encodeURIComponent(translation)}/${encodeURIComponent(book)}/${chapter}/${verse}`
    );
  }

  async getParallel(book: string, chapter: number, verse: number): Promise<ParallelVerse[]> {
    const raw = await this.get<RawVerse[]>(
      `/v1/bible/parallel/${encodeURIComponent(book)}/${chapter}/${verse}`
    );
    return raw.map((r) => {
      const m = translationMeta(r.translation);
      return {
        translation: r.translation,
        translation_name: m.name,
        language: m.language,
        language_name: m.language_name,
        direction: m.direction,
        text: r.text,
        txid: r.txid,
        block_height: r.block_height
      };
    });
  }

  async close(): Promise<void> {
    // stateless
  }
}
