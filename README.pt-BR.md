<p align="center">
  <a href="./README.md">🇺🇸 English</a> •
  <a href="./README.pt-BR.md">🇧🇷 Português</a>
</p>

---

# 🚀 Linkita

Linkita é uma plataforma para criação de páginas personalizadas de links (link na bio), permitindo centralizar e compartilhar vários links em um único lugar.

---

## ✨ Funcionalidades

- 🔐 Autenticação segura com JWT
- 🌍 Suporte a múltiplos idiomas (i18n)
- 🎨 Interface moderna com Tailwind + shadcn/ui
- 🖼️ Upload e otimização de imagens
- 🔗 Gerenciamento de links personalizados
- 📊 Rastreamento de visualizações
- ⚡ Alta performance com Next.js
- 🛡️ Proteções de segurança integradas

---

## 🧱 Tecnologias

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

### Infraestrutura
- Vercel
- Railway
- Upstash Redis
- Cloudinary

---

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- JWT armazenado em cookies httpOnly
- Rate limiting (5 tentativas / 15 minutos por IP)
- Queries parametrizadas (proteção contra SQL Injection)
- Proteção de rotas via middleware

---

## 📁 Estrutura do Projeto

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

## 🔄 Arquitetura

```text
Usuário
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

## 🌍 Internacionalização

O projeto utiliza **next-intl** para suporte multilíngue.

- Traduções em JSON
- Detecção automática de idioma
- Persistência via cookie

Exemplo:

```ts
t('nav.login')
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local`:

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

## ▶️ Rodando Localmente

```bash
git clone https://github.com/seuusuario/linkita.git
cd linkita
npm install
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 🚀 Deploy

Deploy automático via **Vercel** a cada push.

---

## 📌 Conceitos Aplicados

- Server e Client Components
- Route Groups
- Rotas dinâmicas
- REST API
- Autenticação com JWT
- Middleware
- i18n
- Upload de mídia
- Rate limiting

---

## 🧪 Próximos Passos

- [ ] Testes automatizados
- [ ] Docker
- [ ] Prisma ORM
- [ ] Acessibilidade
- [ ] Otimização de performance

---

## 💡 Sobre

Linkita é um projeto full stack real focado em arquitetura moderna, segurança e escalabilidade.

---

## 👩‍💻 Autora

**Juliana Prado**

[Portfolio](https://julianaprado.dev)