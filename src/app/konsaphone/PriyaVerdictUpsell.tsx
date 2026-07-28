"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuizAnswers } from "@/lib/supabase";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

export default function PriyaVerdictUpsell({
  phoneIds,
  quizAnswers,
  compact = false,
}: {
  phoneIds: string[];
  quizAnswers?: QuizAnswers;
  compact?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlePay() {
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_ids: phoneIds, quiz_answers: quizAnswers }),
      });
      const data = await res.json();
      if (!data.order_id) throw new Error("Order failed");

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        const rzp = new window.Razorpay({
          key: data.key,
          amount: data.amount * 100,
          currency: "INR",
          order_id: data.order_id,
          name: "KonsaPhone",
          description: "Priya ka Verdict",
          theme: { color: "#FF6B00" },
          handler: (response: Record<string, string>) => {
            router.push(
              `/konsaphone/result?order_id=${data.order_id}&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_signature=${response.razorpay_signature}&phone_ids=${phoneIds.join(",")}`
            );
          },
        });
        rzp.open();
        setLoading(false);
      };
      script.onerror = () => setLoading(false);
    } catch {
      setLoading(false);
      alert("Kuch gadbad ho gayi! Please try again.");
    }
  }

  return (
    <div className={`rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-200 ${compact ? "" : "mt-8"}`}>
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF6B00, #FF8C00)" }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="flex items-start gap-4 relative">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
            🧑‍💼
          </div>
          <div>
            <div className="font-black text-xl mb-1">Confused ho?</div>
            <p className="text-white/90 text-sm leading-relaxed">
              Inme se konsa lena hai, decide nahi kar pa rahe? Priya ka Verdict lo — clear, confident answer, real owner opinions ke saath.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-5">
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full rounded-2xl border-2 border-orange-200 p-4 text-left hover:border-[#FF6B00] hover:shadow-lg transition-all active:scale-[0.98] group flex items-center gap-4"
        >
          <div className="text-3xl">🎯</div>
          <div className="flex-1">
            <div className="font-black text-gray-900">Priya ka Verdict</div>
            <p className="text-gray-500 text-xs leading-relaxed mt-0.5">
              Full comparative verdict + Flipkart/Amazon ke best deals
            </p>
          </div>
          <div className="bg-[#FF6B00] text-white text-sm font-bold px-4 py-2.5 rounded-xl group-hover:bg-orange-600 transition-colors whitespace-nowrap">
            {loading ? "Processing..." : "Verdict lo — ₹49"}
          </div>
        </button>
      </div>

      <div className="bg-gray-50 px-5 py-3 flex items-center gap-2 text-xs text-gray-500">
        <span>🔒</span>
        <span>Secure UPI payment via Razorpay · One-time payment, no subscription, non-refundable</span>
      </div>
    </div>
  );
}
