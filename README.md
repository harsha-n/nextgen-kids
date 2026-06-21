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

## Edit Website Data

All editable school content is centralized in:

```txt
src/data/school.config.ts
```

Update this file for:

- School name, tagline, city, phone, WhatsApp, email, address, timings, domain, and map URL
- SEO titles, descriptions, keywords, canonical paths, and Open Graph image
- Navigation and future page placeholders
- Hero content, trust badges, stats, programs, daycare, facilities, activities, daily routine, safety, admissions, fees, faculty, gallery, testimonials, FAQs, and contact form copy

Do not hardcode school-specific content inside pages or components.

## Images And Brand Assets

The current site uses the supplied NextGen Kids campus, classroom, activity, story corner, entry, and logo images from:

```txt
public/images/
public/brand/
src/app/icon.png
src/app/apple-icon.png
public/favicon.png
```

The image paths, alt text, SEO image, logo, and favicon references are configured in `src/data/school.config.ts`.
Use `public/brand/nextgen-kids-logo-edited.png` for the website logo. It keeps the supplied logo style while removing the unwanted wording.
Before launch, verify every photo has parent-approved usage rights and accurate alt text.

## Deploy To Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import the GitHub repository.
4. Keep the default Next.js build settings:
   - Build command: `yarn build`
   - Output: managed by Next.js
5. Deploy.

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
