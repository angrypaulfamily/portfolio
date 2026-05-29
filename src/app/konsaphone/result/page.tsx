"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const USE_CASES = [
  { id: "gaming", label: "🎮 Gaming", desc: "BGMI, Free Fire, heavy games" },
  { id: "camera", label: "📸 Camera", desc: "Photos, videos, reels" },
  { id: "daily", label: "📱 Roz ka kaam", desc: "Calls, WhatsApp, YouTube" },
  { id: "all", label: "✨ Sab kuch", desc: "Mix of everything" },
];

const HOURS = [
  { id: "2-4", label: "2–4 Ghante", desc: "Light user" },
  { id: "4-7", label: "4–7 Ghante", desc: "Average user" },
  { id: "7+", label: "7+ Ghante", desc: "Heavy user" },
];

const YEARS = [
  { id: "1-2", label: "1–2 Saal", desc: "Upgrade kar lunga jaldi" },
  { id: "2-3", label: "2–3 Saal", desc: "Thoda lamba chalana hai" },
  { id: "3+", label: "3+ Saal", desc: "Lambe time ke liye chahiye" },
];

function ChoiceButton({
  selected,
  onClick,
  label,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border-2 p-3 text-left transition-all duration-150 ${
        selected ? "border-[#FF6B00] bg-orange-50 shadow-md" : "border-gray-200 bg-white hover:border-orange-300"
      }`}
    >
      <div className="font-bold text-sm text-gray-900">{label}</div>
      <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
    </button>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");
  const phoneIds = searchParams.get("phone_ids")?.split(",") ?? [];
  const tier = searchParams.get("tier") as "pick" | "full";

  const [step, setStep] = useState<"questions" | "loading" | "verdict">("questions");
  const [useCase, setUseCase] = useState("");
  const [hours, setHours] = useState("");
  const [years, setYears] = useState("");
  const [verdict, setVerdict] = useState("");
  const [error, setError] = useState("");

  const canSubmit = useCase && hours && years;

  const fetchVerdict = useCallback(async () => {
    if (!orderId) return;
    setStep("loading");
    try {
      const res = await fetch("/api/verdict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          phone_ids: phoneIds,
          tier,
          answers: { use_case: useCase, hours, years },
        }),
      });
      const data = await res.json();
      if (data.verdict) {
        setVerdict(data.verdict);
        setStep("verdict");
      } else {
        setError(data.error ?? "Kuch gadbad ho gayi");
        setStep("questions");
      }
    } catch {
      setError("Network error — please try again");
      setStep("questions");
    }
  }, [orderId, phoneIds, tier, useCase, hours, years]);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="font-bold text-lg text-gray-800 mb-4">Invalid link!</p>
          <button onClick={() => router.push("/konsaphone")} className="bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold">
            Ghar Wapas Jao
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 shadow-md"
        style={{ background: "linear-gradient(90deg, #FF6B00, #1B3A6B)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/konsaphone")} className="text-white/80 hover:text-white font-semibold text-sm">
            ← Home
          </button>
          <span className="text-white font-black text-lg">Priya ka Jawab</span>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Priya intro */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
            🧑‍💼
          </div>
          <div className="bg-white rounded-2xl rounded-tl-none shadow-lg p-4 flex-1 border border-orange-100">
            <p className="font-bold text-[#FF6B00] text-sm mb-1">Priya</p>
            <p className="text-gray-800 text-sm leading-relaxed">
              {step === "verdict"
                ? "Yeh raha tera personalized suggestion! Maine sab kuch dhyan mein rakha — teri zaroorat, budget, aur use case. 😊"
                : "Arre waah, sahi kiya Priya ko chuna! Bas 3 quick sawaal — main teri perfect recommendation ready karti hoon! 🎯"}
            </p>
          </div>
        </div>

        {/* Questions */}
        {step === "questions" && (
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                ⚠️ {error}
              </div>
            )}

            <div>
              <h3 className="font-black text-gray-900 mb-3">
                Q1. Phone mainly kisliye use karoge? 📱
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {USE_CASES.map((u) => (
                  <ChoiceButton
                    key={u.id}
                    selected={useCase === u.id}
                    onClick={() => setUseCase(u.id)}
                    label={u.label}
                    desc={u.desc}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-gray-900 mb-3">
                Q2. Din mein kitne ghante phone use karte ho? ⏰
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {HOURS.map((h) => (
                  <ChoiceButton
                    key={h.id}
                    selected={hours === h.id}
                    onClick={() => setHours(h.id)}
                    label={h.label}
                    desc={h.desc}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-gray-900 mb-3">
                Q3. Kitne saal tak phone chalana chahte ho? 📅
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {YEARS.map((y) => (
                  <ChoiceButton
                    key={y.id}
                    selected={years === y.id}
                    onClick={() => setYears(y.id)}
                    label={y.label}
                    desc={y.desc}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={fetchVerdict}
              disabled={!canSubmit}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${
                canSubmit
                  ? "bg-[#FF6B00] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {canSubmit ? "Priya, bata de! 🚀" : "Pehle sawaalon ka jawab do"}
            </button>
          </div>
        )}

        {/* Loading */}
        {step === "loading" && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4 animate-bounce">🧑‍💼</div>
            <div className="w-10 h-10 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-gray-700 text-lg mb-2">Priya soch rahi hai...</p>
            <p className="text-gray-500 text-sm">Teri zaroorat ke hisaab se best option dhundh rahi hai 🔍</p>
          </div>
        )}

        {/* Verdict */}
        {step === "verdict" && verdict && (
          <div className="space-y-4">
            {/* Chat bubble */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl flex-shrink-0">
                🧑‍💼
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none shadow-xl p-5 flex-1 border border-orange-100">
                <p className="font-bold text-[#FF6B00] text-sm mb-3">Priya ka Verdict ✨</p>
                <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{verdict}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-4 border border-orange-100">
              <p className="text-center text-gray-600 text-sm mb-3">
                Dost ko bhi help chahiye? 👇
              </p>
              <button
                onClick={() => router.push("/konsaphone")}
                className="w-full bg-[#FF6B00] text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                Aur phones compare karo →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="w-12 h-12 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
