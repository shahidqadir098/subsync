'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Lock, Mail, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        const supabase = createClient()
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        })
        if (error) {
            toast.error(error.message)
            setLoading(false)
            return
        }
        setSent(true)
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
                        <Lock className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">SubSync</span>
                </div>

                <div className="card p-8">
                    {sent ? (
                        <div className="text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 mx-auto mb-4">
                                <Mail className="h-6 w-6 text-brand-400" />
                            </div>
                            <h1 className="text-lg font-semibold text-white mb-2">Check your email</h1>
                            <p className="text-sm text-slate-500 mb-6">
                                Sent reset link to <span className="text-slate-300">{email}</span>
                            </p>
                            <Link href="/auth/login" className="btn-secondary justify-center w-full">
                                <ArrowLeft className="h-4 w-4" />
                                Back to sign in
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-lg font-semibold text-white mb-1 text-center">Reset password</h1>
                            <p className="text-sm text-slate-500 text-center mb-6">
                                Enter your email — we'll send a reset link
                            </p>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                                <button type="submit" disabled={loading} className="btn-primary justify-center py-3 mt-1">
                                    {loading ? 'Sending…' : 'Send reset link'}
                                </button>
                            </form>
                            <div className="mt-4 text-center">
                                <Link href="/auth/login" className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1">
                                    <ArrowLeft className="h-3 w-3" />
                                    Back to sign in
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}