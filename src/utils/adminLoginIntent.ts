const ADMIN_LOGIN_INTENT_KEY = 'megaport-admin-login-intent'
const ADMIN_LOGIN_INTENT_MAX_AGE_MS = 10 * 60 * 1000

function getIntentStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    try {
      return window.sessionStorage
    } catch {
      return null
    }
  }
}

export function setAdminLoginIntent(): void {
  const storage = getIntentStorage()
  if (!storage) return
  storage.setItem(ADMIN_LOGIN_INTENT_KEY, Date.now().toString())
}

export function clearAdminLoginIntent(): void {
  const storage = getIntentStorage()
  if (!storage) return
  storage.removeItem(ADMIN_LOGIN_INTENT_KEY)
}

export function hasFreshAdminLoginIntent(): boolean {
  const storage = getIntentStorage()
  if (!storage) return false
  const raw = storage.getItem(ADMIN_LOGIN_INTENT_KEY)
  if (!raw) return false

  const timestamp = Number(raw)
  if (!Number.isFinite(timestamp)) {
    clearAdminLoginIntent()
    return false
  }

  if (Date.now() - timestamp > ADMIN_LOGIN_INTENT_MAX_AGE_MS) {
    clearAdminLoginIntent()
    return false
  }

  return true
}
