<p align="center">
  <a href="./README.md">🇺🇸 English</a> •
  <a href="./README.pt-BR.md">🇧🇷 Português</a>
</p>

# Linkita
 
A link-in-bio platform where users create a public page to centralize all their links — profile, social media, projects — in one place.
 
**Live demo:** [linkita-drab.vercel.app](https://linkita-drab.vercel.app)
 
---
 
## Why this project
 
Linkita was built to practice real full-stack architecture with Next.js: secure authentication from scratch (without relying on a ready-made provider), media upload, internationalization, and rate limiting — the parts of a system that are usually hidden behind off-the-shelf libraries, here implemented manually to understand what's happening underneath.
 
---
 
## Stack
 
| Layer | Technologies |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, next-intl |
| Backend | Next.js Route Handlers, PostgreSQL, JWT (jsonwebtoken), bcryptjs, Zod |
| Infra | Vercel, Railway, Upstash Redis, Cloudinary |
 
---
 
## Features
 
- Authentication with JWT stored in an httpOnly cookie
- Multi-language support (i18n) with automatic detection
- Image upload and optimization via Cloudinary
- Custom link management
- Page view tracking
- Rate limiting (5 attempts / 15 min per IP) against login brute-force
- Parameterized queries (SQL Injection protection)
- Route protection via middleware
---
 
## Architecture
 
```
User → Vercel (Next.js) → Route Handlers (API) → PostgreSQL (Railway)
                                                 → Redis (Upstash) — rate limiting
                                                 → Cloudinary — media
```
 
```
app/
├── (auth)/          # login and registration pages
├── (dashboard)/      # logged-in user area
├── api/
│   ├── auth/          # login, registration, session
│   ├── users/
│   ├── links/
│   └── upload/
└── u/[username]/     # public profile page
 
components/
lib/
hooks/
types/
messages/            # translation files
```
 
---
 
## Running locally
 
```bash
git clone https://github.com/julevi/linkita.git
cd linkita
npm install
npm run dev
```
 
Create a `.env.local` file at the root:
 
```
DATABASE_URL=
JWT_SECRET=
 
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
 
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```
 
Visit `http://localhost:3000`.
 
Automatic deploy via Vercel on every push to `main`.
 
---
 
## Project status
 
Under active development. Functional and deployed, but still without an automated test suite — the top priority next step.
 
**Roadmap:**
- [ ] Tests (Jest + React Testing Library + Supertest)
- [ ] Docker containerization
- [ ] Migration to Prisma ORM
- [ ] Accessibility improvements
- [ ] Performance optimizations
---
 
## Author
 
**Juliana Prado** — [Portfolio](https://julianaprado.dev)
