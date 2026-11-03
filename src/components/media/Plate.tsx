import Image from "next/image";

import TechnicalDrawing from "@/components/drawing/TechnicalDrawing";
import type { DrawingMotif } from "@/content/work";

import styles from "./Plate.module.css";

/**
 * A plate on the sheet — the single image surface used across the site.
 *
 * Today every plate renders a drawing, because the legacy site held no project
 * photography. When the studio supplies photographs, add them to
 * `src/content/plates.ts` and nothing else needs to change: a plate with a
 * `photo` renders a responsive, art-directed `next/image` at the same crop,
 * and the drawing stays as the blueprint underlay.
 */

export interface Photo {
  src: string;
  alt: string;
  /** Focal point for the crop, e.g. "50% 30%". */
  position?: string;
  width: number;
  height: number;
}

export function Plate({
  motif,
  photo,
  ratio = "4 / 3",
  priority = false,
  sizes = "(min-width: 64rem) 50vw, 100vw",
  className,
  caption,
}: {
  motif: DrawingMotif;
  photo?: Photo;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
}) {
  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <div className={styles.plate} style={{ aspectRatio: ratio }}>
        <div className={`${styles.field} blueprint`} aria-hidden />

        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={sizes}
            priority={priority}
            className={styles.photo}
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
        ) : (
          <TechnicalDrawing motif={motif} className={styles.drawing} />
        )}
      </div>

      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export default Plate;
