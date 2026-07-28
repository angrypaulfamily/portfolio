"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Phone } from "@/lib/supabase";

function SearchIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function KonsaPhoneHome() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Phone[]>([]);
  const [selected, setSelected] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = query.trim();
    debounceRef.current = setTimeout(() => {
      if (trimmed.length < 2) {
        setResults([]);
        setShowDropdown(false);
        return;
      }
      setLoading(true);
      fetch(`/api/phones?q=${encodeURIComponent(trimmed)}`)
        .then((r) => r.json())
        .then((d) => { setResults(d.phones ?? []); setShowDropdown(true); })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, trimmed.length < 2 ? 0 : 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowDropdown(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggleSelect(phone: Phone) {
    setSelected((prev) => {
      if (prev.find((p) => p.id === phone.id)) return prev.filter((p) => p.id !== phone.id);
      if (prev.length >= 2) return [prev[1], phone];
      return [...prev, phone];
    });
    setShowDropdown(false);
    setQuery("");
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-kp), sans-serif" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 40%, #1B3A6B 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10 bg-white" />

        <div className="relative max-w-2xl mx-auto px-4 py-14 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            🇮🇳 India ka Phone Advisor
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3">
            KonsaPhone?<br />Ab Pata Chalega.
          </h1>

          <p className="text-lg sm:text-xl text-white/85 font-medium mb-10 max-w-md mx-auto leading-relaxed">
            Apna budget aur zarurat batao — Priya bata degi konsa phone lena hai.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => router.push("/konsaphone/quiz")}
              className="px-10 py-5 rounded-2xl font-black text-xl bg-white text-[#FF6B00] shadow-2xl hover:shadow-[0_8px_40px_rgba(255,107,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Priya se poocho 🧑‍💼
            </button>
            <p className="text-white/55 text-sm mt-1">2 sawaal, seedha jawaab</p>
          </div>

          {/* Secondary — compare link */}
          <div className="mt-8">
            {!showCompare ? (
              <button
                onClick={() => setShowCompare(true)}
                className="text-white/60 text-sm underline underline-offset-2 hover:text-white/90 transition-colors"
              >
                Do phones already shortlist kiye? Compare karo →
              </button>
            ) : (
              <div className="mt-4 max-w-md mx-auto">
                <div ref={searchRef} className="relative">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <SearchIcon />
                    </div>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Phone search karo... (e.g. Redmi Note 13)"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-gray-900 text-sm font-medium shadow-xl outline-none focus:ring-4 focus:ring-orange-300"
                      autoFocus
                      onFocus={() => results.length > 0 && setShowDropdown(true)}
                    />
                    {loading && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {showDropdown && results.length > 0 && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-60 overflow-y-auto">
                      {results.map((phone) => (
                        <button
                          key={phone.id}
                          onClick={() => toggleSelect(phone)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0 text-left"
                        >
                          <span className="text-lg">📱</span>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{phone.name}</p>
                            <p className="text-xs text-gray-500">{phone.brand} · ₹{phone.price_inr.toLocaleString("en-IN")}</p>
                          </div>
                          {selected.find((p) => p.id === phone.id) && (
                            <span className="ml-auto text-[#FF6B00] font-bold text-xs">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  {showDropdown && results.length === 0 && !loading && query.length >= 2 && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl p-4 text-gray-500 text-sm z-50">
                      Koi phone nahi mila. Try karo: Samsung, Redmi, OnePlus...
                    </div>
                  )}
                </div>

                {selected.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {selected.map((p) => (
                      <span key={p.id} className="flex items-center gap-2 bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        📱 {p.name}
                        <button onClick={() => toggleSelect(p)} className="hover:text-red-300">×</button>
                      </span>
                    ))}
                  </div>
                )}

                {selected.length === 2 && (
                  <button
                    onClick={() => router.push(`/konsaphone/compare?p1=${selected[0].id}&p2=${selected[1].id}`)}
                    className="mt-3 w-full py-3 rounded-2xl font-black text-sm bg-white text-[#FF6B00] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Compare Karo! →
                  </button>
                )}
                {selected.length < 2 && (
                  <p className="text-white/50 text-xs text-center mt-2">
                    {2 - selected.length} aur phone select karo
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-xl font-black text-gray-900 text-center mb-8">Kaise kaam karta hai?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Budget batao", desc: "Apna budget aur priority Priya ko batao", emoji: "💰" },
            { step: "2", title: "Top phones dekho", desc: "Priya top matching phones filter karti hai — free mein", emoji: "📱" },
            { step: "3", title: "Seedha jawaab lo", desc: "Confused ho toh Priya ka Verdict lo — ₹49 mein clear decision", emoji: "🧑‍💼" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <div className="w-7 h-7 rounded-full bg-[#FF6B00] text-white font-black text-xs flex items-center justify-center mx-auto mb-2">
                {item.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => router.push("/konsaphone/quiz")}
            className="px-8 py-4 rounded-2xl font-black text-base bg-[#FF6B00] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Priya se poocho — free hai! 🚀
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 text-center py-6 text-sm px-4">
        <p className="font-bold text-white mb-1">KonsaPhone 🇮🇳</p>
        <p className="mb-1">India ke liye, India ke logon ke liye · Made with ❤️ in India</p>
        <p className="text-xs text-gray-600">
          Affiliate links se hume commission milta hai · Priya ka Verdict AI-generated hai, please independently verify before purchase · ₹49 payment non-refundable hai
        </p>
      </div>
    </div>
  );
}
