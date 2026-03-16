import type { User } from '../../types'
import { DaySelector } from './DaySelector'

interface HeaderProps {
  user: User
  selectedDay: 1 | 2
  onDayChange: (day: 1 | 2) => void
  onReset: () => Promise<void>
  onZoomIn: () => void
  onZoomOut: () => void
  canZoomIn: boolean
  canZoomOut: boolean
}

export function Header({ user, selectedDay, onDayChange, onReset, onZoomIn, onZoomOut, canZoomIn, canZoomOut }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 py-2 bg-[#16213e] border-b border-white/10">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold text-white whitespace-nowrap">大港開唱</h1>
        <DaySelector selectedDay={selectedDay} onDayChange={onDayChange} />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={onZoomOut}
            disabled={!canZoomOut}
            className="text-sm text-white/60 hover:text-white disabled:opacity-20 w-6 h-6 flex items-center justify-center"
          >
            −
          </button>
          <button
            onClick={onZoomIn}
            disabled={!canZoomIn}
            className="text-sm text-white/60 hover:text-white disabled:opacity-20 w-6 h-6 flex items-center justify-center"
          >
            +
          </button>
        </div>
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-7 h-7 rounded-full object-cover border border-white/30"
        />
        <span className="text-xs text-white/80 max-w-[60px] truncate">{user.name}</span>
        <button
          onClick={onReset}
          className="text-xs text-white/40 hover:text-white/80 px-1.5 py-0.5 rounded border border-white/20 hover:border-white/50 transition-colors"
        >
          重設
        </button>
      </div>
    </header>
  )
}
