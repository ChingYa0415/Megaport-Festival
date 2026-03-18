import { useEffect, useMemo, useState } from 'react'
import type { Performance, User } from '../types'
import { Header } from '../components/layout/Header'
import { ScheduleGrid } from '../components/schedule/ScheduleGrid'
import { HeatRankingModal } from '../components/schedule/HeatRankingModal'
import { useUsers } from '../hooks/useUsers'
import { useSelections } from '../hooks/useSelections'
import { useNetworkStatus } from '../hooks/useNetworkStatus'
import { useAnnouncement } from '../hooks/useAnnouncement'
import { usePerformances } from '../hooks/usePerformances'

interface SchedulePageProps {
  user: User
  onReset: () => Promise<void>
}

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5]

function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

function hasTimeConflict(a: Performance, b: Performance): boolean {
  if (a.day !== b.day) return false
  const aStart = timeToMinutes(a.startTime)
  const aEnd = timeToMinutes(a.endTime)
  const bStart = timeToMinutes(b.startTime)
  const bEnd = timeToMinutes(b.endTime)
  return aStart < bEnd && bStart < aEnd
}

function detectZoomScalesText(): boolean {
  if (typeof document === 'undefined') return true

  const host = document.createElement('div')
  host.style.position = 'absolute'
  host.style.left = '-9999px'
  host.style.top = '-9999px'
  host.style.visibility = 'hidden'
  host.style.pointerEvents = 'none'

  const base = document.createElement('div')
  base.textContent = 'M'
  base.style.fontSize = '20px'

  const zoomed = document.createElement('div')
  zoomed.textContent = 'M'
  zoomed.style.fontSize = '20px'
  zoomed.style.zoom = '0.5'

  host.append(base, zoomed)
  document.body.appendChild(host)

  const baseHeight = base.getBoundingClientRect().height
  const zoomedHeight = zoomed.getBoundingClientRect().height

  document.body.removeChild(host)

  if (baseHeight === 0) return true
  return zoomedHeight < baseHeight * 0.8
}

export function SchedulePage({ user, onReset }: SchedulePageProps) {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1)
  const [zoomIndex, setZoomIndex] = useState(2)
  const [zoomScalesText, setZoomScalesText] = useState(true)
  const [showHeatRanking, setShowHeatRanking] = useState(false)
  const [conflictToastMessage, setConflictToastMessage] = useState<string | null>(null)
  const users = useUsers()
  const { toggleSelection, getAttendees } = useSelections()
  const isOnline = useNetworkStatus()
  const { announcement } = useAnnouncement()
  const { performances } = usePerformances()

  const zoom = ZOOM_LEVELS[zoomIndex]
  const textScale = zoomScalesText ? 1 : zoom

  useEffect(() => {
    setZoomScalesText(detectZoomScalesText())
  }, [])

  useEffect(() => {
    if (!conflictToastMessage) return
    const timer = window.setTimeout(() => setConflictToastMessage(null), 2600)
    return () => window.clearTimeout(timer)
  }, [conflictToastMessage])

  const performancesByDay = useMemo(
    () => performances.filter((performance) => performance.day === selectedDay),
    [performances, selectedDay]
  )

  const mySelectedPerformances = useMemo(
    () => performancesByDay.filter((performance) => getAttendees(performance.id).includes(user.id)),
    [performancesByDay, getAttendees, user.id]
  )

  const conflictIds = useMemo(() => {
    const ids = new Set<string>()
    for (let i = 0; i < mySelectedPerformances.length; i += 1) {
      for (let j = i + 1; j < mySelectedPerformances.length; j += 1) {
        const a = mySelectedPerformances[i]
        const b = mySelectedPerformances[j]
        if (hasTimeConflict(a, b)) {
          ids.add(a.id)
          ids.add(b.id)
        }
      }
    }
    return ids
  }, [mySelectedPerformances])

  const heatRankings = useMemo(() => {
    return performancesByDay
      .map((performance) => ({
        performance,
        attendeeCount: getAttendees(performance.id).filter((uid) => users.has(uid)).length,
      }))
      .sort((a, b) => {
        if (b.attendeeCount !== a.attendeeCount) return b.attendeeCount - a.attendeeCount
        const aStartTime = timeToMinutes(a.performance.startTime)
        const bStartTime = timeToMinutes(b.performance.startTime)
        if (aStartTime !== bStartTime) return aStartTime - bStartTime
        return a.performance.name.localeCompare(b.performance.name, 'zh-Hant')
      })
  }, [performancesByDay, getAttendees, users])

  const handleBeforeToggle = (performance: Performance, isSelected: boolean) => {
    if (isSelected) return

    const conflicts = mySelectedPerformances.filter(
      (selectedPerformance) =>
        selectedPerformance.id !== performance.id && hasTimeConflict(selectedPerformance, performance)
    )
    if (conflicts.length === 0) return

    const names = conflicts.slice(0, 2).map((item) => `「${item.name}」`).join('、')
    const suffix = conflicts.length > 2 ? ` 等 ${conflicts.length} 場` : ''
    setConflictToastMessage(`「${performance.name}」和 ${names}${suffix} 時間重疊`)
  }

  return (
    <div className="flex flex-col h-dvh">
      <Header
        user={user}
        selectedDay={selectedDay}
        isOnline={isOnline}
        onDayChange={setSelectedDay}
        onReset={onReset}
        onOpenRanking={() => setShowHeatRanking(true)}
        onZoomIn={() => setZoomIndex((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1))}
        onZoomOut={() => setZoomIndex((i) => Math.max(i - 1, 0))}
        canZoomIn={zoomIndex < ZOOM_LEVELS.length - 1}
        canZoomOut={zoomIndex > 0}
      />
      {announcement.message && (
        <div className="px-3 py-2 bg-[#7f1d1d] border-b border-white/10">
          <p className="text-[11px] text-white/70 font-bold">管理公告</p>
          <p className="text-xs text-white">{announcement.message}</p>
        </div>
      )}
      <ScheduleGrid
        day={selectedDay}
        performances={performancesByDay}
        userId={user.id}
        users={users}
        getAttendees={getAttendees}
        toggleSelection={toggleSelection}
        zoom={zoom}
        textScale={textScale}
        conflictIds={conflictIds}
        onBeforeToggle={handleBeforeToggle}
      />
      {showHeatRanking && (
        <HeatRankingModal
          day={selectedDay}
          rankings={heatRankings}
          onClose={() => setShowHeatRanking(false)}
        />
      )}
      {conflictToastMessage && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] w-[min(92vw,460px)] px-4">
          <div className="rounded-xl bg-[#B91C1C] px-4 py-3 shadow-2xl border border-white/20">
            <p className="text-sm font-bold text-white">衝堂提醒</p>
            <p className="mt-1 text-xs text-white/90">{conflictToastMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}
