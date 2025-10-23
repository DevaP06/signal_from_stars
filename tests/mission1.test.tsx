import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from '../src/context/GameContext'
import Mission1 from '../src/pages/Mission1'

describe('Mission1 page', () => {
  it('renders mission title', () => {
    render(
      <BrowserRouter>
        <GameProvider>
          <Mission1 />
        </GameProvider>
      </BrowserRouter>
    )
    expect(screen.getByText(/Identify the Source/i)).toBeInTheDocument()
  })
})
