import { useTimer } from '../../hooks/useTimer'

export default function Timer() {
  const seconds = useTimer()
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return <div className="text-xs opacity-80">Time: {mm}:{ss}</div>
}

