import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "UGCViss — UGC ads, video editing, and paid social creative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #030308 0%, #07111f 48%, #082f49 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#38bdf8",
          }}
        >
          UGCVISS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              maxWidth: 980,
            }}
          >
            Ads that drive sales
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#cbd5e1",
              maxWidth: 900,
            }}
          >
            UGC ads, video editing, motion, and paid social creative for ecommerce and DTC brands.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#7dd3fc",
            fontWeight: 700,
          }}
        >
          www.ugcviss.com
        </div>
      </div>
    ),
    size,
  );
}
