import { createClient } from "@supabase/supabase-js";

export function supabaseBrowser() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export type Phone = {
  id: string;
  name: string;
  brand: string;
  price_inr: number;
  battery_mah: number;
  camera_mp: number;
  front_camera_mp: number;
  processor: string;
  ram_gb: number;
  storage_gb: number;
  display_size_inch: number;
  display_hz: number;
  display_type: string;
  has_5g: boolean;
  charging_w: number;
  best_for: string | null;
  plain_camera_verdict: string | null;
  plain_battery_verdict: string | null;
  plain_gaming_verdict: string | null;
  flipkart_url: string | null;
  amazon_url: string | null;
  launch_date: string | null;
};

export type QuizAnswers = {
  budget: string;
  priority: string;
  charging: string;
  brand: string;
};

export type Order = {
  id: string;
  razorpay_order_id: string;
  amount: number;
  tier: "verdict";
  phone_ids: string[];
  status: "pending" | "paid";
  verdict: string | null;
  quiz_answers: QuizAnswers | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  created_at: string;
};
