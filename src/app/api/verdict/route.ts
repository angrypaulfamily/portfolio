import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";
import type { Phone, QuizAnswers } from "@/lib/supabase";

const BUDGET_LABELS: Record<string, string> = {
  "under-15k": "₹15,000 se kam",
  "15k-25k": "₹15,000–25,000",
  "25k-40k": "₹25,000–40,000",
  "40k-plus": "₹40,000+",
};

const PRIORITY_LABELS: Record<string, string> = {
  camera: "camera / photography",
  battery: "battery life",
  gaming: "gaming / performance",
  all: "balanced, sab kuch thoda-thoda",
};

function buildPrompt(phones: Phone[], quizAnswers: QuizAnswers | null): string {
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

  const contextLines = quizAnswers
    ? `User ne yeh bataya hai:
- Budget: ${BUDGET_LABELS[quizAnswers.budget] ?? quizAnswers.budget}
- Priority: ${PRIORITY_LABELS[quizAnswers.priority] ?? quizAnswers.priority}
- Fast charging chahiye: ${quizAnswers.charging === "yes" ? "Haan" : "Koi zid nahi"}
- Brand preference: ${quizAnswers.brand === "any" ? "Koi bhi brand chalega" : quizAnswers.brand}`
    : "User ne yeh phones manually shortlist kiye hain — koi extra preference nahi batayi, sirf inhi ke beech faisla chahiye.";

  return `Tu Priya hai — ek warm, confident, knowledgeable Indian phone expert jo apne yaar ki tarah baat karti hai. Tu Hinglish mein baat karti hai — Hindi aur English mix. Kabhi robotic ya generic AI jaisi mat lagni chahiye.

Teri raay real phone owners ke experience (jaise Reddit jaisi jagah pe log jo bolte hain) pe based lagni chahiye — specs padh ke nahi, balki "log kya keh rahe hain iske baare mein" wale confidence ke saath bol.

User ne yeh phones shortlist kiye hain:
${phoneList}

${contextLines}

Teri response mein yeh sab hona chahiye, is order mein:
1. Seedha, confident winner bata — konsa phone lena chahiye aur kyun (2-3 sentences, jaise ek dost real opinion de raha ho, owner sentiment ka reference karte hue — e.g. "log bolte hain", "real users ka experience yeh kehta hai")
2. Shortlist ke baaki phone(s) ke against quick comparison — unki strength/weakness, kis type ke user ke liye woh better honge
3. Ek chhota "Total Cost of Ownership" note — resale value trend ya long-term reliability ke baare mein ek line (yeh sirf supporting info hai, headline nahi)
4. Ek confident, friendly final punchline

Format: Chat bubble style, thoda line breaks use kar readability ke liye. Max 280 words. Suru kar "Yaar," ya "Dekh," ya "Suno," se — natural Hinglish mein.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id, phone_ids } = body as {
      order_id: string;
      phone_ids: string[];
    };

    if (!order_id || !phone_ids?.length) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const db = supabaseAdmin();

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

    if (order.verdict) {
      return NextResponse.json({ verdict: order.verdict });
    }

    const { data: phones, error: phonesError } = await db
      .from("phones")
      .select("*")
      .in("id", phone_ids);

    if (phonesError || !phones?.length) {
      return NextResponse.json({ error: "Phone data not found" }, { status: 404 });
    }

    const prompt = buildPrompt(phones as Phone[], order.quiz_answers as QuizAnswers | null);

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    const verdict = (message.content[0] as { type: string; text: string }).text;

    await db.from("orders").update({ verdict }).eq("razorpay_order_id", order_id);

    return NextResponse.json({ verdict });
  } catch (err) {
    console.error("Verdict error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
