-- Data nașterii copilului pe fișa de cursant

ALTER TABLE public.cursanti
  ADD COLUMN IF NOT EXISTS data_nastere DATE;

COMMENT ON COLUMN public.cursanti.data_nastere IS 'Data nașterii copilului';
