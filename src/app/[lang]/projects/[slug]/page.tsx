import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Parallax } from "@/components/media/Parallax";
import Plate from "@/components/media/Plate";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { MaskReveal, Rule, Settle } from "@/components/ui/Reveal";
import { getDictionary } from "@/content/dictionary";
import { plateFor } from "@/content/plates";
import { site } from "@/content/site";
import { getWork, neighbours, work } from "@/content/work";
import { href, isLocale, locales, needsReview, type Locale } from "@/lib/i18n";

import styles from "./case.module.css";

export function generateStaticParams() {
  return locales.flatMap((lang) => work.map((entry) => ({ lang, slug: entry.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const entry = getWork(slug);
  if (!isLocale(lang) || !entry) return {};

  return {
    title: entry.title[lang],
    description: entry.summary[lang],
    alternates: { canonical: `/${lang}/projects/${slug}` },
    openGraph: {
      title: `${entry.title[lang]} · ${site.name}`,
      description: entry.summary[lang],
      url: `/${lang}/projects/${slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const entry = getWork(slug);
  if (!entry) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const around = neighbours(slug);
  const review = needsReview(entry.source, locale);

  return (
    <article>
      {/* ------------------------------------------------- fullscreen head */}
      <header className={styles.head}>
        <div className={styles.headInner}>
          <nav className={styles.crumb} aria-label={dict.common.index}>
            <Link href={href(locale, "projects")} className={styles.crumbLink}>
              {dict.nav.work}
            </Link>
            <span aria-hidden>/</span>
            <span className={styles.crumbRef}>{entry.ref}</span>
          </nav>

          <h1 className={styles.title}>
            <MaskReveal>{entry.title[locale]}</MaskReveal>
          </h1>

          <Settle delay={0.12}>
            <p className={styles.discipline}>{entry.discipline[locale]}</p>
          </Settle>

          <Settle delay={0.2}>
            <p className={styles.summary}>{entry.summary[locale]}</p>
          </Settle>

          <Settle delay={0.28}>
            <dl className={styles.facts}>
              {entry.facts.map((fact) => (
                <div key={fact.label[locale]} className={styles.fact}>
                  <dt className={styles.factLabel}>{fact.label[locale]}</dt>
                  <dd className={styles.factValue}>{fact.value[locale]}</dd>
                </div>
              ))}
            </dl>
          </Settle>
        </div>
      </header>

      {/* ------------------------------------------------------- the plate */}
      <section className={styles.plateBand} aria-label={entry.title[locale]}>
        <Parallax distance={34}>
          <Plate
            motif={entry.motif}
            photo={plateFor(entry.slug)}
            ratio="16 / 9"
            sizes="100vw"
            priority
            caption={
              locale === "es"
                ? `${entry.title[locale]} — representación técnica`
                : `${entry.title[locale]} — technical representation`
            }
          />
        </Parallax>
      </section>

      {/* -------------------------------------------------------- the body */}
      <section className={styles.body}>
        <div className={styles.bodyInner}>
          <div className={styles.prose}>
            {entry.body[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {review && (
              <p className={styles.reviewNote} role="note">
                {dict.common.reviewNeeded}
              </p>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarBlock}>
              <h2 className={styles.sidebarLabel}>{dict.common.scope}</h2>
              <ul className={styles.scope}>
                {entry.scope[locale].map((item) => (
                  <li key={item} className={styles.scopeItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {entry.framework && (
              <div className={styles.sidebarBlock}>
                <h2 className={styles.sidebarLabel}>{dict.common.framework}</h2>
                <ul className={styles.framework}>
                  {entry.framework[locale].map((item) => (
                    <li key={item} className={styles.frameworkItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.sidebarBlock}>
              <h2 className={styles.sidebarLabel}>{dict.contact.title}</h2>
              <div className={styles.sidebarLinks}>
                <ArrowLink href={href(locale, "contact")}>
                  {dict.common.enquire}
                </ArrowLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------------------------------------------- prev and next */}
      {around && (
        <nav className={styles.pager} aria-label={dict.nav.work}>
          <Rule />
          <div className={styles.pagerRow}>
            <Link
              href={href(locale, `projects/${around.previous.slug}`)}
              className={styles.pagerLink}
            >
              <span className={styles.pagerLabel}>{dict.common.previousProject}</span>
              <span className={styles.pagerTitle}>{around.previous.title[locale]}</span>
            </Link>

            <Link href={href(locale, "projects")} className={styles.pagerCentre}>
              {dict.common.allWork}
            </Link>

            <Link
              href={href(locale, `projects/${around.next.slug}`)}
              className={`${styles.pagerLink} ${styles.pagerNext}`}
            >
              <span className={styles.pagerLabel}>{dict.common.nextProject}</span>
              <span className={styles.pagerTitle}>{around.next.title[locale]}</span>
            </Link>
          </div>
        </nav>
      )}
    </article>
  );
}
