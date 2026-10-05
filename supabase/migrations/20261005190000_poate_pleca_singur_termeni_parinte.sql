-- 1) Cursant: poate pleca singur după curs? (implicit NU = îl ia un adult)
ALTER TABLE public.cursanti
  ADD COLUMN IF NOT EXISTS poate_pleca_singur BOOLEAN NOT NULL DEFAULT FALSE;

-- 2) Părinte: acceptarea Termenilor la prima autentificare (per cont de părinte)
ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS termeni_acceptati_la TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS termeni_versiune TEXT;
