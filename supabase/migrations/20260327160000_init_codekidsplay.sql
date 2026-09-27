-- Code Kids Play — schema operațională (Auth + RLS)
-- Curriculum (cursuri/module/lecții) rămâne în cod; aici: conturi, înscrieri, progres, abonamente.

-- ---------------------------------------------------------------------------
-- 1. Cursanți
-- ---------------------------------------------------------------------------
CREATE TABLE public.cursanti (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nume TEXT NOT NULL,
  prenume TEXT NOT NULL,
  email_parinte TEXT NOT NULL,
  telefon_parinte TEXT,
  username TEXT NOT NULL,
  data_inscriere DATE NOT NULL DEFAULT CURRENT_DATE,
  activ BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cursanti_username_format CHECK (username ~ '^[a-z0-9._-]{2,32}$'),
  CONSTRAINT cursanti_username_unique UNIQUE (username)
);

CREATE INDEX cursanti_email_parinte_idx ON public.cursanti (lower(email_parinte));

-- ---------------------------------------------------------------------------
-- 2. Profile (1:1 cu auth.users) — rolul e și în app_metadata (sursă de adevăr JWT)
-- ---------------------------------------------------------------------------
CREATE TABLE public.profile (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  rol TEXT NOT NULL CHECK (rol IN ('admin', 'profesor', 'elev', 'parinte')),
  cursant_id UUID REFERENCES public.cursanti (id) ON DELETE SET NULL,
  nume_afisat TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT profile_elev_are_cursant CHECK (
    (rol = 'elev' AND cursant_id IS NOT NULL)
    OR (rol IN ('admin', 'profesor', 'parinte'))
  )
);

CREATE INDEX profile_cursant_id_idx ON public.profile (cursant_id);
CREATE INDEX profile_rol_idx ON public.profile (rol);

-- Părinte ↔ copii (un email poate avea mai mulți cursanți)
CREATE TABLE public.parinte_cursanti (
  parinte_id UUID NOT NULL REFERENCES public.profile (id) ON DELETE CASCADE,
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (parinte_id, cursant_id)
);

-- ---------------------------------------------------------------------------
-- 3. Înscrieri / progres / abonamente / ședințe
--    curs_id / modul_id / lectie_id = ID-uri din mockData (text), nu FK DB
-- ---------------------------------------------------------------------------
CREATE TABLE public.inscrieri (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  curs_id TEXT NOT NULL,
  modul_activ_id TEXT,
  data_inscriere DATE NOT NULL DEFAULT CURRENT_DATE,
  activ BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT inscrieri_cursant_curs_unique UNIQUE (cursant_id, curs_id)
);

CREATE TABLE public.abonamente (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  tip TEXT NOT NULL CHECK (tip IN ('lunar', 'pachet')),
  sedinte_incluse INTEGER NOT NULL CHECK (sedinte_incluse > 0),
  pret NUMERIC(10, 2) NOT NULL CHECK (pret >= 0),
  data_start DATE NOT NULL,
  data_sfarsit DATE,
  activ BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.sedinte (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  abonament_id UUID NOT NULL REFERENCES public.abonamente (id) ON DELETE CASCADE,
  lectie_id TEXT,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  prezent BOOLEAN NOT NULL DEFAULT true,
  consuma_sedinta BOOLEAN NOT NULL DEFAULT true,
  nota TEXT,
  creat_de UUID REFERENCES public.profile (id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.progres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  lectie_id TEXT NOT NULL,
  bifat BOOLEAN NOT NULL DEFAULT false,
  data_bifat TIMESTAMPTZ,
  bifat_de UUID REFERENCES public.profile (id) ON DELETE SET NULL,
  sedinta_id UUID REFERENCES public.sedinte (id) ON DELETE SET NULL,
  consum_sedinta_aplicat BOOLEAN NOT NULL DEFAULT false,
  nota_profesor TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT progres_cursant_lectie_unique UNIQUE (cursant_id, lectie_id)
);

CREATE TABLE public.notificari_email (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cursant_id UUID NOT NULL REFERENCES public.cursanti (id) ON DELETE CASCADE,
  tip TEXT NOT NULL CHECK (tip IN ('sedinte_epuizate')),
  email_catre TEXT NOT NULL,
  sedinte_ramase INTEGER NOT NULL,
  trimis_la TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX notificari_email_o_data_pe_zi
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

-- ---------------------------------------------------------------------------
-- 4. Helpers RLS (rol din JWT app_metadata — setat doar via service role)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- 5. RLS
-- ---------------------------------------------------------------------------
ALTER TABLE public.cursanti ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parinte_cursanti ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscrieri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abonamente ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sedinte ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notificari_email ENABLE ROW LEVEL SECURITY;

-- profile
CREATE POLICY profile_select_own_or_staff ON public.profile
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_staff());

CREATE POLICY profile_update_own ON public.profile
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- cursanti
CREATE POLICY cursanti_select ON public.cursanti
  FOR SELECT TO authenticated
  USING (
    public.is_staff()
    OR id = public.elev_cursant_id()
    OR public.is_parinte_al(id)
  );

CREATE POLICY cursanti_write_staff ON public.cursanti
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

-- parinte_cursanti
CREATE POLICY parinte_cursanti_select ON public.parinte_cursanti
  FOR SELECT TO authenticated
  USING (public.is_staff() OR parinte_id = auth.uid());

CREATE POLICY parinte_cursanti_write_staff ON public.parinte_cursanti
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

-- inscrieri
CREATE POLICY inscrieri_select ON public.inscrieri
  FOR SELECT TO authenticated
  USING (
    public.is_staff()
    OR cursant_id = public.elev_cursant_id()
    OR public.is_parinte_al(cursant_id)
  );

CREATE POLICY inscrieri_write_staff ON public.inscrieri
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

-- abonamente / sedinte / notificari: staff + părinte (read)
CREATE POLICY abonamente_select ON public.abonamente
  FOR SELECT TO authenticated
  USING (public.is_staff() OR public.is_parinte_al(cursant_id));

CREATE POLICY abonamente_write_staff ON public.abonamente
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

CREATE POLICY sedinte_select ON public.sedinte
  FOR SELECT TO authenticated
  USING (public.is_staff() OR public.is_parinte_al(cursant_id));

CREATE POLICY sedinte_write_staff ON public.sedinte
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

CREATE POLICY notificari_select ON public.notificari_email
  FOR SELECT TO authenticated
  USING (public.is_staff() OR public.is_parinte_al(cursant_id));

CREATE POLICY notificari_write_staff ON public.notificari_email
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

-- progres: elev vede propriul, părinte vede, staff scrie
CREATE POLICY progres_select ON public.progres
  FOR SELECT TO authenticated
  USING (
    public.is_staff()
    OR cursant_id = public.elev_cursant_id()
    OR public.is_parinte_al(cursant_id)
  );

CREATE POLICY progres_write_staff ON public.progres
  FOR ALL TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

-- Trigger: la signup nu creăm profile automat (doar admin via service role)
-- ---------------------------------------------------------------------------
-- 6. Grants
-- ---------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION public.sedinte_ramase(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.jwt_rol() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_parinte_al(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.elev_cursant_id() TO authenticated;
