#!/bin/bash
set -euo pipefail

site_root="${HOME}/public_html"
mkdir -p "$site_root"

shopt -s nullglob

root_files=(
	./*.html
	./*.css
	./*.js
	./*.png
	./*.jpg
	./*.JPG
	./*.jpeg
	./*.JPEG
)

if ((${#root_files[@]})); then
	cp "${root_files[@]}" "$site_root/"
fi

cp -R assets "$site_root/"
cp -R "Emplolyee Images" "$site_root/"
