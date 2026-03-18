import type { User } from '../../types'
import { DaySelector } from './DaySelector'

interface HeaderProps {
  user: User
  selectedDay: 1 | 2
  isOnline: boolean
  onDayChange: (day: 1 | 2) => void
  onReset: () => Promise<void>
  onOpenRanking: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  canZoomIn: boolean
  canZoomOut: boolean
}

export function Header({
  user,
  selectedDay,
  isOnline,
  onDayChange,
  onReset,
  onOpenRanking,
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 py-2 bg-[#16213e] border-b border-white/10">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold text-white whitespace-nowrap">大港開唱</h1>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
            isOnline
              ? 'text-emerald-200 border-emerald-200/60'
              : 'text-amber-200 border-amber-200/60'
          }`}
        >
          {isOnline ? '線上' : '離線'}
        </span>
        <DaySelector selectedDay={selectedDay} onDayChange={onDayChange} />
      </div>
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-2 shrink-0">
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
        <button
          onClick={onOpenRanking}
          className="text-[11px] text-white/80 hover:text-white px-2 py-1 rounded-full border border-white/30 hover:border-white/60 transition-colors whitespace-nowrap"
        >
          熱力排行榜
        </button>
        <div className="flex items-center gap-2">
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
      </div>
    </header>
  )
}
