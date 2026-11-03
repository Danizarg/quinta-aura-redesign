"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useId, useRef } from "react";

import type { DrawingMotif } from "@/content/work";
import { easeInOut } from "@/lib/motion";

/**
 * Hand-built architectural drawings — the practice's visual language.
 *
 * The legacy site held no project photography, so the imagery here is drawn
 * rather than photographic: axonometrics, sections, plans, elevations, control
 * grids and construction details. Every motif is pure SVG, so it costs nothing
 * to download, scales to any viewport and inherits the ink colour.
 *
 * Lines draw themselves along their own length when scrolled into view. With
 * `prefers-reduced-motion` the drawing renders complete and still.
 */

export interface TechnicalDrawingProps {
  motif: DrawingMotif;
  className?: string;
  /** Hairline weight multiplier for large hero use. */
  weight?: number;
  /** Decorative by default; pass a label to expose it to assistive tech. */
  label?: string;
}

const VIEWBOX = "0 0 1200 760";

export function TechnicalDrawing({
  motif,
  className,
  weight = 1,
  label,
}: TechnicalDrawingProps) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const hatchId = `hatch-${uid}`;
  /* One observer for the whole sheet rather than one per stroke: individual
     paths can measure as zero-area while their dash offset hides them. */
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const strokes = MOTIFS[motif];

  return (
    <svg
      ref={ref}
      viewBox={VIEWBOX}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      vectorEffect="non-scaling-stroke"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern
          id={hatchId}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" strokeWidth={0.6} opacity={0.5} />
        </pattern>
      </defs>

      {strokes.map((stroke, index) => {
        const base = stroke.weight ?? 1;
        const strokeWidth = base * weight;
        const common = {
          strokeWidth,
          opacity: stroke.opacity ?? 1,
          strokeDasharray: stroke.dash,
          fill: stroke.hatch ? `url(#${hatchId})` : "none",
        };

        if (reduced) {
          return <path key={index} d={stroke.d} {...common} />;
        }

        return (
          <motion.path
            key={index}
            d={stroke.d}
            {...common}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView ? { pathLength: 1, opacity: stroke.opacity ?? 1 } : undefined
            }
            transition={{
              pathLength: {
                duration: 1.5,
                ease: easeInOut,
                delay: (stroke.order ?? index) * 0.055,
              },
              opacity: { duration: 0.2, delay: (stroke.order ?? index) * 0.055 },
            }}
          />
        );
      })}
    </svg>
  );
}

interface Stroke {
  d: string;
  weight?: number;
  opacity?: number;
  dash?: string;
  hatch?: boolean;
  order?: number;
}

/* Isometric helpers, resolved at module load so the paths stay literal. */
const C = Math.cos(Math.PI / 6);
const S = Math.sin(Math.PI / 6);

function iso(x: number, y: number, z: number, ox: number, oy: number) {
  return [ox + (x - y) * C, oy + (x + y) * S - z] as const;
}

function isoBox(
  ox: number,
  oy: number,
  w: number,
  d: number,
  h: number,
): string[] {
  const p = (x: number, y: number, z: number) => iso(x, y, z, ox, oy);
  const [tfx, tfy] = p(0, 0, h);
  const [trx, try_] = p(w, 0, h);
  const [tbx, tby] = p(w, d, h);
  const [tlx, tly] = p(0, d, h);
  const [bfx, bfy] = p(0, 0, 0);
  const [brx, bry] = p(w, 0, 0);
  const [blx, bly] = p(0, d, 0);

  return [
    // top face
    `M ${tfx} ${tfy} L ${trx} ${try_} L ${tbx} ${tby} L ${tlx} ${tly} Z`,
    // left face
    `M ${tfx} ${tfy} L ${tlx} ${tly} L ${blx} ${bly} L ${bfx} ${bfy} Z`,
    // right face
    `M ${tfx} ${tfy} L ${trx} ${try_} L ${brx} ${bry} L ${bfx} ${bfy} Z`,
  ];
}

const axonBoxes = [
  ...isoBox(520, 300, 230, 190, 150),
  ...isoBox(520, 300 - 150, 150, 190, 110),
];

