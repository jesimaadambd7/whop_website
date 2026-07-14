import { siteConfig } from "@/lib/data/site";

export type CareerRole = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  commitment: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  employmentType: "CONTRACTOR" | "PART_TIME" | "FULL_TIME";
  occupationalCategory: string;
};

export const careerStats = [
  { value: "7", label: "Production roles open" },
  { value: "Remote", label: "Global production network" },
  { value: "9:16", label: "Social-first creative format" },
];

export const careerValues = [
  {
    number: "01",
    title: "Performance taste",
    description:
      "We care about ads that sell, not only edits that look nice. Every role should understand hooks, proof, pacing, clarity, and conversion.",
  },
  {
    number: "02",
    title: "Production ownership",
    description:
      "UGCViss needs people who can own their part of the workflow, communicate early, organize files, and protect quality under deadlines.",
  },
  {
    number: "03",
    title: "Remote reliability",
    description:
      "Our network works across countries and time zones, so clear updates, clean handoffs, and deadline discipline matter a lot.",
  },
];

export const careerRoles: CareerRole[] = [
  {
    id: "performance-video-editor",
    title: "Performance Video Editor",
    department: "Post-production",
    location: "Remote",
    type: "Project-based / Full-time potential",
    commitment: "Flexible, fast-turnaround campaigns",
    description:
      "Edit UGC ads, product demos, paid social cutdowns, and short-form videos with strong hook pacing, captions, retention, and platform-ready exports.",
    responsibilities: [
      "Edit 9:16 ads for Meta, TikTok, Reels, and Shorts from raw creator, model, or product footage.",
      "Build multiple hook, intro, caption, CTA, and offer variations from one creative direction.",
      "Use rhythm, captions, sound design, product callouts, and clean structure to make ads easier to watch and buy from.",
      "Organize project files clearly and deliver exports that match UGCViss's quality standards.",
    ],
    requirements: [
      "Strong portfolio of short-form ads, UGC edits, ecommerce videos, or social content.",
      "Comfortable with Adobe Premiere Pro, DaVinci Resolve, CapCut, Final Cut, or similar tools.",
      "Understands retention, hooks, captions, mobile-first pacing, and performance creative basics.",
      "Can follow creative briefs, communicate clearly, and meet realistic deadlines.",
    ],
    niceToHave: [
      "Experience editing ecommerce or DTC ads.",
      "Basic motion graphics, color, audio cleanup, or thumbnail sense.",
      "Comfort with frame.io, Google Drive, Notion, Slack, or remote production workflows.",
    ],
    employmentType: "CONTRACTOR",
    occupationalCategory: "Post-production",
  },
  {
    id: "motion-graphics-designer",
    title: "Motion Graphics Designer",
    department: "Design and animation",
    location: "Remote",
    type: "Project-based / Retainer potential",
    commitment: "Campaign batches and launch assets",
    description:
      "Create animated product callouts, kinetic captions, visual explainers, end cards, and motion systems that make performance ads feel premium.",
    responsibilities: [
      "Design motion overlays, product labels, kinetic typography, comparison frames, and CTA cards.",
      "Turn static brand assets into polished motion moments for social ads and ecommerce campaigns.",
      "Create reusable visual systems that can scale across multiple ad variations.",
      "Collaborate with editors and strategists to make motion support the sales message.",
    ],
    requirements: [
      "Strong motion portfolio with social ads, product explainers, or clean brand animation.",
      "Comfortable with After Effects, Premiere Pro, or equivalent motion tools.",
      "Good eye for typography, spacing, hierarchy, and premium ecommerce design.",
      "Can work from brand guidelines and make fast but polished production decisions.",
    ],
    niceToHave: [
      "Experience with beauty, apparel, beverage, health, or ecommerce brands.",
      "Knowledge of Lottie, 3D product mockups, or AI-assisted design workflows.",
      "Ability to create clean templates for recurring campaign work.",
    ],
    employmentType: "CONTRACTOR",
    occupationalCategory: "Design and animation",
  },
  {
    id: "creative-strategist",
    title: "UGC Creative Strategist",
    department: "Creative strategy",
    location: "Remote",
    type: "Part-time / Full-time potential",
    commitment: "Weekly creative planning and reviews",
    description:
      "Develop hooks, scripts, briefs, ad angles, testing plans, and creator directions for ecommerce brands that need sales-focused creative.",
    responsibilities: [
      "Research products, customers, competitors, reviews, and ad patterns to find strong creative angles.",
      "Write UGC scripts, model shoot prompts, creator briefs, hook banks, and testing notes.",
      "Turn brand goals into clear production directions for editors, creators, actors, and media buyers.",
      "Review creative output and suggest improvements based on clarity, proof, pacing, and ad intent.",
    ],
    requirements: [
      "Understands UGC ads, paid social creative, ecommerce offers, buyer objections, and hook structures.",
      "Strong writing ability for scripts, briefs, captions, and client-facing creative notes.",
      "Can think commercially, not just aesthetically.",
      "Comfortable working remotely with fast-moving production teams.",
    ],
    niceToHave: [
      "Experience with Meta, TikTok, or YouTube ad creative testing.",
      "Experience using AI tools for research, scripts, angle generation, or brief preparation.",
      "Background in DTC, ecommerce, agency, copywriting, or creator production.",
    ],
    employmentType: "PART_TIME",
    occupationalCategory: "Creative strategy",
  },
  {
    id: "shoot-producer",
    title: "Shoot Producer / Production Coordinator",
    department: "Production",
    location: "Remote coordination / Local shoots",
    type: "Project-based",
    commitment: "Shoot planning, scheduling, and production support",
    description:
      "Coordinate model shoots, product footage, creator production, shot lists, schedules, props, logistics, and delivery for campaign-ready content.",
    responsibilities: [
      "Plan shoot requirements from a creative brief, including talent, product, props, location, and shot list.",
      "Coordinate schedules, files, call sheets, shipping notes, and production communication.",
      "Keep the production moving from brief to footage delivery without losing creative details.",
      "Support remote and local shoots with clear documentation and follow-up.",
    ],
    requirements: [
      "Experience coordinating shoots, creators, models, production teams, or campaign assets.",
      "Strong organization, communication, and deadline management.",
      "Understands what editors need from raw footage to build strong ads.",
      "Can manage moving parts calmly and keep teams aligned.",
    ],
    niceToHave: [
      "Experience with ecommerce product shoots or UGC production.",
      "Access to local studios, creators, actors, models, or production crew.",
      "Comfort with Notion, Google Sheets, Drive, Slack, and remote workflows.",
    ],
    employmentType: "CONTRACTOR",
    occupationalCategory: "Production",
  },
  {
    id: "camera-operator-videographer",
    title: "Camera Operator / Videographer",
    department: "Production",
    location: "Remote network / Local shoots",
    type: "Project-based",
    commitment: "Product, model, lifestyle, and social ad shoots",
    description:
      "Capture clean product, model, lifestyle, testimonial, and creator-style footage that editors can turn into premium 9:16 ad assets.",
    responsibilities: [
      "Shoot vertical product demos, model lifestyle footage, hands-in-frame clips, testimonials, and social-first scenes.",
      "Follow shot lists while also capturing useful extra angles, closeups, and transition moments.",
      "Handle lighting, audio, framing, and basic production setup for clean raw footage.",
      "Deliver organized footage with clear naming and usable takes.",
    ],
    requirements: [
      "Portfolio with product, lifestyle, social, commercial, creator, or ecommerce footage.",
      "Strong understanding of lighting, framing, focus, audio, and vertical composition.",
      "Can work with models, actors, creators, or founders on camera.",
      "Able to deliver footage quickly and communicate shoot constraints clearly.",
    ],
    niceToHave: [
      "Access to camera, lighting, audio, backdrop, or studio setup.",
      "Experience shooting beauty, apparel, beverage, wellness, or consumer products.",
      "Ability to direct simple performance, product demos, or testimonial delivery.",
    ],
    employmentType: "CONTRACTOR",
    occupationalCategory: "Production",
  },
  {
    id: "casting-talent-manager",
    title: "Casting & Creator Partnerships Manager",
    department: "Talent network",
    location: "Remote",
    type: "Part-time / Project-based",
    commitment: "Creator, actor, influencer, and celebrity coordination",
    description:
      "Source, shortlist, brief, and coordinate models, actors, UGC creators, influencers, and celebrity talent for brand campaigns.",
    responsibilities: [
      "Find and organize suitable talent for UGC ads, actor-led videos, product demos, and influencer campaigns.",
      "Manage outreach, shortlists, availability, rates, deliverables, and communication.",
      "Help collect talent videos, social links, usage terms, and campaign fit notes.",
      "Coordinate with strategists and producers so talent matches the creative angle.",
    ],
    requirements: [
      "Experience with creator sourcing, influencer outreach, casting, recruiting, or partnerships.",
      "Strong communication and follow-up skills.",
      "Understands basic usage rights, deliverables, briefs, and creator expectations.",
      "Can build organized talent lists and move quickly when campaign needs change.",
    ],
    niceToHave: [
      "Existing creator, actor, model, influencer, or celebrity contacts.",
      "Experience with ecommerce, DTC, social ads, or agency production.",
      "Comfort negotiating project-based rates and campaign deliverables.",
    ],
    employmentType: "PART_TIME",
    occupationalCategory: "Talent network",
  },
  {
    id: "paid-social-ads-specialist",
    title: "Paid Social Ads Specialist",
    department: "Performance marketing",
    location: "Remote",
    type: "Project-based / Retainer potential",
    commitment: "Launch, testing, optimization, and reporting",
    description:
      "Help launch and optimize paid social campaigns using UGCViss's creative assets, with a clear focus on testing, learning, and sales outcomes.",
    responsibilities: [
      "Set up or support Meta, TikTok, or paid social campaign launches for ecommerce brands.",
      "Track creative performance, identify winning angles, and share clear optimization notes.",
      "Work with strategists and editors to turn ad data into the next creative batch.",
      "Help structure tests around hooks, audiences, offers, placements, and funnel stages.",
    ],
    requirements: [
      "Hands-on experience with paid social campaigns for ecommerce, DTC, or product-led brands.",
      "Can read performance data and explain what creative changes are needed next.",
      "Understands CPA, ROAS, CTR, CVR, AOV, creative fatigue, and testing structure.",
      "Clear communicator who can work with creative and client-facing teams.",
    ],
    niceToHave: [
      "Experience with Meta Ads, TikTok Ads, Shopify, GA4, Triple Whale, or similar tools.",
      "Ability to write creative testing plans and performance summaries.",
      "Comfort working alongside production teams, not only media buying teams.",
    ],
    employmentType: "CONTRACTOR",
    occupationalCategory: "Performance marketing",
  },
];

