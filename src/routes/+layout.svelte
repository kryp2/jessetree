<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  $: onHome = $page.url.pathname === '/';
</script>

<div class="min-h-screen flex flex-col">
  <header class="border-b border-parchment-200 bg-parchment-50/80 backdrop-blur sticky top-0 z-10">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-baseline justify-between">
      <a href="/" class="font-ui font-semibold tracking-tight text-parchment-900 hover:text-parchment-500 transition">
        jessetree
      </a>
      <nav class="font-ui text-sm text-parchment-500">
        {#if !onHome}
          <a href="/" class="hover:text-parchment-900 transition">translations</a>
        {/if}
      </nav>
    </div>
  </header>

  <main class="flex-1 max-w-4xl mx-auto px-6 py-10 w-full">
    <slot />
  </main>

  <footer class="border-t border-parchment-200 mt-16">
    <div class="max-w-4xl mx-auto px-6 py-8 font-ui text-xs text-parchment-500 flex flex-wrap gap-x-6 gap-y-2 items-center">
      <span>A shoot will come up from the stump of Jesse. — Isaiah 11:1</span>
      <span class="ml-auto">
        Scripture read from <a href="https://bitcoinschema.org" class="underline hover:text-parchment-900">Bitcoin</a>.
      </span>
      <a href="https://github.com/kryp2/jessetree" class="underline hover:text-parchment-900">source</a>
    </div>
  </footer>
</div>