const MOTIFS: Record<DrawingMotif, Stroke[]> = {
  /* Stepped axonometric massing over a ground grid. */
  axon: [
    { d: "M 120 560 L 1080 560", weight: 1, opacity: 0.4, order: 0 },
    { d: "M 200 620 L 1000 620", weight: 1, opacity: 0.2, dash: "2 6", order: 1 },
    ...axonBoxes.map((d, i) => ({ d, weight: 1.4, order: 2 + i })),
    // dimension line with ticks
    { d: "M 120 680 L 1080 680", weight: 1, opacity: 0.55, order: 9 },
    { d: "M 120 668 L 120 692", weight: 1, opacity: 0.55, order: 10 },
    { d: "M 1080 668 L 1080 692", weight: 1, opacity: 0.55, order: 10 },
    // sight line
    { d: "M 600 120 L 600 540", weight: 1, opacity: 0.25, dash: "3 8", order: 11 },
  ],

  /* Building section: floor slabs, hatched ground, roof pitch. */
  section: [
    { d: "M 160 600 L 1040 600", weight: 1.6, order: 0 },
    {
      d: "M 160 600 L 1040 600 L 1040 650 L 160 650 Z",
      weight: 0.8,
      opacity: 0.5,
      hatch: true,
      order: 1,
    },
    // envelope
    { d: "M 240 600 L 240 220 L 960 220 L 960 600", weight: 1.6, order: 2 },
    // roof
    { d: "M 200 220 L 600 120 L 1000 220", weight: 1.6, order: 3 },
    // slabs
    { d: "M 240 480 L 960 480", weight: 1.2, order: 4 },
    { d: "M 240 350 L 960 350", weight: 1.2, order: 5 },
    // internal partitions
    { d: "M 470 480 L 470 600", weight: 1, opacity: 0.7, order: 6 },
    { d: "M 730 350 L 730 480", weight: 1, opacity: 0.7, order: 7 },
    // openings
    { d: "M 300 520 L 300 560 L 400 560 L 400 520", weight: 1, opacity: 0.8, order: 8 },
    { d: "M 820 400 L 820 440 L 920 440 L 920 400", weight: 1, opacity: 0.8, order: 9 },
    // level markers
    { d: "M 160 480 L 220 480", weight: 1, opacity: 0.45, dash: "4 5", order: 10 },
    { d: "M 160 350 L 220 350", weight: 1, opacity: 0.45, dash: "4 5", order: 10 },
    { d: "M 1050 220 L 1050 600", weight: 1, opacity: 0.4, order: 11 },
  ],

  /* Floor plan with wall poché, door swings and a column grid. */
  plan: [
    // outer wall, double line
    { d: "M 220 170 L 980 170 L 980 590 L 220 590 Z", weight: 1.6, order: 0 },
    { d: "M 240 190 L 960 190 L 960 570 L 240 570 Z", weight: 1, opacity: 0.7, order: 1 },
    // internal walls
    { d: "M 560 190 L 560 420", weight: 1.4, order: 2 },
    { d: "M 560 420 L 960 420", weight: 1.4, order: 3 },
    { d: "M 760 420 L 760 570", weight: 1.2, opacity: 0.8, order: 4 },
    // door swings
    { d: "M 560 300 A 60 60 0 0 1 620 360", weight: 1, opacity: 0.6, order: 5 },
    { d: "M 760 480 A 56 56 0 0 0 816 536", weight: 1, opacity: 0.6, order: 6 },
    // column grid
    { d: "M 400 140 L 400 620", weight: 1, opacity: 0.22, dash: "10 6 2 6", order: 7 },
    { d: "M 700 140 L 700 620", weight: 1, opacity: 0.22, dash: "10 6 2 6", order: 7 },
    { d: "M 180 330 L 1020 330", weight: 1, opacity: 0.22, dash: "10 6 2 6", order: 8 },
    // columns
    { d: "M 392 322 L 408 322 L 408 338 L 392 338 Z", weight: 1.2, order: 9 },
    { d: "M 692 322 L 708 322 L 708 338 L 692 338 Z", weight: 1.2, order: 9 },
    // dimension string
    { d: "M 220 660 L 980 660", weight: 1, opacity: 0.5, order: 10 },
    { d: "M 220 650 L 220 670", weight: 1, opacity: 0.5, order: 11 },
    { d: "M 600 650 L 600 670", weight: 1, opacity: 0.5, order: 11 },
    { d: "M 980 650 L 980 670", weight: 1, opacity: 0.5, order: 11 },
  ],

  /* Facade elevation: bay rhythm and a shading brise-soleil. */
  elevation: [
    { d: "M 180 620 L 1020 620", weight: 1.6, order: 0 },
    { d: "M 260 620 L 260 160 L 940 160 L 940 620", weight: 1.6, order: 1 },
    // floor lines
    { d: "M 260 280 L 940 280", weight: 1, opacity: 0.55, order: 2 },
    { d: "M 260 400 L 940 400", weight: 1, opacity: 0.55, order: 3 },
    { d: "M 260 510 L 940 510", weight: 1, opacity: 0.55, order: 4 },
    // bays
    { d: "M 430 160 L 430 620", weight: 1, opacity: 0.3, order: 5 },
    { d: "M 600 160 L 600 620", weight: 1, opacity: 0.3, order: 5 },
    { d: "M 770 160 L 770 620", weight: 1, opacity: 0.3, order: 5 },
    // glazing
    { d: "M 300 200 L 390 200 L 390 255 L 300 255 Z", weight: 1.2, order: 6 },
    { d: "M 470 200 L 560 200 L 560 255 L 470 255 Z", weight: 1.2, order: 6 },
    { d: "M 640 320 L 730 320 L 730 375 L 640 375 Z", weight: 1.2, order: 7 },
    { d: "M 810 320 L 900 320 L 900 375 L 810 375 Z", weight: 1.2, order: 7 },
    { d: "M 300 440 L 560 440 L 560 490 L 300 490 Z", weight: 1.2, order: 8 },
    // brise-soleil
    { d: "M 620 420 L 920 420", weight: 1, opacity: 0.8, order: 9 },
    { d: "M 620 432 L 920 432", weight: 1, opacity: 0.6, order: 9 },
    { d: "M 620 444 L 920 444", weight: 1, opacity: 0.45, order: 10 },
    { d: "M 620 456 L 920 456", weight: 1, opacity: 0.3, order: 10 },
    // height dimension
    { d: "M 1060 160 L 1060 620", weight: 1, opacity: 0.5, order: 11 },
    { d: "M 1050 160 L 1070 160", weight: 1, opacity: 0.5, order: 11 },
    { d: "M 1050 620 L 1070 620", weight: 1, opacity: 0.5, order: 11 },
  ],

  /* Control/distribution diagram — the KNX bus read as a drawing. */
  grid: [
    // bus line
    { d: "M 140 380 L 1060 380", weight: 1.6, order: 0 },
    // risers
    { d: "M 300 380 L 300 230", weight: 1.2, order: 1 },
    { d: "M 480 380 L 480 230", weight: 1.2, order: 2 },
    { d: "M 660 380 L 660 230", weight: 1.2, order: 3 },
    { d: "M 840 380 L 840 230", weight: 1.2, order: 4 },
    { d: "M 390 380 L 390 530", weight: 1.2, order: 5 },
    { d: "M 750 380 L 750 530", weight: 1.2, order: 6 },
    // nodes
    { d: "M 272 190 L 328 190 L 328 230 L 272 230 Z", weight: 1.3, order: 7 },
    { d: "M 452 190 L 508 190 L 508 230 L 452 230 Z", weight: 1.3, order: 7 },
    { d: "M 632 190 L 688 190 L 688 230 L 632 230 Z", weight: 1.3, order: 8 },
    { d: "M 812 190 L 868 190 L 868 230 L 812 230 Z", weight: 1.3, order: 8 },
    { d: "M 352 530 L 428 530 L 428 580 L 352 580 Z", weight: 1.3, order: 9 },
    { d: "M 712 530 L 788 530 L 788 580 L 712 580 Z", weight: 1.3, order: 9 },
    // panel
    { d: "M 120 330 L 200 330 L 200 430 L 120 430 Z", weight: 1.6, order: 10 },
    { d: "M 132 350 L 188 350", weight: 1, opacity: 0.6, order: 11 },
    { d: "M 132 366 L 188 366", weight: 1, opacity: 0.45, order: 11 },
    { d: "M 132 382 L 188 382", weight: 1, opacity: 0.3, order: 11 },
    // field boundary
    { d: "M 100 140 L 1100 140", weight: 1, opacity: 0.18, dash: "3 9", order: 12 },
    { d: "M 100 630 L 1100 630", weight: 1, opacity: 0.18, dash: "3 9", order: 12 },
  ],

  /* Construction detail — layered build-up with hatch and a callout. */
  detail: [
    // substrate
    { d: "M 200 540 L 1000 540 L 1000 620 L 200 620 Z", weight: 1, opacity: 0.5, hatch: true, order: 0 },
    { d: "M 200 540 L 1000 540", weight: 1.6, order: 1 },
    // layers
    { d: "M 200 500 L 1000 500", weight: 1.3, order: 2 },
    { d: "M 200 470 L 1000 470", weight: 1.3, order: 3 },
    { d: "M 200 452 L 1000 452", weight: 1.1, opacity: 0.8, order: 4 },
    { d: "M 200 440 L 1000 440", weight: 1.1, opacity: 0.8, order: 5 },
    // insulation squiggle
    {
      d: "M 220 485 Q 250 462 280 485 Q 310 508 340 485 Q 370 462 400 485 Q 430 508 460 485 Q 490 462 520 485 Q 550 508 580 485 Q 610 462 640 485 Q 670 508 700 485 Q 730 462 760 485 Q 790 508 820 485 Q 850 462 880 485 Q 910 508 940 485 Q 970 462 1000 485",
      weight: 1,
      opacity: 0.55,
      order: 6,
    },
    // fixing
    { d: "M 620 440 L 620 540", weight: 1.4, order: 7 },
    { d: "M 606 440 L 634 440", weight: 1.4, order: 7 },
    // callout leader and bubble
    { d: "M 620 440 L 760 300 L 900 300", weight: 1, opacity: 0.6, order: 8 },
    { d: "M 900 270 L 1010 270 L 1010 330 L 900 330 Z", weight: 1, opacity: 0.6, order: 9 },
    // reference marks
    { d: "M 160 440 L 200 440", weight: 1, opacity: 0.4, dash: "4 4", order: 10 },
    { d: "M 160 500 L 200 500", weight: 1, opacity: 0.4, dash: "4 4", order: 10 },
    { d: "M 160 540 L 200 540", weight: 1, opacity: 0.4, dash: "4 4", order: 10 },
  ],
};

export default TechnicalDrawing;
