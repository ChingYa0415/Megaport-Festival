import { useState } from 'react'
import type { User } from '../types'
import { Header } from '../components/layout/Header'
import { ScheduleGrid } from '../components/schedule/ScheduleGrid'
import { useUsers } from '../hooks/useUsers'
import { useSelections } from '../hooks/useSelections'

interface SchedulePageProps {
  user: User
  onReset: () => Promise<void>
}

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5]

export function SchedulePage({ user, onReset }: SchedulePageProps) {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1)
  const [zoomIndex, setZoomIndex] = useState(2)
  const users = useUsers()
  const { toggleSelection, getAttendees } = useSelections()

  const zoom = ZOOM_LEVELS[zoomIndex]

  return (
    <div className="flex flex-col h-dvh">
      <Header
        user={user}
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
        onReset={onReset}
        onZoomIn={() => setZoomIndex((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1))}
        onZoomOut={() => setZoomIndex((i) => Math.max(i - 1, 0))}
        canZoomIn={zoomIndex < ZOOM_LEVELS.length - 1}
        canZoomOut={zoomIndex > 0}
      />
      <ScheduleGrid
        day={selectedDay}
        userId={user.id}
        users={users}
        getAttendees={getAttendees}
        toggleSelection={toggleSelection}
        zoom={zoom}
      />
    </div>
  )
}
