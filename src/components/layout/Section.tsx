import type { ReactNode } from "react";

import { MaskReveal, Rule, Settle } from "@/components/ui/Reveal";

import styles from "./Section.module.css";

/**
 * A page section.
 *
 * The section head always stacks — label above heading, same column. The
 * label-left / heading-right arrangement is the most recognisable templated
 * editorial tell, so it is not available here.
 */
export function Section({
  id,
  label,
  title,
  lede,
  children,
  tone = "paper",
  rule = true,
  headingLevel: Heading = "h2",
}: {
  id?: string;
  label?: string;
  title?: string;
  lede?: ReactNode;
  children?: ReactNode;
  tone?: "paper" | "ink";
  rule?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${tone === "ink" ? styles.ink : ""}`}
      aria-labelledby={title && id ? `${id}-heading` : undefined}
    >
      <div className={styles.inner}>
        {rule && <Rule />}

        {(label || title || lede) && (
          <header className={styles.head}>
            {label && (
              <p className={styles.label}>
                <span className={styles.labelText}>{label}</span>
              </p>
            )}
            {title && (
              <Heading
                id={title && id ? `${id}-heading` : undefined}
                className={styles.title}
              >
                <MaskReveal>{title}</MaskReveal>
              </Heading>
            )}
            {lede && (
              <Settle delay={0.1}>
                <div className={styles.lede}>{lede}</div>
              </Settle>
            )}
          </header>
        )}

        {children}
      </div>
    </section>
  );
}

export default Section;
