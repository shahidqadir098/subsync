'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        const supabase = createClient()
        const { error } = await supabase.auth.updateUser({ password })
        if (error) {
            toast.error(error.message)
            setLoading(false)
            return
        }
        toast.success('Password updated — signing you in')
        router.push('/dashboard')
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
                    <h1 className="text-lg font-semibold text-white mb-1 text-center">New password</h1>
                    <p className="text-sm text-slate-500 text-center mb-6">Choose a strong password</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="label">New password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input
                                    className="input pl-9 pr-10"
                                    type={show ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    minLength={8}
                                    required
                                />
                                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary justify-center py-3 mt-1">
                            {loading ? 'Updating…' : 'Update password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}