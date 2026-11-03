import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Rule, Settle } from "@/components/ui/Reveal";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import {
  collaboratorSectors,
  founderStatement,
  principals,
  studioIntro,
  timeline,
} from "@/content/studio";
import { href, isLocale, locales, type Locale } from "@/lib/i18n";
import { alternates } from "@/lib/seo";

import styles from "./studio.module.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return {
    title: lang === "es" ? "Estudio" : "Studio",
    description:
      lang === "es"
        ? "Quinta Aura, despacho de consultoría, arquitectura técnica e ingeniería fundado en Marbella en 2001. Equipo, trayectoria y colaboradores."
        : "Quinta Aura, a consultancy, technical architecture and engineering practice founded in Marbella in 2001. Team, record and collaborators.",
    alternates: alternates(lang, "studio"),
  };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        label={locale === "es" ? "02 — Estudio" : "02 — Studio"}
        motif="section"
        title={
          locale === "es"
            ? "Un despacho pequeño,\ncon alcance nacional."
            : "A small practice,\nworking nationally."
        }
        lede={
          locale === "es"
            ? "Consultoría, arquitectura técnica e ingeniería desde Marbella. Fundado en 2001."
            : "Consultancy, technical architecture and engineering from Marbella. Founded in 2001."
        }
        meta={
          <dl className={styles.heroMeta}>
            <div>
              <dt className={styles.heroMetaLabel}>{dict.meta.established}</dt>
              <dd className={`${styles.heroMetaValue} tabular`}>{site.founded}</dd>
            </div>
            <div>
              <dt className={styles.heroMetaLabel}>
                {locale === "es" ? "Colegiado desde" : "Registered since"}
              </dt>
              <dd className={`${styles.heroMetaValue} tabular`}>1992</dd>
            </div>
            <div>
              <dt className={styles.heroMetaLabel}>{dict.common.offices}</dt>
              <dd className={styles.heroMetaValue}>
                {locale === "es" ? "Marbella · San Pedro" : "Marbella · San Pedro"}
              </dd>
            </div>
          </dl>
        }
      />

      {/* ------------------------------------------------------------ intro */}
      <Section
        id="about"
        rule={false}
        label={locale === "es" ? "Quiénes somos" : "Who we are"}
        title={
          locale === "es"
            ? "Formación técnica, trabajo de campo."
            : "Technical training, work on site."
        }
      >
        <div className={styles.introSplit}>
          <div className="prose">
            {studioIntro[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className={styles.ledger}>
            {timeline.map((item) => (
              <div key={item.year} className={styles.ledgerRow}>
                <dt className={styles.ledgerYear}>{item.year}</dt>
                <dd className={styles.ledgerLabel}>{item.label[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ------------------------------------------------------- statement */}
      <section className={styles.quoteBand}>
        <div className={styles.quoteInner}>
          <Settle>
            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>{founderStatement.quote[locale]}</p>
            </blockquote>
          </Settle>
          <Settle delay={0.15}>
            <p className={styles.quoteAttribution}>
              {founderStatement.attribution[locale]}
            </p>
          </Settle>
        </div>
      </section>

      {/* ------------------------------------------------------------- team */}
      <Section
        id="team"
        label={dict.common.team}
        title={
          locale === "es"
            ? "Cuatro responsables, cuatro disciplinas."
            : "Four principals, four disciplines."
        }
      >
        <ul className={styles.people}>
          {principals.map((person) => (
            <li key={person.slug} className={styles.person}>
              <Rule />
              <div className={styles.personRow}>
                <div className={styles.personIdentity}>
                  <h3 className={styles.personName}>{person.name}</h3>
                  <p className={styles.personRole}>{person.role[locale]}</p>
                  <p className={styles.personEducation}>{person.education[locale]}</p>
                </div>

                <div className={styles.personBody}>
                  {person.biography[locale].map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <ul className={styles.focus}>
                  {person.focus[locale].map((item) => (
                    <li key={item} className={styles.focusItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ----------------------------------------------------- collaborators */}
      <Section
        id="collaborators"
        label={dict.common.partners}
        title={
          locale === "es"
            ? "Trabajamos junto a otros despachos."
            : "We work alongside other practices."
        }
        lede={
          locale === "es"
            ? "El despacho colabora de forma continuada con profesionales de los siguientes sectores."
            : "The practice works continuously with professionals in the following sectors."
        }
      >
        <ul className={styles.sectors}>
          {collaboratorSectors[locale].map((sector, index) => (
            <li key={sector} className={styles.sector}>
              <span className={styles.sectorRef}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{sector}</span>
            </li>
          ))}
        </ul>

        <div className={styles.foot}>
          <ArrowLink href={href(locale, "expertise")}>{dict.nav.expertise}</ArrowLink>
          <ArrowLink href={href(locale, "contact")}>{dict.common.enquire}</ArrowLink>
        </div>
      </Section>
    </>
  );
}
