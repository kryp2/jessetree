<script lang="ts">
  import type { PageData } from './$types';
  import { env } from '$env/dynamic/public';
  import OrnamentSymbol from '$lib/components/OrnamentSymbol.svelte';
  import SimilarVerses from '$lib/components/SimilarVerses.svelte';
  import { formatDate } from '$lib/advent/plan';
  export let data: PageData;

  const woc = env.PUBLIC_WOC_URL || 'https://whatsonchain.com/tx';

  $: o = data.day.ornament;
  $: r = o.reading;
  $: t = data.translation.code;
  $: query = (() => {
    const p = new URLSearchParams();
    if (data.explicitTranslation) p.set('t', t);
    if (data.fixedToday) p.set('today', data.fixedToday);
    const s = p.toString();
    return s ? `?${s}` : '';
  })();
  $: refText = `${data.book.name} ${r.chapter}:${r.from}–${r.to}`;
</script>

<svelte:head>
  <title>Day {data.day.n}: {o.figure} · The Jesse Tree — jessetree</title>
  <meta name="description" content="{o.figure} — {refText}. Day {data.day.n} of the Jesse Tree, read from the Bitcoin blockchain." />
</svelte:head>

<nav class="font-ui text-xs text-ink-muted mb-8 space-x-2">
  <a href="/advent{query}" class="hover:text-ink transition">The Jesse Tree</a>
  <span aria-hidden="true">›</span>
  <span>Day {data.day.n} of {data.total} · {formatDate(data.day.date)}</span>
</nav>

<header class="text-center mb-10">
  <div class="ornament mx-auto mb-5 text-accent">
    <OrnamentSymbol name={o.symbol} size={46} label={o.symbolLabel} />
  </div>
  <h1 class="font-serif text-5xl mb-2">{o.figure}</h1>
  <p class="font-ui text-xs uppercase tracking-widest text-ink-muted">{o.symbolLabel}</p>
</header>

<section class="max-w-prose mx-auto">
  <div class="flex items-baseline justify-between gap-4 mb-4 font-ui text-xs text-ink-muted">
    <a href="/{t}/{data.book.code}/{r.chapter}#v{r.from}" class="hover:text-ink underline">{refText}</a>
    <span>{data.translation.name}</span>
  </div>

  <article class="reader-prose" dir={data.translation.direction} lang={data.translation.language}>
    <p>
      {#each data.verses as v (v.verse)}
        <span class="verse" class:key={v.verse === r.key}
          ><sup class="vn">{v.verse}</sup>{v.text}<a
            class="chain-badge"
            href="{woc}/{v.txid}"
            target="_blank"
            rel="noopener noreferrer"
            title={`Hung on the tree at block ${v.block_height}\ntxid: ${v.txid}`}
            aria-label="View on-chain transaction">●</a
          ></span
        >{' '}
      {/each}
    </p>
  </article>

  {#if data.similar.length > 0}
    <section class="mt-10 pt-6 border-t border-border">
      <h2 class="font-ui text-xs uppercase tracking-widest text-ink-muted mb-1">The thread</h2>
      <p class="font-ui text-xs text-ink-muted mb-4">
        Verses that sound like {data.book.name} {r.chapter}:{r.key}
      </p>
      <SimilarVerses translation={t} refs={data.similar} />
    </section>
  {/if}
</section>

<nav class="mt-14 flex items-center justify-between gap-3 font-ui text-sm border-t border-border pt-6">
  {#if data.prev}
    <a
      href="/advent/{data.prev.ornament.slug}{query}"
      class="inline-flex items-center min-h-[44px] px-3 -ml-3 rounded-md text-ink-muted hover:text-ink hover:bg-bg-elevated transition"
      rel="prev">← {data.prev.ornament.figure}</a
    >
  {:else}
    <span aria-hidden="true"></span>
  {/if}
  <a
    href="/advent{query}"
    class="inline-flex items-center min-h-[44px] px-3 rounded-md text-ink-muted hover:text-ink hover:bg-bg-elevated transition"
    >The tree</a
  >
  {#if data.next}
    <a
      href="/advent/{data.next.ornament.slug}{query}"
      class="inline-flex items-center min-h-[44px] px-3 -mr-3 rounded-md text-ink-muted hover:text-ink hover:bg-bg-elevated transition"
      rel="next">{data.next.ornament.figure} →</a
    >
  {:else}
    <span aria-hidden="true"></span>
  {/if}
</nav>

<style>
  .ornament {
    width: 6rem;
    height: 6rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    border: 1.5px solid rgb(var(--color-accent));
    background: rgb(var(--color-bg-elevated));
  }
  .vn {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.6em;
    color: rgb(var(--color-ink-muted));
    margin-right: 0.2em;
  }
  .verse.key {
    background: linear-gradient(transparent 62%, rgb(var(--color-accent) / 0.18) 62%);
  }
  .chain-badge {
    font-size: 0.45em;
    vertical-align: super;
    opacity: 0.55;
  }
</style>
