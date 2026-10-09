-- Cereri de contact / ședință gratuită trimise din formularul public.
-- Acordul pentru Termeni + data/ora sunt setate de server (created_at default now()).
-- RLS activ, fără policy-uri: acces doar prin service role (server actions).
CREATE TABLE IF NOT EXISTS public.cereri_contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nume TEXT NOT NULL CHECK (char_length(nume) BETWEEN 1 AND 120),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  telefon TEXT NOT NULL CHECK (char_length(telefon) BETWEEN 6 AND 40),
  mesaj TEXT NOT NULL CHECK (char_length(mesaj) BETWEEN 1 AND 4000),
  termeni_acceptati BOOLEAN NOT NULL CHECK (termeni_acceptati = true),
  termeni_versiune TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.cereri_contact ENABLE ROW LEVEL SECURITY;
