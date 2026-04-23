'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, Building2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { Suspense } from 'react'

function SignupForm() {
  const router = useRouter()
  const params = useSearchParams()
  const plan   = params.get('plan') ?? 'starter'

  const [form, setForm] = useState({ company: '', name: '', email: '', password: '' })
  const [show, setShow]     = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    // TODO: replace with Supabase auth
    // const { error } = await supabase.auth.signUp({ email, password, options: { data: { company_name, full_name } } })
    await new Promise(r => setTimeout(r, 900))
    toast.success('Account created! Redirecting…')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
            <Lock className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SubSync</span>
        </div>

        <div className="card p-8">
          <h1 className="text-lg font-semibold text-white mb-1 text-center">Start your free trial</h1>
          <p className="text-sm text-slate-500 text-center mb-2">
            30 days free · No credit card required
          </p>
          <div className="flex justify-center mb-6">
            <span className="badge-green">
              <CheckCircle2 className="h-3 w-3" />
              {plan.charAt(0).toUpperCase() + plan.slice(1)} plan selected
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="label">Company name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input className="input pl-9" placeholder="Turner GC LLC" value={form.company} onChange={e => set('company', e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="label">Your name</label>
              <input className="input" placeholder="Jason Turner" value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
            <div>
              <label className="label">Work email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input className="input pl-9" type="email" placeholder="jason@turnergc.com" value={form.email} onChange={e => set('email', e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  className="input pl-9 pr-10"
                  type={show ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  required
                  minLength={8}
                />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary justify-center py-3 mt-1">
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500 text-center">
            By signing up you agree to our{' '}
            <a href="#" className="text-brand-400 hover:underline">Terms</a> and{' '}
            <a href="#" className="text-brand-400 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-brand-400 hover:text-brand-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
