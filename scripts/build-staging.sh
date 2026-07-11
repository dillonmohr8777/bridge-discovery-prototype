#!/usr/bin/env bash
# Build one static, direction-pinned copy of the prototype per provisional
# direction, into staging/<direction>. Each build hides the theme switcher and
# pins data-theme, so the three outputs can be hosted as separate staging links.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf staging
mkdir -p staging

for direction in current network botanical; do
  echo "== Building staging app: ${direction} =="
  rm -rf out .next
  NEXT_OUTPUT=export NEXT_PUBLIC_DIRECTION_LOCK="${direction}" npm run build
  mv out "staging/${direction}"
done

rm -rf .next
echo "Done. Static apps in staging/current, staging/network, staging/botanical."
