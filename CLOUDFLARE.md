# Cloudflare automatic deployment

## Existing Workers build (confirmed by deployment logs)

The current dashboard runs `npm run build` followed by `npx wrangler deploy`.
Keep those commands and the repository root directory. The root `wrangler.jsonc`
now explicitly points Wrangler at `qubriant-site/dist`. Workers Builds supplies
the existing Worker name through its CI environment; no guessed Worker name is
hard-coded. For a local manual deployment, pass `--name YOUR_EXISTING_WORKER`.
HTML filenames are preserved, and missing pages use the existing `404.html`.
The Node chat backend is not deployed by this static-assets configuration.

## Alternative: Pages project

Connect the GitHub repository `qubrianttechnology/qubrianttechnologies_web` to a **Pages** project, using these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Leave blank (repository root) |
| Build command | `npm run build && npm run check` |
| Build output directory | `qubriant-site/dist` |
| Node version | `24` (also declared in `.node-version`) |

Enable automatic production branch deployments. Commit the site files and push to `main`; Cloudflare builds and publishes each push. Pages does not need a separate deploy command. If the dashboard requires a Workers deploy command, check that you created a Pages project.

For an existing project with root directory `qubriant-site`, use output directory `dist` instead. Do not mix the two directory configurations.

A Direct Upload project cannot be converted to Git integration. Create a Git-connected Pages project if the current project uses Direct Upload, verify its deployment, then move the custom domain if needed.

## Repository repair

The website was previously recorded as a Git link (mode 160000) without a `.gitmodules` entry or a remote for the nested repository. That prevents a fresh checkout from receiving the actual website files. The nested Git metadata is preserved locally in `.backups/site-git-before-cloudflare`; website source and assets should now be committed as ordinary files in the root repository.

Do not commit `.env`, `.openai`, or `.backups`. The dist directory includes authored styles, scripts, and supplied assets and must be committed along with the build sources.

## Chatbot

This deployment serves the static website. The existing Node `server.mjs` backend is not executed by Pages. `/api/chat` needs a separate backend or a Pages Functions implementation before the AI assistant will work. Do not put provider credentials in static assets.

## References

- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/get-started/direct-upload/
