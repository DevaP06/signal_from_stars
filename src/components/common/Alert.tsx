type Props = {
  variant?: 'info' | 'success' | 'error'
  message: string
}

export default function Alert({ variant = 'info', message }: Props) {
  const styles =
    variant === 'success'
      ? 'bg-green-500/10 border-green-400/40 text-green-200'
      : variant === 'error'
      ? 'bg-red-500/10 border-red-400/40 text-red-200'
      : 'bg-signal/10 border-signal/40 text-signal'

  return (
    <div className={`border rounded px-3 py-2 text-sm ${styles}`} role="alert">
      {message}
    </div>
  )
}

