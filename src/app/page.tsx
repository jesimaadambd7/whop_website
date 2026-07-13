import { HeroSection } from "@/components/home/HeroSection";
import { OverviewSection } from "@/components/home/OverviewSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { FrameworkSection } from "@/components/home/FrameworkSection";
import { ProofSection } from "@/components/home/ProofSection";
import { NetworkSection } from "@/components/home/NetworkSection";
import { PackageGrid } from "@/components/shared/PackageGrid";
import { ServicesSection } from "@/components/home/ServicesSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { TeamSection } from "@/components/home/TeamSection";
import { ClientProcessSection } from "@/components/home/ClientProcessSection";
import { FaqSection } from "@/components/home/FaqSection";
import { AuditFormSection } from "@/components/home/AuditFormSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FilmStripDivider } from "@/components/effects/cinematic/FilmStripDivider";
import { loadPackages } from "@/lib/data/packages";
import { loadTeamMembers } from "@/lib/data/team";

export default async function HomePage() {
  const packages = await loadPackages();
  const teamMembers = await loadTeamMembers();

  return (
    <>
      <HeroSection />
      <FilmStripDivider label="Scene 01 — Overview" />
      <OverviewSection />
      <ClientsSection />
      <FrameworkSection />
      <ProofSection />
      <FilmStripDivider label="Scene 02 — Proof" />
      <NetworkSection />
      <PackageGrid packages={packages} />
      <ServicesSection />
      <IndustriesSection />
      <PortfolioPreview />
      <FilmStripDivider label="Scene 03 — Process" />
      <ProcessSection />
      <WhyChooseSection />
      <TeamSection members={teamMembers} />
      <ClientProcessSection />
      <FaqSection />
      <AuditFormSection />
      <CtaSection />
    </>
  );
}
