# NextGen Kids Preschool Website

Modern preschool website built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI components, Framer Motion, Lucide React, React Hook Form, Zod, Metadata API, JSON-LD, sitemap, and robots support.

## Setup

```bash
yarn install
yarn dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
yarn typecheck
yarn lint
yarn build
```

## Admission Enquiry Capture

The admission form posts to `POST /api/enquiry`. The API validates the data, applies a basic honeypot and rate limit, then forwards the lead to a Google Apps Script Web App that writes to Google Sheets and sends an email notification.

Required environment variables:

```bash
GOOGLE_APPS_SCRIPT_ENQUIRY_URL="https://script.google.com/macros/s/..."
ENQUIRY_SHARED_SECRET="use-a-long-random-secret"
```

Google Apps Script setup:

1. Create a Google Sheet for admission enquiries.
2. Open **Extensions -> Apps Script**.
3. Paste the code from `scripts/google-apps-script/enquiry-webhook.gs`.
4. In Apps Script, set Script Properties:
   - `ENQUIRY_SHARED_SECRET`: same value as Vercel/local env
   - `SCHOOL_ENQUIRY_EMAIL`: email address that should receive enquiry alerts
5. Deploy as a Web App with access set to **Anyone** so the website API can call it. The shared secret protects the endpoint from unauthorized writes.
6. Copy the Web App URL into `GOOGLE_APPS_SCRIPT_ENQUIRY_URL`.

For local testing, copy `.env.example` to `.env.local` and fill both variables. The WhatsApp button after successful submission uses `schoolInfo.whatsapp` and `contact.whatsappCtaMessage` from `src/data/school.config.ts`.

Lead capture priority:

- The Google Sheet row is written before the email alert is attempted.
- If email quota is exhausted, the lead can still be saved to the Sheet.
- The admin Leads tab is manual-only; it does not poll in the background.
- Loading leads or saving admin notes uses Apps Script executions and Sheet read/write calls, but it does not use email-send quota.
- Current Google Apps Script quotas are documented by Google at `https://developers.google.com/apps-script/guides/services/quotas`.

Admin lead viewer setup:

1. Paste the latest `scripts/google-apps-script/enquiry-webhook.gs` into the same Apps Script project.
2. Redeploy the Web App as a new version so `listLeads` and `updateLead` are available.
3. Open `/admin`, go to **Leads**, and click **Load leads**.
4. Status and admin notes save back to the same Google Sheet.

## Admin CMS

The protected admin area is available at:

```txt
/admin
```

Use it to update public website content, fees, FAQs, testimonials, page SEO, gallery images, named website image slots such as Home Hero, Contact Header, Safety Main, and Program images, plus admission lead status/notes.

Admin content storage:

- `src/data/school.config.ts` remains the locked default/fallback seed.
- Supabase `school_config` stores the live editable public config.
- Supabase `media_assets` stores uploaded image metadata.
- Supabase Storage bucket `school-media` stores uploaded images.
- Secrets are not editable in admin and must stay in environment variables.

Supabase setup:

1. Create a Supabase project.
2. In Supabase SQL Editor, run `scripts/supabase/schema.sql`.
3. Copy the project URL into `NEXT_PUBLIC_SUPABASE_URL`.
4. Copy the service role key into `SUPABASE_SERVICE_ROLE_KEY`.
5. Keep the service role key only in `.env.local` and Vercel environment variables. Do not expose it in browser code or admin content.

Admin login environment variables:

```bash
ADMIN_USERNAME="admin"
ADMIN_SESSION_SECRET="use-a-long-random-secret"
ADMIN_PASSWORD_HASH="hmac-sha256-hash"
```

Generate the password hash locally:

```bash
ADMIN_SESSION_SECRET="same-secret-used-above" ADMIN_PASSWORD="your-admin-password" node -e 'const crypto = require("crypto"); console.log(crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(process.env.ADMIN_PASSWORD).digest("hex"))'
```

Only store the generated hash in `ADMIN_PASSWORD_HASH`; do not store the plain password in the repo.

Protection model:

- `/admin/login` is public so authorized staff can sign in.
- `/admin` redirects to `/admin/login` without a valid signed session.
- `/api/admin/config`, `/api/admin/upload`, `/api/admin/status`, image restore, gallery restore, and logout require a valid signed admin cookie.
- Parent enquiry submission remains public at `/api/enquiry`, with honeypot, rate limit, server validation, and shared-secret forwarding to Apps Script.

Default image restore:

- Default images in `public/images` and `public/brand` are never overwritten by uploads.
- Uploaded files go to Supabase Storage.
- Each image slot in admin shows current and default previews.
- “Restore default” resets that slot back to the original repo image.
- “Restore default gallery” restores the original configured gallery list.

## Edit Website Data

Default school content is centralized in:

```txt
src/data/school.config.ts
```

Update this file for the default seed/fallback:

- School name, tagline, city, phone, WhatsApp, email, address, timings, domain, and map URL
- SEO titles, descriptions, keywords, canonical paths, and Open Graph image
- Navigation and future page placeholders
- Hero content, trust badges, stats, programs, daycare, facilities, activities, daily routine, safety, admissions, fees, faculty, gallery, testimonials, FAQs, and contact form copy

Do not hardcode school-specific content inside pages or components.

After Supabase is configured, normal content edits should be made through `/admin`; those changes update the live site without a new deployment.

## Images And Brand Assets

The current site uses the supplied NextGen Kids campus, classroom, activity, story corner, entry, and logo images from:

```txt
public/images/
public/brand/
src/app/icon.png
src/app/apple-icon.png
public/favicon.ico
public/favicon.png
```

The image paths, alt text, SEO image, logo, and favicon references are configured in `src/data/school.config.ts`.
Use `public/brand/nextgen-kids-logo-edited.png` for the website logo. It keeps the supplied logo style while removing the unwanted wording.
Before launch, verify every photo has parent-approved usage rights and accurate alt text.

## Deploy To Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import the GitHub repository.
4. Add environment variables:
   - `GOOGLE_APPS_SCRIPT_ENQUIRY_URL`
   - `ENQUIRY_SHARED_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`
   - `ADMIN_SESSION_SECRET`
5. Keep the default Next.js build settings:
   - Build command: `yarn build`
   - Output: managed by Next.js
6. Deploy.

## Connect A Custom Domain

1. In Vercel, open the project settings.
2. Go to **Domains**.
3. Add the school's domain.
4. Update DNS records at the domain provider as shown by Vercel.
5. Update `schoolInfo.domain` in `src/data/school.config.ts`.
6. Rebuild and redeploy so canonical URLs, sitemap, robots, Open Graph, and JSON-LD use the final domain.

## GitHub Repo

Recommended private GitHub repo:

```txt
harsha-n/nextgen-kids
```

Keep Git and GitHub configuration scoped to this folder. Do not change global Git settings for this project.

## SEO Checklist Before Launch

- Verify the inferred address, phone numbers, email, domain, timings, and social links.
- Replace placeholder fee text with approved school fee details.
- Replace sample testimonials with verified parent reviews.
- Confirm photo permissions and compress any new photos before adding them.
- Confirm every route has the right title and description in `school.config.ts`.
- Confirm local SEO keywords include Midhilapuri, Madhuravada, Pothinamallayya Palem, PM Palem, Vishakapatnam, and the final school name.
- Verify `sitemap.xml` and `robots.txt` after deployment.
- Submit the production sitemap in Google Search Console.
- Add the final Google Maps URL and social links.
- Validate JSON-LD with Google's Rich Results Test.
- Run Lighthouse on mobile and desktop after deployment.
