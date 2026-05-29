import type { Phone } from "./supabase";

export function cameraVerdict(mp: number): string {
  if (mp >= 200) return "excellent in all conditions, even at night";
  if (mp >= 108) return "exceptional detail, great for landscapes";
  if (mp >= 64) return "sharp and detailed, handles most situations well";
  if (mp >= 50) return "great in daylight, decent at night";
  if (mp >= 48) return "solid photos in good light, struggles in low light";
  if (mp >= 32) return "good for everyday shots";
  if (mp >= 13) return "decent for casual photos";
  return "basic camera, fine for quick snaps";
}

export function batteryVerdict(mah: number): string {
  if (mah >= 6000) return "lasts easily 2+ days for moderate users";
  if (mah >= 5000) return "lasts about 1.5 days for moderate users";
  if (mah >= 4500) return "comfortably gets through a full day";
  if (mah >= 4000) return "gets through a full day for most users";
  if (mah >= 3500) return "lasts a day for light users";
  return "needs a charge by evening for average users";
}

export function processorVerdict(processor: string): string {
  const p = processor.toLowerCase();
  if (p.includes("snapdragon 8 gen 3") || p.includes("snapdragon 8 elite"))
    return "flagship-level — handles anything you throw at it";
  if (p.includes("snapdragon 8 gen 2") || p.includes("dimensity 9300"))
    return "flagship performance — BGMI on max settings, no sweat";
  if (p.includes("snapdragon 7s gen 3") || p.includes("snapdragon 7 gen 3"))
    return "smooth for BGMI, handles multitasking well";
  if (p.includes("snapdragon 6 gen") || p.includes("dimensity 8"))
    return "solid mid-range — handles gaming with minor drops";
  if (p.includes("snapdragon 4") || p.includes("dimensity 6") || p.includes("helio g99"))
    return "good for everyday use, light gaming";
  if (p.includes("helio g85") || p.includes("helio g88"))
    return "fine for social media and streaming, avoid heavy gaming";
  return "handles everyday tasks comfortably";
}

export function ramVerdict(gb: number): string {
  if (gb >= 16) return "zero lag, keeps 20+ apps open with ease";
  if (gb >= 12) return "buttery smooth multitasking, great for heavy users";
  if (gb >= 8) return "no lag switching between apps";
  if (gb >= 6) return "handles most apps well";
  return "fine for light use, may slow with many apps open";
}

export function storageVerdict(gb: number): string {
  const photos = Math.round((gb * 1000) / 8);
  if (gb >= 512) return `enough for ~${photos.toLocaleString("en-IN")} photos`;
  if (gb >= 256) return `enough for ~${photos.toLocaleString("en-IN")} photos — plenty of space`;
  if (gb >= 128) return `enough for ~${photos.toLocaleString("en-IN")} photos`;
  return `enough for ~${photos.toLocaleString("en-IN")} photos — consider cloud backup`;
}

export function displayVerdict(type: string, hz: number): string {
  const isAmoled = type.toLowerCase().includes("amoled") || type.toLowerCase().includes("oled");
  const panel = isAmoled ? "colours pop, deep blacks" : "bright and clear";
  if (hz >= 144) return `${panel}, scrolling is ultra-smooth`;
  if (hz >= 120) return `${panel}, scrolling is butter smooth`;
  if (hz >= 90) return `${panel}, smooth scrolling`;
  return `${panel}, standard 60Hz`;
}

export function chargingVerdict(w: number): string {
  let minutes: number;
  if (w >= 150) minutes = 20;
  else if (w >= 100) minutes = 30;
  else if (w >= 65) minutes = 40;
  else if (w >= 45) minutes = 55;
  else if (w >= 33) minutes = 70;
  else if (w >= 18) minutes = 90;
  else minutes = 120;
  return `charges 0–100% in ~${minutes} minutes`;
}

export function winner(a: number, b: number, lowerBetter = false): "a" | "b" | "tie" {
  if (a === b) return "tie";
  if (lowerBetter) return a < b ? "a" : "b";
  return a > b ? "a" : "b";
}

export type SpecRow = {
  label: string;
  a: string;
  b: string;
  aRaw: number;
  bRaw: number;
  lowerBetter?: boolean;
  icon: string;
};

