# Axsls Discord Bots

A showcase website for Discord bots developed by Axsls, featuring the Grow a Garden Stocks bot and upcoming Moderation and Music bots.

## Features

- **Grow a Garden Stocks Bot**: Real-time stock tracker for the Grow a Garden game
- **Moderation Bot**: Advanced moderation tools (coming soon)
- **Music Bot**: High-quality music streaming (coming soon)
- User reviews and ratings
- Mobile-responsive design
- Dark mode support

## Deployment on Vercel

This project is configured for easy deployment on Vercel:

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/axsls-discord-bots.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Import Project"
   - Select your repository
   - Click "Deploy"

### Configuration

The project includes:
- `vercel.json` - Vercel deployment configuration
- `api/` folder - Serverless API functions
- Automatic build and deployment settings

## Local Development

```bash
npm install
npm run dev
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js serverless functions
- **UI**: Shadcn/ui components
- **Deployment**: Vercel

## Free Service

All bots are completely free with no premium plans or hidden costs.