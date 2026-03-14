import type { Stage } from '../types'

export const stages: Stage[] = [
  { id: 'nanba', name: '南霸天', color: '#E53E3E' },
  { id: 'hailong', name: '海龍王', color: '#ED8936' },
  { id: 'nvshen', name: '女神龍', color: '#ECC94B' },
  { id: 'haibo', name: '海波浪', color: '#48BB78' },
  { id: 'kamomai', name: '卡魔麥', color: '#38B2AC' },
  { id: 'chutou', name: '出頭天', color: '#4299E1' },
  { id: 'daxiong', name: '大雄丸', color: '#805AD5' },
  { id: 'lanbaoshi', name: '藍寶石', color: '#2B6CB0' },
  { id: 'qingchun', name: '青春夢', color: '#ED64A6' },
  { id: 'xiaogang', name: '小港祭', color: '#9C4221' },
]

export const stageColorMap: Record<string, string> = Object.fromEntries(
  stages.map((s) => [s.id, s.color])
)
