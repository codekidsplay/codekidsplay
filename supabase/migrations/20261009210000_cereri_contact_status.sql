-- Status de tratare pentru cererile de contact (pagina Cereri din admin).
ALTER TABLE public.cereri_contact
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'noua'
  CHECK (status IN ('noua', 'contactata', 'inscris', 'refuzata'));
