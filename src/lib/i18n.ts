export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** A value that exists in both site languages. */
export type Localized<T> = Record<Locale, T>;

/**
 * Which language the text was verified in on the legacy quintaaura.es / Wix site.
 * `both` means the source published the copy in Spanish *and* English.
 * Anything else means the other language was translated for this build and is
 * awaiting studio sign-off — see docs/TRANSLATION-REVIEW.md.
 */
export type SourceLang = "es" | "en" | "both";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function assertLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/** `true` when this entry's `locale` text was translated rather than taken from source. */
export function needsReview(source: SourceLang, locale: Locale): boolean {
  return source !== "both" && source !== locale;
}

export const localeNames: Localized<string> = { es: "Español", en: "English" };

export const htmlLang: Localized<string> = { es: "es-ES", en: "en-GB" };

export function altLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

/** Build a locale-prefixed path: `path` is given without a leading locale. */
export function href(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
