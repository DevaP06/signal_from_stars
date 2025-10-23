import { Link, useNavigate } from 'react-router-dom'
import ScoreBoard from '../components/common/ScoreBoard'
import Timer from '../components/common/Timer'
import { useSession } from '../context/SessionContext'
import { useState } from 'react'
import Alert from '../components/common/Alert'

export default function LandingPage() {
  const { session, join } = useSession()
  const [teamName, setTeamName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ScoreBoard />
        <Timer />
      </div>
      <div className="prose prose-invert max-w-none">
        <h2>Welcome, Explorer</h2>
        <p>
          We detected unusual transmissions from deep space. Decode the signals, complete missions, and uncover what lies
          beyond the stars.
        </p>
      </div>
      {!session ? (
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-xl"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!teamName.trim()) return
            setLoading(true)
            setError(null)
            try {
              await join(teamName.trim())
              navigate('/mission-1')
            } catch (e: any) {
              setError(e?.message || 'Failed to join. Please try again.')
            } finally {
              setLoading(false)
            }
          }}
        >
          {error && <Alert variant="error" message={error} />}
          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="flex-1 px-3 py-2 rounded bg-black/40 border border-white/10 focus:outline-none focus:ring focus:ring-signal"
          />
          <button disabled={loading} className="px-4 py-2 rounded bg-signal text-black font-medium">
            {loading ? 'Joining...' : 'Join Game'}
          </button>
        </form>
      ) : (
        <div className="flex gap-3">
          <Link className="px-4 py-2 rounded bg-signal text-black font-medium" to="/mission-1">
            Continue to Mission 1
          </Link>
          <Link className="px-4 py-2 rounded border border-white/20" to="/leaderboard">View Leaderboard</Link>
        </div>
      )}
    </div>
  )
}
