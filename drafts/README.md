# Unpublished blog drafts

“Building Better Communication at Home” is held until Friday, November 20, 2026 (America/Denver). Do not publish it earlier or add it to public blog listings. A tested GitHub Actions publication workflow is prepared in `.github/workflows/publish-scheduled-blog.yml`; see `assets/scheduled-blog/README.md` for activation and live-site deployment status.

Preview locally at `/drafts/building-better-communication-at-home.html`. The current `assets/deploy.sh` copies top-level pages and public assets, excluding this drafts directory.

To publish on or after the planned date:

1. Copy the draft HTML to the repository root as `building-better-communication-at-home.html`.
2. Remove the draft banner, `<base href="../">`, and robots `noindex, nofollow` meta tag from the published copy.
3. Copy `building-better-communication-at-home/cover.jpg` into public assets as `assets/blog-family-communication-photo.jpg` and update the article image path.
4. Add the prepared `preview-card.html` to the homepage and blog listings after Getting Started, which must remain first. Preserve the three-column layout as more articles are added.
5. Confirm the actual publication date, add matching BlogPosting structured data, and check the article and listings at desktop and mobile widths before deployment.
