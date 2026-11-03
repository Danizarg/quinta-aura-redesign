"use client";

import { useId, useState } from "react";

import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";

import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "opened" | "error";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Enquiry form.
 *
 * It composes the enquiry and hands it to the visitor's own mail client, so it
 * works on a static deployment with no API keys, no third-party form service
 * and nothing to leak: the message never touches our infrastructure.
 *
 * To post server-side instead, replace `handleSubmit` with a Server Action and
 * a transactional provider — the markup, validation and states stay as they are.
 */
export function ContactForm({ dict }: { dict: Dictionary }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    subject: `${uid}-subject`,
    message: `${uid}-message`,
  };

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = dict.contact.errorName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = dict.contact.errorEmail;
    if (message.length < 10) next.message = dict.contact.errorMessage;

    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("error");
      const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setStatus("sending");

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim() || dict.contact.subjectDefault;
    const message = String(data.get("message") ?? "").trim();

    const body = [
      message,
      "",
      "—",
      `${dict.contact.formName}: ${name}`,
      `${dict.contact.formEmail}: ${email}`,
      phone ? `${dict.contact.formPhone}: ${phone}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url = `mailto:${site.email.primary}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
    setStatus("opened");
  }

  const describedBy = (field: keyof Errors) =>
    errors[field] ? `${ids[field]}-error` : undefined;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={ids.name} className={styles.label}>
            {dict.contact.formName}
            <span className={styles.required} aria-hidden>
              *
            </span>
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={styles.input}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={describedBy("name")}
          />
          {errors.name && (
            <p id={`${ids.name}-error`} className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={ids.email} className={styles.label}>
            {dict.contact.formEmail}
            <span className={styles.required} aria-hidden>
              *
            </span>
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={styles.input}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={describedBy("email")}
          />
          {errors.email && (
            <p id={`${ids.email}-error`} className={styles.error}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={ids.phone} className={styles.label}>
            {dict.contact.formPhone}
          </label>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={ids.subject} className={styles.label}>
            {dict.contact.formSubject}
          </label>
          <input id={ids.subject} name="subject" type="text" className={styles.input} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.message} className={styles.label}>
          {dict.contact.formMessage}
          <span className={styles.required} aria-hidden>
            *
          </span>
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={6}
          required
          className={styles.textarea}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={describedBy("message")}
        />
        {errors.message && (
          <p id={`${ids.message}-error`} className={styles.error}>
            {errors.message}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submit}
          data-state={status}
          disabled={status === "sending"}
        >
          <span>
            {status === "sending" ? dict.contact.formSending : dict.contact.formSubmit}
          </span>
          <span className={styles.submitRail} aria-hidden>
            <span className={styles.submitTick} />
          </span>
        </button>

        <p className={styles.privacy}>{dict.contact.privacy}</p>
      </div>

      {/* Status is announced without shifting the layout above it. */}
      <p className={styles.status} role="status" aria-live="polite">
        {status === "opened" && (
          <>
            {dict.contact.formOpened} {dict.contact.formFallback}{" "}
            <a href={`mailto:${site.email.primary}`} className={styles.statusLink}>
              {site.email.primary}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}

export default ContactForm;
