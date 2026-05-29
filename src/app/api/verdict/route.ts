import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";
import type { Phone } from "@/lib/supabase";

const USE_CASE_MAP: Record<string, string> = {
  gaming: "gaming (BGMI, Free Fire)",
  camera: "photography and videos",
  daily: "everyday use (calls, WhatsApp, YouTube)",
  all: "all-round use",
};

const HOURS_MAP: Record<string, string> = {
  "2-4": "2–4 ghante (light user)",
  "4-7": "4–7 ghante (average user)",
  "7+": "7+ ghante (heavy user)",
};

const YEARS_MAP: Record<string, string> = {
  "1-2": "1–2 saal",
  "2-3": "2–3 saal",
  "3+": "3+ saal",
};

function buildPrompt(phones: Phone[], answers: Record<string, string>, tier: string): string {
  const phoneList = phones
    .map(
      (p, i) =>
        `Phone ${i + 1}: ${p.name} (${p.brand})
  Price: ₹${p.price_inr.toLocaleString("en-IN")}
  Camera: ${p.camera_mp}MP
  Battery: ${p.battery_mah}mAh
  Processor: ${p.processor}
  RAM: ${p.ram_gb}GB
  Storage: ${p.storage_gb}GB
  Display: ${p.display_size_inch}" ${p.display_type} ${p.display_hz}Hz
  Charging: ${p.charging_w}W
  5G: ${p.has_5g ? "Yes" : "No"}
  Best For: ${p.best_for ?? "general use"}
  Flipkart: ${p.flipkart_url ?? "N/A"}
  Amazon: ${p.amazon_url ?? "N/A"}`
    )
    .join("\n\n");

  const useCaseText = USE_CASE_MAP[answers.use_case] ?? answers.use_case;
  const hoursText = HOURS_MAP[answers.hours] ?? answers.hours;
  const yearsText = YEARS_MAP[answers.years] ?? answers.years;

  const isFull = tier === "full";

  return `Tu Priya hai — ek warm, confident, knowledgeable Indian phone expert jo apne yaar ki tarah baat karti hai. Tu Hinglish mein baat karti hai — Hindi aur English mix. Kabhi robotic mat lagni chahiye. Seedha, friendly, aur genuine advice de.

User ne yeh phones compare kiye hain:
${phoneList}

User ki zaroorat:
- Main use: ${useCaseText}
- Daily usage: ${hoursText}
- Kitne saal tak chalana hai: ${yearsText}

${isFull ? "Yeh user ne ₹99 wala 'Priya ka Full Analysis' liya hai." : "Yeh user ne ₹49 wala 'Priya ka Pick' liya hai."}

${
  isFull
    ? `Teri response mein yeh sab hona chahiye:
1. Seedha bata — konsa phone lena chahiye aur kyun (2-3 sentences, warm aur personal)
2. Dono phones ka quick comparison — strengths aur weaknesses
3. Agar available hai toh best deal (Flipkart ya Amazon link mention kar)
4. Ek final punchline — confident aur friendly

Format: Chat bubble style mein, thoda line breaks use kar for readability. Max 300 words.`
    : `Teri response mein yeh hona chahiye:
1. Seedha winner bata — konsa phone aur kyun (2-3 sentences)
2. User ki specific zaroorat se connect kar — gaming/camera/battery etc.
3. Ek clear final recommendation

Format: Short aur punchy, chat bubble style. Max 150 words.`
}

Suru kar "Yaar," ya "Dekh," ya "Suno," se — natural Hinglish mein.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id, phone_ids, tier, answers } = body as {
      order_id: string;
      phone_ids: string[];
      tier: "pick" | "full";
      answers: { use_case: string; hours: string; years: string };
    };

    if (!order_id || !phone_ids?.length || !tier || !answers) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const db = supabaseAdmin();

    // Verify payment
    const { data: order, error: orderError } = await db
      .from("orders")
      .select("*")
      .eq("razorpay_order_id", order_id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "paid") {
      return NextResponse.json({ error: "Payment not verified" }, { status: 403 });
    }

    // Return cached verdict if exists
    if (order.verdict) {
      return NextResponse.json({ verdict: order.verdict });
    }

    // Fetch phones
    const { data: phones, error: phonesError } = await db
      .from("phones")
      .select("*")
      .in("id", phone_ids);

    if (phonesError || !phones?.length) {
      return NextResponse.json({ error: "Phone data not found" }, { status: 404 });
    }

    const prompt = buildPrompt(phones as Phone[], answers, tier);

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: tier === "full" ? 600 : 300,
      messages: [{ role: "user", content: prompt }],
    });

    const verdict = (message.content[0] as { type: string; text: string }).text;

    // Cache verdict
    await db.from("orders").update({ verdict }).eq("razorpay_order_id", order_id);

    return NextResponse.json({ verdict });
  } catch (err) {
    console.error("Verdict error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
