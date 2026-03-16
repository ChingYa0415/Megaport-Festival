import type { Performance } from '../types'

// Day 1: 03/21 (六)
const day1: Performance[] = [
  // ── 南霸天 ──
  { id: 'd1-nanba-1240', name: '椅子樂團', stage: 'nanba', day: 1, startTime: '12:30', endTime: '13:10' },
  { id: 'd1-nanba-1410', name: 'The Birthday', stage: 'nanba', day: 1, startTime: '14:10', endTime: '14:40', tag: '[JP]' },
  { id: 'd1-nanba-1550', name: 'Aooo', stage: 'nanba', day: 1, startTime: '15:50', endTime: '16:20', tag: '[JP]' },
  { id: 'd1-nanba-1740', name: '滅火器', stage: 'nanba', day: 1, startTime: '17:40', endTime: '18:30' },
  { id: 'd1-nanba-1910', name: 'milet', stage: 'nanba', day: 1, startTime: '19:10', endTime: '20:00', tag: '[JP]' },
  { id: 'd1-nanba-2110', name: '血肉果汁機 ft. 陳亞蘭', stage: 'nanba', day: 1, startTime: '21:10', endTime: '21:50' },

  // ── 海龍王 ──
  { id: 'd1-hailong-1320', name: 'NEE', stage: 'hailong', day: 1, startTime: '13:20', endTime: '13:50', tag: '[JP]' },
  { id: 'd1-hailong-1450', name: 'jo0ji', stage: 'hailong', day: 1, startTime: '14:50', endTime: '15:20', tag: '[JP]' },
  { id: 'd1-hailong-1600', name: '黑狼人肉戰車那卡西', stage: 'hailong', day: 1, startTime: '16:00', endTime: '16:30' },
  { id: 'd1-hailong-1730', name: 'AVRALIZE', stage: 'hailong', day: 1, startTime: '17:30', endTime: '18:00', tag: '[DE]' },
  { id: 'd1-hailong-1850', name: '無妄合作社', stage: 'hailong', day: 1, startTime: '18:50', endTime: '19:20' },
  { id: 'd1-hailong-2020', name: 'Käärijä', stage: 'hailong', day: 1, startTime: '20:20', endTime: '21:00', tag: '[FI]' },

  // ── 女神龍 ──
  { id: 'd1-nvshen-1240', name: '海豚刑警', stage: 'nvshen', day: 1, startTime: '12:30', endTime: '13:10' },
  { id: 'd1-nvshen-1400', name: '漂流出口', stage: 'nvshen', day: 1, startTime: '14:00', endTime: '14:30' },
  { id: 'd1-nvshen-1510', name: '南瓜妮歌迷俱樂部', stage: 'nvshen', day: 1, startTime: '15:10', endTime: '15:40' },
  { id: 'd1-nvshen-1640', name: 'the band apart', stage: 'nvshen', day: 1, startTime: '16:40', endTime: '17:10', tag: '[JP]' },
  { id: 'd1-nvshen-1810', name: 'same Sam but different', stage: 'nvshen', day: 1, startTime: '18:10', endTime: '18:40' },
  { id: 'd1-nvshen-1930', name: '李竺芯 ft. 妮妮雅', stage: 'nvshen', day: 1, startTime: '19:30', endTime: '20:00' },
  { id: 'd1-nvshen-2110', name: '謝金燕', stage: 'nvshen', day: 1, startTime: '21:10', endTime: '21:50' },

  // ── 海波浪 ──
  { id: 'd1-haibo-1320', name: '倒車入庫', stage: 'haibo', day: 1, startTime: '13:20', endTime: '13:40' },
  { id: 'd1-haibo-1430', name: 'DSPS', stage: 'haibo', day: 1, startTime: '14:30', endTime: '14:50' },
  { id: 'd1-haibo-1550', name: 'Yokkorio', stage: 'haibo', day: 1, startTime: '15:50', endTime: '16:10' },
  { id: 'd1-haibo-1710', name: 'Mong Tong x XTRUX', stage: 'haibo', day: 1, startTime: '17:10', endTime: '17:40' },
  { id: 'd1-haibo-1840', name: '體熊專科', stage: 'haibo', day: 1, startTime: '18:40', endTime: '19:00' },
  { id: 'd1-haibo-2040', name: '宅邦戰隊', stage: 'haibo', day: 1, startTime: '20:40', endTime: '21:00' },

  // ── 卡魔麥 ──
  { id: 'd1-kamomai-1320', name: 'COLD DEW', stage: 'kamomai', day: 1, startTime: '13:20', endTime: '13:40' },
  { id: 'd1-kamomai-1500', name: 'Yappy', stage: 'kamomai', day: 1, startTime: '15:00', endTime: '15:20' },
  { id: 'd1-kamomai-1640', name: '馬克', stage: 'kamomai', day: 1, startTime: '16:40', endTime: '17:00' },
  { id: 'd1-kamomai-1810', name: 'P!SCO', stage: 'kamomai', day: 1, startTime: '18:10', endTime: '18:40' },
  { id: 'd1-kamomai-1950', name: 'Manic Sheep', stage: 'kamomai', day: 1, startTime: '19:50', endTime: '20:20' },

  // ── 出頭天 ──
  { id: 'd1-chutou-1350', name: "MoonD'shake", stage: 'chutou', day: 1, startTime: '13:50', endTime: '14:10' },
  { id: 'd1-chutou-1500', name: 'LAWA ft. Angie安吉', stage: 'chutou', day: 1, startTime: '15:00', endTime: '15:20' },
  { id: 'd1-chutou-1620', name: '憂憂 ft. 奕碩', stage: 'chutou', day: 1, startTime: '16:20', endTime: '16:40' },
  { id: 'd1-chutou-1750', name: '陳以恆', stage: 'chutou', day: 1, startTime: '17:50', endTime: '18:10' },

  // ── 大雄丸 ──
  { id: 'd1-daxiong-1310', name: '何勁旻 / 陳冠哼', stage: 'daxiong', day: 1, startTime: '13:10', endTime: '13:40' },
  { id: 'd1-daxiong-1500', name: '憑光頭入場換啤酒', stage: 'daxiong', day: 1, startTime: '15:00', endTime: '15:40' },
  { id: 'd1-daxiong-1710', name: '曾國宏 / 許正泰', stage: 'daxiong', day: 1, startTime: '17:10', endTime: '17:40' },
  { id: 'd1-daxiong-1930', name: '大象體操(紀錄片)', stage: 'daxiong', day: 1, startTime: '19:30', endTime: '20:00' },

  // ── 藍寶石 ──
  { id: 'd1-lanbaoshi-1410', name: '黃雨晴', stage: 'lanbaoshi', day: 1, startTime: '14:10', endTime: '14:30' },
  { id: 'd1-lanbaoshi-1520', name: '昭霖 & 甜吻吻', stage: 'lanbaoshi', day: 1, startTime: '15:20', endTime: '15:40' },
  { id: 'd1-lanbaoshi-1650', name: 'BBFFMF', stage: 'lanbaoshi', day: 1, startTime: '16:50', endTime: '17:10' },
  { id: 'd1-lanbaoshi-1810', name: '美麗本人 ft. 異鄉人', stage: 'lanbaoshi', day: 1, startTime: '18:10', endTime: '18:30' },

  // ── 青春夢 ──
  { id: 'd1-qingchun-1330', name: '共振效應', stage: 'qingchun', day: 1, startTime: '13:30', endTime: '13:50' },
  { id: 'd1-qingchun-1440', name: '帕崎拉', stage: 'qingchun', day: 1, startTime: '14:40', endTime: '15:00' },
  { id: 'd1-qingchun-1610', name: 'MOTIF HIVE', stage: 'qingchun', day: 1, startTime: '16:10', endTime: '16:30' },
  { id: 'd1-qingchun-1730', name: '震樂堂', stage: 'qingchun', day: 1, startTime: '17:30', endTime: '17:50' },
  { id: 'd1-qingchun-1850', name: '庵心自在所', stage: 'qingchun', day: 1, startTime: '18:50', endTime: '19:10' },

  // ── 小港祭 ──
  { id: 'd1-xiaogang-1530', name: 'DJ N.OERS', stage: 'xiaogang', day: 1, startTime: '15:30', endTime: '16:20' },
  { id: 'd1-xiaogang-1640', name: 'DJ GAN3DA', stage: 'xiaogang', day: 1, startTime: '16:40', endTime: '17:30' },
  { id: 'd1-xiaogang-1750', name: 'DJ GTER', stage: 'xiaogang', day: 1, startTime: '17:50', endTime: '18:40' },
  { id: 'd1-xiaogang-1900', name: 'DJ YU', stage: 'xiaogang', day: 1, startTime: '19:00', endTime: '19:50' },
  { id: 'd1-xiaogang-2010', name: 'DJ DINDIN', stage: 'xiaogang', day: 1, startTime: '20:10', endTime: '21:00' },
]

