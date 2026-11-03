"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import type { Dictionary } from "@/content/dictionary";
import { altLocale, href, localeNames, type Locale } from "@/lib/i18n";

import styles from "./SiteNav.module.css";

interface NavItem {
  path: string;
  label: string;
  ref: string;
}

export function SiteNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  /**
   * The index is open only for the route it was opened on, so navigating
   * closes it as a consequence of the render rather than through an effect.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn !== null && openedOn === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenedOn(next ? pathname : null),
    [pathname],
  );
  const [condensed, setCondensed] = useState(false);
  const [retracted, setRetracted] = useState(false);
  const reduced = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const items: NavItem[] = [
    { path: "", label: dict.nav.home, ref: "01" },
    { path: "studio", label: dict.nav.studio, ref: "02" },
    { path: "expertise", label: dict.nav.expertise, ref: "03" },
    { path: "projects", label: dict.nav.work, ref: "04" },
    { path: "contact", label: dict.nav.contact, ref: "05" },
  ];

  /**
   * Condense the bar once the hero is behind us, and retract it while the
   * reader is moving down the page — the bar is set in `difference` blend so
   * it stays legible over both surfaces, but letting it sit on top of a
   * display heading reads as a collision. It returns on any upward scroll.
   */
  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setCondensed(y > 64);
      setRetracted(y > 240 && y > previous);
      previous = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Lock scroll and trap focus while the index is open. */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open, setOpen]);

  const isCurrent = useCallback(
    (path: string) => {
      const target = href(locale, path);
      if (path === "") return pathname === target;
      return pathname === target || pathname.startsWith(`${target}/`);
    },
    [locale, pathname],
  );

  const other = altLocale(locale);
  /* Swap the locale segment, keeping the reader on the same page. */
  const swapped = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${other}`);
  const localeHref = swapped === pathname ? href(other) : swapped;

  return (
    <>
      <a href="#main" className={styles.skip}>
        {dict.common.skipToContent}
      </a>

      {/* Joined rather than interpolated: empty slots in a template literal
          leave stray spaces, which show up as a hydration mismatch. */}
      <header
        className={[
          styles.bar,
          condensed ? styles.barCondensed : null,
          retracted && !open ? styles.barRetracted : null,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Link href={href(locale)} className={styles.wordmark}>
          <span className={styles.wordmarkName}>Quinta Aura</span>
          <span className={styles.wordmarkMeta}>
            {locale === "es" ? "Arquitectura · Ingeniería" : "Architecture · Engineering"}
          </span>
        </Link>

        <div className={styles.barRight}>
          <Link
            href={localeHref}
            className={styles.locale}
            lang={other}
            hrefLang={other}
            aria-label={`${dict.common.languageLabel}: ${localeNames[other]}`}
          >
            {other.toUpperCase()}
          </Link>

          <button
            ref={triggerRef}
            type="button"
            className={styles.trigger}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-index"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          >
            <span className={styles.triggerLabel}>
              {open ? dict.nav.close : dict.common.index}
            </span>
            <span className={`${styles.glyph} ${open ? styles.glyphOpen : ""}`} aria-hidden>
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-index"
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0.15 : 0.74, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav className={styles.panelInner} aria-label={dict.nav.menu}>
              <ul className={styles.list}>
                {items.map((item, index) => (
                  <li key={item.path} className={styles.listItem}>
                    <Link
                      href={href(locale, item.path)}
                      className={styles.listLink}
                      aria-current={isCurrent(item.path) ? "page" : undefined}
                    >
                      <span className={styles.listRef}>{item.ref}</span>
                      <span className={styles.listClip}>
                        <motion.span
                          className={styles.listLabel}
                          initial={reduced ? { opacity: 0 } : { y: "110%" }}
                          animate={reduced ? { opacity: 1 } : { y: "0%" }}
                          transition={{
                            duration: reduced ? 0.15 : 0.72,
                            ease: [0.22, 1, 0.36, 1],
                            delay: reduced ? 0 : 0.14 + index * 0.06,
                          }}
                        >
                          {item.label}
                        </motion.span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className={styles.panelAside}>
                <p className={styles.asideLabel}>{dict.common.offices}</p>
                {site.offices.map((office) => (
                  <p key={office.id} className={styles.asideOffice}>
                    {office.label}
                  </p>
                ))}
                <p className={styles.asideLabel}>{dict.contact.title}</p>
                <a href={site.phone.href} className={styles.asideContact}>
                  {site.phone.display}
                </a>
                <a href={`mailto:${site.email.primary}`} className={styles.asideContact}>
                  {site.email.primary}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SiteNav;
