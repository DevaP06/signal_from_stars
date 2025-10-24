import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import { useGame } from '../../context/GameContext'

export default function Header() {
  const { session, clear } = useSession()
  const { reset } = useGame()
  const navigate = useNavigate()
  return (
    <header className="border-b border-white/10 bg-black/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Signal from the Stars</Link>
        <nav className="text-sm flex items-center gap-4 opacity-90">
          <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          {session && <span className="opacity-70">Team: {session.teamName}</span>}
          {session && (
            <button
              onClick={() => {
                clear()
                reset()
                navigate('/')
              }}
              className="px-2 py-1 rounded border border-white/20 hover:bg-white/10"
            >
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  )}
