import type { Performance } from '../types'

// Day 1: 03/21 (六) — 從官方時間表圖片整理
const day1: Performance[] = [
  // ── 南霸天 ──
  { id: 'd1-nanba-1230', name: '椅子樂團', stage: 'nanba', day: 1, startTime: '12:30', endTime: '13:00' },
  { id: 'd1-nanba-1320', name: 'NEE', stage: 'nanba', day: 1, startTime: '13:20', endTime: '13:50', tag: '[JP]' },
  { id: 'd1-nanba-1410', name: 'The Birthday', stage: 'nanba', day: 1, startTime: '14:10', endTime: '14:50', tag: '[JP]' },
  { id: 'd1-nanba-1510', name: 'joji', stage: 'nanba', day: 1, startTime: '15:10', endTime: '15:50' },
  { id: 'd1-nanba-1620', name: 'Aoo', stage: 'nanba', day: 1, startTime: '16:20', endTime: '16:50' },
  { id: 'd1-nanba-1720', name: 'AWALIZE', stage: 'nanba', day: 1, startTime: '17:20', endTime: '18:00' },
  { id: 'd1-nanba-1820', name: '滅火器', stage: 'nanba', day: 1, startTime: '18:20', endTime: '19:00' },
  { id: 'd1-nanba-1920', name: '蕭亞合作社', stage: 'nanba', day: 1, startTime: '19:20', endTime: '19:50' },
  { id: 'd1-nanba-2010', name: 'milet', stage: 'nanba', day: 1, startTime: '20:10', endTime: '20:50', tag: '[JP]' },
  { id: 'd1-nanba-2110', name: 'Käärijä', stage: 'nanba', day: 1, startTime: '21:10', endTime: '21:50', tag: '[FI]' },

  // ── 海龍王 ──
  { id: 'd1-hailong-1300', name: '海豚刑警', stage: 'hailong', day: 1, startTime: '13:00', endTime: '13:20' },
  { id: 'd1-hailong-1350', name: '漂流出口', stage: 'hailong', day: 1, startTime: '13:50', endTime: '14:10' },
  { id: 'd1-hailong-1500', name: 'DSPS', stage: 'hailong', day: 1, startTime: '15:00', endTime: '15:30' },
  { id: 'd1-hailong-1600', name: '黑眼人與機器鄉村樂', stage: 'hailong', day: 1, startTime: '16:00', endTime: '16:30' },
  { id: 'd1-hailong-1700', name: 'the band apart', stage: 'hailong', day: 1, startTime: '17:00', endTime: '17:30', tag: '[JP]' },
  { id: 'd1-hailong-1800', name: 'XTRIX', stage: 'hailong', day: 1, startTime: '18:00', endTime: '18:30' },
  { id: 'd1-hailong-1900', name: 'same sam but different', stage: 'hailong', day: 1, startTime: '19:00', endTime: '19:30' },
  { id: 'd1-hailong-1950', name: '宋芸樺', stage: 'hailong', day: 1, startTime: '19:50', endTime: '20:20' },
  { id: 'd1-hailong-2040', name: '雜耍紅孩', stage: 'hailong', day: 1, startTime: '20:40', endTime: '21:10' },
  { id: 'd1-hailong-2120', name: '宇宙順序 OTAKUNI', stage: 'hailong', day: 1, startTime: '21:20', endTime: '21:50' },

  // ── 女神龍 ──
  { id: 'd1-nvshen-1230', name: '倒車入庫', stage: 'nvshen', day: 1, startTime: '12:30', endTime: '13:00' },
  { id: 'd1-nvshen-1430', name: 'Yappy', stage: 'nvshen', day: 1, startTime: '14:30', endTime: '15:00' },
  { id: 'd1-nvshen-1530', name: 'Yokkorio', stage: 'nvshen', day: 1, startTime: '15:30', endTime: '16:00' },
  { id: 'd1-nvshen-1730', name: 'Mong Tong', stage: 'nvshen', day: 1, startTime: '17:30', endTime: '18:00' },
  { id: 'd1-nvshen-1900', name: 'PISCO', stage: 'nvshen', day: 1, startTime: '19:00', endTime: '19:30' },
  { id: 'd1-nvshen-1930', name: '專業科 Major in Body Beat', stage: 'nvshen', day: 1, startTime: '19:30', endTime: '20:00' },
  { id: 'd1-nvshen-2030', name: 'Manic Sheep', stage: 'nvshen', day: 1, startTime: '20:30', endTime: '21:00' },

  // ── 海波浪 ──
  { id: 'd1-haibo-1230', name: 'COLD DEW', stage: 'haibo', day: 1, startTime: '12:30', endTime: '13:00' },
  { id: 'd1-haibo-1420', name: 'Mondo*shake', stage: 'haibo', day: 1, startTime: '14:20', endTime: '14:50' },
  { id: 'd1-haibo-1510', name: 'LAWA', stage: 'haibo', day: 1, startTime: '15:10', endTime: '15:40' },
  { id: 'd1-haibo-1540', name: 'Angie安吉', stage: 'haibo', day: 1, startTime: '15:40', endTime: '16:10' },
  { id: 'd1-haibo-1640', name: '黃柔', stage: 'haibo', day: 1, startTime: '16:40', endTime: '17:10' },
  { id: 'd1-haibo-1710', name: '馬克', stage: 'haibo', day: 1, startTime: '17:10', endTime: '17:40' },

  // ── 卡魔麥 ──
  { id: 'd1-kamomai-1300', name: '何莉星 陳柏師', stage: 'kamomai', day: 1, startTime: '13:00', endTime: '13:30' },
  { id: 'd1-kamomai-1400', name: '敏漣曲', stage: 'kamomai', day: 1, startTime: '14:00', endTime: '14:30' },
  { id: 'd1-kamomai-1530', name: '光線大鳥 與拉拉', stage: 'kamomai', day: 1, startTime: '15:30', endTime: '16:00' },
  { id: 'd1-kamomai-1630', name: '美菜', stage: 'kamomai', day: 1, startTime: '16:30', endTime: '17:00' },
  { id: 'd1-kamomai-1730', name: '顧問俱樂部 許元真', stage: 'kamomai', day: 1, startTime: '17:30', endTime: '18:00' },
  { id: 'd1-kamomai-1830', name: '鄭以琦', stage: 'kamomai', day: 1, startTime: '18:30', endTime: '19:00' },

  // ── 出頭天 ──
  { id: 'd1-chutou-1230', name: '共感棲線', stage: 'chutou', day: 1, startTime: '12:30', endTime: '13:00' },
  { id: 'd1-chutou-1400', name: '島嶼', stage: 'chutou', day: 1, startTime: '14:00', endTime: '14:30' },
  { id: 'd1-chutou-1500', name: '麻鴉', stage: 'chutou', day: 1, startTime: '15:00', endTime: '15:30' },
  { id: 'd1-chutou-1600', name: 'MOTIF HIVE', stage: 'chutou', day: 1, startTime: '16:00', endTime: '16:30' },
  { id: 'd1-chutou-1700', name: 'BBFAM!', stage: 'chutou', day: 1, startTime: '17:00', endTime: '17:30' },
  { id: 'd1-chutou-1800', name: '鸞陽城鄉 蔡宜蓉', stage: 'chutou', day: 1, startTime: '18:00', endTime: '18:30' },
  { id: 'd1-chutou-1900', name: '大港心在右', stage: 'chutou', day: 1, startTime: '19:00', endTime: '19:30' },
  { id: 'd1-chutou-1930', name: '超本人', stage: 'chutou', day: 1, startTime: '19:30', endTime: '20:00' },

  // ── 大雄丸 ──
  { id: 'd1-daxiong-1500', name: '昭瑛', stage: 'daxiong', day: 1, startTime: '15:00', endTime: '15:30' },
  { id: 'd1-daxiong-1600', name: '裝咖人', stage: 'daxiong', day: 1, startTime: '16:00', endTime: '16:30' },

  // ── 藍寶石 ──
  { id: 'd1-lanbaoshi-1500', name: 'DJ NLOERS', stage: 'lanbaoshi', day: 1, startTime: '15:00', endTime: '16:00' },
  { id: 'd1-lanbaoshi-1600', name: 'DJ GANOSA', stage: 'lanbaoshi', day: 1, startTime: '16:00', endTime: '17:00' },
  { id: 'd1-lanbaoshi-1800', name: 'DJ GTER', stage: 'lanbaoshi', day: 1, startTime: '18:00', endTime: '19:00' },
  { id: 'd1-lanbaoshi-1900', name: 'DJ YU', stage: 'lanbaoshi', day: 1, startTime: '19:00', endTime: '20:00' },
  { id: 'd1-lanbaoshi-2000', name: 'DJ DINDIN', stage: 'lanbaoshi', day: 1, startTime: '20:00', endTime: '21:00' },

  // ── 青春夢 ──
  { id: 'd1-qingchun-1900', name: '大港心在右 紀錄片', stage: 'qingchun', day: 1, startTime: '19:00', endTime: '19:30' },

  // ── 小港祭 ──
  { id: 'd1-xiaogang-2100', name: '李權哲', stage: 'xiaogang', day: 1, startTime: '21:00', endTime: '21:50' },
]

