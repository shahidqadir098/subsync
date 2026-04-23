'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'

const TRADES = [
  'Electrical', 'Plumbing', 'HVAC', 'Drywall', 'Framing', 'Concrete',
  'Roofing', 'Painting', 'Flooring', 'Masonry', 'Steel / Ironwork',
  'Glazing', 'Landscaping', 'Excavation', 'Other',
]

export default function NewSubcontractorPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    company_name: '', contact_name: '', contact_email: '', contact_phone: '',
    trade: '', license_number: '', license_state: '', license_expiry: '',
    insurance_expiry: '', insurance_carrier: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.company_name || !form.contact_email || !form.trade) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSaving(true)
    // TODO: save to Supabase
    await new Promise(r => setTimeout(r, 800))
    toast.success(`${form.company_name} added to your roster.`)
    router.push('/dashboard/subcontractors')
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/subcontractors" className="btn-ghost p-2">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="page-title">Add subcontractor</h1>
          <p className="text-sm text-slate-500 mt-0.5">A welcome email with the onboarding portal link will be sent automatically.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Company info */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-slate-200 mb-5">Company information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Company name <span className="text-red-400">*</span></label>
              <input className="input" placeholder="Rivera Electric LLC" value={form.company_name} onChange={e => set('company_name', e.target.value)} required />
            </div>
            <div>
              <label className="label">Contact name <span className="text-red-400">*</span></label>
              <input className="input" placeholder="Carlos Rivera" value={form.contact_name} onChange={e => set('contact_name', e.target.value)} required />
            </div>
            <div>
              <label className="label">Contact email <span className="text-red-400">*</span></label>
              <input className="input" type="email" placeholder="carlos@company.com" value={form.contact_email} onChange={e => set('contact_email', e.target.value)} required />
            </div>
            <div>
              <label className="label">Contact phone</label>
              <input className="input" placeholder="(512) 555-0000" value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} />
            </div>
            <div>
              <label className="label">Trade <span className="text-red-400">*</span></label>
              <select className="input" value={form.trade} onChange={e => set('trade', e.target.value)} required>
                <option value="">Select trade…</option>
                {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* License */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-slate-200 mb-5">License details</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="label">License number</label>
              <input className="input" placeholder="EL-2024-8821" value={form.license_number} onChange={e => set('license_number', e.target.value)} />
            </div>
            <div>
              <label className="label">State</label>
              <input className="input" placeholder="TX" maxLength={2} value={form.license_state} onChange={e => set('license_state', e.target.value.toUpperCase())} />
            </div>
            <div>
              <label className="label">Expiry date</label>
              <input className="input" type="date" value={form.license_expiry} onChange={e => set('license_expiry', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Insurance */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-slate-200 mb-5">Insurance</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Insurance carrier</label>
              <input className="input" placeholder="Liberty Mutual" value={form.insurance_carrier} onChange={e => set('insurance_carrier', e.target.value)} />
            </div>
            <div>
              <label className="label">COI expiry date</label>
              <input className="input" type="date" value={form.insurance_expiry} onChange={e => set('insurance_expiry', e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            SubSync will send automatic alerts 60 and 30 days before this date expires.
          </p>
        </div>

        {/* Notice */}
        <div className="rounded-lg border border-brand-500/20 bg-brand-500/5 p-4 text-sm text-slate-400">
          <span className="font-medium text-brand-400">Self-onboarding portal: </span>
          After saving, SubSync will email this subcontractor a secure link to upload their W-9,
          bank details, and insurance certificate directly — no manual collection needed.
        </div>

        <div className="flex items-center gap-3 justify-end">
          <Link href="/dashboard/subcontractors" className="btn-secondary">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary">
            <Save className="h-4 w-4" />
            {saving ? 'Saving…' : 'Add subcontractor'}
          </button>
        </div>
      </form>
    </div>
  )
}
