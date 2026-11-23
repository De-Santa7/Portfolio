// ALL PORTFOLIO CONTENT LIVES HERE.
// Components only render what is in this file.
//
// TODO convention: any value that is `null` with a `// TODO:` comment is a
// fact only you can supply. In `next dev` it shows as a dashed "TODO" chip so
// you can spot it; in production builds it is hidden, never faked.

// ─── Types ───────────────────────────────────────────────────────────────────

/** Key into lib/icons.ts (simple-icons). Tools without a logo fall back to a letter tile. */
export type IconKey = string;

export interface Tool {
  name: string;
  icon?: IconKey;
  /** Projects on this page that use the tool — shown on hover. */
  usedIn?: string[];
}

export interface ToolGroup {
  category: string;
  tools: Tool[];
}

export interface Stat {
  label: string;
  value: string | null; // null = TODO, hidden in production
}

export interface ProjectLink {
  label: string;
  href: string | null; // null = TODO
  kind: "live" | "repo" | "case-study";
}

export interface Decision {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Taped polaroid: drop public/<file>.png (or .jpg/.webp) in and it appears. */
  shot: { file: string; subtitle: string; caption: string };
  status: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: Tool[];
  stats: Stat[];
  links: ProjectLink[];
  caseStudy?: CaseStudy;
}

export interface CaseStudy {
  role: string;
  meta: { label: string; value: string }[];
  problem: string[];
  built: string[];
  decisions: Decision[];
}

export interface Principle {
  title: string;
  body: string;
}

// ─── Site ────────────────────────────────────────────────────────────────────

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-sage-phi-22.vercel.app",
  title: "Ugochukwuzitere Mbama — Full-stack developer & prompt engineer",
  description:
    "Full-stack developer and prompt engineer in Nigeria. I build complete products with Next.js, Django and React Native, use Claude Code daily, and built StudEx, a campus marketplace, on my own.",
};

// ─── Personal ────────────────────────────────────────────────────────────────

export const personal = {
  name: "Ugochukwuzitere Mbama",
  shortName: "Zitere",
  role: "Full-stack developer & prompt engineer",
  location: "Owerri, Nigeria",
  timezone: "WAT · UTC+1",
  availability: "Open to roles and freelance work",

  email: "charlesjosephmbama@gmail.com",
  cv: "/api/cv",
  cvFilename: "Ugochukwuzitere-Mbama-CV.pdf",

  github: "https://github.com/De-Santa7",
  linkedin: "https://www.linkedin.com/in/ugochukwuzitere-mbama-3a2929338/",
  /** wa.me needs the international number without "+" or the leading 0: 0815… → 234815… */
  whatsapp: "https://wa.me/2348158927490",

  /** e.g. "I reply within 48 hours." Leave empty to hide. */
  replyPromise: "", // TODO: add only if you'll keep the promise
};

export const hero = {
  // Rendered as: before + <accent>highlight</accent> + after
  headline: {
    before: "I build complete products, and the ",
    highlight: "automations",
    after: " that keep them running.",
  },
  sub: "Full-stack developer and prompt engineer. I use Claude Code every day to plan, write and test software. I built StudEx, a campus marketplace with payments, vendor payouts and a mobile app, on my own.",
};

// ─── About ───────────────────────────────────────────────────────────────────

export const about = {
  paragraphs: [
    "I started on the frontend with React, Next.js and TypeScript, then moved down the stack because I wanted to ship whole products, not just screens.",
    "StudEx is where that went. I designed, built and run it alone: the Django API and Postgres schema, the Paystack payment and payout flow, the Next.js web app and the Expo mobile app.",
    "I use Claude Code daily. It changed how fast I can move, not who is responsible for the code. I plan the work, read every diff, and test the paths that touch money myself.",
    "What I want to do more of: automation that takes real, repetitive work off people's plates, built with the same care as the product around it.",
  ],
  current: "Founder & full-stack developer, StudEx",
  motto: "The path to greatness begins with an inspiration.",
};

// ─── How I work ──────────────────────────────────────────────────────────────

