"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Phone } from "@/lib/supabase";
import { cameraVerdict, batteryVerdict, ramVerdict } from "@/lib/specs";
import PriyaVerdictUpsell from "../PriyaVerdictUpsell";

type QuizOption = { id: string; label: string; desc?: string };

const BUDGETS: QuizOption[] = [
  { id: "under-15k", label: "₹15,000 se kam" },
  { id: "15k-25k", label: "₹15,000 – 25,000" },
  { id: "25k-40k", label: "₹25,000 – 40,000" },
  { id: "40k-plus", label: "₹40,000+" },
];

const PRIORITIES: QuizOption[] = [
  { id: "camera", label: "📸 Camera", desc: "Photos, videos, reels" },
  { id: "battery", label: "🔋 Battery", desc: "Poora din chale" },
  { id: "gaming", label: "🎮 Gaming", desc: "BGMI, Free Fire" },
  { id: "all", label: "✨ Sab kuch", desc: "Balanced phone" },
];

const CHARGING: QuizOption[] = [
  { id: "yes", label: "Haan, fast charging chahiye", desc: "65W+ jaldi charge ho" },
  { id: "no", label: "Koi zid nahi", desc: "Normal charging bhi chalega" },
];

const BRANDS: QuizOption[] = [
  { id: "any", label: "Koi bhi brand chalega" },
  { id: "samsung", label: "Samsung" },
  { id: "xiaomi", label: "Redmi / Xiaomi" },
  { id: "oneplus", label: "OnePlus" },
  { id: "realme", label: "Realme" },
  { id: "vivo", label: "Vivo" },
  { id: "oppo", label: "Oppo" },
  { id: "apple", label: "Apple" },
];

function priorityReason(phone: Phone, priority: string): string {
  if (priority === "camera") return `${phone.camera_mp}MP camera — ${cameraVerdict(phone.camera_mp)}`;
  if (priority === "battery") return `${phone.battery_mah}mAh — ${batteryVerdict(phone.battery_mah)}`;
  if (priority === "gaming") return `${phone.ram_gb}GB RAM — ${ramVerdict(phone.ram_gb)}`;
  return phone.best_for ?? "Balanced performance har jagah";
}

function ChoiceButton({
  selected,
  onClick,
  label,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  desc?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border-2 p-3 text-left transition-all duration-150 ${
        selected ? "border-[#FF6B00] bg-orange-50 shadow-md" : "border-gray-200 bg-white hover:border-orange-300"
      }`}
    >
      <div className="font-bold text-sm text-gray-900">{label}</div>
      {desc && <div className="text-xs text-gray-500 mt-0.5">{desc}</div>}
    </button>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState("");
  const [priority, setPriority] = useState("");
  const [charging, setCharging] = useState("");
  const [brand, setBrand] = useState("");
  const [matches, setMatches] = useState<Phone[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = [
    { key: "budget", title: "Budget kitna hai? 💰", options: BUDGETS, value: budget, setValue: setBudget },
    { key: "priority", title: "Sabse zaroori kya hai? 🎯", options: PRIORITIES, value: priority, setValue: setPriority },
    { key: "charging", title: "Fast charging chahiye? ⚡", options: CHARGING, value: charging, setValue: setCharging },
    { key: "brand", title: "Koi brand preference? 📱", options: BRANDS, value: brand, setValue: setBrand },
  ];

  async function handleSelect(setValue: (v: string) => void, value: string) {
    setValue(value);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      await fetchMatches(value);
    }
  }

  async function fetchMatches(finalBrand: string) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        budget,
        priority,
        brand: finalBrand,
        fast_charging: String(charging === "yes"),
      });
      const res = await fetch(`/api/phones?${params.toString()}`);
      const data = await res.json();
      if (data.phones?.length) {
        setMatches(data.phones);
      } else {
        setError("Koi phone nahi mila. Try a different budget.");
      }
    } catch {
      setError("Kuch gadbad ho gayi. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const current = steps[step];

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <div
        className="sticky top-0 z-40 shadow-md"
        style={{ background: "linear-gradient(90deg, #FF6B00, #1B3A6B)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/konsaphone")} className="text-white/80 hover:text-white font-semibold text-sm">
            ← Home
          </button>
          <span className="text-white font-black text-lg">Priya se poocho</span>
          <div className="w-12" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {!matches && !loading && (
          <div>
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === step ? "w-8 bg-[#FF6B00]" : i < step ? "w-2 bg-[#FF6B00]/50" : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm mb-4">
                ⚠️ {error}
              </div>
            )}

            <h2 className="text-2xl font-black text-gray-900 text-center mb-6">{current.title}</h2>
            <div className={`grid gap-3 ${current.options.length > 4 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
              {current.options.map((opt) => (
                <ChoiceButton
                  key={opt.id}
                  selected={current.value === opt.id}
                  onClick={() => handleSelect(current.setValue, opt.id)}
                  label={opt.label}
                  desc={opt.desc}
                />
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 text-gray-400 text-sm hover:text-gray-600 transition-colors"
              >
                ← Pichla sawaal
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4 animate-bounce">🧑‍💼</div>
            <div className="w-10 h-10 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-gray-700 text-lg">Priya dhundh rahi hai best options...</p>
          </div>
        )}

        {matches && !loading && (
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                🧑‍💼
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none shadow-lg p-4 flex-1 border border-orange-100">
                <p className="font-bold text-[#FF6B00] text-sm mb-1">Priya</p>
                <p className="text-gray-800 text-sm leading-relaxed">
                  Yeh raha teri budget aur zaroorat ke hisaab se top matches! 👇
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {matches.map((phone, i) => (
                <div key={phone.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center text-2xl flex-shrink-0">
                      📱
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {i === 0 && (
                          <span className="bg-[#00C853] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            Top Pick
                          </span>
                        )}
                        <p className="font-bold text-gray-900 text-sm">{phone.name}</p>
                      </div>
                      <p className="text-gray-500 text-xs">{phone.brand}</p>
                      <p className="text-[#FF6B00] font-black text-base mt-1">₹{phone.price_inr.toLocaleString("en-IN")}</p>
                      <p className="text-gray-600 text-xs mt-2 leading-relaxed">{priorityReason(phone, priority)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {phone.flipkart_url && (
                      <a
                        href={phone.flipkart_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-[#1B3A6B] text-white text-xs font-bold py-2 rounded-xl hover:bg-blue-900 transition-colors"
                      >
                        Flipkart pe dekho
                      </a>
                    )}
                    {phone.amazon_url && (
                      <a
                        href={phone.amazon_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-gray-900 text-white text-xs font-bold py-2 rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        Amazon pe dekho
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <PriyaVerdictUpsell
              phoneIds={matches.map((p) => p.id)}
              quizAnswers={{ budget, priority, charging, brand }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