export const hiringProcess = [
  {
    step: "01",
    title: "Apply with proof",
    description:
      "Submit the role, portfolio, reel, work examples, tools, availability, and expected rate or work preference.",
  },
  {
    step: "02",
    title: "Portfolio review",
    description:
      "We review your work for quality, speed, role fit, production taste, ad thinking, and communication clarity.",
  },
  {
    step: "03",
    title: "Test or interview",
    description:
      "For shortlisted applicants, we may request a small paid test, interview, or practical workflow review.",
  },
  {
    step: "04",
    title: "Start with a sprint",
    description:
      "Strong fits usually start with a project sprint before moving into retainer or longer-term collaboration.",
  },
];

export const productionStandards = [
  "Social-first 9:16 thinking for Meta, TikTok, Reels, Shorts, and mobile landing pages.",
  "Clean file organization, naming, feedback handling, version control, and export discipline.",
  "Comfort with fast creative iteration, hook testing, product proof, and campaign learning loops.",
  "Ability to work with editors, strategists, producers, creators, actors, models, influencers, and paid ads teams.",
  "A portfolio that shows real output, not only potential.",
];

export const applicationChecklist = [
  "Portfolio or reel link with your strongest relevant work.",
  "Your exact role in the projects you share.",
  "Tools, workflow, availability, timezone, and expected rate.",
  "One short intro explaining why UGCViss should work with you.",
];

export const experienceLevels = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "5+ years",
  "Senior / lead level",
];

export const workPreferences = [
  "Project-based",
  "Part-time remote",
  "Full-time remote",
  "Retainer",
  "Open to discuss",
];

export function getRoleById(roleId: string) {
  return careerRoles.find((role) => role.id === roleId);
}

export function buildJobPostingSchema(role: CareerRole) {
  const description = [
    role.description,
    `Responsibilities: ${role.responsibilities.join(" ")}`,
    `Requirements: ${role.requirements.join(" ")}`,
    `Nice to have: ${role.niceToHave.join(" ")}`,
  ].join(" ");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description,
    datePosted: "2026-06-16",
    employmentType: role.employmentType,
    hiringOrganization: {
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Worldwide",
    },
    industry: "Advertising and video production",
    occupationalCategory: role.occupationalCategory,
    directApply: true,
    url: `${siteConfig.url}/careers?role=${role.id}#apply`,
  };
}
