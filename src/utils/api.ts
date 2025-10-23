export type JoinResponse = { teamId: string; gameId: string; token: string }
export type PuzzleResponse = { missionId: number; question: any; hint?: string; assets?: string[] }
export type AnswerResponse = { correct: boolean; scoreDelta: number; newScore: number; nextMissionUnlocked: boolean }
export type LeaderboardEntry = { _id?: string; name: string; score: number; currentMission: number; finishedAt?: string }

const BASE: string = import.meta.env.VITE_API_URL || ''

function authHeaders(token?: string): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiJoin(teamName: string): Promise<JoinResponse> {
  const res = await fetch(`${BASE}/api/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamName }),
  })
  if (!res.ok) throw new Error('Join failed')
  return res.json()
}

export async function apiGetPuzzle(token: string, mission: number): Promise<PuzzleResponse> {
  const res = await fetch(`${BASE}/api/puzzle/${mission}`, { headers: { ...authHeaders(token) } as HeadersInit })
  if (!res.ok) throw new Error('Puzzle fetch failed')
  return res.json()
}

export async function apiSubmitAnswer(token: string, mission: number, answer: string): Promise<AnswerResponse> {
  const res = await fetch(`${BASE}/api/answer/${mission}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) } as HeadersInit,
    body: JSON.stringify({ answer }),
  })
  if (!res.ok) throw new Error('Answer submit failed')
  return res.json()
}

export async function apiLeaderboard(): Promise<{ leaderboard: LeaderboardEntry[] }> {
  const res = await fetch(`${BASE}/api/leaderboard`)
  if (!res.ok) throw new Error('Leaderboard fetch failed')
  return res.json()
}
