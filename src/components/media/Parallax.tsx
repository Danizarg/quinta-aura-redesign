"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Subtle parallax on the drawing plates.
 *
 * Travel is deliberately small — a drawing that slides far reads as a slideshow
 * rather than a plate seen through a window. Transform only, never layout, and
 * disabled outright under `prefers-reduced-motion`.
 */
export function Parallax({
  children,
  distance = 48,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * A plate wiped open by a clip-path as it enters, with the contents
 * counter-scaling so the drawing settles rather than zooms.
 *
 * The clip lives on an inner element and the observer on the outer one: a
 * fully clipped element reports an intersection ratio of 0, so observing it
 * directly would mean it never un-clips.
 */
export function MaskedPlate({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ overflow: "hidden", willChange: "clip-path" }}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={inView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
