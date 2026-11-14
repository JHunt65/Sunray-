# Scheduled publication through GitHub Actions

Release gate: November 20, 2026 at midnight America/Denver (07:00 UTC).

`.github/workflows/publish-scheduled-blog.yml` checks every 15 minutes on November 20–22, beginning at 00:07 Mountain Time. GitHub may delay scheduled runs. The publisher checks the year and release time, creates the article and image, appends the card after existing posts, and commits those files to main. Getting Started remains first. It never publishes before the release gate and repeated runs do not duplicate the card.

The workflow requires Actions and contents write permission. Manual workflow dispatch also respects the release gate. This package directory is denied web access by its `.htaccess` when deployed on Apache.

Active deployment status: PR #1 was merged into main and the committed site was deployed to https://www.sunrayfamilycounseling.com on November 13, 2026 (America/Denver). The GitHub publisher was manually tested before release and completed successfully without publishing early (run 43536122958).

A hosting cron job is also active, preserving existing jobs:

```cron
*/5 * 20-22 11 * [ -f /home1/sun101/public_html/building-better-communication-at-home.html ] || /usr/bin/python3 /home1/sun101/public_html/assets/scheduled-blog/publish.py
```

This publishes directly to the live site on the first check after the release gate opens, independently of GitHub queue delays. It stops running the publisher once the public article exists. A pre-release run confirmed that no article was created. Public checks confirmed the future article returns 404 and the scheduled payload returns 403.

The live-site backup is `/home1/sun101/sunray-backups/before-20261114T004317Z.tar.gz`; the previous crontab is saved alongside it. Future full deployments remain manual unless a separate hosting deployment integration is configured. Sync main after the scheduled workflow commits the article before deploying again.
