'use client'
import Link from 'next/link'
import { Plus, Building2, MapPin, Calendar, DollarSign } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mock-data'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function ProjectsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">{MOCK_PROJECTS.filter(p => p.status === 'active').length} active projects</p>
        </div>
        <button className="btn-primary" onClick={() => alert('Add project form — connect to Supabase to enable')}>
          <Plus className="h-4 w-4" />
          New project
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {MOCK_PROJECTS.map(proj => (
          <div key={proj.id} className="card-hover p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10">
                <Building2 className="h-5 w-5 text-brand-400" />
              </div>
              <span className={
                proj.status === 'active'    ? 'badge-green'  :
                proj.status === 'completed' ? 'badge-slate'  : 'badge-amber'
              }>
                {proj.status.charAt(0).toUpperCase() + proj.status.slice(1)}
              </span>
            </div>

            <h2 className="text-base font-semibold text-slate-100 mb-3 leading-snug">{proj.name}</h2>

            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{proj.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{formatCurrency(proj.value)} contract value</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{formatDate(proj.start_date)} → {proj.end_date ? formatDate(proj.end_date) : 'TBD'}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex gap-2">
                <Link href="/dashboard/waivers"  className="btn-ghost text-xs py-1.5">Waivers</Link>
                <Link href="/dashboard/payments" className="btn-ghost text-xs py-1.5">Payments</Link>
              </div>
              <span className="text-xs text-slate-600">Added {formatDate(proj.created_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
