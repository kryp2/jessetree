<script lang="ts">
  import type { PageData } from './$types';
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

<section>
  <h2 class="font-ui text-xs uppercase tracking-widest text-parchment-500 mb-4">Translations</h2>
  <ul class="divide-y divide-parchment-200 border-y border-parchment-200">
    {#each data.translations as t}
      <li>
        <a href="/{t.code}" class="flex items-baseline justify-between py-4 hover:bg-parchment-100 -mx-2 px-2 transition rounded">
          <div>
            <div class="font-serif text-xl">{t.name}</div>
            <div class="font-ui text-xs text-parchment-500 mt-1">
              {t.language_name} · <code>{t.code}</code>
            </div>
          </div>
          <div class="font-ui text-xs text-parchment-500 tabular-nums">
            {t.verse_count.toLocaleString()} verses
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>
