import { useCallback, useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { schedule as fallbackSchedule } from '../data/schedule'
import type { Performance } from '../types'

type DataSource = 'firestore' | 'fallback'

interface UsePerformancesOptions {
  enabled?: boolean
}

interface FirestorePerformance {
  name?: unknown
  stage?: unknown
  day?: unknown
  startTime?: unknown
  endTime?: unknown
  tag?: unknown
}

function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

function sortPerformances(input: Performance[]): Performance[] {
  return [...input].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day
    const aStart = timeToMinutes(a.startTime)
    const bStart = timeToMinutes(b.startTime)
    if (aStart !== bStart) return aStart - bStart
    if (a.stage !== b.stage) return a.stage.localeCompare(b.stage)
    return a.name.localeCompare(b.name, 'zh-Hant')
  })
}

function toPerformance(docId: string, data: FirestorePerformance): Performance | null {
  if (
    typeof data.name !== 'string' ||
    typeof data.stage !== 'string' ||
    (data.day !== 1 && data.day !== 2) ||
    typeof data.startTime !== 'string' ||
    typeof data.endTime !== 'string'
  ) {
    return null
  }

  return {
    id: docId,
    name: data.name,
    stage: data.stage,
    day: data.day,
    startTime: data.startTime,
    endTime: data.endTime,
    tag: typeof data.tag === 'string' ? data.tag : undefined,
  }
}

export function usePerformances(options?: UsePerformancesOptions) {
  const enabled = options?.enabled ?? true
  const [performances, setPerformances] = useState<Performance[]>(sortPerformances(fallbackSchedule))
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<DataSource>('fallback')

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    const unsubscribe = onSnapshot(
      collection(db, 'performances'),
      (snapshot) => {
        if (snapshot.empty) {
          setPerformances(sortPerformances(fallbackSchedule))
          setSource('fallback')
          setLoading(false)
          return
        }

        const parsed: Performance[] = []
        snapshot.forEach((item) => {
          const next = toPerformance(item.id, item.data() as FirestorePerformance)
          if (next) parsed.push(next)
        })

        if (parsed.length === 0) {
          setPerformances(sortPerformances(fallbackSchedule))
          setSource('fallback')
        } else {
          setPerformances(sortPerformances(parsed))
          setSource('firestore')
        }
        setLoading(false)
      },
      () => {
        setPerformances(sortPerformances(fallbackSchedule))
        setSource('fallback')
        setLoading(false)
      }
    )

    return unsubscribe
  }, [enabled])

  const upsertPerformance = useCallback(async (performance: Performance) => {
    const ref = doc(db, 'performances', performance.id)
    await setDoc(
      ref,
      {
        name: performance.name.trim(),
        stage: performance.stage,
        day: performance.day,
        startTime: performance.startTime,
        endTime: performance.endTime,
        tag: performance.tag?.trim() || null,
      },
      { merge: true }
    )
  }, [])

  const removePerformance = useCallback(async (id: string) => {
    await deleteDoc(doc(db, 'performances', id))
  }, [])

  const seedDefaultSchedule = useCallback(async () => {
    const batch = writeBatch(db)
    for (const performance of fallbackSchedule) {
      const ref = doc(db, 'performances', performance.id)
      batch.set(
        ref,
        {
          name: performance.name,
          stage: performance.stage,
          day: performance.day,
          startTime: performance.startTime,
          endTime: performance.endTime,
          tag: performance.tag || null,
        },
        { merge: true }
      )
    }
    await batch.commit()
  }, [])

  return {
    performances,
    loading,
    source,
    upsertPerformance,
    removePerformance,
    seedDefaultSchedule,
  }
}
