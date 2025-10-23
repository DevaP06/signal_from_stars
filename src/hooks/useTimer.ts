import { useEffect, useRef, useState } from 'react'

export function useTimer(start = 0) {
  const [seconds, setSeconds] = useState(start)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    intervalRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [])

  return seconds
}

