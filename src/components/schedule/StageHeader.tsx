import type { Stage } from '../../types'

interface StageHeaderProps {
  stages: Stage[]
  day: 1 | 2
}

const DAY_DATES: Record<1 | 2, string> = { 1: '3/21', 2: '3/22' }

export function StageHeader({ stages, day }: StageHeaderProps) {
  return (
    <div className="stage-header-row flex bg-[#16213e]">
      <div className="stage-header-corner flex items-center justify-center text-[24px] font-bold text-white py-6">
        {DAY_DATES[day]}
      </div>
      {stages.map((stage) => (
        <div
          key={stage.id}
          className="flex items-center justify-center text-[24px] font-bold text-white py-6 border-b-2"
          style={{
            minWidth: 'var(--stage-col-width)',
            width: 'var(--stage-col-width)',
            borderColor: stage.color,
            backgroundColor: stage.color,
          }}
        >
          {stage.name}
        </div>
      ))}
    </div>
  )
}
