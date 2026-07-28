-- Replace the old ₹49/₹99 "pick"/"full" tiers with a single flat ₹49 "Priya ka Verdict" product.
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_tier_check;
ALTER TABLE orders ALTER COLUMN tier SET DEFAULT 'verdict';
UPDATE orders SET tier = 'verdict' WHERE tier IN ('pick', 'full');
ALTER TABLE orders ADD CONSTRAINT orders_tier_check CHECK (tier IN ('verdict'));

-- Quiz answers captured on the free lead-magnet flow (budget/priority/charging/brand),
-- carried through to give Priya's paid verdict the same context.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS quiz_answers jsonb;

-- Retention hook: capture email/WhatsApp opt-in at verdict delivery for a future
-- price-drop notification feature. No automation is wired up yet.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS contact_email text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS contact_whatsapp text;
