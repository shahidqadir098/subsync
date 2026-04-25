'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Signed in — redirecting to dashboard')
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
            <Lock className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SubSync</span>
        </div>

        <div className="card p-8">
          <h1 className="text-lg font-semibold text-white mb-1 text-center">Welcome back</h1>
          <p className="text-sm text-slate-500 text-center mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  className="input pl-9"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  className="input pl-9 pr-10"
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary justify-center py-3 mt-1"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* ✅ FIXED HERE */}
          <div className="mt-4 text-center">
            <Link
              href="/auth/forgot-password"
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          No account?{' '}
          <Link
            href="/auth/signup"
            className="text-brand-400 hover:text-brand-300 transition-colors"
          >
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  )
}