'use client'
import { useState } from 'react'
import { ShieldAlert, ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Bell } from 'lucide-react'
import { MOCK_ALERTS } from '@/lib/mock-data'
import { toast } from 'sonner'
import type { ComplianceAlert } from '@/types'

const ALERT_META = {
  insurance_expiry: { label: 'Insurance expiry', icon: ShieldAlert, color: 'text-red-400' },
  license_expiry:   { label: 'License expiry',   icon: ShieldAlert, color: 'text-amber-400' },
  w9_missing:       { label: 'W-9 missing',       icon: XCircle,     color: 'text-red-400' },
  bank_unverified:  { label: 'Bank unverified',   icon: XCircle,     color: 'text-red-400' },
}

export default function AlertsPage() {
  const [resolved, setResolved] = useState<string[]>([])

  const active   = MOCK_ALERTS.filter(a => !resolved.includes(a.id))
  const resolvedList = MOCK_ALERTS.filter(a => resolved.includes(a.id))

  function resolve(a: ComplianceAlert) {
    setResolved(r => [...r, a.id])
    toast.success(`Alert for ${a.subcontractor?.company_name} marked resolved`)
  }

  const critical = active.filter(a => a.days_until <= 0)
  const warning  = active.filter(a => a.days_until > 0 && a.days_until < 60)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Bell className="h-6 w-6 text-amber-400" />
        <div>
          <h1 className="page-title">Compliance alerts</h1>
          <p className="text-sm text-slate-500 mt-0.5">{active.length} active alert{active.length !== 1 ? 's' : ''} requiring attention</p>
        </div>
      </div>

      {/* Critical */}
      {critical.length > 0 && (
        <div className="mb-6">
          <div className="section-title text-red-500">Critical — payments blocked</div>
          <div className="flex flex-col gap-3">
            {critical.map(a => {
              const meta = ALERT_META[a.type]
              return (
                <div key={a.id} className="card border-red-500/30 p-4 flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 flex-shrink-0">
                    <meta.icon className="h-4 w-4 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-100">{a.subcontractor?.company_name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{meta.label} — <span className="text-red-400 font-medium">EXPIRED</span></div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="badge-red">Expired</span>
                    <button onClick={() => resolve(a)} className="btn-ghost text-xs py-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Resolve
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Warning */}
      {warning.length > 0 && (
        <div className="mb-6">
          <div className="section-title text-amber-500">Expiring soon</div>
          <div className="flex flex-col gap-3">
            {warning.map(a => {
              const meta = ALERT_META[a.type]
              return (
                <div key={a.id} className="card p-4 flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-100">{a.subcontractor?.company_name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {meta.label} — <span className="text-amber-400 font-medium">{a.days_until} days remaining</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="badge-amber">{a.days_until}d</span>
                    <button onClick={() => resolve(a)} className="btn-ghost text-xs py-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Resolve
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {active.length === 0 && (
        <div className="card p-16 text-center">
          <ShieldCheck className="h-12 w-12 text-brand-400 mx-auto mb-4" />
          <div className="text-lg font-semibold text-white mb-1">All clear!</div>
          <p className="text-sm text-slate-500">No active compliance alerts. All subcontractors are in good standing.</p>
        </div>
      )}

      {/* Resolved */}
      {resolvedList.length > 0 && (
        <div>
          <div className="section-title text-slate-600">Resolved this session</div>
          <div className="flex flex-col gap-2">
            {resolvedList.map(a => (
              <div key={a.id} className="card p-3 flex items-center gap-3 opacity-50">
                <CheckCircle2 className="h-4 w-4 text-brand-400" />
                <span className="text-sm text-slate-400">{a.subcontractor?.company_name} — {ALERT_META[a.type].label}</span>
                <span className="badge-green ml-auto">Resolved</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
