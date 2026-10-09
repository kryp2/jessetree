<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import JesseTree from '$lib/components/JesseTree.svelte';
  import OrnamentSymbol from '$lib/components/OrnamentSymbol.svelte';
  import { ADVENT_TRANSLATIONS, formatDate, hungCount } from '$lib/advent/plan';
  import { bookMeta, fromCanonBook, translationMeta } from '$lib/data/catalog';
  export let data: PageData;

  // The server decides "today" in UTC; the reader's own calendar wins once
  // the page is running, unless a preview date was asked for.
  let today = data.today;
  onMount(() => {
    if (data.fixedToday) return;
    const d = new Date();
    today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  $: days = data.days;
  $: hung = hungCount(days, today);
  $: todayDay = days.find((d) => d.date === today) ?? null;
  $: before = today < days[0].date;
  $: after = today > days[days.length - 1].date;
  $: t = data.translation.code;
  $: query = (() => {
    const p = new URLSearchParams();
    if (data.explicitTranslation) p.set('t', t);
    if (data.fixedToday) p.set('today', data.fixedToday);
    const s = p.toString();
    return s ? `?${s}` : '';
  })();

  function ref(d: (typeof days)[number]) {
    const r = d.ornament.reading;
    const book = fromCanonBook(t, r.book) ?? r.book;
    return `${bookMeta(book).name} ${r.chapter}:${r.from}–${r.to}`;
  }

  function withT(code: string) {
    const p = new URLSearchParams();
    p.set('t', code);
    if (data.fixedToday) p.set('today', data.fixedToday);
    return `?${p}`;
  }
</script>

<svelte:head>
  <title>The Jesse Tree · Advent {data.year} — jessetree</title>
  <meta
    name="description"
    content="An Advent journey from creation to Christmas: one ornament and one reading a day, every verse read from the Bitcoin blockchain."
  />
</svelte:head>

<header class="mb-6 text-center">
  <p class="font-ui text-xs uppercase tracking-widest text-ink-muted mb-3">Advent {data.year}</p>
  <h1 class="font-serif text-5xl mb-4">The Jesse Tree</h1>
  <p class="font-serif italic text-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
    &ldquo;And there shall come forth a rod out of the stem of Jesse, and a Branch shall grow out of his
    roots.&rdquo;
    <span class="not-italic text-sm">— Isaiah 11:1</span>
  </p>
  <p class="font-ui text-sm text-ink mt-5">
    {#if before}
      Advent begins {formatDate(days[0].date)}. One ornament a day until Christmas Eve.
    {:else if after}
      All {days.length} ornaments are hung. Merry Christmas.
    {:else if todayDay}
      Day {todayDay.n} of {days.length}: <a
        class="underline hover:text-accent"
        href="/advent/{todayDay.ornament.slug}{query}">{todayDay.ornament.figure}</a
      >
    {/if}
  </p>
</header>

<JesseTree {days} {hung} todayN={todayDay?.n ?? null} {query} />

<nav class="mt-6 mb-10 font-ui text-xs text-ink-muted flex flex-wrap justify-center gap-x-1 gap-y-2" aria-label="Translation">
  {#each ADVENT_TRANSLATIONS as code}
    <a
      href={withT(code)}
      class="px-2.5 py-1 rounded-full border transition {code === t
        ? 'border-accent text-ink-strong'
        : 'border-transparent hover:border-border hover:text-ink'}"
      aria-current={code === t ? 'true' : undefined}>{translationMeta(code).name}</a
    >
  {/each}
</nav>

<section>
  <h2 class="font-ui text-xs uppercase tracking-widest text-ink-muted mb-4">The readings</h2>
  <ol class="divide-y divide-border border-y border-border">
    {#each days as d (d.ornament.slug)}
      {@const isHung = d.n <= hung}
      <li>
        <a
          href="/advent/{d.ornament.slug}{query}"
          class="flex items-center gap-4 py-3 -mx-2 px-2 rounded hover:bg-bg-elevated transition"
          class:opacity-60={!isHung && !before}
        >
          <span class="font-ui text-xs tabular-nums text-ink-muted w-6 text-right shrink-0">{d.n}</span>
          <span class="shrink-0 {isHung ? 'text-accent' : 'text-ink-muted'}">
            <OrnamentSymbol name={d.ornament.symbol} size={26} />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block font-serif text-lg leading-tight">{d.ornament.figure}</span>
            <span class="block font-ui text-xs text-ink-muted mt-0.5">{ref(d)}</span>
          </span>
          <span class="font-ui text-xs text-ink-muted shrink-0 hidden sm:block">{formatDate(d.date)}</span>
        </a>
      </li>
    {/each}
  </ol>
</section>

<p class="font-ui text-xs text-ink-muted mt-8 leading-relaxed max-w-2xl">
  The Jesse Tree is an old Advent custom: each day an ornament is hung for one of the people and
  promises in the line that leads to Christ. Every verse here is read straight from its Bitcoin
  transaction; nothing is paraphrased.
</p>
