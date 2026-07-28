import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabaseAdmin } from "@/lib/supabase";
import type { QuizAnswers } from "@/lib/supabase";

const VERDICT_PRICE = 49;

export async function POST(req: NextRequest) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
  try {
    const body = await req.json();
    const { phone_ids, quiz_answers } = body as {
      phone_ids: string[];
      quiz_answers?: QuizAnswers;
    };

    if (!phone_ids?.length || phone_ids.length > 5) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const rzpOrder = await razorpay.orders.create({
      amount: VERDICT_PRICE * 100,
      currency: "INR",
      receipt: `kp_${Date.now()}`,
    });

    const db = supabaseAdmin();
    const { error } = await db.from("orders").insert({
      razorpay_order_id: rzpOrder.id,
      amount: VERDICT_PRICE,
      tier: "verdict",
      phone_ids,
      quiz_answers: quiz_answers ?? null,
      status: "pending",
    });

    if (error) {
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({
      order_id: rzpOrder.id,
      amount: VERDICT_PRICE,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
