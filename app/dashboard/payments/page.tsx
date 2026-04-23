'use client'
import { useState } from 'react'
import { CheckCircle2, XCircle, Clock, CreditCard, ShieldAlert } from 'lucide-react'
import { MOCK_PAY_APPS } from '@/lib/mock-data'
import { formatDate, formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

export default function PaymentsPage() {
  const [releasing, setReleasing] = useState<string | null>(null)

  const total   = MOCK_PAY_APPS.reduce((s, p) => s + p.amount_requested, 0)
  const released = MOCK_PAY_APPS.filter(p => p.status === 'released').reduce((s, p) => s + p.amount_requested, 0)
  const blocked  = MOCK_PAY_APPS.filter(p => p.status === 'blocked').reduce((s, p) => s + p.amount_requested, 0)

  async function releasePayment(id: string, company: string) {
    setReleasing(id)
    await new Promise(r => setTimeout(r, 1000))
    toast.success(`ACH payment released to ${company}`)
    setReleasing(null)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="page-title">Payments</h1>
        <p className="text-sm text-slate-500 mt-1">Review and release pay applications. Payments are blocked if compliance is not met.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total this cycle</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(total)}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Released</div>
          <div className="text-2xl font-bold text-brand-400">{formatCurrency(released)}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Blocked</div>
          <div className="text-2xl font-bold text-red-400">{formatCurrency(blocked)}</div>
          <div className="text-xs text-slate-500 mt-0.5">compliance issues</div>
        </div>
      </div>

      {/* Pay apps */}
      <div className="flex flex-col gap-4">
        {MOCK_PAY_APPS.map(pa => (
          <div key={pa.id} className={`card p-5 ${pa.status === 'blocked' ? 'border-red-500/30' : ''}`}>
            <div className="flex items-start gap-4 flex-wrap">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300 flex-shrink-0">
                {pa.subcontractor?.company_name.split(' ').map(w => w[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-slate-100">{pa.subcontractor?.company_name}</span>
                  <span className="badge-slate">{pa.subcontractor?.trade}</span>
                  <span className={
                    pa.status === 'released' ? 'badge-green' :
                    pa.status === 'blocked'  ? 'badge-red'   :
                    pa.status === 'pending'  ? 'badge-amber' : 'badge-blue'
                  }>
                    {pa.status === 'released' && <CheckCircle2 className="h-3 w-3" />}
                    {pa.status === 'blocked'  && <XCircle className="h-3 w-3" />}
                    {pa.status === 'pending'  && <Clock className="h-3 w-3" />}
                    {pa.status.charAt(0).toUpperCase() + pa.status.slice(1)}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Period: {formatDate(pa.period_start)} – {formatDate(pa.period_end)}
                </div>
                {pa.status === 'blocked' && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Payment blocked: insurance expired or lien waiver not signed
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{formatCurrency(pa.amount_requested)}</div>
                <div className="text-xs text-slate-500">-{formatCurrency(pa.retainage_held)} retainage</div>
                <div className="text-sm font-medium text-slate-200 mt-0.5">
                  Net: {formatCurrency(pa.amount_requested - pa.retainage_held)}
                </div>
              </div>
            </div>

            {/* Actions */}
            {pa.status === 'pending' && (
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => releasePayment(pa.id, pa.subcontractor?.company_name ?? '')}
                  disabled={releasing === pa.id}
                  className="btn-primary"
                >
                  <CreditCard className="h-4 w-4" />
                  {releasing === pa.id ? 'Releasing…' : 'Release ACH payment'}
                </button>
                <button className="btn-secondary">Request revision</button>
                <span className="text-xs text-slate-500 ml-auto">
                  Lien waiver: {pa.lien_waiver_id ? '✓ on file' : '⚠ required before release'}
                </span>
              </div>
            )}
            {pa.status === 'released' && (
              <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
                Payment released via ACH
              </div>
            )}
            {pa.status === 'blocked' && (
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3">
                <button className="btn-danger" onClick={() => toast.info('Resolve compliance issues first')}>
                  <ShieldAlert className="h-4 w-4" />
                  View compliance issues
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
