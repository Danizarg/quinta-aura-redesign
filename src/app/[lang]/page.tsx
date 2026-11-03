import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HomeHero from "@/components/home/HomeHero";
import Section from "@/components/layout/Section";
import { ArrowAnchor, ArrowLink } from "@/components/ui/ArrowLink";
import { Rule, Settle } from "@/components/ui/Reveal";
import WorkCard from "@/components/work/WorkCard";
import { getDictionary } from "@/content/dictionary";
import { families } from "@/content/expertise";
import { site } from "@/content/site";
import { founderStatement, studioIntro, timeline } from "@/content/studio";
import { work } from "@/content/work";
import { href, isLocale, type Locale } from "@/lib/i18n";

import styles from "./home.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return {
    title:
      lang === "es"
        ? "Arquitectura e ingeniería en Marbella"
        : "Architecture and engineering in Marbella",
    description:
      lang === "es"
        ? "Quinta Aura es un despacho de arquitectura técnica e ingeniería en Marbella y San Pedro de Alcántara: dirección de obra, eficiencia energética, peritaje y due diligence."
        : "Quinta Aura is a technical architecture and engineering practice in Marbella and San Pedro de Alcántara: construction management, energy efficiency, expert reports and due diligence.",
    alternates: { canonical: `/${lang}` },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const selected = work.slice(0, 4);

  return (
    <>
      <HomeHero locale={locale} dict={dict} />

      {/* ---------------------------------------------------- the practice */}
      <Section
        id="practice"
        label={locale === "es" ? "01 — El despacho" : "01 — The practice"}
        title={
          locale === "es"
            ? "Pequeño por decisión, técnico por formación."
            : "Small by choice, technical by training."
        }
      >
        <div className={styles.split}>
          <div className="prose">
            {studioIntro[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ArrowLink href={href(locale, "studio")}>{dict.nav.studio}</ArrowLink>
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

      {/* -------------------------------------------------------- the work */}
      <Section
        id="selected"
        label={locale === "es" ? "02 — Proyectos" : "02 — Projects"}
        title={
          locale === "es"
            ? "Los programas en los que trabajamos."
            : "The programmes we work in."
        }
        lede={
          locale === "es"
            ? "Cada dosier reúne el alcance real del encargo, los entregables y el marco normativo que lo rige."
            : "Each dossier gathers the real scope of the commission, its deliverables and the regulations that govern it."
        }
      >
        <div className={styles.workGrid}>
          {selected.map((entry, index) => (
            <WorkCard
              key={entry.slug}
              entry={entry}
              locale={locale}
              index={index}
              size={index === 0 ? "wide" : "default"}
            />
          ))}
        </div>

        <div className={styles.gridFoot}>
          <ArrowLink href={href(locale, "projects")}>{dict.common.allWork}</ArrowLink>
        </div>
      </Section>

      {/* --------------------------------------------------- the expertise */}
      <Section
        id="expertise"
        label={locale === "es" ? "03 — Capacidades" : "03 — Expertise"}
        title={
          locale === "es"
            ? "Cuatro familias de servicio."
            : "Four families of service."
        }
      >
        <ul className={styles.families}>
          {families.map((family) => (
            <li key={family.slug} className={styles.family}>
              <Rule />
              <div className={styles.familyRow}>
                <p className={styles.familyRef}>{family.ref}</p>
                <div className={styles.familyBody}>
                  <h3 className={styles.familyTitle}>{family.title[locale]}</h3>
                  <p className={styles.familyLede}>{family.lede[locale]}</p>
                </div>
                <p className={styles.familyCount}>
                  <span className="tabular">
                    {String(family.services.length).padStart(2, "0")}
                  </span>
                  <span className={styles.familyCountLabel}>
                    {locale === "es" ? "servicios" : "services"}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.gridFoot}>
          <ArrowLink href={href(locale, "expertise")}>{dict.nav.expertise}</ArrowLink>
        </div>
      </Section>

      {/* --------------------------------------------------- the statement */}
      <section className={styles.quoteBand} aria-label={founderStatement.attribution[locale]}>
        <div className={styles.quoteInner}>
          {/* Settle, not MaskReveal: the mask is for single lines and would
              clip the descenders of a multi-line block. */}
          <Settle>
            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>{founderStatement.quote[locale]}</p>
            </blockquote>
          </Settle>
          <Settle delay={0.15}>
            <p className={styles.quoteAttribution}>{founderStatement.attribution[locale]}</p>
          </Settle>
        </div>
      </section>

      {/* ----------------------------------------------------- the enquiry */}
      <Section
        id="enquire"
        tone="ink"
        rule={false}
        label={locale === "es" ? "04 — Contacto" : "04 — Contact"}
        title={
          locale === "es"
            ? "Visitamos la propiedad sin compromiso."
            : "We will visit the property with no obligation."
        }
        lede={
          locale === "es"
            ? "Cuéntenos el encargo y le indicamos el alcance, los plazos y la documentación necesaria."
            : "Tell us about the commission and we will set out the scope, the timescales and the documents needed."
        }
      >
        <div className={styles.enquiry}>
          <div className={styles.enquiryLinks}>
            <ArrowAnchor href={site.phone.href} tone="on-ink">
              {site.phone.display}
            </ArrowAnchor>
            <ArrowAnchor href={`mailto:${site.email.primary}`} tone="on-ink">
              {site.email.primary}
            </ArrowAnchor>
            <ArrowLink href={href(locale, "contact")} tone="on-ink">
              {dict.common.enquire}
            </ArrowLink>
          </div>

          <div className={styles.enquiryOffices}>
            {site.offices.map((office) => (
              <div key={office.id}>
                <p className={styles.officeLabel}>{office.label}</p>
                <address className={styles.officeAddress}>
                  {office.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
