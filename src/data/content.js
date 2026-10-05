// Every fact on the site comes from Tapasya's resume (public/Tapasya_Pateriya_Resume.pdf)
// or a project's own README. Update this file, not the components, when the resume changes.

export const profile = {
  name: "Tapasya Pateriya",
  role: "Full-stack developer · Java + React",
  location: "Uttar Pradesh, India",
  email: "tapasyapateriya04@gmail.com",
  github: "https://github.com/TapasyaPateriya04",
  linkedin: "https://www.linkedin.com/in/tapasya-pateriya-175465261/",
  resume: "/Tapasya_Pateriya_Resume.pdf",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const about = {
  build: [
    "Spring Boot services with role-based access, wallet and transaction logic, and REST endpoints that other teams can depend on.",
    "React screens that sit on top of those APIs: dashboards, management UIs and batch flows that show live status.",
    "Small Python tools when the problem calls for it, like a local job-matching assistant with a tested ranking pipeline.",
  ],
  care: [
    "Validation and error handling at the edges, so bad input fails early and clearly.",
    "Interfaces that hold up on every browser and screen size, not only the one I develop on.",
    "Measuring before claiming: labelled data, tests in CI, numbers I can explain.",
  ],
  education: {
    school: "Dr. APJ Abdul Kalam Technical University",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Aug 2021 – May 2025",
    place: "Uttar Pradesh, India",
  },
  achievements: [
    {
      title: "Technical Head, Ignitia Fest",
      meta: "2023 & 2024",
      text: "Led technical event planning and execution two years running, managing cross-functional teams across design, logistics and judging.",
    },
    {
      title: "2nd place, college coding competition",
      meta: "Rs. 8,000 prize",
      text: "Placed second out of 50+ participating teams.",
    },
  ],
};

// Grouped by where each skill sits in a product; every item is on the resume.
// icon keys map to components in src/components/SkillIcon.jsx
export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces: dashboards, management screens, multi-step flows.",
    items: [
      { name: "React", icon: "react", note: "Dashboards, wallet UI, batch screens" },
      { name: "JavaScript", icon: "javascript", note: "Main frontend language" },
      { name: "Tailwind CSS", icon: "tailwind", note: "Used at STAIRS and on this site" },
      { name: "HTML", icon: "html", note: "Semantic, keyboard-friendly markup" },
      { name: "CSS", icon: "css", note: "Cross-browser, cross-device layouts" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Services, access control and the APIs the screens call.",
    items: [
      { name: "Java", icon: "java", note: "OOP, Collections, exception handling" },
      { name: "Spring Boot", icon: "springboot", note: "Prism services at Cars24" },
      { name: "Node.js", icon: "node", note: "URL shortener, EMS" },
      { name: "Express.js", icon: "express", note: "Modular REST routing" },
      { name: "REST APIs", icon: "api", note: "Design and consumption" },
      { name: "Microservices", icon: "microservices", note: "Client onboarding flows" },
      { name: "Python", icon: "python", note: "JobHunt AI" },
    ],
  },
  {
    id: "data",
    label: "Data",
    blurb: "Schemas and queries shaped around how data is read.",
    items: [
      { name: "MongoDB", icon: "mongodb", note: "Schema and query structure" },
      { name: "MySQL", icon: "mysql", note: "Indexed reporting queries" },
      { name: "SQLite", icon: "sqlite", note: "Via SQLAlchemy" },
      { name: "SQL", icon: "sql", note: "Query optimisation, schema design" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    blurb: "Ranking and drafting, measured against labelled data.",
    items: [
      { name: "scikit-learn", icon: "sklearn", note: "TF-IDF matching" },
      { name: "Sentence-Transformers", icon: "embeddings", note: "MiniLM embeddings" },
      { name: "Ollama", icon: "ollama", note: "Local LLM drafting" },
      { name: "Gemini", icon: "gemini", note: "Fallback model" },
      { name: "Streamlit", icon: "streamlit", note: "JobHunt AI dashboard" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "What the work runs through day to day.",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "GitHub Actions", icon: "actions", note: "CI pipelines" },
      { name: "Docker", icon: "docker" },
      { name: "Linux", icon: "linux" },
      { name: "Postman", icon: "postman" },
      { name: "Vercel", icon: "vercel" },
      { name: "VS Code", icon: "vscode" },
      { name: "IntelliJ", icon: "intellij" },
    ],
  },
  {
    id: "practices",
    label: "Practices",
    blurb: "Habits that keep shipped code dependable.",
    items: [
      { name: "RBAC", icon: "rbac", note: "6-role access control" },
      { name: "JWT", icon: "jwt", note: "Authenticated REST flows" },
      { name: "Input validation", icon: "validation", note: "Onboarding flows" },
      { name: "Unit testing", icon: "pytest", note: "pytest" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Code reviews", icon: "review" },
      { name: "Debugging", icon: "debug" },
    ],
  },
];

// Short list for the scrolling stack band under the hero.
export const stackBand = [
  { name: "React", icon: "react" },
  { name: "Java", icon: "java" },
  { name: "Spring Boot", icon: "springboot" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Node.js", icon: "node" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "MySQL", icon: "mysql" },
  { name: "Python", icon: "python" },
  { name: "Docker", icon: "docker" },
  { name: "Git", icon: "git" },
  { name: "Postman", icon: "postman" },
];

export const experience = [
  {
    company: "Cars24",
    role: "Java + React Full-Stack Developer Intern",
    period: "Oct 2025 – Apr 2026",
    place: "Gurugram, India",
    summary:
      "Owned Prism, a B2B microservice portal for Cars24's enterprise data services, from zero to full delivery. 49+ B2B clients were onboarded by the end of the internship.",
    points: [
      "Built backend services in Java (Spring Boot) implementing 6-role RBAC, wallet transaction logic and RESTful HTTP API endpoints, applying OOP and structured exception handling.",
      "Shipped React frontend modules (analytics dashboard, wallet management UI and a batch request processing screen) consuming REST APIs and rendering real-time status feedback for client operations.",
      "Hardened input validation and exception handling in client onboarding flows within a microservices architecture, cutting error-related client support queries during onboarding.",
    ],
    stack: ["Java", "Spring Boot", "React", "REST APIs", "Microservices", "RBAC"],
    caseStudy: "prism",
  },
  {
    company: "STAIRS",
    companyNote: "Startup",
    role: "Frontend Engineer Intern",
    period: "Oct 2024 – Dec 2024",
    place: "Remote",
    summary:
      "Built the React + Tailwind CSS screens of a career placement platform: training modules and multi-step assessments.",
    points: [
      "Engineered React + Tailwind CSS screens covering training modules and multi-step assessment workflows, integrated with JWT-authenticated REST APIs.",
      "Eliminated layout-related QA failures across Chrome, Firefox, Safari and Edge on mobile and desktop by auditing and rewriting cross-device CSS.",
    ],
    stack: ["React", "Tailwind CSS", "JWT", "REST APIs"],
  },
];

export const featured = [
  {
    slug: "prism",
    title: "Prism",
    kicker: "Cars24 · Internship project",
    period: "Oct 2025 – Apr 2026",
    visual: "prism",
    blurb:
      "A B2B microservice portal for Cars24's enterprise data services. I owned it from zero to full delivery; 49+ B2B clients were onboarded by the end of my internship.",
    stack: ["Java", "Spring Boot", "React", "REST APIs", "Microservices"],
    stat: { value: "49+", label: "B2B clients onboarded" },
    links: [],
    privateNote: "Internal Cars24 product. The code is not public.",
    caseStudy: {
      overview:
        "Prism is a B2B portal through which Cars24's enterprise clients use its data services. I built it during my internship, owning it from the first commit to full delivery.",
      role: "Full-stack developer intern. I owned the portal end to end: Spring Boot services on the backend and React modules on the frontend.",
      sections: [
        {
          heading: "Access control with six roles",
          body: "The backend implements role-based access control across six roles: super admin, support admin, finance admin, client admin, account admin and account user. The access rules live in the Spring Boot services.",
        },
        {
          heading: "Wallets and transactions",
          body: "I wrote the wallet transaction logic and the RESTful HTTP endpoints around it, applying OOP and structured exception handling.",
        },
        {
          heading: "Frontend modules",
          body: "On the React side I shipped an analytics dashboard, a wallet management UI and a batch request processing screen. They consume the REST APIs and render real-time status feedback while client operations run.",
        },
        {
          heading: "Safer onboarding",
          body: "Client onboarding sits within a microservices architecture. I hardened input validation and exception handling in those flows, which cut error-related support queries from clients during onboarding.",
        },
      ],
      outcomes: [
        "Delivered from zero to full release within the internship.",
        "49+ B2B clients onboarded by the end of the internship.",
        "Fewer error-related support queries during client onboarding.",
      ],
    },
  },
  {
    slug: "jobhunt-ai",
    title: "JobHunt AI",
    kicker: "Personal project · Python",
    visual: "jobhunt",
    blurb:
      "A local-first job assistant: it pulls listings from 7 free job APIs, parses a resume, ranks jobs with a hybrid ATS + semantic score and drafts cover letters with a local LLM.",
    stack: ["Python", "Streamlit", "SQLAlchemy", "scikit-learn", "Sentence-Transformers", "Ollama"],
    stat: { value: "0.85", label: "nDCG@10, up from 0.07" },
    links: [{ label: "GitHub", href: "https://github.com/TapasyaPateriya04/jobhunt-ai", kind: "github" }],
    caseStudy: {
      overview:
        "JobHunt AI runs entirely on a laptop at no monthly cost. It collects job listings, parses a resume, scores how well the two match, and drafts cover letters and resume edits with a free LLM.",
      role: "Solo project: design, implementation, evaluation and tests.",
      sections: [
        {
          heading: "Sources",
          body: "Listings come only from free, official APIs: RemoteOK, HN Who's Hiring, The Muse, Arbeitnow, Himalayas, and Greenhouse and Lever company boards. Everything is stored in SQLite through SQLAlchemy.",
        },
        {
          heading: "Ranking",
          body: "Each job gets a hybrid score: 0.35 ATS keyword match + 0.30 experience + 0.25 semantic similarity + 0.10 freshness. Semantic similarity uses MiniLM sentence embeddings, with TF-IDF from scikit-learn as a fallback.",
        },
        {
          heading: "Tuning against labelled data",
          body: "I hand-labelled 52 postings and tuned the match weights against them. Precision@5 went from 0.00 to 0.60 and nDCG@10 from 0.07 to 0.85.",
        },
        {
          heading: "Drafting, safely",
          body: "Cover letters and resume suggestions come from a local model through Ollama, with Gemini's free tier as a fallback. Prompt-injection guards and a URL allowlist keep scraped job text from steering the model or pulling in arbitrary pages.",
        },
        {
          heading: "Tests",
          body: "215 pytest tests run in CI. The UI is a Streamlit dashboard on localhost.",
        },
      ],
      metrics: [
        { label: "precision@5", from: "0.00", to: "0.60" },
        { label: "nDCG@10", from: "0.07", to: "0.85" },
        { label: "pytest tests in CI", to: "215" },
        { label: "free job APIs", to: "7" },
      ],
    },
  },
  {
    slug: "employee-management-system",
    title: "Employee Management System",
    kicker: "Personal project · Full stack",
    visual: "ems",
    blurb:
      "A full-stack employee records system built on Java OOP, with 6-role RBAC, JWT authentication and full CRUD.",
    stack: ["Java", "Spring Boot", "React", "Node.js", "MongoDB", "MySQL"],
    stat: { value: "6", label: "roles under RBAC" },
    links: [
      { label: "GitHub", href: "https://github.com/TapasyaPateriya04/EMS", kind: "github" },
      { label: "Live demo", href: "https://ems-roan-eta.vercel.app/", kind: "live" },
    ],
    caseStudy: {
      overview:
        "An employee records system covering the full create, read, update and delete cycle, with access split across six roles.",
      role: "Solo project.",
      sections: [
        {
          heading: "Modelling with Java OOP",
          body: "Employee records are modelled with Java OOP: encapsulation, inheritance and interfaces.",
        },
        {
          heading: "Auth and access",
          body: "JWT authentication identifies the user; 6-role RBAC decides what each of them can read or change.",
        },
        {
          heading: "Data",
          body: "I optimised the MongoDB schema and query structure for efficient reads, and wrote indexed MySQL queries for manager-facing reporting.",
        },
      ],
      outcomes: [],
    },
  },
];

export const moreProjects = [
  {
    title: "Mini URL Shortener API",
    stack: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],
    text: "REST API with URL validation, custom short codes, configurable expiry, per-link hit tracking and automated cleanup of expired links. Modular routing, input sanitisation and edge-case unit tests.",
    links: [{ label: "GitHub", href: "https://github.com/TapasyaPateriya04/URL-Shortener", kind: "github" }],
  },
  {
    title: "Learning Support Directory",
    stack: ["React", "Tailwind CSS"],
    text: "Searchable directory of 100+ providers with a grid/list toggle, light and dark themes and instant client-side filtering. Semantic HTML, keyboard navigation and WCAG AA contrast.",
    links: [
      { label: "GitHub", href: "https://github.com/TapasyaPateriya04/Learning-Support-Directory", kind: "github" },
      { label: "Live demo", href: "https://learning-support-directory-three.vercel.app/", kind: "live" },
    ],
  },
  {
    title: "Hive-Minds",
    note: "Team project",
    stack: ["React", "Node.js", "Express.js", "OpenCV", "TensorFlow"],
    text: "A MERN social media platform built with a team, with OpenCV and TensorFlow for image processing and ML tasks.",
    links: [
      { label: "GitHub", href: "https://github.com/viditpandey06/HiveMind", kind: "github" },
      // free Render instance: the first request can take ~40s to wake up
      { label: "Live demo (slow to wake)", href: "https://hivesocialmedia.onrender.com/", kind: "live" },
    ],
  },
];
