import type { Photo } from "@/components/media/Plate";

/**
 * Photography manifest.
 *
 * Deliberately empty. The legacy quintaaura.es / Wix site carried no project
 * photography — only two pieces of generic stock — and no named commissions,
 * so inventing building photographs would misrepresent the practice's work.
 * Until the studio supplies its own images, every plate renders a drawing.
 *
 * To add photography:
 *
 *   1. Drop the files in `public/plates/`.
 *   2. Add an entry keyed by the dossier slug from `src/content/work.ts`
 *      (or `studio` / `contact` for those pages).
 *   3. Nothing else changes — `<Plate>` picks the photo up automatically and
 *      serves it responsively through `next/image`.
 *
 * Alt text must describe the building, not the discipline, and must be written
 * in both languages if the image carries meaning beyond decoration.
 */

export const plates: Partial<Record<string, Photo>> = {
  // "vivienda-unifamiliar": {
  //   src: "/plates/unifamiliar-01.jpg",
  //   alt: "Patio elevation of a single-family house in Marbella",
  //   width: 2400,
  //   height: 1800,
  //   position: "50% 40%",
  // },
};

export function plateFor(key: string): Photo | undefined {
  return plates[key];
}
