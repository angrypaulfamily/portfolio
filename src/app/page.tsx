"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const DM = "var(--font-dm, 'DM Mono', monospace)";
const SP = "var(--font-space, 'Space Grotesk', sans-serif)";

// 3 × 3 grid layout. Center cell (1,1) is the WORK HUB.
// Total canvas = 300vw × 300vh.
type Sec = { id: string; label: string; col: number; row: number; headingId: string };
const SECTIONS: Sec[] = [
  { id: "identity",    label: "Identity",    col: 0, row: 0, headingId: "h-identity" },
  { id: "declaration", label: "Statement",   col: 1, row: 0, headingId: "h-declaration" },
  { id: "proof",       label: "Proof",       col: 2, row: 0, headingId: "h-proof" },
  { id: "mumbai",      label: "Mumbai",      col: 0, row: 1, headingId: "h-mumbai" },
  { id: "highlights",  label: "Highlights",  col: 1, row: 1, headingId: "h-highlights" },
  { id: "bangkok",     label: "Bangkok",     col: 2, row: 1, headingId: "h-bangkok" },
  { id: "contact",     label: "Contact",     col: 1, row: 2, headingId: "h-contact" },
  { id: "work",        label: "Work",        col: 2, row: 2, headingId: "h-work" },
];

const works = [
  { n: "01", title: "Royi Sal",         tag: "UI/UX · Web · Research",     kpi: "CR: 3.6% → 13.8%",         slug: "royi-sal" },
  { n: "02", title: "Media.net",        tag: "Ad Design · Web · UI/UX",    kpi: "Forbes · Apple · WebMD",    slug: "media-net" },
  { n: "03", title: "Luags Gallery",    tag: "Branding · Shopify · UI/UX", kpi: "First LuAG stone to market", slug: "luags-gallery" },
  { n: "04", title: "Heyoka Gallery",   tag: "Branding · Shopify · UI/UX", kpi: "Sacred art → digital",      slug: "heyoka-gallery" },
  { n: "05", title: "Graphic & Motion", tag: "Social · Branding · Video",  kpi: "50+ international expos",   slug: "graphic-design" },
];

// Hub direction previews — point in the direction of each section on the canvas.
const PREVIEWS: { to: string; label: string; teaser: string; arrow: string; gridPos: string }[] = [
  { to: "identity",    label: "01 · IDENTITY",  teaser: "Keith Paul · UI/UX Designer",         arrow: "↖", gridPos: "top-left"     },
  { to: "declaration", label: "02 · STATEMENT", teaser: "I own the full process.",             arrow: "↑", gridPos: "top-center"   },
  { to: "proof",       label: "03 · PROOF",     teaser: "+54.9% forms · +23% engagement",      arrow: "↗", gridPos: "top-right"    },
  { to: "mumbai",      label: "04 · MUMBAI",    teaser: "Where it started · 2019–2022",        arrow: "←", gridPos: "middle-left"  },
  { to: "bangkok",     label: "06 · BANGKOK",   teaser: "Where it is now · 2022–Now",          arrow: "→", gridPos: "middle-right" },
  { to: "contact",     label: "07 · CONTACT",   teaser: "keithpaul00@gmail.com",               arrow: "↓", gridPos: "bottom-center" },
  { to: "work",        label: "08 · CASE STUDIES", teaser: "5 projects · Royi Sal, Media.net…", arrow: "↘", gridPos: "bottom-right" },
];

// ─── Reduced-motion hook ─────────────────────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setLive(true); }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    if (reduced) { setVal(to); return; }
    const t0 = performance.now();
    const dur = 1400;
    let raf = 0;
    function tick(now: number) {
      const p = Math.min((now - t0) / dur, 1);
      setVal((1 - Math.pow(1 - p, 4)) * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live, to, reduced]);

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

