# SubSync — Subcontractor Compliance & Payment OS

A full-stack web app for General Contractors to manage subcontractor compliance,
lien waivers, and payments. Built with Next.js 15, Supabase, and Tailwind CSS.

---

## 🚀 Quick start (15 minutes)

### 1. Install dependencies
```bash
cd subsync
npm install
```

### 2. Set up Supabase (free)
1. Go to [supabase.com](https://supabase.com) → Create a new project (free)
2. Go to **SQL Editor** → **New query**
3. Paste the entire contents of `supabase-schema.sql` → click **Run**
4. Go to **Project Settings → API** → copy:
   - Project URL
   - anon/public key
   - service_role key (keep secret)

### 3. Configure environment
```bash
cp .env.example .env.local
```
Open `.env.local` and fill in your Supabase values:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project structure

```
subsync/
├── app/
│   ├── page.tsx                        # Landing / marketing page
│   ├── layout.tsx                      # Root layout
│   ├── globals.css                     # Tailwind + design system
│   ├── auth/
│   │   ├── login/page.tsx              # Sign in
│   │   └── signup/page.tsx             # Sign up / register
│   └── dashboard/
│       ├── layout.tsx                  # Sidebar layout
│       ├── page.tsx                    # Main dashboard
│       ├── subcontractors/
│       │   ├── page.tsx                # Sub roster list
│       │   ├── new/page.tsx            # Add new sub form
│       │   └── [id]/page.tsx           # Sub detail view
│       ├── projects/page.tsx           # Projects list
│       ├── waivers/page.tsx            # Lien waivers
│       ├── payments/page.tsx           # Pay applications
│       ├── alerts/page.tsx             # Compliance alerts
│       └── settings/page.tsx           # Settings
├── components/
│   └── layout/
│       └── Sidebar.tsx                 # Navigation sidebar
├── lib/
│   ├── supabase.ts                     # Supabase client
│   ├── utils.ts                        # Helper functions
│   └── mock-data.ts                    # Demo data (replace with real DB calls)
├── types/
│   └── index.ts                        # TypeScript types
├── supabase-schema.sql                 # Run this in Supabase SQL Editor
└── .env.example                        # Copy to .env.local
```

---

## 🔌 Connecting real data (replacing mock data)

The dashboard currently uses mock data from `lib/mock-data.ts`.
To connect real Supabase data, replace the mock imports in each page.

**Example — fetch real subcontractors in `app/dashboard/subcontractors/page.tsx`:**
```typescript
import { createClient } from '@/lib/supabase'

// Replace mock data with:
const supabase = createClient()
const { data: subs } = await supabase
  .from('subcontractors')
  .select('*')
  .order('created_at', { ascending: false })
```

---

## 🛠 Adding auth to dashboard pages

To protect dashboard routes (redirect to login if not signed in):

1. Create `middleware.ts` in the project root:
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // See Supabase SSR docs for full middleware setup
  // https://supabase.com/docs/guides/auth/server-side/nextjs
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

---

## 💳 Adding Stripe subscriptions

1. Create account at [stripe.com](https://stripe.com) (free)
2. Create 3 products: Starter ($199), Growth ($599), Enterprise (custom)
3. Add keys to `.env.local`
4. Use Stripe Checkout for subscription sign-up

---

## ✍️ Adding DocuSign (lien waivers)

1. Create account at [docusign.com](https://docusign.com) — developer sandbox is free
2. Create an integration key
3. Add keys to `.env.local`
4. Replace the mock `sendWaiver()` in `app/dashboard/waivers/page.tsx`

---

## 🚢 Deploying to Vercel (free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# vercel.com → Your project → Settings → Environment Variables
```

Or connect your GitHub repo to Vercel for automatic deploys on every push.

---

## 📋 Build roadmap

| Month | Feature |
|-------|---------|
| 1 | ✅ MVP — onboarding, compliance tracking, dashboard |
| 2 | Lien waiver generator with DocuSign |
| 3 | Pay app submission + ACH payment release (Plaid) |
| 4 | Subcontractor self-onboarding portal |
| 5 | AI dispute assistant (Claude API) |
| 6 | Procore integration + white-label |

---

## 🆓 Free tools used

| Tool | Purpose | Cost |
|------|---------|------|
| Next.js 15 | Frontend + API | Free |
| Supabase | Database + Auth + Storage | Free up to 50K users |
| Vercel | Hosting | Free hobby tier |
| Tailwind CSS | Styling | Free |
| Lucide Icons | Icons | Free |
| Resend | Transactional email | Free 3K/mo |
| Stripe | Billing | Free until revenue |

**Only paid tool needed at launch:** DocuSign ($15/mo) — add when ready.
