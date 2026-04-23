'use client'
import Link from 'next/link'
import { ArrowLeft, Phone, Mail, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, FileSignature, CreditCard, Star } from 'lucide-react'
import { MOCK_SUBS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { use } from 'react'

export default function SubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const sub = MOCK_SUBS.find(s => s.id === id) ?? MOCK_SUBS[0]

  const insuranceOk = sub.insurance_expiry && new Date(sub.insurance_expiry) > new Date(Date.now() + 60*24*60*60*1000)
  const licenseOk   = sub.license_expiry  && new Date(sub.license_expiry)  > new Date(Date.now() + 60*24*60*60*1000)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/subcontractors" className="btn-ghost p-2">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="page-title">{sub.company_name}</h1>
          <p className="text-sm text-slate-500">{sub.trade}</p>
        </div>
        <span className={
          sub.status === 'active'   ? 'badge-green'  :
          sub.status === 'expiring' ? 'badge-amber'  :
          sub.status === 'expired'  ? 'badge-red'    : 'badge-slate'
        }>
          {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {/* Score card */}
        <div className="card p-5 flex flex-col items-center justify-center gap-2 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Performance score</div>
          {sub.score !== undefined ? (
            <>
              <div className={`text-6xl font-bold ${sub.score >= 85 ? 'text-brand-400' : sub.score >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                {sub.score}
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`h-4 w-4 ${i <= Math.round(sub.score!/20) ? 'fill-brand-400 text-brand-400' : 'text-slate-700'}`} />
                ))}
              </div>
              <p className="text-xs text-slate-500">{sub.score >= 85 ? 'Top performer' : sub.score >= 70 ? 'Good standing' : 'Needs attention'}</p>
            </>
          ) : (
            <p className="text-sm text-slate-500">Not yet scored</p>
          )}
        </div>

        {/* Contact info */}
        <div className="card p-5 md:col-span-2">
          <h2 className="section-title">Contact details</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-xs text-slate-500 mb-1">Contact person</div>
              <div className="text-sm text-slate-200 font-medium">{sub.contact_name}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Trade</div>
              <div className="text-sm text-slate-200">{sub.trade}</div>
            </div>
            <a href={`mailto:${sub.contact_email}`} className="flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors">
              <Mail className="h-3.5 w-3.5" /> {sub.contact_email}
            </a>
            {sub.contact_phone && (
              <a href={`tel:${sub.contact_phone}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-slate-100 transition-colors">
                <Phone className="h-3.5 w-3.5" /> {sub.contact_phone}
              </a>
            )}
          </div>
        </div>

        {/* Insurance */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Insurance</h2>
            {insuranceOk
              ? <ShieldCheck className="h-4 w-4 text-brand-400" />
              : <ShieldAlert className="h-4 w-4 text-red-400" />}
          </div>
          {sub.insurance_expiry ? (
            <div className="flex flex-col gap-2">
              <div>
                <div className="text-xs text-slate-500">Expiry</div>
                <div className={`text-sm font-medium ${insuranceOk ? 'text-slate-200' : 'text-red-400'}`}>
                  {formatDate(sub.insurance_expiry)}
                </div>
              </div>
              {sub.insurance_carrier && (
                <div>
                  <div className="text-xs text-slate-500">Carrier</div>
                  <div className="text-sm text-slate-200">{sub.insurance_carrier}</div>
                </div>
              )}
              {!insuranceOk && (
                <div className="mt-2 rounded-lg bg-red-500/10 border border-red-500/20 p-2 text-xs text-red-400">
                  ⚠ Expired or expiring soon — payments are blocked
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-red-400">No COI on file</p>
          )}
        </div>

        {/* License */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">License</h2>
            {licenseOk
              ? <CheckCircle2 className="h-4 w-4 text-brand-400" />
              : <XCircle className="h-4 w-4 text-amber-400" />}
          </div>
          {sub.license_number ? (
            <div className="flex flex-col gap-2">
              <div>
                <div className="text-xs text-slate-500">License #</div>
                <div className="text-sm font-mono text-slate-200">{sub.license_number}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">State · Expiry</div>
                <div className={`text-sm font-medium ${licenseOk ? 'text-slate-200' : 'text-amber-400'}`}>
                  {sub.license_state} · {sub.license_expiry ? formatDate(sub.license_expiry) : 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No license required for this trade</p>
          )}
        </div>

        {/* Documents */}
        <div className="card p-5">
          <h2 className="section-title">Documents</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">W-9 form</span>
              {sub.w9_uploaded
                ? <span className="badge-green"><CheckCircle2 className="h-3 w-3" /> On file</span>
                : <span className="badge-red"><XCircle className="h-3 w-3" /> Missing</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Bank account</span>
              {sub.bank_verified
                ? <span className="badge-green"><CheckCircle2 className="h-3 w-3" /> Verified</span>
                : <span className="badge-red"><XCircle className="h-3 w-3" /> Not verified</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Insurance COI</span>
              {sub.insurance_expiry
                ? <span className="badge-green"><CheckCircle2 className="h-3 w-3" /> On file</span>
                : <span className="badge-red"><XCircle className="h-3 w-3" /> Missing</span>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card p-5 md:col-span-3">
          <h2 className="section-title">Quick actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/waivers" className="btn-secondary">
              <FileSignature className="h-4 w-4" />
              Generate lien waiver
            </Link>
            <Link href="/dashboard/payments" className="btn-secondary">
              <CreditCard className="h-4 w-4" />
              Create pay application
            </Link>
            <button className="btn-secondary">
              <Mail className="h-4 w-4" />
              Resend onboarding link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
