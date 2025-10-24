export type JoinResponse = { teamId: string; gameId: string; token: string }
export type PuzzleResponse = { missionId: number; question: any; hint?: string; assets?: string[] }
export type AnswerResponse = { correct: boolean; scoreDelta: number; newScore: number; nextMissionUnlocked: boolean }
export type LeaderboardEntry = { _id?: string; name: string; score: number; currentMission: number; finishedAt?: string }

const BASE: string = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

function authHeaders(token?: string): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function parseOrThrow(res: Response) {
  const text = await res.text()
  try {
    const data = text ? JSON.parse(text) : {}
    if (!res.ok) {
      const err = new Error(data.error || res.statusText)
      ;(err as any).status = res.status
      throw err
    }
    return data
  } catch (e) {
    if (!res.ok) {
      const err = new Error(text || res.statusText)
      ;(err as any).status = res.status
      throw err
    }
    // JSON parse failed but response was OK
    return {} as any
  }
}

export async function apiJoin(teamName: string): Promise<JoinResponse> {
  const res = await fetch(`${BASE}/api/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamName }),
  })
  return parseOrThrow(res)
}

export async function apiGetPuzzle(token: string, mission: number): Promise<PuzzleResponse> {
  const res = await fetch(`${BASE}/api/puzzle/${mission}`, { headers: { ...authHeaders(token) } as HeadersInit })
  return parseOrThrow(res)
}

export async function apiSubmitAnswer(token: string, mission: number, answer: string): Promise<AnswerResponse> {
  const res = await fetch(`${BASE}/api/answer/${mission}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) } as HeadersInit,
    body: JSON.stringify({ answer }),
  })
  return parseOrThrow(res)
}

export async function apiLeaderboard(): Promise<{ leaderboard: LeaderboardEntry[] }> {
  const res = await fetch(`${BASE}/api/leaderboard`)
  return parseOrThrow(res)
}

export async function apiMe(token: string): Promise<{ teamId: string; name: string; score: number; currentMission: number; finishedAt?: string | null }> {
  const res = await fetch(`${BASE}/api/me`, { headers: { ...authHeaders(token) } as HeadersInit })
  return parseOrThrow(res)
}
