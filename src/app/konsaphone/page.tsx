"use client";

import { useState, useEffect, useRef } from "react";
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

function PhoneCard({ phone, selected, onSelect }: { phone: Phone; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full text-left rounded-2xl border-2 transition-all duration-200 p-4 ${
        selected
          ? "border-[#FF6B00] bg-orange-50 shadow-lg shadow-orange-200"
          : "border-gray-200 bg-white hover:border-[#FF6B00]/50 hover:shadow-md"
      }`}
    >
      {selected && (
        <span className="absolute top-3 right-3 bg-[#FF6B00] text-white text-xs font-bold px-2 py-1 rounded-full">
          ✓ Selected
        </span>
      )}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-blue-100 flex items-center justify-center text-2xl">
          📱
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 truncate">{phone.name}</p>
          <p className="text-sm text-gray-500">{phone.brand}</p>
          <p className="text-[#FF6B00] font-bold text-sm">₹{phone.price_inr.toLocaleString("en-IN")}</p>
        </div>
      </div>
      <div className="flex gap-3 mt-3 text-xs text-gray-500">
        <span>📷 {phone.camera_mp}MP</span>
        <span>🔋 {phone.battery_mah}mAh</span>
        <span>⚡ {phone.ram_gb}GB RAM</span>
        {phone.has_5g && <span className="text-green-600 font-semibold">5G</span>}
      </div>
    </button>
  );
}

export default function KonsaPhoneHome() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Phone[]>([]);
  const [popular, setPopular] = useState<Phone[]>([]);
  const [selected, setSelected] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/phones?popular=true")
      .then((r) => r.json())
      .then((d) => setPopular(d.phones ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      fetch(`/api/phones?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((d) => {
          setResults(d.phones ?? []);
          setShowDropdown(true);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 300);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
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

  function handleCompare() {
    if (selected.length === 2) {
      router.push(`/konsaphone/compare?p1=${selected[0].id}&p2=${selected[1].id}`);
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-kp), sans-serif" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 40%, #1B3A6B 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10 bg-white" />

        <div className="relative max-w-2xl mx-auto px-4 py-12 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            🇮🇳 India ka Phone Advisor
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3">
            KonsaPhone?
          </h1>
          <p className="text-2xl sm:text-3xl font-bold opacity-90 mb-2">Ab pata chalega. 🎯</p>
          <p className="text-white/75 text-base sm:text-lg mb-8">
            2 phones compare karo — free mein. Confused ho toh Priya help karegi!
          </p>

          {/* Search */}
          <div ref={searchRef} className="relative max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Phone search karo... (e.g. Redmi Note 13)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-base font-medium shadow-2xl outline-none focus:ring-4 focus:ring-orange-300"
                onFocus={() => results.length > 0 && setShowDropdown(true)}
              />
              {loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {showDropdown && results.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-72 overflow-y-auto">
                {results.map((phone) => (
                  <button
                    key={phone.id}
                    onClick={() => toggleSelect(phone)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0 text-left"
                  >
                    <span className="text-xl">📱</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{phone.name}</p>
                      <p className="text-xs text-gray-500">
                        {phone.brand} · ₹{phone.price_inr.toLocaleString("en-IN")}
                      </p>
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

          {/* Selected chips */}
          {selected.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {selected.map((p) => (
                <span
                  key={p.id}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur text-white text-sm font-semibold px-3 py-1.5 rounded-full"
                >
                  📱 {p.name}
                  <button onClick={() => toggleSelect(p)} className="hover:text-red-300 transition-colors">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Compare CTA */}
          <button
            onClick={handleCompare}
            disabled={selected.length < 2}
            className={`mt-5 px-8 py-4 rounded-2xl font-black text-lg transition-all duration-200 ${
              selected.length === 2
                ? "bg-white text-[#FF6B00] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                : "bg-white/30 text-white/60 cursor-not-allowed"
            }`}
          >
            {selected.length === 2 ? "Compare Karo! →" : `${2 - selected.length} aur phone chunlo`}
          </button>
        </div>
      </div>

      {/* Popular Phones */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-8 rounded-full bg-[#FF6B00]" />
          <h2 className="text-xl font-black text-gray-900">Popular Phones 🔥</h2>
          <div className="h-1 flex-1 rounded-full bg-gray-100" />
        </div>

        {popular.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popular.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                selected={!!selected.find((p) => p.id === phone.id)}
                onSelect={() => toggleSelect(phone)}
              />
            ))}
          </div>
        )}

        {popular.length > 0 && selected.length < 2 && (
          <p className="text-center text-gray-400 text-sm mt-6">
            👆 2 phones select karo ya ऊपर search karo
          </p>
        )}
      </div>

      {/* How it works */}
      <div className="bg-[#1B3A6B] text-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-8">Kaise kaam karta hai? 🤔</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Phone Chunlo", desc: "2 phones search karo ya popular list se select karo", emoji: "🔍" },
              { step: "2", title: "Compare Dekho", desc: "Side-by-side specs — plain Hindi mein, no jargon", emoji: "📊" },
              { step: "3", title: "Priya se Pucho", desc: "₹49 mein Priya batayegi — exactly konsa lena chahiye", emoji: "🧑‍💼" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="w-8 h-8 rounded-full bg-[#FF6B00] text-white font-black text-sm flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 text-center py-6 text-sm px-4">
        <p className="font-bold text-white mb-1">KonsaPhone 🇮🇳</p>
        <p>India ke liye, India ke logon ke liye · Made with ❤️ in India</p>
      </div>
    </div>
  );
}
