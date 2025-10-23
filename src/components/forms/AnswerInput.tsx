import { useState } from 'react'

type Props = {
  onSubmit: (value: string) => void
  placeholder?: string
  buttonLabel?: string
}

export default function AnswerInput({ onSubmit, placeholder = 'Type your answer', buttonLabel = 'Submit' }: Props) {
  const [value, setValue] = useState('')
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
        setValue('')
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 rounded bg-black/40 border border-white/10 focus:outline-none focus:ring focus:ring-signal"
      />
      <button type="submit" className="px-4 py-2 rounded bg-signal text-black font-medium">
        {buttonLabel}
      </button>
    </form>
  )
}

