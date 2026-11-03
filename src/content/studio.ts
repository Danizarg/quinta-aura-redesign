import type { Localized, SourceLang } from "@/lib/i18n";

/**
 * Studio content, from the legacy "Company" and "Clients" pages.
 *
 * Two deliberate omissions, both recorded in docs/TRANSLATION-REVIEW.md:
 *
 * 1. The legacy site named individual client firms (law practices, architects,
 *    estate agents). Those are third parties; they are summarised by sector
 *    here rather than re-published by name without fresh consent.
 * 2. The legacy "over 25 years of experience" line was written against a 2013
 *    page. Rather than silently inflate or restate a stale figure, the site
 *    uses the anchored dates the source gives: founded 2001, registered with
 *    the professional association since 1992.
 */

export interface Principal {
  slug: string;
  name: string;
  role: Localized<string>;
  education: Localized<string>;
  biography: Localized<readonly string[]>;
  focus: Localized<readonly string[]>;
  source: SourceLang;
}

export const principals: readonly Principal[] = [
  {
    slug: "fernando-artimez",
    name: "Fernando Artímez",
    role: { es: "Fundador · Dirección", en: "Founder · Principal" },
    education: {
      es: "Arquitectura Técnica, Granada · Ingeniería de la Edificación, Madrid",
      en: "Technical Architecture, Granada · Building Engineering, Madrid",
    },
    biography: {
      es: [
        "Fernando Artímez cursó sus estudios universitarios de Arquitectura Técnica en Granada y realizó el grado en Ingeniería de la Edificación en Madrid.",
        "Ha trabajado para la administración española y para la empresa gubernamental alemana Max-Planck en el desarrollo de proyectos de investigación en Calar Alto, Almería.",
        "Actualmente ejerce como consultor y en dirección integrada de proyecto.",
      ],
      en: [
        "Fernando Artímez read Technical Architecture at Granada and took his degree in Building Engineering in Madrid.",
        "He has worked for the Spanish administration and for the German governmental organisation Max-Planck on research projects at Calar Alto, Almería.",
        "He now practises as a consultant and in integrated project management.",
      ],
    },
    focus: {
      es: [
        "Patología constructiva",
        "Peritaje forense",
        "Ingeniería ambiental",
        "Energías renovables",
        "Consultoría energética",
      ],
      en: [
        "Building pathology",
        "Forensic expert work",
        "Environmental engineering",
        "Renewable energy",
        "Energy consulting",
      ],
    },
    source: "en",
  },
  {
    slug: "andrea-artimez",
    name: "Andrea Artímez",
    role: { es: "Arte y diseño", en: "Art and design" },
    education: {
      es: "Bellas Artes, Universidad de Málaga · formación en arquitectura",
      en: "Fine Arts, University of Málaga · architectural education",
    },
    biography: {
      es: [
        "Andrea Artímez es licenciada en Bellas Artes por la Universidad de Málaga y cuenta con formación en arquitectura.",
        "Es responsable del diseño y la decoración de interiores de los proyectos y reformas principales del despacho.",
      ],
      en: [
        "Andrea Artímez holds a degree in Fine Arts from the University of Málaga and has an architectural education.",
        "She leads interior design and decoration on the practice's principal projects and refurbishments.",
      ],
    },
    focus: {
      es: ["Interiorismo", "Decoración", "Diseño de iluminación", "Reformas"],
      en: ["Interior design", "Decoration", "Lighting design", "Refurbishment"],
    },
    source: "en",
  },
  {
    slug: "jose-luis-matas",
    name: "José Luis Matas",
    role: { es: "Dirección de proyecto · Sistemas", en: "Project management · Systems" },
    education: {
      es: "Ingeniería informática, Barcelona",
      en: "Computer engineering, Barcelona",
    },
    biography: {
      es: [
        "José Luis Matas es ingeniero informático y cursó sus estudios universitarios en Barcelona. Comenzó su trayectoria en grandes multinacionales de Barcelona y Madrid.",
        "Se estableció en la Costa del Sol y creó una empresa especializada en sistemas inteligentes y programación KNX, hoy consultora colaboradora del despacho.",
        "Continúa trabajando sobre el sistema KNX y, en los últimos años, en el estudio y la aplicación de sistemas de ahorro energético.",
      ],
      en: [
        "José Luis Matas is a computer engineer and read for his degree in Barcelona. He began his career in large multinationals in Barcelona and Madrid.",
        "He settled on the Costa del Sol and founded a company specialising in intelligent systems and KNX programming, today a consulting partner to the practice.",
        "He continues to work on the KNX system and, in recent years, on the study and application of energy-saving systems.",
      ],
    },
    focus: {
      es: ["Sistemas KNX", "Sistemas inteligentes", "Ahorro energético", "Programación"],
      en: ["KNX systems", "Intelligent systems", "Energy saving", "Programming"],
    },
    source: "en",
  },
  {
    slug: "mar-chaves",
    name: "Mª del Mar Chaves",
    role: { es: "Dirección de marketing", en: "Marketing director" },
    education: { es: "Magisterio, Málaga", en: "Teaching, Málaga" },
    biography: {
      es: [
        "Mª del Mar Chaves es diplomada en Magisterio y cursó sus estudios en Málaga.",
        "Dirige el departamento de marketing y mantiene la relación con los clientes extranjeros del despacho, por su dominio de idiomas.",
      ],
      en: [
        "Mª del Mar Chaves holds a diploma in teaching and studied in Málaga.",
        "She runs the marketing department and maintains the practice's relationships with its foreign clients, drawing on her command of languages.",
      ],
    },
    focus: {
      es: ["Marketing", "Relación con el cliente", "Idiomas"],
      en: ["Marketing", "Client relations", "Languages"],
    },
    source: "en",
  },
];

