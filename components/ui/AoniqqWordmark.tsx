'use client';

import React from 'react';

/* ────────────────────────────────────────────────────────────
   Brand tokens
   ──────────────────────────────────────────────────────────── */
const ROYAL = '#2454FF';
const TEAL = '#0ABF8E';
const PURPLE = '#5B5BFF';

/* Shared gradient defs ID prefix – namespaced to avoid collisions */
const NS = 'aoniqq';

/* ────────────────────────────────────────────────────────────
   Shared <defs> used by all three components
   ──────────────────────────────────────────────────────────── */
const GradientDefs: React.FC<{ id?: string }> = ({ id = '' }) => (
  <defs>
    <linearGradient id={`${NS}-accent-h${id}`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={ROYAL} />
      <stop offset="100%" stopColor={TEAL} />
    </linearGradient>
    <linearGradient id={`${NS}-accent-v${id}`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={ROYAL} />
      <stop offset="50%" stopColor={PURPLE} />
      <stop offset="100%" stopColor={TEAL} />
    </linearGradient>
    <linearGradient id={`${NS}-tail-grad${id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={ROYAL} />
      <stop offset="100%" stopColor={TEAL} />
    </linearGradient>
  </defs>
);

/* ────────────────────────────────────────────────────────────
   Geometric sans-serif letter paths
   ─────────────────────────────────────────────────────────────
   Each letter sits on a baseline at y=70, cap-height at y=10.
   Stroke width ~8 gives a medium-weight feel.
   Letters are spaced on a 52-unit advance width (wider tracking).
   ──────────────────────────────────────────────────────────── */

/**
 * Geometric sans-serif "A" — triangular with flat apex and horizontal bar.
 * Drawn as filled paths for crispness at all sizes.
 */
const letterA = (x: number): string => {
  // Outer triangle
  const cx = x + 24;
  const top = 10;
  const base = 70;
  const hw = 22; // half-width at base
  const sw = 4; // half stroke width
  // Outer shape
  const outer = `M${cx},${top} L${cx + hw},${base} L${cx + hw - sw * 2},${base} L${cx},${top + 14} L${cx - hw + sw * 2},${base} L${cx - hw},${base} Z`;
  // Inner cutout (counter)
  const barY = 48;
  const barHw = 10;
  const counter = `M${cx},${top + 22} L${cx + barHw},${barY} L${cx - barHw},${barY} Z`;
  // Crossbar
  const cbY1 = 44;
  const cbY2 = 49;
  const cbHw = 13;
  const crossbar = `M${cx - cbHw},${cbY1} L${cx + cbHw},${cbY1} L${cx + cbHw},${cbY2} L${cx - cbHw},${cbY2} Z`;
  return `${outer} ${counter} ${crossbar}`;
};

/**
 * Geometric "O" — perfect circle with uniform stroke, rendered as two ellipses.
 */
const letterO = (x: number): string => {
  const cx = x + 24;
  const cy = 40;
  const rx = 22;
  const ry = 30;
  const sw = 7.5;
  // Outer ellipse
  const outer = `M${cx},${cy - ry} A${rx},${ry} 0 1,1 ${cx},${cy + ry} A${rx},${ry} 0 1,1 ${cx},${cy - ry} Z`;
  // Inner ellipse (counter)
  const irx = rx - sw;
  const iry = ry - sw;
  const inner = `M${cx},${cy - iry} A${irx},${iry} 0 1,0 ${cx},${cy + iry} A${irx},${iry} 0 1,0 ${cx},${cy - iry} Z`;
  return `${outer} ${inner}`;
};

/**
 * Geometric "N" — two verticals connected by a diagonal.
 */
const letterN = (x: number): string => {
  const l = x + 4;
  const r = x + 44;
  const sw = 8;
  const top = 10;
  const base = 70;
  return (
    `M${l},${top} L${l + sw},${top} L${r},${base - 12} L${r},${top} L${r + sw},${top} ` +
    `L${r + sw},${base} L${r},${base} L${l + sw},${top + 12} L${l + sw},${base} L${l},${base} Z`
  );
};

/**
 * Geometric "I" — single vertical bar with top and bottom serifs (geometric style).
 * Narrower advance width.
 */
const letterI = (x: number): string => {
  const cx = x + 16;
  const sw = 4.5;
  const top = 10;
  const base = 70;
  const serifW = 12;
  const serifH = 6;
  return (
    // Top serif
    `M${cx - serifW},${top} L${cx + serifW},${top} L${cx + serifW},${top + serifH} ` +
    `L${cx + sw},${top + serifH} L${cx + sw},${base - serifH} ` +
    // Bottom serif
    `L${cx + serifW},${base - serifH} L${cx + serifW},${base} ` +
    `L${cx - serifW},${base} L${cx - serifW},${base - serifH} ` +
    `L${cx - sw},${base - serifH} L${cx - sw},${top + serifH} ` +
    `L${cx - serifW},${top + serifH} Z`
  );
};

/**
 * Geometric "Q" — circle like O, plus a distinctive diagonal tail.
 * `variant` 1 = first Q (straight diagonal tail), 2 = second Q (angled notch tail).
 */
const letterQ = (x: number, variant: 1 | 2 = 1): string => {
  const cx = x + 24;
  const cy = 40;
  const rx = 22;
  const ry = 30;
  const sw = 7.5;
  // Circle body (same as O)
  const outer = `M${cx},${cy - ry} A${rx},${ry} 0 1,1 ${cx},${cy + ry} A${rx},${ry} 0 1,1 ${cx},${cy - ry} Z`;
  const irx = rx - sw;
  const iry = ry - sw;
  const inner = `M${cx},${cy - iry} A${irx},${iry} 0 1,0 ${cx},${cy + iry} A${irx},${iry} 0 1,0 ${cx},${cy - iry} Z`;

  let tail: string;
  if (variant === 1) {
    // First Q: clean diagonal tail from lower-right of bowl downward-right
    tail =
      `M${cx + 6},${cy + 16} L${cx + 14},${cy + 16} ` +
      `L${cx + 28},${cy + 38} L${cx + 22},${cy + 38} Z`;
  } else {
    // Second Q: tail with a subtle angular notch — the signature detail
    tail =
      `M${cx + 6},${cy + 16} L${cx + 14},${cy + 16} ` +
      `L${cx + 22},${cy + 28} L${cx + 26},${cy + 26} ` + // notch kicks outward
      `L${cx + 32},${cy + 38} L${cx + 24},${cy + 38} ` +
      `L${cx + 20},${cy + 32} L${cx + 16},${cy + 34} Z`; // notch returns
  }

  return `${outer} ${inner} ${tail}`;
};

/* ────────────────────────────────────────────────────────────
   Wordmark path assembly
   ──────────────────────────────────────────────────────────── */

/**
 * Advance widths per letter (unit-space).
 * Wider tracking = gaps between letters.
 */
const advances: Record<string, number> = {
  A: 52,
  O: 52,
  N: 56,
  I: 36,
  Q: 56,
};

const buildWordmarkPath = (): { path: string; width: number } => {
  const letters: Array<{ char: string; variant?: 1 | 2 }> = [
    { char: 'A' },
    { char: 'O' },
    { char: 'N' },
    { char: 'I' },
    { char: 'Q', variant: 1 },
    { char: 'Q', variant: 2 },
  ];

  let x = 0;
  const gap = 6; // inter-letter tracking
  const parts: string[] = [];

  for (const l of letters) {
    switch (l.char) {
      case 'A':
        parts.push(letterA(x));
        break;
      case 'O':
        parts.push(letterO(x));
        break;
      case 'N':
        parts.push(letterN(x));
        break;
      case 'I':
        parts.push(letterI(x));
        break;
      case 'Q':
        parts.push(letterQ(x, l.variant));
        break;
    }
    x += advances[l.char] + gap;
  }

  return { path: parts.join(' '), width: x - gap + 10 };
};

const wordmarkData = buildWordmarkPath();

/* ────────────────────────────────────────────────────────────
   Size presets
   ──────────────────────────────────────────────────────────── */
const SIZES: Record<'sm' | 'md' | 'lg', number> = {
  sm: 20,
  md: 32,
  lg: 56,
};

/* ────────────────────────────────────────────────────────────
   1. AoniqqWordmark
   ──────────────────────────────────────────────────────────── */

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showAccent?: boolean;
  className?: string;
}

export const AoniqqWordmark: React.FC<WordmarkProps> = ({
  size = 'md',
  color = 'currentColor',
  showAccent = true,
  className,
}) => {
  const h = SIZES[size];
  const vbW = wordmarkData.width;
  // Extra height for the accent line + Q tails
  const vbH = 84;
  const aspect = vbW / vbH;
  const w = h * aspect;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={w}
      height={h}
      fill="none"
      role="img"
      aria-label="Aoniqq"
      className={className}
    >
      <GradientDefs id="-wm" />
      <path d={wordmarkData.path} fill={color} fillRule="evenodd" />
      {showAccent && (
        <rect
          x={0}
          y={76}
          width={vbW}
          height={1.5}
          rx={0.75}
          fill={`url(#${NS}-accent-h-wm)`}
          opacity={0.7}
        />
      )}
    </svg>
  );
};

AoniqqWordmark.displayName = 'AoniqqWordmark';

/* ────────────────────────────────────────────────────────────
   2. AoniqqMonogram — interlocking QQ mark
   ──────────────────────────────────────────────────────────── */

interface MonogramProps {
  size?: number;
  color?: string;
  showGradient?: boolean;
  className?: string;
}

/**
 * Two Qs that share geometry. The left Q's tail curves left,
 * the right Q's tail curves right, and they cross in the center.
 */
const buildMonogramPaths = (): {
  bodies: string;
  tailLeft: string;
  tailRight: string;
  width: number;
  height: number;
} => {
  const r = 28; // circle radius
  const sw = 8; // stroke width
  const ir = r - sw;
  const overlap = 14; // how much the two circles overlap

  // Left circle center
  const lx = r + 4;
  const cy = r + 4;
  // Right circle center
  const rx = lx + 2 * r - overlap;

  // Left circle
  const lOuter = `M${lx},${cy - r} A${r},${r} 0 1,1 ${lx},${cy + r} A${r},${r} 0 1,1 ${lx},${cy - r} Z`;
  const lInner = `M${lx},${cy - ir} A${ir},${ir} 0 1,0 ${lx},${cy + ir} A${ir},${ir} 0 1,0 ${lx},${cy - ir} Z`;

  // Right circle
  const rOuter = `M${rx},${cy - r} A${r},${r} 0 1,1 ${rx},${cy + r} A${r},${r} 0 1,1 ${rx},${cy - r} Z`;
  const rInner = `M${rx},${cy - ir} A${ir},${ir} 0 1,0 ${rx},${cy + ir} A${ir},${ir} 0 1,0 ${rx},${cy - ir} Z`;

  // Left Q tail — curves to the left
  const tailLeft =
    `M${lx - 2},${cy + 14} L${lx + 6},${cy + 14} ` +
    `L${lx - 4},${cy + 40} L${lx - 12},${cy + 40} Z`;

  // Right Q tail — curves to the right with notch
  const tailRight =
    `M${rx - 6},${cy + 14} L${rx + 2},${cy + 14} ` +
    `L${rx + 12},${cy + 34} L${rx + 16},${cy + 32} ` + // notch
    `L${rx + 20},${cy + 40} L${rx + 12},${cy + 40} ` +
    `L${rx + 10},${cy + 37} L${rx + 4},${cy + 40} Z`;

  const bodies = `${lOuter} ${lInner} ${rOuter} ${rInner}`;
  const width = rx + r + 24;
  const height = cy + r + 18;

  return { bodies, tailLeft, tailRight, width, height };
};

const monogramData = buildMonogramPaths();

export const AoniqqMonogram: React.FC<MonogramProps> = ({
  size = 40,
  color = 'currentColor',
  showGradient = false,
  className,
}) => {
  const aspect = monogramData.width / monogramData.height;
  const w = size * aspect;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${monogramData.width} ${monogramData.height}`}
      width={w}
      height={size}
      fill="none"
      role="img"
      aria-label="Aoniqq monogram"
      className={className}
    >
      <GradientDefs id="-mg" />
      {/* Circle bodies */}
      <path d={monogramData.bodies} fill={color} fillRule="evenodd" />
      {/* Tails — optionally gradient */}
      <path
        d={monogramData.tailLeft}
        fill={showGradient ? `url(#${NS}-tail-grad-mg)` : color}
      />
      <path
        d={monogramData.tailRight}
        fill={showGradient ? `url(#${NS}-tail-grad-mg)` : color}
      />
    </svg>
  );
};

AoniqqMonogram.displayName = 'AoniqqMonogram';

/* ────────────────────────────────────────────────────────────
   3. AoniqqLogo — combined monogram + wordmark
   ──────────────────────────────────────────────────────────── */

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showAccent?: boolean;
  className?: string;
}