export const principles: Principle[] = [
  {
    title: "Plan before I prompt.",
    body: "Before Claude Code touches a file I write down the goal, the constraints and what 'done' means. A clear plan is most of a good prompt.",
  },
  {
    title: "AI drafts, I review.",
    body: "A lot of my first drafts are AI-written. I still read every line before it ships, because I'm the one who gets the call when it breaks.",
  },
  {
    title: "Money paths live in code.",
    body: "Holding funds, paying vendors and retrying failed transfers are enforced and logged in code, not left to a prompt or to someone remembering.",
  },
  {
    title: "Automate the second time.",
    body: "If I do something by hand twice, it becomes a script or a scheduled job, like StudEx closing orders on its own after seven days.",
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "studex",
    title: "StudEx",
    shot: { file: "studex-screenshot", subtitle: "Campus marketplace · studex.com.ng", caption: "studex.com.ng · live" },
    status: "Live · Solo build",
    tagline: "A multi-vendor marketplace for Nigerian university students.",
    summary:
      "Students buy from verified on-campus vendors (food, laundry, beauty, photography and more) on the web or the mobile app. Payments are held until the order is done, then the vendor is paid out automatically.",
    highlights: [
      "Paystack checkout with funds held until the order completes",
      "Vendor payouts through the Paystack Transfer API, retried automatically if they fail",
      "Web app and Expo mobile app running on one Django REST API",
      "Registered business with the Corporate Affairs Commission (CAC)",
    ],
    stack: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Django", icon: "django" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Expo", icon: "expo" },
      { name: "Paystack" },
      { name: "Cloudinary", icon: "cloudinary" },
    ],
    stats: [
      { label: "Active vendors", value: "100+" },
      { label: "Listings", value: "320+" },
      { label: "Campuses", value: "3" },
    ],
    links: [
      { label: "Case study", href: "/work/studex", kind: "case-study" },
      { label: "studex.com.ng", href: "https://www.studex.com.ng", kind: "live" },
      { label: "Web + API repo", href: "https://github.com/studexng-svg/studexng", kind: "repo" },
      { label: "Mobile app repo", href: "https://github.com/studexng-svg/studex-app", kind: "repo" },
    ],
    caseStudy: {
      role: "Founder. Design, engineering and operations, solo.",
      meta: [
        { label: "Role", value: "Founder, solo developer" },
        { label: "Platforms", value: "Web, Android & iOS (Expo)" },
        { label: "Status", value: "Live, CAC-registered" },
      ],
      problem: [
        // TODO: check this matches how you'd describe the problem in your own words.
        "On campus, a lot of buying and selling between students and small vendors happens informally: a status update, a DM, a bank transfer, and hope.",
        "Buyers pay before they get anything, with no protection if the order never comes. Vendors have no proper storefront and no record of orders. Nobody in the middle makes sure both sides are treated fairly.",
      ],
      built: [
        "Storefronts and dashboards for vendors, a cart and checkout for students, and an admin panel to run the marketplace.",
        "Sign-up for students with an 11-digit matric number, to keep the marketplace to students.",
        "Payment, hold and payout flow on Paystack, with scheduled jobs that close orders and retry failed payouts.",
        "An Expo / React Native app with JWT auth, Zustand state, Paystack checkout and push notifications, on the same API as the web.",
      ],
      decisions: [
        {
          title: "Payouts: from split settlement to the Transfer API",
          body: "The first version used Paystack subaccounts with split settlement, which pays the vendor's share at checkout and settles it on Paystack's schedule. That doesn't fit a marketplace where the order still has to be delivered. I moved payouts to the Transfer API: the platform pays the vendor when the order completes, and the payout lands near-instantly. The trade-off is that failed transfers are now my problem, so they get retried automatically (see below).",
        },
        {
          title: "Escrow-style hold inside Paystack",
          body: "Buyer payments stay in the StudEx Paystack balance until the order is completed, then the vendor is paid. If an order goes wrong, the money hasn't left yet. When it goes right, vendors still get paid without anyone approving it by hand.",
        },
        {
          title: "Scheduled automations with APScheduler",
          body: "Two jobs run inside the Django backend. Open orders auto-complete after seven days, so vendors aren't left waiting on a buyer who forgot to confirm. Failed transfers are retried on a schedule instead of waiting for me to notice.",
        },
        {
          title: "One API, two clients",
          body: "The Expo app talks to the same Django REST Framework API as the Next.js site, with JWT auth. Business rules live in one place, so the web and mobile app can't drift apart. Push notifications go out through Firebase Cloud Messaging.",
        },
        {
          title: "Managed infrastructure, run by one person",
          body: "Vercel for the web app, Render for the API, Neon for Postgres, Cloudinary for images and Cloudflare for DNS. Every piece is managed, so my time goes into the product, not into running servers.",
        },
      ],
    },
  },
  {
    slug: "interviewiq",
    title: "InterviewIQ",
    shot: { file: "interviewiq-screenshot", subtitle: "AI interview coach", caption: "interviewiq · live demo" },
    status: "Live demo",
    tagline: "An AI interview coach.",
    summary:
      "Practise with role-specific interview questions, answer by voice, and get a written hiring verdict at the end, generated with Groq.",
    highlights: [],
    stack: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Supabase", icon: "supabase" },
      { name: "Groq" },
    ],
    stats: [],
    links: [
      { label: "Live demo", href: "https://interview-coach-3h2g.vercel.app", kind: "live" },
      { label: "Repo", href: null, kind: "repo" }, // TODO: repo is private (404). Make it public and paste the URL, or delete this line.
    ],
  },
];

