import type { Localized, SourceLang } from "@/lib/i18n";

/**
 * Work dossiers.
 *
 * The legacy site published no named commissions and no project photography,
 * so nothing here invents a building. Each dossier describes a programme type
 * the practice states it works in, with scope and regulatory detail taken from
 * the legacy "Architecture projects", "Energy projects", "Due diligence",
 * "Servipack" and "Comunidades" pages.
 *
 * `source` records the language the copy was published in. Where it is not
 * `both`, the other language was translated for this build and needs studio
 * sign-off — see docs/TRANSLATION-REVIEW.md.
 */

export type DrawingMotif = "axon" | "section" | "plan" | "elevation" | "grid" | "detail";

export interface Fact {
  label: Localized<string>;
  value: Localized<string>;
}

export interface Work {
  slug: string;
  /** Catalogue number shown in the index. */
  ref: string;
  title: Localized<string>;
  discipline: Localized<string>;
  summary: Localized<string>;
  body: Localized<readonly string[]>;
  scope: Localized<readonly string[]>;
  framework?: Localized<readonly string[]>;
  facts: readonly Fact[];
  motif: DrawingMotif;
  source: SourceLang;
}

const TERRITORY: Fact = {
  label: { es: "Ámbito", en: "Territory" },
  value: { es: "Málaga y Marbella", en: "Málaga and Marbella" },
};

