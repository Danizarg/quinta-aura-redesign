import type { Locale, Localized } from "@/lib/i18n";

/** UI chrome. Written natively in both languages — no machine translation here. */
const dictionary = {
  nav: {
    home: { es: "Inicio", en: "Home" },
    studio: { es: "Estudio", en: "Studio" },
    expertise: { es: "Capacidades", en: "Expertise" },
    work: { es: "Proyectos", en: "Projects" },
    contact: { es: "Contacto", en: "Contact" },
    menu: { es: "Menú", en: "Menu" },
    close: { es: "Cerrar", en: "Close" },
    openMenu: { es: "Abrir el menú de navegación", en: "Open navigation menu" },
    closeMenu: { es: "Cerrar el menú de navegación", en: "Close navigation menu" },
  },
  meta: {
    tagline: {
      es: "Arquitectura e ingeniería en Marbella desde 2001",
      en: "Architecture and engineering in Marbella since 2001",
    },
    established: { es: "Fundado en", en: "Established" },
    practice: { es: "Despacho", en: "Practice" },
  },
  common: {
    skipToContent: { es: "Ir al contenido principal", en: "Skip to main content" },
    scroll: { es: "Desplazar", en: "Scroll" },
    index: { es: "Índice", en: "Index" },
    readMore: { es: "Ver el dosier", en: "Open dossier" },
    allWork: { es: "Todos los proyectos", en: "All projects" },
    backToWork: { es: "Volver a proyectos", en: "Back to projects" },
    nextProject: { es: "Siguiente", en: "Next" },
    previousProject: { es: "Anterior", en: "Previous" },
    languageLabel: { es: "Idioma", en: "Language" },
    switchTo: { es: "English", en: "Español" },
    toTop: { es: "Volver arriba", en: "Back to top" },
    enquire: { es: "Solicitar una cita", en: "Request an appointment" },
    call: { es: "Llamar", en: "Call" },
    email: { es: "Escribir", en: "Email" },
    offices: { es: "Oficinas", en: "Offices" },
    scope: { es: "Alcance", en: "Scope" },
    deliverables: { es: "Entregables", en: "Deliverables" },
    framework: { es: "Marco normativo", en: "Regulatory framework" },
    discipline: { es: "Disciplina", en: "Discipline" },
    programme: { es: "Programa", en: "Programme" },
    team: { es: "Equipo", en: "Team" },
    partners: { es: "Colaboradores", en: "Collaborators" },
    reviewNeeded: {
      es: "Traducción pendiente de revisión",
      en: "Translation pending review",
    },
  },
  contact: {
    title: { es: "Contacto", en: "Contact" },
    formName: { es: "Nombre", en: "Name" },
    formEmail: { es: "Correo electrónico", en: "Email" },
    formPhone: { es: "Teléfono (opcional)", en: "Phone (optional)" },
    formSubject: { es: "Asunto", en: "Subject" },
    formMessage: { es: "Mensaje", en: "Message" },
    formSubmit: { es: "Enviar consulta", en: "Send enquiry" },
    formSending: { es: "Preparando…", en: "Preparing…" },
    formOpened: {
      es: "Hemos abierto su programa de correo con la consulta redactada. Revísela y envíela.",
      en: "Your mail application has opened with the enquiry drafted. Review it and send.",
    },
    formFallback: {
      es: "Si no se ha abierto, escríbanos directamente a",
      en: "If nothing opened, write to us directly at",
    },
    required: { es: "Obligatorio", en: "Required" },
    errorName: { es: "Indíquenos su nombre.", en: "Please tell us your name." },
    errorEmail: { es: "Indique un correo válido.", en: "Enter a valid email address." },
    errorMessage: { es: "Escriba su consulta.", en: "Please write your enquiry." },
    privacy: {
      es: "Los datos enviados se utilizan únicamente para atender su consulta.",
      en: "Data you send is used solely to answer your enquiry.",
    },
    subjectDefault: {
      es: "Consulta desde la web",
      en: "Website enquiry",
    },
  },
  footer: {
    statement: {
      es: "Un despacho pequeño de arquitectura técnica e ingeniería, en la Costa del Sol desde 2001.",
      en: "A small technical architecture and engineering practice, on the Costa del Sol since 2001.",
    },
    colophon: {
      es: "Todos los derechos reservados.",
      en: "All rights reserved.",
    },
    legal: { es: "Aviso legal", en: "Legal notice" },
  },
  notFound: {
    title: { es: "Página no encontrada", en: "Page not found" },
    body: {
      es: "La página que busca no existe o ha cambiado de dirección.",
      en: "The page you are looking for does not exist or has moved.",
    },
    home: { es: "Ir al inicio", en: "Go to the home page" },
  },
} as const;

type Dict = typeof dictionary;

/** Resolve the whole dictionary for one locale. */
export function getDictionary(locale: Locale): Resolved<Dict> {
  return resolve(dictionary, locale) as Resolved<Dict>;
}

export type Resolved<T> = T extends Localized<infer V>
  ? V
  : T extends object
    ? { [K in keyof T]: Resolved<T[K]> }
    : T;

function resolve(node: unknown, locale: Locale): unknown {
  if (node && typeof node === "object") {
    const record = node as Record<string, unknown>;
    if ("es" in record && "en" in record) return record[locale];
    return Object.fromEntries(
      Object.entries(record).map(([key, value]) => [key, resolve(value, locale)]),
    );
  }
  return node;
}

export type Dictionary = Resolved<Dict>;
export default dictionary;
