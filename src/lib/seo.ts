import type { Metadata } from "next";

import type { Locale } from "./i18n";

/**
 * Build the `alternates` block for a page.
 *
 * A page's `alternates` replaces the layout's outright rather than merging
 * into it, so a page that sets only `canonical` silently drops every
 * `hreflang` tag. Every page therefore builds the whole block here.
 *
 * `path` is given without a locale prefix and without a leading slash.
 */
export function alternates(locale: Locale, path = ""): Metadata["alternates"] {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";

  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      "es-ES": `/es${suffix}`,
      "en-GB": `/en${suffix}`,
      "x-default": `/es${suffix}`,
    },
  };
}
