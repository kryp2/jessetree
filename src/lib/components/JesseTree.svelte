<script lang="ts">
  import type { Day } from '$lib/advent/plan';
  import OrnamentSymbol from './OrnamentSymbol.svelte';

  export let days: Day[];
  export let hung: number; // ornaments hung so far
  export let todayN: number | null = null; // day of Advent today, if in season
  export let query = ''; // e.g. "?t=no_1930", carried onto ornament links

  // The tree grows from the stump of Jesse upward: the first ornament hangs at
  // the root, the last (the Christ ornament) at the very top. Rows fill from
  // the bottom; the final day always takes the crown.
  const W = 400;
  const H = 500;
  const ROWS = [6, 5, 5, 4, 4, 3];
  const BASE_Y = 405;
  const ROW_GAP = 58;
  const GAP = 30; // clearance on each side of the trunk

  type Placed = { day: Day; x: number; y: number; hangY: number };
  type Branch = { d: string };

  // A branch rises gently from the trunk; ornaments hang from it on strings.
  const lift = (dx: number, reach: number) => 12 * Math.pow(Math.min(1, dx / reach), 1.4);

  function grow(list: Day[]): { placed: Placed[]; branches: Branch[] } {
    const placed: Placed[] = [];
    const branches: Branch[] = [];
    const body = list.slice(0, -1);
    let i = 0;
    let row = 0;
    for (; row < ROWS.length && i < body.length; row++) {
      const count = Math.min(ROWS[row], body.length - i);
      const y = BASE_Y - row * ROW_GAP;
      const half = 158 - row * 22; // the crown narrows toward the top
      const by = y - 34; // branch height where it leaves the trunk
      const left = Math.ceil(count / 2);
      const right = count - left;
      for (const [n, dir] of [
        [left, -1],
        [right, 1]
      ] as const) {
        if (n === 0) continue;
        const xs = Array.from({ length: n }, (_, k) => {
          const t = n === 1 ? 0.55 : k / (n - 1); // 0 = outermost
          return GAP + (1 - t) * (half - GAP);
        });
        const reach = xs[0] + 14;
        const pts = Array.from({ length: 13 }, (_, j) => {
          const dx = (j / 12) * reach;
          return `${(W / 2 + dir * dx).toFixed(1)} ${(by - lift(dx, reach)).toFixed(1)}`;
        });
        branches.push({ d: `M${pts.join(' L')}` });
        // Reading order runs left to right across the row.
        const order = dir === -1 ? xs : [...xs].reverse();
        order.forEach((dx, k) => {
          placed.push({
            day: body[i++],
            x: W / 2 + dir * dx,
            y: y + (k % 2 ? 8 : -2),
            hangY: by - lift(dx, reach)
          });
        });
      }
    }
    const last = list[list.length - 1];
    if (last) {
      const y = BASE_Y - row * ROW_GAP + 4;
      placed.push({ day: last, x: W / 2, y, hangY: y });
    }
    return { placed, branches };
  }

  $: ({ placed, branches } = grow(days));
  $: top = placed[placed.length - 1];
</script>

<svg viewBox="0 0 {W} {H}" class="jt w-full h-auto" role="group" aria-label="The Jesse Tree">
  <!-- Stump of Jesse and the shoot that grows from it -->
  <g class="wood">
    <!-- the trunk: a single shoot rising out of the stump -->
    {#if top}
      <path
        d="M200 432 C 197 380, 204 320, 199 260 S 201 {top.y + 60}, 200 {top.y + 20}"
        class="shoot"
      />
    {/if}
    {#each branches as br}
      <path d={br.d} class="branch" />
    {/each}
    <!-- the stump of Jesse: cut flat, roots gripping the ground -->
    <path
      d="M150 486 Q 168 480 172 468 L 176 434 Q 200 428 224 434 L 228 468 Q 232 480 250 486
         M 168 486 Q 176 476 178 470 M 232 486 Q 224 476 222 470"
      class="stump"
    />
    <ellipse cx="200" cy="434" rx="24" ry="5.5" class="stump-top" />
    <ellipse cx="200" cy="434" rx="13" ry="2.8" class="ring" />
    <path d="M142 487 H 258" class="ground" />
  </g>

  {#each placed as p (p.day.ornament.slug)}
    {@const isHung = p.day.n <= hung}
    {@const isToday = p.day.n === todayN}
    {@const r = p.day.n === days.length ? 24 : 19}
    <a
      href="/advent/{p.day.ornament.slug}{query}"
      class="orn"
      class:hung={isHung}
      class:today={isToday}
      aria-label="Day {p.day.n}: {p.day.ornament.figure}"
    >
      <title>Day {p.day.n} · {p.day.ornament.figure}</title>
      {#if p.hangY < p.y - r}
        <line x1={p.x} y1={p.hangY} x2={p.x} y2={p.y - r} class="string" />
      {/if}
      {#if isToday}<circle cx={p.x} cy={p.y} r={r + 6} class="halo" />{/if}
      <circle cx={p.x} cy={p.y} r={r} class="disc" />
      <OrnamentSymbol
        name={p.day.ornament.symbol}
        size={r * 1.15}
        x={p.x - r * 0.575}
        y={p.y - r * 0.575}
      />
    </a>
  {/each}
</svg>

<style>
  .jt {
    max-width: 30rem;
    display: block;
    margin: 0 auto;
  }
  .stump {
    fill: rgb(var(--color-bg-elevated));
    stroke: rgb(var(--color-ink-muted));
    stroke-width: 1.5;
  }
  .ring {
    fill: none;
    stroke: rgb(var(--color-ink-muted) / 0.5);
    stroke-width: 1;
  }
  .ground {
    stroke: rgb(var(--color-ink-muted) / 0.4);
    stroke-width: 1.2;
    stroke-linecap: round;
  }
  .stump-top {
    fill: rgb(var(--color-bg));
    stroke: rgb(var(--color-ink-muted));
    stroke-width: 1.2;
  }
  .shoot {
    fill: none;
    stroke: rgb(var(--color-ink-muted));
    stroke-width: 3;
    stroke-linecap: round;
  }
  .branch {
    fill: none;
    stroke: rgb(var(--color-ink-muted) / 0.55);
    stroke-width: 1.6;
    stroke-linecap: round;
  }
  .string {
    stroke: rgb(var(--color-ink-muted) / 0.5);
    stroke-width: 1;
  }
  .orn {
    color: rgb(var(--color-ink-muted) / 0.55);
    cursor: pointer;
  }
  .orn .disc {
    fill: rgb(var(--color-bg));
    stroke: rgb(var(--color-ink-muted) / 0.6);
    stroke-width: 1.2;
    stroke-dasharray: 3 3;
    transition: fill 0.15s, stroke 0.15s;
  }
  .orn.hung {
    color: rgb(var(--color-accent));
  }
  .orn.hung .disc {
    fill: rgb(var(--color-bg-elevated));
    stroke: rgb(var(--color-accent));
    stroke-width: 1.6;
    stroke-dasharray: none;
  }
  .orn:hover .disc,
  .orn:focus-visible .disc {
    stroke: rgb(var(--color-ink-strong));
    stroke-dasharray: none;
  }
  .orn:hover,
  .orn:focus-visible {
    color: rgb(var(--color-ink-strong));
    outline: none;
  }
  .halo {
    fill: none;
    stroke: rgb(var(--color-accent));
    stroke-width: 1.2;
    opacity: 0.6;
    animation: jt-pulse 2.4s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
  @keyframes jt-pulse {
    0%,
    100% {
      opacity: 0.25;
      transform: scale(0.94);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.04);
    }
  }
</style>
