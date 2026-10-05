export type RolDb = 'admin' | 'profesor' | 'elev' | 'parinte'

export type CursantRow = {
  id: string
  nume: string
  prenume: string
  email_parinte: string
  telefon_parinte: string | null
  username: string
  data_nastere: string | null
  data_inscriere: string
  activ: boolean
  created_at: string
  creat_de: string | null
  termeni_acceptati_la?: string | null
  termeni_versiune?: string | null
  termeni_confirmat_de?: string | null
  poate_pleca_singur?: boolean
}

export type ProfileRow = {
  id: string
  rol: RolDb
  cursant_id: string | null
  nume_afisat: string | null
  created_at: string
  termeni_acceptati_la?: string | null
  termeni_versiune?: string | null
}

export type InscriereRow = {
  id: string
  cursant_id: string
  curs_id: string
  modul_activ_id: string | null
  data_inscriere: string
  activ: boolean
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      cursanti: {
        Row: CursantRow
        Insert: {
          id?: string
          nume: string
          prenume: string
          email_parinte: string
          telefon_parinte?: string | null
          username: string
          data_nastere?: string | null
          data_inscriere?: string
          activ?: boolean
          created_at?: string
          creat_de?: string | null
          termeni_acceptati_la?: string | null
          termeni_versiune?: string | null
          termeni_confirmat_de?: string | null
          poate_pleca_singur?: boolean
        }
        Update: Partial<Database['public']['Tables']['cursanti']['Insert']>
        Relationships: []
      }
      profile: {
        Row: ProfileRow
        Insert: {
          id: string
          rol: RolDb
          cursant_id?: string | null
          nume_afisat?: string | null
          created_at?: string
          termeni_acceptati_la?: string | null
          termeni_versiune?: string | null
        }
        Update: Partial<Omit<Database['public']['Tables']['profile']['Insert'], 'id'>>
        Relationships: []
      }
      parinte_cursanti: {
        Row: {
          parinte_id: string
          cursant_id: string
          created_at: string
        }
        Insert: {
          parinte_id: string
          cursant_id: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['parinte_cursanti']['Insert']>
        Relationships: []
      }
      profesor_cursanti: {
        Row: {
          profesor_id: string
          cursant_id: string
          created_at: string
        }
        Insert: {
          profesor_id: string
          cursant_id: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['profesor_cursanti']['Insert']>
        Relationships: []
      }
      inscrieri: {
        Row: InscriereRow
        Insert: {
          id?: string
          cursant_id: string
          curs_id: string
          modul_activ_id?: string | null
          data_inscriere?: string
          activ?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['inscrieri']['Insert']>
        Relationships: []
      }
      abonamente: {
        Row: {
          id: string
          cursant_id: string
          tip: 'lunar' | 'pachet'
          sedinte_incluse: number
          pret: number
          data_start: string
          data_sfarsit: string | null
          activ: boolean
          created_at: string
        }
        Insert: {
          id?: string
          cursant_id: string
          tip: 'lunar' | 'pachet'
          sedinte_incluse: number
          pret: number
          data_start: string
          data_sfarsit?: string | null
          activ?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['abonamente']['Insert']>
        Relationships: []
      }
      sedinte: {
        Row: {
          id: string
          cursant_id: string
          abonament_id: string | null
          lectie_id: string | null
          data: string
          prezent: boolean
          consuma_sedinta: boolean
          nota: string | null
          creat_de: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cursant_id: string
          abonament_id: string | null
          lectie_id?: string | null
          data?: string
          prezent?: boolean
          consuma_sedinta?: boolean
          nota?: string | null
          creat_de?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['sedinte']['Insert']>
        Relationships: []
      }
      plati: {
        Row: {
          id: string
          cursant_id: string
          abonament_id: string | null
          suma: number
          data_plata: string
          metoda: 'cash' | 'transfer' | 'card'
          nota: string | null
          creat_de: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cursant_id: string
          abonament_id?: string | null
          suma: number
          data_plata?: string
          metoda: 'cash' | 'transfer' | 'card'
          nota?: string | null
          creat_de?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['plati']['Insert']>
        Relationships: []
      }
      acces_autodidact: {
        Row: {
          id: string
          cursant_id: string
          modul_id: string
          curs_id: string
          pret: number
          data_start: string
          data_sfarsit: string
          plata_id: string | null
          creat_de: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cursant_id: string
          modul_id: string
          curs_id: string
          pret: number
          data_start: string
          data_sfarsit: string
          plata_id?: string | null
          creat_de?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['acces_autodidact']['Insert']>
        Relationships: []
      }
      progres: {
        Row: {
          id: string
          cursant_id: string
          lectie_id: string
          bifat: boolean
          data_bifat: string | null
          bifat_de: string | null
          sedinta_id: string | null
          consum_sedinta_aplicat: boolean
          nota_profesor: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cursant_id: string
          lectie_id: string
          bifat?: boolean
          data_bifat?: string | null
          bifat_de?: string | null
          sedinta_id?: string | null
          consum_sedinta_aplicat?: boolean
          nota_profesor?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['progres']['Insert']>
        Relationships: []
      }
      notificari_email: {
        Row: {
          id: string
          cursant_id: string
          tip: 'sedinte_epuizate'
          email_catre: string
          sedinte_ramase: number
          trimis_la: string
          created_at: string
        }
        Insert: {
          id?: string
          cursant_id: string
          tip: 'sedinte_epuizate'
          email_catre: string
          sedinte_ramase: number
          trimis_la?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['notificari_email']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      sedinte_ramase: { Args: { p_abonament_id: string }; Returns: number }
      jwt_rol: { Args: Record<string, never>; Returns: string }
      is_staff: { Args: Record<string, never>; Returns: boolean }
      is_admin: { Args: Record<string, never>; Returns: boolean }
      is_profesor_al: { Args: { p_cursant_id: string }; Returns: boolean }
      is_parinte_al: { Args: { p_cursant_id: string }; Returns: boolean }
      elev_cursant_id: { Args: Record<string, never>; Returns: string }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
