import { useCallback, useEffect, useState } from 'react'
import {
  type AuthError,
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { clearAdminLoginIntent, setAdminLoginIntent } from '../utils/adminLoginIntent'

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

const DEFAULT_ADMIN_EMAILS = ['angus09855069@gmail.com']
const configuredAdminEmails = import.meta.env.VITE_ADMIN_EMAILS as string | undefined
const ADMIN_EMAILS = new Set(
  (configuredAdminEmails ? configuredAdminEmails.split(',') : DEFAULT_ADMIN_EMAILS)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
)

function isListedAdminEmail(email: string | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.has(email.toLowerCase())
}

const REDIRECT_FALLBACK_ERRORS = new Set([
  'auth/popup-blocked',
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/operation-not-supported-in-this-environment',
])

export function useAdminAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true
    let redirectReady = false
    let authEventReady = false

    const updateAdminState = async (nextUser: FirebaseUser | null) => {
      if (!isActive) return

      setFirebaseUser(nextUser)
      if (!nextUser) {
        setIsAdmin(false)
        return
      }

      const isEmailAdmin = isListedAdminEmail(nextUser.email)
      try {
        const adminDoc = await getDoc(doc(db, 'admins', nextUser.uid))
        if (!isActive) return
        setIsAdmin(adminDoc.exists() || isEmailAdmin)
      } catch (error) {
        if (!isActive) return
        // Firestore 權限或網路錯誤時，至少保留 email 白名單判定，避免登入狀態被誤判為未登入。
        setIsAdmin(isEmailAdmin)
        const message = error instanceof Error ? error.message : String(error)
        if (!isEmailAdmin) {
          setAuthError(`管理權限檢查失敗：${message}`)
        }
      }

      clearAdminLoginIntent()
      setAuthError(null)
    }

    const maybeFinishLoading = () => {
      if (redirectReady && authEventReady && isActive) {
        setLoading(false)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      await updateAdminState(nextUser)
      authEventReady = true
      maybeFinishLoading()
    })

    getRedirectResult(auth)
      .then(async (result) => {
        if (!isActive) return
        if (result?.user) {
          await updateAdminState(result.user)
          return
        }

        if (!auth.currentUser) {
          clearAdminLoginIntent()
        }
      })
      .catch((error) => {
        if (!isActive) return
        clearAdminLoginIntent()
        const message = error instanceof Error ? error.message : String(error)
        setAuthError(`登入失敗：${message}`)
      })
      .finally(() => {
        if (!isActive) return
        redirectReady = true
        maybeFinishLoading()
      })

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [])

  const signInAsAdmin = useCallback(async () => {
    setAuthError(null)

    const signInByRedirect = async () => {
      setAdminLoginIntent()
      await signInWithRedirect(auth, provider)
    }

    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      const authError = error as AuthError
      if (REDIRECT_FALLBACK_ERRORS.has(authError.code)) {
        try {
          await signInByRedirect()
          return
        } catch (redirectError) {
          const redirectMessage =
            redirectError instanceof Error ? redirectError.message : String(redirectError)
          setAuthError(`登入失敗：${redirectMessage}`)
          return
        }
      }

      const message = error instanceof Error ? error.message : String(error)
      setAuthError(`登入失敗：${message}`)
    }
  }, [])

  const signOutAdmin = useCallback(async () => {
    setAuthError(null)
    clearAdminLoginIntent()
    await signOut(auth)
  }, [])

  return { firebaseUser, isAdmin, loading, authError, signInAsAdmin, signOutAdmin }
}
