<script lang="ts">
  import { env } from '$env/dynamic/public';
  export let txid: string;
  export let block_height: number = 0;
  const base = env.PUBLIC_WOC_URL || 'https://whatsonchain.com/tx';
</script>

<a
  class="chain-badge"
  href="{base}/{txid}"
  target="_blank"
  rel="noopener noreferrer"
  title={`Hung on the tree at block ${block_height}\ntxid: ${txid}`}
  aria-label="View on-chain transaction"
>
  {#if block_height > 0}
    ●
  {:else}
    ○
  {/if}
</a>
