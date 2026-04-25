'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Building2, MapPin, Calendar, DollarSign, X } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'
import { MOCK_PROJECTS } from '@/lib/mock-data'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { ProjectStatus } from '@/types'

interface NewProjectForm {
  name: string
  address: string
  value: string
  start_date: string
  end_date: string
  status: ProjectStatus
}

const EMPTY: NewProjectForm = {
  name: '', address: '', value: '', start_date: '', end_date: '', status: 'active'
}

export default function ProjectsPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<NewProjectForm>(EMPTY)
  const [loading, setLoading] = useState(false)

  function set(field: keyof NewProjectForm, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { toast.error('Not authenticated'); setLoading(false); return }

    // Get gc_id from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!profile) { toast.error('Profile not found'); setLoading(false); return }

    const { error } = await supabase.from('projects').insert({
      gc_id: profile.id,
      name: form.name,
      address: form.address,
      value: parseFloat(form.value),
      start_date: form.start_date,
      end_date: form.end_date || null,
      status: form.status,
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Project created')
    setOpen(false)
    setForm(EMPTY)
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">
            {MOCK_PROJECTS.filter(p => p.status === 'active').length} active projects
          </p>
        </div>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          New project
        </button>
      </div>

      {/* Project cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {MOCK_PROJECTS.map(proj => (
          <div key={proj.id} className="card-hover p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10">
                <Building2 className="h-5 w-5 text-brand-400" />
              </div>
              <span className={
                proj.status === 'active' ? 'badge-green' :
                  proj.status === 'completed' ? 'badge-slate' : 'badge-amber'
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
                <Link href="/dashboard/waivers" className="btn-ghost text-xs py-1.5">Waivers</Link>
                <Link href="/dashboard/payments" className="btn-ghost text-xs py-1.5">Payments</Link>
              </div>
              <span className="text-xs text-slate-600">Added {formatDate(proj.created_at)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-white">New project</h2>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="label">Project name</label>
                <input className="input" placeholder="Lakewood Office Complex" value={form.name}
                  onChange={e => set('name', e.target.value)} required />
              </div>
              <div>
                <label className="label">Address</label>
                <input className="input" placeholder="4400 Lakewood Blvd, Austin, TX" value={form.address}
                  onChange={e => set('address', e.target.value)} required />
              </div>
              <div>
                <label className="label">Contract value ($)</label>
                <input className="input" type="number" min="0" placeholder="4200000" value={form.value}
                  onChange={e => set('value', e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Start date</label>
                  <input className="input" type="date" value={form.start_date}
                    onChange={e => set('start_date', e.target.value)} required />
                </div>
                <div>
                  <label className="label">End date</label>
                  <input className="input" type="date" value={form.end_date}
                    onChange={e => set('end_date', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" value={form.status} onChange={e => set('status', e.target.value as ProjectStatus)}>
                  <option value="active">Active</option>
                  <option value="on_hold">On hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary flex-1 justify-center">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                  {loading ? 'Creating…' : 'Create project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}