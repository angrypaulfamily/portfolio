"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Phone } from "@/lib/supabase";
import { buildSpecRows, overallWinner, winner } from "@/lib/specs";
import PriyaVerdictUpsell from "../PriyaVerdictUpsell";

function WinnerBadge({ side }: { side: "a" | "b" | "tie" | null; phone?: Phone }) {
  if (!side || side === "tie") return null;
  return (
    <span className="inline-flex items-center gap-1 bg-[#00C853] text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
      🏆 Winner
    </span>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const p1Id = searchParams.get("p1");
  const p2Id = searchParams.get("p2");
  const router = useRouter();

  const [phones, setPhones] = useState<[Phone, Phone] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPhones = useCallback(async () => {
    if (!p1Id || !p2Id) {
      setError("Do phones choose nahi kiye");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/phones?ids=${p1Id},${p2Id}`);
      const data = await res.json();
      if (data.phones?.length === 2) {
        setPhones([data.phones[0], data.phones[1]]);
      } else {
        setError("Phone data nahi mila");
      }
    } catch {
      setError("Kuch gadbad ho gayi");
    } finally {
      setLoading(false);
    }
  }, [p1Id, p2Id]);

  useEffect(() => {
    const id = setTimeout(fetchPhones, 0);
    return () => clearTimeout(id);
  }, [fetchPhones]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Phones load ho rahe hain...</p>
        </div>
      </div>
    );
  }

  if (error || !phones) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-gray-700 font-bold text-lg mb-4">{error || "Kuch gadbad ho gayi"}</p>
          <button onClick={() => router.push("/konsaphone")} className="bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold">
            Wapas Jao
          </button>
        </div>
      </div>
    );
  }

  const [p1, p2] = phones;
  const rows = buildSpecRows(p1, p2);
  const overall = overallWinner(p1, p2);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 shadow-md"
        style={{ background: "linear-gradient(90deg, #FF6B00, #1B3A6B)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/konsaphone")} className="text-white/80 hover:text-white font-semibold text-sm flex items-center gap-1">
            ← Wapas
          </button>
          <span className="text-white font-black text-lg">KonsaPhone</span>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Phone headers */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[p1, p2].map((phone, i) => (
            <div
              key={phone.id}
              className="rounded-2xl p-4 text-center"
              style={{ background: i === 0 ? "linear-gradient(135deg, #FF6B00, #FF8C00)" : "linear-gradient(135deg, #1B3A6B, #2563EB)" }}
            >
              <div className="text-4xl mb-2">📱</div>
              <p className="text-white font-black text-sm leading-tight">{phone.name}</p>
              <p className="text-white/70 text-xs">{phone.brand}</p>
              <p className="text-white font-bold text-base mt-1">₹{phone.price_inr.toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>

        {/* Spec rows */}
        <div className="space-y-3">
          {rows.map((row) => {
            const w = row.aRaw === 0 && row.bRaw === 0 ? null : winner(row.aRaw, row.bRaw, row.lowerBetter);
            return (
              <div key={row.label} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
                  <span>{row.icon}</span>
                  <span className="font-bold text-gray-800 text-sm">{row.label}</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  <div className={`p-3 ${w === "a" ? "bg-green-50" : ""}`}>
                    <p className="text-xs text-gray-700 leading-relaxed">{row.a}</p>
                    {w === "a" && <WinnerBadge side="a" />}
                  </div>
                  <div className={`p-3 ${w === "b" ? "bg-green-50" : ""}`}>
                    <p className="text-xs text-gray-700 leading-relaxed">{row.b}</p>
                    {w === "b" && <WinnerBadge side="b" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall verdict */}
        <div
          className="mt-6 rounded-2xl p-5 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #FF6B00 100%)" }}
        >
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🏆</span>
              <span className="font-black text-lg">Overall Winner</span>
            </div>
            <p className="text-2xl font-black mb-2">{overall.winner.name}</p>
            <p className="text-white/85 text-sm leading-relaxed">{overall.reason}</p>
          </div>
        </div>

        {/* Priya upsell */}
        <PriyaVerdictUpsell phoneIds={[p1.id, p2.id]} />
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="w-12 h-12 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
