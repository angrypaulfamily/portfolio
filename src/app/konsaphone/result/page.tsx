"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ContactCapture({ orderId }: { orderId: string }) {
  const [mode, setMode] = useState<"email" | "whatsapp">("whatsapp");
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!value.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          email: mode === "email" ? value : undefined,
          whatsapp: mode === "whatsapp" ? value : undefined,
        }),
      });
      setSubmitted(true);
    } catch {
      // best-effort — no need to block the user on failure
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
        <p className="text-green-700 font-semibold text-sm">✓ Ho gaya! Price drop hote hi bata denge.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <p className="font-bold text-gray-900 text-sm mb-1">📉 Price drop pe notify chahiye?</p>
      <p className="text-gray-500 text-xs mb-3">
        Agar shortlist ke phones pe price drop ho, toh sabse pehle tumhe batayenge.
      </p>
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => { setMode("whatsapp"); setValue(""); }}
          className={`flex-1 text-xs font-bold py-2 rounded-lg transition-colors ${
            mode === "whatsapp" ? "bg-[#00C853] text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          WhatsApp
        </button>
        <button
          onClick={() => { setMode("email"); setValue(""); }}
          className={`flex-1 text-xs font-bold py-2 rounded-lg transition-colors ${
            mode === "email" ? "bg-[#1B3A6B] text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          Email
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type={mode === "email" ? "email" : "tel"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={mode === "email" ? "you@example.com" : "+91 98765 43210"}
          className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          onClick={handleSubmit}
          disabled={submitting || !value.trim()}
          className="bg-[#FF6B00] text-white text-sm font-bold px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-orange-600 transition-colors"
        >
          {submitting ? "..." : "Notify karo"}
        </button>
      </div>
    </div>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");
  const phoneIds = searchParams.get("phone_ids")?.split(",") ?? [];

  const [verdict, setVerdict] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  const fetchVerdict = useCallback(async () => {
    if (!orderId || !phoneIds.length) return;
    setLoading(true);
    try {
      const res = await fetch("/api/verdict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, phone_ids: phoneIds }),
      });
      const data = await res.json();
      if (data.verdict) {
        setVerdict(data.verdict);
      } else {
        setError(data.error ?? "Kuch gadbad ho gayi");
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchVerdict();
  }, [fetchVerdict]);

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
      <div
        className="sticky top-0 z-40 shadow-md"
        style={{ background: "linear-gradient(90deg, #FF6B00, #1B3A6B)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/konsaphone")} className="text-white/80 hover:text-white font-semibold text-sm">
            ← Home
          </button>
          <span className="text-white font-black text-lg">Priya ka Verdict</span>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4 animate-bounce">🧑‍💼</div>
            <div className="w-10 h-10 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-gray-700 text-lg mb-2">Priya soch rahi hai...</p>
            <p className="text-gray-500 text-sm">Real owner opinions ke saath best verdict tayyar kar rahi hai 🔍</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">😕</div>
            <p className="text-gray-700 font-bold text-lg mb-4">{error}</p>
            <button onClick={fetchVerdict} className="bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold">
              Wapas Try Karo
            </button>
          </div>
        )}

        {!loading && verdict && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl flex-shrink-0">
                🧑‍💼
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none shadow-xl p-5 flex-1 border border-orange-100">
                <p className="font-bold text-[#FF6B00] text-sm mb-3">Priya ka Verdict ✨</p>
                <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{verdict}</div>
              </div>
            </div>

            <ContactCapture orderId={orderId} />

            <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-4 border border-orange-100">
              <p className="text-center text-gray-600 text-sm mb-3">Dost ko bhi help chahiye? 👇</p>
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
