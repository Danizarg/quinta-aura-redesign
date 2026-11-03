import type { Localized, SourceLang } from "@/lib/i18n";

/**
 * The service offer, reorganised into four families from the legacy
 * "Services", "Architecture projects", "Energy projects", "Servipack" and
 * "Comunidades" pages.
 *
 * Fees: the legacy Servipack tables carry a 2013 copyright and their price
 * column cannot be reliably mapped back to individual line items from the
 * published markup. Rather than restate figures that may be both outdated and
 * mis-assigned, scope is preserved verbatim and every fee reads "on request".
 * The legacy figures are recorded in docs/TRANSLATION-REVIEW.md for the studio
 * to confirm or replace.
 */

export interface Service {
  title: Localized<string>;
  description: Localized<string>;
}

export interface Family {
  slug: string;
  ref: string;
  title: Localized<string>;
  lede: Localized<string>;
  services: readonly Service[];
  /** Dossiers under src/content/work.ts that evidence this family. */
  related: readonly string[];
  source: SourceLang;
}

export const families: readonly Family[] = [
  {
    slug: "arquitectura",
    ref: "A",
    title: { es: "Arquitectura y edificación", en: "Architecture and building" },
    lede: {
      es: "Dirección de obra, gestión de proyecto y tramitación administrativa para obra nueva y reforma en la provincia de Málaga.",
      en: "Site direction, project management and administrative processing for new build and refurbishment across Málaga province.",
    },
    services: [
      {
        title: { es: "Dirección de ejecución", en: "Construction management" },
        description: {
          es: "Dirección y supervisión arquitectónica de obra de cualquier tipo: vivienda unifamiliar y plurifamiliar, fábricas, naves y urbanización.",
          en: "Architectural direction and supervision of works of any kind: single- and multi-family housing, factories, warehouses and urbanisation.",
        },
      },
      {
        title: { es: "Project management", en: "Project management" },
        description: {
          es: "Gestión y resolución del proyecto desde el concepto, la búsqueda de suelo y la gestión intermedia hasta el cierre, con asesoramiento al inversor en todo momento.",
          en: "Management and resolution of the project from concept, site search and mid-stage coordination through to close-out, advising the investor throughout.",
        },
      },
      {
        title: { es: "Licencias y tramitación", en: "Licences and processing" },
        description: {
          es: "Solicitud y seguimiento de licencias de obra menor y mayor, gestión de permisos ante los organismos competentes y trazabilidad de expedientes.",
          en: "Application and tracking of minor- and major-works licences, permit management with the competent bodies, and file traceability.",
        },
      },
      {
        title: { es: "Interiorismo y decoración", en: "Interior design and decoration" },
        description: {
          es: "Diseño y decoración de interiores, incluida la elección de los elementos que componen la vivienda y el diseño de iluminación.",
          en: "Interior design and decoration, including the selection of the elements that make up a home and the lighting design.",
        },
      },
      {
        title: { es: "Topografía y planos", en: "Survey and drawings" },
        description: {
          es: "Levantamiento topográfico, deslindes y replanteos, realización de planos y toma y tratamiento de datos.",
          en: "Topographic survey, boundary definition and setting-out, drawing production, and data capture and processing.",
        },
      },
    ],
    related: ["vivienda-unifamiliar", "vivienda-plurifamiliar", "industrial", "urbanizacion", "interiorismo"],
    source: "en",
  },
  {
    slug: "energia",
    ref: "B",
    title: { es: "Energía y eficiencia", en: "Energy and efficiency" },
    lede: {
      es: "Gestión energética de vivienda, oficina y edificio sobre sistema KNX, certificación oficial y auditoría de consumo.",
      en: "Energy management for homes, offices and buildings over KNX, official certification and consumption audit.",
    },
    services: [
      {
        title: { es: "Control KNX", en: "KNX control" },
        description: {
          es: "Monitorización de iluminación, climatización, persianas y riego sobre una misma instalación, en obra nueva o en edificio existente.",
          en: "Monitoring of lighting, air conditioning, blinds and irrigation on a single installation, in new build or an existing building.",
        },
      },
      {
        title: { es: "Control automático de consumo", en: "Automatic consumption control" },
        description: {
          es: "Sistema instalado en el cuadro eléctrico que, al detectar un exceso, reduce automáticamente el consumo de los dispositivos que consumen de forma excesiva.",
          en: "A device fitted in the electrical panel that, on detecting an excess, automatically reduces consumption on the devices drawing too much.",
        },
      },
      {
        title: { es: "Certificación energética", en: "Energy certification" },
        description: {
          es: "Emisión del certificado de eficiencia energética y presentación ante el órgano competente de la comunidad autónoma.",
          en: "Issue of the energy performance certificate and filing with the competent regional body.",
        },
      },
      {
        title: { es: "Auditoría energética", en: "Energy audit" },
        description: {
          es: "Auditorías orientadas a priorizar el uso de la energía, de las oportunidades de ahorro más rentables a las menos rentables.",
          en: "Audits aimed at prioritising energy use, from the most to the least cost-effective savings opportunities.",
        },
      },
      {
        title: { es: "Iluminación eficiente", en: "Efficient lighting" },
        description: {
          es: "Diseño de los espacios en función de la luz y de la tecnología empleada, con tecnología de bajo consumo.",
          en: "Spaces designed around the light and the technology used, with low-consumption technology.",
        },
      },
      {
        title: { es: "Energías renovables y geotermia", en: "Renewables and geothermal" },
        description: {
          es: "Soluciones del sector renovable y geotérmico ofrecidas a través de empresas colaboradoras especializadas.",
          en: "Renewable and geothermal solutions offered through specialist partner companies.",
        },
      },
    ],
    related: ["eficiencia-energetica", "certificacion-energetica"],
    source: "en",
  },
  {
    slug: "consultoria",
    ref: "C",
    title: { es: "Consultoría y peritaje", en: "Advisory and expert reports" },
    lede: {
      es: "Informes periciales para despachos de abogados, due diligence y consultoría ambiental.",
      en: "Expert reports for law firms, due diligence and environmental consulting.",
    },
    services: [
      {
        title: { es: "Peritaje judicial", en: "Forensic expert work" },
        description: {
          es: "Colegiados y en la lista de profesionales técnicos judiciales desde 1992, con trabajo para despachos de Málaga, Marbella, Palma de Mallorca y Madrid.",
          en: "Registered and on the list of judicial technical professionals since 1992, working for firms in Málaga, Marbella, Palma de Mallorca and Madrid.",
        },
      },
      {
        title: { es: "Patología constructiva", en: "Building pathology" },
        description: {
          es: "Diagnóstico de patologías, control de humedades en vivienda y asesoramiento en soluciones técnicas de reparación.",
          en: "Diagnosis of defects, damp control in housing, and advice on technical repair solutions.",
        },
      },
      {
        title: { es: "Due diligence", en: "Due diligence" },
        description: {
          es: "Análisis económico-financiero y legal para valorar y fijar de forma objetiva una operación de adquisición.",
          en: "Economic-financial and legal analysis to value and objectively settle an acquisition.",
        },
      },
      {
        title: { es: "Ingeniería ambiental", en: "Environmental engineering" },
        description: {
          es: "Estudios de impacto ambiental, autorizaciones conforme a la GICA y consultoría sobre agua, aire, suelo, residuos y ruido.",
          en: "Environmental impact studies, approvals under GICA, and consulting on water, air, soil, waste and noise.",
        },
      },
      {
        title: { es: "Tasaciones y valoraciones", en: "Appraisals and valuations" },
        description: {
          es: "Tasaciones privadas y parciales, informes urbanísticos, valoraciones y reconocimientos.",
          en: "Private and partial appraisals, planning reports, valuations and inspections.",
        },
      },
    ],
    related: ["peritaje", "due-diligence", "ingenieria-ambiental"],
    source: "en",
  },
  {
    slug: "patrimonio",
    ref: "D",
    title: {
      es: "Comunidades y administradores de fincas",
      en: "Communities and property managers",
    },
    lede: {
      es: "Servicio técnico continuado para comunidades de propietarios y administradores de fincas, con el Libro del Edificio como documento central.",
      en: "Continuing technical service for owners' communities and property managers, with the Building Manual at its centre.",
    },
    services: [
      {
        title: { es: "Libro del Edificio", en: "Building Manual" },
        description: {
          es: "Elaboración, control y verificación del documento que recoge las normas de uso y conservación del edificio y las garantías de su construcción.",
          en: "Preparation, control and verification of the document setting out the building's rules of use and conservation and its construction guarantees.",
        },
      },
      {
        title: { es: "Informe del estado del edificio", en: "Building condition report" },
        description: {
          es: "Informe que refleja el estado actual de las edificaciones y permite prever los costes reales de mantenimiento año tras año.",
          en: "A report on the current condition of the buildings, allowing real maintenance costs to be forecast year on year.",
        },
      },
      {
        title: { es: "Servicio técnico mensual", en: "Monthly technical service" },
        description: {
          es: "Por una cuota mensual fija, servicio técnico especializado que además supervisa y gestiona las reparaciones contratadas a empresas externas por la comunidad.",
          en: "For a fixed monthly fee, a specialist technical service that also supervises and manages repairs the community contracts to outside firms.",
        },
      },
      {
        title: { es: "Inspección técnica de edificios", en: "Technical inspection of buildings" },
        description: {
          es: "Inspección técnica y planes de mantenimiento del edificio, con tramitación de subvenciones cuando procede.",
          en: "Technical inspection and building maintenance plans, with grant applications where applicable.",
        },
      },
    ],
    related: ["comunidades"],
    source: "es",
  },
];

