import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Rule } from "@/components/ui/Reveal";
import { getDictionary } from "@/content/dictionary";
import { families, servipacks } from "@/content/expertise";
import { getWork } from "@/content/work";
import { href, isLocale, locales, type Locale } from "@/lib/i18n";

import styles from "./expertise.module.css";

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
    title: lang === "es" ? "Capacidades" : "Expertise",
    description:
      lang === "es"
        ? "Arquitectura y edificación, energía y eficiencia, consultoría y peritaje, comunidades y administradores de fincas. Servicios del despacho en Marbella y Málaga."
        : "Architecture and building, energy and efficiency, advisory and expert reports, communities and property managers. Services across Marbella and Málaga.",
    alternates: { canonical: `/${lang}/expertise` },
  };
}

export default async function ExpertisePage({
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
        label={locale === "es" ? "03 — Capacidades" : "03 — Expertise"}
        motif="grid"
        title={
          locale === "es" ? "Cuatro familias\nde servicio." : "Four families\nof service."
        }
        lede={
          locale === "es"
            ? "De la dirección de obra al control energético, del informe pericial al Libro del Edificio."
            : "From construction management to energy control, from the expert report to the Building Manual."
        }
      />

      {/* --------------------------------------------------------- families */}
      {families.map((family) => (
        <Section
          key={family.slug}
          id={family.slug}
          rule
          label={`${family.ref} — ${family.title[locale]}`}
          title={family.lede[locale]}
        >
          <ul className={styles.services}>
            {family.services.map((service) => (
              <li key={service.title[locale]} className={styles.service}>
                <Rule />
                <div className={styles.serviceRow}>
                  <h3 className={styles.serviceTitle}>{service.title[locale]}</h3>
                  <p className={styles.serviceBody}>{service.description[locale]}</p>
                </div>
              </li>
            ))}
          </ul>

          {family.related.length > 0 && (
            <div className={styles.related}>
              <p className={styles.relatedLabel}>
                {locale === "es" ? "Dosieres relacionados" : "Related dossiers"}
              </p>
              <div className={styles.relatedLinks}>
                {family.related.map((slug) => {
                  const entry = getWork(slug);
                  if (!entry) return null;
                  return (
                    <ArrowLink key={slug} href={href(locale, `projects/${slug}`)}>
                      {entry.title[locale]}
                    </ArrowLink>
                  );
                })}
              </div>
            </div>
          )}
        </Section>
      ))}

      {/* -------------------------------------------------------- servipack */}
      <Section
        id="servipack"
        label="Servipack"
        title={
          locale === "es"
            ? "Paquetes de servicio por encargo."
            : "Service packs by commission type."
        }
        lede={
          locale === "es"
            ? "El despacho agrupa sus trabajos en cinco paquetes. El alcance es el que figura a continuación; las tarifas se presupuestan por encargo."
            : "The practice groups its work into five packs. The scope is as set out below; fees are quoted per commission."
        }
      >
        <div className={styles.packs}>
          {servipacks.map((pack) => (
            <article key={pack.ref} className={styles.pack}>
              <header className={styles.packHead}>
                <p className={styles.packRef}>
                  <span className="tabular">{pack.ref}</span>
                </p>
                <h3 className={styles.packTitle}>{pack.title[locale]}</h3>
              </header>

              <ul className={styles.packItems}>
                {pack.items[locale].map((item) => (
                  <li key={item} className={styles.packItem}>
                    {item}
                  </li>
                ))}
              </ul>

              <footer className={styles.packFoot}>
                <p className={styles.packFee}>
                  {locale === "es" ? "Tarifa a consultar" : "Fee on request"}
                </p>
                {pack.note && <p className={styles.packNote}>{pack.note[locale]}</p>}
              </footer>
            </article>
          ))}
        </div>

        <div className={styles.foot}>
          <ArrowLink href={href(locale, "contact")}>{dict.common.enquire}</ArrowLink>
          <ArrowLink href={href(locale, "projects")}>{dict.nav.work}</ArrowLink>
        </div>
      </Section>
    </>
  );
}
