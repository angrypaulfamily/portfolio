import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const ids = searchParams.get("ids");
  const popular = searchParams.get("popular");

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

  return NextResponse.json({ phones: [] });
}
