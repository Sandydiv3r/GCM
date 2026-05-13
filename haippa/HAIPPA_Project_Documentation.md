# HAIPPA — African Art Marketplace
## Project Documentation

---

**Document Title:**   HAIPPA Platform — Full Project Documentation  
**Prepared by:**      Johnny Kwame Hammond  
**Organisation:**     HAIPPA  
**Date:**             May 2026  
**Version:**          1.0  
**Classification:**   Confidential — Internal Use

---

## Foreword

This document constitutes the authoritative technical and operational reference for the HAIPPA African Art Marketplace platform. It is intended for use by the founding team, development contributors, investors, and onboarding partners.

HAIPPA was conceived to solve a persistent and meaningful problem: African artists of exceptional talent continue to lack the infrastructure, visibility and commercial tools that their counterparts in other markets take for granted. This platform exists to change that — not through charity, but through a commercially disciplined, trust-led marketplace that earns its position by delivering genuine value to both sides of the transaction.

*Johnny Kwame Hammond*  
*Author & Platform Architect*

---

## Table of Contents

1. Project Overview
2. Vision and Mission
3. Technology Stack
4. Repository Structure
5. Environment Configuration
6. Database Architecture
7. Application Architecture
8. API Reference
9. Frontend Structure
10. User Roles and Access Control
11. Key Feature Modules
12. Deployment Guide
13. Development Setup
14. Testing
15. Brand and Design System
16. Roadmap
17. Glossary

---

## 1. Project Overview

HAIPPA is a curated, trust-led online marketplace connecting verified African artists with local and international buyers. The platform is built on a commission-based revenue model (12–20% per completed sale), with secondary revenue from seller subscription plans, featured placement slots, managed custom commission briefs and B2B art procurement services.

| Item | Detail |
|---|---|
| Platform name | HAIPPA |
| Repository | sandydiv3r/haippa |
| Primary framework | Next.js 14 (App Router) |
| Database | PostgreSQL via Prisma ORM |
| Deployment target | Vercel (frontend) + Railway (database) |
| Primary currency | GBP |
| Commission range | 12–20% per completed sale |
| Target launch market | UK and European diaspora buyers |

---

## 2. Vision and Mission

**Vision:** To become the trusted digital destination for discovering, buying and commissioning authentic African art.

**Mission:** To help African artists monetise their work more effectively by giving them access to high-quality presentation, trusted payments, better buyer reach and a premium marketplace experience.

**Core Promises**
- Verified artists and curated listings only
- Professional presentation of artwork, biography and provenance
- Secure checkout and transparent order communication
- Tracked shipping, visible condition disclosures and clear returns rules

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | Full-stack React with SSR and API routes |
| Language | TypeScript | Type safety across the full codebase |
| Database | PostgreSQL | Primary relational data store |
| ORM | Prisma | Schema management and typed queries |
| Styling | Tailwind CSS | Utility-first CSS |
| Components | shadcn/ui + Radix UI | Accessible headless components |
| Fonts | Playfair Display + Inter | Display and body typography |
| Auth | iron-session | Secure httpOnly cookie sessions |
| Validation | Zod | Runtime schema validation |
| Email | Resend + React Email | Transactional email |
| Storage | Cloudflare R2 | Artwork image and document storage |
| Payments | Abstract PaymentService | Provider-agnostic (Stripe Connect ready) |
| Build | Turborepo | Monorepo task orchestration |
| Package manager | pnpm | Fast dependency management |
| Deployment | Vercel + Railway | Hosting and managed PostgreSQL |

---

## 4. Repository Structure

```
haippa/
├── apps/
│   └── web/                     Next.js 14 application
│       └── src/
│           ├── app/             App Router
│           │   ├── (public)/    Public pages
│           │   ├── (auth)/      Login, register, apply
│           │   ├── (buyer)/     Checkout, orders
│           │   ├── (seller)/    Seller dashboard
│           │   ├── (admin)/     Admin tools
│           │   └── api/         API route handlers
│           ├── components/      UI components
│           └── lib/             session.ts, api.ts
├── packages/
│   ├── db/                      Prisma schema + client
│   ├── ui/                      Shared components
│   ├── types/                   Shared TypeScript types
│   └── email/                   React Email templates
├── turbo.json
├── pnpm-workspace.yaml
├── vercel.json
└── .env.example
```

