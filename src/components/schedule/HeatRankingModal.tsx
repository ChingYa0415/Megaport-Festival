import { stages } from '../../data/stages'
import type { Performance } from '../../types'
import top1Badge from '../../assets/ranking/top1.svg'
import top2Badge from '../../assets/ranking/top2.svg'
import top3Badge from '../../assets/ranking/top3.svg'

interface HeatRankingItem {
  performance: Performance
  attendeeCount: number
}

interface HeatRankingModalProps {
  day: 1 | 2
  rankings: HeatRankingItem[]
  onClose: () => void
}

const DAY_LABELS: Record<1 | 2, string> = {
  1: '3/21',
  2: '3/22',
}

const stageNameMap = Object.fromEntries(stages.map((stage) => [stage.id, stage.name])) as Record<string, string>

function rankBadge(index: number): string {
  if (index === 0) return top1Badge
  if (index === 1) return top2Badge
  if (index === 2) return top3Badge
  return `${index + 1}.`
}

export function HeatRankingModal({ day, rankings, onClose }: HeatRankingModalProps) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-black/10 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-black">熱力排行榜</h2>
            <p className="text-xs text-black/50">{DAY_LABELS[day]} 當日所有樂團</p>
          </div>
          <button
            className="text-sm px-2 py-1 rounded-lg bg-black/5 text-black/70 hover:bg-black/10"
            onClick={onClose}
          >
            關閉
          </button>
        </div>

        <div className="max-h-[70dvh] overflow-y-auto">
          {rankings.map((item, index) => (
            <div
              key={item.performance.id}
              className="flex items-center gap-3 px-4 py-3 border-b border-black/5 last:border-b-0"
            >
              {index < 3 ? (
                <img
                  src={rankBadge(index)}
                  alt={`第 ${index + 1} 名`}
                  className="w-10 h-10 shrink-0 object-contain"
                />
              ) : (
                <div className="w-9 text-center text-sm font-bold text-black/80 shrink-0">
                  {rankBadge(index)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-black truncate">{item.performance.name}</p>
                <p className="text-xs text-black/55">
                  {item.performance.startTime} - {item.performance.endTime}｜{stageNameMap[item.performance.stage] ?? item.performance.stage}
                </p>
              </div>
              <div className="text-sm font-bold text-[#e53e3e] whitespace-nowrap">
                {item.attendeeCount} 人
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
