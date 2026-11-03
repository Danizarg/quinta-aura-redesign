import type { Transition, Variants } from "motion/react";

/** Mirrors the three named easings in globals.css. */
export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeIn = [0.55, 0, 1, 0.45] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const duration = {
  fast: 0.16,
  mid: 0.32,
  slow: 0.62,
  reveal: 1.1,
} as const;

export const transition: Transition = {
  duration: duration.slow,
  ease: easeOut,
};

/**
 * Masked reveal: the element is wiped in behind a clip, rather than the
 * fade-up-everything pattern. Used on headings and images.
 */
export const maskUp: Variants = {
  hidden: { y: "108%" },
  visible: {
    y: "0%",
    transition: { duration: duration.reveal, ease: easeOut },
  },
};

/** Hairlines draw themselves along their own axis. */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.reveal, ease: easeInOut },
  },
};

export const drawY: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: duration.reveal, ease: easeInOut },
  },
};

/** A quiet opacity-and-settle for body copy. Deliberately small travel. */
export const settle: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOut },
  },
};

export const stagger = (gap = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

/** Cinematic image reveal: scale settles as the clip opens. */
export const imageReveal: Variants = {
  hidden: { scale: 1.14 },
  visible: {
    scale: 1,
    transition: { duration: 1.6, ease: easeOut },
  },
};

export const viewportOnce = { once: true, amount: 0.25 } as const;
