import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
  try {
    const body = await req.json();
    const { amount, phone_ids, tier } = body as {
      amount: number;
      phone_ids: string[];
      tier: "pick" | "full";
    };

    if (!amount || !phone_ids?.length || !tier) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (amount !== 49 && amount !== 99) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const rzpOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `kp_${Date.now()}`,
    });

    const db = supabaseAdmin();
    const { error } = await db.from("orders").insert({
      razorpay_order_id: rzpOrder.id,
      amount,
      tier,
      phone_ids,
      status: "pending",
    });

    if (error) {
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({
      order_id: rzpOrder.id,
      amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
