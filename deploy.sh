#!/bin/bash
# Firebase deploy for glory90-85e7c with logging

LOG_FILE="$HOME/my-vtu-site/deploy.log"

echo "🔹 Starting deployment at $(date)" | tee -a "$LOG_FILE"

# Make sure public folder exists
mkdir -p public

# Clear old files in public
rm -rf public/*

# Copy all files except deploy.sh and public/ into public/
for file in *; do
    if [ "$file" != "public" ] && [ "$file" != "deploy.sh" ]; then
        cp -r "$file" public/
    fi
done

# Deploy to Firebase Hosting
if firebase deploy --only hosting --project glory90-85e7c 2>&1 | tee -a "$LOG_FILE"; then
    echo "✅ Deployment finished at $(date)! Your site is live at https://glory90-85e7c.web.app" | tee -a "$LOG_FILE"
else
    echo "❌ Deployment failed at $(date)! Check errors above." | tee -a "$LOG_FILE"
fi
