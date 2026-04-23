'use client'
import Link from 'next/link'
import {
  ShieldCheck, FileSignature, CreditCard, Star,
  ArrowRight, CheckCircle2, Lock, ClipboardCheck,
  Zap, AlertTriangle, Building2, ChevronRight
} from 'lucide-react'

const FEATURES = [
  {
    icon: ClipboardCheck,
    title: 'Smart sub onboarding',
    desc: 'Send a link. Subs upload license, insurance, W-9, and bank details. You see a live checklist — no more email chains.',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance & license radar',
    desc: 'Alerts fire 60 days before any certificate expires. Payments auto-block if coverage lapses. Stay compliant without thinking.',
  },
  {
    icon: FileSignature,
    title: 'Lien waiver automation',
    desc: 'Auto-generate state-specific conditional and unconditional waivers. E-signatures collected in one click. Full audit trail.',
  },
  {
    icon: CreditCard,
    title: 'Milestone-gated payments',
    desc: 'ACH payments release only when milestone is signed off and lien waiver is in. One dashboard. No missing paperwork.',
  },
  {
    icon: Star,
    title: 'Subcontractor scorecard',
    desc: 'Auto-score every sub on safety, delivery, invoice accuracy, and disputes. Know who to hire before you sign.',
  },
  {
    icon: Zap,
    title: 'AI dispute assistant',
    desc: 'When a payment dispute arises, AI reviews your contract, change orders, and emails — and tells you exactly what to say.',
  },
]

const STATS = [
  { value: '$165K', label: 'Max OSHA fine per willful violation' },
  { value: '80 hrs', label: 'Saved monthly automating lien waivers' },
  { value: '3×', label: 'Cost of a sub default vs. contract value' },
  { value: '$17B', label: 'Construction compliance software market' },
]

const PRICING = [
  {
    name: 'Starter',
    price: '$199',
    period: '/month',
    desc: 'For small GCs managing up to 20 subs',
    features: [
      'Up to 20 active subcontractors',
      'Onboarding portal',
      'Insurance & license tracking',
      'Lien waiver generation',
      'Email alerts & notifications',
      'Email support',
    ],
    cta: 'Start free trial',
    href: '/auth/signup?plan=starter',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$599',
    period: '/month',
    desc: 'For mid-size GCs running multiple projects',
    features: [
      'Up to 100 subcontractors',
      'Everything in Starter',
      'ACH payment release',
      'Subcontractor scorecard',
      'AI dispute assistant',
      'Priority support',
    ],
    cta: 'Start free trial',
    href: '/auth/signup?plan=growth',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large GCs and trade associations',
    features: [
      'Unlimited subcontractors',
      'Everything in Growth',
      'White-label branding',
      'Procore / Autodesk integration',
      'Dedicated customer success',
      'SLA guarantee',
    ],
    cta: 'Contact us',
    href: '/auth/signup?plan=enterprise',
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    quote: "We used to spend 3 hours every Friday chasing lien waivers by email. SubSync cut that to 15 minutes.",
    name: 'Marcus T.',
    role: 'Project Manager, T&R Construction',
  },
  {
    quote: "First month, an insurance certificate expired on one of our subs mid-project. SubSync caught it before the owner's rep did.",
    name: 'Sandra K.',
    role: 'Office Manager, Keller GC',
  },
  {
    quote: "At $599/month we saved more than that in the first week just from one dispute the AI assistant helped us resolve.",
    name: 'David L.',
    role: 'Principal, Lakeview Builders',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">SubSync</span>
          </div>
          <div className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
            <a href="#features"     className="hover:text-slate-100 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-100 transition-colors">How it works</a>
            <a href="#pricing"      className="hover:text-slate-100 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login"  className="btn-ghost text-sm hidden sm:inline-flex">Sign in</Link>
            <Link href="/auth/signup" className="btn-primary text-sm">Start free trial</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-16">
          <div className="h-[500px] w-[700px] rounded-full bg-brand-500/6 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            Built for $3M–$50M General Contractors
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            Stop managing subs<br />
            <span className="text-brand-400">in spreadsheets.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
            SubSync is the compliance and payment OS for General Contractors.
            Onboard subs, track insurance, automate lien waivers, and release payments —
            all in one place, before a single violation happens.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/signup" className="btn-primary px-7 py-3.5 text-base">
              Start free — no credit card
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard" className="btn-secondary px-7 py-3.5 text-base">
              View live demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            30-day free trial · Cancel anytime · Setup in under 10 minutes
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-slate-800 bg-slate-900/40 py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.value} className="text-center">
                <div className="text-3xl font-bold text-brand-400">{s.value}</div>
                <div className="mt-1 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="section-title">Features</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Everything a GC needs. Nothing they don&apos;t.
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Built for the mid-size GC who&apos;s too big for spreadsheets and too smart to pay $20K/year for Procore.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6 hover:border-slate-700 transition-all duration-200 group">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 group-hover:bg-brand-500/20 transition-colors">
                  <f.icon className="h-5 w-5 text-brand-400" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-100">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="border-t border-slate-800 bg-slate-900/30 py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <p className="section-title">How it works</p>
            <h2 className="text-3xl font-bold text-white">Up and running in one afternoon</h2>
          </div>
          <div className="flex flex-col gap-0">
            {[
              {
                n: '01',
                title: 'Create your project',
                desc: 'Add a project and invite subcontractors with a single shareable link. No accounts needed for them to start.',
              },
              {
                n: '02',
                title: 'Subs self-onboard',
                desc: 'They upload license, COI, W-9, and banking info through a clean mobile-friendly portal. You get a real-time status dashboard.',
              },
              {
                n: '03',
                title: 'Compliance runs on autopilot',
                desc: 'Insurance and license expiry alerts fire 60 days out. Payments auto-block if any coverage lapses. Zero manual checking.',
              },
              {
                n: '04',
                title: 'Collect waivers, release payments',
                desc: 'Generate lien waivers pre-filled with the correct data. One click to send for e-signature and release ACH payment.',
              },
            ].map((item, i, arr) => (
              <div key={item.n} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/10 text-sm font-bold text-brand-400">
                    {item.n}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="my-1 h-full min-h-[32px] w-px bg-slate-800" />
                  )}
                </div>
                <div className="pb-8 pt-1.5">
                  <h3 className="mb-1 font-semibold text-slate-100">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="section-title">Testimonials</p>
            <h2 className="text-3xl font-bold text-white">GCs who switched off spreadsheets</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-300 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-sm font-medium text-slate-100">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="border-t border-slate-800 bg-slate-900/30 py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="section-title">Pricing</p>
            <h2 className="text-3xl font-bold text-white">Simple, transparent pricing</h2>
            <p className="mt-3 text-slate-400">Start free for 30 days. No credit card required.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-6 flex flex-col gap-5 ${
                  plan.featured
                    ? 'border-brand-500/60 bg-brand-500/5'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-slate-400 mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-500 text-sm">{plan.period}</span>}
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{plan.desc}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-brand-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={plan.featured ? 'btn-primary justify-center' : 'btn-secondary justify-center'}
                >
                  {plan.cta}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="card p-12 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-brand-500/10 blur-[60px]" />
            </div>
            <div className="relative">
              <AlertTriangle className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-3">
                One expired COI. One $16,550 fine.
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                OSHA can cite you for your subcontractor&apos;s failures. SubSync catches it 60 days before it happens.
              </p>
              <Link href="/auth/signup" className="btn-primary px-8 py-3.5 text-base mx-auto">
                Start protecting your business
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-500">
              <Lock className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-white">SubSync</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} SubSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
