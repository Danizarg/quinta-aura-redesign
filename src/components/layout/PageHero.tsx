import type { ReactNode } from "react";

import TechnicalDrawing from "@/components/drawing/TechnicalDrawing";
import type { DrawingMotif } from "@/content/work";
import { MaskReveal, Settle } from "@/components/ui/Reveal";

import styles from "./PageHero.module.css";

/**
 * The opening plate of an inner page: a label, the title at display scale, a
 * lede, and a drawing bled off the right edge. Shorter than the home hero on
 * purpose — the reader has already arrived.
 */
export function PageHero({
  label,
  title,
  lede,
  motif,
  meta,
}: {
  label: string;
  title: string;
  lede?: string;
  motif: DrawingMotif;
  meta?: ReactNode;
}) {
  const lines = title.split("\n");

  return (
    <header className={styles.hero}>
      <div className={styles.drawingWrap} aria-hidden>
        <div className={`${styles.field} blueprint`} />
        <TechnicalDrawing motif={motif} className={styles.drawing} />
      </div>

      <div className={styles.inner}>
        <p className={styles.label}>{label}</p>

        <h1 className={styles.title}>
          {lines.map((line, index) => (
            <MaskReveal key={line} delay={index * 0.1}>
              {line}
            </MaskReveal>
          ))}
        </h1>

        {lede && (
          <Settle delay={0.22}>
            <p className={styles.lede}>{lede}</p>
          </Settle>
        )}

        {meta && (
          <Settle delay={0.3}>
            <div className={styles.meta}>{meta}</div>
          </Settle>
        )}
      </div>
    </header>
  );
}

export default PageHero;
