-- Abonament „Autodidact”: acces la un modul întreg, 30 de zile, fără ședințe.
-- Nu afectează soldul de ședințe (abonamente / sedinte). Plata e în public.plati
-- (abonament_id rămâne NULL), legată prin plata_id.

CREATE TABLE IF NOT EXISTS public.acces_autodidact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  modul_id TEXT NOT NULL,
  curs_id TEXT NOT NULL,
  pret NUMERIC(10, 2) NOT NULL CHECK (pret > 0),
  data_start DATE NOT NULL,
  data_sfarsit DATE NOT NULL,
  plata_id UUID REFERENCES public.plati (id) ON DELETE SET NULL,
  creat_de UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (data_sfarsit >= data_start)
);

CREATE INDEX IF NOT EXISTS acces_autodidact_cursant_idx
  ON public.acces_autodidact (cursant_id, data_sfarsit);

ALTER TABLE public.acces_autodidact ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS acces_autodidact_select ON public.acces_autodidact;
CREATE POLICY acces_autodidact_select ON public.acces_autodidact
  FOR SELECT TO authenticated
  USING (public.is_admin() OR public.is_parinte_al(cursant_id));

DROP POLICY IF EXISTS acces_autodidact_write_admin ON public.acces_autodidact;
CREATE POLICY acces_autodidact_write_admin ON public.acces_autodidact
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
