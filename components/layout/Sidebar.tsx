'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, FolderOpen, FileSignature,
  CreditCard, Bell, Settings, Lock, LogOut, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard',               icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/subcontractors',icon: Users,           label: 'Subcontractors' },
  { href: '/dashboard/projects',      icon: FolderOpen,      label: 'Projects' },
  { href: '/dashboard/waivers',       icon: FileSignature,   label: 'Lien Waivers' },
  { href: '/dashboard/payments',      icon: CreditCard,      label: 'Payments' },
  { href: '/dashboard/alerts',        icon: Bell,            label: 'Alerts', badge: 5 },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-slate-800 bg-slate-950">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
          <Lock className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-bold tracking-tight text-white">SubSync</span>
      </div>

      {/* Company pill */}
      <div className="px-3 pt-4 pb-2">
        <div className="flex items-center gap-2.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500/20 text-xs font-bold text-brand-400">
            TG
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-200 truncate">Turner GC LLC</div>
            <div className="text-xs text-slate-500">Growth plan</div>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-0.5">
        <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-slate-600">
          Main
        </p>
        {NAV.map((item) => {
          const active = path === item.href || (item.href !== '/dashboard' && path.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-xs font-semibold text-red-400">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        <div className="mt-auto pt-4 border-t border-slate-800 flex flex-col gap-0.5">
          <Link href="/dashboard/settings" className={cn(
            'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
            path.startsWith('/dashboard/settings')
              ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
              : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
          )}>
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800/80 hover:text-red-400 transition-all duration-150 w-full text-left">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </nav>
    </aside>
  )
}
