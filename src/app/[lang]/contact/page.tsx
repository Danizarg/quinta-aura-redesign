import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContactForm from "@/components/contact/ContactForm";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { ArrowAnchor } from "@/components/ui/ArrowLink";
import { Rule } from "@/components/ui/Reveal";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { alternates } from "@/lib/seo";

import styles from "./contact.module.css";

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
    title: lang === "es" ? "Contacto" : "Contact",
    description:
      lang === "es"
        ? "Avenida Ricardo Soriano 66, Oficina 5, Marbella. Teléfono +34 639 58 11 88. Solicite una cita sin compromiso."
        : "Avenida Ricardo Soriano 66, Office 5, Marbella. Telephone +34 639 58 11 88. Request an appointment with no obligation.",
    alternates: alternates(lang, "contact"),
  };
}

export default async function ContactPage({
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
        label={locale === "es" ? "05 — Contacto" : "05 — Contact"}
        motif="detail"
        title={
          locale === "es"
            ? "Cuéntenos\nel encargo."
            : "Tell us about\nthe commission."
        }
        lede={
          locale === "es"
            ? "Somos un equipo dinámico, flexible y de mente abierta. Les visitamos sin compromiso para explicarle el alcance de los servicios."
            : "We are a dynamic, flexible and open-minded team. We will visit you with no obligation to set out the scope of the services."
        }
      />

      <Section
        id="details"
        rule={false}
        label={locale === "es" ? "Datos de contacto" : "Contact details"}
        title={locale === "es" ? "Dos oficinas en la costa." : "Two offices on the coast."}
      >
        <div className={styles.grid}>
          {/* ------------------------------------------------------ direct */}
          <div className={styles.column}>
            <div className={styles.block}>
              <p className={styles.blockLabel}>{dict.common.call}</p>
              <ArrowAnchor href={site.phone.href}>{site.phone.display}</ArrowAnchor>
            </div>

            <div className={styles.block}>
              <p className={styles.blockLabel}>{dict.common.email}</p>
              <div className={styles.stack}>
                <ArrowAnchor href={`mailto:${site.email.primary}`}>
                  {site.email.primary}
                </ArrowAnchor>
                <ArrowAnchor href={`mailto:${site.email.direct}`}>
                  {site.email.direct}
                </ArrowAnchor>
              </div>
            </div>

            {site.offices.map((office) => (
              <div key={office.id} className={styles.block}>
                <p className={styles.blockLabel}>{office.label}</p>
                <address className={styles.address}>
                  {office.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <ArrowAnchor href={office.maps} external>
                  {locale === "es" ? "Ver en el mapa" : "View on the map"}
                </ArrowAnchor>
              </div>
            ))}
          </div>

          {/* -------------------------------------------------------- form */}
          <div className={styles.formColumn}>
            <Rule />
            <h3 className={styles.formTitle}>
              {locale === "es" ? "Formulario de consulta" : "Enquiry form"}
            </h3>
            <ContactForm dict={dict} />
          </div>
        </div>
      </Section>

      <Section
        id="appointments"
        label={locale === "es" ? "Citas" : "Appointments"}
        title={
          locale === "es"
            ? "Visita técnica sin compromiso."
            : "A technical visit, with no obligation."
        }
        lede={
          locale === "es"
            ? "Para comunidades de propietarios y administradores de fincas acudimos a la junta o a la propiedad para explicar el alcance y la calidad del servicio."
            : "For owners' communities and property managers we attend the meeting or the property to explain the scope and quality of the service."
        }
      >
        <div className={styles.appointment}>
          <ArrowAnchor href={site.phone.href}>
            {locale === "es" ? "Solicitar cita por teléfono" : "Request by telephone"}
          </ArrowAnchor>
          <ArrowAnchor
            href={`mailto:${site.email.primary}?subject=${encodeURIComponent(
              locale === "es" ? "Solicitud de cita" : "Appointment request",
            )}`}
          >
            {locale === "es" ? "Solicitar cita por correo" : "Request by email"}
          </ArrowAnchor>
        </div>
      </Section>
    </>
  );
}
