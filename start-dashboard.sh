#!/data/data/com.termux/files/usr/bin/bash

# Navigate to project folder
cd ~/my-vtu-site

# Start the server in the background
echo "Starting local server..."
serve . &

# Give the server a few seconds to start
sleep 3

# Open the dashboard in the default browser (Termux uses am start)
echo "Opening dashboard in browser..."
am start -a android.intent.action.VIEW -d "http://localhost:3000/dashboard.html"

echo "Dashboard should now be open in your browser."
