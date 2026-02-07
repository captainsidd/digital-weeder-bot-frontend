# Digital Weeder Bot - Frontend

Next.js frontend for the Digital Weeder Bot. Provides UI for Notion OAuth authentication and email subscription management.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_NOTION_CLIENT_ID=your_notion_client_id
```

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```
