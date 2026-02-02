---
title: SEO with Astro
description: Meta tags, sitemaps, and structured data in this project.
pubDate: 2025-01-25
tags: [seo, astro]
---

# SEO with Astro

This site is set up to teach **SEO best practices** with Astro.

## What we use

- **Meta tags**: `title`, `description`, and **canonical** URL on every page.
- **Open Graph** and **Twitter** tags for social previews.
- **Sitemap**: `@astrojs/sitemap` generates `sitemap-index.xml` at build time.
- **robots.txt**: points crawlers to the sitemap.
- **JSON-LD**: structured data (e.g. `WebSite`, `Article`) for search engines.

## Tips

- Set `site` in `astro.config.mjs` so relative URLs become absolute.
- Use the shared **SEO** component so every page gets consistent meta and schema.
- Prefer static generation so every URL is in the sitemap and fast to crawl.

Astro’s default of shipping minimal JS and static HTML is already a big SEO win.
