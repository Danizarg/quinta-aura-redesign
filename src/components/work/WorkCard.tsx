"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import TechnicalDrawing from "@/components/drawing/TechnicalDrawing";
import type { Work } from "@/content/work";
import { href, type Locale } from "@/lib/i18n";

import styles from "./WorkCard.module.css";

/**
 * A dossier card.
 *
 * The plate is wiped open by a clip-path on entry, and on hover the drawing is
 * re-masked from the left while the plate ground darkens a step. No scale, no
 * shadow — the card stays flat, like a plate on a sheet.
 *
 * The clip sits on an inner element while the observer sits on the article: a
 * fully clipped element measures as zero-area, so observing it directly would
 * leave it clipped for ever.
 */
export function WorkCard({
  entry,
  locale,
  index,
  size = "default",
}: {
  entry: Work;
  locale: Locale;
  index: number;
  size?: "default" | "wide";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const content = (
    <Link href={href(locale, `projects/${entry.slug}`)} className={styles.link}>
      <div className={styles.plate}>
        <div className={`${styles.field} blueprint`} aria-hidden />
        <TechnicalDrawing motif={entry.motif} className={styles.drawing} />
        <span className={styles.ref}>{entry.ref}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{entry.title[locale]}</h3>
        <p className={styles.discipline}>{entry.discipline[locale]}</p>
        <p className={styles.summary}>{entry.summary[locale]}</p>
      </div>
    </Link>
  );

  const className = `${styles.card} ${size === "wide" ? styles.wide : ""}`;

  if (reduced) {
    return (
      <article ref={ref} className={className}>
        {content}
      </article>
    );
  }

  return (
    <article ref={ref} className={className}>
      <motion.div
        style={{ willChange: "clip-path" }}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={inView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
        transition={{
          duration: 1.05,
          ease: [0.22, 1, 0.36, 1],
          delay: (index % 3) * 0.09,
        }}
      >
        {content}
      </motion.div>
    </article>
  );
}

export default WorkCard;
