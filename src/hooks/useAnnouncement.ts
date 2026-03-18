import { useCallback, useEffect, useState } from 'react'
import { doc, onSnapshot, serverTimestamp, setDoc, type Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

interface AnnouncementData {
  message: string
  updatedAt: Date | null
  updatedBy: string | null
}

const EMPTY_ANNOUNCEMENT: AnnouncementData = {
  message: '',
  updatedAt: null,
  updatedBy: null,
}

function timestampToDate(value: unknown): Date | null {
  if (!value || typeof value !== 'object') return null
  const timestamp = value as Timestamp
  if (typeof timestamp.toDate !== 'function') return null
  return timestamp.toDate()
}

export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState<AnnouncementData>(EMPTY_ANNOUNCEMENT)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const announcementRef = doc(db, 'system', 'announcement')
    const unsubscribe = onSnapshot(announcementRef, (snapshot) => {
      if (!snapshot.exists()) {
        setAnnouncement(EMPTY_ANNOUNCEMENT)
        setLoading(false)
        return
      }

      const data = snapshot.data()
      setAnnouncement({
        message: typeof data.message === 'string' ? data.message : '',
        updatedBy: typeof data.updatedBy === 'string' ? data.updatedBy : null,
        updatedAt: timestampToDate(data.updatedAt),
      })
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const saveAnnouncement = useCallback(async (message: string, uid: string) => {
    const announcementRef = doc(db, 'system', 'announcement')
    await setDoc(
      announcementRef,
      {
        message: message.trim(),
        updatedBy: uid,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  }, [])

  return { announcement, loading, saveAnnouncement }
}