export function buildSpecRows(p1: Phone, p2: Phone): SpecRow[] {
  return [
    {
      label: "Price",
      a: `₹${p1.price_inr.toLocaleString("en-IN")}`,
      b: `₹${p2.price_inr.toLocaleString("en-IN")}`,
      aRaw: p1.price_inr,
      bRaw: p2.price_inr,
      lowerBetter: true,
      icon: "💰",
    },
    {
      label: "Camera",
      a: `${p1.camera_mp}MP — ${p1.plain_camera_verdict ?? cameraVerdict(p1.camera_mp)}`,
      b: `${p2.camera_mp}MP — ${p2.plain_camera_verdict ?? cameraVerdict(p2.camera_mp)}`,
      aRaw: p1.camera_mp,
      bRaw: p2.camera_mp,
      icon: "📷",
    },
    {
      label: "Battery",
      a: `${p1.battery_mah.toLocaleString("en-IN")}mAh — ${p1.plain_battery_verdict ?? batteryVerdict(p1.battery_mah)}`,
      b: `${p2.battery_mah.toLocaleString("en-IN")}mAh — ${p2.plain_battery_verdict ?? batteryVerdict(p2.battery_mah)}`,
      aRaw: p1.battery_mah,
      bRaw: p2.battery_mah,
      icon: "🔋",
    },
    {
      label: "Processor",
      a: `${p1.processor} — ${processorVerdict(p1.processor)}`,
      b: `${p2.processor} — ${processorVerdict(p2.processor)}`,
      aRaw: 0,
      bRaw: 0,
      icon: "⚡",
    },
    {
      label: "RAM",
      a: `${p1.ram_gb}GB — ${ramVerdict(p1.ram_gb)}`,
      b: `${p2.ram_gb}GB — ${ramVerdict(p2.ram_gb)}`,
      aRaw: p1.ram_gb,
      bRaw: p2.ram_gb,
      icon: "🧠",
    },
    {
      label: "Storage",
      a: `${p1.storage_gb}GB — ${storageVerdict(p1.storage_gb)}`,
      b: `${p2.storage_gb}GB — ${storageVerdict(p2.storage_gb)}`,
      aRaw: p1.storage_gb,
      bRaw: p2.storage_gb,
      icon: "💾",
    },
    {
      label: "Display",
      a: `${p1.display_size_inch}" ${p1.display_type} ${p1.display_hz}Hz — ${displayVerdict(p1.display_type, p1.display_hz)}`,
      b: `${p2.display_size_inch}" ${p2.display_type} ${p2.display_hz}Hz — ${displayVerdict(p2.display_type, p2.display_hz)}`,
      aRaw: p1.display_hz,
      bRaw: p2.display_hz,
      icon: "📱",
    },
    {
      label: "Charging",
      a: `${p1.charging_w}W — ${chargingVerdict(p1.charging_w)}`,
      b: `${p2.charging_w}W — ${chargingVerdict(p2.charging_w)}`,
      aRaw: p1.charging_w,
      bRaw: p2.charging_w,
      icon: "⚡",
    },
    {
      label: "5G",
      a: p1.has_5g ? "Yes — future-ready" : "No — works on 4G only",
      b: p2.has_5g ? "Yes — future-ready" : "No — works on 4G only",
      aRaw: p1.has_5g ? 1 : 0,
      bRaw: p2.has_5g ? 1 : 0,
      icon: "📡",
    },
  ];
}

export function overallWinner(p1: Phone, p2: Phone): { winner: Phone; reason: string } {
  let p1Score = 0;
  let p2Score = 0;
  const rows = buildSpecRows(p1, p2);
  for (const row of rows) {
    if (row.aRaw === 0 && row.bRaw === 0) continue;
    const w = winner(row.aRaw, row.bRaw, row.lowerBetter);
    if (w === "a") p1Score++;
    else if (w === "b") p2Score++;
  }
  if (p1Score >= p2Score) {
    return {
      winner: p1,
      reason: `${p1.name} jeets ${p1Score} out of ${rows.length} specs. Better value for money aur performance ka solid balance.`,
    };
  }
  return {
    winner: p2,
    reason: `${p2.name} jeets ${p2Score} out of ${rows.length} specs. More powerful overall — especially camera aur battery mein ahead hai.`,
  };
}
