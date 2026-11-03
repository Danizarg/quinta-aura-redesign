import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./ArrowLink.module.css";

/**
 * The page's only link affordance: a label over a rule that redraws from the
 * left, with a rule-tick that extends on hover. No scale, no colour wash —
 * the movement is the width of a drawn line, which is the register the rest of
 * the page works in.
 *
 * The underline is always present, so the link is never hover-only.
 */
export function ArrowLink({
  href,
  children,
  tone = "ink",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "ink" | "on-ink";
  className?: string;
}) {
  const classes = [styles.link, tone === "on-ink" ? styles.onInk : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      <span className={styles.label}>{children}</span>
      <span className={styles.rail} aria-hidden>
        <span className={styles.tick} />
      </span>
    </Link>
  );
}

/** Same affordance for an external destination or a protocol link. */
export function ArrowAnchor({
  href,
  children,
  tone = "ink",
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  tone?: "ink" | "on-ink";
  className?: string;
  external?: boolean;
}) {
  const classes = [styles.link, tone === "on-ink" ? styles.onInk : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.rail} aria-hidden>
        <span className={styles.tick} />
      </span>
    </a>
  );
}
