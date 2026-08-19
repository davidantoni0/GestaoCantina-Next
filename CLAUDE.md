# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # bare `eslint` (Next 16 removed `next lint`)
```

There is no test setup in this project — no test runner, config, or test files.

## What this is

Digital menu ("Cardápio da Cantina") for a school canteen, so students can assemble an order on their phone before reaching the counter. The functional scope is spelled out in [app/docs/readme.md](app/docs/readme.md): category filter, cart, per-item quantity, order total, persistence via `localStorage`, and a generated order number. Most of that is still unbuilt — the current code covers listing products and a stub add-to-cart callback.

The root [README.md](README.md) is the untouched create-next-app boilerplate and describes nothing about this project.

## Architecture

Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4. No state library, no backend, no database.

- **Two entry pages.** [app/page.tsx](app/page.tsx) at `/` is still the create-next-app template. The real UI lives at `/MainPage` ([app/MainPage/page.tsx](app/MainPage/page.tsx)) — a server component that composes the listing sections.
- **Data is a static JSON import.** [data/products.json](data/products.json) is imported directly (`import products from "@/data/products.json"`, enabled by `resolveJsonModule`) — there is no fetch layer or API route. `@/*` maps to the repo root, not to `app/`.
- **Shared shape.** [app/types/Product.tsx](app/types/Product.tsx) defines `Product`; `products.json` must stay structurally compatible with it since the import is untyped JSON.
- **Client boundary sits at the list, not the card.** [ListarProdutos.tsx](app/components/ListarProdutos.tsx) is `'use client'` because it owns the `handleAddToCart` callback; [CardProdutos.tsx](app/components/CardProdutos.tsx) is a presentational component that takes `product` + `onAddToCart` props. Keep new interactive state in the list-level client component and let cards stay prop-driven.
- **[ListarCompra.tsx](app/components/ListarCompra.tsx) is an empty placeholder** for the cart/order list.

## Conventions

- Components, comments, commit messages, and UI copy are Portuguese (pt-BR). Prices format with `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`.
- Styling is Tailwind utility classes inline. [app/globals.css](app/globals.css) uses Tailwind v4 syntax (`@import "tailwindcss"` + `@theme inline`) — no `tailwind.config.js` exists.
- Next 16 injects global route-typed prop helpers: layouts/pages type props as `LayoutProps<"/">` / `PageProps<"/route">` with no import. Don't hand-write `{ children }: { children: React.ReactNode }`.
- Feature work happens on branches named after the feature (`cardProdutos`, `listarProdutos`, `callbackProdutos`) and merges to `main` via PR.

## Known gaps

- `products.json` points every `image` at `/images/*.jpg`, but `public/images/` does not exist — product images render broken until those files are added.
- `CardProdutos` uses a raw `<img>`, which is the one standing lint warning (`@next/next/no-img-element`). Lint is otherwise clean — keep it that way.
