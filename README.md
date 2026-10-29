# Rayyan Mandi — Mobile Restaurant Website Demo

A premium, mobile-first restaurant website concept for **Rayyan Mandi Restaurant**, with a homepage and interactive smart menu.

## Open the demo

- **Homepage:** [index.html](index.html)
- **Smart menu:** [menu.html](menu.html)
- **GitHub Pages website (once Pages is enabled):** https://arkibria-tradeflow.github.io/rayyan-mandi/

## Features

- Premium Arabian-inspired cream, espresso, and gold visual design
- Restaurant identity and dish photos embedded in both HTML files
- Navigation between homepage and menu
- Six-location branch selector
- English and Arabic interfaces
- Dish browsing and menu filters
- Interactive demo basket, quantity controls, and ordering preview
- Designed for mobile but usable in desktop browsers

## Live preview setup

This repository includes [an automatic GitHub Pages deployment workflow](.github/workflows/deploy-pages.yml).

If the preview is not online, go to **Settings → Pages → Build and deployment** and set **Source: GitHub Actions**. New commits to `main` will then deploy automatically.

## Important

This is a **client presentation prototype**. Branch contacts, availability, prices, WhatsApp ordering, and payment processing are not connected to a verified production ordering system. Confirm operational information with Rayyan before publishing as an official restaurant site.

## Technology

Static HTML, CSS, and JavaScript. No build tools, dependencies, databases, or API keys required.


## Real dish photography (October 2026)

The menu now uses **19 optimized local WebP food photographs**, mapped to **34 menu items**, while retaining the two original Rayyan feature photos.

- [Download the ZIP photo package](Rayyan_Mandi_Dish_Photos.zip) — photos, filenames, mapping, credits and notes
- [Dish-to-image mapping](data/dish-image-mapping.csv)
- [Image sources and credits](data/photo-credits.csv)
- [Reusable source manifest](data/photo-sources.json)

These are representative real photographs licensed for reuse under the indicated source terms, not verified photos of Rayyan's actual prepared dishes. Confirm with the restaurant before an official launch.

**Uploading the ZIP itself to GitHub does not extract the photos.** Individual images are already installed in the repository under [assets/menu/](assets/menu/) and automatically served from GitHub Pages.
