-- Max. o ședință consumată pe cursant pe zi (garantat de baza de date).
-- Pasul 1: dacă există dubluri vechi, păstrăm doar prima din fiecare zi
-- (celelalte rămân în istoric, dar nu mai consumă ședință).
update public.sedinte s
set consuma_sedinta = false
where s.consuma_sedinta = true
  and exists (
    select 1 from public.sedinte x
    where x.cursant_id = s.cursant_id
      and x.data = s.data
      and x.consuma_sedinta = true
      and (x.created_at, x.id) < (s.created_at, s.id)
  );

-- Pasul 2: index unic parțial.
create unique index if not exists sedinte_o_pe_zi_per_cursant
  on public.sedinte (cursant_id, data)
  where consuma_sedinta = true;
