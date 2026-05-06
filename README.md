# 🚀 Linkita

Linkita é uma plataforma para criação de páginas personalizadas de links. Um "link na bio" moderno onde usuários podem centralizar e compartilhar todos os seus links em uma única página.

---

## ✨ Features

- 🔐 Autenticação segura com JWT
- 🌍 Suporte multilíngue (i18n)
- 🎨 Interface moderna e responsiva
- 🖼️ Upload e otimização de imagens
- 🔗 Gerenciamento de links personalizados
- 📊 Rastreamento de visualizações
- ⚡ Alta performance com Next.js
- 🛡️ Proteção contra ataques

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
- JWT
- bcryptjs
- Zod

### Infraestrutura
- Vercel
- Railway
- Upstash Redis
- Cloudinary

---

## 🔐 Segurança

- Hash de senhas com bcrypt
- JWT em cookies httpOnly
- Rate limiting
- Queries parametrizadas
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
Route Handlers
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

Funcionalidades:

- Traduções via JSON
- Detecção automática de idioma
- Persistência por cookie

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

Clone o projeto:

```bash
git clone https://github.com/seuusuario/linkita.git
```

Entre na pasta:

```bash
cd linkita
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

Acesse:

```bash
http://localhost:3000
```

---

## 🚀 Deploy

Deploy automático com **Vercel**

Cada push na branch principal gera uma nova versão em produção.

---

## 📌 Conceitos Aplicados

- Server Components
- Client Components
- Route Groups
- Rotas dinâmicas
- REST API
- JWT Authentication
- Middleware
- i18n
- Upload de mídia
- Rate limiting

---

## 🧪 Próximos Passos

- [ ] Testes automatizados
- [ ] Docker
- [ ] Prisma ORM
- [ ] Melhorias de acessibilidade
- [ ] Otimizações avançadas de performance

---

## 💡 Sobre

O Linkita foi desenvolvido como um projeto full stack real, aplicando arquitetura moderna, autenticação segura, internacionalização e deploy em produção.

---

## 👩‍💻 Desenvolvido por

**Juliana Prado**

[Portfolio](https://julianaprado.dev)