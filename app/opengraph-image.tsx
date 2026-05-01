import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Enviro Aqua — Water Filters & Commercial Bubblers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0A0A0A",
          color: "#FFFFFF",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "auto",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4c4 6 8 10 8 15a8 8 0 0 1-16 0c0-5 4-9 8-15Z"
              fill="#FFFFFF"
            />
          </svg>
          <span style={{ fontSize: "32px", fontWeight: 600, letterSpacing: "-0.02em" }}>
            Enviro Aqua
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              margin: 0,
            }}
          >
            Water Filters · Commercial Bubblers · Australia-wide
          </p>
          <h1
            style={{
              fontSize: "76px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Australia&rsquo;s water filter specialists.
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#9CA3AF",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Same price retail or trade. Same-day dispatch from Wyong NSW.
          </p>
        </div>
        <div
          style={{
            marginTop: "60px",
            paddingTop: "30px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#9CA3AF",
            fontSize: "20px",
          }}
        >
          <span>Wyong, NSW Central Coast · Australia-wide shipping</span>
          <span>enviroaqua.com.au</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
