---
title: Eden Treaty and Type Sharing
description: How the API and frontend share types with zero duplication.
pubDate: 2025-01-20
tags: [eden-treaty, api, types]
---

# Eden Treaty and Type Sharing

**Eden Treaty** is the client that talks to your Elysia API with full type safety.

## How it works

1. The **API** exports its Elysia app type: `export type App = typeof app`.
2. The **landing** app imports that type and creates a client: `treaty<App>(url)`.
3. Every route and response is **typed**. No manual DTOs or codegen.

Try the login section on this site: the form calls `POST /auth/login` and the response type (user with `id`, `username`, `displayName`, `loggedAt`) comes straight from the server definition.

## Why it matters

- **Single source of truth**: types live on the server; the client stays in sync.
- **Less boilerplate**: no separate OpenAPI or generated clients.
- **Better DX**: autocomplete and compile-time errors on the frontend.

That’s the power of the beta stack.
