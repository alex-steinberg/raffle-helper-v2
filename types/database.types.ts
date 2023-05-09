export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      communities: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          link: string | null
          name: string | null
          organiser: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          link?: string | null
          name?: string | null
          organiser?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          link?: string | null
          name?: string | null
          organiser?: number | null
        }
      }
      donors: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          rep_email: string | null
          rep_name: string | null
          rep_number: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          rep_email?: string | null
          rep_name?: string | null
          rep_number?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          rep_email?: string | null
          rep_name?: string | null
          rep_number?: string | null
        }
      }
      entrants: {
        Row: {
          blacklisted: boolean | null
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: number
          job_title: string | null
          last_name: string | null
          phone: string | null
          physical_address: string | null
        }
        Insert: {
          blacklisted?: boolean | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
          physical_address?: string | null
        }
        Update: {
          blacklisted?: boolean | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
          physical_address?: string | null
        }
      }
      entries: {
        Row: {
          created_at: string | null
          entrant_id: number | null
          id: number
          raffle_id: number | null
        }
        Insert: {
          created_at?: string | null
          entrant_id?: number | null
          id?: number
          raffle_id?: number | null
        }
        Update: {
          created_at?: string | null
          entrant_id?: number | null
          id?: number
          raffle_id?: number | null
        }
      }
      events: {
        Row: {
          community: number | null
          created_at: string | null
          end_time: string | null
          event_link: string | null
          id: number
          name: string | null
          organiser: number | null
          start_time: string | null
          type: string | null
          venue_name: string | null
          video_link: string | null
        }
        Insert: {
          community?: number | null
          created_at?: string | null
          end_time?: string | null
          event_link?: string | null
          id?: number
          name?: string | null
          organiser?: number | null
          start_time?: string | null
          type?: string | null
          venue_name?: string | null
          video_link?: string | null
        }
        Update: {
          community?: number | null
          created_at?: string | null
          end_time?: string | null
          event_link?: string | null
          id?: number
          name?: string | null
          organiser?: number | null
          start_time?: string | null
          type?: string | null
          venue_name?: string | null
          video_link?: string | null
        }
      }
      organisers: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          phone?: string | null
        }
      }
      prize_types: {
        Row: {
          description: string | null
          id: number
          type: string | null
          type_display: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          type?: string | null
          type_display?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          type?: string | null
          type_display?: string | null
        }
      }
      prizes: {
        Row: {
          created_at: string | null
          description: string | null
          donor: number | null
          id: number
          name: string
          type: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          donor?: number | null
          id?: number
          name: string
          type?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          donor?: number | null
          id?: number
          name?: string
          type?: number | null
        }
      }
      raffles: {
        Row: {
          completed_at: string | null
          created_at: string | null
          event: number | null
          id: number
          prize: number
          quantity: number | null
          run_by: string | null
          winners: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          event?: number | null
          id?: number
          prize: number
          quantity?: number | null
          run_by?: string | null
          winners?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          event?: number | null
          id?: number
          prize?: number
          quantity?: number | null
          run_by?: string | null
          winners?: number | null
        }
      }
      winnings: {
        Row: {
          closed: boolean | null
          created_at: string | null
          entry_id: number
          id: number
        }
        Insert: {
          closed?: boolean | null
          created_at?: string | null
          entry_id: number
          id?: number
        }
        Update: {
          closed?: boolean | null
          created_at?: string | null
          entry_id?: number
          id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
