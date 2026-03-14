interface TimeColumnProps {
  timeSlots: string[]
}

const PX_PER_10MIN = 40

export function TimeColumn({ timeSlots }: TimeColumnProps) {
  return (
    <div className="time-column">
      {timeSlots.map((time) => (
        <div
          key={time}
          className="text-[10px] text-white/40 text-right pr-1.5 border-b border-white/5"
          style={{ height: `${PX_PER_10MIN}px`, lineHeight: `${PX_PER_10MIN}px` }}
        >
          {time}
        </div>
      ))}
    </div>
  )
}
