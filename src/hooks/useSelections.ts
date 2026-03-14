import { useState, useEffect, useCallback } from 'react'
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'

export function useSelections() {
  // performanceId -> userId[]
  const [selections, setSelections] = useState<Map<string, string[]>>(new Map())

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'selections'), (snapshot) => {
      const map = new Map<string, string[]>()
      snapshot.forEach((doc) => {
        const data = doc.data()
        map.set(doc.id, data.attendees || [])
      })
      setSelections(map)
    })
    return unsubscribe
  }, [])

  const toggleSelection = useCallback(async (performanceId: string, userId: string) => {
    const ref = doc(db, 'selections', performanceId)
    const current = selections.get(performanceId) || []
    const isSelected = current.includes(userId)

    await setDoc(
      ref,
      {
        attendees: isSelected ? arrayRemove(userId) : arrayUnion(userId),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  }, [selections])

  const getAttendees = useCallback(
    (performanceId: string): string[] => {
      return selections.get(performanceId) || []
    },
    [selections]
  )

  return { selections, toggleSelection, getAttendees }
}
