import type {
  BibleSource,
  Book,
  Chapter,
  ParallelVerse,
  Translation,
  Verse
} from './types.js';

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

  listTranslations(): Promise<Translation[]> {
    return this.get<Translation[]>(`/v1/bible/translations`);
  }

  listBooks(translation: string): Promise<Book[]> {
    return this.get<Book[]>(`/v1/bible/${encodeURIComponent(translation)}/books`);
  }

  listChapters(translation: string, book: string): Promise<Chapter[]> {
    return this.get<Chapter[]>(
      `/v1/bible/${encodeURIComponent(translation)}/${encodeURIComponent(book)}/chapters`
    );
  }

  getChapter(translation: string, book: string, chapter: number): Promise<Verse[]> {
    return this.get<Verse[]>(
      `/v1/bible/${encodeURIComponent(translation)}/${encodeURIComponent(book)}/${chapter}`
    );
  }

  getVerse(
    translation: string,
    book: string,
    chapter: number,
    verse: number
  ): Promise<Verse | null> {
    return this.get<Verse | null>(
      `/v1/bible/${encodeURIComponent(translation)}/${encodeURIComponent(book)}/${chapter}/${verse}`
    );
  }

  getParallel(book: string, chapter: number, verse: number): Promise<ParallelVerse[]> {
    return this.get<ParallelVerse[]>(
      `/v1/bible/parallel/${encodeURIComponent(book)}/${chapter}/${verse}`
    );
  }

  async close(): Promise<void> {
    // stateless
  }
}
