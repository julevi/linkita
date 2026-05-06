<p align="center">
  <a href="./README.md">🇺🇸 English</a> •
  <a href="./README.pt-BR.md">🇧🇷 Português</a>
</p>

---

# 🚀 Linkita

Linkita is a platform for creating personalized link-in-bio pages where users can centralize and share all their links in one place.

---

## ✨ Features

- 🔐 Secure authentication with JWT
- 🌍 Multi-language support (i18n)
- 🎨 Modern UI with Tailwind + shadcn/ui
- 🖼️ Image upload and optimization
- 🔗 Custom link management
- 📊 Page view tracking
- ⚡ High performance with Next.js
- 🛡️ Built-in security protections

---

## 🧱 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- next-intl

### Backend
- Next.js Route Handlers
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- Zod

### Infrastructure
- Vercel
- Railway
- Upstash Redis
- Cloudinary

---

## 🔐 Security

- Password hashing with bcrypt
- JWT stored in httpOnly cookies
- Rate limiting (5 attempts / 15 min per IP)
- Parameterized queries (SQL Injection protection)
- Route protection via middleware

---

## 📁 Project Structure

```bash
app/
├── (auth)/
├── (dashboard)/
├── api/
│   ├── auth/
│   ├── users/
│   ├── links/
│   └── upload/
└── u/
    └── [username]/

components/
lib/
hooks/
types/
messages/
```

---

## 🔄 Architecture

```text
User
 ↓
Vercel (Next.js)
 ↓
Route Handlers (API)
 ↓
PostgreSQL (Railway)
 ↓
Redis (Upstash)
 ↓
Cloudinary
```

---

## 🌍 Internationalization

This project uses **next-intl** for multi-language support.

- JSON-based translations
- Automatic language detection
- Cookie-based persistence

Example:

```ts
t('nav.login')
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## ▶️ Running Locally

```bash
git clone https://github.com/yourusername/linkita.git
cd linkita
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🚀 Deployment

Automatic deployment via **Vercel** on every push.

---

## 📌 Concepts Applied

- Server & Client Components
- Route Groups
- Dynamic Routing
- REST API
- JWT Authentication
- Middleware
- i18n
- Media upload
- Rate limiting

---

## 🧪 Next Steps

- [ ] Testing (Jest + RTL + Supertest)
- [ ] Docker
- [ ] Prisma ORM
- [ ] Accessibility improvements
- [ ] Performance optimizations

---

## 💡 About

Linkita is a real-world full stack project focused on modern architecture, security, and scalability.

---

## 👩‍💻 Author

**Juliana Prado**

[Portfolio](https://julianaprado.dev)