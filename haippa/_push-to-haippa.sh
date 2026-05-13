#!/usr/bin/env bash
# Run this once to send the HAIPPA project from GCM to sandydiv3r/haippa
# Usage: bash haippa/_push-to-haippa.sh
set -e

TMP=$(mktemp -d)
echo "Working in $TMP"

git clone --branch haippa-snapshot https://github.com/Sandydiv3r/GCM.git "$TMP/gcm"
mkdir -p "$TMP/haippa"
cp -r "$TMP/gcm/haippa/"* "$TMP/haippa/"
cp "$TMP/gcm/haippa/.env.example" "$TMP/haippa/"
cp "$TMP/gcm/haippa/.gitignore"  "$TMP/haippa/"

cd "$TMP/haippa"
git init
git checkout -b main
git config commit.gpgsign false
git add .
git commit -m "Initial HAIPPA monorepo — Phase 1 foundation"
git remote add origin https://github.com/Sandydiv3r/haippa.git
git push -u origin main

echo "✅ Done! HAIPPA is live at https://github.com/Sandydiv3r/haippa"
