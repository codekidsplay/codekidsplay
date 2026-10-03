-- Dovada acceptării Termenilor și Condițiilor la înscrierea cursantului.
-- Completată de personal (admin / profesor) după confirmarea părintelui.
ALTER TABLE public.cursanti
  ADD COLUMN IF NOT EXISTS termeni_acceptati_la TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS termeni_versiune TEXT,
  ADD COLUMN IF NOT EXISTS termeni_confirmat_de UUID;
