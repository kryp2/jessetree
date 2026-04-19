import { env } from '$env/dynamic/private';
import type { BibleSource } from './types.js';
import { PostgresBibleSource } from './postgres.js';
import { PeckReaderBibleSource } from './peck-reader.js';

let _source: BibleSource | null = null;

export function getBibleSource(): BibleSource {
  if (_source) return _source;

  const mode = env.JESSETREE_DATA_SOURCE ?? 'postgres';

  if (mode === 'peck-reader') {
    const url = env.PECK_READER_URL ?? 'https://reader.peck.to';
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
