#!/bin/bash
set -euo pipefail

site_root="${HOME}/public_html"
mkdir -p "$site_root"

cp ./*.html ./*.css ./*.js ./*.png ./*.jpg ./*.JPG "$site_root/"
cp -R assets "$site_root/"
