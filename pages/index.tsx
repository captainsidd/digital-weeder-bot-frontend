import { useState } from 'react'
import axios from 'axios'
import styles from '../styles/home.module.css'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('sid.nutulapati@gmail.com')
  const [opted, setOpted] = useState(false)

  const handleNotionAuth = async () => {
    setLoading(true)
    setMessage('Redirecting to Notion...')
    
    const clientId = process.env.NEXT_PUBLIC_NOTION_CLIENT_ID
    const redirectUri = `${window.location.origin}/api/notion-callback`
    
    const authUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${clientId}&response_type=code&owner=user&redirect_uri=${encodeURIComponent(redirectUri)}`
    
    window.location.href = authUrl
  }

  const handleCheckStatus = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/check-status', { email })
      setOpted(response.data.opted)
      setMessage(response.data.opted ? 'You\'re opted in! Weekly emails will start soon.' : 'You\'re not opted in yet.')
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error checking status')
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>🌱 Digital Weeder</h1>
        <p>Keep your digital garden fresh by resurging notes from 6 months ago</p>

        <div className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            disabled
            className={styles.input}
          />

          <button
            onClick={handleNotionAuth}
            disabled={loading}
            className={styles.buttonPrimary}
          >
            {loading ? 'Loading...' : 'Connect Notion Account'}
          </button>

          <button
            onClick={handleCheckStatus}
            disabled={loading}
            className={styles.buttonSecondary}
          >
            Check Email Status
          </button>

          {message && <p className={styles.message}>{message}</p>}
          {opted && <p className={styles.success}>✅ You're all set!</p>}
        </div>

        <div className={styles.info}>
          <h3>How it works:</h3>
          <ol>
            <li>Connect your Notion account</li>
            <li>We'll pull a random note from 6 months ago</li>
            <li>You'll receive a beautiful email each Sunday</li>
            <li>Decide: Keep it or archive it</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