---

## 5. Environment Configuration

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `SESSION_SECRET` | Min 32-char cookie encryption key | Yes |
| `S3_BUCKET` | Storage bucket name | Yes |
| `S3_ENDPOINT` | Storage endpoint URL | Yes |
| `S3_ACCESS_KEY` | Storage access key | Yes |
| `S3_SECRET_KEY` | Storage secret key | Yes |
| `NEXT_PUBLIC_S3_PUBLIC_URL` | Public CDN URL | Yes |
| `RESEND_API_KEY` | Resend API key | Yes |
| `EMAIL_FROM` | Sender address | Yes |
| `PAYMENT_PROVIDER` | `mock` or `stripe` | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret | Conditional |
| `NEXT_PUBLIC_BASE_URL` | Full deployment URL | Yes |

---

## 6. Database Architecture

### Tables

| Table | Description |
|---|---|
| users | Platform user accounts |
| sessions | Active user sessions |
| profiles | User name and contact details |
| artist_applications | Prospective seller submissions |
| artist_profiles | Verified artist storefronts |
| payout_details | Artist payout account info |
| artworks | Artwork listings |
| artwork_images | Artwork image records |
| artwork_tags | Artwork search tags |
| collections | Curated collections |
| collection_artworks | Artwork–collection join |
| orders | Buyer purchase orders |
| order_items | Per-artwork order lines |
| order_timeline | Immutable order audit log |
| disputes | Buyer-raised order disputes |
| commission_requests | Custom commission briefs |
| featured_placements | Promoted placement schedule |
| subscription_plans | Seller tier definitions |
| analytics_events | Platform event tracking |

---

## 7. Application Architecture

**Route groups:** `(public)`, `(auth)`, `(buyer)`, `(seller)`, `(admin)`

**API routes** follow a RESTful pattern. All input is validated with Zod. All errors are handled by `handleApiError` in `src/lib/api.ts`.

**Middleware** (`src/middleware.ts`) validates session role before allowing access to protected routes. Unauthenticated requests redirect to login.

---

## 8. API Reference

### Authentication
| Method | Endpoint | Auth |
|---|---|---|
| POST | /api/auth/register | No |
| POST | /api/auth/login | No |
| POST | /api/auth/logout | Yes |
| GET | /api/auth/me | Yes |

### Applications
| Method | Endpoint | Auth |
|---|---|---|
| POST | /api/applications | No |
| PATCH | /api/admin/applications/:id | ADMIN |
| GET | /api/admin/applications/:id | ADMIN |

### Artworks
| Method | Endpoint | Auth |
|---|---|---|
| GET | /api/artworks | No |
| POST | /api/artworks | ARTIST |
| PUT | /api/artworks/:id | ARTIST/ADMIN |
| DELETE | /api/artworks/:id | ARTIST/ADMIN |

### Orders
| Method | Endpoint | Auth |
|---|---|---|
| POST | /api/orders | Buyer |
| GET | /api/orders/:id | Buyer/ADMIN |
| PATCH | /api/orders/:id/ship | ARTIST |
| POST | /api/admin/payouts/:id/release | ADMIN |

### Admin
| Method | Endpoint | Auth |
|---|---|---|
| GET | /api/admin/analytics | ADMIN |
| POST | /api/admin/featured | ADMIN |

---

## 9. User Roles and Access Control

| Role | Capabilities |
|---|---|
| BUYER | Browse, purchase, track orders, raise disputes, submit commissions |
| ARTIST | All BUYER capabilities + manage listings, seller dashboard, receive payouts |
| ADMIN | Full platform access: applications, moderation, disputes, analytics |

