# Open Mic — Full Stack

## Stack
- Next.js 14 (App Router)
- Neon PostgreSQL
- Resend (email)

## Setup

```bash
npx create-next-app@latest openmic --typescript --tailwind --app
cd openmic
npm install @neondatabase/serverless resend
```

## .env.local
```
DATABASE_URL=postgresql://...@...neon.tech/neondb?sslmode=require
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.mn
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## DB Setup
Run `src/lib/schema.sql` in Neon console once.

## Folder structure
src/
  app/
    page.tsx                  ← Registration page (frontend)
    api/
      register/route.ts       ← POST /api/register
      admin/route.ts          ← GET /api/admin (list registrations)
  lib/
    db.ts                     ← Neon client
    email.ts                  ← Resend email sender
  components/
    OpenMicForm.tsx           ← Form component
