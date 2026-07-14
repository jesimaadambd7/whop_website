export type VaultResource = {
  slug: string;
  title: string;
  categoryLabel: string;
  formatLabel: string;
  schemaCategory: string;
  description: string;
  heroDescription: string;
  helpfulFor: string;
  whyPurchase: string;
  socialPostAngle: string;
  audiences: string[];
  benefits: string[];
  whatYouGet: string[];
  preview: string;
  price: string;
  priceAmount: number;
  thumbnail: string;
  thumbnailAlt: string;
};

export type FeaturedGuide = {
  id: string;
  category: string;
  number: string;
  title: string;
  description: string;
};

export type IntentPage = {
  href: string;
  eyebrow: string;
  title: string;
};

export const vaultResources: VaultResource[] = [
  {
    slug: "100-ai-ugc-prompt-vault",
    title: "100+ AI UGC Prompt Vault",
    categoryLabel: "AI UGC",
    formatLabel: "Prompt pack",
    schemaCategory: "AI UGC",
    description:
      "A practical prompt vault for turning raw product details into creator-style scripts, UGC hooks, founder reads, testimonial angles, product demos, and paid social variations. Built for people who need faster ad ideas without sounding generic.",
    heroDescription:
      "A practical prompt vault for turning messy product notes, reviews, and offer details into UGC scripts, creator briefs, AI video prompts, hook variations, and paid social angles you can actually test.",
    helpfulFor:
      "Helps teams generate sharper hooks, briefs, and AI-assisted UGC scripts faster, especially when they need more creative angles for paid social testing.",
    whyPurchase:
      "Buy this if your team keeps staring at a blank doc before every ad sprint. It gives you reusable prompt structures that help you create stronger hooks, clearer scripts, and more testable creative angles without waiting on inspiration.",
    socialPostAngle:
      "Stop asking AI for generic UGC scripts. Use a prompt vault built around real performance-ad structure: hook, pain, product proof, demo, and CTA.",
    audiences: ["Editors", "Creative strategists", "AI video creators", "UGC producers"],
    benefits: [
      "Create more UGC ad angles from the same product research.",
      "Write hooks, scripts, creator briefs, and CTA variations faster.",
      "Keep AI output grounded in real buyer language and product proof.",
      "Reduce generic AI copy by using structured prompt frameworks.",
    ],
    whatYouGet: [
      "100+ AI UGC prompt starters and rewrite prompts.",
      "Hook, demo, testimonial, objection, and comparison prompt categories.",
      "Creator brief prompts for 9:16 ad production.",
      "Workflow notes for using product proof safely.",
    ],
    preview:
      "Preview: includes hook prompts, product-demo prompt structures, creator persona prompts, objection-led prompts, testimonial rewrite prompts, and end-card CTA prompts.",
    price: "$49",
    priceAmount: 49,
    thumbnail: "/assets/thumbnails/resources/100-ai-ugc-prompt-vault.svg",
    thumbnailAlt: "100+ AI UGC Prompt Vault thumbnail",
  },
  {
    slug: "ai-product-video-workflow-sop",
    title: "AI Product Video Workflow SOP",
    categoryLabel: "AI Production",
    formatLabel: "SOP + checklist",
    schemaCategory: "AI Production",
    description:
      "A step-by-step SOP for using AI across product research, script direction, storyboards, shot planning, edit structure, motion callouts, and QA without losing human creative judgment.",
    heroDescription:
      "A production SOP for using AI across research, scripting, storyboards, shot planning, editing direction, and QA while keeping the final creative human-led and performance-focused.",
    helpfulFor:
      "Helps creative teams turn AI from random prompt experiments into a repeatable production workflow for product videos and paid ads.",
    whyPurchase:
      "Buy this if AI feels powerful but messy inside your workflow. The SOP helps editors, operators, and strategists move from random prompt experiments to a repeatable product video system.",
    socialPostAngle:
      "AI is not the strategy. This SOP shows how to use AI as the production engine behind stronger product videos.",
    audiences: ["Editors", "Designers", "AI operators", "Production teams"],
    benefits: [
      "Turn product research into scripts, shot lists, and edit direction.",
      "Build a repeatable AI-assisted workflow instead of one-off prompts.",
      "Improve speed without losing human creative judgment.",
      "Create clearer handoffs between strategy, production, and editing.",
    ],
    whatYouGet: [
      "Research-to-angle workflow.",
      "Script and storyboard prompt sequence.",
      "Shot planning and AI visual planning checklist.",
      "Editing QA and claim-safety checklist.",
    ],
    preview:
      "Preview: research inputs, script prompts, storyboard prompts, shot list structure, AI visual planning, edit checklist, and QA workflow.",
    price: "$59",
    priceAmount: 59,
    thumbnail: "/assets/thumbnails/resources/ai-product-video-workflow-sop.svg",
    thumbnailAlt: "AI Product Video Workflow SOP thumbnail",
  },
  {
    slug: "winning-video-ad-hook-framework-deck",
    title: "Winning Video Ad Hook Framework Deck",
    categoryLabel: "Creative Strategy",
    formatLabel: "Framework deck",
    schemaCategory: "Creative Strategy",
    description:
      "A direct-response hook framework for structuring stronger video ads: curiosity hooks, problem hooks, failed-solution hooks, proof hooks, demo hooks, comparison hooks, and CTA transitions.",
    heroDescription:
      "A direct-response hook framework deck for building first-three-second openings around buyer psychology, product proof, demo moments, and clearer CTA transitions.",
    helpfulFor:
      "Helps teams stop guessing first-three-second hooks and build ad openings around proven buyer psychology.",
    whyPurchase:
      "Buy this if your ads look good but lose attention early. The deck gives your team hook families and decision rules so every opening has a reason to exist.",
    socialPostAngle:
      "Your first 3 seconds should not be a guess. Use hook frameworks that connect buyer pain, product proof, and a reason to keep watching.",
    audiences: ["Creative strategists", "Media buyers", "Editors", "UGC producers"],
    benefits: [
      "Understand which hook type fits each product and funnel stage.",
      "Brief editors and creators with clearer first-frame direction.",
      "Create more systematic hook tests for paid social.",
      "Improve alignment between caption, visual opener, and message.",
    ],
    whatYouGet: [
      "Problem, failed-solution, demo, curiosity, proof, and comparison hook frameworks.",
      "Use-case notes for when each hook type works best.",
      "CTA transition formula.",
      "Editing notes for hook clarity and retention.",
    ],
    preview:
      "Preview: hook types, when to use each one, example structures, visual opener suggestions, and transition ideas.",
    price: "$39",
    priceAmount: 39,
    thumbnail: "/assets/thumbnails/resources/winning-video-ad-hook-framework-deck.svg",
    thumbnailAlt: "Winning Video Ad Hook Framework Deck thumbnail",
  },
  {
    slug: "creative-strategy-research-template",
    title: "Creative Strategy Research Template",
    categoryLabel: "Research",
    formatLabel: "Template",
    schemaCategory: "Research",
    description:
      "A research template for turning product pages, reviews, competitor ads, and customer objections into ad angles, hooks, proof points, and production briefs.",
    heroDescription:
      "A research template that turns product pages, reviews, competitor ads, and customer objections into usable angles, hooks, proof points, and production briefs.",
    helpfulFor: "Helps strategists move from scattered notes to a usable creative testing roadmap.",
    whyPurchase:
      "Buy this if your creative strategy lives across scattered docs and screenshots. The template helps you organize research into an ad-testing roadmap your team can actually execute.",
    socialPostAngle:
      "Better creative starts before editing. Use this template to turn research into hooks, proof, objections, and shoot direction.",
    audiences: ["Creative strategists", "Founders", "Agencies", "Media buyers"],
    benefits: [
      "Extract customer language from reviews and support data.",
      "Map objections into usable ad angles.",
      "Score creative angles before production starts.",
      "Create better briefs for editors, creators, and media buyers.",
    ],
    whatYouGet: [
      "Product promise and proof mapping sections.",
      "Customer language extraction prompts.",
      "Competitor pattern tracker.",
      "Creative angle scoring framework.",
    ],
    preview:
      "Preview: research sections, customer language extraction, competitor pattern tracking, objection mapping, and angle scoring.",
    price: "$29",
    priceAmount: 29,
    thumbnail: "/assets/thumbnails/resources/creative-strategy-research-template.svg",
    thumbnailAlt: "Creative Strategy Research Template thumbnail",
  },
  {
    slug: "retention-editing-checklist-for-paid-social",
    title: "Retention Editing Checklist For Paid Social",
    categoryLabel: "Editing",
    formatLabel: "Checklist",
    schemaCategory: "Editing",
    description:
      "A concise editing checklist for making 9:16 ads clearer, faster, and more watchable across Meta, TikTok, Reels, and Shorts.",
    heroDescription:
      "A practical editing checklist for making 9:16 paid social videos clearer, faster, easier to watch, and more conversion-aware across Meta, TikTok, Reels, and Shorts.",
    helpfulFor:
      "Helps editors polish ads for retention, readability, product clarity, and conversion instead of only making them look nice.",
    whyPurchase:
      "Buy this if your edits look polished but do not hold attention. The checklist helps editors QA every ad for hook clarity, mobile readability, pacing, product understanding, proof, and CTA.",
    socialPostAngle:
      "Before you export the ad, run it through a retention checklist built for paid social, not just aesthetics.",
    audiences: ["Editors", "Motion designers", "UGC editors", "Agencies"],
    benefits: [
      "Catch weak first-three-second problems before export.",
      "Improve caption readability and mobile-safe framing.",
      "Make product clarity and proof moments easier to notice.",
      "Standardize paid social QA for editors and agencies.",
    ],
    whatYouGet: [
      "First 3-second retention checks.",
      "Caption, pacing, product clarity, proof, and CTA checklist.",
      "9:16 export QA notes.",
      "Paid social editing decision rules.",
    ],
    preview:
      "Preview: first 3-second checks, caption readability, cut pacing, product clarity, proof moments, CTA timing, and export QA.",
    price: "$19",
    priceAmount: 19,
    thumbnail: "/assets/thumbnails/resources/retention-editing-checklist-for-paid-social.svg",
    thumbnailAlt: "Retention Editing Checklist For Paid Social thumbnail",
  },
];

