# Deploying this site to cyoon47.github.io

The new static site has been added to this repo's root:
`index.html`, `publications.html`, `news.html`, `cv.html`, plus `assets/`,
`data/`, and `files/`. A `.nojekyll` file was added so GitHub Pages serves the
static HTML directly instead of trying to build the old Jekyll template.

## Step 1 — Publish (quickest path)

From this folder in a terminal:

```bash
git add .
git commit -m "Replace site with new static personal site"
git push origin master
```

Your site is a user page (`cyoon47.github.io`), so GitHub Pages serves the
`master` branch root by default. Within a minute or two of pushing, the new
site is live at https://cyoon47.github.io.

> If git complains that `index.lock` exists / "another git process is running",
> delete the stale lock first: `rm .git/index.lock` (or delete the file
> `.git\index.lock` in Explorer), then re-run the commands above.

## Step 2 — Confirm Pages settings (only if it doesn't appear)

On GitHub: repo → Settings → Pages →
- Source: "Deploy from a branch"
- Branch: `master`  /  folder: `/ (root)`

## Optional — remove the old Jekyll template for a tidy repo

The site works with the old files still present (`.nojekyll` makes Jekyll
ignore them), but you can delete them for cleanliness:

```bash
git rm -r _config.yml _config_docker.yml _data _drafts _includes _layouts \
  _pages _portfolio _posts _publications _sass _talks _teaching \
  Gemfile docker-compose.yaml Dockerfile markdown_generator scripts \
  talkmap talkmap.ipynb talkmap.py talkmap_out.ipynb \
  .github/workflows/scrape_talks.yml package.json
git commit -m "Remove old Jekyll template"
git push origin master
```

(The old `assets/`, `images/`, and `files/` folders contain template leftovers
too — delete only the ones you don't use. Your site uses `assets/css/style.css`,
`assets/js/main.js`, `assets/img/`, `assets/CV.pdf`, and `data/`.)

## Updating content later
- Publications → `data/publications.js`
- News → `data/news.js`
- CV page content → `data/cv.js`; CV PDF → replace `assets/CV.pdf`
- Bio → `index.html`
