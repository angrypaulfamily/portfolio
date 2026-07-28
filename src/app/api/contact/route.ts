import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id, email, whatsapp } = body as {
      order_id: string;
      email?: string;
      whatsapp?: string;
    };

    if (!order_id || (!email && !whatsapp)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { error } = await db
      .from("orders")
      .update({ contact_email: email ?? null, contact_whatsapp: whatsapp ?? null })
      .eq("razorpay_order_id", order_id)
      .eq("status", "paid");

    if (error) {
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact capture error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
