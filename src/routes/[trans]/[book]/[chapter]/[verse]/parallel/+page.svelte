<script lang="ts">
  import type { PageData } from './$types';
  import ChainBadge from '$lib/components/ChainBadge.svelte';
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.book.name} {data.chapter}:{data.verse} — parallel — jessetree</title>
</svelte:head>

<header class="mb-8">
  <nav class="font-ui text-xs text-parchment-500 mb-3 space-x-2">
    <a href="/{data.translation.code}/{data.book.code}/{data.chapter}#v{data.verse}" class="hover:text-parchment-900">
      ← back to {data.book.name} {data.chapter}
    </a>
  </nav>
  <h1 class="font-serif text-4xl">
    {data.book.name} <span class="text-parchment-500">{data.chapter}:{data.verse}</span>
  </h1>
  <p class="font-ui text-xs uppercase tracking-widest text-parchment-500 mt-2">
    in {data.translations.length} translations
  </p>
</header>

<ul class="space-y-8">
  {#each data.translations as t}
    <li class="border-l-2 border-parchment-200 pl-5">
      <header class="font-ui text-xs text-parchment-500 mb-2 flex items-center gap-3">
        <span class="font-semibold text-parchment-900">{t.translation_name}</span>
        <span>{t.language_name}</span>
        <ChainBadge txid={t.txid} block_height={t.block_height} />
      </header>
      <p class="font-serif text-xl leading-relaxed" dir={t.direction} lang={t.language}>
        {t.text}
      </p>
    </li>
  {/each}
</ul>
