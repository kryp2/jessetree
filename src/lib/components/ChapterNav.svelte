<script lang="ts">
  export let translation: string;
  export let bookCode: string;
  export let chapters: number[] = [];
  export let current: number;
  export let prev: number | null = null;
  export let next: number | null = null;

  let open = false;
  let root: HTMLElement;

  function toggle() {
    open = !open;
  }
  function close() {
    open = false;
  }
  function onWindowKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) open = false;
  }
  function onWindowClick(e: MouseEvent) {
    if (open && root && !root.contains(e.target as Node)) open = false;
  }

  const arrowBase =
    'flex items-center justify-center w-9 h-9 rounded-md border border-border transition text-lg leading-none';
</script>

<svelte:window on:keydown={onWindowKeydown} on:click={onWindowClick} />

<div class="relative" bind:this={root}>
  <div class="flex items-center gap-1 font-ui text-sm">
    {#if prev != null}
      <a
        href="/{translation}/{bookCode}/{prev}"
        class="{arrowBase} text-ink-muted hover:text-ink hover:bg-bg-elevated"
        aria-label="Previous chapter"
        title="Previous chapter">‹</a
      >
    {:else}
      <span class="{arrowBase} text-ink-muted opacity-30" aria-hidden="true">‹</span>
    {/if}

    <button
      type="button"
      class="flex items-center gap-1.5 h-9 px-3 rounded-md border border-border text-ink hover:bg-bg-elevated transition whitespace-nowrap"
      on:click|stopPropagation={toggle}
      aria-haspopup="true"
      aria-expanded={open}
      title="Jump to chapter"
    >
      <span>Chapter {current}</span>
      <span class="text-ink-muted text-xs" aria-hidden="true">▾</span>
    </button>

    {#if next != null}
      <a
        href="/{translation}/{bookCode}/{next}"
        class="{arrowBase} text-ink-muted hover:text-ink hover:bg-bg-elevated"
        aria-label="Next chapter"
        title="Next chapter">›</a
      >
    {:else}
      <span class="{arrowBase} text-ink-muted opacity-30" aria-hidden="true">›</span>
    {/if}
  </div>

  {#if open}
    <div
      class="absolute right-0 top-full mt-2 z-30 w-[17rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-bg-elevated shadow-xl p-3"
      role="group"
      aria-label="Jump to chapter"
    >
      <div class="max-h-[60vh] overflow-y-auto grid grid-cols-6 gap-1.5">
        {#each chapters as c}
          <a
            href="/{translation}/{bookCode}/{c}"
            on:click={close}
            class="flex items-center justify-center min-h-[40px] rounded border border-border font-ui text-sm tabular-nums transition"
            class:current={c === current}
            class:idle={c !== current}
            aria-current={c === current ? 'page' : undefined}>{c}</a
          >
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .current {
    color: rgb(var(--color-bg));
    background-color: rgb(var(--color-accent));
    border-color: rgb(var(--color-accent));
  }
  .idle:hover {
    background-color: rgb(var(--color-bg));
    color: rgb(var(--color-ink-strong));
  }
</style>
