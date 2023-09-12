export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
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
        Relationships: [
          {
            foreignKeyName: "communities_organiser_fkey"
            columns: ["organiser"]
            referencedRelation: "organisers"
            referencedColumns: ["id"]
          }
        ]
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
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          rep_email?: string | null
          rep_name?: string | null
          rep_number?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          rep_email?: string | null
          rep_name?: string | null
          rep_number?: string | null
          website?: string | null
        }
        Relationships: []
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "entries_entrant_id_fkey"
            columns: ["entrant_id"]
            referencedRelation: "entrants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_raffle_id_fkey"
            columns: ["raffle_id"]
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "events_community_fkey"
            columns: ["community"]
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organiser_fkey"
            columns: ["organiser"]
            referencedRelation: "organisers"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "prizes_donor_fkey"
            columns: ["donor"]
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prizes_type_fkey"
            columns: ["type"]
            referencedRelation: "prize_types"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "raffles_event_fkey"
            columns: ["event"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_prize_fkey"
            columns: ["prize"]
            referencedRelation: "prizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_winners_fkey"
            columns: ["winners"]
            referencedRelation: "winnings"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "winnings_entry_id_fkey"
            columns: ["entry_id"]
            referencedRelation: "entries"
            referencedColumns: ["id"]
          }
        ]
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
