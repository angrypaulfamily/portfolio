"use client";

import Image from "next/image";

export default function CVPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page { size: A4; margin: 0; }
            html, body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              background: #0a0a0a !important;
            }
            .no-print { display: none !important; }
            nav, footer { display: none !important; }
            main { padding-top: 0 !important; }
            .cv-wrapper {
              padding: 0 !important;
              background: #0a0a0a !important;
              min-height: 0 !important;
              display: block !important;
            }
            .cv-a4 {
              width: 210mm !important;
              height: 297mm !important;
              max-height: 297mm !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              margin: 0 !important;
            }
          }
        `
      }} />

      <div
        className="cv-wrapper"
        style={{
          backgroundColor: "#050505",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "36px 16px 48px",
          fontFamily: "var(--font-sans)",
        }}
      >
        {/* Toolbar */}
        <div
          className="no-print"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
            width: "794px",
            maxWidth: "100%",
          }}
        >
          <span
            style={{
              color: "#333",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Keith Paul — CV
          </span>
          <div style={{ flex: 1 }} />
          <span style={{ color: "#333", fontSize: "10px" }}>
            Print or save as PDF
          </span>
          <button
            onClick={() => window.print()}
            style={{
              backgroundColor: "#caff00",
              color: "#0a0a0a",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "10px 22px",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save as PDF
          </button>
        </div>

        {/* A4 Canvas */}
        <div
          className="cv-a4"
          style={{
            width: "794px",
            height: "1123px",
            backgroundColor: "#0a0a0a",
            display: "flex",
            boxShadow:
              "0 30px 100px rgba(0,0,0,0.95), 0 0 0 1px #1a1a1a",
            borderRadius: "2px",
            overflow: "hidden",
            fontFamily: "var(--font-sans)",
          }}
        >
          {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
          <div
            style={{
              width: "242px",
              flexShrink: 0,
              backgroundColor: "#0e0e0e",
              borderRight: "1px solid #1c1c1c",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Photo */}
            <div
              style={{
                position: "relative",
                height: "228px",
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/avatar.jpg"
                alt="Keith Paul"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "grayscale(100%) brightness(0.8) contrast(1.05)",
                }}
                sizes="242px"
                priority
              />
              {/* Bottom fade */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "100px",
                  background:
                    "linear-gradient(to bottom, transparent, #0e0e0e)",
                }}
              />
              {/* Lime accent line at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "#caff00",
                  opacity: 0.6,
                }}
              />
            </div>

            {/* Name & Title */}
            <div style={{ padding: "18px 22px 16px" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.0,
                  textTransform: "uppercase",
                }}
              >
                Keith
                <br />
                Paul
              </div>
              <div
                style={{
                  color: "#caff00",
                  fontSize: "8.5px",
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  marginTop: "7px",
                }}
              >
                UI/UX Designer
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                backgroundColor: "#1c1c1c",
                margin: "0 22px",
              }}
            />

            {/* Contact */}
            <div style={{ padding: "16px 22px" }}>
              <div
                style={{
                  color: "#caff00",
                  fontSize: "7.5px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "11px",
                }}
              >
                Contact
              </div>
              {[
                { label: "keithpaul00@gmail.com" },
                { label: "kspportfolio.design" },
                { label: "+66 098 808 7669" },
                { label: "Remote / Bangkok" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    color: "#777",
                    fontSize: "9px",
                    lineHeight: 1.5,
                    marginBottom: "6px",
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                backgroundColor: "#1c1c1c",
                margin: "0 22px",
              }}
            />

            {/* Skills */}
            <div style={{ padding: "16px 22px", flex: 1 }}>
              {[
                {
                  label: "UX Design",
                  skills: [
                    "User Research",
                    "User Personas",
                    "User Flows",
                    "Wireframing",
                    "Lo-Fi Prototyping",
                    "Hi-Fi Prototyping",
                    "Usability Testing",
                    "Info Architecture",
                    "CRO",
                    "UX Audits",
                    "Journey Mapping",
                    "Competitor Analysis",
                  ],
                },
                {
                  label: "UI Design",
                  skills: [
                    "Design Systems",
                    "Design Tokens",
                    "Visual Design",
                    "Interaction Design",
                    "Responsive Design",
                    "Mobile-first",
                    "Accessibility",
                    "WCAG",
                    "E-commerce UX",
                  ],
                },
                {
                  label: "Tools",
                  skills: [
                    "Figma",
                    "Framer",
                    "Photoshop",
                    "Illustrator",
                    "After Effects",
                    "Shopify",
                    "GA4",
                    "HubSpot",
                    "Clarity",
                  ],
                },
                {
                  label: "AI",
                  skills: [
                    "Claude",
                    "Cursor",
                    "v0",
                    "Midjourney",
                    "Bolt",
                    "Lovable",
                    "Relume",
                  ],
                },
              ].map((group, gi) => (
                <div
                  key={gi}
                  style={{ marginBottom: gi < 3 ? "13px" : "0" }}
                >
                  <div
                    style={{
                      color: "#caff00",
                      fontSize: "7.5px",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      marginBottom: "7px",
                    }}
                  >
                    {group.label}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          backgroundColor: "#161616",
                          color: "#666",
                          fontSize: "8px",
                          fontWeight: 500,
                          padding: "2.5px 6px",
                          borderRadius: "3px",
                          border: "1px solid #222",
                          lineHeight: 1.5,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT CONTENT ─────────────────────────────────── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "30px 30px 26px 30px",
              overflow: "hidden",
            }}
          >
            {/* ABOUT */}
            <section style={{ marginBottom: "22px" }}>
              <SectionHeader num="01" label="About" />
              <p
                style={{
                  color: "#777",
                  fontSize: "10.5px",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                UI/UX designer with 5+ years of experience across web design,
                Shopify, branding, and AI-powered workflows. I own the full
                end-to-end design process: from user research, user personas,
                user flows, and information architecture through wireframing,
                lo-fi and hi-fi prototyping, usability testing, and developer
                handoff. I work closely with CEOs, developers, marketing, and
                sales teams across industries, and actively integrate AI into my
                workflow for design generation, research, and prototyping.
              </p>
            </section>

            <Divider />

            {/* EXPERIENCE */}
            <section style={{ marginBottom: "22px" }}>
              <SectionHeader num="02" label="Experience" />
              {[
                {
                  role: "UI/UX Designer",
                  company: "Royi Sal",
                  period: "2024 – 2026",
                  bullets: [
                    "Led end-to-end redesign from competitor benchmarking through developer handoff — improved conversion rate from 3.6% to 13.8%, form submissions +54.9%, session duration +23%",
                    "Built and implemented a design system with design tokens; leveraged Google Analytics, Microsoft Clarity, and HubSpot; collaborated with CEO, developers, and marketing; integrated AI tools throughout",
                  ],
                },
                {
                  role: "UI/UX Designer",
                  company: "Luags Gallery",
                  period: "2024",
                  bullets: [
                    "Built full brand identity and Shopify e-commerce experience for a luxury DTC jewellery brand (LuAG gemstone); applied mobile-first design and CRO-mindset to product pages, checkout flow, and storytelling-led user flows",
                  ],
                },
                {
                  role: "UI/UX Designer",
                  company: "Heyoka Gallery",
                  period: "2024",
                  bullets: [
                    "Designed complete digital identity and exhibition-style Shopify store for a DTC sacred art gallery; created user flows placing the artist's journey at key trust moments to support conversion",
                  ],
                },
                {
                  role: "UI/UX & Ad Designer",
                  company: "Media.net",
                  period: "2022 – 2024",
                  bullets: [
                    "Designed and optimised ad units and landing pages for Forbes, Apple News, WebMD, and WikiHow; improved campaign performance through UX principles and A/B tested layouts across responsive web, app, and site placements",
                  ],
                },
                {
                  role: "Visual Designer",
                  company: "ETSIPL, Pizza Stock Exchange & Freelance",
                  period: "2021 – 2022",
                  bullets: [
                    "Branding and promotional materials for 50+ international expos; visual identities, social media content (posts, stories, reels), video editing, and logo design across multiple markets",
                  ],
                },
              ].map((job, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: i < 4 ? "13px" : "0",
                    paddingBottom: i < 4 ? "13px" : "0",
                    borderBottom: i < 4 ? "1px solid #141414" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "7px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          color: "#efefef",
                          fontSize: "11px",
                          fontWeight: 800,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {job.role}
                      </span>
                      <span
                        style={{
                          color: "#caff00",
                          fontSize: "9.5px",
                          fontWeight: 600,
                        }}
                      >
                        @ {job.company}
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#333",
                        fontSize: "8px",
                        fontFamily: "monospace",
                        flexShrink: 0,
                        marginLeft: "10px",
                      }}
                    >
                      {job.period}
                    </span>
                  </div>
                  {job.bullets.map((bullet, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "7px",
                        marginBottom: j < job.bullets.length - 1 ? "4px" : "0",
                      }}
                    >
                      <span
                        style={{
                          color: "#caff00",
                          fontSize: "8px",
                          flexShrink: 0,
                          marginTop: "2.5px",
                          fontFamily: "monospace",
                        }}
                      >
                        →
                      </span>
                      <span
                        style={{
                          color: "#666",
                          fontSize: "9.5px",
                          lineHeight: 1.6,
                        }}
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </section>

            <Divider />

            {/* EDUCATION */}
            <section>
              <SectionHeader num="03" label="Education" />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {[
                  {
                    degree: "Certification in UX/UI Design",
                    institution: "Google",
                    year: "2023",
                  },
                  {
                    degree: "Bachelor of Arts",
                    institution: "St. Xaviers, Mumbai",
                    year: "2019 – 2021",
                  },
                ].map((edu) => (
                  <div
                    key={edu.institution}
                    style={{
                      backgroundColor: "#0c0c0c",
                      border: "1px solid #1c1c1c",
                      borderRadius: "7px",
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        color: "#caff00",
                        fontSize: "7.5px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      {edu.year}
                    </div>
                    <div
                      style={{
                        color: "#e8e8e8",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        marginBottom: "4px",
                      }}
                    >
                      {edu.degree}
                    </div>
                    <div style={{ color: "#444", fontSize: "9px" }}>
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer strip */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #141414",
              }}
            >
              <span
                style={{
                  color: "#222",
                  fontSize: "8px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                kspportfolio.design
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#caff00",
                  }}
                />
                <span
                  style={{
                    color: "#2e2e2e",
                    fontSize: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionHeader({ num, label }: { num: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        marginBottom: "12px",
      }}
    >
      <span
        style={{
          color: "#caff00",
          fontSize: "8px",
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        {num}
      </span>
      <div
        style={{ flex: 1, height: "1px", backgroundColor: "#1c1c1c" }}
      />
      <span
        style={{
          color: "#272727",
          fontSize: "7.5px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        backgroundColor: "#111",
        marginBottom: "22px",
      }}
    />
  );
}