export const AoniqqLogo: React.FC<LogoProps> = ({
  size = 'md',
  color = 'currentColor',
  showAccent = true,
  className,
}) => {
  const h = SIZES[size];

  // Layout dimensions in viewBox units
  const monoW = monogramData.width;
  const monoH = monogramData.height;
  const dividerGap = 14;
  const dividerWidth = 1.2;
  const wordGap = 14;
  const wmW = wordmarkData.width;
  const wmH = 84;

  // Scale monogram to match wordmark cap height
  const monoScale = 70 / monoH; // scale mono to match ~70 unit cap height
  const scaledMonoW = monoW * monoScale;
  const scaledMonoH = monoH * monoScale;

  const totalW = scaledMonoW + dividerGap + dividerWidth + wordGap + wmW;
  const totalH = Math.max(scaledMonoH, wmH);

  const aspect = totalW / totalH;
  const w = h * aspect;

  // Vertical centering offsets
  const monoY = (totalH - scaledMonoH) / 2;
  const wmY = (totalH - wmH) / 2;
  const dividerX = scaledMonoW + dividerGap;
  const wmX = dividerX + dividerWidth + wordGap;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${totalW} ${totalH}`}
      width={w}
      height={h}
      fill="none"
      role="img"
      aria-label="Aoniqq"
      className={className}
    >
      <GradientDefs id="-logo" />

      {/* Monogram */}
      <g transform={`translate(0, ${monoY}) scale(${monoScale})`}>
        <path d={monogramData.bodies} fill={color} fillRule="evenodd" />
        <path d={monogramData.tailLeft} fill={color} />
        <path d={monogramData.tailRight} fill={color} />
      </g>

      {/* Divider line */}
      <rect
        x={dividerX}
        y={totalH * 0.15}
        width={dividerWidth}
        height={totalH * 0.7}
        rx={0.6}
        fill={color}
        opacity={0.2}
      />

      {/* Wordmark */}
      <g transform={`translate(${wmX}, ${wmY})`}>
        <path d={wordmarkData.path} fill={color} fillRule="evenodd" />
        {showAccent && (
          <rect
            x={0}
            y={76}
            width={wmW}
            height={1.5}
            rx={0.75}
            fill={`url(#${NS}-accent-h-logo)`}
            opacity={0.7}
          />
        )}
      </g>
    </svg>
  );
};

AoniqqLogo.displayName = 'AoniqqLogo';
