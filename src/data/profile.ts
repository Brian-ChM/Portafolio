export const profile = {
  name: "Brian Chaparro",
  role: "Desarrollador semi senior",
  location: "Paraguay",
  email: "brianmarecco@gmail.com",
  github: "https://github.com/Brian-ChM",
  cv: "/Brian_Chaparro_CV.pdf",
  description:
    "Desarrollador de software con experiencia en backend, integraciones, despliegues y desarrollo integral de aplicaciones empresariales.",
};

export const experiences = [
  {
    company: "Grupo Élève",
    role: "Desarrollador semi senior",
    period: "sep. 2026 — actualidad",
    current: true,
    fullName: "",
    description:
      "Desarrollo integral de sistemas empresariales, incluyendo la implementación de funcionalidades, las integraciones y la validación de cambios.",
    responsibilities: [
      "Relevamiento y análisis de requerimientos para el desarrollo y evolución de sistemas.",
      "Implementación de frontend, backend y lógica de negocio, incluyendo integraciones y pruebas funcionales.",
      "Configuración y despliegue de aplicaciones en IIS sobre Windows Server.",
    ],
    contexts: [],
  },
  {
    company: "CLT",
    fullName: "Centro Logístico de Tecnología",
    role: "Desarrollador backend",
    period: "dic. 2024 — sep. 2026",
    current: false,
    description:
      "Desarrollo y mantenimiento de sistemas empresariales basados en microservicios, incluyendo CRM, gestión de tickets, campañas de mensajería y administración de usuarios.",
    responsibilities: [
      "Diseño, implementación y mantenimiento de APIs REST con .NET y Spring Boot para los distintos módulos de los sistemas.",
      "Desarrollo de campañas de mensajería masiva, con programación de envíos y seguimiento de sus estados de procesamiento.",
      "Integración con Infobip y WhatsApp Business Platform mediante la API de Meta.",
      "Implementación de procesos de sincronización entre módulos de autenticación y sistemas internos.",
      "Desarrollo de mecanismos de generación, validación y renovación de licencias cifradas.",
      "Desarrollo de indicadores operativos y métricas para el seguimiento de tickets, campañas y desempeño del sistema.",
      "Comunicación asíncrona entre microservicios mediante RabbitMQ y persistencia con PostgreSQL y MongoDB.",
      "Operación de clústeres Kubernetes sobre Ubuntu, trabajo con Docker y ejecución de pipelines, releases y despliegues mediante Azure DevOps en desarrollo, QA y producción.",
    ],
    contexts: [
      "Backend e integración",
      "Contenedores y servidores",
      "Desarrollo / QA / Producción",
    ],
  },
];

export const skillAreas = [
  {
    title: "Backend e integraciones",
    tools: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "Java",
      "Spring Boot",
      "APIs REST",
      "RabbitMQ",
    ],
    context:
      "Desarrollo de servicios, reglas de negocio e integración entre aplicaciones.",
  },
  {
    title: "Datos y persistencia",
    tools: ["PostgreSQL", "MongoDB", "Entity Framework"],
    context: "Persistencia y acceso a datos en aplicaciones empresariales.",
  },
  {
    title: "Servidores y despliegues",
    tools: [
      "Azure DevOps",
      "Docker",
      "Kubernetes",
      "Ubuntu",
      "IIS",
      "Windows Server",
      "Git",
      "GitHub",
    ],
    context:
      "Trabajo con entornos Linux y Windows, despliegues y seguimiento de aplicaciones en desarrollo, QA y producción.",
  },
  {
    title: "Frontend",
    tools: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Astro",
      "Tailwind CSS",
    ],
    context:
      "Herramientas utilizadas en proyectos personales, formación y desarrollo de este portafolio.",
  },
  {
    title: "Prácticas y patrones",
    tools: ["SOLID", "DDD", "CQRS", "Repository", "Mediator"],
    context:
      "Conocimientos de organización del código, separación de responsabilidades y diseño de servicios.",
  },
];
