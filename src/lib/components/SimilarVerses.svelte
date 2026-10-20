<script lang="ts">
  import type { SimilarRef } from '$lib/data/types';

  export let translation: string;
  export let refs: SimilarRef[] = [];
  /** Fetch and show the text of each similar verse (client-side, lazily). */
  export let preview = true;

  let texts: Record<string, string> = {};
  let requested = new Set<string>();

  const key = (r: SimilarRef) => `${r.book}/${r.chapter}/${r.verse}`;

  $: if (preview && typeof window !== 'undefined') load(refs);

  function load(list: SimilarRef[]) {
    for (const r of list) {
      const k = `${translation}/${key(r)}`;
      if (requested.has(k)) continue;
      requested.add(k);
      fetch(`/api/verse/${translation}/${encodeURIComponent(r.book)}/${r.chapter}/${r.verse}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((v) => {
          if (v?.text) texts = { ...texts, [k]: v.text };
        })
        .catch(() => {});
    }
  }
</script>

{#if refs.length > 0}
  <ul class="space-y-2.5">
    {#each refs as r (key(r))}
      {@const text = texts[`${translation}/${key(r)}`]}
      <li>
        <a
          href="/{translation}/{r.book}/{r.chapter}#v{r.verse}"
          class="group block rounded -mx-1.5 px-1.5 py-1 hover:bg-bg transition"
        >
          <span class="font-ui text-xs text-ink-strong group-hover:text-accent">
            {r.book_name} {r.chapter}:{r.verse}
          </span>
          {#if text}
            <span class="block font-serif text-sm text-ink leading-snug mt-0.5 line-clamp-2">{text}</span>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
  <p class="mt-3 text-[11px] leading-snug text-ink-muted">
    Computed by language similarity, not a cross-reference. The machine points; you interpret.
  </p>
{/if}
