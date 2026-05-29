-- KonsaPhone orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  razorpay_order_id text UNIQUE NOT NULL,
  amount integer NOT NULL,
  tier text NOT NULL CHECK (tier IN ('pick', 'full')),
  phone_ids text[] NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  verdict text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookups by razorpay order ID
CREATE INDEX IF NOT EXISTS orders_razorpay_order_id_idx ON orders (razorpay_order_id);

-- Row Level Security: service role only (no public access)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
