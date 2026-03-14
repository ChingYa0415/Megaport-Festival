import { useState } from 'react'
import type { User } from '../types'
import { Header } from '../components/layout/Header'
import { ScheduleGrid } from '../components/schedule/ScheduleGrid'
import { useUsers } from '../hooks/useUsers'
import { useSelections } from '../hooks/useSelections'

interface SchedulePageProps {
  user: User
}

export function SchedulePage({ user }: SchedulePageProps) {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1)
  const users = useUsers()
  const { toggleSelection, getAttendees } = useSelections()

  return (
    <div className="flex flex-col h-dvh">
      <Header user={user} selectedDay={selectedDay} onDayChange={setSelectedDay} />
      <ScheduleGrid
        day={selectedDay}
        userId={user.id}
        users={users}
        getAttendees={getAttendees}
        toggleSelection={toggleSelection}
      />
    </div>
  )
}
