<script lang="ts">
  import type { PageData } from './$types';
  import { env } from '$env/dynamic/public';
  import VerseFocusPanel from '$lib/components/VerseFocusPanel.svelte';
  export let data: PageData;

  $: dir = data.translation.direction;
  $: chapterRoot = data.verses[0]?.chapter_root ?? '';
  $: bookRoot = data.verses[0]?.book_root ?? '';
  const woc = env.PUBLIC_WOC_URL || 'https://whatsonchain.com/tx';

  let focusedVerse: number | null = null;

  function toggleFocus(n: number) {
    focusedVerse = focusedVerse === n ? null : n;
  }

  function shortTxid(t: string) {
    return t.slice(0, 8) + '…' + t.slice(-6);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') focusedVerse = null;
  }
</script>

<svelte:head>
  <title>{data.book.name} {data.chapter} — {data.translation.name} — jessetree</title>
</svelte:head>

<svelte:window on:keydown={onKeydown} />

<header class="mb-8">
  <nav class="font-ui text-xs text-ink-muted mb-3 space-x-2">
    <a href="/{data.translation.code}" class="hover:text-ink transition">{data.translation.name}</a>
    <span>›</span>
    <a href="/{data.translation.code}/{data.book.code}" class="hover:text-ink transition">{data.book.name}</a>
  </nav>
  <h1 class="font-serif text-4xl">
    {data.book.name} <span class="text-ink-muted">{data.chapter}</span>
  </h1>
  {#if chapterRoot || bookRoot}
    <div class="font-ui text-[11px] text-ink-muted mt-2 flex flex-wrap gap-x-4 gap-y-1">
      {#if bookRoot}
        <span>book root: <a class="underline hover:text-accent font-mono" href="{woc}/{bookRoot}" target="_blank" rel="noopener noreferrer">{shortTxid(bookRoot)}</a></span>
      {/if}
      {#if chapterRoot}
        <span>chapter root: <a class="underline hover:text-accent font-mono" href="{woc}/{chapterRoot}" target="_blank" rel="noopener noreferrer">{shortTxid(chapterRoot)}</a></span>
      {/if}
    </div>
  {/if}
</header>

<article class="reader-prose chapter-flow" dir={dir} lang={data.translation.language}>
  <p>
    {#each data.verses as v, i (v.verse)}
      <span class="verse" id="v{v.verse}"
        ><button
          type="button"
          class="verse-num"
          class:active={focusedVerse === v.verse}
          on:click={() => toggleFocus(v.verse)}
          title="Open verse panel"
          aria-expanded={focusedVerse === v.verse}
          >{v.verse}</button
        ><!--
        -->{#if i === 0}<span class="drop-cap">{v.text.slice(0, 1)}</span>{v.text.slice(1)}{:else}{v.text}{/if}<a
          class="chain-badge"
          href="{woc}/{v.txid}"
          target="_blank"
          rel="noopener noreferrer"
          title={`Hung on the tree at block ${v.block_height}\ntxid: ${v.txid}`}
          aria-label="View on-chain transaction">●</a
        ></span
      >{#if focusedVerse === v.verse}<VerseFocusPanel
          translation={data.translation.code}
          book={data.book.code}
          chapter={data.chapter}
          verse={v.verse}
          txid={v.txid}
          block_height={v.block_height}
          on:click={() => (focusedVerse = null)}
        />{/if}{' '}
    {/each}
  </p>
</article>

<nav class="mt-14 flex items-center justify-between font-ui text-sm border-t border-border pt-6">
  {#if data.prev}
    <a href="/{data.translation.code}/{data.book.code}/{data.prev}" class="hover:text-ink-muted transition">
      ← chapter {data.prev}
    </a>
  {:else}
    <span></span>
  {/if}
  {#if data.next}
    <a href="/{data.translation.code}/{data.book.code}/{data.next}" class="hover:text-ink-muted transition ml-auto">
      chapter {data.next} →
    </a>
  {/if}
</nav>

<style>
  .chapter-flow :global(p) {
    line-height: 1.85;
    text-align: left;
    hyphens: auto;
  }
  .verse {
    scroll-margin-top: 6rem;
  }
  .verse-num {
    display: inline-block;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.62em;
    font-weight: 500;
    color: rgb(var(--color-ink-muted));
    vertical-align: super;
    line-height: 1;
    margin-right: 0.15em;
    padding: 0 0.25em;
    border-radius: 3px;
    text-decoration: none;
    user-select: none;
    background: transparent;
    border: none;
    cursor: pointer;
    transition:
      color 0.15s,
      background-color 0.15s;
  }
  .verse-num:hover {
    color: rgb(var(--color-ink-strong));
    background-color: rgb(var(--color-bg-elevated));
  }
  .verse-num.active {
    color: rgb(var(--color-bg));
    background-color: rgb(var(--color-accent));
  }
  .chain-badge {
    display: inline-block;
    font-size: 0.45em;
    vertical-align: super;
    color: rgb(var(--color-border));
    margin-left: 0.2em;
    opacity: 0.55;
    transition:
      opacity 0.15s,
      color 0.15s;
    text-decoration: none;
    user-select: none;
  }
  .chain-badge:hover {
    opacity: 1;
    color: rgb(var(--color-accent));
  }
  .drop-cap {
    float: left;
    font-family: var(--reader-font);
    font-size: 3.5rem;
    line-height: 0.9;
    padding: 0.35rem 0.5rem 0 0;
    color: rgb(var(--color-ink-muted));
    font-weight: 500;
  }
  :global([dir='rtl']) .drop-cap {
    float: right;
    padding: 0.35rem 0 0 0.5rem;
  }
  :global([dir='rtl']) .chapter-flow :global(p) {
    text-align: right;
  }
</style>