export const work: readonly Work[] = [
  {
    slug: "vivienda-unifamiliar",
    ref: "01",
    title: { es: "Vivienda unifamiliar", en: "Single-family housing" },
    discipline: {
      es: "Dirección de ejecución · Project management",
      en: "Construction management · Project management",
    },
    summary: {
      es: "Dirección y supervisión arquitectónica de vivienda unifamiliar, desde la búsqueda de suelo hasta la entrega.",
      en: "Architectural direction and supervision of single-family housing, from site search through to handover.",
    },
    body: {
      es: [
        "La vivienda unifamiliar es el programa en el que el despacho trabaja con mayor continuidad en Málaga y Marbella. El encargo habitual abarca la dirección de la ejecución material y la supervisión arquitectónica de la obra.",
        "El servicio se plantea como una dirección integrada: definición del concepto, búsqueda de suelo, gestión intermedia y cierre del proyecto, con asesoramiento al inversor en todas las fases.",
      ],
      en: [
        "Single-family housing is the programme the practice works in most continuously across Málaga and Marbella. A typical commission covers construction management and architectural supervision of the works.",
        "The service is structured as integrated project management: concept definition, site search, mid-stage coordination and project close-out, with advice to the investor at every stage.",
      ],
    },
    scope: {
      es: [
        "Dirección de ejecución material",
        "Supervisión arquitectónica de obra",
        "Búsqueda y análisis de suelo",
        "Gestión de licencias y permisos",
        "Control de presupuesto y certificaciones",
        "Asesoramiento al inversor",
      ],
      en: [
        "Construction management",
        "Architectural site supervision",
        "Site search and appraisal",
        "Licence and permit management",
        "Budget control and valuations",
        "Investor advisory",
      ],
    },
    facts: [
      TERRITORY,
      {
        label: { es: "Disciplina", en: "Discipline" },
        value: { es: "Arquitectura técnica", en: "Technical architecture" },
      },
    ],
    motif: "axon",
    source: "en",
  },
  {
    slug: "vivienda-plurifamiliar",
    ref: "02",
    title: { es: "Vivienda plurifamiliar", en: "Multi-family housing" },
    discipline: {
      es: "Dirección de ejecución · Gestión de licencias",
      en: "Construction management · Licence management",
    },
    summary: {
      es: "Edificios residenciales colectivos: dirección de obra, control de costes y tramitación ante la administración.",
      en: "Collective residential buildings: site direction, cost control and processing with the authorities.",
    },
    body: {
      es: [
        "En promoción plurifamiliar el despacho asume la dirección de la ejecución y el control del proceso administrativo, que en la Costa del Sol concentra buena parte del riesgo de un proyecto.",
        "El trabajo incluye la solicitud y el seguimiento de licencias de obra mayor, la gestión ante varias administraciones y el control de la implantación presupuestaria a lo largo de la obra.",
      ],
      en: [
        "On multi-family developments the practice takes on construction management and control of the administrative process, which on the Costa del Sol carries much of a project's risk.",
        "Work includes applying for and tracking major-works licences, dealing with several authorities in parallel, and controlling budget implementation across the build.",
      ],
    },
    scope: {
      es: [
        "Licencia de obra mayor: solicitud y seguimiento",
        "Gestión ante varias administraciones",
        "Control y seguimiento de presupuesto de obra mayor",
        "Seguimiento y trazabilidad de expedientes",
        "Control de calidad, reformas y acabados",
      ],
      en: [
        "Major-works licence: application and tracking",
        "Liaison across multiple authorities",
        "Control and monitoring of major-works budgets",
        "File tracking and traceability",
        "Quality control, alterations and fit-out",
      ],
    },
    facts: [
      TERRITORY,
      {
        label: { es: "Disciplina", en: "Discipline" },
        value: { es: "Dirección integrada", en: "Integrated management" },
      },
    ],
    motif: "elevation",
    source: "en",
  },
  {
    slug: "industrial",
    ref: "03",
    title: { es: "Naves industriales y fábricas", en: "Factories and warehouses" },
    discipline: {
      es: "Dirección de ejecución · Ingeniería",
      en: "Construction management · Engineering",
    },
    summary: {
      es: "Edificación industrial y logística: naves, fábricas y sus instalaciones asociadas.",
      en: "Industrial and logistics building: warehouses, factories and their associated installations.",
    },
    body: {
      es: [
        "El despacho declara experiencia en dirección y supervisión arquitectónica de naves y fábricas, además de los programas residenciales y de urbanización.",
        "En este tipo de edificación el control de instalaciones y de consumo energético pesa tanto como la obra civil, por lo que el encargo se suele plantear junto a los servicios de eficiencia energética del despacho.",
      ],
      en: [
        "Alongside its residential and urbanisation work, the practice states experience in the direction and architectural supervision of warehouses and factories.",
        "In this kind of building, control of services and energy consumption weighs as heavily as the civil works, so commissions are usually framed together with the practice's energy-efficiency services.",
      ],
    },
    scope: {
      es: [
        "Dirección de ejecución de nave industrial",
        "Supervisión de instalaciones",
        "Medición de consumos",
        "Estudios de viabilidad y rentabilidad",
        "Gestión de residuos",
      ],
      en: [
        "Construction management of industrial units",
        "Supervision of building services",
        "Consumption measurement",
        "Viability and profitability studies",
        "Waste management",
      ],
    },
    facts: [
      TERRITORY,
      {
        label: { es: "Disciplina", en: "Discipline" },
        value: { es: "Edificación industrial", en: "Industrial building" },
      },
    ],
    motif: "section",
    source: "en",
  },
  {
    slug: "urbanizacion",
    ref: "04",
    title: { es: "Urbanización", en: "Urbanisation" },
    discipline: { es: "Gestión de suelo · Urbanismo", en: "Land management · Planning" },
    summary: {
      es: "Gestión de suelo, informes urbanísticos y deslindes para desarrollos en la provincia de Málaga.",
      en: "Land management, planning reports and boundary surveys for developments across Málaga province.",
    },
    body: {
      es: [
        "La urbanización figura entre los programas de obra que el despacho dirige, junto con la gestión de suelo y promociones.",
        "El trabajo se apoya en informes urbanísticos, levantamientos topográficos, deslindes y replanteos, y en la tramitación ante las administraciones competentes.",
      ],
      en: [
        "Urbanisation sits among the works programmes the practice directs, alongside land management and development promotion.",
        "The work rests on planning reports, surveys, boundary definition and setting-out, and on processing with the competent authorities.",
      ],
    },
    scope: {
      es: [
        "Informes urbanísticos",
        "Levantamiento topográfico",
        "Deslindes y replanteos",
        "Realización de planos",
        "Toma y tratamiento de datos",
        "Tramitación de subvenciones",
      ],
      en: [
        "Planning reports",
        "Topographic survey",
        "Boundary definition and setting-out",
        "Drawing production",
        "Data capture and processing",
        "Grant applications",
      ],
    },
    facts: [
      TERRITORY,
      {
        label: { es: "Disciplina", en: "Discipline" },
        value: { es: "Gestión de suelo", en: "Land management" },
      },
    ],
    motif: "plan",
    source: "en",
  },
  {
    slug: "eficiencia-energetica",
    ref: "05",
    title: { es: "Eficiencia energética y KNX", en: "Energy efficiency and KNX" },
    discipline: { es: "Ingeniería energética · Control", en: "Energy engineering · Control" },
    summary: {
      es: "Control de iluminación, climatización, persianas y riego sobre sistema KNX, y control automático de consumo.",
      en: "Lighting, HVAC, blind and irrigation control over KNX, plus automatic consumption control.",
    },
    body: {
      es: [
        "El despacho trabaja la gestión energética de vivienda, oficina y edificio a través del sistema de control KNX, que permite monitorizar iluminación, climatización, persianas y riego sobre una misma instalación, tanto en obra nueva como en edificio existente.",
        "Para los casos en que no se desea reformar, se instala un sistema de control de consumo en el cuadro eléctrico. El sistema recoge la información de consumo y, al detectar un exceso, actúa automáticamente sobre los dispositivos que consumen de forma excesiva; el usuario puede consultar el consumo exacto en todo momento.",
      ],
      en: [
        "The practice handles energy management for homes, offices and buildings through the KNX control system, which monitors lighting, air conditioning, blinds and irrigation on a single installation, in both new build and existing buildings.",
        "Where no refurbishment is wanted, a consumption-control device is fitted in the electrical panel. It gathers consumption data and, when an excess is detected, automatically acts on the devices drawing too much; the user can read exact consumption at any time.",
      ],
    },
    scope: {
      es: [
        "Sistemas de iluminación eficiente y renovación de alumbrado",
        "Climatización inteligente",
        "Sistemas de medición de consumo",
        "Control automático de consumo",
        "Domótica orientada al ahorro",
        "Estudios de viabilidad y rentabilidad",
        "Energías renovables",
      ],
      en: [
        "Efficient lighting systems and lighting renewal",
        "Intelligent HVAC",
        "Consumption measurement systems",
        "Automatic consumption control",
        "Energy-saving based automation",
        "Viability and profitability studies",
        "Renewable energy",
      ],
    },
    facts: [
      {
        label: { es: "Sistema", en: "System" },
        value: { es: "KNX", en: "KNX" },
      },
      {
        label: { es: "Aplicación", en: "Application" },
        value: { es: "Vivienda, oficina, edificio", en: "Home, office, building" },
      },
    ],
    motif: "grid",
    source: "en",
  },
  {
    slug: "certificacion-energetica",
    ref: "06",
    title: { es: "Certificación y auditoría energética", en: "Energy certification and audit" },
    discipline: { es: "Certificación · Auditoría", en: "Certification · Audit" },
    summary: {
      es: "Certificado de eficiencia energética, presentación ante la comunidad autónoma y auditorías de consumo.",
      en: "Energy performance certificates, filing with the regional authority, and consumption audits.",
    },
    body: {
      es: [
        "Desde 2007 los edificios de nueva construcción deben acreditar su certificación energética, obligación que alcanza también a los edificios rehabilitados de más de 1.000 metros cuadrados, según el Real Decreto 47/2007.",
        "El despacho emite el certificado, lo presenta ante el órgano competente de la comunidad autónoma y realiza auditorías energéticas orientadas a priorizar el uso de la energía, de las oportunidades de ahorro más rentables a las menos rentables.",
        "Para el análisis previo se requiere la identificación del edificio —dirección y referencia catastral—, el año de construcción, la superficie habitable, la intensidad de uso y los consumos de los dos últimos años.",
      ],
      en: [
        "Since 2007, new buildings have had to evidence their energy certification, an obligation that also reaches refurbished buildings over 1,000 square metres, under Royal Decree 47/2007.",
        "The practice issues the certificate, files it with the competent regional body, and carries out energy audits aimed at prioritising energy use from the most to the least cost-effective savings opportunities.",
        "Preliminary analysis requires the building's identification — address and cadastral reference — its construction year, habitable floor area, intensity of use, and consumption over the last two years.",
      ],
    },
    scope: {
      es: [
        "Certificado de eficiencia energética (CEE)",
        "Presentación del CEE ante la comunidad autónoma",
        "Auditoría energética",
        "Estudios de viabilidad energética",
        "Inspección técnica de edificios",
      ],
      en: [
        "Energy performance certificate (CEE)",
        "Filing of the CEE with the regional authority",
        "Energy audit",
        "Energy viability studies",
        "Technical inspection of buildings",
      ],
    },
    framework: {
      es: [
        "Real Decreto 47/2007 — certificación energética de edificios",
        "Resolución de 7 de noviembre de 2013 (BOE 19/11/2013) — tarifas aplicables",
      ],
      en: [
        "Royal Decree 47/2007 — energy certification of buildings",
        "Resolution of 7 November 2013 (BOE 19/11/2013) — applicable rates",
      ],
    },
    facts: [
      {
        label: { es: "Marco", en: "Framework" },
        value: { es: "RD 47/2007", en: "RD 47/2007" },
      },
      {
        label: { es: "Tarifa", en: "Rate" },
        value: { es: "BOE 19/11/2013", en: "BOE 19/11/2013" },
      },
    ],
    motif: "detail",
    source: "en",
  },
  {
    slug: "peritaje",
    ref: "07",
    title: { es: "Peritaje y patología constructiva", en: "Expert reports and building pathology" },
    discipline: { es: "Pericial judicial · Patología", en: "Forensic · Pathology" },
    summary: {
      es: "Informes periciales para despachos de abogados, patología constructiva y control de humedades.",
      en: "Expert reports for law firms, building pathology and damp investigation.",
    },
    body: {
      es: [
        "Desde 1992 el despacho pertenece al cuerpo de colegiados y a la lista de profesionales técnicos judiciales, y trabaja con despachos de abogados de Málaga, Marbella, Palma de Mallorca y Madrid.",
        "El trabajo pericial cubre la patología constructiva, el peritaje forense y el control de humedades en vivienda, además del asesoramiento sobre soluciones técnicas de reparación.",
      ],
      en: [
        "Since 1992 the practice has belonged to the professional association and to the list of judicial technical professionals, and works with law firms in Málaga, Marbella, Palma de Mallorca and Madrid.",
        "Forensic work covers building pathology, forensic survey and damp control in housing, together with advice on technical repair solutions.",
      ],
    },
    scope: {
      es: [
        "Informes periciales y dictámenes",
        "Reconocimientos y exámenes parciales",
        "Patología constructiva",
        "Gestión y control de humedades en viviendas",
        "Asesoramiento en soluciones técnicas de reparación",
        "Tasaciones y valoraciones privadas",
      ],
      en: [
        "Expert reports and opinions",
        "Partial examinations and inspections",
        "Building pathology",
        "Management and control of damp in housing",
        "Advice on technical repair solutions",
        "Private appraisals and valuations",
      ],
    },
    facts: [
      {
        label: { es: "Colegiado desde", en: "Registered since" },
        value: { es: "1992", en: "1992" },
      },
      {
        label: { es: "Ámbito", en: "Territory" },
        value: {
          es: "Málaga, Marbella, Palma, Madrid",
          en: "Málaga, Marbella, Palma, Madrid",
        },
      },
    ],
    motif: "detail",
    source: "en",
  },
  {
    slug: "due-diligence",
    ref: "08",
    title: { es: "Due diligence", en: "Due diligence" },
    discipline: { es: "Consultoría · Análisis de riesgo", en: "Advisory · Risk analysis" },
    summary: {
      es: "Búsqueda y verificación de información sobre una empresa o un activo antes de una adquisición.",
      en: "Investigation and verification of a company or asset ahead of an acquisition.",
    },
    body: {
      es: [
        "La diligencia debida es el proceso de búsqueda de información sobre una empresa: su área de actividad, las perspectivas de futuro del negocio y el estado de su activo y de su pasivo. Busca obtener la información necesaria para fijar de forma objetiva el precio final de una operación, la forma de estructurar la transacción y la exigencia de garantías o, en su caso, la conveniencia de dar marcha atrás por la detección de riesgos.",
        "El análisis económico-financiero consiste en una auditoría de compra pormenorizada que afecta a los estados financieros y a la valoración de activos materiales e inmateriales, y que coteja la viabilidad del plan de negocio elaborado por la dirección.",
        "El análisis legal se basa en la revisión de los contratos, de los temas societarios y de los posibles litigios, e incluye la revisión fiscal y laboral. Su importancia está en evitar que queden ocultos compromisos o acuerdos que podrían poner en peligro la operación.",
      ],
      en: [
        "Due diligence is the process of investigating a business: its field of activity, the prospects of the business, and the state of its assets and liabilities. It sets out to obtain the information needed to fix objectively the final price of a transaction, how it should be structured, and what guarantees to require — or whether to withdraw because risks have come to light.",
        "The economic and financial analysis is a detailed acquisition audit covering the financial statements and the valuation of tangible and intangible assets, and tests the viability of the business plan drawn up by management.",
        "The legal analysis rests on reviewing contracts, corporate matters and potential litigation, and includes tax and employment review. Its value lies in preventing undisclosed commitments or agreements from putting the transaction at risk.",
      ],
    },
    scope: {
      es: [
        "Descripción del sector y de la empresa",
        "Sistemas contables y de control interno",
        "Información y situación financiera",
        "Valoración de activos materiales e inmateriales",
        "Organización y recursos humanos",
        "Factores medioambientales",
        "Revisión de contratos, societaria y de litigios",
        "Revisión fiscal y laboral",
      ],
      en: [
        "Sector and company description",
        "Accounting and internal control systems",
        "Financial information and position",
        "Valuation of tangible and intangible assets",
        "Organisation and human resources",
        "Environmental factors",
        "Review of contracts, corporate matters and litigation",
        "Tax and employment review",
      ],
    },
    facts: [
      {
        label: { es: "Análisis", en: "Analysis" },
        value: {
          es: "Económico-financiero y legal",
          en: "Economic-financial and legal",
        },
      },
    ],
    motif: "grid",
    source: "both",
  },
  {
    slug: "ingenieria-ambiental",
    ref: "09",
    title: { es: "Ingeniería ambiental", en: "Environmental engineering" },
    discipline: {
      es: "Ingeniería ambiental · Consultoría",
      en: "Environmental engineering · Advisory",
    },
    summary: {
      es: "Estudios de impacto ambiental, autorizaciones y consultoría sobre agua, aire, suelo, residuos y ruido.",
      en: "Environmental impact studies, approvals, and advisory on water, air, soil, waste and noise.",
    },
    body: {
      es: [
        "Los estudios de ingeniería ambiental reconocen, interpretan y diagnostican los impactos ambientales negativos y positivos, valoran la magnitud del daño causado al medio y proponen soluciones integradas conforme a la legislación ambiental vigente.",
        "La consultoría ambiental trabaja la contaminación de agua, aire y suelo, la evaluación de impacto, la auditoría ambiental, la gestión de residuos, la política ambiental, la ordenación eco-territorial y la medición de ruido y vibración.",
        "La Ley de Gestión Integrada de la Calidad Ambiental (GICA) es la norma que regula los instrumentos de prevención y control ambiental en Andalucía, y permite los estudios previos sobre los posibles efectos en el medio.",
      ],
      en: [
        "Environmental engineering studies recognise, interpret and diagnose negative and positive environmental impacts, assess the scale of damage caused to the environment, and propose integrated solutions in line with current environmental law.",
        "Environmental consulting covers water, air and soil pollution, impact assessment, environmental audit, waste management, environmental policy, eco-territorial management, and noise and vibration measurement.",
        "The Integrated Environmental Quality Management Act (GICA) is the legislation governing instruments of environmental prevention and control in Andalusia, and allows for prior study of possible effects on the environment.",
      ],
    },
    scope: {
      es: [
        "Estudios de impacto ambiental",
        "Autorizaciones ambientales",
        "Auditoría ambiental",
        "Gestión de residuos",
        "Medición de ruido y vibración",
        "Ordenación eco-territorial",
      ],
      en: [
        "Environmental impact studies",
        "Environmental approvals",
        "Environmental audit",
        "Waste management",
        "Noise and vibration measurement",
        "Eco-territorial management",
      ],
    },
    framework: {
      es: ["Ley de Gestión Integrada de la Calidad Ambiental (GICA) — Andalucía"],
      en: ["Integrated Environmental Quality Management Act (GICA) — Andalusia"],
    },
    facts: [
      {
        label: { es: "Marco", en: "Framework" },
        value: { es: "GICA, Andalucía", en: "GICA, Andalusia" },
      },
    ],
    motif: "section",
    source: "en",
  },
  {
    slug: "comunidades",
    ref: "10",
    title: { es: "Comunidades y Libro del Edificio", en: "Communities and the Building Manual" },
    discipline: {
      es: "Administración de fincas · Mantenimiento",
      en: "Property management · Maintenance",
    },
    summary: {
      es: "Elaboración y control del Libro del Edificio e informe del estado de las edificaciones para comunidades de propietarios.",
      en: "Preparation and control of the Building Manual, plus condition reports for owners' communities.",
    },
    body: {
      es: [
        "El Libro del Edificio contiene las normas de uso y conservación del edificio, así como las garantías sobre la calidad utilizada en su construcción y los materiales empleados, de manera que cada propietario pueda conocer a quién dirigirse para cualquier reclamación por defectos de construcción o rehabilitación integral del edificio.",
        "En la experiencia del despacho con demandas de comunidades de propietarios hacia promotores, la inexistencia del Libro del Edificio llega a ser prueba suficiente de no mantener correctamente las edificaciones, y una reclamación bien fundamentada puede caer por la falta de este documento.",
        "Para las comunidades que carezcan de él, el despacho elabora el documento y un informe que refleje el estado actual de las edificaciones. Con ello el administrador dispone de un documento completo del estado de la comunidad que gestiona, asesorado técnicamente. El coste depende del estado de las edificaciones, su antigüedad y la existencia previa del libro.",
        "El documento permite a comunidades y administradores conocer el plan de actuación de mantenimiento anual y disponer, antes de las juntas generales, del estudio de presupuestos y del alcance real del mantenimiento del edificio.",
      ],
      en: [
        "The Building Manual sets out the rules for the use and conservation of a building, together with the guarantees on the quality and materials used in its construction, so that each owner knows who to approach over any claim for construction defects or whole-building refurbishment.",
        "In the practice's experience of claims by owners' communities against developers, the absence of a Building Manual becomes sufficient evidence that the buildings have not been properly maintained, and a well-founded claim can fail for want of the document.",
        "For communities without one, the practice prepares the document together with a report on the current condition of the buildings. The manager then holds a complete, technically advised record of the community they administer. Cost depends on the condition and age of the buildings and whether a manual already exists.",
        "The document lets communities and managers establish the annual maintenance plan and hold, ahead of general meetings, the budget study and the real scope of the building's maintenance.",
      ],
    },
    scope: {
      es: [
        "Elaboración del Libro del Edificio",
        "Control y verificación del libro existente",
        "Informe del estado actual de las edificaciones",
        "Previsión de costes de mantenimiento anual",
        "Asistencia y asesoramiento a administradores de fincas",
        "Servicio técnico mensual para comunidades",
      ],
      en: [
        "Preparation of the Building Manual",
        "Control and verification of an existing manual",
        "Report on the current condition of the buildings",
        "Forecast of annual maintenance costs",
        "Support and advice for property managers",
        "Monthly technical service for communities",
      ],
    },
    framework: {
      es: [
        "Real Decreto 314/2006 — Código Técnico de la Edificación, artículo 6",
        "Orden de 30 de noviembre de 2009 — Consejería de Vivienda y Ordenación del Territorio",
      ],
      en: [
        "Royal Decree 314/2006 — Technical Building Code, article 6",
        "Order of 30 November 2009 — Regional Ministry of Housing and Planning",
      ],
    },
    facts: [
      {
        label: { es: "Marco", en: "Framework" },
        value: { es: "CTE, RD 314/2006", en: "CTE, RD 314/2006" },
      },
      {
        label: { es: "Servicio", en: "Service" },
        value: { es: "Cuota mensual fija", en: "Fixed monthly fee" },
      },
    ],
    motif: "plan",
    source: "es",
  },
  {
    slug: "interiorismo",
    ref: "11",
    title: { es: "Interiorismo y decoración", en: "Interior design and decoration" },
    discipline: { es: "Diseño · Interiorismo", en: "Design · Interiors" },
    summary: {
      es: "Diseño y decoración de interiores en los proyectos y reformas principales del despacho.",
      en: "Interior design and decoration on the practice's principal projects and refurbishments.",
    },
    body: {
      es: [
        "El despacho ofrece su experiencia en diseño y decoración de interiores, incluyendo el asesoramiento y la elección de los elementos que componen la vivienda.",
        "Andrea Artímez es responsable del diseño y la decoración de interiores de los proyectos y reformas principales del despacho.",
        "La iluminación de una vivienda se plantea como parte del proyecto: los espacios se diseñan en función de la luz y de la tecnología empleada, con tecnología de bajo consumo para conseguir espacios confortables y de ahorro energético.",
      ],
      en: [
        "The practice offers its experience in interior design and decoration, including advice on and selection of the elements that make up a home.",
        "Andrea Artímez leads interior design and decoration on the practice's principal projects and refurbishments.",
        "Lighting a home is treated as part of the project: spaces are designed around the light and the technology used, with low-consumption technology to create comfortable, energy-saving interiors.",
      ],
    },
    scope: {
      es: [
        "Diseño de interiores",
        "Decoración y selección de elementos",
        "Diseño de iluminación",
        "Reformas y acabados",
      ],
      en: [
        "Interior design",
        "Decoration and selection of elements",
        "Lighting design",
        "Refurbishment and finishes",
      ],
    },
    facts: [
      {
        label: { es: "Responsable", en: "Lead" },
        value: { es: "Andrea Artímez", en: "Andrea Artímez" },
      },
    ],
    motif: "axon",
    source: "en",
  },
];

export const workBySlug = new Map(work.map((entry) => [entry.slug, entry]));

export function getWork(slug: string): Work | undefined {
  return workBySlug.get(slug);
}

export function neighbours(slug: string): { previous: Work; next: Work } | null {
  const index = work.findIndex((entry) => entry.slug === slug);
  if (index < 0) return null;
  return {
    previous: work[(index - 1 + work.length) % work.length],
    next: work[(index + 1) % work.length],
  };
}
