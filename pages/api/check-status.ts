import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/user-status/${email}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.BACKEND_SECRET}`,
        }
      }
    )

    res.status(200).json(response.data)
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Error checking status'
    })
  }
}
