-- Run this once in your Neon SQL console

CREATE TABLE IF NOT EXISTS registrations (
  id          SERIAL PRIMARY KEY,
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100),
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(30)  NOT NULL,
  perf_type   VARCHAR(50)  NOT NULL,
  time_slot   VARCHAR(10)  NOT NULL,
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Prevent double-booking the same slot
CREATE UNIQUE INDEX IF NOT EXISTS unique_slot ON registrations(time_slot);
