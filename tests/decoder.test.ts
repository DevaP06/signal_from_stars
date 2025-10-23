import { describe, it, expect } from 'vitest'
import { binaryToAscii, asciiToBinary, isCorrectAnswer } from '../src/utils/decoder'

describe('decoder', () => {
  it('converts binary to ascii', () => {
    expect(binaryToAscii('01001000 01101001')).toBe('Hi')
  })
  it('converts ascii to binary', () => {
    expect(asciiToBinary('A')).toBe('01000001')
  })
  it('checks correct answers case-insensitively', () => {
    expect(isCorrectAnswer('HeLLo', 'hello')).toBe(true)
  })
})

