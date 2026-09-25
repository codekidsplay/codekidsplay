import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      cursanti: {
        Row: {
          id: string
          nume: string
          prenume: string
          email_parinte: string
          telefon_parinte: string | null
          data_inscriere: string
          activ: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['cursanti']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['cursanti']['Insert']>
      }
      cursuri: {
        Row: {
          id: string
          nume: string
          descriere: string | null
          culoare: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['cursuri']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['cursuri']['Insert']>
      }
      module: {
        Row: {
          id: string
          curs_id: string
          nume: string
          descriere: string | null
          ordine: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['module']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['module']['Insert']>
      }
      lectii: {
        Row: {
          id: string
          modul_id: string
          titlu: string
          continut: string | null
          ordine: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lectii']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['lectii']['Insert']>
      }
      inscrieri: {
        Row: {
          id: string
          cursant_id: string
          curs_id: string
          data_inscriere: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['inscrieri']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['inscrieri']['Insert']>
      }
      progres: {
        Row: {
          id: string
          cursant_id: string
          lectie_id: string
          bifat: boolean
          data_bifat: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['progres']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['progres']['Insert']>
      }
    }
  }
}
