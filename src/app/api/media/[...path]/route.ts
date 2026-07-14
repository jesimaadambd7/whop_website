import {
  resolveUgcvissMediaUrl,
  resolveUgcvissMediaUrlFresh,
} from "@/lib/media/ugcviss-media";

export const dynamic = "force-dynamic";

async function proxyMedia(
  signedUrl: string,
  request: Request,
): Promise<Response> {
  const headers: HeadersInit = {
    Referer: "https://www.vidcarry.com/",
    "User-Agent": "Mozilla/5.0 (compatible; UGCVissSite/1.0)",
  };

  const range = request.headers.get("Range");
  if (range) {
    headers.Range = range;
  }

  const upstream = await fetch(signedUrl, { headers });

  if (!upstream.ok) {
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  }

  const responseHeaders = new Headers();
  const passthrough = [
    "Content-Type",
    "Content-Length",
    "Accept-Ranges",
    "Content-Range",
  ] as const;

  for (const key of passthrough) {
    const value = upstream.headers.get(key);
    if (value) responseHeaders.set(key, value);
  }

  responseHeaders.set("Cache-Control", "public, max-age=300, stale-while-revalidate=600");

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } },
) {
  const mediaPath = params.path.join("/");
  let signedUrl = await resolveUgcvissMediaUrl(mediaPath);

  if (!signedUrl) {
    return Response.json({ error: "Media not found" }, { status: 404 });
  }

  let response = await proxyMedia(signedUrl, request);

  if (response.status === 403) {
    signedUrl = await resolveUgcvissMediaUrlFresh(mediaPath);
    if (signedUrl) {
      response = await proxyMedia(signedUrl, request);
    }
  }

  return response;
}
