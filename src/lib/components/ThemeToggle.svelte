<script lang="ts">
  import { onMount } from 'svelte';

  type Theme = 'parchment' | 'ink' | 'midnight';
  const THEMES: { id: Theme; label: string; glyph: string }[] = [
    { id: 'parchment', label: 'Parchment', glyph: '◐' },
    { id: 'ink', label: 'Ink', glyph: '●' },
    { id: 'midnight', label: 'Midnight', glyph: '○' }
  ];

  let current: Theme = 'parchment';

  onMount(() => {
    const saved = localStorage.getItem('jessetree-theme') as Theme | null;
    if (saved && THEMES.some((t) => t.id === saved)) {
      current = saved;
    } else {
      current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'midnight' : 'parchment';
    }
    apply(current);
  });

  function apply(t: Theme) {
    current = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('jessetree-theme', t);
  }
</script>

<div class="flex items-center gap-1 font-ui text-sm" role="group" aria-label="Theme">
  {#each THEMES as t}
    <button
      type="button"
      class="w-7 h-7 rounded flex items-center justify-center transition"
      class:active={current === t.id}
      class:inactive={current !== t.id}
      on:click={() => apply(t.id)}
      title={t.label}
      aria-pressed={current === t.id}
    >
      <span aria-hidden="true">{t.glyph}</span>
      <span class="sr-only">{t.label}</span>
    </button>
  {/each}
</div>

<style>
  .active {
    color: rgb(var(--color-ink-strong));
    background-color: rgb(var(--color-bg-elevated));
  }
  .inactive {
    color: rgb(var(--color-ink-muted));
  }
  .inactive:hover {
    color: rgb(var(--color-ink));
  }
</style>
