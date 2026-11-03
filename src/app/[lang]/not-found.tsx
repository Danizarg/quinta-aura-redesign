import Link from "next/link";

import TechnicalDrawing from "@/components/drawing/TechnicalDrawing";
import { defaultLocale, href } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

import styles from "./not-found.module.css";

/**
 * `not-found` cannot read route params, so it is written in the default
 * language with the other language one click away.
 */
export default function NotFound() {
  const es = getDictionary("es");
  const en = getDictionary("en");

  return (
    <div className={styles.page}>
      <div className={styles.drawingWrap} aria-hidden>
        <TechnicalDrawing motif="grid" className={styles.drawing} />
      </div>

      <div className={styles.inner}>
        <p className={styles.code}>404</p>

        <h1 className={styles.title}>{es.notFound.title}</h1>
        <p className={styles.body}>{es.notFound.body}</p>

        <hr className={styles.rule} />

        <h2 className={styles.titleAlt} lang="en">
          {en.notFound.title}
        </h2>
        <p className={styles.body} lang="en">
          {en.notFound.body}
        </p>

        <div className={styles.links}>
          <Link href={href(defaultLocale)} className={styles.link}>
            {es.notFound.home}
          </Link>
          <Link href={href("en")} className={styles.link} lang="en">
            {en.notFound.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
