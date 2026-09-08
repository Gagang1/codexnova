# CodeXNova

Premium engineering & technology education platform.

**Tagline:** Learn. Build. Innovate.

## Stack

- **Client:** React, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query, Framer Motion, React Hook Form, Zod
- **Server:** Node.js, Express, MongoDB, Mongoose, JWT (HTTP-only cookies), Argon2, Zod, Helmet, rate limiting
- **Tooling:** ESLint, Prettier, dotenv, npm workspaces

## Getting started

```bash
# From repo root
cp .env.example .env
cp .env.example client/.env
# Copy server vars into server/.env (see .env.example)

npm install
```

Ensure MongoDB is running, then seed:

```bash
npm run seed
npm run dev
```

- Site: http://localhost:5173
- API health: http://localhost:5000/api/health
- Admin: http://localhost:5173/admin/login

### Default seed admin (change immediately)

- Email: `superadmin@codexnova.local`
- Password: `ChangeMe_Now_123!`

Override with `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` before seeding.

## Notes

- Contact, WhatsApp, and analytics IDs are environment placeholders — no fake production details.
- Testimonials and faculty credentials are editable placeholders — do not invent partnerships or placement %.
- Enrolment stores `paymentStatus: pending` so Razorpay/Stripe can be added later.
- Public pages fall back to local catalogue content if the API is unreachable.
- **Enroll Now** and **Talk to a Mentor** save leads to MongoDB, and also to Google Sheets when `GOOGLE_SHEETS_WEBAPP_URL` is set (see `server/scripts/google-sheets-webapp.gs`).

### Google Sheets setup (required for sheet sync)

1. Open the leads sheet and go to **Extensions → Apps Script**.
2. Paste `server/scripts/google-sheets-webapp.gs`, save, then **Deploy → New deployment → Web app** (Execute as: Me, Who has access: Anyone).
3. Put the web app URL in `server/.env` as `GOOGLE_SHEETS_WEBAPP_URL=...` and restart the API.
