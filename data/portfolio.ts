// ╔══════════════════════════════════════════════════════════╗
// ║        ALL PORTFOLIO CONTENT LIVES HERE                  ║
// ║  Edit this file to update every section of your site.   ║
// ╚══════════════════════════════════════════════════════════╝

// ─── Type Definitions ────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  gradient: string; // Tailwind gradient classes for the card image area
  image?: string;   // Optional logo/screenshot — shown instead of initials
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string; // emoji icon
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: "work" | "education";
  bullets: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Social {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

// ─── Personal Info ────────────────────────────────────────────────────────────

export const personal = {
  // 👉 REPLACE WITH YOUR NAME
  name: "Ugochukwuzitere Mbama",
  heroLine1: "Ugochukwuzitere",     // First line of hero heading
  heroLine2: "Mbama.",              // Second line — displayed in accent color
  shortName: "Zitere",             // Used in navbar logo

  // 👉 REPLACE WITH YOUR TAGLINE
  tagline: "Building full-stack web apps & AI-powered products.",
  availability: "Available for new projects",

  // 👉 REPLACE WITH YOUR BIO
  bio: "I'm a self-driven software engineer with a strong focus on frontend development and AI integration. I build fast, beautiful web applications with React, Next.js, and TypeScript, then push them further by integrating AI capabilities through advanced prompt engineering. I'm currently expanding into backend engineering, working with Node.js and PostgreSQL to grow into a well-rounded full-stack developer. Every project I take on gets clean code, thoughtful design, and a great user experience.",

  // 👉 REPLACE WITH YOUR DETAILS
  location: "Owerri, Imo State, Nigeria",
  education: "B.Eng Computer Engineering — FUTO, 2024–2029",

  // 👉 REPLACE WITH YOUR CONTACT INFO
  email: "charlesjosephmbama@gmail.com",
  phone: "+234 810 643 4570",
  cv: "/api/cv",

  // 👉 REPLACE WITH YOUR SOCIAL LINKS
  github: "https://github.com/De-Santa7",
  linkedin: "https://www.linkedin.com/in/ugochukwuzitere-mbama-3a2929338/",
  twitter: "https://twitter.com", // 👉 REPLACE WITH YOUR TWITTER / X HANDLE
};

// ─── Hero Stats ───────────────────────────────────────────────────────────────

// 👉 UPDATE YOUR STATS
export const stats: Stat[] = [
  { value: "2+",  label: "Years Building" },
  { value: "10+", label: "Projects Shipped" },
  { value: "12+", label: "Technologies" },
  { value: "∞",   label: "Problems Solved" },
];

// ─── Social Links ─────────────────────────────────────────────────────────────

export const socials: Social[] = [
  { label: "GitHub",   href: personal.github,   icon: "github" },
  { label: "LinkedIn", href: personal.linkedin, icon: "linkedin" },
  { label: "Email",    href: `mailto:${personal.email}`, icon: "mail" },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

// 👉 ADD YOUR SKILLS HERE — group them by category
export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React",       icon: "⚛️" },
      { name: "Next.js",     icon: "▲"  },
      { name: "TypeScript",  icon: "𝗧"  },
      { name: "JavaScript",  icon: "𝗝𝗦" },
      { name: "Tailwind CSS",icon: "🌊" },
      { name: "HTML & CSS",  icon: "🎨" },
      { name: "Framer Motion",icon: "🎞️"},
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js",     icon: "⬡"  },
      { name: "Express",     icon: "🚂" },
      { name: "PostgreSQL",  icon: "🐘" },
      { name: "Prisma",      icon: "◈"  },
      { name: "REST APIs",   icon: "🔌" },
      { name: "JWT & Auth",  icon: "🔑" },
    ],
  },
  {
    category: "AI & Tools",
    skills: [
      { name: "Prompt Eng.", icon: "🤖" },
      { name: "Python",      icon: "🐍" },
      { name: "Git & GitHub",icon: "⑂"  },
      { name: "VS Code",     icon: "💻" },
      { name: "Linux",       icon: "🐧" },
      { name: "Figma",       icon: "🎯" },
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

// 👉 ADD YOUR PROJECTS HERE
export const projects: Project[] = [
  {
    id: "auth-api",
    title: "FullStack Auth API",
    description:
      "Production-ready authentication system with JWT access/refresh tokens, role-based access control, email verification, and password reset flows.",
    tags: ["Node.js", "Express", "PostgreSQL", "Prisma", "JWT"],
    github: "https://github.com/charlesmbama",
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent",
  },
  {
    id: "ai-assistant",
    title: "AI Chat Assistant",
    description:
      "Full-stack conversational AI app with streaming responses, conversation history, and context management — built with Claude API integration.",
    tags: ["Next.js", "TypeScript", "Claude API", "Prisma", "PostgreSQL"],
    github: "https://github.com/charlesmbama",
    gradient: "from-violet-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "interview-iq",
    title: "InterviewIQ",
    description:
      "AI-powered interview coach — practice with real questions, voice answers, and role-specific practical challenges. Get a full hiring verdict powered by Groq AI.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Groq AI"],
    github: "https://github.com/De-Santa7/interview-coach",
    demo: "https://interview-coach-3h2g.vercel.app",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    image: "/interviewiq-logo.png",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description:
      "Scalable online store with product catalog, cart management, Stripe payment integration, and an admin dashboard for inventory.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma"],
    github: "https://github.com/charlesmbama",
    demo: "#",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "portfolio-cms",
    title: "Portfolio CMS",
    description:
      "Headless CMS and portfolio site builder — authors manage content through a rich dashboard while visitors get a blazing-fast SSG frontend.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "React", "TypeScript"],
    github: "https://github.com/charlesmbama",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description:
      "Real-time weather application with location search, 7-day forecasts, interactive charts, and geolocation — consuming multiple REST APIs.",
    tags: ["React", "TypeScript", "REST API", "Chart.js", "Tailwind"],
    github: "https://github.com/charlesmbama",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

// 👉 ADD YOUR WORK EXPERIENCE AND EDUCATION HERE
export const experiences: ExperienceItem[] = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    period: "July 2023 — Present",
    type: "work",
    bullets: [
      "Built and shipped 10+ full-stack web applications for clients across various industries using React, Next.js, Node.js, and PostgreSQL.",
      "Integrated AI capabilities into client products through advanced prompt engineering and LLM API connections, reducing manual workflows by ~60%.",
      "Architected scalable REST APIs with JWT authentication, RBAC, and production-grade error handling for 3 client SaaS projects.",
    ],
  },
  {
    role: "B.Eng Computer Engineering",
    company: "Federal University of Technology, Owerri (FUTO)",
    period: "2024 — 2029",
    type: "education",
    bullets: [
      "Studying Computer Engineering with a focus on software systems, algorithms, and computer architecture.",
      "Actively applying academic knowledge to real-world freelance projects in parallel with coursework.",
    ],
  },
];
