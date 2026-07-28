import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { Phone } from "@/lib/supabase";

const BUDGET_RANGES: Record<string, { min: number; max: number }> = {
  "under-15k": { min: 0, max: 15000 },
  "15k-25k": { min: 15000, max: 25000 },
  "25k-40k": { min: 25000, max: 40000 },
  "40k-plus": { min: 40000, max: 10_00_000 },
};

function scorePhone(phone: Phone, priority: string): number {
  switch (priority) {
    case "camera":
      return phone.camera_mp;
    case "battery":
      return phone.battery_mah;
    case "gaming":
      return phone.ram_gb * 1000 + phone.charging_w;
    default:
      return phone.camera_mp * 10 + phone.battery_mah / 10 + phone.ram_gb * 100;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const ids = searchParams.get("ids");
  const popular = searchParams.get("popular");
  const budget = searchParams.get("budget");
  const priority = searchParams.get("priority");
  const brand = searchParams.get("brand");
  const fastCharging = searchParams.get("fast_charging") === "true";

  const db = supabaseAdmin();

  if (ids) {
    const idList = ids.split(",").filter(Boolean).slice(0, 10);
    const { data, error } = await db.from("phones").select("*").in("id", idList);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const ordered = idList.map((id) => data?.find((p) => p.id === id)).filter(Boolean);
    return NextResponse.json({ phones: ordered });
  }

  if (q) {
    const { data, error } = await db
      .from("phones")
      .select("*")
      .or(`name.ilike.%${q}%,brand.ilike.%${q}%,processor.ilike.%${q}%`)
      .order("price_inr")
      .limit(10);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ phones: data ?? [] });
  }

  if (popular) {
    const { data, error } = await db
      .from("phones")
      .select("*")
      .order("launch_date", { ascending: false })
      .limit(6);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ phones: data ?? [] });
  }

  if (budget) {
    const range = BUDGET_RANGES[budget];
    if (!range) return NextResponse.json({ error: "Invalid budget" }, { status: 400 });

    let query = db
      .from("phones")
      .select("*")
      .gte("price_inr", range.min)
      .lte("price_inr", range.max * 1.1);

    if (brand && brand !== "any") {
      query = query.ilike("brand", brand);
    }
    if (fastCharging) {
      query = query.gte("charging_w", 65);
    }

    const { data, error } = await query.limit(20);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    let phones = (data ?? []) as Phone[];

    // Widen the search if brand/charging filters left nothing in budget.
    if (phones.length === 0 && (brand !== "any" || fastCharging)) {
      const { data: fallbackData, error: fallbackError } = await db
        .from("phones")
        .select("*")
        .gte("price_inr", range.min)
        .lte("price_inr", range.max * 1.1)
        .limit(20);
      if (fallbackError) return NextResponse.json({ error: fallbackError.message }, { status: 500 });
      phones = (fallbackData ?? []) as Phone[];
    }

    const ranked = phones
      .sort((a, b) => scorePhone(b, priority ?? "all") - scorePhone(a, priority ?? "all"))
      .slice(0, 3);

    return NextResponse.json({ phones: ranked });
  }

  return NextResponse.json({ phones: [] });
}
