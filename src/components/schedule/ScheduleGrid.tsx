import { useMemo, useState } from 'react'
import type { Performance, User } from '../../types'
import { stages, stageCardColorMap } from '../../data/stages'
import { StageHeader } from './StageHeader'
import { PerformanceCard } from './PerformanceCard'

interface ScheduleGridProps {
  day: 1 | 2
  performances: Performance[]
  userId: string
  users: Map<string, User>
  getAttendees: (performanceId: string) => string[]
  toggleSelection: (performanceId: string, userId: string) => void
  zoom: number
  textScale: number
  conflictIds: Set<string>
  onBeforeToggle: (performance: Performance, isSelected: boolean) => void
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const PX_PER_10MIN = 40
const DAY_START = timeToMinutes('12:30')
const DAY_END = timeToMinutes('21:50')

function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let m = DAY_START; m < DAY_END; m += 10) {
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push(`${h}:${min.toString().padStart(2, '0')}`)
  }
  return slots
}

interface LongPressInfo {
  performance: Performance
  attendeeIds: string[]
}

export function ScheduleGrid({
  day,
  performances,
  userId,
  users,
  getAttendees,
  toggleSelection,
  zoom,
  textScale,
  conflictIds,
  onBeforeToggle,
}: ScheduleGridProps) {
  const timeSlots = useMemo(() => generateTimeSlots(), [])
  const totalHeight = timeSlots.length * PX_PER_10MIN
  const [longPressInfo, setLongPressInfo] = useState<LongPressInfo | null>(null)

  const stagePerformances = useMemo(
    () =>
      stages.map((stage) => ({
        stage,
        performances: performances.filter((performance) => performance.stage === stage.id),
      })),
    [performances]
  )

  return (
    <>
    <div className="schedule-container" style={{ zoom }}>
      <StageHeader stages={stages} day={day} textScale={textScale} />

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
            const isHour = (DAY_START + (i + 1) * 10) % 60 === 0
            return (
              <div
                key={time}
                className="text-black font-bold flex items-center justify-center"
                style={{
                  height: `${PX_PER_10MIN}px`,
                  fontSize: `${10 * textScale}px`,
                  borderBottom: isHour ? '2px solid #000' : '1px solid #000',
                }}
              >
                {time} - {endLabel}
              </div>
            )
          })}
        </div>

        {/* Stage columns */}
        {stagePerformances.map(({ stage, performances }, colIndex) => (
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
            colIndex={colIndex}
            textScale={textScale}
            conflictIds={conflictIds}
            onBeforeToggle={onBeforeToggle}
            onLongPress={(perf, attendeeIds) => setLongPressInfo({ performance: perf, attendeeIds })}
          />
        ))}
      </div>
    </div>

    {/* 長按 Modal */}
    {longPressInfo && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setLongPressInfo(null)}
      >
        <div
          className="bg-white rounded-2xl p-5 w-72 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-base font-bold text-black mb-1">{longPressInfo.performance.name}</h2>
          <p className="text-xs text-black/40 mb-4">
            {longPressInfo.performance.startTime} – {longPressInfo.performance.endTime}
          </p>
          {longPressInfo.attendeeIds.length === 0 ? (
            <p className="text-sm text-black/40">還沒有人選擇這場</p>
          ) : (
            <ul className="space-y-2">
              {longPressInfo.attendeeIds.map((uid) => {
                const user = users.get(uid)
                return user ? (
                  <li key={uid} className="flex items-center gap-3">
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm text-black">{user.name}</span>
                  </li>
                ) : null
              })}
            </ul>
          )}
          <button
            className="mt-4 w-full py-2 rounded-xl bg-black/5 text-sm text-black/60"
            onClick={() => setLongPressInfo(null)}
          >
            關閉
          </button>
        </div>
      </div>
    )}
    </>
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
  colIndex: number
  textScale: number
  conflictIds: Set<string>
  onBeforeToggle: (performance: Performance, isSelected: boolean) => void
  onLongPress: (perf: Performance, attendeeIds: string[]) => void
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
  colIndex,
  textScale,
  conflictIds,
  onBeforeToggle,
  onLongPress,
}: StageColumnProps & { slotCount: number }) {
  const coveredRows = useMemo(() => {
    const covered = new Array(slotCount).fill(false) as boolean[]
    for (const perf of performances) {
      const startMin = timeToMinutes(perf.startTime)
      const endMin = timeToMinutes(perf.endTime)
      for (let i = 0; i < slotCount; i++) {
        const rowStart = DAY_START + i * 10
        if (startMin <= rowStart && endMin > rowStart) {
          covered[i] = true
        }
      }
    }
    return covered
  }, [performances, slotCount])

  return (
    <div
      className="relative"
      style={{
        minWidth: 'var(--stage-col-width)',
        width: 'var(--stage-col-width)',
        height: `${totalHeight}px`,
      }}
    >
      {Array.from({ length: slotCount }, (_, i) => {
        const isCovered = coveredRows[i]
        const isHour = (DAY_START + (i + 1) * 10) % 60 === 0
        return (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${i * PX_PER_10MIN}px`,
              height: `${PX_PER_10MIN}px`,
              backgroundColor: isCovered ? (stageCardColorMap[stage.id] ?? stage.color) : (colIndex % 2 === 0 ? '#DCDEDD' : '#FFFFFF'),
              borderBottom: isCovered ? 'none' : (isHour ? '2px solid #000' : '1px solid #000'),
              zIndex: 0,
            }}
          />
        )
      })}

      {performances.map((perf) => {
        const top = ((timeToMinutes(perf.startTime) - DAY_START) / 10) * PX_PER_10MIN
        const attendees = getAttendees(perf.id)
        const existingAttendees = attendees.filter((uid) => users.has(uid))
        const isSelected = attendees.includes(userId)
        const isConflict = conflictIds.has(perf.id)
        const handleClick = () => {
          onBeforeToggle(perf, isSelected)
          toggleSelection(perf.id, userId)
        }

        return (
          <div
            key={perf.id}
            className="absolute left-0 right-0"
            style={{ top: `${top}px`, zIndex: 1 }}
          >
            <PerformanceCard
              performance={perf}
              stageColor={stageCardColorMap[stage.id] ?? stage.color}
              attendeeIds={existingAttendees}
              users={users}
              isSelected={isSelected}
              isConflict={isConflict}
              textScale={textScale}
              onClick={handleClick}
              onLongPress={() => onLongPress(perf, existingAttendees)}
            />
          </div>
        )
      })}
    </div>
  )
}
