export function binaryToAscii(binary: string): string {
  return binary
    .trim()
    .split(/\s+/)
    .map((b) => String.fromCharCode(parseInt(b, 2)))
    .join('')
}

export function asciiToBinary(text: string): string {
  return text
    .split('')
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ')
}

export function isCorrectAnswer(answer: string, expected: string): boolean {
  return answer.trim().toLowerCase() === expected.trim().toLowerCase()
}

