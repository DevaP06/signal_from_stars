import { useGameProgress } from '../../hooks/useGameProgress'

export default function ProgressBar() {
  const { percent, completeCount, total } = useGameProgress()
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs mb-1">
        <span>Progress</span>
        <span>
          {completeCount}/{total}
        </span>
      </div>
      <div className="w-full bg-white/10 h-2 rounded">
        <div
          className="bg-signal h-2 rounded"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
    </div>
  )
}