export const studioIntro: Localized<readonly string[]> = {
  es: [
    "Quinta Aura es un despacho pequeño especializado en consultoría, con base en Marbella y alcance nacional.",
    "Fundado en 2001, lo forman profesionales cualificados en sus respectivos campos, y su trabajo se concentra en dar solución a la gestión y el desarrollo de proyecto.",
    "Desde 1992 el despacho pertenece al cuerpo de colegiados y a la lista de profesionales técnicos judiciales.",
  ],
  en: [
    "Quinta Aura is a small practice specialising in consultancy, based in Marbella and working nationally.",
    "Founded in 2001, it is made up of professionals qualified in their respective fields, and its work concentrates on resolving project management and development.",
    "Since 1992 the practice has belonged to the professional association and to the list of judicial technical professionals.",
  ],
};

/**
 * Attributed statement from the founder, carried over from the legacy "Company"
 * page. The English source was not written by a native speaker; it has been
 * rendered readable in both languages and is flagged for the founder's
 * sign-off before launch.
 */
export const founderStatement: { quote: Localized<string>; attribution: Localized<string> } = {
  quote: {
    es: "Somos un despacho en crecimiento constante, con los nuevos objetivos que el mercado exige. Partimos de sus necesidades para ayudarle a definir sus metas, desarrollar soluciones y prestar un servicio excelente.",
    en: "We are a practice in constant growth, with the new objectives the market demands. We start from your needs in order to help you define your goals, develop solutions and deliver an outstanding service.",
  },
  attribution: {
    es: "Fernando Artímez, fundador",
    en: "Fernando Artímez, founder",
  },
};

/**
 * Collaborator sectors. The legacy site listed partner firms by name; they are
 * summarised by sector here pending consent to re-publish.
 */
export const collaboratorSectors: Localized<readonly string[]> = {
  es: [
    "Despachos de abogados",
    "Estudios de arquitectura",
    "Inmobiliarias y promotoras",
    "Sistemas de control, audio y vídeo",
    "Sistemas geotérmicos",
    "Cocinas de diseño",
  ],
  en: [
    "Law firms",
    "Architecture studios",
    "Estate agents and developers",
    "Control, audio and video systems",
    "Geothermal systems",
    "Design kitchens",
  ],
};

export const timeline: readonly { year: string; label: Localized<string> }[] = [
  {
    year: "1992",
    label: {
      es: "Colegiación y alta en la lista de profesionales técnicos judiciales.",
      en: "Professional registration and entry on the judicial technical professionals list.",
    },
  },
  {
    year: "2001",
    label: {
      es: "Constitución del despacho en Marbella.",
      en: "The practice is established in Marbella.",
    },
  },
  {
    year: "2007",
    label: {
      es: "La certificación energética pasa a ser exigible en obra nueva (RD 47/2007).",
      en: "Energy certification becomes a requirement for new build (RD 47/2007).",
    },
  },
  {
    year: "2013",
    label: {
      es: "Se aprueban las tarifas estatales de certificación y auditoría (BOE 19/11/2013).",
      en: "National certification and audit rates are approved (BOE 19/11/2013).",
    },
  },
];
