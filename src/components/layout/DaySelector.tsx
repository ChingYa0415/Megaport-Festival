interface DaySelectorProps {
  selectedDay: 1 | 2
  onDayChange: (day: 1 | 2) => void
}

export function DaySelector({ selectedDay, onDayChange }: DaySelectorProps) {
  return (
    <div className="flex gap-1">
      <button
        className={`day-tab ${selectedDay === 1 ? 'active' : ''}`}
        onClick={() => onDayChange(1)}
      >
        03/21
      </button>
      <button
        className={`day-tab ${selectedDay === 2 ? 'active' : ''}`}
        onClick={() => onDayChange(2)}
      >
        03/22
      </button>
    </div>
  )
}
