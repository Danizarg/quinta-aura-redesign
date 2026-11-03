import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { work } from "@/content/work";
import { locales } from "@/lib/i18n";

const PAGES = ["", "studio", "expertise", "projects", "contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = locales.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${site.url}/${locale}${page ? `/${page}` : ""}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt === "es" ? "es-ES" : "en-GB",
            `${site.url}/${alt}${page ? `/${page}` : ""}`,
          ]),
        ),
      },
    })),
  );

  const dossiers = locales.flatMap((locale) =>
    work.map((entry) => ({
      url: `${site.url}/${locale}/projects/${entry.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt === "es" ? "es-ES" : "en-GB",
            `${site.url}/${alt}/projects/${entry.slug}`,
          ]),
        ),
      },
    })),
  );

  return [...pages, ...dossiers];
}
