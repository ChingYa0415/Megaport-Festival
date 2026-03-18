import { useRef } from 'react'
import type { Performance, User } from '../../types'
import { AttendeeAvatars } from './AttendeeAvatars'

interface PerformanceCardProps {
  performance: Performance
  stageColor: string
  attendeeIds: string[]
  users: Map<string, User>
  isSelected: boolean
  isConflict: boolean
  textScale: number
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
  isConflict,
  textScale,
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
      className={`performance-card p-1.5 relative flex flex-col items-center justify-center border-2 ${isSelected ? 'selected' : ''} ${isConflict ? 'border-[#B91C1C] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]' : 'border-transparent'}`}
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
      {isConflict && (
        <span
          className="absolute top-0.5 right-0.5 rounded-md bg-[#B91C1C] text-white font-bold px-1"
          style={{ fontSize: `${Math.max(8, 9 * textScale)}px`, lineHeight: 1.1 }}
        >
          衝堂
        </span>
      )}
      <div
        className="font-bold text-black leading-tight break-words"
        style={{ fontSize: `${17 * textScale}px` }}
      >
        {performance.name}
      </div>
      {performance.tag && (
        <span className="text-black" style={{ fontSize: `${15 * textScale}px` }}>
          {performance.tag}
        </span>
      )}
      <div className="absolute bottom-1 left-1">
        <AttendeeAvatars attendeeIds={attendeeIds} users={users} />
      </div>
    </div>
  )
}
