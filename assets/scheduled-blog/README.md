# Scheduled publication through GitHub Actions

Release gate: November 20, 2026 at midnight America/Denver (07:00 UTC).

`.github/workflows/publish-scheduled-blog.yml` checks every 15 minutes on November 20–22, beginning at 00:07 Mountain Time. GitHub may delay scheduled runs. The publisher checks the year and release time, creates the article and image, appends the card after existing posts, and commits those files to main. Getting Started remains first. It never publishes before the release gate and repeated runs do not duplicate the card.

The workflow requires Actions and contents write permission. Manual workflow dispatch also respects the release gate. This package directory is denied web access by its `.htaccess` when deployed on Apache.

GitHub repository publication and live-site deployment are separate. No hosting deployment workflow, webhook, or deployment secrets were present when checked. Hosting authentication failed, so automatic deployment to the live domain still requires a working hosting integration.

The publisher is also compatible with a hosting cron job, but none has been installed.
