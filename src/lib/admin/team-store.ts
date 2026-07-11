import type { AdminTeamMember } from "@/lib/admin/team-types";
import { defaultAdminTeamMembers } from "@/lib/admin/team-seed";
import { readJsonStore, writeJsonStore } from "@/lib/admin/json-store";

const STORE_FILE = "team-store.json";

async function readStore(): Promise<AdminTeamMember[]> {
  return readJsonStore(STORE_FILE, defaultAdminTeamMembers);
}

async function writeStore(members: AdminTeamMember[]) {
  await writeJsonStore(STORE_FILE, members);
}

export async function listAdminTeamMembers() {
  const members = await readStore();
  return [...members].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAdminTeamMemberById(id: string) {
  const members = await readStore();
  return members.find((member) => member.id === id);
}

export async function createAdminTeamMember(member: AdminTeamMember) {
  const members = await readStore();
  if (members.some((item) => item.slug === member.slug)) {
    throw new Error("A team profile with this slug already exists.");
  }
  members.push(member);
  await writeStore(members);
  return member;
}

export async function updateAdminTeamMember(member: AdminTeamMember) {
  const members = await readStore();
  const index = members.findIndex((item) => item.id === member.id);
  if (index === -1) {
    throw new Error("Team profile not found.");
  }
  if (members.some((item) => item.slug === member.slug && item.id !== member.id)) {
    throw new Error("Another team profile already uses this slug.");
  }
  members[index] = member;
  await writeStore(members);
  return member;
}

export async function deleteAdminTeamMember(id: string) {
  const members = await readStore();
  const index = members.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Team profile not found.");
  }
  const [removed] = members.splice(index, 1);
  await writeStore(members);
  return removed;
}