| Route | Minimum role |
|---|---|
| /admin/* | ADMIN |
| /seller/* | ARTIST |
| /checkout, /orders/* | BUYER |
| All other routes | Public |

---

## 10. Key Feature Modules

**Authentication** — bcrypt passwords, iron-session httpOnly cookies, role assertions on every protected route.

**Artist Onboarding** — Multi-step application form, PENDING queue, admin approve/reject, auto profile creation on approval, welcome email.

**Artwork Listings** — Up to 8 images via presigned R2 uploads, PENDING_REVIEW gate, admin approval required before going live.

**Order Flow** — Cart in React context + localStorage, checkout, payment initiation, HELD payout escrow, seller tracking upload, auto-complete after 14 days, `OrderTimeline` audit log.

**Payout Escrow** — Payouts held until delivery confirmation or admin release. `PayoutService` interface is provider-agnostic.

**Admin Dashboard** — KPIs (GMV, revenue, orders, artists), action queue (pending apps, review queue, disputes), recent orders.

**Collections** — Admin-curated themed collections with slug, banner, and `isFeatured` for homepage placement.

**Custom Commissions** — Buyer brief form, admin matching, `SUBMITTED → COMPLETED` lifecycle, deposit payment gate.

**Email** — Resend + React Email: application received/approved/rejected, order confirmed, shipped, payout released, dispute raised.

---

## 11. Deployment Guide

1. **Database** — Create PostgreSQL on Railway, run `pnpm db:migrate && pnpm db:seed`
2. **Vercel** — Import `sandydiv3r/haippa`, set framework to Next.js, add all env vars from `.env.example`
3. **Storage** — Create Cloudflare R2 bucket `haippa-uploads`, set S3 env vars, configure public CDN domain
4. **Email** — Add `RESEND_API_KEY`, verify sending domain in Resend dashboard
5. **First login** — Sign in as `admin@haippa.com` / `admin123!` and change password immediately

---

## 12. Development Setup

```bash
git clone https://github.com/sandydiv3r/haippa.git
cd haippa
pnpm install
cp .env.example .env.local
# populate .env.local
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

App: http://localhost:3000  
Admin: http://localhost:3000/admin/dashboard  
Default admin: `admin@haippa.com` / `admin123!`

---

## 13. Brand and Design System

| Name | Hex | Usage |
|---|---|---|
| Terracotta (Primary) | #C15F3C | Primary actions, highlights |
| Warm Ochre (Secondary) | #D4933F | Secondary accents, gold tones |
| Warm Cream | #FAF7F2 | Page background |
| Sand 300 | #E8DDD0 | Borders, dividers |
| Warm Charcoal | #1C1A17 | Primary text |

| Role | Font | Weights |
|---|---|---|
| Display / Headings | Playfair Display | 400, 500, 600, 700 |
| Body / UI | Inter | 300, 400, 500, 600 |

---

## 14. Roadmap

**Phase 1 (Days 1–30):** Foundation — monorepo, schema, auth, admin shell  
**Phase 2 (Days 31–60):** Supply — artist profiles, artwork listings, collections  
**Phase 3 (Days 61–75):** Soft launch — checkout, payments, orders, payouts  
**Phase 4 (Days 76–90):** Public launch — SEO, commissions, subscriptions, analytics  
**Future:** Mobile app, Stripe Connect automation, multi-currency, AI discovery, B2B procurement

---

## 15. Glossary

| Term | Definition |
|---|---|
| GMV | Gross Merchandise Value — total artwork sales before platform fees |
| Platform fee | Commission retained by HAIPPA (12–20%) |
| Payout | Net amount released to the artist after fee deduction |
| Escrow | Payout held pending delivery confirmation |
| Originality | Declaration: original, limited-edition, or open-edition print |
| Slug | URL-safe artist/collection identifier |
| Presigned URL | Time-limited upload URL for direct-to-storage client uploads |
| Curated | HAIPPA manually approves all artists and listings before they go live |

---

*End of document.*

**Prepared by:** Johnny Kwame Hammond  
**Organisation:** HAIPPA  
**Version:** 1.0 | May 2026  

*This document is confidential. Unauthorised distribution is prohibited.*
