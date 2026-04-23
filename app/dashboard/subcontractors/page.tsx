'use client'
import Link from 'next/link'
import { Plus, Search, Filter, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { MOCK_SUBS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { useState } from 'react'

const STATUS_FILTER = ['All', 'Active', 'Expiring', 'Expired', 'Pending', 'Blocked']

export default function SubcontractorsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const subs = MOCK_SUBS.filter(s => {
    const matchSearch = s.company_name.toLowerCase().includes(search.toLowerCase()) ||
                        s.contact_name.toLowerCase().includes(search.toLowerCase()) ||
                        s.trade.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || s.status === filter.toLowerCase()
    return matchSearch && matchFilter
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Subcontractors</h1>
          <p className="text-sm text-slate-500 mt-1">{MOCK_SUBS.length} subcontractors in your roster</p>
        </div>
        <Link href="/dashboard/subcontractors/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add subcontractor
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search subs, trades..."
            className="input pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTER.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                filter === f
                  ? 'bg-brand-500/10 border-brand-500/40 text-brand-400'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Company</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Trade</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Insurance</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">License</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Docs</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Score</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {subs.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-5 py-4">
                  <Link href={`/dashboard/subcontractors/${sub.id}`} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300 group-hover:bg-brand-500/20 group-hover:text-brand-400 transition-colors">
                      {sub.company_name.split(' ').map(w => w[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-100 group-hover:text-brand-400 transition-colors">
                        {sub.company_name}
                      </div>
                      <div className="text-xs text-slate-500">{sub.contact_name}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <span className="badge-slate">{sub.trade}</span>
                </td>
                <td className="px-5 py-4 text-sm">
                  {sub.insurance_expiry ? (
                    <div>
                      <div className={`text-xs font-medium ${
                        new Date(sub.insurance_expiry) < new Date() ? 'text-red-400' :
                        new Date(sub.insurance_expiry) < new Date(Date.now() + 60*24*60*60*1000) ? 'text-amber-400' :
                        'text-slate-300'
                      }`}>
                        {formatDate(sub.insurance_expiry)}
                      </div>
                      <div className="text-xs text-slate-600">{sub.insurance_carrier ?? 'On file'}</div>
                    </div>
                  ) : <span className="text-xs text-red-400">Missing</span>}
                </td>
                <td className="px-5 py-4 text-sm">
                  {sub.license_expiry ? (
                    <div>
                      <div className={`text-xs font-medium ${
                        new Date(sub.license_expiry) < new Date() ? 'text-red-400' :
                        new Date(sub.license_expiry) < new Date(Date.now() + 60*24*60*60*1000) ? 'text-amber-400' :
                        'text-slate-300'
                      }`}>
                        {sub.license_state} · {formatDate(sub.license_expiry)}
                      </div>
                      <div className="text-xs text-slate-600">{sub.license_number}</div>
                    </div>
                  ) : <span className="text-xs text-slate-500">Not required</span>}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div title="W-9">
                      {sub.w9_uploaded
                        ? <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" />
                        : <XCircle className="h-3.5 w-3.5 text-red-400" />}
                    </div>
                    <div title="Bank">
                      {sub.bank_verified
                        ? <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" />
                        : <XCircle className="h-3.5 w-3.5 text-red-400" />}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  {sub.score !== undefined ? (
                    <span className={`text-sm font-bold ${
                      sub.score >= 85 ? 'text-brand-400' :
                      sub.score >= 70 ? 'text-amber-400' : 'text-red-400'
                    }`}>{sub.score}</span>
                  ) : (
                    <span className="text-xs text-slate-600">—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className={
                    sub.status === 'active'   ? 'badge-green'  :
                    sub.status === 'expiring' ? 'badge-amber'  :
                    sub.status === 'expired'  ? 'badge-red'    :
                    sub.status === 'blocked'  ? 'badge-red'    : 'badge-slate'
                  }>
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subs.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            <p className="text-sm">No subcontractors match your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
