import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");

    if (expected !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const orderId: string = event.payload.payment.entity.order_id;
      const db = supabaseAdmin();
      const { error } = await db
        .from("orders")
        .update({ status: "paid" })
        .eq("razorpay_order_id", orderId);

      if (error) {
        console.error("Webhook DB update error:", error);
        return NextResponse.json({ error: "DB error" }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
