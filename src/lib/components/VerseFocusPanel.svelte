<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { onMount } from 'svelte';

  export let translation: string;
  export let book: string;
  export let chapter: number;
  export let verse: number;
  export let txid: string;
  export let block_height: number;

  const woc = env.PUBLIC_WOC_URL || 'https://whatsonchain.com/tx';

  $: noteKey = `jessetree:note:${translation}:${book}:${chapter}:${verse}`;
  let note = '';
  let loaded = false;
  let savedAt: string | null = null;

  onMount(() => {
    try {
      const raw = localStorage.getItem(noteKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        note = parsed.text ?? '';
        savedAt = parsed.saved_at ?? null;
      }
    } catch {
      // ignore
    }
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

  function shortTxid(t: string) {
    return t.slice(0, 8) + '…' + t.slice(-6);
  }
</script>

<div class="focus-panel font-ui text-sm">
  <header class="flex items-baseline justify-between mb-4">
    <h3 class="text-xs uppercase tracking-widest text-ink-muted">
      {book} {chapter}:{verse}
    </h3>
    <button
      type="button"
      class="text-ink-muted hover:text-ink text-lg leading-none"
      on:click
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
        class="w-full rounded border border-border bg-bg-elevated p-2 text-sm font-serif focus:outline-none focus:border-accent transition"
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

<style>
  .focus-panel {
    background-color: rgb(var(--color-bg-elevated));
    border: 1px solid rgb(var(--color-border));
    border-radius: 6px;
    padding: 1.25rem 1.5rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
</style>
