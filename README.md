# kuta.ca

A personal site and blog built with [Eleventy](https://www.11ty.dev/), hosted
free on GitHub Pages.

## What's here

```
src/
  _includes/
    base.njk      the HTML shell every page is wrapped in
    post.njk       layout used by blog posts (extends base.njk)
  css/
    style.css      all site styling
  posts/
    hello-world.md  the first blog post — copy this file to add a new one
  index.njk        home page, lists posts from src/posts/
  about.md         about page
  CNAME            tells GitHub Pages which custom domain to serve
eleventy.config.js  Eleventy configuration
.github/workflows/deploy.yml   builds and deploys the site on every push
```

## 1. Run it locally

You'll need [Node.js](https://nodejs.org/) installed (LTS version is fine).

```bash
cd kuta-ca-site
npm install
npm start
```

This starts a local dev server (usually `http://localhost:8080`) that
rebuilds automatically as you edit files.

To just build the static output without serving it:

```bash
npm run build
```

Output goes to `_site/`. That folder is gitignored — it's regenerated on
every build, so don't hand-edit anything inside it.

## 2. Add a blog post

Copy `src/posts/hello-world.md` to a new file, e.g.
`src/posts/my-second-post.md`, and edit the front matter and content:

```markdown
---
layout: post.njk
title: My Second Post
date: 2026-08-20
---
Whatever you want to write, in Markdown.
```

It'll automatically show up on the home page, newest first.

## 3. Push to GitHub

1. Create a new **public** repository on GitHub (e.g. `kuta-ca-site`) —
   don't initialize it with a README, since you already have one.
2. From inside the `kuta-ca-site` folder:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/kuta-ca-site.git
   git push -u origin main
   ```

## 4. Turn on GitHub Pages

1. On GitHub, go to the repo's **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
   (The workflow in `.github/workflows/deploy.yml` will handle the rest —
   it runs automatically on every push to `main`.)
3. After the first push, check the **Actions** tab to watch it build and
   deploy. Once it's green, your site is live at
   `https://<your-username>.github.io/kuta-ca-site/`.

## 5. Point kuta.ca at it

The `src/CNAME` file (containing `kuta.ca`) is already set up so GitHub
Pages knows to serve your custom domain instead of the default
`github.io` URL. Two things need to happen for it to work:

**A. DNS — at whichever registrar holds kuta.ca (GoDaddy or wherever you
move it to):**

Add these records:

| Type  | Host/Name | Value                  |
|-------|-----------|-------------------------|
| A     | @         | 185.199.108.153         |
| A     | @         | 185.199.109.153         |
| A     | @         | 185.199.110.153         |
| A     | @         | 185.199.111.153         |
| CNAME | www       | `<your-username>.github.io.` |

These are GitHub Pages' standard IP addresses for apex domains — double
check them against [GitHub's current docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
before adding, in case they've changed.

**Do not touch your existing MX records** — those are what route your
kuta.ca email through Google Workspace, and are unrelated to the site's
DNS records above.

**B. GitHub — in the repo's Settings → Pages:**

Under "Custom domain", enter `kuta.ca` and save. GitHub will verify DNS
and can auto-provision HTTPS once it propagates (can take up to 24 hours,
usually much faster).

## Learning notes

This project touches: Markdown (writing content), YAML front matter
(page metadata), Nunjucks templating (`base.njk`, `post.njk`, the `{% for %}`
loop in `index.njk`), Git/GitHub (version control + hosting), and GitHub
Actions (CI/CD — the `deploy.yml` workflow). Good next steps once this is
live: customize `style.css`, add a tags/categories page, or add an RSS
feed with the `@11ty/eleventy-plugin-rss` package.
