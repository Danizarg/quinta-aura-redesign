import type { Localized } from "@/lib/i18n";

/**
 * Verified practice data.
 *
 * Phone, both e-mail addresses and the Marbella office were supplied directly
 * by the client. The San Pedro de Alcántara office and the 2001 founding year
 * are taken from the legacy site (contact + company pages) and are marked for
 * confirmation in docs/TRANSLATION-REVIEW.md.
 */

export const site = {
  name: "Quinta Aura",
  legalName: "Quinta Aura, S.L.",
  /** Deployment origin. Overridden by NEXT_PUBLIC_SITE_URL in Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://quinta-aura-redesign.vercel.app",
  founded: 2001,
  phone: {
    display: "+34 639 58 11 88",
    href: "tel:+34639581188",
  },
  email: {
    primary: "info@quintaaura.es",
    direct: "fernando@quintaaura.es",
  },
  offices: [
    {
      id: "marbella",
      label: "Marbella",
      lines: ["Avenida Ricardo Soriano 66", "Oficina 5", "29602 Marbella, Málaga"],
      /** Supplied by the client. */
      verified: true,
      maps: "https://maps.google.com/?q=Avenida+Ricardo+Soriano+66,+29602+Marbella",
    },
    {
      id: "san-pedro",
      label: "San Pedro de Alcántara",
      lines: ["Calle Toledo 17, 2.º H", "Edificio Rosamar II", "29670 San Pedro de Alcántara, Málaga"],
      /** From the legacy contact page — awaiting studio confirmation. */
      verified: false,
      maps: "https://maps.google.com/?q=Calle+Toledo+17,+29670+San+Pedro+de+Alc%C3%A1ntara",
    },
  ],
  social: [{ label: "Facebook", href: "https://www.facebook.com/quinta.aura.7" }],
} as const;

export type Office = (typeof site.offices)[number];

export const serviceArea: Localized<string> = {
  es: "Marbella · San Pedro de Alcántara · Provincia de Málaga",
  en: "Marbella · San Pedro de Alcántara · Province of Málaga",
};

/** The three-word statement that drives the home hero. */
export const manifesto: Localized<readonly string[]> = {
  es: ["Arquitectura.", "Ingeniería.", "Visión."],
  en: ["Architecture.", "Engineering.", "Vision."],
};
