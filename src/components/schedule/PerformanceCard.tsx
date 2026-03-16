import { useRef } from 'react'
import type { Performance, User } from '../../types'
import { AttendeeAvatars } from './AttendeeAvatars'

interface PerformanceCardProps {
  performance: Performance
  stageColor: string
  attendeeIds: string[]
  users: Map<string, User>
  isSelected: boolean
  onClick: () => void
  onLongPress: () => void
}


function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const PX_PER_10MIN = 40

export function PerformanceCard({
  performance,
  stageColor: _stageColor,
  attendeeIds,
  users,
  isSelected,
  onClick,
  onLongPress,
}: PerformanceCardProps) {
  const duration = timeToMinutes(performance.endTime) - timeToMinutes(performance.startTime)
  const height = (duration / 10) * PX_PER_10MIN
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressedRef = useRef(false)

  const handlePointerDown = () => {
    longPressedRef.current = false
    timerRef.current = setTimeout(() => {
      longPressedRef.current = true
      timerRef.current = null
      onLongPress()
    }, 500)
  }

  const handlePointerUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleClick = () => {
    if (!longPressedRef.current) onClick()
  }

  return (
    <div
      className={`performance-card p-1.5 relative flex flex-col items-center justify-center ${isSelected ? 'selected' : ''}`}
      style={{
        height: `${height}px`,
        backgroundColor: 'transparent',
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
    >
      <div className="text-[17px] font-bold text-black leading-tight break-words">
        {performance.name}
      </div>
      {performance.tag && (
        <span className="text-[15px] text-black">{performance.tag}</span>
      )}
      <div className="absolute bottom-1 left-1">
        <AttendeeAvatars attendeeIds={attendeeIds} users={users} />
      </div>
    </div>
  )
}
