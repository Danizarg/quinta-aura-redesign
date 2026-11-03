"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

import { easeInOut, easeOut, settle, viewportOnce } from "@/lib/motion";

/**
 * Why these components observe a wrapper rather than using `whileInView`
 * directly on the animated element:
 *
 * An element whose resting state is `clip-path: inset(0 0 100% 0)`, or one
 * sitting inside an `overflow: hidden` parent while translated out of it,
 * reports an IntersectionObserver ratio of 0 — the browser measures the
 * *visible* rectangle. Any `amount` above 0 is therefore never reached and the
 * element stays hidden for ever. So the observer goes on an outer element that
 * is never clipped or transformed, and the animation runs off that boolean.
 */

/** MaskReveal — a line of type wiped up from behind its own clip. */
export function MaskReveal({
  children,
  delay = 0,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, viewportOnce);

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      ref={ref as React.Ref<HTMLSpanElement & HTMLDivElement>}
      className={className}
      style={{ display: "block", overflow: "hidden" }}
    >
      <motion.span
        style={{ display: "block", willChange: "transform" }}
        initial={{ y: "108%" }}
        animate={inView ? { y: "0%" } : { y: "108%" }}
        transition={{ duration: 1.1, ease: easeOut, delay }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

/** A quiet opacity-and-settle, for paragraphs and list items. */
export function Settle({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={settle}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Rule — a hairline that draws itself along its axis when scrolled into view.
 * This is the page's divider language; it replaces decorative separators.
 */
export function Rule({
  className,
  axis = "x",
  delay = 0,
  strong = false,
}: {
  className?: string;
  axis?: "x" | "y";
  delay?: number;
  strong?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  /* A scaled-to-zero rule has no area to measure, so the track is observed. */
  const inView = useInView(ref, { once: true, amount: 0 });

  const colour = strong ? "var(--color-rule-strong)" : "var(--color-rule)";

  const track =
    axis === "x"
      ? { height: 1, width: "100%" as const }
      : { width: 1, height: "100%" as const };

  const bar = {
    ...track,
    background: colour,
    transformOrigin: axis === "x" ? ("left center" as const) : ("center top" as const),
  };

  if (reduced) {
    return <div className={className} style={bar} aria-hidden />;
  }

  return (
    <div ref={ref} className={className} style={track} aria-hidden>
      <motion.div
        style={{ ...bar, willChange: "transform" }}
        initial={axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
        animate={
          inView
            ? axis === "x"
              ? { scaleX: 1 }
              : { scaleY: 1 }
            : axis === "x"
              ? { scaleX: 0 }
              : { scaleY: 0 }
        }
        transition={{ duration: 1, ease: easeInOut, delay }}
      />
    </div>
  );
}
