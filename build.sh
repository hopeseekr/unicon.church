#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v php >/dev/null 2>&1; then
    echo "Build failed: PHP CLI is required." >&2
    exit 1
fi

cd "$project_dir"
php tools/translate.php "$@"

echo "Static site build complete."
