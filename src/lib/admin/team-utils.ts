export function slugifyName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

export function sortOrderOptions() {
  return Array.from({ length: 101 }, (_, index) => ({
    value: index,
    label:
      index === 0
        ? "0 - Highest priority / first"
        : `${index} - Sort priority`,
  }));
}

export function isUploadFile(
  value: FormDataEntryValue | null,
): value is File {
  return (
    value !== null &&
    typeof value === "object" &&
    "arrayBuffer" in value &&
    typeof value.arrayBuffer === "function" &&
    "size" in value &&
    typeof value.size === "number" &&
    value.size > 0
  );
}