export function getVaultResourceBySlug(slug: string): VaultResource | undefined {
  return vaultResources.find((resource) => resource.slug === slug);
}

export const featuredGuides: FeaturedGuide[] = [
  {
    id: "how-ugc-ads-help-ecommerce-brands-test-faster",
    category: "UGC ads",
    number: "01",
    title: "How UGC Ads Help Ecommerce Brands Test Faster",
    description:
      "A practical guide to using creator-style ads, hook variations, and product proof to learn what buyers respond to before scaling spend.",
  },
  {
    id: "what-makes-a-product-video-shoot-useful-for-paid-social",
    category: "Production",
    number: "02",
    title: "What Makes a Product Video Shoot Useful for Paid Social",
    description:
      "The footage checklist brands need before a shoot: demos, angles, closeups, testimonials, lifestyle frames, and clean product proof.",
  },
  {
    id: "video-editing-for-retention-beyond-pretty-cuts",
    category: "Video editing",
    number: "03",
    title: "Video Editing for Retention: Beyond Pretty Cuts",
    description:
      "How pacing, captions, story order, sound, and motion callouts make a video easier to watch and easier to buy from.",
  },
  {
    id: "paid-social-creative-testing-hooks-offers-proof-cta",
    category: "Paid social",
    number: "04",
    title: "Paid Social Creative Testing: Hooks, Offers, Proof, CTA",
    description:
      "A simple framework for deciding which ad variations to test when creative fatigue or low conversion rates appear.",
  },
];

export const guideInsightParagraphs = [
  "UGCViss looks at the product promise, buyer pain, proof assets, footage quality, hook strength, editing structure, and paid social context before recommending a creative direction.",
  "The best next step is usually a focused sprint: shoot the missing proof, edit stronger variants, or test a clearer hook and offer structure.",
] as const;

export const intentPages: IntentPage[] = [
  {
    href: "/ugc-ads-agency",
    eyebrow: "UGC Ads Agency",
    title: "UGC ads built for ecommerce testing and sales.",
  },
  {
    href: "/video-editing-services",
    eyebrow: "Video Editing Services",
    title: "Performance video editing for ads, social, and ecommerce.",
  },
  {
    href: "/paid-social-ad-creatives",
    eyebrow: "Paid Social Ad Creatives",
    title: "Paid social creatives for brands that need more winning tests.",
  },
  {
    href: "/ecommerce-video-production",
    eyebrow: "Ecommerce Video Production",
    title: "Ecommerce video production from shoot planning to ad assets.",
  },
];
