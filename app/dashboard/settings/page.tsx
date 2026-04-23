'use client'
import { useState } from 'react'
import { Save, Building2, Bell, CreditCard, Shield } from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [company, setCompany] = useState('Turner GC LLC')
  const [email, setEmail]     = useState('jason@turnergc.com')
  const [phone, setPhone]     = useState('(512) 555-0100')

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    toast.success('Settings saved')
    setSaving(false)
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="page-title mb-8">Settings</h1>

      <form onSubmit={save} className="flex flex-col gap-6">

        {/* Company */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="h-4 w-4 text-brand-400" />
            <h2 className="text-sm font-semibold text-slate-200">Company information</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Company name</label>
              <input className="input" value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            <div>
              <label className="label">Admin email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-slate-200">Alert preferences</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Insurance expiry alerts', desc: 'Alert 60 and 30 days before COI expires', defaultOn: true },
              { label: 'License expiry alerts',   desc: 'Alert 60 and 30 days before license expires', defaultOn: true },
              { label: 'Missing document alerts', desc: 'Alert when W-9 or bank details are missing', defaultOn: true },
              { label: 'Payment release emails',  desc: 'Email confirmation when ACH payment releases', defaultOn: false },
            ].map(pref => (
              <label key={pref.label} className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 relative">
                  <input type="checkbox" defaultChecked={pref.defaultOn} className="sr-only peer" />
                  <div className="w-9 h-5 rounded-full bg-slate-700 peer-checked:bg-brand-500 transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">{pref.label}</div>
                  <div className="text-xs text-slate-500">{pref.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Plan */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <CreditCard className="h-4 w-4 text-purple-400" />
            <h2 className="text-sm font-semibold text-slate-200">Subscription</h2>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-brand-500/5 border border-brand-500/20">
            <div>
              <div className="text-sm font-medium text-slate-100">Growth plan</div>
              <div className="text-xs text-slate-500">$599/month · Up to 100 subcontractors</div>
            </div>
            <span className="badge-green">Active</span>
          </div>
          <button type="button" className="btn-ghost mt-3 text-sm">
            Manage billing →
          </button>
        </div>

        {/* Integrations */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="h-4 w-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-slate-200">Integrations</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { name: 'DocuSign', desc: 'E-signature for lien waivers', connected: false },
              { name: 'Stripe',   desc: 'Subscription billing',         connected: true  },
              { name: 'Plaid',    desc: 'ACH payment release',           connected: false },
            ].map(int => (
              <div key={int.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                <div>
                  <div className="text-sm font-medium text-slate-200">{int.name}</div>
                  <div className="text-xs text-slate-500">{int.desc}</div>
                </div>
                {int.connected
                  ? <span className="badge-green">Connected</span>
                  : <button type="button" className="btn-secondary text-xs py-1.5" onClick={() => toast.info(`Add ${int.name} keys to .env.local`)}>Connect</button>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary">
            <Save className="h-4 w-4" />
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
