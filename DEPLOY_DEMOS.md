# Deploy Demo Templates on Vercel (so "Live Demo" works)

The Hub is one Vercel project. Each template (Restaurant, Salon, Dental) is a **separate Next.js app** and must be deployed as its own Vercel project. Then you tell the Hub their URLs via environment variables.

---

## Step 1: Deploy the Restaurant demo

1. Go to [vercel.com/new](https://vercel.com/new).
2. **Import** the same repo: `Pablogb29/templates-hub`.
3. **Root Directory:** click **Edit** and set to **`demos/restaurant`**.
4. Leave **Framework Preset** as Next.js and **Build Command** as `npm run build`.
5. Click **Deploy**. Wait for it to finish.
6. Copy the deployment URL (e.g. `https://templates-hub-restaurant-xxx.vercel.app`).

---

## Step 2: Deploy the Hair Salon demo

1. **Add New…** → **Project** again.
2. Import **Pablogb29/templates-hub** (same repo).
3. **Root Directory:** set to **`demos/hair-salon`**.
4. Deploy and copy the URL (e.g. `https://templates-hub-salon-xxx.vercel.app`).

---

## Step 3: Deploy the Dental demo

1. **Add New…** → **Project** again.
2. Import **Pablogb29/templates-hub**.
3. **Root Directory:** set to **`demos/dental-clinic`**.
4. Deploy and copy the URL (e.g. `https://templates-hub-dental-xxx.vercel.app`).

---

## Step 4: Point the Hub at the demos

1. Open your **main Hub project** in Vercel (the one with **Root Directory** = `.` or empty).
2. Go to **Settings** → **Environment Variables**.
3. Add these (use the **full URL** of each deployed demo, no trailing slash):

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_DEMO_RESTAURANT_URL` | `https://restaurant-template-tau.vercel.app` |
   | `NEXT_PUBLIC_DEMO_SALON_URL`      | `https://salon-template-two.vercel.app`     |
   | `NEXT_PUBLIC_DEMO_DENTAL_URL`     | `https://dental-template-ochre.vercel.app`   |

   Use **Production** (and optionally Preview) for each.

4. **Redeploy** the Hub: **Deployments** → **⋯** on the latest → **Redeploy**.

---

## Summary

- **1 repo** → **4 Vercel projects**:
  - Hub (root)
  - Restaurant (`demos/restaurant`)
  - Salon (`demos/hair-salon`)
  - Dental (`demos/dental-clinic`)
- After adding the three env vars and redeploying the Hub, **Live Demo** and the embedded previews will load the deployed demos.
