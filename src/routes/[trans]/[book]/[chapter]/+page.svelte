<script lang="ts">
  import type { PageData } from './$types';
  import ChainBadge from '$lib/components/ChainBadge.svelte';
  export let data: PageData;

  $: dir = data.translation.direction;
</script>

<svelte:head>
  <title>{data.book.name} {data.chapter} — {data.translation.name} — jessetree</title>
</svelte:head>

<header class="mb-8">
  <nav class="font-ui text-xs text-parchment-500 mb-3 space-x-2">
    <a href="/{data.translation.code}" class="hover:text-parchment-900">{data.translation.name}</a>
    <span>›</span>
    <a href="/{data.translation.code}/{data.book.code}" class="hover:text-parchment-900">{data.book.name}</a>
  </nav>
  <h1 class="font-serif text-4xl">
    {data.book.name} <span class="text-parchment-500">{data.chapter}</span>
  </h1>
</header>

<article class="reader-prose" dir={dir} lang={data.translation.language}>
  {#each data.verses as v, i}
    <p id="v{v.verse}" class="verse">
      <span class="verse-num">{v.verse}</span><!--
      -->{#if i === 0}<span class="drop-cap">{v.text.slice(0, 1)}</span>{v.text.slice(1)}{:else}{v.text}{/if}
      <a
        class="chain-badge"
        href="/{data.translation.code}/{data.book.code}/{data.chapter}/{v.verse}/parallel"
        title="View this verse in all translations"
      >⇔</a>
      <ChainBadge txid={v.txid} block_height={v.block_height} />
    </p>
  {/each}
</article>

<nav class="mt-14 flex items-center justify-between font-ui text-sm border-t border-parchment-200 pt-6">
  {#if data.prev}
    <a href="/{data.translation.code}/{data.book.code}/{data.prev}" class="hover:text-parchment-500">
      ← chapter {data.prev}
    </a>
  {:else}
    <span></span>
  {/if}
  {#if data.next}
    <a href="/{data.translation.code}/{data.book.code}/{data.next}" class="hover:text-parchment-500 ml-auto">
      chapter {data.next} →
    </a>
  {/if}
</nav>

<style>
  .drop-cap {
    float: left;
    font-family: theme('fontFamily.serif');
    font-size: 3.5rem;
    line-height: 0.9;
    padding: 0.35rem 0.5rem 0 0;
    color: theme('colors.parchment.500');
    font-weight: 500;
  }
  [dir='rtl'] .drop-cap {
    float: right;
    padding: 0.35rem 0 0 0.5rem;
  }
</style>
