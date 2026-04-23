export type SubStatus = 'pending' | 'active' | 'expiring' | 'expired' | 'blocked'
export type WaiverType = 'conditional_progress' | 'unconditional_progress' | 'conditional_final' | 'unconditional_final'
export type WaiverStatus = 'draft' | 'sent' | 'signed' | 'rejected'
export type PaymentStatus = 'pending' | 'approved' | 'released' | 'blocked'
export type ProjectStatus = 'active' | 'completed' | 'on_hold'

export interface GCProfile {
  id: string
  user_id: string
  company_name: string
  license_number?: string
  address?: string
  phone?: string
  plan: 'starter' | 'growth' | 'enterprise'
  created_at: string
}

export interface Subcontractor {
  id: string
  gc_id: string
  company_name: string
  contact_name: string
  contact_email: string
  contact_phone?: string
  trade: string
  license_number?: string
  license_state?: string
  license_expiry?: string
  insurance_expiry?: string
  insurance_carrier?: string
  w9_uploaded: boolean
  bank_verified: boolean
  status: SubStatus
  score?: number
  created_at: string
}

export interface Project {
  id: string
  gc_id: string
  name: string
  address: string
  value: number
  status: ProjectStatus
  start_date: string
  end_date?: string
  created_at: string
}

export interface ProjectSub {
  id: string
  project_id: string
  subcontractor_id: string
  contract_value: number
  retainage_pct: number
  subcontractor?: Subcontractor
}

export interface LienWaiver {
  id: string
  project_id: string
  subcontractor_id: string
  type: WaiverType
  amount: number
  through_date: string
  status: WaiverStatus
  signed_at?: string
  docusign_envelope_id?: string
  created_at: string
  subcontractor?: Subcontractor
}

export interface PayApp {
  id: string
  project_id: string
  subcontractor_id: string
  period_start: string
  period_end: string
  amount_requested: number
  amount_approved?: number
  retainage_held: number
  status: PaymentStatus
  lien_waiver_id?: string
  notes?: string
  created_at: string
  subcontractor?: Subcontractor
}

export interface ComplianceAlert {
  id: string
  subcontractor_id: string
  type: 'insurance_expiry' | 'license_expiry' | 'w9_missing' | 'bank_unverified'
  days_until: number
  resolved: boolean
  subcontractor?: Subcontractor
}
