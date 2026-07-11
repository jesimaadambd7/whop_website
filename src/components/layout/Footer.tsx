import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookies/CookiePreferencesButton";
import { footerLinks, siteConfig } from "@/lib/data/site";
import { Container } from "@/components/ui/Container";

const pagesLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Creators", href: "/creator-portfolios" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "FAQs", href: "/faqs" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
                <span className="font-display text-sm font-bold text-sky-400">V</span>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              Performance video creative studio for ecommerce and DTC brands. UGC ads,
              production, editing, motion, and paid social execution.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Pages
            </h3>
            <ul className="mt-5 space-y-2.5">
              {pagesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Core Services
            </h3>
            <ul className="mt-5 space-y-2.5">
              {footerLinks.services.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Terms", href: "/terms-conditions" },
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Cookie Policy", href: "/cookie-policy" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
              >
                {link.label}
              </Link>
            ))}
            <CookiePreferencesButton className="text-xs text-zinc-600 transition-colors hover:text-zinc-400" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
