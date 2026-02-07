import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query
  const email = 'sid.nutulapati@gmail.com'

  if (!code) {
    return res.status(400).json({ error: 'No code provided' })
  }

  try {
    // Exchange code for access token with Notion
    const tokenResponse = await axios.post(
      'https://api.notion.com/v1/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/notion-callback`,
      },
      {
        auth: {
          username: process.env.NOTION_CLIENT_ID!,
          password: process.env.NOTION_CLIENT_SECRET!,
        },
      }
    )

    const { access_token, workspace_id } = tokenResponse.data

    // Store credentials in backend
    await axios.post(`${process.env.BACKEND_URL}/api/save-credentials`, {
      email,
      notionToken: access_token,
      workspaceId: workspace_id,
      optedIn: true,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.BACKEND_SECRET}`,
      }
    })

    res.redirect('/?success=true')
  } catch (error: any) {
    console.error('OAuth error:', error.response?.data || error.message)
    res.status(400).json({ error: 'Authentication failed' })
  }
}
