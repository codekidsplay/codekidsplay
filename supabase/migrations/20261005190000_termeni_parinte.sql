-- Părinte: acceptarea Termenilor la prima autentificare (per cont de părinte)
ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS termeni_acceptati_la TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS termeni_versiune TEXT;