// Day 2: 03/22 (日)
const day2: Performance[] = [
  // ── 南霸天 ──
  { id: 'd2-nanba-1240', name: '結束バンド', stage: 'nanba', day: 2, startTime: '12:30', endTime: '13:10', tag: '[JP]' },
  { id: 'd2-nanba-1410', name: '芒果醬', stage: 'nanba', day: 2, startTime: '14:10', endTime: '14:40' },
  { id: 'd2-nanba-1550', name: '康士坦的變化球', stage: 'nanba', day: 2, startTime: '15:50', endTime: '16:20' },
  { id: 'd2-nanba-1740', name: '怕胖團 ft. 陽帆', stage: 'nanba', day: 2, startTime: '17:40', endTime: '18:30' },
  { id: 'd2-nanba-1910', name: '拍謝少年', stage: 'nanba', day: 2, startTime: '19:10', endTime: '20:00' },
  { id: 'd2-nanba-2110', name: '落日飛車', stage: 'nanba', day: 2, startTime: '21:10', endTime: '21:50' },

  // ── 海龍王 ──
  { id: 'd2-hailong-1320', name: 'EmptyORio', stage: 'hailong', day: 2, startTime: '13:20', endTime: '13:50' },
  { id: 'd2-hailong-1440', name: 'ゲシュタルト乙女', stage: 'hailong', day: 2, startTime: '14:40', endTime: '15:20' },
  { id: 'd2-hailong-1600', name: '隨性 ft. 婷文', stage: 'hailong', day: 2, startTime: '16:00', endTime: '16:30' },
  { id: 'd2-hailong-1730', name: 'NOVELISTS', stage: 'hailong', day: 2, startTime: '17:30', endTime: '18:00', tag: '[FR]' },
  { id: 'd2-hailong-1850', name: '巨大的轟鳴', stage: 'hailong', day: 2, startTime: '18:50', endTime: '19:20' },
  { id: 'd2-hailong-2020', name: "Hiromi's Sonicwonder", stage: 'hailong', day: 2, startTime: '20:20', endTime: '21:00' },

  // ── 女神龍 ──
  { id: 'd2-nvshen-1250', name: 'HUSH', stage: 'nvshen', day: 2, startTime: '12:50', endTime: '13:20' },
  { id: 'd2-nvshen-1410', name: 'TOOBOE', stage: 'nvshen', day: 2, startTime: '14:10', endTime: '14:40', tag: '[JP]' },
  { id: 'd2-nvshen-1520', name: 'Gummy B x 陳嫺靜', stage: 'nvshen', day: 2, startTime: '15:20', endTime: '15:50' },
  { id: 'd2-nvshen-1650', name: '當代電影大師', stage: 'nvshen', day: 2, startTime: '16:50', endTime: '17:20' },
  { id: 'd2-nvshen-1810', name: '鄭宜農', stage: 'nvshen', day: 2, startTime: '18:10', endTime: '18:40' },
  { id: 'd2-nvshen-1930', name: 'BAND-MAID', stage: 'nvshen', day: 2, startTime: '19:30', endTime: '20:00', tag: '[JP]' },
  { id: 'd2-nvshen-2110', name: 'AINA THE END', stage: 'nvshen', day: 2, startTime: '21:10', endTime: '21:50', tag: '[JP]' },

  // ── 海波浪 ──
  { id: 'd2-haibo-1320', name: '黃宇寒', stage: 'haibo', day: 2, startTime: '13:20', endTime: '13:40' },
  { id: 'd2-haibo-1430', name: 'KINAKO & 東京中央線', stage: 'haibo', day: 2, startTime: '14:30', endTime: '15:00' },
  { id: 'd2-haibo-1600', name: '多米多羅 ft. 可凡', stage: 'haibo', day: 2, startTime: '16:00', endTime: '16:20' },
  { id: 'd2-haibo-1710', name: 'FunkyMo ft. 小尾巴', stage: 'haibo', day: 2, startTime: '17:10', endTime: '17:30' },
  { id: 'd2-haibo-1840', name: '粉紅噪音', stage: 'haibo', day: 2, startTime: '18:40', endTime: '19:00' },
  { id: 'd2-haibo-2020', name: '派對超人', stage: 'haibo', day: 2, startTime: '20:20', endTime: '21:20' },

  // ── 卡魔麥 ──
  { id: 'd2-kamomai-1320', name: 'TSS', stage: 'kamomai', day: 2, startTime: '13:20', endTime: '13:40', tag: '[FR]' },
  { id: 'd2-kamomai-1500', name: '恆月三途', stage: 'kamomai', day: 2, startTime: '15:00', endTime: '15:20' },
  { id: 'd2-kamomai-1640', name: '五月五日', stage: 'kamomai', day: 2, startTime: '16:40', endTime: '17:00', tag: '[KR]' },
  { id: 'd2-kamomai-1810', name: 'Infernal Chaos', stage: 'kamomai', day: 2, startTime: '18:10', endTime: '18:40' },
  { id: 'd2-kamomai-2000', name: '忘憂水', stage: 'kamomai', day: 2, startTime: '20:00', endTime: '20:30' },

  // ── 出頭天 ──
  { id: 'd2-chutou-1350', name: '畫室', stage: 'chutou', day: 2, startTime: '13:50', endTime: '14:10' },
  { id: 'd2-chutou-1510', name: '薄荷葉 ft. JB', stage: 'chutou', day: 2, startTime: '15:10', endTime: '15:30' },
  { id: 'd2-chutou-1620', name: '馬尾 ft. 立長', stage: 'chutou', day: 2, startTime: '16:20', endTime: '16:40' },
  { id: 'd2-chutou-1750', name: '洪安妮', stage: 'chutou', day: 2, startTime: '17:50', endTime: '18:10' },

  // ── 大雄丸 ──
  { id: 'd2-daxiong-1310', name: '陪呱吉放歌 vol.1', stage: 'daxiong', day: 2, startTime: '13:10', endTime: '13:40' },
  { id: 'd2-daxiong-1510', name: '丸長世代', stage: 'daxiong', day: 2, startTime: '15:10', endTime: '15:40' },
  { id: 'd2-daxiong-1710', name: '還有夜間限定', stage: 'daxiong', day: 2, startTime: '17:10', endTime: '17:40' },

  // ── 藍寶石 ──
  { id: 'd2-lanbaoshi-1410', name: 'LEIGHT NINE', stage: 'lanbaoshi', day: 2, startTime: '14:10', endTime: '14:30' },
  { id: 'd2-lanbaoshi-1530', name: '破地獄', stage: 'lanbaoshi', day: 2, startTime: '15:30', endTime: '15:50' },
  { id: 'd2-lanbaoshi-1650', name: '喜劇開港', stage: 'lanbaoshi', day: 2, startTime: '16:50', endTime: '17:10' },
  { id: 'd2-lanbaoshi-1810', name: 'Plutato', stage: 'lanbaoshi', day: 2, startTime: '18:10', endTime: '18:30' },

  // ── 青春夢 ──
  { id: 'd2-qingchun-1330', name: '打倒三明治', stage: 'qingchun', day: 2, startTime: '13:30', endTime: '13:50' },
  { id: 'd2-qingchun-1450', name: '壓滿俱樂部', stage: 'qingchun', day: 2, startTime: '14:50', endTime: '15:10' },
  { id: 'd2-qingchun-1610', name: '沈默紳士', stage: 'qingchun', day: 2, startTime: '16:10', endTime: '16:30' },
  { id: 'd2-qingchun-1730', name: 'debloop', stage: 'qingchun', day: 2, startTime: '17:30', endTime: '17:50' },
  { id: 'd2-qingchun-1850', name: '貓膽汁', stage: 'qingchun', day: 2, startTime: '18:50', endTime: '19:10' },

  // ── 小港祭 ──
  { id: 'd2-xiaogang-1520', name: 'DJ QuestionMark', stage: 'xiaogang', day: 2, startTime: '15:20', endTime: '16:20' },
  { id: 'd2-xiaogang-1630', name: 'DCIV + Lazy Habits', stage: 'xiaogang', day: 2, startTime: '16:30', endTime: '17:00' },
  { id: 'd2-xiaogang-1710', name: 'Flowstrong + Dac', stage: 'xiaogang', day: 2, startTime: '17:10', endTime: '17:40' },
  { id: 'd2-xiaogang-1750', name: 'BRADD + 阿法', stage: 'xiaogang', day: 2, startTime: '17:50', endTime: '18:20' },
  { id: 'd2-xiaogang-1830', name: "That's My Shhh", stage: 'xiaogang', day: 2, startTime: '18:30', endTime: '19:30' },
  { id: 'd2-xiaogang-2000', name: '國語作業簿', stage: 'xiaogang', day: 2, startTime: '20:00', endTime: '21:00' },
]

export const schedule: Performance[] = [...day1, ...day2]

export const getPerformancesByDay = (day: 1 | 2): Performance[] =>
  schedule.filter((p) => p.day === day)

export const getPerformancesByDayAndStage = (day: 1 | 2, stageId: string): Performance[] =>
  schedule.filter((p) => p.day === day && p.stage === stageId)
