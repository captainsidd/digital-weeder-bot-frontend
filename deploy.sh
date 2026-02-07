#!/bin/bash
# Deployment script for Digital Weeder Bot to Vercel

echo "🚀 Deploying Digital Weeder Bot to Vercel..."

# Frontend deployment
echo "📦 Deploying Frontend..."
cd /Users/sid/projects/digital-weeder-bot-frontend
vercel --prod \
  --env NEXT_PUBLIC_NOTION_CLIENT_ID=$NOTION_CLIENT_ID \
  --env NEXT_PUBLIC_BACKEND_URL=$BACKEND_URL \
  --env BACKEND_SECRET=$BACKEND_SECRET

echo "✅ Frontend deployed!"

# Backend deployment
echo "📦 Deploying Backend..."
cd /Users/sid/projects/digital-weeder-bot-backend
vercel --prod \
  --env SENDGRID_API_KEY=$SENDGRID_API_KEY \
  --env NOTION_CLIENT_ID=$NOTION_CLIENT_ID \
  --env NOTION_CLIENT_SECRET=$NOTION_CLIENT_SECRET \
  --env BACKEND_SECRET=$BACKEND_SECRET \
  --env NODE_ENV=production

echo "✅ Backend deployed!"
echo "🎉 Digital Weeder Bot deployed successfully!"
