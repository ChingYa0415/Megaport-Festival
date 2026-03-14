import type { User } from '../../types'
import { DaySelector } from './DaySelector'

interface HeaderProps {
  user: User
  selectedDay: 1 | 2
  onDayChange: (day: 1 | 2) => void
}

export function Header({ user, selectedDay, onDayChange }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 py-2 bg-[#16213e] border-b border-white/10">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold text-white whitespace-nowrap">大港開唱</h1>
        <DaySelector selectedDay={selectedDay} onDayChange={onDayChange} />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-7 h-7 rounded-full object-cover border border-white/30"
        />
        <span className="text-xs text-white/80 max-w-[60px] truncate">{user.name}</span>
      </div>
    </header>
  )
}
