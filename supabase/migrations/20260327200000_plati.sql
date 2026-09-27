-- Tabelul de plăți (financiar) — lipsea din schema Supabase, pagina Abonamente & Plăți
-- funcționa doar pe date mock locale.

CREATE TABLE IF NOT EXISTS public.plati (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  abonament_id UUID REFERENCES public.abonamente (id) ON DELETE SET NULL,
  suma NUMERIC(10, 2) NOT NULL CHECK (suma > 0),
  data_plata DATE NOT NULL DEFAULT CURRENT_DATE,
  metoda TEXT NOT NULL CHECK (metoda IN ('cash', 'transfer', 'card')),
  nota TEXT,
  creat_de UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS plati_cursant_idx ON public.plati (cursant_id);
CREATE INDEX IF NOT EXISTS plati_abonament_idx ON public.plati (abonament_id);

ALTER TABLE public.plati ENABLE ROW LEVEL SECURITY;

-- Zona financiară e vizibilă doar adminului (meniul „Abonamente & Plăți” e deja ascuns
-- profesorului) + părintele își poate vedea propriile plăți.
DROP POLICY IF EXISTS plati_select ON public.plati;
CREATE POLICY plati_select ON public.plati
  FOR SELECT TO authenticated
  USING (public.is_admin() OR public.is_parinte_al(cursant_id));

DROP POLICY IF EXISTS plati_write_admin ON public.plati;
CREATE POLICY plati_write_admin ON public.plati
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
