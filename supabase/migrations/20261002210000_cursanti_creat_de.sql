-- Cine a înregistrat cursantul (pentru istoricul de activitate al profesorilor).
ALTER TABLE public.cursanti
  ADD COLUMN IF NOT EXISTS creat_de UUID REFERENCES public.profile (id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS cursanti_creat_de_idx ON public.cursanti (creat_de);
