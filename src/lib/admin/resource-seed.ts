import { vaultResources } from "@/lib/data/resources";
import type { AdminResource } from "@/lib/admin/resource-types";

const LOCKED_CONTENT: Record<string, string> = {
  "100-ai-ugc-prompt-vault": `UGCViss 100+ AI UGC Prompt Vault - Starter Unlock

Use these as working prompts, then customize them with product proof, audience language, and your offer.

1. Generate 20 UGC hooks for [product] where the first line sounds like a real customer talking to a friend. Focus on [pain point], [desired outcome], and [objection]. Keep each hook under 12 words.

2. Turn this product description into 5 TikTok-style UGC scripts using: Hook -> Problem -> Demo -> Proof -> CTA. Product: [paste product]. Audience: [paste audience]. Tone: casual, direct, credible.

3. Create 10 problem-first ad angles for [product]. Each angle should include the buyer pain, emotional trigger, visual opening shot, and one CTA line.

4. Write 8 AI creator prompts for a vertical 9:16 video where the creator demonstrates [product] in a natural home setting. Include camera direction, facial expression, caption overlays, and pacing notes.

5. Rewrite this weak hook into 15 high-retention hooks with curiosity, specificity, and buyer language: [paste hook].

UGCViss workflow note: the best prompts start with actual product proof, customer reviews, objections, and offer details. Do not let AI invent claims you cannot support.`,
  "ai-product-video-workflow-sop": `UGCViss AI Product Video Workflow SOP - Starter Unlock

Phase 1: Research
- Collect website copy, product benefits, customer reviews, competitor ads, and common objections.
- Ask AI to extract buyer pains, buying triggers, proof points, and emotional language.

Phase 2: Script System
- Generate 5 angle families: problem-solution, demo-first, testimonial, comparison, offer-led.
- For each angle, create 3 hooks and one 20-35 second script.

Phase 3: Visual Plan
- Convert each script into a shot list: opening frame, product closeup, use case, proof moment, CTA end frame.
- Add caption overlay notes for each shot.

Phase 4: Production
- Capture vertical 9:16 footage first.
- Prioritize hands-in-frame demos, model/creator proof, product texture, before/after, and lifestyle context.

Phase 5: Editing
- First 3 seconds must be legible without sound.
- Cut every moment that does not support hook, proof, product clarity, or CTA.

Phase 6: QA
- Check claim safety, offer accuracy, mobile readability, pacing, and whether the product is understood in 5 seconds.`,
  "winning-video-ad-hook-framework-deck": `UGCViss Winning Video Ad Hook Framework - Starter Unlock

Hook types to test:

1. Problem Hook
Structure: "If [pain] keeps happening, this is probably why."
Use when the buyer already feels the pain.

2. Failed Solution Hook
Structure: "I tried [common solution], but [problem remained] until..."
Use when the market is tired of obvious advice.

3. Demo Hook
Structure: "Watch what happens when I use [product] for [specific use case]."
Use when the product has visual proof.

4. Curiosity Hook
Structure: "I did not expect [unexpected outcome] from [product category]."
Use when the product has a surprising mechanism or result.

5. Proof Hook
Structure: "This is why [specific user type] switched to [product]."
Use for social proof, testimonials, and retargeting.

6. Comparison Hook
Structure: "Old way: [slow/painful process]. New way: [product-enabled result]."
Use when education is needed quickly.

CTA transition formula:
Hook -> Pain -> Product proof -> Why now -> CTA.`,
  "creative-strategy-research-template": `UGCViss Creative Strategy Research Template - Starter Unlock

Research sections:

1. Product Promise
- What result does the product promise?
- What mechanism makes it believable?
- What claim needs proof?

2. Customer Language
- Copy 20 real phrases from reviews, comments, support tickets, or sales calls.
- Mark each phrase as pain, outcome, objection, or proof.

3. Objection Map
- Price objection
- Trust objection
- Use-case objection
- Time/effort objection
- Comparison objection

4. Competitor Pattern Notes
- What hooks are repeated in the category?
- What visuals are overused?
- What proof is missing?

5. Creative Angle Score
Score each angle from 1-5 for clarity, visual proof, emotional pull, uniqueness, and offer fit.`,
  "retention-editing-checklist-for-paid-social": `UGCViss Retention Editing Checklist - Starter Unlock

Before exporting a paid social video, check:

1. First 3 seconds
- Can the viewer understand the promise without sound?
- Is the first frame visually specific?
- Does the caption support the hook?

2. Pacing
- Remove dead air before the first sentence.
- Cut pauses unless they add emotion or proof.
- Change shot/caption rhythm before attention drops.

3. Captions
- Keep mobile-safe margins.
- Highlight product, pain, proof, and CTA words.
- Avoid paragraph captions.

4. Product Clarity
- Show the product early.
- Show use case, texture, result, or transformation.
- Do not let motion graphics hide the product.

5. Proof
- Add review, demo, before/after, comparison, or creator reaction.
- Claims must be backed by visual or verbal proof.

6. CTA
- Make the final action obvious.
- End with product + offer + next step.

7. Export
- 9:16 vertical, platform-safe captions, clean audio, no accidental black frames, no unreadable text.`,
};

const SEED_META: Record<
  string,
  { id: string; sortOrder: number; audience?: string[] }
> = {
  "100-ai-ugc-prompt-vault": { id: "seed-ai-ugc-prompt-vault", sortOrder: 10 },
  "ai-product-video-workflow-sop": { id: "seed-ai-product-video-workflow", sortOrder: 20 },
  "winning-video-ad-hook-framework-deck": { id: "seed-winning-hook-framework-deck", sortOrder: 30 },
  "creative-strategy-research-template": {
    id: "seed-creative-strategy-research-template",
    sortOrder: 40,
  },
  "retention-editing-checklist-for-paid-social": {
    id: "seed-retention-editing-checklist",
    sortOrder: 50,
  },
};

export const defaultAdminResources: AdminResource[] = vaultResources.map((resource) => {
  const meta = SEED_META[resource.slug];
  if (!meta) {
    throw new Error(`Missing seed metadata for resource slug: ${resource.slug}`);
  }

  return {
    id: meta.id,
    slug: resource.slug,
    title: resource.title,
    category: resource.categoryLabel as AdminResource["category"],
    format: resource.formatLabel as AdminResource["format"],
    price: resource.priceAmount,
    currency: "usd",
    status: "published",
    sortOrder: meta.sortOrder,
    audience: meta.audience ?? resource.audiences,
    benefit: resource.helpfulFor,
    description: resource.description,
    detailIntro: resource.heroDescription,
    purchaseReason: resource.whyPurchase,
    benefits: resource.benefits,
    includedItems: resource.whatYouGet,
    socialPostAngle: resource.socialPostAngle,
    previewContent: resource.preview,
    lockedContent: LOCKED_CONTENT[resource.slug] ?? "",
    thumbnail: resource.thumbnail,
    filePath: null,
    isPaid: true,
  };
});
