import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";

import "@/app/globals.css";

import Footer from "@/components/layout/Footer";
import SiteNav from "@/components/nav/SiteNav";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { htmlLang, isLocale, locales, type Locale } from "@/lib/i18n";
import { alternates } from "@/lib/seo";

/* Monumental grotesque display, editorial serif body, technical mono labels. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f1ec",
  colorScheme: "light",
};

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

  const locale = lang;
  const dict = getDictionary(locale);
  const title =
    lang === "es"
      ? "Quinta Aura · Arquitectura e ingeniería en Marbella"
      : "Quinta Aura · Architecture and engineering in Marbella";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s · ${site.name}`,
    },
    description: dict.meta.tagline,
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang === "es" ? "es_ES" : "en_GB",
      alternateLocale: lang === "es" ? "en_GB" : "es_ES",
      title,
      description: dict.meta.tagline,
      url: `/${lang}`,
    },
    twitter: { card: "summary_large_image", title, description: dict.meta.tagline },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  /* LocalBusiness data, built only from client-supplied and legacy-verified facts. */
  const organisation = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    alternateName: site.name,
    description: dict.meta.tagline,
    url: `${site.url}/${locale}`,
    telephone: site.phone.display,
    email: site.email.primary,
    foundingDate: String(site.founded),
    areaServed: ["Marbella", "San Pedro de Alcántara", "Málaga"],
    knowsLanguage: ["es", "en"],
    address: site.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.lines.slice(0, -1).join(", "),
      addressLocality: office.label,
      addressRegion: "Málaga",
      addressCountry: "ES",
    })),
  };

  return (
    <html
      lang={htmlLang[locale]}
      className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}
    >
      <body>
        <SiteNav locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <script
          type="application/ld+json"
          // Serialised from a local literal — no external or user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />
      </body>
    </html>
  );
}
