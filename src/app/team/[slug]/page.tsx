import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { loadTeamMemberBySlug, loadTeamMembers } from "@/lib/data/team";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const teamMembers = await loadTeamMembers();
  return teamMembers
    .filter((member) => member.slug !== "neaz-mahmud")
    .map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = await loadTeamMemberBySlug(params.slug);
  if (!member) return { title: "Team" };
  return { title: `${member.name} - ${member.role}` };
}

export default async function TeamMemberPage({ params }: Props) {
  const member = await loadTeamMemberBySlug(params.slug);
  if (!member) notFound();

  return (
    <>
      <section className="border-b border-white/5 py-20">
        <Container>
          <Reveal>
            <Link href="/team" className="text-sm text-zinc-500 hover:text-sky-400 transition-colors">
              ← Team
            </Link>
            <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row">
              <div className="h-32 w-32 shrink-0 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10" />
              <div>
                <h1 className="font-display text-4xl font-bold text-white">{member.name}</h1>
                <p className="mt-2 text-sm font-medium text-sky-400">{member.role}</p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{member.bio}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaBanner title="Work with VidCarry on your next creative sprint." />
    </>
  );
}
