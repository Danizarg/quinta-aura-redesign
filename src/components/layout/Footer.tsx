import type { Dictionary } from "@/content/dictionary";
import { manifesto, site } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";
import { ArrowAnchor, ArrowLink } from "@/components/ui/ArrowLink";
import { Rule } from "@/components/ui/Reveal";

import styles from "./Footer.module.css";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.frame}>
        <Rule />

        <p className={styles.statement}>{dict.footer.statement}</p>

        <div className={styles.grid}>
          {site.offices.map((office) => (
            <div key={office.id} className={styles.cell}>
              <p className={styles.cellLabel}>{office.label}</p>
              <address className={styles.address}>
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
          ))}

          <div className={styles.cell}>
            <p className={styles.cellLabel}>{dict.contact.title}</p>
            <div className={styles.contactStack}>
              <a href={site.phone.href} className={styles.contactLink}>
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email.primary}`} className={styles.contactLink}>
                {site.email.primary}
              </a>
              <a href={`mailto:${site.email.direct}`} className={styles.contactLink}>
                {site.email.direct}
              </a>
            </div>
          </div>

          <div className={styles.cell}>
            <p className={styles.cellLabel}>{dict.common.index}</p>
            <div className={styles.links}>
              <ArrowLink href={href(locale, "studio")}>{dict.nav.studio}</ArrowLink>
              <ArrowLink href={href(locale, "expertise")}>{dict.nav.expertise}</ArrowLink>
              <ArrowLink href={href(locale, "projects")}>{dict.nav.work}</ArrowLink>
              <ArrowLink href={href(locale, "contact")}>{dict.nav.contact}</ArrowLink>
              {site.social.map((channel) => (
                <ArrowAnchor key={channel.label} href={channel.href} external>
                  {channel.label}
                </ArrowAnchor>
              ))}
            </div>
          </div>
        </div>

        <Rule />

        {/* The practice name at display scale is the footer's closing mark. */}
        <p className={styles.mark} aria-hidden>
          {manifesto[locale].join(" ")}
        </p>

        <div className={styles.colophon}>
          <p>
            © {year} {site.legalName}. {dict.footer.colophon}
          </p>
          <p className={styles.tabular}>
            {dict.meta.established} {site.founded} · Marbella, Málaga
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
