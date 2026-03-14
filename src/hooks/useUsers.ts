import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { User } from '../types'

export function useUsers() {
  const [users, setUsers] = useState<Map<string, User>>(new Map())

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const map = new Map<string, User>()
      snapshot.forEach((doc) => {
        map.set(doc.id, { id: doc.id, ...doc.data() } as User)
      })
      setUsers(map)
    })
    return unsubscribe
  }, [])

  return users
}