// ─── Mini-map (visual aid) ────────────────────────────────────────────────────
function MiniMap({ current, goTo, scrollRef }: {
  current: string;
  goTo: (id: string) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [vp, setVp] = useState({ x: 33.3, y: 33.3 });
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setVp({
          x: (el.scrollLeft / (3 * window.innerWidth)) * 100,
          y: (el.scrollTop / (3 * window.innerHeight)) * 100,
        });
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [scrollRef]);

  const grid: (string | null)[][] = [
    ["identity", "declaration", "proof"],
    ["mumbai", "highlights", "bangkok"],
    [null, "contact", "work"],
  ];

  return (
    <div className="canvas-only fixed bottom-5 right-5 z-40 bg-white border border-black/10 rounded p-2 shadow-sm" aria-hidden="true">
      <div className="relative grid grid-cols-3 grid-rows-3 gap-1 w-[88px] h-[88px]">
        {grid.flatMap((row, ri) => row.map((s, ci) => (
          <button
            key={`${ri}-${ci}`}
            type="button"
            onClick={() => s && goTo(s)}
            disabled={!s}
            tabIndex={-1}
            aria-hidden="true"
            className={`rounded-[2px] transition-colors ${
              !s ? "bg-transparent cursor-default"
                : s === current ? "bg-[#ff2d00]"
                : "bg-black/[0.08] hover:bg-black/30 cursor-pointer"
            }`}
          />
        )))}
        <div
          className="absolute border-[1.5px] border-black pointer-events-none rounded-[2px]"
          style={{ left: `${vp.x}%`, top: `${vp.y}%`, width: `${100 / 3}%`, height: `${100 / 3}%` }}
        />
      </div>
    </div>
  );
}

