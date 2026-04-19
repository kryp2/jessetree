<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  $: onHome = $page.url.pathname === '/';
</script>

<svelte:head>
  <!-- Set theme before first paint to avoid flash of wrong theme. -->
  <script>
    (function () {
      try {
        var t = localStorage.getItem('jessetree-theme');
        if (!t) {
          t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'midnight' : 'parchment';
        }
        document.documentElement.setAttribute('data-theme', t);
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'parchment');
      }
    })();
  </script>
</svelte:head>

<div class="min-h-screen flex flex-col">
  <header class="border-b border-border bg-bg-elevated/80 backdrop-blur sticky top-0 z-10">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
      <a href="/" class="font-ui font-semibold tracking-tight text-ink-strong hover:text-ink-muted transition">
        jessetree
      </a>
      <div class="flex items-center gap-6">
        <nav class="font-ui text-sm text-ink-muted">
          {#if !onHome}
            <a href="/" class="hover:text-ink transition">translations</a>
          {/if}
        </nav>
        <ThemeToggle />
      </div>
    </div>
  </header>

  <main class="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
    <slot />
  </main>

  <footer class="border-t border-border mt-16">
    <div class="max-w-4xl mx-auto px-6 py-8 font-ui text-xs text-ink-muted flex flex-wrap gap-x-6 gap-y-2 items-center">
      <span>
        Scripture read from <a href="https://bitcoinschema.org" class="underline hover:text-ink">Bitcoin</a>.
      </span>
      <a href="https://github.com/kryp2/jessetree" class="underline hover:text-ink ml-auto">source</a>
    </div>
  </footer>
</div>
