import type { Stage } from '../types'

export const stages: Stage[] = [
  { id: 'nanba', name: '南霸天', color: '#8FC122' },
  { id: 'hailong', name: '海龍王', color: '#9080BF' },
  { id: 'nvshen', name: '女神龍', color: '#E5007F' },
  { id: 'haibo', name: '海波浪', color: '#00A1E9' },
  { id: 'kamomai', name: '卡魔麥', color: '#EB6C65' },
  { id: 'chutou', name: '出頭天', color: '#F7AC03' },
  { id: 'daxiong', name: '大雄丸', color: '#E70012' },
  { id: 'lanbaoshi', name: '藍寶石', color: '#023F98' },
  { id: 'qingchun', name: '青春夢', color: '#F19A65' },
  { id: 'xiaogang', name: '小港祭', color: '#B08960' },
]

export const stageColorMap: Record<string, string> = Object.fromEntries(
  stages.map((s) => [s.id, s.color])
)
