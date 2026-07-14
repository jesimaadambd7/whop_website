const MEDIA_CDN_ORIGIN = "https://www.vidcarry.com";
const CACHE_TTL_MS = 8 * 60 * 1000;

const SCRAPE_SOURCES = [
  "/",
  "/portfolio",
  "/portfolio/neaz-mahmud",
  "/portfolio/blissal",
  "/portfolio/ryze",
];

const MEDIA_PATTERN =
  /\/api\/media\/((?:portfolio\/[^?"'\\]+(?:\/poster)?)|winning-framework)\?m=([^"'\\]+)/g;

type MediaCache = {
  expiresAt: number;
  urls: Map<string, string>;
};

let cache: MediaCache | null = null;
let inflight: Promise<Map<string, string>> | null = null;

function tokenExpiry(token: string): number {
  const [expiry] = token.split(".");
  const parsed = Number(expiry);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractMediaUrls(html: string): Map<string, string> {
  const map = new Map<string, string>();

  for (const match of html.matchAll(MEDIA_PATTERN)) {
    const key = match[1];
    const token = match[2];
    const signedUrl = `${MEDIA_CDN_ORIGIN}/api/media/${key}?m=${token}`;
    const existing = map.get(key);

    if (!existing || tokenExpiry(token) >= tokenExpiry(existing.split("m=")[1] ?? "")) {
      map.set(key, signedUrl);
    }
  }

  return map;
}

async function fetchHtml(path: string): Promise<string> {
  const response = await fetch(`${MEDIA_CDN_ORIGIN}${path}`, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "Mozilla/5.0 (compatible; UGCVissSite/1.0)",
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load UGCViss page ${path}: ${response.status}`);
  }

  return response.text();
}

async function buildMediaUrlMap(): Promise<Map<string, string>> {
  const pages = await Promise.all(SCRAPE_SOURCES.map((path) => fetchHtml(path)));
  const map = new Map<string, string>();

  for (const html of pages) {
    for (const [key, url] of extractMediaUrls(html)) {
      const existing = map.get(key);
      const nextToken = url.split("m=")[1] ?? "";
      const existingToken = existing?.split("m=")[1] ?? "";
      if (!existing || tokenExpiry(nextToken) >= tokenExpiry(existingToken)) {
        map.set(key, url);
      }
    }
  }

  return map;
}

async function loadMediaUrlMap(force = false): Promise<Map<string, string>> {
  const now = Date.now();

  if (!force && cache && cache.expiresAt > now) {
    return cache.urls;
  }

  if (!force && inflight) {
    return inflight;
  }

  inflight = buildMediaUrlMap()
    .then((urls) => {
      cache = { urls, expiresAt: Date.now() + CACHE_TTL_MS };
      return urls;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function invalidateUgcvissMediaCache() {
  cache = null;
}

export function mediaPath(...segments: string[]) {
  return `/api/media/${segments.join("/")}`;
}

export async function resolveUgcvissMediaUrl(mediaPath: string): Promise<string | null> {
  const normalized = mediaPath.replace(/^\/+/, "").replace(/\?.*$/, "");
  const map = await loadMediaUrlMap();
  return map.get(normalized) ?? null;
}

export async function resolveUgcvissMediaUrlFresh(mediaPath: string): Promise<string | null> {
  invalidateUgcvissMediaCache();
  const map = await loadMediaUrlMap(true);
  const normalized = mediaPath.replace(/^\/+/, "").replace(/\?.*$/, "");
  return map.get(normalized) ?? null;
}
