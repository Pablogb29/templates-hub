# Fix: "There was a permanent problem cloning the repo"

This usually means **Vercel can’t clone your GitHub repo**. Try these in order.

---

## 1. Fix GitHub ↔ Vercel access

1. Open **GitHub** → your repo **Settings** → **Integrations** → **Applications** (or go to [github.com/settings/installations](https://github.com/settings/installations)).
2. Find **Vercel** and click **Configure**.
3. Under **Repository access**, either:
   - Choose **All repositories**, or  
   - Choose **Only select repositories** and add **Pablogb29/templates-hub**.
4. Save, then in **Vercel** go to your project → **Settings** → **Git** and use **Reconnect** or **Redeploy** (from the Deployments tab).

---

## 2. Make sure the repo is visible to Vercel

- If the repo is **private**: Vercel must have access (step 1). Your Vercel account/team must be allowed to use that repo.
- If you prefer to keep it **public**:  
  **GitHub** → repo → **Settings** → **General** → scroll to **Danger Zone** → **Change repository visibility** → **Public**.

---

## 3. Deploy with Vercel CLI (no GitHub clone)

This uploads the project from your machine and skips cloning on Vercel.

```bash
cd c:\Users\pablo\Documents\AI_Projects\Websites\templates-hub
npx vercel login
npx vercel --prod
```

- First run can ask you to link to an existing Vercel project or create a new one.
- You get a production URL right away. Later, you can connect the same project to GitHub in the Vercel dashboard so future pushes also deploy.

---

## 4. Create a new Vercel project and re-import

1. In **Vercel Dashboard** delete the current project (if you have one) or create a **New Project**.
2. **Import** → **GitHub** → pick **Pablogb29/templates-hub**.
3. If the repo doesn’t appear, use **Configure GitHub App** and grant access to this repo (see step 1), then try again.

---

## 5. Check Vercel status

If GitHub is fine and access is correct, check [vercel-status.com](https://vercel-status.com) for incidents. If the error persists, contact Vercel support with your **deployment URL** or **deployment ID** from the failed build.
