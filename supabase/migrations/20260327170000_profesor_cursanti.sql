-- Profesor ↔ cursanți (profesorul vede doar copiii asignați)

CREATE TABLE IF NOT EXISTS public.profesor_cursanti (
  profesor_id UUID NOT NULL REFERENCES public.profile (id) ON DELETE CASCADE,
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (profesor_id, cursant_id)
);

CREATE INDEX IF NOT EXISTS profesor_cursanti_cursant_idx
  ON public.profesor_cursanti (cursant_id);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT public.jwt_rol() = 'admin';
$$;

CREATE OR REPLACE FUNCTION public.is_profesor_al(p_cursant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profesor_cursanti pc
    WHERE pc.profesor_id = auth.uid()
      AND pc.cursant_id = p_cursant_id
  );
$$;

ALTER TABLE public.profesor_cursanti ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profesor_cursanti_select ON public.profesor_cursanti;
CREATE POLICY profesor_cursanti_select ON public.profesor_cursanti
  FOR SELECT TO authenticated
  USING (public.is_admin() OR profesor_id = auth.uid());

DROP POLICY IF EXISTS profesor_cursanti_write_admin ON public.profesor_cursanti;
CREATE POLICY profesor_cursanti_write_admin ON public.profesor_cursanti
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Cursanți: admin = toți; profesor = doar asignați
DROP POLICY IF EXISTS cursanti_select ON public.cursanti;
CREATE POLICY cursanti_select ON public.cursanti
  FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR public.is_profesor_al(id)
    OR id = public.elev_cursant_id()
    OR public.is_parinte_al(id)
  );

DROP POLICY IF EXISTS cursanti_write_staff ON public.cursanti;
CREATE POLICY cursanti_write_staff ON public.cursanti
  FOR ALL TO authenticated
  USING (
    public.is_admin()
    OR public.is_profesor_al(id)
  )
  WITH CHECK (
    public.is_admin()
    OR public.is_profesor_al(id)
    OR public.jwt_rol() = 'profesor'
  );

-- Înscrieri / progres: aceleași reguli pe cursant
DROP POLICY IF EXISTS inscrieri_select ON public.inscrieri;
CREATE POLICY inscrieri_select ON public.inscrieri
  FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR public.is_profesor_al(cursant_id)
    OR cursant_id = public.elev_cursant_id()
    OR public.is_parinte_al(cursant_id)
  );

DROP POLICY IF EXISTS inscrieri_write_staff ON public.inscrieri;
CREATE POLICY inscrieri_write_staff ON public.inscrieri
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_profesor_al(cursant_id))
  WITH CHECK (public.is_admin() OR public.is_profesor_al(cursant_id) OR public.jwt_rol() = 'profesor');

DROP POLICY IF EXISTS progres_select ON public.progres;
CREATE POLICY progres_select ON public.progres
  FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR public.is_profesor_al(cursant_id)
    OR cursant_id = public.elev_cursant_id()
    OR public.is_parinte_al(cursant_id)
  );

DROP POLICY IF EXISTS progres_write_staff ON public.progres;
CREATE POLICY progres_write_staff ON public.progres
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_profesor_al(cursant_id))
  WITH CHECK (public.is_admin() OR public.is_profesor_al(cursant_id));

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_profesor_al(UUID) TO authenticated;
