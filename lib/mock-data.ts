import type { Subcontractor, Project, LienWaiver, PayApp, ComplianceAlert } from '@/types'

export const MOCK_SUBS: Subcontractor[] = [
  {
    id: 'sub-1', gc_id: 'gc-1', company_name: 'Rivera Electric LLC',
    contact_name: 'Carlos Rivera', contact_email: 'carlos@riveraelectric.com',
    contact_phone: '(512) 555-0181', trade: 'Electrical',
    license_number: 'EL-2024-8821', license_state: 'TX',
    license_expiry: '2025-11-15', insurance_expiry: '2025-03-10',
    w9_uploaded: true, bank_verified: true, status: 'expiring', score: 87,
    created_at: '2024-08-01',
  },
  {
    id: 'sub-2', gc_id: 'gc-1', company_name: 'Summit Plumbing Co.',
    contact_name: 'Janet Kowalski', contact_email: 'janet@summitplumbing.com',
    contact_phone: '(512) 555-0234', trade: 'Plumbing',
    license_number: 'PL-2024-5533', license_state: 'TX',
    license_expiry: '2026-06-30', insurance_expiry: '2026-01-20',
    w9_uploaded: true, bank_verified: true, status: 'active', score: 94,
    created_at: '2024-07-15',
  },
  {
    id: 'sub-3', gc_id: 'gc-1', company_name: 'Atlas Drywall & Framing',
    contact_name: 'Mike Tran', contact_email: 'mike@atlasdrywall.com',
    contact_phone: '(512) 555-0399', trade: 'Drywall',
    license_number: 'GC-2023-3301', license_state: 'TX',
    license_expiry: '2024-12-31', insurance_expiry: '2024-12-05',
    w9_uploaded: true, bank_verified: false, status: 'expired', score: 61,
    created_at: '2024-06-10',
  },
  {
    id: 'sub-4', gc_id: 'gc-1', company_name: 'Vega HVAC Systems',
    contact_name: 'Sofia Vega', contact_email: 'sofia@vegahvac.com',
    contact_phone: '(512) 555-0412', trade: 'HVAC',
    license_number: 'HVAC-2024-7712', license_state: 'TX',
    license_expiry: '2026-09-15', insurance_expiry: '2026-03-28',
    w9_uploaded: true, bank_verified: true, status: 'active', score: 91,
    created_at: '2024-09-01',
  },
  {
    id: 'sub-5', gc_id: 'gc-1', company_name: 'Precision Concrete LLC',
    contact_name: 'Aaron Wells', contact_email: 'aaron@precisionconcrete.com',
    contact_phone: '(512) 555-0511', trade: 'Concrete',
    license_number: undefined, license_state: undefined,
    license_expiry: undefined, insurance_expiry: '2025-08-14',
    w9_uploaded: false, bank_verified: false, status: 'pending', score: undefined,
    created_at: '2025-01-10',
  },
]

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1', gc_id: 'gc-1',
    name: 'Lakewood Office Complex — Phase 2',
    address: '4400 Lakewood Blvd, Austin, TX 78701',
    value: 4_200_000, status: 'active',
    start_date: '2024-09-01', end_date: '2025-07-30',
    created_at: '2024-08-20',
  },
  {
    id: 'proj-2', gc_id: 'gc-1',
    name: 'Riverside Mixed-Use Retail',
    address: '820 Riverside Dr, Austin, TX 78704',
    value: 1_800_000, status: 'active',
    start_date: '2024-11-15', end_date: '2025-05-15',
    created_at: '2024-11-01',
  },
  {
    id: 'proj-3', gc_id: 'gc-1',
    name: 'Cedar Park Warehouse Expansion',
    address: '210 Industrial Pkwy, Cedar Park, TX 78613',
    value: 950_000, status: 'completed',
    start_date: '2024-04-01', end_date: '2024-12-15',
    created_at: '2024-03-15',
  },
]

export const MOCK_WAIVERS: LienWaiver[] = [
  {
    id: 'wv-1', project_id: 'proj-1', subcontractor_id: 'sub-2',
    type: 'conditional_progress', amount: 48_000,
    through_date: '2025-01-31', status: 'signed',
    signed_at: '2025-02-02', created_at: '2025-01-28',
    subcontractor: MOCK_SUBS[1],
  },
  {
    id: 'wv-2', project_id: 'proj-1', subcontractor_id: 'sub-4',
    type: 'conditional_progress', amount: 62_500,
    through_date: '2025-01-31', status: 'sent',
    created_at: '2025-01-30',
    subcontractor: MOCK_SUBS[3],
  },
  {
    id: 'wv-3', project_id: 'proj-1', subcontractor_id: 'sub-1',
    type: 'conditional_progress', amount: 31_200,
    through_date: '2025-01-31', status: 'draft',
    created_at: '2025-01-30',
    subcontractor: MOCK_SUBS[0],
  },
]

export const MOCK_PAY_APPS: PayApp[] = [
  {
    id: 'pa-1', project_id: 'proj-1', subcontractor_id: 'sub-2',
    period_start: '2025-01-01', period_end: '2025-01-31',
    amount_requested: 48_000, amount_approved: 48_000,
    retainage_held: 4_800, status: 'released',
    lien_waiver_id: 'wv-1', created_at: '2025-01-28',
    subcontractor: MOCK_SUBS[1],
  },
  {
    id: 'pa-2', project_id: 'proj-1', subcontractor_id: 'sub-4',
    period_start: '2025-01-01', period_end: '2025-01-31',
    amount_requested: 62_500, amount_approved: undefined,
    retainage_held: 6_250, status: 'pending',
    lien_waiver_id: 'wv-2', created_at: '2025-01-30',
    subcontractor: MOCK_SUBS[3],
  },
  {
    id: 'pa-3', project_id: 'proj-1', subcontractor_id: 'sub-1',
    period_start: '2025-01-01', period_end: '2025-01-31',
    amount_requested: 31_200, amount_approved: undefined,
    retainage_held: 3_120, status: 'blocked',
    created_at: '2025-01-31',
    subcontractor: MOCK_SUBS[0],
  },
]

export const MOCK_ALERTS: ComplianceAlert[] = [
  { id: 'al-1', subcontractor_id: 'sub-1', type: 'insurance_expiry', days_until: 18, resolved: false, subcontractor: MOCK_SUBS[0] },
  { id: 'al-2', subcontractor_id: 'sub-1', type: 'license_expiry',   days_until: 47, resolved: false, subcontractor: MOCK_SUBS[0] },
  { id: 'al-3', subcontractor_id: 'sub-3', type: 'insurance_expiry', days_until: -37, resolved: false, subcontractor: MOCK_SUBS[2] },
  { id: 'al-4', subcontractor_id: 'sub-3', type: 'bank_unverified',  days_until: 0, resolved: false, subcontractor: MOCK_SUBS[2] },
  { id: 'al-5', subcontractor_id: 'sub-5', type: 'w9_missing',       days_until: 0, resolved: false, subcontractor: MOCK_SUBS[4] },
]

export const DASHBOARD_STATS = {
  activeSubs: 4,
  totalSubs: 5,
  alertsCount: 5,
  pendingWaivers: 2,
  pendingPayments: 143_700,
  releasedThisMonth: 48_000,
  activeProjects: 2,
}
