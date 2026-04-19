<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.book.name} — {data.translation.name} — jessetree</title>
</svelte:head>

<header class="mb-8">
  <nav class="font-ui text-xs text-parchment-500 mb-3">
    <a href="/{data.translation.code}" class="hover:text-parchment-900">{data.translation.name}</a>
  </nav>
  <h1 class="font-serif text-4xl">{data.book.name}</h1>
</header>

<section>
  <h2 class="font-ui text-xs uppercase tracking-widest text-parchment-500 mb-4">Chapters</h2>
  <ul class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
    {#each data.chapters as c}
      <li>
        <a
          href="/{data.translation.code}/{data.book.code}/{c.number}"
          class="block text-center py-2 border border-parchment-200 rounded hover:bg-parchment-100 transition font-serif text-lg tabular-nums"
          title={`${c.verse_count} verses`}
        >
          {c.number}
        </a>
      </li>
    {/each}
  </ul>
</section>
