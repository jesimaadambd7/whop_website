export type Faq = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: Faq[];
};

export const homeFaqs: Faq[] = [
  {
    question: "What services does VidCarry offer?",
    answer:
      "VidCarry offers UGC ads production, model and product shoot production, video editing, motion graphics, paid social ad creatives, YouTube editing, short-form content, creative strategy, creator sourcing, talent production, and paid ads support for ecommerce, DTC, and agency teams.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Project cost depends on the scope: shoot production, UGC volume, editing complexity, motion graphics, usage needs, timelines, and whether paid ads support is included. VidCarry can scope one-time creative sprints, monthly support, or custom packages after reviewing your goals.",
  },
  {
    question: "Do you work worldwide?",
    answer:
      "Yes. VidCarry works with brands, agencies, creators, editors, and production partners worldwide. The workflow is remote-first, with global talent coordination when a project needs specific creators, actors, models, influencers, locations, or market-fit content.",
  },
  {
    question: "Do you offer UGC creators?",
    answer:
      "Yes. VidCarry can source and coordinate UGC creators, models, actors, influencers, and on-camera talent depending on the campaign brief, product category, usage rights, budget, and delivery timeline.",
  },
  {
    question: "Do you only edit videos, or can you shoot content too?",
    answer:
      "We can do both. VidCarry supports model and product shoots, UGC creator production, video editing, motion graphics, short-form content, and paid social ad creatives, so brands do not need to manage separate teams for every step.",
  },
  {
    question: "Can VidCarry help run ads after producing the creatives?",
    answer:
      "Yes. We can help with paid social ad creatives and campaign support, including launch planning, creative testing direction, performance monitoring, and optimization notes focused on sales outcomes.",
  },
];

