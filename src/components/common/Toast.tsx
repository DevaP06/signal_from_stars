import React from 'react'

type Props = {
  open: boolean
  message: string
  variant?: 'info' | 'success' | 'error'
  offsetY?: number
}

export default function Toast({ open, message, variant = 'info', offsetY = 0 }: Props) {
  if (!open) return null
  const styles =
    variant === 'success'
      ? 'bg-green-500 text-white'
      : variant === 'error'
      ? 'bg-red-500 text-white'
      : 'bg-signal text-black'
  return (
    <div className="fixed inset-0 pointer-events-none flex items-start justify-center">
      <div className={`px-4 py-2 rounded shadow pointer-events-auto ${styles}`} style={{ marginTop: 6 + offsetY }}>
        {message}
      </div>
    </div>
  )
}
