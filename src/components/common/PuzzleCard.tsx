import { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export default function PuzzleCard({ title, children }: Props) {
  return (
    <section className="bg-white/5 border border-white/10 rounded-lg p-4 shadow-md shadow-black/20">
      <h2 className="text-lg font-medium mb-3">{title}</h2>
      <div>{children}</div>
    </section>
  )
}

