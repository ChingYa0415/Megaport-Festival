import type { Stage } from '../../types'

interface StageHeaderProps {
  stages: Stage[]
}

export function StageHeader({ stages }: StageHeaderProps) {
  return (
    <div className="stage-header-row flex bg-[#16213e]">
      <div className="stage-header-corner flex items-center justify-center text-[10px] text-white/30">
        時間
      </div>
      {stages.map((stage) => (
        <div
          key={stage.id}
          className="flex items-center justify-center text-xs font-bold text-white py-2 border-b-2"
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
