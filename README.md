# HawkFranklin Research — Static Website

Deep‑tech research company website for GitHub Pages. Multi‑page static site with Tailwind CDN.

## Structure

- `index.html` — Home
- `aclis.html` — Product page (ACLIS)
- `research.html` — Research programs
- `publications.html` — Papers, preprints, capsules, lab notes
- `vision.html` — Vision & ethics manifesto
- `about.html` — Team and company
- `careers.html` — Roles and working style
- `contact.html` — Contact + demo request (mailto)
- `404.html` — Custom 404
- `robots.txt`, `sitemap.xml` — SEO helpers (update domain)
- `assets/css/site.css` — Minimal shared styles
- `assets/js/site.js` — Mobile nav, active link, mailto form
- `assets/img/logo.svg` — Placeholder logo
- `.nojekyll` — Disable Jekyll processing on GitHub Pages

## Local preview

Open `index.html` in your browser. No build step required.

## Deploy to GitHub Pages

1. Create a new repo and push this folder.
2. In GitHub: Settings → Pages → Source: `Deploy from a branch` → Branch: `main` (or `master`) → `/ (root)`.
3. Wait for the site to build. Your Pages URL appears in the banner.
4. (Optional) Set a custom domain: Settings → Pages → Custom domain (e.g., `www.hawk-franklin-research.com`).
5. Add a `CNAME` file automatically via GitHub UI when you set the domain.

## Update SEO files

Edit `robots.txt` and `sitemap.xml` to replace `https://your-domain.example` with your actual domain.

## Notes

- Tailwind is loaded via CDN for simplicity. No Node build required.
- The contact form uses `mailto:` to work on GitHub Pages (no backend).
- To add content, edit each HTML page; header/footer are duplicated for static hosting.

