import type { Performance, User } from '../../types'
import { AttendeeAvatars } from './AttendeeAvatars'

interface PerformanceCardProps {
  performance: Performance
  stageColor: string
  attendeeIds: string[]
  users: Map<string, User>
  isSelected: boolean
  onClick: () => void
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const PX_PER_10MIN = 40

export function PerformanceCard({
  performance,
  stageColor,
  attendeeIds,
  users,
  isSelected,
  onClick,
}: PerformanceCardProps) {
  const duration = timeToMinutes(performance.endTime) - timeToMinutes(performance.startTime)
  const height = (duration / 10) * PX_PER_10MIN

  return (
    <div
      className={`performance-card rounded-lg p-1.5 ${isSelected ? 'selected' : ''}`}
      style={{
        height: `${height}px`,
        backgroundColor: `${stageColor}22`,
        borderLeft: `3px solid ${stageColor}`,
      }}
      onClick={onClick}
    >
      <div className="text-[11px] font-bold text-white leading-tight truncate">
        {performance.name}
      </div>
      <div className="text-[9px] text-white/50">
        {performance.startTime}-{performance.endTime}
      </div>
      {performance.tag && (
        <span className="text-[9px] text-yellow-300">{performance.tag}</span>
      )}
      <AttendeeAvatars attendeeIds={attendeeIds} users={users} />
    </div>
  )
}
