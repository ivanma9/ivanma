import emotionImg from "./assets/emotion.jpg";
import curiocityImg from "./assets/curiocity.jpg";

const gh = (repo) => `https://github.com/ivanma9/${repo}`;

export const links = {
  email: "ivanma819@gmail.com",
  github: "https://github.com/ivanma9",
  linkedin: "https://www.linkedin.com/in/ivan-ma9/",
};

// id is the anchor the hero highlights link to
export const projects = [
  {
    id: "legacylens",
    name: "LegacyLens",
    tagline: "Ask questions of a million lines of NASA FORTRAN.",
    body: "Retrieval over NASTRAN-95, NASA's structural analysis code, written in FORTRAN 77. Ask in plain English and get the relevant subroutines explained, their call graphs and COMMON blocks mapped, and an impact analysis of what breaks if you change one.",
    stack: "Python, FastAPI, ChromaDB, Voyage code-3, GPT-4o-mini, Vue",
    code: gh("NASTRAN-search"),
  },
  {
    id: "freight",
    name: "Freight document portal",
    tagline: "Eleven fields out of a freight PDF, each one traceable.",
    body: "Drop in a bill of lading or a commercial invoice and get back the fields an ops team needs, each with a confidence score and a highlight on the page it came from. Claude reads the PDF directly, so scanned and digital documents take the same path. The review panel opens on what needs checking, not on everything.",
    stack: "Next.js, react-pdf, Claude API",
  },
  {
    id: "docqa",
    name: "Document Q&A API",
    tagline: "Batch answers from one document, each with its sources.",
    body: "Upload a PDF or JSON file, such as a SOC 2 security questionnaire, and ask a batch of questions. Every answer cites the passages it came from and carries a confidence, and a question the document can't answer comes back as not found instead of a guess. Two retrieval gates, the first a similarity floor tuned on a live eval set, keep it honest.",
    stack: "Python, FastAPI, LangChain, FAISS, OpenAI, 228 tests with a 90% coverage gate",
    code: gh("zania-qa"),
  },
  {
    id: "agentforge",
    name: "AgentForge",
    tagline: "Chat with your investment portfolio.",
    body: "A LangGraph agent for Ghostfolio with six tools: portfolio summary, transaction history, symbol lookup, performance, risk analysis and a paper-trading simulator with $100K of virtual cash. Answers come back as inline tables and charts beside a live allocation sidebar.",
    stack: "Python, LangGraph, Claude, FastAPI, React, LangSmith",
    code: gh("ghostfolio-agent"),
  },
  {
    id: "labels",
    name: "Alcohol label verifier",
    tagline: "OCR compliance checks for distilled-spirits labels.",
    body: "Reads a label image, compares it against the seven fields on the application, and returns a verdict per field plus a next step: accept, send to manual review, or ask for a better image. Deterministic by design and scored against a 28-label golden set.",
    stack: "Python, PaddleOCR, Docker",
    code: gh("TTB_reader"),
  },
  {
    id: "footprints",
    name: "Footprints in the Snow",
    tagline: "A game that teaches least common multiple to 4th and 5th graders.",
    body: "A rabbit and a fox hop along a snowy number trail, and the first spot with both footprints is the answer. Ten levels move from watching to predicting to placing prints yourself, with a three-step hint ladder and number pairs picked to catch the “just multiply them” mistake. Snowy the owl answers kids' questions with an LLM, and code checks every reply so it never gives the answer away; a 30-scenario eval tracks that.",
    stack: "TypeScript, Next.js, Groq, Motion",
    live: "https://footprints-in-the-snow.vercel.app",
    code: gh("footprints-in-the-snow"),
  },
];

// Compact list under the featured work
export const more = [
  {
    name: "Sim Studio Twilio block",
    body: "Merged a Twilio SMS block into Sim Studio, an open-source AI agent workflow builder with 30k GitHub stars, so agents can text people as part of a workflow.",
    stack: "TypeScript, Twilio, open source",
    links: [{ label: "Read the pull request", href: "https://github.com/simstudioai/sim/pull/201" }],
  },
  {
    name: "ChatBridge",
    body: "A secure AI integration platform for K-12 schools, piloted at one school. Middleware gates LLM access to approved apps and keeps each tenant's data separate.",
    stack: "TypeScript, Docker, Railway",
    links: [{ label: "Read the code", href: gh("ChatBridge") }],
  },
  {
    name: "CollabBoard",
    body: "A real-time collaborative whiteboard with an embedded Claude agent, WebSocket sync under 100ms in tests with 5 users, SSO and row-level security.",
    stack: "React, TypeScript, Konva.js, Supabase",
    links: [{ label: "Read the code", href: gh("collab_space") }],
  },
  {
    name: "Phostro",
    body: "Event photo sharing on Fly and Cloudflare R2. Workers scale to zero and pre-warm on upload, so guests see galleries in under a second while idle cost stays near zero.",
    stack: "Next.js, Postgres, Drizzle, Cloudflare R2, Fly",
    links: [{ label: "Read the code", href: gh("phostro") }],
  },
  {
    name: "Congressional trading datastore",
    body: "Scrapes U.S. House financial disclosure filings daily, parses the PDFs into trades since 2020, and serves them through a REST API and dashboard.",
    stack: "Python, FastAPI, SQLite, Poppler",
    links: [
      { label: "Read the code", href: gh("CongressionalTrading") },
      { label: "PyPI", href: "https://pypi.org/project/congressional-trading/" },
    ],
  },
];

