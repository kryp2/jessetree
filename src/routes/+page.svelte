<script lang="ts">
  import type { PageData } from './$types';
  import OrnamentSymbol from '$lib/components/OrnamentSymbol.svelte';
  export let data: PageData;
</script>

<svelte:head>
  <title>jessetree — an open reader of scripture hung on Bitcoin</title>
</svelte:head>

<section class="mb-14">
  <h1 class="font-serif text-5xl mb-4 leading-tight">
    jessetree
  </h1>
  <p class="font-serif italic text-xl text-parchment-500 max-w-2xl leading-relaxed">
    &ldquo;A shoot will come up from the stump of Jesse; from his roots a Branch will bear fruit.&rdquo;
    <span class="not-italic text-sm">— Isaiah 11:1</span>
  </p>
  <p class="font-serif text-lg mt-6 max-w-2xl leading-relaxed">
    Every verse below is a transaction on the Bitcoin blockchain. Each one was posted under the
    <code class="font-ui text-sm bg-parchment-100 px-1.5 py-0.5 rounded">peck.cross</code>
    app tag, following the Bitcoin Schema protocol. Read a chapter, and you are traversing
    a tree stored in a public ledger.
  </p>
</section>

<a
  href="/advent"
  class="group mb-14 flex items-center gap-5 rounded-xl border border-border bg-bg-elevated px-5 py-4 hover:border-accent transition"
>
  <span class="text-accent shrink-0"><OrnamentSymbol name="stump" size={40} /></span>
  <span class="min-w-0">
    <span class="block font-serif text-2xl leading-tight">The Jesse Tree</span>
    <span class="block font-ui text-sm text-ink-muted mt-1">
      An Advent journey from creation to Christmas, one ornament and one reading a day.
    </span>
  </span>
  <span class="ml-auto font-ui text-ink-muted group-hover:text-accent transition" aria-hidden="true">→</span>
</a>

<section>
  <h2 class="font-ui text-xs uppercase tracking-widest text-parchment-500 mb-4">Translations</h2>
  <ul class="divide-y divide-border border-y border-border">
    {#each data.translations as t}
      <li>
        <a href="/{t.code}" class="flex items-baseline justify-between gap-4 py-4 hover:bg-bg-elevated -mx-2 px-2 transition rounded">
          <div class="min-w-0 flex-1">
            <div class="font-serif text-xl truncate">{t.name}</div>
            <div class="font-ui text-xs text-ink-muted mt-1 flex items-baseline gap-3 whitespace-nowrap overflow-hidden">
              <span>{t.language_name}</span>
              <span class="tabular-nums">{t.year}</span>
              <span class="truncate">{t.publisher}</span>
            </div>
          </div>
          <div class="font-ui text-xs text-ink-muted tabular-nums shrink-0">
            {t.verse_count.toLocaleString()} verses
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>
