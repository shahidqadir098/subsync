'use client'
import Link from 'next/link'
import {
  Users, Bell, FileSignature, CreditCard, AlertTriangle,
  TrendingUp, CheckCircle2, XCircle, Clock, Plus, ArrowRight,
  ShieldAlert, ShieldCheck, Building2
} from 'lucide-react'
import { DASHBOARD_STATS, MOCK_ALERTS, MOCK_PAY_APPS, MOCK_SUBS } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'

const statusColor = {
  active:   'badge-green',
  expiring: 'badge-amber',
  expired:  'badge-red',
  blocked:  'badge-red',
  pending:  'badge-slate',
} as const

const payStatusColor = {
  released: 'badge-green',
  pending:  'badge-amber',
  blocked:  'badge-red',
  approved: 'badge-blue',
} as const

export default function DashboardPage() {
  const criticalAlerts = MOCK_ALERTS.filter(a => a.days_until <= 0 || a.days_until < 30)

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Jason. Here&apos;s what needs your attention.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/subcontractors/new" className="btn-primary">
            <Plus className="h-4 w-4" />
            Add subcontractor
          </Link>
        </div>
      </div>

      {/* Critical alert banner */}
      {criticalAlerts.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/5 p-4 flex items-center gap-3">
          <ShieldAlert className="h-5 w-5 text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-medium text-red-300">
              {criticalAlerts.length} compliance issue{criticalAlerts.length > 1 ? 's' : ''} require immediate action
            </span>
            <span className="text-xs text-red-400/70 ml-2">
              — payments are blocked until resolved
            </span>
          </div>
          <Link href="/dashboard/alerts" className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Active subs</span>
            <Users className="h-4 w-4 text-brand-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-1">{DASHBOARD_STATS.activeSubs}</div>
          <div className="text-xs text-slate-500">of {DASHBOARD_STATS.totalSubs} total</div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Open alerts</span>
            <Bell className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-1">{DASHBOARD_STATS.alertsCount}</div>
          <div className="text-xs text-amber-500">{criticalAlerts.length} critical</div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Pending waivers</span>
            <FileSignature className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-1">{DASHBOARD_STATS.pendingWaivers}</div>
          <div className="text-xs text-slate-500">awaiting signature</div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Pending payments</span>
            <CreditCard className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-1">
            {formatCurrency(DASHBOARD_STATS.pendingPayments)}
          </div>
          <div className="text-xs text-slate-500">
            {formatCurrency(DASHBOARD_STATS.releasedThisMonth)} released this month
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Compliance alerts */}
        <div className="lg:col-span-1">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-100">Compliance alerts</h2>
              <Link href="/dashboard/alerts" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK_ALERTS.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  {alert.days_until <= 0
                    ? <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    : alert.days_until < 30
                    ? <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    : <Clock className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate">
                      {alert.subcontractor?.company_name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {alert.type === 'insurance_expiry' && 'Insurance'}
                      {alert.type === 'license_expiry'   && 'License'}
                      {alert.type === 'w9_missing'       && 'W-9 missing'}
                      {alert.type === 'bank_unverified'  && 'Bank unverified'}
                      {alert.days_until <= 0
                        ? ' — EXPIRED'
                        : ` — ${alert.days_until}d left`}
                    </p>
                  </div>
                  <span className={alert.days_until <= 0 ? 'badge-red' : 'badge-amber'}>
                    {alert.days_until <= 0 ? 'Expired' : `${alert.days_until}d`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Recent pay apps */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-100">Payment applications</h2>
              <Link href="/dashboard/payments" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {MOCK_PAY_APPS.map((pa) => (
                <div key={pa.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-100 truncate">
                      {pa.subcontractor?.company_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Period: {formatDate(pa.period_start)} – {formatDate(pa.period_end)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-100">
                      {formatCurrency(pa.amount_requested)}
                    </p>
                    <p className="text-xs text-slate-500">
                      -{formatCurrency(pa.retainage_held)} retainage
                    </p>
                  </div>
                  <span className={payStatusColor[pa.status]}>
                    {pa.status === 'released' && <CheckCircle2 className="h-3 w-3" />}
                    {pa.status === 'blocked'  && <XCircle className="h-3 w-3" />}
                    {pa.status === 'pending'  && <Clock className="h-3 w-3" />}
                    {pa.status.charAt(0).toUpperCase() + pa.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub roster quick view */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-100">Subcontractor roster</h2>
              <Link href="/dashboard/subcontractors" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {MOCK_SUBS.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/dashboard/subcontractors/${sub.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/40 transition-colors group"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300">
                    {sub.company_name.split(' ').map(w => w[0]).join('').slice(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-100 truncate group-hover:text-brand-400 transition-colors">
                      {sub.company_name}
                    </p>
                    <p className="text-xs text-slate-500">{sub.trade} · {sub.contact_name}</p>
                  </div>
                  {sub.score !== undefined && (
                    <div className="text-right">
                      <div className={`text-sm font-bold ${sub.score >= 85 ? 'text-brand-400' : sub.score >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                        {sub.score}
                      </div>
                      <div className="text-xs text-slate-600">score</div>
                    </div>
                  )}
                  <span className={statusColor[sub.status] ?? 'badge-slate'}>
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
