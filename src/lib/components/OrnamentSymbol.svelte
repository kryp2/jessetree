<script lang="ts">
  import type { SymbolName } from '$lib/advent/plan';

  export let name: SymbolName;
  export let size = 24;
  export let label: string | undefined = undefined;
  /** Position when nested inside another SVG. */
  export let x: number | undefined = undefined;
  export let y: number | undefined = undefined;
</script>

<!-- Simple line symbols on a 24×24 grid, drawn with currentColor so they
     follow the parchment / ink / midnight themes. -->
<svg
  {x}
  {y}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
>
  {#if name === 'world'}
    <circle cx="12" cy="12" r="8" />
    <path d="M4 12h16M12 4c2.5 2.2 3.5 5 3.5 8s-1 5.8-3.5 8c-2.5-2.2-3.5-5-3.5-8s1-5.8 3.5-8z" />
  {:else if name === 'fruit'}
    <path d="M12 8c-3-2-7-1-7 4 0 4 3 8 5 8 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 5-4 5-8 0-5-4-6-7-4z" />
    <path d="M12 8c0-2 .5-3.5 2-4.5M12 7c-1.5-2-3.5-2-4.5-1.5 1 1.5 2.5 2 4.5 1.5z" />
  {:else if name === 'rainbow'}
    <path d="M3 17a9 9 0 0 1 18 0M6 17a6 6 0 0 1 12 0M9 17a3 3 0 0 1 6 0" />
  {:else if name === 'stars'}
    <path d="M12 4l1.2 2.6 2.8.3-2.1 1.9.6 2.8L12 10.2l-2.5 1.4.6-2.8L8 6.9l2.8-.3z" />
    <path d="M6 15l.7 1.4 1.5.2-1.1 1 .3 1.5L6 18.4l-1.4.7.3-1.5-1.1-1 1.5-.2zM18 14l.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2z" />
  {:else if name === 'ram'}
    <path d="M9 9c-3 0-4 3-2.5 4.5S10 14 10 12s-2-2-2-2" />
    <path d="M15 9c3 0 4 3 2.5 4.5S14 14 14 12s2-2 2-2" />
    <path d="M10 10c0-1 1-2 2-2s2 1 2 2v5c0 2-1 4-2 4s-2-2-2-4z" />
  {:else if name === 'ladder'}
    <path d="M8 3l-1 18M16 3l1 18M7.8 7h8.4M7.5 11h9M7.3 15h9.4M7 19h10" />
  {:else if name === 'coat'}
    <path d="M9 4l3 2 3-2 4 3-2 3-1.5-1V20H8.5V9L7 10 5 7z" />
    <path d="M8.5 12h7M8.5 15.5h7" />
  {:else if name === 'bush'}
    <path d="M12 21v-5M12 16c-3 0-6-1-6-4 0-2 2-2 2-4 1.5 1 2 2 2 3 0-2 1-5 2-7 1 2 2 5 2 7 0-1 .5-2 2-3 0 2 2 2 2 4 0 3-3 4-6 4z" />
  {:else if name === 'lamb'}
    <path d="M7 11c0-2 2-3 4-3h3c3 0 5 1.5 5 4s-2 4-5 4h-4c-2 0-3-1-3-2" />
    <path d="M7 11c-2 0-3 1-3 2 1 1 2 1 3 0M9 16v4M16 16v4" />
  {:else if name === 'bread'}
    <path d="M5 12c0-3 3-5 7-5s7 2 7 5v6H5z" />
    <path d="M9 9l-1 3M12 8.5V12M15 9l1 3" />
  {:else if name === 'tablets'}
    <path d="M4 20V8a3 3 0 0 1 6 0v12zM14 20V8a3 3 0 0 1 6 0v12z" />
    <path d="M6 11h2M6 14h2M6 17h2M16 11h2M16 14h2M16 17h2" />
  {:else if name === 'trumpet'}
    <path d="M3 11v2h4l9 5V6l-9 5z" />
    <path d="M16 6c2 1.5 3 3.5 3 6s-1 4.5-3 6" />
  {:else if name === 'wheat'}
    <path d="M12 21V5" />
    <path d="M12 8c-2-1-3-3-3-5 2 1 3 3 3 5zM12 8c2-1 3-3 3-5-2 1-3 3-3 5zM12 12c-2-1-3-3-3-5 2 1 3 3 3 5zM12 12c2-1 3-3 3-5-2 1-3 3-3 5zM12 16c-2-1-3-3-3-5 2 1 3 3 3 5zM12 16c2-1 3-3 3-5-2 1-3 3-3 5z" />
  {:else if name === 'stump'}
    <path d="M5 20.5h14M6.5 20.5c1-.8 1.5-2 1.5-3.5v-3.5M17.5 20.5c-1-.8-1.5-2-1.5-3.5v-3.5" />
    <ellipse cx="12" cy="13.5" rx="4" ry="1.3" />
    <path d="M12 13V8.5c0-2.5 1.8-4.5 4.5-4.5 0 2.5-2 4.5-4.5 4.5M12 10.5C10.2 10.5 8 9.2 8 7c2 0 4 1.3 4 3.5" />
  {:else if name === 'harp'}
    <path d="M7 21V4c4 0 9 3 11 7l-3 1-8 9" />
    <path d="M10 6v12M13 8v7" />
  {:else if name === 'temple'}
    <path d="M3 9l9-5 9 5zM5 9v10M9.5 9v10M14.5 9v10M19 9v10M3 20h18" />
  {:else if name === 'fire'}
    <path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z" />
    <path d="M4 21h16M6 18h12" />
  {:else if name === 'light'}
    <path d="M9 21h6M10 18h4M12 18v-3M8 11a4 4 0 1 1 8 0c0 2-2 3-2 4h-4c0-1-2-2-2-4z" />
    <path d="M12 2v2M4 11H2M22 11h-2M5.5 4.5l1.4 1.4M18.5 4.5l-1.4 1.4" />
  {:else if name === 'heart'}
    <path d="M12 20s-8-4.5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 10-8 10z" />
  {:else if name === 'fish'}
    <path d="M3 12c3-5 9-6 14-3l4-3v12l-4-3c-5 3-11 2-14-3z" />
    <circle cx="8" cy="11" r=".6" fill="currentColor" />
  {:else if name === 'lion'}
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 3.5l1.5 2 2.5-1 .5 2.5 2.5.5-1 2.5 2 1.5-2 1.5 1 2.5-2.5.5-.5 2.5-2.5-1-1.5 2-1.5-2-2.5 1-.5-2.5L5 16l1-2.5L4 12l2-1.5L5 8l2.5-.5L8 5l2.5 1z" />
    <path d="M10.5 11h0M13.5 11h0M11 14c.5.5 1.5.5 2 0" />
  {:else if name === 'house'}
    <path d="M4 20V11l8-6 8 6v9z" />
    <path d="M10 20v-5h4v5" />
  {:else if name === 'censer'}
    <path d="M12 3v4M8 11h8l-1 5H9z" />
    <path d="M7 11c0-2 2-4 5-4s5 2 5 4M10 16l-1 3h6l-1-3" />
    <path d="M18 6c1 1 1 2 0 3M20 4c1.5 1.5 1.5 4 0 5.5" />
  {:else if name === 'lily'}
    <path d="M12 21v-9" />
    <path d="M12 12c-2-1-5-3-5-7 2 0 4 1.5 5 4 1-2.5 3-4 5-4 0 4-3 6-5 7z" />
    <path d="M12 9V4M12 17c-2-1-4-1-5 0M12 17c2-1 4-1 5 0" />
  {:else if name === 'square'}
    <path d="M5 4h4v11h11v4H5z" />
    <path d="M9 8H7.5M9 11H7.5M13 15v1.5M16 15v1.5" />
  {:else if name === 'shell'}
    <path d="M12 20c-5 0-8-4-8-8 2-5 5-7 8-7s6 2 8 7c0 4-3 8-8 8z" />
    <path d="M12 20V6M12 20L7 8M12 20l5-12M12 20L4.5 11M12 20l7.5-9" />
  {:else if name === 'star'}
    <path d="M12 2.5l2.4 5.5 6 .6-4.5 4 1.3 5.9L12 15.4l-5.2 3.1 1.3-5.9-4.5-4 6-.6z" />
  {:else if name === 'manger'}
    <path d="M4 10h16l-2 6H6zM6 16l-2 4M18 16l2 4" />
    <path d="M9 10c0-1.7 1.3-3 3-3s3 1.3 3 3" />
    <path d="M12 2v2M8.5 3.5l.8 1.4M15.5 3.5l-.8 1.4" />
  {/if}
</svg>
