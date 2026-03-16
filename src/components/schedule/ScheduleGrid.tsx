import { useMemo } from 'react'
import type { Performance, User } from '../../types'
import { stages } from '../../data/stages'
import { getPerformancesByDayAndStage } from '../../data/schedule'
import { StageHeader } from './StageHeader'
import { PerformanceCard } from './PerformanceCard'

interface ScheduleGridProps {
  day: 1 | 2
  userId: string
  users: Map<string, User>
  getAttendees: (performanceId: string) => string[]
  toggleSelection: (performanceId: string, userId: string) => void
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const PX_PER_10MIN = 40
const DAY_START = timeToMinutes('12:30')
const DAY_END = timeToMinutes('23:00')

function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let m = DAY_START; m < DAY_END; m += 10) {
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push(`${h}:${min.toString().padStart(2, '0')}`)
  }
  return slots
}

export function ScheduleGrid({
  day,
  userId,
  users,
  getAttendees,
  toggleSelection,
}: ScheduleGridProps) {
  const timeSlots = useMemo(() => generateTimeSlots(), [])
  const totalHeight = timeSlots.length * PX_PER_10MIN

  const stagePerformances = useMemo(
    () =>
      stages.map((stage) => ({
        stage,
        performances: getPerformancesByDayAndStage(day, stage.id),
      })),
    [day]
  )

  return (
    <div className="schedule-container">
      <StageHeader stages={stages} />

      <div className="flex" style={{ minHeight: `${totalHeight}px` }}>
        {/* Time column */}
        <div className="time-column">
          {timeSlots.map((time, i) => {
            const nextSlot = timeSlots[i + 1]
            const endLabel = nextSlot ?? (() => {
              const [h, m] = time.split(':').map(Number)
              const nm = m + 10
              return `${nm >= 60 ? h + 1 : h}:${(nm % 60).toString().padStart(2, '0')}`
            })()
            return (
              <div
                key={time}
                className="text-[10px] text-white/40 text-right pr-1.5 border-b border-white/5"
                style={{ height: `${PX_PER_10MIN}px`, lineHeight: `${PX_PER_10MIN}px` }}
              >
                {time} - {endLabel}
              </div>
            )
          })}
        </div>

        {/* Stage columns */}
        {stagePerformances.map(({ stage, performances }) => (
          <StageColumn
            key={stage.id}
            stage={stage}
            performances={performances}
            userId={userId}
            users={users}
            getAttendees={getAttendees}
            toggleSelection={toggleSelection}
            totalHeight={totalHeight}
            slotCount={timeSlots.length}
          />
        ))}
      </div>
    </div>
  )
}

interface StageColumnProps {
  stage: { id: string; color: string }
  performances: Performance[]
  userId: string
  users: Map<string, User>
  getAttendees: (performanceId: string) => string[]
  toggleSelection: (performanceId: string, userId: string) => void
  totalHeight: number
}

function StageColumn({
  stage,
  performances,
  userId,
  users,
  getAttendees,
  toggleSelection,
  totalHeight,
  slotCount,
}: StageColumnProps & { slotCount: number }) {
  return (
    <div
      className="relative border-r border-white/10"
      style={{
        minWidth: 'var(--stage-col-width)',
        width: 'var(--stage-col-width)',
        height: `${totalHeight}px`,
        backgroundColor: `${stage.color}15`,
      }}
    >
      {/* 橫線格線 */}
      {Array.from({ length: slotCount }, (_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-b border-white/10"
          style={{ top: `${(i + 1) * PX_PER_10MIN}px` }}
        />
      ))}

      {performances.map((perf) => {
        const top = ((timeToMinutes(perf.startTime) - DAY_START) / 10) * PX_PER_10MIN
        const attendees = getAttendees(perf.id)
        const isSelected = attendees.includes(userId)

        return (
          <div
            key={perf.id}
            className="absolute left-0.5 right-0.5"
            style={{ top: `${top}px` }}
          >
            <PerformanceCard
              performance={perf}
              stageColor={stage.color}
              attendeeIds={attendees}
              users={users}
              isSelected={isSelected}
              onClick={() => toggleSelection(perf.id, userId)}
            />
          </div>
        )
      })}
    </div>
  )
}
