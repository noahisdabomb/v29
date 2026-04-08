#!/bin/bash
# Push v27 to GitHub
cd "$(dirname "$0")"

# Remove any leftover .git directory and start fresh
rm -rf .git

# Initialize repo
git init
git branch -M main

# Stage all files (respects .gitignore)
git add -A

# Commit
git commit -m "Initial commit - v27 portfolio site"

# Add remote and push
git remote add origin https://github.com/noahisdabomb/v27.git
git push -u origin main

echo ""
echo "Done! v27 has been pushed to https://github.com/noahisdabomb/v27.git"
