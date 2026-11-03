import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { ArrowLink } from "@/components/ui/ArrowLink";
import WorkCard from "@/components/work/WorkCard";
import { getDictionary } from "@/content/dictionary";
import { work } from "@/content/work";
import { href, isLocale, locales, type Locale } from "@/lib/i18n";

import styles from "./projects.module.css";

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
    title: lang === "es" ? "Proyectos" : "Projects",
    description:
      lang === "es"
        ? "Once dosieres de trabajo: vivienda, industrial, urbanización, eficiencia energética, peritaje, due diligence y comunidades."
        : "Eleven work dossiers: housing, industrial, urbanisation, energy efficiency, expert reports, due diligence and communities.",
    alternates: { canonical: `/${lang}/projects` },
  };
}

export default async function ProjectsPage({
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
        label={locale === "es" ? "04 — Proyectos" : "04 — Projects"}
        motif="plan"
        title={
          locale === "es" ? "Once dosieres\nde trabajo." : "Eleven dossiers\nof work."
        }
        lede={
          locale === "es"
            ? "Cada dosier reúne el alcance del encargo, los entregables y el marco normativo que lo rige."
            : "Each dossier gathers the scope of the commission, its deliverables and the regulations that govern it."
        }
      />

      {/* An honest framing, set as an editorial note rather than a disclaimer. */}
      <aside className={styles.note} aria-label={locale === "es" ? "Nota" : "Note"}>
        <div className={styles.noteInner}>
          <p className={styles.noteLabel}>
            {locale === "es" ? "Nota del estudio" : "Studio note"}
          </p>
          <p className={styles.noteBody}>
            {locale === "es"
              ? "Estos dosieres describen los programas y disciplinas en los que trabaja el despacho, no encargos concretos. Por el deber de confidencialidad habitual en peritaje y due diligence, el detalle de cada obra —emplazamiento, cliente y documentación gráfica— se facilita bajo petición."
              : "These dossiers describe the programmes and disciplines the practice works in, not individual commissions. Given the confidentiality that ordinarily attaches to expert-witness and due-diligence work, the detail of each project — location, client and drawings — is provided on request."}
          </p>
          <ArrowLink href={href(locale, "contact")}>
            {locale === "es" ? "Solicitar referencias" : "Request references"}
          </ArrowLink>
        </div>
      </aside>

      <Section
        id="index"
        rule={false}
        label={dict.common.index}
        title={locale === "es" ? "Todos los dosieres" : "The full index"}
      >
        <div className={styles.grid}>
          {work.map((entry, index) => (
            <WorkCard
              key={entry.slug}
              entry={entry}
              locale={locale}
              index={index}
              size={index % 5 === 0 ? "wide" : "default"}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
