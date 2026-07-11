import type { TeamMember } from "@/lib/data/team";
import { teamMembers } from "@/lib/data/team";

export type FounderJourneyChapter = {
  step: string;
  eyebrow: string;
  title: string;
  description: string;
};

export type FounderJourney = {
  member: TeamMember;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroStats: { value: string; label: string }[];
  profileBio: string;
  timelineEyebrow: string;
  timelineTitle: string;
  timelineDescription: string;
  chapters: FounderJourneyChapter[];
  founderNoteEyebrow: string;
  founderNoteTitle: string;
  founderNoteBody: string;
  ctaTitle: string;
};

const neazMember = teamMembers.find((member) => member.slug === "neaz-mahmud")!;

export const neazMahmudJourney: FounderJourney = {
  member: neazMember,
  heroEyebrow: "Founder journey",
  heroTitle: "Neaz Mahmud's journey from editor to VidCarry founder.",
  heroDescription:
    "The story behind VidCarry starts with editing craft, grows through production and UGC ad systems, and now leads into a full shoot-to-sales creative agency built for ecommerce brands.",
  heroStats: [
    { value: "Founder", label: "Leadership" },
    { value: "Production", label: "Creative base" },
    { value: "Sales ads", label: "Agency focus" },
  ],
  profileBio:
    "Leads VidCarry's creative direction, production standards, model shoots, UGC ad systems, and premium video editing workflow.",
  timelineEyebrow: "Timeline",
  timelineTitle: "The chapters behind the agency.",
  timelineDescription:
    "A concise founder timeline showing how editing craft, production direction, and performance creative came together into VidCarry.",
  chapters: [
    {
      step: "01",
      eyebrow: "Chapter 01",
      title: "Started with the craft of editing",
      description:
        "Neaz's journey began with learning how pace, cuts, sound, captions, and story shape the way people watch a video.",
    },
    {
      step: "02",
      eyebrow: "Chapter 02",
      title: "Moved into production and shoot direction",
      description:
        "The work expanded from editing footage to planning model shoots, product angles, creator-style scenes, and footage that is easier to turn into ads.",
    },
    {
      step: "03",
      eyebrow: "Chapter 03",
      title: "Built performance-focused creative systems",
      description:
        "Instead of making videos only for looks, Neaz started building ad structures around hooks, product proof, objections, offers, and buying intent.",
    },
    {
      step: "04",
      eyebrow: "Chapter 04",
      title: "Worked with ecommerce and DTC campaigns",
      description:
        "The production process matured through ecommerce work across beauty, coffee, apparel, auto care, body care, and paid social creative needs.",
    },
    {
      step: "05",
      eyebrow: "Chapter 05",
      title: "Founded VidCarry",
      description:
        "VidCarry was created to bring shoot planning, UGC production, video editing, motion polish, and sales-focused paid ads support into one agency workflow.",
    },
    {
      step: "06",
      eyebrow: "Now",
      title: "Leading a shoot-to-sales creative team",
      description:
        "Today, Neaz leads VidCarry as Founder and CEO, shaping the creative standard and helping brands turn products into campaign-ready video assets.",
    },
  ],
  founderNoteEyebrow: "Founder note",
  founderNoteTitle:
    "The agency is built around one simple belief: good video should move the sale forward.",
  founderNoteBody:
    "VidCarry is not only an editing team. It is a production and creative partner built to help brands plan better footage, create sharper ads, and launch more useful creative into paid social campaigns.",
  ctaTitle: "Want Neaz and the VidCarry team to shape your next creative sprint?",
};
