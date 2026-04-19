import pg from 'pg';
import type {
  BibleSource,
  Book,
  Chapter,
  ParallelVerse,
  Translation,
  Verse
} from './types.js';
import { bookMeta, translationMeta } from './catalog.js';

const { Pool } = pg;

/**
 * PostgresBibleSource reads the canonical_tree + pecks tables directly.
 *
 * Expects the canonical_tree migration from peck-mcp to have been run against
 * peck_db. In the peck-to dev environment this means the Cloud SQL proxy
 * listening on 127.0.0.1:5433.
 */
export class PostgresBibleSource implements BibleSource {
  private pool: pg.Pool;
  private readonly app = 'peck.cross';

  constructor(cfg: pg.PoolConfig) {
    this.pool = new Pool({
      max: 5,
      idleTimeoutMillis: 10_000,
      ...cfg
    });
  }

  async listTranslations(): Promise<Translation[]> {
    const { rows } = await this.pool.query<{ translation: string; count: string }>(
      `SELECT translation, COUNT(*)::text AS count
       FROM canonical_tree
       WHERE app = $1 AND leaf_kind = 'verse'
       GROUP BY translation
       ORDER BY translation`,
      [this.app]
    );
    return rows.map((r) => {
      const m = translationMeta(r.translation);
      return {
        code: r.translation,
        name: m.name,
        language: m.language,
        language_name: m.language_name,
        direction: m.direction,
        verse_count: parseInt(r.count, 10)
      };
    });
  }

  async listBooks(translation: string): Promise<Book[]> {
    const { rows } = await this.pool.query<{
      book: string;
      chapters: string;
      verses: string;
    }>(
      `SELECT book,
              COUNT(DISTINCT chapter)::text AS chapters,
              COUNT(*)::text AS verses
       FROM canonical_tree
       WHERE app = $1 AND translation = $2 AND leaf_kind = 'verse'
       GROUP BY book`,
      [this.app, translation]
    );
    const books = rows.map((r) => {
      const m = bookMeta(r.book);
      return {
        code: r.book,
        name: m.name,
        order: m.order,
        testament: m.testament,
        chapter_count: parseInt(r.chapters, 10),
        verse_count: parseInt(r.verses, 10)
      };
    });
    books.sort((a, b) => a.order - b.order);
    return books;
  }

  async listChapters(translation: string, book: string): Promise<Chapter[]> {
    const { rows } = await this.pool.query<{ chapter: number; verses: string }>(
      `SELECT chapter, COUNT(*)::text AS verses
       FROM canonical_tree
       WHERE app = $1 AND translation = $2 AND book = $3 AND leaf_kind = 'verse'
       GROUP BY chapter
       ORDER BY chapter`,
      [this.app, translation, book]
    );
    return rows.map((r) => ({
      number: r.chapter,
      verse_count: parseInt(r.verses, 10)
    }));
  }

  async getChapter(translation: string, book: string, chapter: number): Promise<Verse[]> {
    const { rows } = await this.pool.query<{
      leaf_no: number;
      txid: string;
      block_height: number;
      content: string | null;
    }>(
      `SELECT ct.leaf_no, ct.txid, ct.block_height, p.content
       FROM canonical_tree ct
       LEFT JOIN pecks p ON p.txid = ct.txid
       WHERE ct.app = $1 AND ct.translation = $2 AND ct.book = $3
         AND ct.chapter = $4 AND ct.leaf_kind = 'verse'
       ORDER BY ct.leaf_no`,
      [this.app, translation, book, chapter]
    );
    return rows.map((r) => ({
      translation,
      book,
      chapter,
      verse: r.leaf_no,
      text: r.content ?? '',
      txid: r.txid,
      block_height: r.block_height ?? 0
    }));
  }

  async getVerse(
    translation: string,
    book: string,
    chapter: number,
    verse: number
  ): Promise<Verse | null> {
    const { rows } = await this.pool.query<{
      txid: string;
      block_height: number;
      content: string | null;
    }>(
      `SELECT ct.txid, ct.block_height, p.content
       FROM canonical_tree ct
       LEFT JOIN pecks p ON p.txid = ct.txid
       WHERE ct.app = $1 AND ct.translation = $2 AND ct.book = $3
         AND ct.chapter = $4 AND ct.leaf_no = $5 AND ct.leaf_kind = 'verse'
       LIMIT 1`,
      [this.app, translation, book, chapter, verse]
    );
    const r = rows[0];
    if (!r) return null;
    return {
      translation,
      book,
      chapter,
      verse,
      text: r.content ?? '',
      txid: r.txid,
      block_height: r.block_height ?? 0
    };
  }

  async getParallel(book: string, chapter: number, verse: number): Promise<ParallelVerse[]> {
    const { rows } = await this.pool.query<{
      translation: string;
      txid: string;
      block_height: number;
      content: string | null;
    }>(
      `SELECT ct.translation, ct.txid, ct.block_height, p.content
       FROM canonical_tree ct
       LEFT JOIN pecks p ON p.txid = ct.txid
       WHERE ct.app = $1 AND ct.book = $2 AND ct.chapter = $3
         AND ct.leaf_no = $4 AND ct.leaf_kind = 'verse'
       ORDER BY ct.translation`,
      [this.app, book, chapter, verse]
    );
    return rows.map((r) => {
      const m = translationMeta(r.translation);
      return {
        translation: r.translation,
        translation_name: m.name,
        language: m.language,
        language_name: m.language_name,
        direction: m.direction,
        text: r.content ?? '',
        txid: r.txid,
        block_height: r.block_height ?? 0
      };
    });
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
