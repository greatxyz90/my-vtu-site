#!/bin/bash
# Auto-deploy VTU site on file changes

WATCH_DIR="$HOME/my-vtu-site"
echo "👀 Watching $WATCH_DIR for changes..."

inotifywait -m -r -e close_write,moved_to,create "$WATCH_DIR" | while read path action file; do
    if [[ "$file" == "deploy.sh" || "$file" == *.html || "$file" == *.css || "$file" == *.js ]]; then
        echo "🔄 Detected change in $file. Running deploy.sh..."
        $WATCH_DIR/deploy.sh
    fi
done
