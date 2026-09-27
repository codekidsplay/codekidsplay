-- Continuare după eroarea TIMESTAMPTZ (tabelele există deja)
-- Rulează DOAR acest fișier în SQL Editor

CREATE UNIQUE INDEX IF NOT EXISTS notificari_email_o_data_pe_zi
  ON public.notificari_email (cursant_id, tip, ((trimis_la AT TIME ZONE 'Europe/Bucharest')::date));

CREATE OR REPLACE FUNCTION public.sedinte_ramase(p_abonament_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT a.sedinte_incluse
       - COALESCE((
           SELECT COUNT(*)::int
           FROM public.sedinte s
           WHERE s.abonament_id = a.id
             AND s.consuma_sedinta = true
         ), 0)
  FROM public.abonamente a
  WHERE a.id = p_abonament_id;
$$;

CREATE OR REPLACE FUNCTION public.jwt_rol()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT COALESCE(auth.jwt() -> 'app_metadata' ->> 'rol', '');
$$;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT public.jwt_rol() IN ('admin', 'profesor');
$$;

CREATE OR REPLACE FUNCTION public.is_parinte_al(p_cursant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.parinte_cursanti pc
    WHERE pc.parinte_id = auth.uid()
      AND pc.cursant_id = p_cursant_id
  );
$$;

CREATE OR REPLACE FUNCTION public.elev_cursant_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT c.id
  FROM public.profile p
  JOIN public.cursanti c ON c.id = p.cursant_id
  WHERE p.id = auth.uid()
    AND p.rol = 'elev'
  LIMIT 1;
$$;

ALTER TABLE public.cursanti ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parinte_cursanti ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscrieri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abonamente ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sedinte ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notificari_email ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profile_select_own_or_staff ON public.profile;
CREATE POLICY profile_select_own_or_staff ON public.profile
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_staff());

DROP POLICY IF EXISTS profile_update_own ON public.profile;
CREATE POLICY profile_update_own ON public.profile
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS cursanti_select ON public.cursanti;
CREATE POLICY cursanti_select ON public.cursanti
  FOR SELECT TO authenticated
  USING (
    public.is_staff()
    OR id = public.elev_cursant_id()
    OR public.is_parinte_al(id)
  );

DROP POLICY IF EXISTS cursanti_write_staff ON public.cursanti;
CREATE POLICY cursanti_write_staff ON public.cursanti
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS parinte_cursanti_select ON public.parinte_cursanti;
CREATE POLICY parinte_cursanti_select ON public.parinte_cursanti
  FOR SELECT TO authenticated
  USING (public.is_staff() OR parinte_id = auth.uid());

DROP POLICY IF EXISTS parinte_cursanti_write_staff ON public.parinte_cursanti;
CREATE POLICY parinte_cursanti_write_staff ON public.parinte_cursanti
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS inscrieri_select ON public.inscrieri;
CREATE POLICY inscrieri_select ON public.inscrieri
  FOR SELECT TO authenticated
  USING (
    public.is_staff()
    OR cursant_id = public.elev_cursant_id()
    OR public.is_parinte_al(cursant_id)
  );

DROP POLICY IF EXISTS inscrieri_write_staff ON public.inscrieri;
CREATE POLICY inscrieri_write_staff ON public.inscrieri
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS abonamente_select ON public.abonamente;
CREATE POLICY abonamente_select ON public.abonamente
  FOR SELECT TO authenticated
  USING (public.is_staff() OR public.is_parinte_al(cursant_id));

DROP POLICY IF EXISTS abonamente_write_staff ON public.abonamente;
CREATE POLICY abonamente_write_staff ON public.abonamente
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS sedinte_select ON public.sedinte;
CREATE POLICY sedinte_select ON public.sedinte
  FOR SELECT TO authenticated
  USING (public.is_staff() OR public.is_parinte_al(cursant_id));

DROP POLICY IF EXISTS sedinte_write_staff ON public.sedinte;
CREATE POLICY sedinte_write_staff ON public.sedinte
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS notificari_select ON public.notificari_email;
CREATE POLICY notificari_select ON public.notificari_email
  FOR SELECT TO authenticated
  USING (public.is_staff() OR public.is_parinte_al(cursant_id));

DROP POLICY IF EXISTS notificari_write_staff ON public.notificari_email;
CREATE POLICY notificari_write_staff ON public.notificari_email
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS progres_select ON public.progres;
CREATE POLICY progres_select ON public.progres
  FOR SELECT TO authenticated
  USING (
    public.is_staff()
    OR cursant_id = public.elev_cursant_id()
    OR public.is_parinte_al(cursant_id)
  );

DROP POLICY IF EXISTS progres_write_staff ON public.progres;
CREATE POLICY progres_write_staff ON public.progres
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION public.sedinte_ramase(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.jwt_rol() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_parinte_al(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.elev_cursant_id() TO authenticated;
