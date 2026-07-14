import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { FaqPageCard } from "@/components/faqs/FaqPageCard";
import { FaqSidebar } from "@/components/faqs/FaqSidebar";
import { FaqPageCta } from "@/components/faqs/FaqPageCta";
import { Container } from "@/components/ui/Container";
import { allFaqs, faqCategories } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "UGCViss FAQs - UGC Ads, Video Production, Editing & Paid Ads",
  description:
    "Detailed UGCViss FAQs about UGC ads, model and product shoots, video editing, motion graphics, paid social ads, creative strategy, pricing, timelines, and agency support.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="FAQs"
        title="Detailed answers before you book a UGCViss sprint."
        description="Learn how our UGC ads, model shoots, video editing, motion graphics, paid social creatives, creator sourcing, and campaign support work before we build your next sales-focused creative system."
      />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(0,168,255,0.12),transparent_26%),radial-gradient(circle_at_88%_28%,rgba(255,255,255,0.06),transparent_24%)]"
        />

        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[330px_minmax(0,1fr)] lg:items-start">
            <FaqSidebar categories={faqCategories} />

            <div className="grid gap-8">
              {faqCategories.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-28"
                  aria-labelledby={`${category.id}-title`}
                >
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-400">
                        {category.items.length} answers
                      </p>
                      <h2
                        id={`${category.id}-title`}
                        className="mt-2 font-display text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl"
                      >
                        {category.title}
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {category.items.map((faq, index) => (
                      <FaqPageCard
                        key={faq.question}
                        index={index}
                        question={faq.question}
                        answer={faq.answer}
                      />
                    ))}
                  </div>
                </section>
              ))}

              <FaqPageCta />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
