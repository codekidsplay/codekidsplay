-- Permite consum de ședințe și fără abonament activ (sold negativ înainte de plată).
-- Soldul se calculează la nivel de cursant: SUM(abonamente.sedinte_incluse) - COUNT(sedinte consumate).

ALTER TABLE public.sedinte
  ALTER COLUMN abonament_id DROP NOT NULL;

ALTER TABLE public.sedinte
  DROP CONSTRAINT IF EXISTS sedinte_abonament_id_fkey;
ALTER TABLE public.sedinte
  ADD CONSTRAINT sedinte_abonament_id_fkey
  FOREIGN KEY (abonament_id) REFERENCES public.abonamente (id) ON DELETE SET NULL;

-- Sold cumulat per cursant (poate fi negativ).
CREATE OR REPLACE FUNCTION public.sold_sedinte_cursant(p_cursant_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT COALESCE((SELECT SUM(a.sedinte_incluse)::int FROM public.abonamente a WHERE a.cursant_id = p_cursant_id), 0)
       - COALESCE((SELECT COUNT(*)::int FROM public.sedinte s WHERE s.cursant_id = p_cursant_id AND s.consuma_sedinta = true), 0);
$$;

GRANT EXECUTE ON FUNCTION public.sold_sedinte_cursant(UUID) TO authenticated;
