import { Link } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'

export default function Header() {
  const { session } = useSession()
  return (
    <header className="border-b border-white/10 bg-black/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Signal from the Stars</Link>
        <nav className="text-sm flex items-center gap-4 opacity-90">
          <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          {session && <span className="opacity-70">Team: {session.teamName}</span>}
        </nav>
      </div>
    </header>
  )}
