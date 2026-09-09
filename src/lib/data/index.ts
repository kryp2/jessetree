import { env } from '$env/dynamic/private';
import type { BibleSource } from './types.js';
import { PostgresBibleSource } from './postgres.js';
import { PeckReaderBibleSource } from './peck-reader.js';

let _source: BibleSource | null = null;

export function getBibleSource(): BibleSource {
  if (_source) return _source;

  const mode = env.JESSETREE_DATA_SOURCE ?? 'postgres';

  if (mode === 'overlay' || mode === 'peck-reader') {
    // 'overlay' and 'peck-reader' are the same HTTP client class — only the
    // default URL differs. peck-reader was retired 2026-09-04; the overlay
    // (overlay.peck.to, repo peck-overlay-schema) absorbed its bible
    // endpoints. 'peck-reader' is kept as an alias for anyone who forked
    // this before the retirement and points PECK_READER_URL at their own
    // peck-reader-compatible service.
    const defaultUrl = mode === 'overlay' ? 'https://overlay.peck.to' : 'https://reader.peck.to';
    const url = env.PECK_READER_URL ?? defaultUrl;
    _source = new PeckReaderBibleSource(url);
  } else {
    _source = new PostgresBibleSource({
      host: env.PGHOST ?? '127.0.0.1',
      port: env.PGPORT ? parseInt(env.PGPORT, 10) : 5433,
      user: env.PGUSER ?? 'peck_user',
      password: env.PGPASSWORD ?? '',
      database: env.PGDATABASE ?? 'peck_db',
      ssl: env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
    });
  }

  return _source;
}

export type { BibleSource } from './types.js';
export * from './types.js';
