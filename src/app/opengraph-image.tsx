import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Lime glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, #caff0018 0%, transparent 70%)",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1.5px solid #caff00",
              borderRadius: 100,
              padding: "9px 20px",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#caff00" }} />
            <span
              style={{
                color: "#caff00",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Available for work
            </span>
          </div>
          <span style={{ color: "#333", fontSize: 18, fontWeight: 900, letterSpacing: "0.05em" }}>
            kspportfolio.design
          </span>
        </div>

        {/* Middle — name + KP */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#ffffff",
                fontSize: 108,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              Keith
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: 108,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              Paul.
            </span>

            {/* Skill chips */}
            <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
              {["UI/UX Design", "Shopify", "Branding", "AI Workflows"].map((s) => (
                <div
                  key={s}
                  style={{
                    border: "1px solid #2a2a2a",
                    borderRadius: 100,
                    padding: "7px 18px",
                    display: "flex",
                  }}
                >
                  <span style={{ color: "#666", fontSize: 13, fontWeight: 600 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Big KP monogram */}
          <span
            style={{
              color: "#caff00",
              fontSize: 300,
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              marginRight: -20,
            }}
          >
            KP
          </span>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {/* Stats */}
          <div style={{ display: "flex", gap: 48 }}>
            {[
              { value: "3.6% → 13.8%", label: "Conversion Rate" },
              { value: "+54.9%", label: "Form Submissions" },
              { value: "5+ yrs", label: "Experience" },
            ].map((m) => (
              <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ color: "#caff00", fontSize: 22, fontWeight: 900 }}>{m.value}</span>
                <span
                  style={{
                    color: "#444",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Location */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span
              style={{
                color: "#555",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Remote / Bangkok
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
