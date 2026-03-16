import type { Stage } from '../types'

export const stages: Stage[] = [
  { id: 'nanba', name: '南霸天', color: '#8FC120' },
  { id: 'hailong', name: '海龍王', color: '#8D83B8' },
  { id: 'nvshen', name: '女神龍', color: '#E6007F' },
  { id: 'haibo', name: '海波浪', color: '#04A1EE' },
  { id: 'kamomai', name: '卡魔麥', color: '#EA6C65' },
  { id: 'chutou', name: '出頭天', color: '#FAA807' },
  { id: 'daxiong', name: '大雄丸', color: '#EE0012' },
  { id: 'lanbaoshi', name: '藍寶石', color: '#003FA1' },
  { id: 'qingchun', name: '青春夢', color: '#F39967' },
  { id: 'xiaogang', name: '小港祭', color: '#B28860' },
]

export const stageColorMap: Record<string, string> = Object.fromEntries(
  stages.map((s) => [s.id, s.color])
)

// 樂團格子專用顏色（與舞台標題顏色獨立）
export const stageCardColorMap: Record<string, string> = {
  nanba: '#C8DC9F',
  hailong: '#BBB4D8',
  nvshen: '#EAB6CE',
  haibo: '#ABD7F3',
  kamomai: '#F8C5BF',
  chutou: '#FED046',
  daxiong: '#EE836E',
  lanbaoshi: '#65ABDD',
  qingchun: '#F8C3AB',
  xiaogang: '#C6B193',
}
