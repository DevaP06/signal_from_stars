import { useGame } from '../../context/GameContext'

export default function ScoreBoard() {
  const { score } = useGame()
  return <div className="text-xs">Score: {score}</div>
}