export const faqCategories: FaqCategory[] = [
  {
    id: "pricing-and-fit",
    title: "Pricing and fit",
    items: [
      {
        question: "How much does a project cost?",
        answer:
          "Project cost depends on the scope: shoot production, UGC volume, editing complexity, motion graphics, usage needs, timelines, and whether paid ads support is included. VidCarry can scope one-time creative sprints, monthly support, or custom packages after reviewing your goals.",
      },
      {
        question: "Do you work worldwide?",
        answer:
          "Yes. VidCarry works with brands, agencies, creators, editors, and production partners worldwide. The workflow is remote-first, with global talent coordination when a project needs specific creators, actors, models, influencers, locations, or market-fit content.",
      },
      {
        question: "Do you work with one-time projects or long-term partnerships?",
        answer:
          "We can support focused one-time sprints when the brief is clear, but the best results usually come from ongoing creative testing where each batch improves from the last round of data, hooks, objections, and winning angles.",
      },
      {
        question: "What types of brands are a good fit?",
        answer:
          "VidCarry is a strong fit for ecommerce, DTC, product-led brands, and agencies that need reliable video production support. We are especially useful when a team needs model shoots, UGC ads, editing, and sales-focused creative under one workflow.",
      },
      {
        question: "What budget should a brand have before booking a call?",
        answer:
          "The best fit is usually a brand that has a clear product, active or planned paid social campaigns, and enough budget to produce multiple creative variations instead of one isolated video. If you are unsure, the call helps us decide whether a lean edit sprint or a larger shoot-to-sales sprint makes sense.",
      },
      {
        question: "Can startups work with VidCarry?",
        answer:
          "Yes, if the product, offer, and launch plan are ready enough for serious creative testing. Early-stage brands usually benefit from a focused batch of UGC ads, product demos, or short-form edits before committing to a larger production system.",
      },
    ],
  },
  {
    id: "production-and-ugc",
    title: "Production and UGC",
    items: [
      {
        question: "What services does VidCarry offer?",
        answer:
          "VidCarry offers UGC ads production, model and product shoot production, video editing, motion graphics, paid social ad creatives, YouTube editing, short-form content, creative strategy, creator sourcing, talent production, and paid ads support for ecommerce, DTC, and agency teams.",
      },
      {
        question: "Do you offer UGC creators?",
        answer:
          "Yes. VidCarry can source and coordinate UGC creators, models, actors, influencers, and on-camera talent depending on the campaign brief, product category, usage rights, budget, and delivery timeline.",
      },
      {
        question: "Do you only edit videos, or can you shoot content too?",
        answer:
          "We can do both. VidCarry supports model and product shoots, UGC creator production, video editing, motion graphics, short-form content, and paid social ad creatives, so brands do not need to manage separate teams for every step.",
      },
      {
        question: "What is UGC ads production?",
        answer:
          "UGC ads production is the process of planning, scripting, sourcing, shooting, and editing creator-style ads that feel native to TikTok, Reels, Shorts, and Meta placements. VidCarry builds these around hooks, product proof, objections, benefits, and a clear call to action.",
      },
      {
        question: "Can you source creators and models for our product?",
        answer:
          "Yes. We can help with creator sourcing, model casting, brief writing, production coordination, and footage planning. The goal is to capture footage that already matches the ad angles and editing structure, instead of trying to fix weak footage later.",
      },
      {
        question: "Can VidCarry work with actors, influencers, or celebrities?",
        answer:
          "Yes. VidCarry can coordinate actors, UGC creators, influencers, and celebrity talent when the campaign fit, budget, schedule, and usage rights align. This is useful when a brand needs higher trust, recognizable faces, local-market relevance, or stronger social proof.",
      },
      {
        question: "Do you have a global remote production team?",
        answer:
          "Yes. VidCarry works with a global remote network across multiple countries, including editors, creative operators, strategists, production support, creators, actors, models, influencers, and other on-camera talent depending on the project need.",
      },
      {
        question: "Do you shoot product demos and lifestyle content?",
        answer:
          "Yes. Product demos, model-led lifestyle scenes, before-after shots, hands-in-frame demos, unboxings, testimonial-style clips, and routine-based footage can all be part of a VidCarry production sprint.",
      },
      {
        question: "Can we send you raw footage to turn into ads?",
        answer:
          "Yes. If you already have raw clips, testimonials, creator footage, podcast clips, product footage, or brand assets, we can turn them into structured ad edits, short-form content, motion callouts, captions, and platform-ready exports.",
      },
    ],
  },
  {
    id: "editing-and-creative",
    title: "Editing and creative",
    items: [
      {
        question: "What makes your video editing different from normal editing?",
        answer:
          "VidCarry editing is built for retention and sales, not only polish. We think about the first three seconds, pacing, captions, product clarity, proof moments, objections, offer framing, and where the viewer should take action.",
      },
      {
        question: "Do you create motion graphics and product callouts?",
        answer:
          "Yes. Motion graphics can include kinetic type, product labels, benefit callouts, animated icons, logo polish, split screens, before-after frames, end cards, and visual systems that make the ad easier to understand quickly.",
      },
      {
        question: "Can you make videos in 9:16 vertical format?",
        answer:
          "Yes. VidCarry primarily builds social-first videos in 9:16 vertical format for Reels, TikTok, Shorts, and mobile-first paid social. We can also create alternate exports when a campaign needs different placements.",
      },
      {
        question: "Do you handle YouTube video editing?",
        answer:
          "Yes. We can edit long-form YouTube videos, YouTube Shorts, retention-focused intros, chapters, clean audio, captions, branded graphics, and cutdowns that turn long-form content into social assets.",
      },
    ],
  },
  {
    id: "paid-ads-and-strategy",
    title: "Paid ads and strategy",
    items: [
      {
        question: "Can VidCarry help run ads after producing the creatives?",
        answer:
          "Yes. We can help with paid social ad creatives and campaign support, including launch planning, creative testing direction, performance monitoring, and optimization notes focused on sales outcomes.",
      },
      {
        question: "Will you need access to our ad account?",
        answer:
          "If we are helping with paid ads strategy or management, ad account access is helpful so we can understand spend, winners, fatigue, audience response, and what the creative needs to improve. For production-only projects, it is not always required.",
      },
      {
        question: "How do you decide which creative angles to test?",
        answer:
          "We start with the offer, audience, objections, product proof, competitor patterns, customer language, and any available ad data. From there we build angles around problems, outcomes, demonstrations, testimonials, comparisons, routines, and offers.",
      },
      {
        question: "Can you manage Meta or TikTok ads for us?",
        answer:
          "We can support paid social campaign setup, creative testing, optimization notes, and performance monitoring depending on the engagement. For some clients, VidCarry produces the creative; for others, we also help guide or manage the launch and testing process.",
      },
      {
        question: "How many ad variations should we test?",
        answer:
          "The right number depends on your spend, audience size, and offer maturity. Most brands need multiple hooks, intros, proof structures, and CTA variations so the campaign can learn which message actually moves buyers.",
      },
    ],
  },
  {
    id: "process-and-delivery",
    title: "Process and delivery",
    items: [
      {
        question: "What happens after we book a call?",
        answer:
          "We review your product, goals, current creative, timeline, budget range, and whether you need production, editing, paid ads support, or a full sprint. If there is a fit, we outline scope, deliverables, timeline, and next steps.",
      },
      {
        question: "What do you need from us before starting?",
        answer:
          "Useful inputs include your website, product details, target audience, offer, existing ads, brand guidelines, raw footage if available, customer reviews, competitor references, and any performance data you can share.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery time depends on scope. Editing-only projects can move faster, while creator sourcing, product shipping, model shoots, scripts, motion graphics, and multiple ad variants require more coordination. VidCarry confirms the delivery schedule before production starts.",
      },
      {
        question: "What deliverables do we receive?",
        answer:
          "Deliverables can include raw shoot clips, edited UGC ads, product demo videos, short-form cutdowns, motion graphics, captions, platform exports, hook variations, and creative notes depending on the package.",
      },
      {
        question: "Who owns the final creative assets?",
        answer:
          "Usage and ownership terms are confirmed during scope. In most client projects, the goal is to deliver assets the brand can confidently use across paid social, organic social, landing pages, and campaign testing.",
      },
    ],
  },
  {
    id: "agency-support",
    title: "Agency support",
    items: [
      {
        question: "Do you support other agencies as a white-label production partner?",
        answer:
          "Yes. Agencies can use VidCarry for editing capacity, UGC ad production, motion graphics, creator-style cuts, short-form content, and campaign creative support when their internal team needs more reliable output.",
      },
      {
        question: "Can VidCarry work with our internal creative or media buying team?",
        answer:
          "Yes. We can plug into your existing team as a production and creative partner. Your team can own strategy and media buying while VidCarry supports footage, editing, creative variations, and ad-ready exports.",
      },
      {
        question: "Do you use AI in the creative process?",
        answer:
          "Yes, where it helps. We may use AI tools for research, scripting support, storyboard planning, angle development, and faster creative preparation, while the final strategy, production direction, editing decisions, and quality control stay human-led.",
      },
      {
        question: "Can you help if our current ads are not converting?",
        answer:
          "Yes. We look at the current creative, landing promise, offer clarity, audience intent, hooks, proof, and objections. Then we recommend new creative angles or edits designed to improve the next round of testing.",
      },
    ],
  },
];

/** Flat list of all FAQs for schema.org FAQPage markup */
export const allFaqs: Faq[] = faqCategories.flatMap((category) => category.items);
