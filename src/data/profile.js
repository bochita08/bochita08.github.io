// Toda la información del portfolio vive acá.
// Para actualizar el CV, editá este archivo — el resto de la página se arma solo.

export const profile = {
  fullName: "Nahuel Matías Fortuna",
  shortName: "Nahuel Fortuna",
  role: "Full Stack Developer & QA Tester",
  roleSub: "Manual & Automation Testing · Ethical Hacking",
  location: "Santo Tomé, Santa Fe, Argentina",
  email: "nahuelfortuna08@gmail.com",
  phone: "+54 342 476-3661",
  linkedin: "https://www.linkedin.com/in/nahuel-fortuna-a5845b254/",
  github: "https://github.com/bochita08",

  hooks: [
    {
      icon: "code",
      title: "Full Stack Developer",
      text: "PHP · JavaScript · React · MySQL · WordPress",
    },
    {
      icon: "bug",
      title: "QA Tester",
      text: "Manual & Automation · Selenium · TestRail · JIRA",
    },
    {
      icon: "shield",
      title: "Ethical Hacker",
      text: "Pentesting · OWASP · Kali Linux · Hardening",
    },
    {
      icon: "ai",
      title: "AI-Powered Workflow",
      text: "Claude Code · ChatGPT · Gemini y más",
    },
  ],

  bio: [
    "Nací en Santo Tomé, Santa Fe. Mi camino arrancó orientado a la construcción — soy Técnico Constructor Nacional — y a la administración, trabajando en un estudio contable. En el medio de ese camino encontré dos pasiones nuevas: la programación y la ciberseguridad, y no paré más.",
    "Me formé en la UTN e-learning (Buenos Aires) en Backend Development y Python, y en paralelo me especialicé en Ethical Hacking y Pentesting. Esa combinación — desarrollo, calidad y seguridad — es lo que llevé a SERFE, donde pasé de programar Full Stack a liderar tareas de QA manual y automatizado sobre releases reales.",
    "Hoy sigo cursando la Tecnicatura Universitaria en Sistemas de Información (UTN) — me quedan 2 materias y la práctica profesional — y continúo en paralelo con la parte administrativo-contable, mi primer oficio.",
    "Fuera del código: nado, entreno, y sigo leyendo e investigando sobre IA, programación y ciberseguridad en mi tiempo libre.",
  ],

  interests: [
    "Natación y entrenamiento físico",
    "Lectura e investigación sobre Inteligencia Artificial",
    "Programación y ciberseguridad autodidacta",
  ],

  experience: [
    {
      role: "Full Stack Developer → QA Tester (Manual & Automation)",
      company: "SERFE — Soluciones de Software",
      place: "Santa Fe, Argentina (remoto)",
      period: "Diciembre 2024 — Agosto 2026",
      bullets: [
        "Desarrollo y mantenimiento de aplicaciones web con PHP, MySQL, WordPress, JavaScript y Git; despliegues con Docker e integración en pipelines de CI/CD.",
        "Transición a QA Tester: pruebas manuales y automatizadas de aplicaciones web y mobile (Android e iOS) con BrowserStack.",
        "Elaboración de matrices de prueba y análisis funcional por release; creación de test cases enfocados en mejoras y edge cases.",
        "Búsqueda, identificación y debugging de bugs junto al equipo de desarrollo; automatización con Selenium WebDriver y Codeception.",
        "Gestión de incidencias en JIRA, documentación en Confluence, monitoreo con Datadog y AWS, soporte en Intercom e Iterable.",
      ],
    },
    {
      role: "Administrativo Contable",
      company: "Estudio CPN Fortuna",
      place: "Santa Fe, Argentina",
      period: "2018 — Actualidad",
      bullets: [
        "Liquidación de impuestos de Monotributistas, gestión de Ingresos Brutos e IVA, presentación de Declaraciones Juradas vía SIAP (AFIP).",
        "Control de pagos, seguimiento de situación fiscal de clientes y elaboración de informes en Excel.",
      ],
    },
  ],

  education: [
    {
      title: "Tecnicatura Universitaria en Sistemas de Información",
      place: "Universidad Tecnológica Nacional (UTN), Facultad Regional Santa Fe",
      period: "En curso — restan 2 materias + Práctica Profesional Supervisada",
    },
    {
      title: "Ingeniería Civil (carrera en pausa)",
      place: "Universidad Tecnológica Nacional (UTN), Facultad Regional Santa Fe",
      period: "4to año — 26 materias aprobadas",
    },
    {
      title: "Técnico Constructor Nacional",
      place: "Escuela Industrial Superior — Escuela Técnica Secundaria",
      period: "Egreso: 2016",
    },
  ],

  certifications: [
    { name: "Experto Universitario en Hacking Ético (Ethical Hacking)", org: "UTN e-Learning", year: "2023", note: "Sobresaliente" },
    { name: "Diplomatura Profesional en Backend Developer", org: "UTN e-Learning", year: "2024" },
    { name: "Diplomatura en Python", org: "UTN e-Learning", year: "2024", note: "Inicial · Intermedio · Avanzado" },
    { name: "Pentesting Playground 101 — Pentester N1", org: "Academia de Ciberseguridad, México", year: "2023" },
    { name: "Ethical Hacker Professional Certification (CEHPC)", org: "", year: "2024" },
    { name: "Analista Forense Informático", org: "ARPAC IT", year: "2024" },
    { name: "Aplicación OWASP Security TOP", org: "ARPAC IT", year: "2024" },
    { name: "Fundamentos de Redes para Pentesters", org: "HackerMentor", year: "2024" },
    { name: "Curso Linux para Pentesters", org: "HackerMentor", year: "2024" },
    { name: "Curso Ethical Hacking / Pentesting", org: "HackerMentor", year: "2024" },
    { name: "Introduction to Cybersecurity", org: "Cisco Networking Academy", year: "2024" },
    { name: "JavaScript Essentials 1", org: "Cisco Networking Academy", year: "2024" },
    { name: "Inglés para el Mundo Digital", org: "Coder", year: "2024", note: "Nivel Intermedio" },
  ],

  skills: [
    {
      category: "Desarrollo",
      icon: "code",
      items: [
        "PHP",
        "JavaScript (ES6)",
        "HTML5",
        "CSS3",
        "MySQL",
        "WordPress",
        "CodeIgniter4",
        "React + Vite",
        "Java",
        "Spring Boot",
        ".NET",
        "NetBeans",
        "Eclipse",
        "Git",
      ],
    },
    {
      category: "QA & Testing",
      icon: "bug",
      items: ["Pruebas manuales", "Automatización de pruebas", "Selenium WebDriver", "Codeception", "TestRail", "UAT", "Testing Web & Mobile", "BrowserStack"],
    },
    {
      category: "DevOps & Cloud",
      icon: "cloud",
      items: ["Docker", "CI/CD", "Linux", "AWS", "Datadog"],
    },
    {
      category: "Ciberseguridad",
      icon: "shield",
      items: ["OWASP Top 10", "Pentesting", "Hardening", "Kali Linux", "Nmap", "SQLmap", "Wireshark", "Metasploit", "Burpsuite", "Nessus", "ZAP", "OSINT", "CVE"],
    },
    {
      category: "Gestión & Colaboración",
      icon: "team",
      items: ["JIRA", "Confluence", "Slack", "Google Drive", "Microsoft Office"],
    },
    {
      category: "Plataformas",
      icon: "layers",
      items: ["Salesforce", "Shopify", "Tienda Nube", "Intercom", "Iterable"],
    },
    {
      category: "Inteligencia Artificial",
      icon: "ai",
      items: ["Claude Code", "ChatGPT", "Gemini", "LM Arena", "ElevenLabs", "Codex", "Canva", "Sider", "Base44", "Lovable"],
    },
  ],

  languages: [
    { name: "Español", level: "Nativo", pct: 100 },
    { name: "Inglés", level: "Intermedio (A2–B1)", pct: 50 },
  ],

  // Cada proyecto puede llevar un "demoUrl" opcional: un link a la versión
  // funcionando en vivo (por ejemplo, publicada en Netlify, Vercel o el
  // gh-pages de ESE repo puntual). Si no tiene demoUrl, el botón "Ver demo"
  // no se muestra — no hay nada roto ni links falsos. Para sumarle demo a
  // un proyecto: desplegalo en algún lado gratis y agregá demoUrl: "https://...".
  projects: [
    {
      title: "PuntoYComa — Propiedades y Viviendas",
      description:
        "Sistema de administración de propiedades: publicaciones, contratos, facturas y gestión de inquilinos.",
      tags: ["Java", "Spring Boot", "Eclipse"],
      link: "https://github.com/bochita08/PuntoYComa---propiedades-y-viviendas",
      image: "puntoycoma",
    },
    {
      title: "Aplicación Contable en Python",
      description:
        "Registro de CUIT y credenciales fiscales de contribuyentes, con interfaz de escritorio en Tkinter y base de datos SQLite3.",
      tags: ["Python", "Tkinter", "SQLite3"],
      link: "https://github.com/bochita08/Aplicacion-Contable---Python",
      image: "contable",
    },
    {
      title: "E-commerce · IPHONEXX4",
      description:
        "Tienda online maquetada en React + Vite: home con listado de productos, detalle de producto, login y registro.",
      tags: ["React", "Vite", "JavaScript"],
      link: "https://github.com/bochita08/Pagina-ECOMMERCE-REACT-VITE--",
      image: "iphonexx4",
    },
    {
      title: "My-MACHINES — Laboratorio de Pentesting",
      description:
        "Repositorio educativo con máquinas virtuales preconfiguradas, ISOs y herramientas para practicar ethical hacking de forma responsable.",
      tags: ["Ciberseguridad", "VirtualBox", "Kali Linux"],
      link: "https://github.com/bochita08/My-MACHINES",
      image: "mymachines",
    },
    {
      title: "La Huerta Familiar — Página Relacional",
      description:
        "Sitio con CodeIgniter y MySQL: listado de productos leído desde base de datos y vista de detalle por producto.",
      tags: ["PHP", "CodeIgniter4", "MySQL"],
      link: "https://github.com/bochita08/Pagina-web-PHP--MySQL",
      image: "huerta",
    },
    {
      title: "Curso Universitario de Programación — PHP",
      description:
        "Página demostrativa maquetada con PHP: formulario de cálculo y resultados aplicando fórmulas matemáticas del curso.",
      tags: ["PHP", "MySQL"],
      link: "https://github.com/bochita08/Pagina-web-PHP--MySQL",
      image: "cursosphp",
    },
    {
      title: "0800KICKS — Tienda WordPress",
      description:
        "E-commerce armado sobre WordPress con la temática Astra: plantilla editada, widgets, plugins y páginas de producto.",
      tags: ["WordPress", "PHP"],
      link: "https://github.com/bochita08/PaginaWordPress",
      image: "zapatillas",
    },
    {
      title: "Formulario JS con ES6 + AJAX",
      description:
        "Validación de formularios de registro con sintaxis ES6 y mensajes de confirmación dinámicos vía AJAX.",
      tags: ["JavaScript", "AJAX", "ES6"],
      link: "https://github.com/bochita08/bochita08.github.io",
      image: "formulario",
    },
  ],
};
