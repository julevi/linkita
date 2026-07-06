<p align="center">
  <a href="./README.md">🇺🇸 English</a> •
  <a href="./README.pt-BR.md">🇧🇷 Português</a>
</p>

# Linkita
 
Plataforma de link-in-bio onde usuários criam uma página pública para centralizar todos os seus links — perfil, redes sociais, projetos — em um único lugar.
 
**Demo ao vivo:** [linkita-drab.vercel.app](https://linkita-drab.vercel.app)
 
---
 
## Por que esse projeto
 
Linkita foi construído para praticar arquitetura full-stack real com Next.js: autenticação segura do zero (sem depender de um provedor pronto), upload de mídia, internacionalização e rate limiting — as partes de um sistema que normalmente ficam escondidas atrás de bibliotecas prontas, aqui implementadas manualmente para entender o que está acontecendo por baixo.
 
---
 
## Stack
 
| Camada | Tecnologias |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript, Tailwind CSS v4, shadcn/ui, next-intl |
| Backend | Next.js Route Handlers, PostgreSQL, JWT (jsonwebtoken), bcryptjs, Zod |
| Infra | Vercel, Railway, Upstash Redis, Cloudinary |
 
---
 
## Funcionalidades
 
- Autenticação com JWT armazenado em cookie httpOnly
- Suporte multi-idioma (i18n) com detecção automática
- Upload e otimização de imagem via Cloudinary
- Gerenciamento de links customizados
- Rastreamento de visualizações de página
- Rate limiting (5 tentativas / 15 min por IP) contra brute-force no login
- Queries parametrizadas (proteção contra SQL Injection)
- Proteção de rotas via middleware
---
 
## Arquitetura
 
```
Usuário → Vercel (Next.js) → Route Handlers (API) → PostgreSQL (Railway)
                                                    → Redis (Upstash) — rate limiting
                                                    → Cloudinary — mídia
```
 
```
app/
├── (auth)/          # páginas de login e registro
├── (dashboard)/      # área logada do usuário
├── api/
│   ├── auth/          # login, registro, sessão
│   ├── users/
│   ├── links/
│   └── upload/
└── u/[username]/     # página pública do perfil
 
components/
lib/
hooks/
types/
messages/            # arquivos de tradução
```
 
---
 
## Rodando localmente
 
```bash
git clone https://github.com/julevi/linkita.git
cd linkita
npm install
npm run dev
```
 
Crie um `.env.local` na raiz:
 
```
DATABASE_URL=
JWT_SECRET=
 
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
 
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```
 
Acesse em `http://localhost:3000`.
 
Deploy automático via Vercel a cada push na `main`.
 
---
 
## Status do projeto
 
Em desenvolvimento ativo. Funcional e com deploy no ar, mas ainda sem suite de testes automatizados — próximo passo prioritário.
 
**Roadmap:**
- [ ] Testes (Jest + React Testing Library + Supertest)
- [ ] Containerização com Docker
- [ ] Migração para Prisma ORM
- [ ] Melhorias de acessibilidade
- [ ] Otimizações de performance
---
 
## Autora
 
**Juliana Prado** — [Portfólio](https://julianaprado.dev)
 

