# CardStack — India's Smartest Credit Card Tool

## What is this?
A multi-page Next.js website that helps Indians maximize their credit card rewards. 4 tools, 25 cards, real savings math, zero tracking.

## Project Structure
```
cardstack/
├── app/                    # Pages (each folder = a URL)
│   ├── page.jsx            # Homepage (cardstack.in/)
│   ├── layout.jsx          # Shared layout (nav + footer)
│   ├── globals.css          # Global styles
│   ├── smart-swipe/        # /smart-swipe
│   ├── gap-finder/         # /gap-finder
│   ├── swipe-check/        # /swipe-check
│   ├── compare/            # /compare
│   ├── blog/               # /blog
│   ├── cards/[id]/         # /cards/hdfc-regalia (25 pages)
│   └── api/cards/          # API routes
├── components/             # Reusable UI components
├── data/                   # Card database, merchants, content
│   ├── cards.js            # ← EDIT THIS to update card rewards
│   ├── merchants.js        # ← EDIT THIS to update Swipe Check
│   └── content.js          # ← EDIT THIS to update blog/tips
├── public/                 # Static files (favicon, images)
└── package.json
```

## How to Update Card Data
1. Go to `data/cards.js` on GitHub
2. Click the pencil icon to edit
3. Change the reward rate, fee, or other info
4. Click "Commit changes"
5. Vercel auto-deploys in ~30 seconds

## How to Deploy

### Step 1: Create Accounts (one-time)
1. Go to github.com → Sign up (free)
2. Go to vercel.com → Sign up with GitHub (free)

### Step 2: Upload to GitHub
1. Create a new repository called "cardstack"
2. Upload all project files

### Step 3: Deploy on Vercel
1. Go to vercel.com/new
2. Import your "cardstack" repository
3. Click "Deploy"
4. Your site is live at cardstack.vercel.app!

### Step 4: Custom Domain (optional)
1. Buy a domain (cardstack.in, ~₹500/year)
2. In Vercel → Settings → Domains → Add your domain
3. Update DNS at your registrar (Vercel shows you how)

## Tech Stack
- **Next.js 14** — React framework with server-side rendering
- **Tailwind CSS** — Utility-first CSS
- **Vercel** — Hosting (free tier)
- **No database needed** — Card data is in JSON files

## Future Phases
- Phase 2: Sanity CMS for visual content editing
- Phase 3: Supabase for user accounts & community
