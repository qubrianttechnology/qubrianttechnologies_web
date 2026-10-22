# Qubriant website

The only active website is **qubriant-site/**: the Qubriant site with 38 pages, Qubriant's video background and social icons. The root package is just a launcher for that site.

From this folder, run:

```powershell
npm.cmd run dev
```

Open **http://127.0.0.1:4173**. No dependency installation is needed. Stop the server with Ctrl+C before starting it again. Do not start a separate Python or Live Server instance at the workspace root.

```powershell
npm.cmd run build
npm.cmd run check
npm.cmd test
```

Edit `qubriant-site/build.mjs` for page templates, `data.mjs` for content, and `dist/styles.css` / `dist/app.js` for styling and interactions. Publish only `qubriant-site/dist/`. Social profile links remain pending as requested.

The alternate one-page site's HTML/CSS/JS were removed from the workspace root after a byte-for-byte verified backup to `.backups/alternate-homepage-20261022.tar.gz`. The previous deployment archive is also stored in `.backups/`. Neither archive is served by the site.

Existing Git staging and the existing Sites hosting identity have been preserved; no remote site was deleted or republished.