// Day 2: 03/22 (日) — 從官方時間表圖片整理
const day2: Performance[] = [
  // ── 南霸天 ──
  { id: 'd2-nanba-1230', name: '結束バンド', stage: 'nanba', day: 2, startTime: '12:30', endTime: '13:10', tag: '[JP]' },
  { id: 'd2-nanba-1330', name: 'EmptyORio', stage: 'nanba', day: 2, startTime: '13:30', endTime: '14:00' },
  { id: 'd2-nanba-1420', name: 'TOOBOE', stage: 'nanba', day: 2, startTime: '14:20', endTime: '14:50', tag: '[JP]' },
  { id: 'd2-nanba-1510', name: 'ゲシュタルト乙女', stage: 'nanba', day: 2, startTime: '15:10', endTime: '15:50', tag: '[JP]' },
  { id: 'd2-nanba-1610', name: 'Gummy B', stage: 'nanba', day: 2, startTime: '16:10', endTime: '16:40' },
  { id: 'd2-nanba-1700', name: '暴士道 修復化 韓文', stage: 'nanba', day: 2, startTime: '17:00', endTime: '17:40' },
  { id: 'd2-nanba-1800', name: '當代電影大師', stage: 'nanba', day: 2, startTime: '18:00', endTime: '18:40' },
  { id: 'd2-nanba-1900', name: 'NOVELISTS', stage: 'nanba', day: 2, startTime: '19:00', endTime: '19:30', tag: '[FR]' },
  { id: 'd2-nanba-1950', name: '厭世官', stage: 'nanba', day: 2, startTime: '19:50', endTime: '20:20' },
  { id: 'd2-nanba-2040', name: 'AYUN D', stage: 'nanba', day: 2, startTime: '20:40', endTime: '21:10' },
  { id: 'd2-nanba-2120', name: 'Hirono\'s Sonicwonder', stage: 'nanba', day: 2, startTime: '21:20', endTime: '22:00', tag: '[JP]' },
  { id: 'd2-nanba-2210', name: 'AAA THE END', stage: 'nanba', day: 2, startTime: '22:10', endTime: '22:50', tag: '[JP]' },

  // ── 海龍王 ──
  { id: 'd2-hailong-1230', name: 'HUSH', stage: 'hailong', day: 2, startTime: '12:30', endTime: '13:10' },
  { id: 'd2-hailong-1330', name: '美宇', stage: 'hailong', day: 2, startTime: '13:30', endTime: '13:50' },
  { id: 'd2-hailong-1420', name: 'KINAKO', stage: 'hailong', day: 2, startTime: '14:20', endTime: '14:50' },
  { id: 'd2-hailong-1510', name: '東京中央線', stage: 'hailong', day: 2, startTime: '15:10', endTime: '15:40' },
  { id: 'd2-hailong-1610', name: '陳建瑋', stage: 'hailong', day: 2, startTime: '16:10', endTime: '16:40' },
  { id: 'd2-hailong-1700', name: '多米多鑽', stage: 'hailong', day: 2, startTime: '17:00', endTime: '17:30' },
  { id: 'd2-hailong-1740', name: '司凡', stage: 'hailong', day: 2, startTime: '17:40', endTime: '18:10' },
  { id: 'd2-hailong-1830', name: 'FunkyMo', stage: 'hailong', day: 2, startTime: '18:30', endTime: '19:00' },
  { id: 'd2-hailong-1920', name: '小尾巴', stage: 'hailong', day: 2, startTime: '19:20', endTime: '19:50' },
  { id: 'd2-hailong-2000', name: '鄭宜農', stage: 'hailong', day: 2, startTime: '20:00', endTime: '20:40' },
  { id: 'd2-hailong-2050', name: '五大力吉嶺', stage: 'hailong', day: 2, startTime: '20:50', endTime: '21:20' },
  { id: 'd2-hailong-2130', name: 'BAND-MAID', stage: 'hailong', day: 2, startTime: '21:30', endTime: '22:10', tag: '[JP]' },

  // ── 女神龍 ──
  { id: 'd2-nvshen-1310', name: 'TSS', stage: 'nvshen', day: 2, startTime: '13:10', endTime: '13:40' },
  { id: 'd2-nvshen-1400', name: '富堡', stage: 'nvshen', day: 2, startTime: '14:00', endTime: '14:30' },
  { id: 'd2-nvshen-1450', name: '佐月三壺', stage: 'nvshen', day: 2, startTime: '14:50', endTime: '15:20' },
  { id: 'd2-nvshen-1600', name: '馬瓜', stage: 'nvshen', day: 2, startTime: '16:00', endTime: '16:30' },
  { id: 'd2-nvshen-1700', name: '五月日', stage: 'nvshen', day: 2, startTime: '17:00', endTime: '17:30', tag: '[KR]' },
  { id: 'd2-nvshen-1800', name: 'Infernal Chaos', stage: 'nvshen', day: 2, startTime: '18:00', endTime: '18:30' },
  { id: 'd2-nvshen-1900', name: '蝴蝶紅筋', stage: 'nvshen', day: 2, startTime: '19:00', endTime: '19:30' },
  { id: 'd2-nvshen-2000', name: '黃妃', stage: 'nvshen', day: 2, startTime: '20:00', endTime: '20:30' },
  { id: 'd2-nvshen-2050', name: '洪佩瑜', stage: 'nvshen', day: 2, startTime: '20:50', endTime: '21:20' },

  // ── 海波浪 ──
  { id: 'd2-haibo-1240', name: '何諾翔蘇鑫', stage: 'haibo', day: 2, startTime: '12:40', endTime: '13:10' },
  { id: 'd2-haibo-1310', name: '唱否 逆社 李鵬宇', stage: 'haibo', day: 2, startTime: '13:10', endTime: '13:40' },
  { id: 'd2-haibo-1410', name: 'LEIGHT NINE', stage: 'haibo', day: 2, startTime: '14:10', endTime: '14:40' },
  { id: 'd2-haibo-1500', name: '澤倉雷', stage: 'haibo', day: 2, startTime: '15:00', endTime: '15:30' },
  { id: 'd2-haibo-1540', name: '丸良咩 利', stage: 'haibo', day: 2, startTime: '15:40', endTime: '16:10' },
  { id: 'd2-haibo-1610', name: '阿彌洋行', stage: 'haibo', day: 2, startTime: '16:10', endTime: '16:40' },
  { id: 'd2-haibo-1710', name: '飄馬', stage: 'haibo', day: 2, startTime: '17:10', endTime: '17:40' },
  { id: 'd2-haibo-1740', name: '立夏', stage: 'haibo', day: 2, startTime: '17:40', endTime: '18:10' },
  { id: 'd2-haibo-1830', name: '鄭嗎歡', stage: 'haibo', day: 2, startTime: '18:30', endTime: '19:00' },
  { id: 'd2-haibo-1930', name: '小亮 阿弘', stage: 'haibo', day: 2, startTime: '19:30', endTime: '20:00' },

  // ── 卡魔麥 ──
  { id: 'd2-kamomai-1330', name: '打狗亂歌團', stage: 'kamomai', day: 2, startTime: '13:30', endTime: '14:00' },
  { id: 'd2-kamomai-1500', name: '沃容堂', stage: 'kamomai', day: 2, startTime: '15:00', endTime: '15:30' },
  { id: 'd2-kamomai-1600', name: '沃射紳士', stage: 'kamomai', day: 2, startTime: '16:00', endTime: '16:30' },
  { id: 'd2-kamomai-1700', name: '嘴口歷史區', stage: 'kamomai', day: 2, startTime: '17:00', endTime: '17:30' },

  // ── 出頭天 ──
  { id: 'd2-chutou-1510', name: 'DCVJ', stage: 'chutou', day: 2, startTime: '15:10', endTime: '15:50' },
  { id: 'd2-chutou-1610', name: 'Lazy Habits', stage: 'chutou', day: 2, startTime: '16:10', endTime: '16:50' },
  { id: 'd2-chutou-1710', name: 'Flowstrong', stage: 'chutou', day: 2, startTime: '17:10', endTime: '17:50' },
  { id: 'd2-chutou-1810', name: 'Dac', stage: 'chutou', day: 2, startTime: '18:10', endTime: '18:40' },
  { id: 'd2-chutou-1900', name: 'BRADO', stage: 'chutou', day: 2, startTime: '19:00', endTime: '19:30' },

  // ── 大雄丸 ──
  { id: 'd2-daxiong-1830', name: 'debloop', stage: 'daxiong', day: 2, startTime: '18:30', endTime: '19:00' },
  { id: 'd2-daxiong-1900', name: 'Pixato', stage: 'daxiong', day: 2, startTime: '19:00', endTime: '19:30' },

  // ── 藍寶石 ──
  { id: 'd2-lanbaoshi-1400', name: 'DJ Oumaishifu', stage: 'lanbaoshi', day: 2, startTime: '14:00', endTime: '15:00' },
  { id: 'd2-lanbaoshi-1900', name: "That's My Sista", stage: 'lanbaoshi', day: 2, startTime: '19:00', endTime: '20:00' },

  // ── 青春夢 ──
  { id: 'd2-qingchun-1930', name: '貓場小青', stage: 'qingchun', day: 2, startTime: '19:30', endTime: '20:00' },

  // ── 小港祭 ──
  { id: 'd2-xiaogang-2000', name: 'DJ 蝦瓜 MK.SKIN', stage: 'xiaogang', day: 2, startTime: '20:00', endTime: '21:00' },
  { id: 'd2-xiaogang-2130', name: '淡利凡人', stage: 'xiaogang', day: 2, startTime: '21:30', endTime: '22:00' },
  { id: 'd2-xiaogang-2200', name: '鑲鉗 C.Molly LIHAO', stage: 'xiaogang', day: 2, startTime: '22:00', endTime: '22:40' },
]

export const schedule: Performance[] = [...day1, ...day2]

export const getPerformancesByDay = (day: 1 | 2): Performance[] =>
  schedule.filter((p) => p.day === day)

export const getPerformancesByDayAndStage = (day: 1 | 2, stageId: string): Performance[] =>
  schedule.filter((p) => p.day === day && p.stage === stageId)
