<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { onMount, createEventDispatcher } from 'svelte';

  export let translation: string;
  export let book: string;
  export let chapter: number;
  export let verse: number;
  export let txid: string;
  export let block_height: number;

  const dispatch = createEventDispatcher();
  const woc = env.PUBLIC_WOC_URL || 'https://whatsonchain.com/tx';

  $: noteKey = `jessetree:note:${translation}:${book}:${chapter}:${verse}`;
  let note = '';
  let loaded = false;
  let savedAt: string | null = null;

  // Reload the stored note whenever the panel is pointed at a new verse
  // (the component instance is reused as the reader moves between verses).
  $: if (loaded) loadNote(noteKey);

  function loadNote(key: string) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        note = parsed.text ?? '';
        savedAt = parsed.saved_at ?? null;
      } else {
        note = '';
        savedAt = null;
      }
    } catch {
      note = '';
      savedAt = null;
    }
  }

  onMount(() => {
    loadNote(noteKey);
    loaded = true;
  });

  function save() {
    const now = new Date().toISOString();
    if (note.trim()) {
      localStorage.setItem(noteKey, JSON.stringify({ text: note, saved_at: now }));
      savedAt = now;
    } else {
      localStorage.removeItem(noteKey);
      savedAt = null;
    }
  }

  function close() {
    dispatch('close');
  }

  function shortTxid(t: string) {
    return t.slice(0, 8) + '…' + t.slice(-6);
  }
</script>

<button class="vp-backdrop" on:click={close} tabindex="-1" aria-label="Close verse details"></button>

<aside class="vp-sheet font-ui text-sm" role="dialog" aria-label={`${book} ${chapter}:${verse} details`}>
  <div class="vp-handle" aria-hidden="true"></div>
  <div class="vp-body">
    <header class="flex items-baseline justify-between mb-4">
      <h3 class="text-xs uppercase tracking-widest text-ink-muted">
        {book} {chapter}:{verse}
      </h3>
      <button
        type="button"
        class="text-ink-muted hover:text-ink text-xl leading-none px-1 -mr-1"
        on:click={close}
        aria-label="Close"
        title="Close (Esc)"
      >×</button>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <section class="meta">
        <dl class="space-y-1.5 text-xs">
          <div class="flex justify-between gap-3">
            <dt class="text-ink-muted">Block</dt>
            <dd class="tabular-nums">
              {#if block_height > 0}
                {block_height.toLocaleString()}
              {:else}
                <span class="text-ink-muted">unconfirmed</span>
              {/if}
            </dd>
          </div>
          <div class="flex justify-between gap-3">
            <dt class="text-ink-muted">Txid</dt>
            <dd>
              <a
                class="underline hover:text-accent font-mono text-[11px]"
                href="{woc}/{txid}"
                target="_blank"
                rel="noopener noreferrer"
              >{shortTxid(txid)}</a>
            </dd>
          </div>
        </dl>

        <nav class="mt-3 flex flex-wrap gap-3 text-xs">
          <a
            href="/{translation}/{book}/{chapter}/{verse}/parallel"
            class="underline hover:text-accent"
          >compare in all translations →</a>
        </nav>
      </section>

      <section class="note">
        <label for="verse-note" class="text-xs uppercase tracking-widest text-ink-muted block mb-2">
          Private note
          <span class="normal-case tracking-normal text-[10px] ml-1 opacity-70">(only on this device)</span>
        </label>
        <textarea
          id="verse-note"
          bind:value={note}
          rows="3"
          placeholder="Thoughts, questions, a moment marked…"
          class="w-full rounded border border-border bg-bg p-2 text-sm font-serif focus:outline-none focus:border-accent transition"
          on:blur={save}
        ></textarea>
        <div class="flex items-center justify-between mt-1.5 text-[11px] text-ink-muted">
          <span>
            {#if savedAt}Saved locally{:else if loaded && note.trim() === ''}Not saved{/if}
          </span>
          <button
            type="button"
            class="underline hover:text-accent"
            on:click={save}
          >Save</button>
        </div>
      </section>
    </div>

    <section class="mt-5 pt-4 border-t border-border">
      <h4 class="text-xs uppercase tracking-widest text-ink-muted mb-2">
        Ornaments hung on this verse
      </h4>
      <p class="text-xs text-ink-muted italic">
        Public commentary arrives with the first invited scholars.
      </p>
    </section>
  </div>
</aside>

<style>
  /* Full-screen dismiss layer. On phones it dims the page; on wider screens it
     goes transparent and lets clicks through so reading stays interactive. */
  .vp-backdrop {
    position: fixed;
    inset: 0;
    z-index: 30;
    background: rgb(0 0 0 / 0.28);
    border: 0;
    margin: 0;
    padding: 0;
    cursor: default;
    animation: vp-fade 0.2s ease-out;
  }

  .vp-sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    margin: 0 auto;
    max-width: 42rem;
    max-height: 80vh;
    overflow-y: auto;
    background-color: rgb(var(--color-bg-elevated));
    border: 1px solid rgb(var(--color-border));
    border-bottom: none;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    box-shadow: 0 -8px 40px rgb(0 0 0 / 0.18);
    animation: vp-in 0.2s ease-out;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .vp-handle {
    width: 2.25rem;
    height: 0.25rem;
    border-radius: 999px;
    background: rgb(var(--color-border));
    margin: 0.6rem auto 0.1rem;
  }

  .vp-body {
    padding: 0.5rem 1.5rem 1.5rem;
  }

  @media (min-width: 640px) {
    .vp-backdrop {
      background: transparent;
      pointer-events: none;
    }
    .vp-sheet {
      left: auto;
      right: 1.5rem;
      bottom: 1.5rem;
      margin: 0;
      width: 24rem;
      max-width: calc(100vw - 3rem);
      border: 1px solid rgb(var(--color-border));
      border-radius: 14px;
    }
    .vp-handle {
      display: none;
    }
    .vp-body {
      padding: 1.25rem 1.5rem;
    }
  }

  @keyframes vp-in {
    from {
      transform: translateY(14px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes vp-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
