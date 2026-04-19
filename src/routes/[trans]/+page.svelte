<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  $: ot = data.books.filter((b) => b.testament === 'old');
  $: nt = data.books.filter((b) => b.testament === 'new');
  $: dir = data.translation.direction;
  $: pureOT = data.translation.code === 'he_wlc';
  $: pureNT = data.translation.code === 'grc_nt';
  $: otLabel = pureOT ? 'Tanakh' : 'Old Testament';
  $: ntLabel = pureNT ? 'New Testament' : 'New Testament';
</script>

<svelte:head>
  <title>{data.translation.name} — jessetree</title>
</svelte:head>

<header class="mb-10">
  <h1 class="font-serif text-4xl mb-2">{data.translation.name}</h1>
  <p class="font-ui text-sm text-ink-muted">{data.translation.language_name}</p>
</header>

{#if ot.length > 0}
  <section class="mb-10">
    <h2 class="font-ui text-xs uppercase tracking-widest text-ink-muted mb-4">{otLabel}</h2>
    <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2" dir={dir} lang={data.translation.language}>
      {#each ot as b}
        <li>
          <a href="/{data.translation.code}/{b.code}" class="block py-1.5 font-serif text-lg hover:text-ink-muted transition">
            {b.name}
          </a>
        </li>
      {/each}
    </ul>
  </section>
{/if}

{#if nt.length > 0}
  <section>
    <h2 class="font-ui text-xs uppercase tracking-widest text-ink-muted mb-4">{ntLabel}</h2>
    <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2" dir={dir} lang={data.translation.language}>
      {#each nt as b}
        <li>
          <a href="/{data.translation.code}/{b.code}" class="block py-1.5 font-serif text-lg hover:text-ink-muted transition">
            {b.name}
          </a>
        </li>
      {/each}
    </ul>
  </section>
{/if}
