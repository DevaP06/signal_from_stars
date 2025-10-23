export const WS_EVENTS = {
  JOIN_GAME: 'join_game',
  JOINED: 'joined',
  GAME_STATE: 'game_state',
  LEADERBOARD_UPDATE: 'leaderboard_update',
  TEAM_UPDATE: 'team_update',
  MISSION_UNLOCKED: 'mission_unlocked',
  ENDGAME: 'endgame',
} as const

export type WsEvent = keyof typeof WS_EVENTS

