#!/usr/bin/env python3
"""Publish the prepared article when its release time arrives. Run from cron."""
import argparse
from datetime import datetime, timezone
import os
from pathlib import Path
import re
import tempfile

RELEASE = datetime(2026, 11, 20, 7, 0, tzinfo=timezone.utc)
SLUG = 'building-better-communication-at-home'


def atomic_write(path, data):
    descriptor, temporary = tempfile.mkstemp(prefix='.publish-', dir=str(path.parent))
    try:
        with os.fdopen(descriptor, 'wb') as stream:
            stream.write(data)
        os.chmod(temporary, 0o644)
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def add_card(html, card):
    start = html.index('<div class="blog-featured-grid">')
    cards = list(re.finditer(r'<article class="blog-preview-card">.*?</article>', html[start:], re.S))
    if not cards or 'getting-started-with-counseling.html' not in cards[0].group():
        raise ValueError('Getting Started must remain the first blog card')
    if any('href="' + SLUG + '.html"' in match.group() for match in cards):
        return html
    end = start + cards[-1].end()
    return html[:end] + card + html[end:]


def publish(root, package, now=None):
    now = now or datetime.now(timezone.utc)
    if now < RELEASE:
        return False
    article = (package / 'article.html').read_bytes()
    image = (package / 'cover.jpg').read_bytes()
    card = (package / 'card.html').read_text().strip()
    # Validate both listings before publishing any files.
    listings = [(root / name, add_card((root / name).read_text(), card))
                for name in ('index.html', 'our-blog.html')]
    if b'noindex' in article or b'Draft ' in article:
        raise ValueError('Article still contains draft-only content')
    atomic_write(root / 'assets' / 'blog-family-communication-photo.jpg', image)
    atomic_write(root / (SLUG + '.html'), article)
    for path, html in listings:
        if path.read_text() != html:
            atomic_write(path, html.encode())
    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[2])
    args = parser.parse_args()
    publish(args.root, Path(__file__).resolve().parent)
