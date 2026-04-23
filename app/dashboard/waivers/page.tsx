'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, FileSignature, CheckCircle2, Clock, Send, FileText } from 'lucide-react'
import { MOCK_WAIVERS } from '@/lib/mock-data'
import { formatDate, formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

const WAIVER_LABELS = {
  conditional_progress:   'Conditional Progress',
  unconditional_progress: 'Unconditional Progress',
  conditional_final:      'Conditional Final',
  unconditional_final:    'Unconditional Final',
}

export default function WaiversPage() {
  const [sending, setSending] = useState<string | null>(null)

  async function sendWaiver(id: string, company: string) {
    setSending(id)
    await new Promise(r => setTimeout(r, 900))
    toast.success(`Waiver sent to ${company} for e-signature`)
    setSending(null)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Lien Waivers</h1>
          <p className="text-sm text-slate-500 mt-1">Generate, send, and track lien waivers for all active projects</p>
        </div>
        <button className="btn-primary" onClick={() => toast.info('Waiver generator coming in Month 2 build!')}>
          <Plus className="h-4 w-4" />
          Generate waiver
        </button>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Signed', count: MOCK_WAIVERS.filter(w => w.status === 'signed').length, color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20' },
          { label: 'Awaiting signature', count: MOCK_WAIVERS.filter(w => w.status === 'sent').length, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
          { label: 'Draft', count: MOCK_WAIVERS.filter(w => w.status === 'draft').length, color: 'text-slate-400', bg: 'bg-slate-800 border-slate-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.bg}`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Waivers table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">All waivers</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Subcontractor</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Type</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Amount</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Through date</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {MOCK_WAIVERS.map(w => (
              <tr key={w.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="text-sm font-medium text-slate-100">{w.subcontractor?.company_name}</div>
                  <div className="text-xs text-slate-500">{w.subcontractor?.trade}</div>
                </td>
                <td className="px-5 py-4">
                  <span className="badge-slate text-xs">{WAIVER_LABELS[w.type]}</span>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-slate-100">
                  {formatCurrency(w.amount)}
                </td>
                <td className="px-5 py-4 text-sm text-slate-300">
                  {formatDate(w.through_date)}
                </td>
                <td className="px-5 py-4">
                  <span className={
                    w.status === 'signed' ? 'badge-green'  :
                    w.status === 'sent'   ? 'badge-amber'  :
                    w.status === 'draft'  ? 'badge-slate'  : 'badge-red'
                  }>
                    {w.status === 'signed' && <CheckCircle2 className="h-3 w-3" />}
                    {w.status === 'sent'   && <Clock className="h-3 w-3" />}
                    {w.status === 'draft'  && <FileText className="h-3 w-3" />}
                    {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                    {w.signed_at && ` · ${formatDate(w.signed_at)}`}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {w.status === 'draft' && (
                    <button
                      onClick={() => sendWaiver(w.id, w.subcontractor?.company_name ?? '')}
                      disabled={sending === w.id}
                      className="btn-secondary py-1.5 text-xs"
                    >
                      <Send className="h-3 w-3" />
                      {sending === w.id ? 'Sending…' : 'Send for signature'}
                    </button>
                  )}
                  {w.status === 'sent' && (
                    <span className="text-xs text-amber-400">Awaiting sub…</span>
                  )}
                  {w.status === 'signed' && (
                    <button className="btn-ghost py-1.5 text-xs">
                      <FileSignature className="h-3 w-3" />
                      Download PDF
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info note about DocuSign */}
      <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-500">
        <span className="font-medium text-slate-400">E-signatures: </span>
        Waivers are sent via DocuSign when you subscribe. During development, the
        flow is mocked. Add your <code className="font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">DOCUSIGN_INTEGRATION_KEY</code> in
        <code className="font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded mx-1">.env.local</code>
        to enable real sending.
      </div>
    </div>
  )
}
