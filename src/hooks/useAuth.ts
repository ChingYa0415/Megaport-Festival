import { useState, useEffect, useCallback } from 'react'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import type { User } from '../types'

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid)
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          setUser({ id: firebaseUser.uid, ...userDoc.data() } as User)
        }
      } else {
        try {
          await signInAnonymously(auth)
        } catch (err) {
          console.error('Anonymous auth failed:', err)
        }
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const createProfile = useCallback(
    async (name: string, avatarUrl: string) => {
      if (!userId) return
      const userData = {
        name,
        avatarUrl,
        createdAt: serverTimestamp(),
      }
      await setDoc(doc(db, 'users', userId), userData)
      setUser({ id: userId, name, avatarUrl, createdAt: new Date() })
    },
    [userId]
  )

  return { userId, user, loading, createProfile }
}
