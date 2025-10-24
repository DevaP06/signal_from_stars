import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiJoin } from '../utils/api'

type Session = {
  teamId: string
  token: string
  gameId: string
  teamName: string
}

type SessionContextValue = {
  session: Session | null
  join: (teamName: string) => Promise<void>
  clear: () => void
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

const STORAGE_KEY = 'sfts_session'
const VERSION_KEY = 'sfts_version'
const APP_VERSION: string = (import.meta.env.VITE_APP_VERSION || '1') as string
const ENABLE_VERSION_GUARD: boolean = String(import.meta.env.VITE_ENABLE_VERSION_GUARD || 'false').toLowerCase() === 'true'

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    if (ENABLE_VERSION_GUARD) {
      const storedVersion = localStorage.getItem(VERSION_KEY)
      if (storedVersion !== APP_VERSION) {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.setItem(VERSION_KEY, APP_VERSION)
        setSession(null)
        return
      }
    }
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setSession(JSON.parse(raw))
  }, [])

  const persist = (s: Session | null) => {
    if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    else localStorage.removeItem(STORAGE_KEY)
  }

  const join = useCallback(async (teamName: string) => {
    const res = await apiJoin(teamName)
    const s: Session = { teamId: res.teamId, token: res.token, gameId: res.gameId, teamName }
    setSession(s)
    persist(s)
  }, [])

  const clear = useCallback(() => {
    setSession(null)
    persist(null)
  }, [])

  const value = useMemo(() => ({ session, join, clear }), [session, join, clear])
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
