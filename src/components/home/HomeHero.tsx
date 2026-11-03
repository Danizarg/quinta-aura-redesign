"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import TechnicalDrawing from "@/components/drawing/TechnicalDrawing";
import type { Dictionary } from "@/content/dictionary";
import { manifesto, serviceArea, site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { easeOut } from "@/lib/motion";

import styles from "./HomeHero.module.css";

/**
 * Fullscreen hero.
 *
 * Two things happen at once: the drawing plate is wiped open by its own clip
 * while settling out of a slight over-scale (the cinematic reveal), and the
 * three-word statement masks up line by line. Both collapse to a short
 * crossfade under `prefers-reduced-motion`.
 */
export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* The plate drifts up a little slower than the page; the type lifts away. */
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const lines = manifesto[locale];

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-statement">
      {/* Drawing plate */}
      <motion.div
        className={styles.plate}
        style={reduced ? undefined : { y: plateY }}
        initial={reduced ? { opacity: 0 } : { clipPath: "inset(14% 8% 14% 8%)", opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        transition={{ duration: reduced ? 0.2 : 1.5, ease: easeOut }}
        aria-hidden
      >
        <motion.div
          className={styles.plateInner}
          initial={reduced ? false : { scale: 1.12 }}
          animate={reduced ? false : { scale: 1 }}
          transition={{ duration: 2, ease: easeOut }}
        >
          <div className={`${styles.field} blueprint`} />
          <TechnicalDrawing motif="axon" className={styles.drawing} weight={1.25} />
        </motion.div>
      </motion.div>

      {/* HP1 vertical rail */}
      <div className={styles.rail} aria-hidden>
        <motion.span
          className={styles.railRule}
          initial={reduced ? { opacity: 0 } : { scaleY: 0 }}
          animate={reduced ? { opacity: 1 } : { scaleY: 1 }}
          transition={{ duration: reduced ? 0.2 : 1.2, ease: easeOut, delay: 0.3 }}
        />
        <span className={styles.railText}>{serviceArea[locale]}</span>
      </div>

      {/* Statement */}
      <motion.div
        className={styles.statement}
        style={reduced ? undefined : { y: typeY, opacity: fade }}
      >
        <h1 id="hero-statement" className={styles.h1}>
          {lines.map((line, index) => (
            <span key={line} className={styles.lineClip}>
              <motion.span
                className={styles.line}
                initial={reduced ? { opacity: 0 } : { y: "110%" }}
                animate={reduced ? { opacity: 1 } : { y: "0%" }}
                transition={{
                  duration: reduced ? 0.25 : 1.15,
                  ease: easeOut,
                  delay: reduced ? index * 0.04 : 0.42 + index * 0.13,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Foot meta */}
      <motion.div
        className={styles.foot}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut, delay: reduced ? 0.1 : 1.1 }}
      >
        <p className={styles.footItem}>
          <span className={styles.footLabel}>{dict.meta.practice}</span>
          <span>{site.legalName}</span>
        </p>
        <p className={styles.footItem}>
          <span className={styles.footLabel}>{dict.meta.established}</span>
          <span className="tabular">{site.founded}</span>
        </p>
        <p className={`${styles.footItem} ${styles.footScroll}`}>
          <span className={styles.footLabel}>{dict.common.scroll}</span>
          <span className={styles.scrollRule} aria-hidden />
        </p>
      </motion.div>
    </section>
  );
}

export default HomeHero;
