import { useEffect, useMemo, useState } from 'react'

export default function Confetti({ duration = 1500, count = 80 }: { duration?: number; count?: number }) {
  const [active, setActive] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setActive(false), duration)
    return () => clearTimeout(t)
  }, [duration])
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => i), [count])
  if (!active) return null
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <style>{`
        @keyframes sfts-fall {
          0% { transform: translate3d(var(--x,0), -10%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate3d(var(--xEnd,0), 110%, 0) rotate(720deg); opacity: 0.9; }
        }
      `}</style>
      {pieces.map((i) => {
        const left = Math.random() * 100
        const size = 6 + Math.random() * 8
        const hue = Math.floor(Math.random() * 360)
        const delay = Math.random() * 0.2
        const x = (Math.random() * 40 - 20).toFixed(1) + 'vw'
        const xEnd = (Math.random() * 40 - 20).toFixed(1) + 'vw'
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: '-10%',
              left: left + 'vw',
              width: size,
              height: size * 0.4,
              background: `hsl(${hue} 90% 55%)`,
              transform: 'translate3d(0,-100%,0)',
              animation: `sfts-fall ${1.2 + Math.random() * 0.8}s ease-in forwards`,
              animationDelay: `${delay}s`,
              borderRadius: '2px',
              filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.15))',
              // CSS custom props for motion
              // @ts-ignore
              '--x': x,
              // @ts-ignore
              '--xEnd': xEnd,
            } as any}
          />
        )
      })}
    </div>
  )
}