// ─── Hub preview card ─────────────────────────────────────────────────────────
function PreviewCard({ data, goTo, align = "left" }: {
  data: typeof PREVIEWS[number];
  goTo: (id: string) => void;
  align?: "left" | "right" | "center";
}) {
  const justify = align === "right" ? "justify-end" : align === "center" ? "justify-center" : "justify-start";
  const text = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";
  const flexDir = align === "right" ? "flex-row-reverse" : "flex-row";

  return (
    <button
      type="button"
      onClick={() => goTo(data.to)}
      className={`canvas-focus group block px-3 py-2.5 rounded-md hover:bg-black/[0.04] transition-colors max-w-[200px] w-full md:w-auto ${text}`}
      aria-label={`Navigate to ${data.label}. ${data.teaser}.`}
    >
      <div className={`flex ${flexDir} items-center gap-2 mb-1 ${justify}`}>
        <span aria-hidden className="text-base font-bold text-black/50 group-hover:text-black transition-colors" style={{ fontFamily: SP }}>
          {data.arrow}
        </span>
        <span className="text-[9px] text-black/55 group-hover:text-black uppercase tracking-[0.25em] font-bold transition-colors" style={{ fontFamily: DM }}>
          {data.label}
        </span>
      </div>
      <p className="text-[12px] md:text-[13px] font-bold text-black/80 leading-snug" style={{ fontFamily: SP }}>
        {data.teaser}
      </p>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState("highlights");
  const [showHint, setShowHint] = useState(true);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  // Center the canvas on the WORK cell at first paint, then reveal
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollLeft = window.innerWidth;
        el.scrollTop = window.innerHeight;
        setReady(true);
      });
    });
  }, []);

  // Show native cursor on this page (overrides the global cursor:none rule)
  useEffect(() => {
    document.body.classList.add("cursor-native");
    return () => document.body.classList.remove("cursor-native");
  }, []);

  const goTo = useCallback((id: string) => {
    const s = SECTIONS.find(s => s.id === id);
    const el = scrollRef.current;
    if (!s || !el) return;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    el.scrollTo({
      left: s.col * window.innerWidth,
      top: s.row * window.innerHeight,
      behavior,
    });
    const delay = reduced ? 0 : 600;
    setTimeout(() => {
      const h = document.getElementById(s.headingId);
      h?.focus({ preventScroll: true });
    }, delay);
  }, [reduced]);

  // Track current section by viewport center
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cx = el.scrollLeft + window.innerWidth / 2;
        const cy = el.scrollTop + window.innerHeight / 2;
        const col = Math.max(0, Math.min(2, Math.floor(cx / window.innerWidth)));
        const row = Math.max(0, Math.min(2, Math.floor(cy / window.innerHeight)));
        const s = SECTIONS.find(s => s.col === col && s.row === row);
        if (s) setCurrent(s.id);
      });
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => { el.removeEventListener("scroll", update); cancelAnimationFrame(raf); };
  }, []);

  // Hide hint on first scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hide = () => setShowHint(false);
    el.addEventListener("scroll", hide, { once: true, passive: true });
    return () => el.removeEventListener("scroll", hide);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || t.isContentEditable) return;
      }
      const el = scrollRef.current;
      if (!el) return;
      const w = window.innerWidth, h = window.innerHeight;
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
      switch (e.key) {
        case "ArrowRight": el.scrollTo({ left: el.scrollLeft + w, top: el.scrollTop, behavior }); e.preventDefault(); break;
        case "ArrowLeft":  el.scrollTo({ left: el.scrollLeft - w, top: el.scrollTop, behavior }); e.preventDefault(); break;
        case "ArrowDown":  el.scrollTo({ left: el.scrollLeft, top: el.scrollTop + h, behavior }); e.preventDefault(); break;
        case "ArrowUp":    el.scrollTo({ left: el.scrollLeft, top: el.scrollTop - h, behavior }); e.preventDefault(); break;
        case "Home":       el.scrollTo({ left: w, top: h, behavior }); e.preventDefault(); break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);

  // Drag-to-pan with mouse
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let dragging = false;
    let sx = 0, sy = 0, sl = 0, st = 0;
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, input, textarea, [role='button']")) return;
      dragging = true; sx = e.clientX; sy = e.clientY; sl = el.scrollLeft; st = el.scrollTop;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      el.scrollLeft = sl - (e.clientX - sx);
      el.scrollTop = st - (e.clientY - sy);
    };
    const onUp = () => { dragging = false; el.style.cursor = ""; };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const currentLabel = SECTIONS.find(s => s.id === current)?.label ?? "";

  return (
    <>
      {/* Skip link */}
      <a href="#h-highlights" className="sr-only-x focus:not-sr-only-x fixed top-3 left-3 z-[100] bg-black text-white font-bold text-xs uppercase tracking-wider rounded">
        Skip to main content
      </a>

      {/* Live region */}
      <div className="sr-only-x" aria-live="polite" aria-atomic="true">
        Currently viewing: {currentLabel}
      </div>

      {/* TOP NAV */}
      <header role="banner" className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-sm border-b border-black/[0.06]">
        <div className="flex items-center justify-between px-5 md:px-9 h-14">
          <p className="flex items-center gap-2.5 m-0">
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#ff2d00] signal-pulse" />
            <span className="text-[10px] text-black/70 uppercase tracking-[0.3em] font-bold" style={{ fontFamily: DM }}>
              Keith Paul · Available
            </span>
          </p>
          <nav aria-label="Section navigation">
            <ul className="flex items-center gap-0.5">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(s.id)}
                    aria-current={current === s.id ? "page" : undefined}
                    aria-label={`Go to section ${i + 1}: ${s.label}`}
                    className={`canvas-focus px-2.5 md:px-3 py-2 text-[10px] uppercase tracking-[0.2em] font-bold rounded transition-colors ${
                      current === s.id ? "text-black" : "text-black/45 hover:text-black"
                    }`}
                    style={{ fontFamily: DM }}
                  >
                    <span className="hidden md:inline">{String(i + 1).padStart(2, "0")} </span>
                    <span>{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* HINT */}
      {showHint && !reduced && ready && (
        <div role="status" className="canvas-only fixed bottom-7 left-1/2 -translate-x-1/2 z-40 bg-black text-white px-5 py-3 rounded-full shadow-lg pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold" style={{ fontFamily: DM }}>
            Pan in any direction · or click any preview
          </span>
        </div>
      )}

      {/* MINI MAP */}
      <MiniMap current={current} goTo={goTo} scrollRef={scrollRef} />

      {/* ── 2D CANVAS ────────────────────────────────────────────────── */}
      <main
        id="main-content"
        ref={scrollRef}
        className={`canvas-container fixed inset-x-0 bottom-0 top-14 overflow-scroll bg-white transition-opacity duration-200 ${ready ? "opacity-100" : "opacity-0"}`}
        tabIndex={0}
        aria-label="Portfolio canvas. Starts centered on Work. Pan in any direction or use arrow keys."
        style={{ cursor: "grab", fontFamily: SP }}
      >
        <div className="canvas-grid relative" style={{ width: "300vw", height: "300vh" }}>

          {/* Decorative grid guides */}
          <svg aria-hidden="true" className="canvas-only absolute inset-0 pointer-events-none" width="100%" height="100%" preserveAspectRatio="none">
            <line x1="33.333%" y1="0" x2="33.333%" y2="100%" stroke="#000" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="3 8" />
            <line x1="66.666%" y1="0" x2="66.666%" y2="100%" stroke="#000" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="3 8" />
            <line x1="0" y1="33.333%" x2="100%" y2="33.333%" stroke="#000" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="3 8" />
            <line x1="0" y1="66.666%" x2="100%" y2="66.666%" stroke="#000" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="3 8" />
          </svg>

          {/* ═════════════════════════════════
              HIGHLIGHTS / HUB (col 1, row 1) — DEFAULT VIEW
              What I deliver. The number that hits, then capabilities.
              First in DOM so mobile/SR users see this first.
          ═════════════════════════════════ */}
          <section
            aria-labelledby="h-highlights"
            className="canvas-section absolute"
            style={{ left: "100vw", top: "100vh", width: "100vw", height: "100vh" }}
          >
            <div className="w-full h-full grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] gap-3 md:gap-6 p-6 md:p-10">

              {/* TOP ROW — Identity (NW), Statement (N), Proof (NE) */}
              <PreviewCard data={PREVIEWS[0]} goTo={goTo} align="left" />
              <div className="flex justify-center"><PreviewCard data={PREVIEWS[1]} goTo={goTo} align="center" /></div>
              <div className="flex justify-end"><PreviewCard data={PREVIEWS[2]} goTo={goTo} align="right" /></div>

              {/* MIDDLE ROW — Mumbai (W), HIGHLIGHTS (center), Bangkok (E) */}
              <div className="flex items-center"><PreviewCard data={PREVIEWS[3]} goTo={goTo} align="left" /></div>

              <div className="flex flex-col justify-center min-w-0 px-3 md:px-8">
                <p
                  className="text-[10px] text-black/55 uppercase tracking-[0.3em] mb-3 font-bold"
                  style={{ fontFamily: DM }}
                >
                  05 · WHAT I DELIVER
                </p>

                <h2
                  id="h-highlights"
                  tabIndex={-1}
                  className="canvas-focus text-[6.5vw] md:text-[3.2vw] font-black uppercase leading-[1.0] tracking-[-0.04em] text-black mb-5"
                >
                  I design{" "}
                  <span className="text-[#cc2400]">what converts.</span>
                </h2>

                {/* Hero proof number */}
                <div className="mb-5 border-y border-black/15 py-4">
                  <div className="flex items-end gap-3 md:gap-4 flex-wrap">
                    <span className="text-[10vw] md:text-[4.5vw] font-black leading-none text-black/30 line-through tabular-nums">
                      3.6%
                    </span>
                    <span aria-hidden className="text-[7vw] md:text-[3vw] font-black leading-none text-[#ff2d00]">→</span>
                    <span className="text-[10vw] md:text-[4.5vw] font-black leading-none text-black tabular-nums">
                      13.8%
                    </span>
                  </div>
                  <p
                    className="text-[10px] md:text-[11px] text-black/65 uppercase tracking-[0.2em] mt-2 font-bold"
                    style={{ fontFamily: DM }}
                  >
                    Tripled conversion · +54.9% forms · +23% engagement
                  </p>
                </div>

                {/* Capabilities */}
                <ul
                  className="space-y-1.5 text-[13px] md:text-[14px] text-black/85 leading-snug"
                  aria-label="Capabilities"
                >
                  {[
                    "End-to-end UX — research, design, developer handoff",
                    "Conversion rate optimization (CRO)",
                    "Brand identity from zero · Shopify · Mobile-first",
                    "Design systems · WCAG accessibility",
                    "AI workflows — Claude, v0, Cursor, Midjourney",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span aria-hidden className="text-[#cc2400] font-bold shrink-0">+</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end"><PreviewCard data={PREVIEWS[4]} goTo={goTo} align="right" /></div>

              {/* BOTTOM ROW — empty (SW), Contact (S), Work (SE) */}
              <div />
              <div className="flex justify-center"><PreviewCard data={PREVIEWS[5]} goTo={goTo} align="center" /></div>
              <div className="flex justify-end"><PreviewCard data={PREVIEWS[6]} goTo={goTo} align="right" /></div>
            </div>
          </section>

          {/* ═════════════════════════════════ WORK / CASE STUDIES (col 2, row 2) ═════════════════════════════════ */}
          <section
            aria-labelledby="h-work"
            className="canvas-section absolute"
            style={{ left: "200vw", top: "200vh", width: "100vw", height: "100vh" }}
          >
            <div className="relative w-full h-full px-7 md:px-12 py-12 flex flex-col justify-center">
              <p
                className="text-[10px] text-black/30 uppercase tracking-[0.3em] mb-4"
                style={{ fontFamily: DM }}
              >
                08 · CASE STUDIES
              </p>

              <h2
                id="h-work"
                tabIndex={-1}
                className="canvas-focus text-[10vw] md:text-[5vw] font-black uppercase leading-none tracking-[-0.04em] text-black mb-10"
              >
                Selected work.
              </h2>

              <ul className="border-t border-black/15">
                {works.map((w) => (
                  <li key={w.slug}>
                    <Link
                      href={`/projects/${w.slug}`}
                      className="canvas-focus group flex items-baseline gap-3 md:gap-6 py-3 md:py-4 border-b border-black/10 hover:border-black/30 transition-colors"
                    >
                      <span
                        className="text-[10px] text-black/55 group-hover:text-[#cc2400] transition-colors shrink-0 w-7 tabular-nums font-bold"
                        style={{ fontFamily: DM }}
                      >
                        {w.n}
                      </span>
                      <span className="text-[5vw] md:text-[2.2vw] font-black uppercase tracking-[-0.04em] text-black flex-1 leading-none">
                        {w.title}
                      </span>
                      <span
                        className="hidden md:block text-[10px] text-black/55 uppercase tracking-[0.18em] shrink-0 font-bold"
                        style={{ fontFamily: DM }}
                      >
                        {w.kpi}
                      </span>
                      <span aria-hidden className="text-sm text-black/40 group-hover:text-[#cc2400] transition-colors shrink-0">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ═════════════════════════════════ IDENTITY (col 0, row 0) ═════════════════════════════════ */}
          <section aria-labelledby="h-identity" className="canvas-section absolute" style={{ left: "0vw", top: "0vh", width: "100vw", height: "100vh" }}>
            <div className="relative w-full h-full px-7 md:px-12 py-12 flex flex-col justify-center">
              <p className="text-[10px] text-black/30 uppercase tracking-[0.3em] mb-4" style={{ fontFamily: DM }}>01 · IDENTITY</p>
              <h1 id="h-identity" tabIndex={-1} className="canvas-focus text-[18vw] md:text-[13vw] font-black uppercase leading-[0.85] tracking-[-0.05em] text-black">KEITH</h1>
              <p className="text-[18vw] md:text-[13vw] font-black uppercase leading-[0.85] tracking-[-0.05em] text-black/[0.08]">PAUL.</p>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
                {[["5+", "Years"], ["10+", "Clients"], ["3", "Countries"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-3xl md:text-4xl font-black text-black">{v}</p>
                    <p className="text-[10px] text-black/55 uppercase tracking-[0.25em] mt-0.5 font-bold" style={{ fontFamily: DM }}>{l}</p>
                  </div>
                ))}
              </div>
              <p className="absolute bottom-7 left-7 md:left-12 text-[10px] text-black/55 uppercase tracking-[0.3em] font-bold" style={{ fontFamily: DM }}>
                MUMBAI → BANGKOK · UI/UX Designer
              </p>
            </div>
          </section>

          {/* ═════════════════════════════════ DECLARATION (col 1, row 0) ═════════════════════════════════ */}
          <section aria-labelledby="h-declaration" className="canvas-section absolute" style={{ left: "100vw", top: "0vh", width: "100vw", height: "100vh" }}>
            <div className="relative w-full h-full px-7 md:px-12 py-12 flex flex-col justify-center overflow-hidden">
              <p className="text-[10px] text-black/30 uppercase tracking-[0.3em] mb-6" style={{ fontFamily: DM }}>02 · STATEMENT</p>
              <h2 id="h-declaration" tabIndex={-1} className="canvas-focus text-[11vw] md:text-[6.5vw] font-black uppercase leading-[1.0] tracking-[-0.04em] text-black">
                I own the<br />
                <span className="text-black/15">full process.</span>
              </h2>
              <ol className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2" style={{ fontFamily: DM }} aria-label="Design process steps">
                {["Research", "Personas", "Wireframes", "Prototypes", "Testing", "Handoff"].map((s, i, arr) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="text-[11px] text-black/70 uppercase tracking-[0.18em] font-bold">{s}</span>
                    {i < arr.length - 1 && <span aria-hidden className="text-black/30">→</span>}
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-xl text-[15px] text-black/75 leading-relaxed">
                Research, user flows, wireframes, prototypes, testing, developer handoff. End-to-end ownership of the design from first interview to last commit.
              </p>
            </div>
          </section>

          {/* ═════════════════════════════════ PROOF (col 2, row 0) ═════════════════════════════════ */}
          <section aria-labelledby="h-proof" className="canvas-section absolute" style={{ left: "200vw", top: "0vh", width: "100vw", height: "100vh" }}>
            <div className="relative w-full h-full px-7 md:px-12 py-12 flex flex-col justify-center">
              <p className="text-[10px] text-black/30 uppercase tracking-[0.3em] mb-2" style={{ fontFamily: DM }}>03 · PROOF</p>
              <h2 id="h-proof" tabIndex={-1} className="canvas-focus sr-only-x">Measured proof from Royi Sal redesign</h2>
              <p className="text-[10px] text-black/65 uppercase tracking-[0.25em] mb-8 font-bold" style={{ fontFamily: DM }}>
                ROYI SAL · 2024–2026 · 3 MONTHS POST-LAUNCH
              </p>
              <div className="mb-8">
                <p className="text-[10px] text-black/55 uppercase tracking-[0.3em] mb-2 font-bold" style={{ fontFamily: DM }}>CONVERSION RATE</p>
                <div className="flex items-end gap-3 md:gap-5 flex-wrap">
                  <span className="text-[11vw] md:text-[6vw] font-black leading-none text-black/30 line-through tabular-nums">3.6%</span>
                  <span aria-hidden className="text-[7vw] md:text-[4vw] font-black leading-none text-[#ff2d00]">→</span>
                  <span className="text-[11vw] md:text-[6vw] font-black leading-none text-black tabular-nums">
                    <Counter to={13.8} decimals={1} suffix="%" />
                  </span>
                </div>
                <p className="text-[10px] text-[#cc2400] uppercase tracking-[0.25em] mt-2 font-bold" style={{ fontFamily: DM }}>+283% increase</p>
              </div>
              <div className="grid grid-cols-2 gap-6 border-t border-black/15 pt-8">
                <div>
                  <p className="text-[10px] text-black/55 uppercase tracking-[0.3em] mb-2 font-bold" style={{ fontFamily: DM }}>Form submissions</p>
                  <p className="text-[8vw] md:text-[4vw] font-black leading-none text-black tabular-nums">+<Counter to={54.9} decimals={1} suffix="%" /></p>
                </div>
                <div>
                  <p className="text-[10px] text-black/55 uppercase tracking-[0.3em] mb-2 font-bold" style={{ fontFamily: DM }}>Session duration</p>
                  <p className="text-[8vw] md:text-[4vw] font-black leading-none text-black tabular-nums">+<Counter to={23} decimals={0} suffix="%" /></p>
                </div>
              </div>
              <p className="mt-8 text-[10px] text-black/50 uppercase tracking-[0.25em] font-bold" style={{ fontFamily: DM }}>
                Google Analytics · Microsoft Clarity · HubSpot
              </p>
            </div>
          </section>

          {/* ═════════════════════════════════ MUMBAI (col 0, row 1) ═════════════════════════════════ */}
          <section aria-labelledby="h-mumbai" className="canvas-section absolute" style={{ left: "0vw", top: "100vh", width: "100vw", height: "100vh" }}>
            <div className="relative w-full h-full px-7 md:px-12 py-12 flex flex-col justify-center">
              <p className="text-[10px] text-black/30 uppercase tracking-[0.3em] mb-4" style={{ fontFamily: DM }}>04 · ORIGIN</p>
              <h2 id="h-mumbai" tabIndex={-1} className="canvas-focus text-[13vw] md:text-[7vw] font-black uppercase tracking-[-0.05em] text-black leading-[0.9] mb-3">MUMBAI</h2>
              <p className="text-[10px] text-black/60 uppercase tracking-[0.3em] mb-10 font-bold" style={{ fontFamily: DM }}>2019 – 2022 · WHERE IT STARTED</p>
              <ul className="space-y-4 max-w-xl">
                {[
                  "50+ international expo branding & promotional materials.",
                  "First brand identities, logos, and web banners.",
                  "Social media content, motion graphics, video editing.",
                  "BA from St. Xavier's Mumbai. Google UX certificate.",
                ].map((s, i) => (
                  <li key={i} className="flex gap-4 text-[14px] md:text-[15px] text-black/80 leading-relaxed">
                    <span aria-hidden className="text-black/35 shrink-0" style={{ fontFamily: DM }}>0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ═════════════════════════════════ BANGKOK (col 2, row 1) ═════════════════════════════════ */}
          <section aria-labelledby="h-bangkok" className="canvas-section absolute" style={{ left: "200vw", top: "100vh", width: "100vw", height: "100vh" }}>
            <div className="relative w-full h-full px-7 md:px-12 py-12 flex flex-col justify-center">
              <p className="text-[10px] text-black/30 uppercase tracking-[0.3em] mb-4" style={{ fontFamily: DM }}>06 · NOW</p>
              <h2 id="h-bangkok" tabIndex={-1} className="canvas-focus text-[13vw] md:text-[7vw] font-black uppercase tracking-[-0.05em] text-black leading-[0.9] mb-3">BANGKOK</h2>
              <p className="text-[10px] text-black/60 uppercase tracking-[0.3em] mb-10 font-bold" style={{ fontFamily: DM }}>2022 – NOW · WHERE IT IS</p>
              <ul className="space-y-4 max-w-xl">
                {[
                  "Forbes, Apple News, WebMD — ad design at Media.net.",
                  "First-to-market luxury gemstone brand (LuAG).",
                  "Full UX ownership — research through developer handoff.",
                  "Conversion rate tripled in three months post-launch.",
                  "AI-integrated workflow: Claude, v0, Midjourney, Cursor.",
                ].map((s, i) => (
                  <li key={i} className="flex gap-4 text-[14px] md:text-[15px] text-black/80 leading-relaxed">
                    <span aria-hidden className="text-black/35 shrink-0" style={{ fontFamily: DM }}>0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ═════════════════════════════════ CONTACT (col 1, row 2) ═════════════════════════════════ */}
          <section aria-labelledby="h-contact" className="canvas-section absolute" style={{ left: "100vw", top: "200vh", width: "100vw", height: "100vh" }}>
            <div className="relative w-full h-full px-7 md:px-12 py-12 flex flex-col justify-center">
              <p className="text-[10px] text-black/30 uppercase tracking-[0.3em] mb-4" style={{ fontFamily: DM }}>07 · REACH OUT</p>
              <h2 id="h-contact" tabIndex={-1} className="canvas-focus text-[10vw] md:text-[5vw] font-black uppercase leading-none tracking-[-0.04em] text-black mb-10">
                Let&apos;s talk.
              </h2>
              <ul className="space-y-3 mb-12">
                <li>
                  <a href="mailto:keithpaul00@gmail.com" className="canvas-focus inline-block font-black tracking-[-0.03em] text-black hover:text-[#cc2400] underline decoration-2 underline-offset-[6px] decoration-black/15 hover:decoration-[#cc2400] transition-colors leading-tight" style={{ fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)" }}>
                    keithpaul00@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+660988087669" className="canvas-focus inline-block font-bold tracking-[-0.02em] text-black/70 hover:text-black transition-colors leading-tight" style={{ fontSize: "clamp(1rem, 2vw, 2rem)" }}>
                    +66 098 808 7669
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/keith-paul-1450241a3/" target="_blank" rel="noopener noreferrer" className="canvas-focus inline-block font-bold tracking-[-0.02em] text-black/70 hover:text-black transition-colors leading-tight" style={{ fontSize: "clamp(1rem, 2vw, 2rem)" }}>
                    LinkedIn <span aria-hidden>↗</span>
                    <span className="sr-only-x">(opens in a new tab)</span>
                  </a>
                </li>
              </ul>
              <p className="text-[10px] text-black/55 uppercase tracking-[0.3em] font-bold" style={{ fontFamily: DM }}>
                Remote · Bangkok, Thailand · © 2026 Keith Paul
              </p>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
