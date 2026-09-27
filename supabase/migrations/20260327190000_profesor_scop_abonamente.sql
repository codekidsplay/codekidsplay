-- Restrânge accesul profesorului la abonamente/ședințe/notificări doar la cursanții asignați
-- (până acum orice profesor vedea/scria pentru TOȚI cursanții, via is_staff()).

DROP POLICY IF EXISTS abonamente_select ON public.abonamente;
CREATE POLICY abonamente_select ON public.abonamente
  FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR public.is_profesor_al(cursant_id)
    OR public.is_parinte_al(cursant_id)
  );

DROP POLICY IF EXISTS abonamente_write_staff ON public.abonamente;
CREATE POLICY abonamente_write_staff ON public.abonamente
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_profesor_al(cursant_id))
  WITH CHECK (public.is_admin() OR public.is_profesor_al(cursant_id));

DROP POLICY IF EXISTS sedinte_select ON public.sedinte;
CREATE POLICY sedinte_select ON public.sedinte
  FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR public.is_profesor_al(cursant_id)
    OR public.is_parinte_al(cursant_id)
  );

DROP POLICY IF EXISTS sedinte_write_staff ON public.sedinte;
CREATE POLICY sedinte_write_staff ON public.sedinte
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_profesor_al(cursant_id))
  WITH CHECK (public.is_admin() OR public.is_profesor_al(cursant_id));

DROP POLICY IF EXISTS notificari_select ON public.notificari_email;
CREATE POLICY notificari_select ON public.notificari_email
  FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR public.is_profesor_al(cursant_id)
    OR public.is_parinte_al(cursant_id)
  );

DROP POLICY IF EXISTS notificari_write_staff ON public.notificari_email;
CREATE POLICY notificari_write_staff ON public.notificari_email
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_profesor_al(cursant_id))
  WITH CHECK (public.is_admin() OR public.is_profesor_al(cursant_id));
