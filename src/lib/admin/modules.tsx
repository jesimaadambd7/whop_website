import {
  AdminPlaceholderPanel,
  AdminSectionHeader,
} from "@/components/admin/AdminSectionHeader";

const modules = {
  creators: {
    title: "Creator approval",
    description:
      "Review creator signup requests, approve portfolios, verify profiles, feature top creators, suspend accounts, and manage shortlists.",
    actions: [
      { label: "View creator directory", href: "/creator-portfolios", external: true },
    ],
  },
  portfolio: {
    title: "Agency portfolio",
    description:
      "Upload and manage backend portfolio videos, posters, client libraries, categories, and campaign result notes.",
    actions: [{ label: "View public portfolio", href: "/portfolio" }],
  },
  team: {
    title: "Team profiles",
    description:
      "Manage team cards, roles, bios, LinkedIn links, profile photos, and founder journey content.",
    actions: [{ label: "View team page", href: "/team" }],
  },
  resources: {
    title: "Resource store",
    description:
      "Upload paid prompt packs, research templates, AI tutorials, portfolio packs, and locked downloads.",
    actions: [{ label: "View resources", href: "/resources" }],
  },
  packages: {
    title: "Packages & pricing",
    description:
      "Manage sprint packages, pricing tiers, deliverables, checkout links, and offer copy.",
    actions: [{ label: "View packages", href: "/packages/ugc-ad-sprint" }],
  },
  orders: {
    title: "Orders",
    description:
      "Track resource purchases, package checkouts, payment status, and customer fulfillment records.",
  },
  clients: {
    title: "Clients",
    description:
      "Manage client libraries, campaign notes, deliverable history, and active production relationships.",
  },
  subscriptions: {
    title: "Subscriptions",
    description:
      "Review creator subscriptions, billing status, renewals, and account limits.",
  },
  deliveries: {
    title: "Deliveries",
    description:
      "Track sprint deliverables, file handoffs, revision rounds, and launch-ready asset status.",
  },
} as const;

type AdminModuleKey = keyof typeof modules;

export function createAdminModulePage(key: AdminModuleKey) {
  const module = modules[key];

  return function AdminModulePage() {
    return (
      <main className="min-h-screen bg-black px-5 py-24 text-white sm:px-8 lg:px-12">
        <section className="mx-auto max-w-5xl">
          <AdminSectionHeader title={module.title} description={module.description} />
          <div className="mt-8">
            <AdminPlaceholderPanel
              title={module.title}
              description={`${module.description} This control panel is wired into the admin workspace and ready for backend actions.`}
              actions={"actions" in module ? [...module.actions] : []}
            />
          </div>
        </section>
      </main>
    );
  };
}
