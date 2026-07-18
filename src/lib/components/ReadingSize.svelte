<script lang="ts">
  import { onMount } from 'svelte';

  type Size = 's' | 'm' | 'l' | 'xl';
  const SIZES: { id: Size; label: string; glyph: string }[] = [
    { id: 's', label: 'Small text', glyph: '0.8em' },
    { id: 'm', label: 'Medium text', glyph: '0.95em' },
    { id: 'l', label: 'Large text', glyph: '1.15em' },
    { id: 'xl', label: 'Extra-large text', glyph: '1.35em' }
  ];

  let current: Size = 'm';

  onMount(() => {
    const saved = localStorage.getItem('jessetree-reading-size') as Size | null;
    current = saved && SIZES.some((s) => s.id === saved) ? saved : 'm';
    apply(current);
  });

  function apply(s: Size) {
    current = s;
    document.documentElement.setAttribute('data-reading-size', s);
    localStorage.setItem('jessetree-reading-size', s);
  }
</script>

<div class="flex items-center gap-0.5 font-ui" role="group" aria-label="Reading text size">
  {#each SIZES as s}
    <button
      type="button"
      class="w-7 h-7 rounded flex items-center justify-center leading-none transition"
      class:active={current === s.id}
      class:inactive={current !== s.id}
      style="font-size: {s.glyph}"
      on:click={() => apply(s.id)}
      title={s.label}
      aria-pressed={current === s.id}
    >
      <span aria-hidden="true">A</span>
      <span class="sr-only">{s.label}</span>
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