export const earlier = [
  {
    name: "E-motion",
    body: "An illustrated, interactive story about a family adjusting to life in America, animated in the browser.",
    stack: "TypeScript, React, p5.js, Three.js",
    image: emotionImg,
    alt: "Illustrated scene: two parents talk at a table under a web of constellation lines while their daughter stands apart.",
  },
  {
    name: "Curiocity",
    body: "A map for finding places around UCLA and Westwood, filtered by budget, distance and how you're getting there.",
    stack: "JavaScript, Node.js, Express, MongoDB",
    image: curiocityImg,
    alt: "Three phone screens: filters for budget and distance, a map of Westwood with place pins, and a cafe detail page.",
    code: gh("curiocity"),
  },
];

// From the resume (Nov 2026). `note` is always shown; `points` open on click.
export const experience = [
  {
    when: "Feb – Apr 2026", place: "Austin, TX", role: "AI Engineer Fellow", org: "Gauntlet AI",
    note: "Built production AI systems across multi-agent engineering, secure LLM integration and real-time collaboration.",
    points: [
      "Led a performance and security sprint on Ship, a U.S. Treasury codebase: 93% lower API latency, 92% fewer runtime errors and zero accessibility violations.",
      "Designed Shipyard, a LangGraph coding system whose planner, worker and integrator agents are run by a deterministic Python coordinator, with prompt-injection defenses aligned to NIST AI RMF.",
      "Built ChatBridge, an AI integration platform piloted at a K-12 school, with middleware that gates LLM access to approved apps and isolates each tenant's data.",
      "Built CollabBoard, a real-time whiteboard with an embedded Claude agent and WebSocket sync under 100ms in tests with 5 users.",
    ],
  },
  {
    when: "Mar 2025 – Feb 2026", place: "Remote", role: "Software Engineer", org: "Intelizen",
    note: "Built AI revenue-leakage detection across a $50B healthcare portfolio, recovering 15% of outstanding revenue for 5+ hospital clients.",
    points: [
      "Architected a document pipeline on Amazon SQS and AWS CDK that processes 30+ concurrent uploads in parallel and ended timeout failures.",
      "Cut cloud costs 30% by auditing AWS resources with Datadog and adding lifecycle policies.",
      "Presented AI workflow automation to C-suite executives, VPs and hospital clients.",
    ],
  },
  {
    when: "Jul 2024 – Feb 2025", place: "Remote", role: "Builder", org: "Headstarter AI Accelerator",
    note: "Built and shipped AI side projects, including a Chrome extension and a browser-based AI code editor.",
    points: [
      "BadgerAI: a Chrome extension, built with a partner, that suggests AI workflows from browsing activity; users grew 20% a month.",
      "AI code editor: explains code, suggests changes and autocompletes in a browser IDE, across LLM providers through OpenRouter.",
    ],
  },
  {
    when: "Nov 2023 – Jun 2024", place: "Los Angeles", role: "Founder and CTO", org: "Step AI",
    note: "Launched an AI self-development companion for goal setting that grew to 3,000+ users at 15% a month.",
    points: [
      "Used retrieval over past conversations to personalize guidance; average activation rate of 30%.",
      "Cut context payload 40% with prompt engineering and caching, lifting retention 15%.",
    ],
  },
  {
    when: "Jun 2021 – Sep 2022", place: "Seattle", role: "Software Development Engineer Intern", org: "Amazon",
    note: "Two summers on the People Technology team, building internal tools for HR workflows and onboarding.",
    points: [
      "Built a REST API testing tool that cut onboarding support tickets 25% across 350+ users.",
      "Scaled throughput 5x and automated Java unit and integration tests in a multistage CI/CD pipeline.",
    ],
  },
  {
    when: "Mar – Jun 2021", place: "San Jose", role: "Software Engineer Intern", org: "Roku",
    note: "Maintained Airflow pipelines for 50M+ advertising data segments from 300+ sources.",
    points: [
      "Built Scala Spark ETLs on EMR that moved data from S3 into AWS Glue tables.",
      "Added third-party data to graph ingestion, reaching match rates up to 70%.",
    ],
  },
  {
    when: "May 2019 – May 2021", place: "Los Angeles", role: "Robotics Instructor", org: "Magikid Robotics Lab",
    note: "Taught robotics and programming to kids aged 6 to 14.",
  },
];

export const education = {
  when: "2020 – 2023", place: "Los Angeles", role: "B.S. Computer Science", org: "UCLA",
};

export const skills = [
  ["AI", "LangGraph, LangChain, AI agents, RAG, MCP, LLM evals, prompt engineering, Claude, OpenAI and OpenRouter APIs"],
  ["Product", "React, Next.js, Node.js, FastAPI, Django, Flask, WebSockets, Prisma, Drizzle"],
  ["Data and cloud", "AWS (EC2, S3, SQS, CDK, Glue, EMR), Docker, Spark, Airflow, Redis, PostgreSQL, Supabase, Datadog"],
  ["Languages", "Python, TypeScript, JavaScript, Go, Java, C/C++, Scala, SQL, Swift, Dart"],
  ["Certification", "AWS Certified Cloud Practitioner"],
];