export const familyBySlug = new Map(families.map((family) => [family.slug, family]));

/**
 * The Servipack structure, preserved from the legacy "Architecture Servipack"
 * page. Scope is faithful; fees read "on request" — see the note at the top of
 * this file.
 */
export interface Servipack {
  ref: string;
  title: Localized<string>;
  items: Localized<readonly string[]>;
  note?: Localized<string>;
}

export const servipacks: readonly Servipack[] = [
  {
    ref: "01",
    title: { es: "Informes, tasaciones y valoraciones", en: "Reports, appraisals and valuations" },
    items: {
      es: [
        "Examen parcial",
        "Informes diversos",
        "Tasación privada y tasación parcial",
        "Informes urbanísticos",
        "Valoraciones y reconocimientos",
        "Consultas y asesoramiento",
        "Deslindes y replanteos",
        "Realización de planos",
        "Toma y tratamiento de datos",
        "Gestión de residuos",
        "Inspección técnica de edificios",
        "Planes de mantenimiento del edificio",
        "Tramitación de subvenciones",
      ],
      en: [
        "Partial examination",
        "Various reports",
        "Private and partial appraisal",
        "Planning reports",
        "Valuations and inspections",
        "Consultations and advice",
        "Boundary definition and setting-out",
        "Drawing production",
        "Data capture and processing",
        "Waste management",
        "Technical inspection of buildings",
        "Building maintenance plans",
        "Grant applications",
      ],
    },
    note: {
      es: "La estimación depende de los requisitos de cada documento a tramitar.",
      en: "The estimate depends on the requirements of each document to be processed.",
    },
  },
  {
    ref: "02",
    title: { es: "Ahorro energético", en: "Energy saving" },
    items: {
      es: [
        "Certificación energética y presentación ante la comunidad autónoma",
        "Auditorías energéticas",
        "Instalación de sistema de control de consumo en el cuadro eléctrico",
        "Programación KNX de alcance reducido",
        "Lector de consumo para vivienda monofásica",
        "Lector de consumo para vivienda trifásica",
        "Mantenimiento de sistemas KNX",
        "Estudios de viabilidad energética",
      ],
      en: [
        "Energy certification and filing with the regional authority",
        "Energy audits",
        "Installation of a consumption-control system in the electrical panel",
        "Small-scope KNX programming",
        "Consumption reader for single-phase dwellings",
        "Consumption reader for three-phase dwellings",
        "Maintenance of KNX systems",
        "Energy viability studies",
      ],
    },
    note: {
      es: "El alcance depende de la instalación existente en cada vivienda.",
      en: "Scope depends on the existing installation in each dwelling.",
    },
  },
  {
    ref: "03",
    title: { es: "Control y gestión de obra", en: "Works control and management" },
    items: {
      es: [
        "Tramitación de licencia de apertura",
        "Solicitud de licencia de obra mayor",
        "Solicitud y realización de presupuestos de obra menor",
        "Solicitud y realización de presupuestos de obra mayor",
        "Tramitación ante varias administraciones",
        "Gestión y control de obra menor",
        "Gestión y control de obra mayor",
        "Gestión de permisos y licencias ante los organismos competentes",
        "Seguimiento y trazabilidad de expedientes",
        "Topografía",
        "Control, seguimiento e implantación del presupuesto de obra menor",
        "Control, seguimiento e implantación del presupuesto de obra mayor",
        "Gestión y control de humedades en viviendas",
        "Asesoramiento en soluciones técnicas de reparación",
        "Control de calidad, reformas y acabados",
      ],
      en: [
        "Opening-licence processing",
        "Major-works licence application",
        "Request and preparation of minor-works budgets",
        "Request and preparation of major-works budgets",
        "Processing across several authorities",
        "Management and control of minor works",
        "Management and control of major works",
        "Permit and licence management with the competent bodies",
        "File tracking and traceability",
        "Surveying",
        "Control, monitoring and implementation of the minor-works budget",
        "Control, monitoring and implementation of the major-works budget",
        "Management and control of damp in dwellings",
        "Advice on technical repair solutions",
        "Quality control, alterations and finishes",
      ],
    },
    note: {
      es: "Trabajos sin visado. Si se requiere visado, se añaden los gastos del colegio profesional.",
      en: "Works are unstamped. Where a professional-association stamp is required, those fees are added.",
    },
  },
  {
    ref: "04",
    title: { es: "Gestión y control de comunidades", en: "Community management and control" },
    items: {
      es: [
        "Servicio técnico especializado con cuota mensual fija",
        "Supervisión y gestión de reparaciones contratadas a empresas externas",
        "Tramos por tamaño de comunidad: hasta 20 viviendas, 21–60, 61–120 y más de 120",
        "Informe anual sobre la situación global de la comunidad",
        "Descuento sobre el resto de los packs",
        "Sistemas de ahorro energético para comunidades",
      ],
      en: [
        "Specialist technical service on a fixed monthly fee",
        "Supervision and management of repairs contracted to outside firms",
        "Bands by community size: up to 20 units, 21–60, 61–120 and over 120",
        "Annual report on the overall condition of the community",
        "A discount against the other packs",
        "Energy-saving systems for communities",
      ],
    },
  },
  {
    ref: "05",
    title: { es: "Certificación energética oficial", en: "Official energy certification" },
    items: {
      es: [
        "Emisión del certificado de eficiencia energética",
        "Gestión de la inscripción ante el órgano competente de la comunidad autónoma",
        "Descuento por unidades similares situadas en un radio de 5 kilómetros",
        "Descuento por volumen dentro de la misma localidad",
        "Análisis previo a partir de referencia catastral, año de construcción, superficie habitable, intensidad de uso y consumos de los dos últimos años",
      ],
      en: [
        "Issue of the energy performance certificate",
        "Management of registration with the competent regional body",
        "Discount for similar units located within a 5-kilometre radius",
        "Volume discount within the same locality",
        "Preliminary analysis from cadastral reference, construction year, habitable area, intensity of use and the last two years of consumption",
      ],
    },
    note: {
      es: "Tarifa de ámbito nacional conforme a la resolución de 7 de noviembre de 2013 (BOE 19/11/2013). Los descuentos no son acumulables.",
      en: "A national rate under the resolution of 7 November 2013 (BOE 19/11/2013). Discounts cannot be combined.",
    },
  },
];
