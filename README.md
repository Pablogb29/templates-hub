# Templates Hub

Premium, AI-powered website templates for restaurants, salons, and dental clinics. Built with Next.js 16, Tailwind CSS, and Framer Motion.

**Live site:** [Deploy to Vercel](#deploy-to-vercel) and get your URL.

## Repo

- **GitHub:** https://github.com/Pablogb29/templates-hub

## Quick start

```bash
# Hub only (marketing site on port 3000)
npm install && npm run dev

# Hub + all three demo templates (ports 3000–3003)
npm run install:demos   # once: install demo dependencies
npm run dev:all
```

## Deploy to Vercel

### Option A: Connect GitHub (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (or create an account).
2. Click **Add New…** → **Project**.
3. Import **Pablogb29/templates-hub** from GitHub (authorize Vercel if prompted).
4. Leave **Root Directory** as `.` and **Build Command** as `npm run build`.
5. Click **Deploy**. Your Hub will be live at `https://templates-hub-xxx.vercel.app` (or your custom domain).

### Option B: Deploy from CLI

```bash
npx vercel login    # log in in the browser
npx vercel --prod   # deploy to production
```

After the first deploy, Vercel will give you a URL. Later deploys can use **Vercel Dashboard → Project → Deployments** or push to the `master` branch if you connected the repo (Option A).

## Demo templates

The Hub shows three demos (Restaurant, Hair Salon, Dental Clinic). In production, set these env vars in Vercel if you deploy the demos as separate projects:

- `NEXT_PUBLIC_DEMO_RESTAURANT_URL`
- `NEXT_PUBLIC_DEMO_SALON_URL`
- `NEXT_PUBLIC_DEMO_DENTAL_URL`

If unset, “Live Demo” will point to `localhost` (for local dev only).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Hub on port 3000 |
| `npm run dev:all` | Hub + Restaurant (3001) + Salon (3002) + Dental (3003) |
| `npm run build` | Build Hub for production |
| `npm run install:demos` | Install dependencies in all demo folders |

## License

Private / All rights reserved.
