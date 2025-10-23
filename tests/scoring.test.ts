import { describe, it, expect } from 'vitest'
import { addScore, calculatePoints } from '../src/utils/scoring'

describe('scoring', () => {
  it('awards zero when incorrect', () => {
    expect(calculatePoints({ correct: false, timeSeconds: 10 })).toBe(0)
  })
  it('adds score and never below zero', () => {
    expect(addScore(10, -50)).toBe(0)
    expect(addScore(10, 5)).toBe(15)
  })
})

