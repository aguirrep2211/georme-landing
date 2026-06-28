#!/usr/bin/env sh
set -eu

OUTPUT_DIR=".cloudflare-dist"

rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

cp index.html legal.html privacy.html whatsapp-privacy.html user-data-deletion.html cookies.html robots.txt sitemap.xml "$OUTPUT_DIR/"
cp -R css js assets .well-known "$OUTPUT_DIR/"

# Original pesado no utilizado por la web; Cloudflare Static Assets limita
# el tamaño individual de los archivos que pueden subirse.
rm -f "$OUTPUT_DIR/assets/videos/mapa_aplicaciones.mp4"