// ─── Stack ───────────────────────────────────────────────────────────────────

export const toolGroups: ToolGroup[] = [
  {
    category: "Frontend",
    tools: [
      { name: "TypeScript", icon: "typescript", usedIn: ["StudEx", "InterviewIQ"] },
      { name: "React", icon: "react", usedIn: ["StudEx", "InterviewIQ"] },
      { name: "Next.js", icon: "nextdotjs", usedIn: ["StudEx", "InterviewIQ"] },
      { name: "Tailwind CSS", icon: "tailwindcss", usedIn: ["StudEx", "InterviewIQ"] },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    category: "Mobile",
    tools: [
      { name: "Expo", icon: "expo", usedIn: ["StudEx"] },
      { name: "React Native", icon: "react", usedIn: ["StudEx"] },
      { name: "Zustand", usedIn: ["StudEx"] },
    ],
  },
  {
    category: "Backend & data",
    tools: [
      { name: "Python", icon: "python", usedIn: ["StudEx"] },
      { name: "Django REST", icon: "django", usedIn: ["StudEx"] },
      { name: "PostgreSQL", icon: "postgresql", usedIn: ["StudEx"] },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Supabase", icon: "supabase", usedIn: ["InterviewIQ"] },
    ],
  },
  {
    category: "AI & automation",
    tools: [
      { name: "Claude Code", icon: "claude" },
      { name: "Groq", usedIn: ["InterviewIQ"] },
      { name: "APScheduler", usedIn: ["StudEx"] },
    ],
  },
  {
    category: "Payments & infra",
    tools: [
      { name: "Paystack", usedIn: ["StudEx"] },
      { name: "Vercel", icon: "vercel", usedIn: ["StudEx", "InterviewIQ"] },
      { name: "Render", icon: "render", usedIn: ["StudEx"] },
      { name: "Neon", icon: "neon", usedIn: ["StudEx"] },
      { name: "Cloudinary", icon: "cloudinary", usedIn: ["StudEx"] },
      { name: "Cloudflare", icon: "cloudflare", usedIn: ["StudEx"] },
      { name: "Firebase (FCM)", icon: "firebase", usedIn: ["StudEx"] },
      { name: "Git & GitHub", icon: "github" },
    ],
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contact = {
  reasons: ["Hiring for a role", "A product to build", "A workflow to automate", "Something else"],
  timelines: ["ASAP", "This month", "This quarter", "Just exploring"],
};

export const socials = [
  { label: "GitHub", href: personal.github },
  { label: "LinkedIn", href: personal.linkedin },
  { label: "WhatsApp", href: personal.whatsapp },
  { label: "Email", href: `mailto:${personal.email}` },
];
