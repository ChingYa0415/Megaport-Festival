import { useEffect, useMemo, useState } from 'react'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { useAnnouncement } from '../hooks/useAnnouncement'
import { useNetworkStatus } from '../hooks/useNetworkStatus'
import { usePerformances } from '../hooks/usePerformances'
import { stages } from '../data/stages'
import type { Performance } from '../types'
import { clearAdminLoginIntent } from '../utils/adminLoginIntent'

function formatTime(date: Date | null): string {
  if (!date) return '尚未發布'
  return new Intl.DateTimeFormat('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function AdminPage() {
  const { firebaseUser, isAdmin, loading, authError, signInAsAdmin, signOutAdmin } = useAdminAuth()
  const { announcement, saveAnnouncement } = useAnnouncement()
  const isOnline = useNetworkStatus()
  const {
    performances,
    source: performanceSource,
    upsertPerformance,
    removePerformance,
    seedDefaultSchedule,
  } = usePerformances({ enabled: !!firebaseUser && isAdmin })

  const [draft, setDraft] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formName, setFormName] = useState('')
  const [formStage, setFormStage] = useState(stages[0]?.id ?? '')
  const [formStartTime, setFormStartTime] = useState('12:30')
  const [formEndTime, setFormEndTime] = useState('13:10')
  const [formTag, setFormTag] = useState('')
  const [performanceMessage, setPerformanceMessage] = useState<string | null>(null)
  const [performanceError, setPerformanceError] = useState<string | null>(null)
  const [isSavingPerformance, setIsSavingPerformance] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)

  useEffect(() => {
    setDraft(announcement.message)
  }, [announcement.message])

  useEffect(() => {
    if (!saveMessage && !saveError) return
    const timer = window.setTimeout(() => {
      setSaveMessage(null)
      setSaveError(null)
    }, 2200)
    return () => window.clearTimeout(timer)
  }, [saveMessage, saveError])

  useEffect(() => {
    if (!performanceMessage && !performanceError) return
    const timer = window.setTimeout(() => {
      setPerformanceMessage(null)
      setPerformanceError(null)
    }, 2400)
    return () => window.clearTimeout(timer)
  }, [performanceMessage, performanceError])

  const canSave = useMemo(
    () => isAdmin && !isSaving && draft.trim() !== announcement.message.trim(),
    [announcement.message, draft, isAdmin, isSaving]
  )

  const dayPerformances = useMemo(
    () => performances.filter((performance) => performance.day === selectedDay),
    [performances, selectedDay]
  )

  const canSavePerformance = useMemo(() => {
    if (!isAdmin || isSavingPerformance) return false
    if (!formName.trim()) return false
    if (!formStage) return false
    return formStartTime < formEndTime
  }, [formEndTime, formName, formStage, formStartTime, isAdmin, isSavingPerformance])

  const handleSave = async () => {
    if (!firebaseUser || !isAdmin || !canSave) return

    setIsSaving(true)
    setSaveMessage(null)
    setSaveError(null)

    try {
      await saveAnnouncement(draft, firebaseUser.uid)
      setSaveMessage('公告已更新')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setSaveError(`更新失敗：${message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const resetPerformanceForm = () => {
    setEditingId(null)
    setFormName('')
    setFormStage(stages[0]?.id ?? '')
    setFormStartTime('12:30')
    setFormEndTime('13:10')
    setFormTag('')
  }

  const startEditPerformance = (performance: Performance) => {
    setEditingId(performance.id)
    setSelectedDay(performance.day)
    setFormName(performance.name)
    setFormStage(performance.stage)
    setFormStartTime(performance.startTime)
    setFormEndTime(performance.endTime)
    setFormTag(performance.tag ?? '')
  }

  const handleSavePerformance = async () => {
    if (!firebaseUser || !isAdmin || !canSavePerformance) return

    setPerformanceMessage(null)
    setPerformanceError(null)
    setIsSavingPerformance(true)
    try {
      const id =
        editingId ??
        `custom-d${selectedDay}-${formStage}-${formStartTime.replace(':', '')}-${Date.now()
          .toString(36)
          .slice(-4)}`
      await upsertPerformance({
        id,
        name: formName.trim(),
        stage: formStage,
        day: selectedDay,
        startTime: formStartTime,
        endTime: formEndTime,
        tag: formTag.trim() || undefined,
      })
      setPerformanceMessage(editingId ? '場次已更新' : '場次已新增')
      resetPerformanceForm()
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setPerformanceError(`儲存場次失敗：${message}`)
    } finally {
      setIsSavingPerformance(false)
    }
  }

  const handleDeletePerformance = async (performance: Performance) => {
    if (!isAdmin) return
    const ok = window.confirm(`確定要刪除「${performance.name}」嗎？`)
    if (!ok) return

    setPerformanceMessage(null)
    setPerformanceError(null)
    try {
      await removePerformance(performance.id)
      setPerformanceMessage('場次已刪除')
      if (editingId === performance.id) {
        resetPerformanceForm()
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setPerformanceError(`刪除失敗：${message}`)
    }
  }

  const handleSeedDefaultSchedule = async () => {
    if (!isAdmin || isSeeding) return
    const ok = window.confirm('將預設節目表匯入 Firestore，確定要繼續嗎？')
    if (!ok) return

    setPerformanceMessage(null)
    setPerformanceError(null)
    setIsSeeding(true)
    try {
      await seedDefaultSchedule()
      setPerformanceMessage('已匯入預設節目表')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setPerformanceError(`匯入失敗：${message}`)
    } finally {
      setIsSeeding(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#0f172a] text-white/70">
        管理頁載入中...
      </div>
    )
  }

  if (!firebaseUser) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6 bg-[#0f172a]">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <h1 className="text-xl font-bold text-black">管理者登入</h1>
          <p className="mt-2 text-sm text-black/60">
            請使用你的 Google 帳號登入管理後台。
          </p>
          <p className="mt-2 text-xs text-black/50">
            若你是從 LINE 或其他 App 內瀏覽器開啟，請改用 Safari/Chrome 再試一次。
          </p>
          <p className="mt-2 text-[11px] text-black/45 break-all">
            目前網域：{typeof window !== 'undefined' ? window.location.host : 'unknown'}
          </p>
          {!isOnline && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
              目前離線中，請先連上網路再登入管理者。
            </p>
          )}
          {authError && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 break-all">
              {authError}
            </p>
          )}
          <button
            onClick={signInAsAdmin}
            disabled={!isOnline}
            className="mt-6 w-full rounded-xl bg-[#0f172a] px-4 py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-40"
          >
            使用 Google 登入
          </button>
          <a
            href="/"
            onClick={clearAdminLoginIntent}
            className="mt-3 block text-center text-xs text-black/50 hover:text-black/70"
          >
            返回行程頁
          </a>
          <a
            href="https://megaport-2026.web.app/admin"
            className="mt-2 block text-center text-xs text-blue-600 hover:text-blue-700 break-all"
          >
            改用官方網址登入（megaport-2026.web.app）
          </a>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6 bg-[#0f172a]">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <h1 className="text-xl font-bold text-[#b91c1c]">沒有管理權限</h1>
          <p className="mt-2 text-sm text-black/70">
            目前登入帳號尚未加入管理者白名單。
          </p>
          <p className="mt-3 text-xs break-all rounded-lg bg-black/5 p-2 text-black/70">
            UID：{firebaseUser.uid}
          </p>
          <p className="mt-3 text-xs text-black/60">
            請在 Firestore 建立 `admins/{firebaseUser.uid}` 文件後重新登入。
          </p>
          <div className="mt-5 flex gap-2">
            <button
              onClick={signOutAdmin}
              className="rounded-lg border border-black/20 px-3 py-2 text-xs text-black/70 hover:bg-black/5"
            >
              登出
            </button>
            <a
              href="/"
              onClick={clearAdminLoginIntent}
              className="rounded-lg border border-black/20 px-3 py-2 text-xs text-black/70 hover:bg-black/5"
            >
              返回行程頁
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-[#0f172a] text-white">
      <div className="mx-auto w-full max-w-2xl p-4 space-y-4">
        <div className="rounded-2xl bg-[#16213e] border border-white/10 p-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-lg font-bold">管理後台</h1>
            <a href="/" className="text-xs text-white/70 hover:text-white">
              返回行程頁
            </a>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-white/20 px-2 py-1 text-white/80">
              管理者：{firebaseUser.email ?? firebaseUser.uid}
            </span>
            <span
              className={`rounded-full border px-2 py-1 ${
                isOnline
                  ? 'border-emerald-300/60 text-emerald-200'
                  : 'border-amber-300/60 text-amber-200'
              }`}
            >
              {isOnline ? '線上' : '離線（可先編輯）'}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#16213e] border border-white/10 p-4 space-y-3">
          <h2 className="text-sm font-bold">全站公告</h2>
          <p className="text-xs text-white/60">
            更新後會顯示在一般使用者頁面頂部，適合公告臨時異動資訊。
          </p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="輸入公告內容（例如：海龍王 18:40 場次延後 10 分鐘）"
            rows={4}
            className="w-full rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/50"
          />
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-white/50">
              上次更新：{formatTime(announcement.updatedAt)}
            </p>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="rounded-xl bg-[#e53e3e] px-4 py-2 text-xs font-bold text-white disabled:opacity-40"
            >
              {isSaving ? '儲存中...' : '發布公告'}
            </button>
          </div>
          {saveMessage && <p className="text-xs text-emerald-300">{saveMessage}</p>}
          {saveError && <p className="text-xs text-red-300">{saveError}</p>}
        </div>

        <div className="rounded-2xl bg-[#16213e] border border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold">節目表管理</h2>
            <span className="text-[11px] text-white/60">
              資料來源：{performanceSource === 'firestore' ? 'Firestore' : '內建備援'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDay(1)}
              className={`px-3 py-1 rounded-full text-xs border ${
                selectedDay === 1
                  ? 'border-white/60 text-white bg-white/10'
                  : 'border-white/20 text-white/70'
              }`}
            >
              Day 1
            </button>
            <button
              onClick={() => setSelectedDay(2)}
              className={`px-3 py-1 rounded-full text-xs border ${
                selectedDay === 2
                  ? 'border-white/60 text-white bg-white/10'
                  : 'border-white/20 text-white/70'
              }`}
            >
              Day 2
            </button>
            <button
              onClick={handleSeedDefaultSchedule}
              disabled={isSeeding}
              className="ml-auto rounded-lg border border-white/25 px-3 py-1 text-xs text-white/80 disabled:opacity-40"
            >
              {isSeeding ? '匯入中...' : '匯入預設節目'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="樂團/節目名稱"
              className="col-span-2 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
            <select
              value={formStage}
              onChange={(e) => setFormStage(e.target.value)}
              className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white"
            >
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id} className="text-black">
                  {stage.name}
                </option>
              ))}
            </select>
            <input
              value={formTag}
              onChange={(e) => setFormTag(e.target.value)}
              placeholder="標籤（可留空）"
              className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
            <input
              type="time"
              value={formStartTime}
              onChange={(e) => setFormStartTime(e.target.value)}
              className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white"
            />
            <input
              type="time"
              value={formEndTime}
              onChange={(e) => setFormEndTime(e.target.value)}
              className="rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSavePerformance}
              disabled={!canSavePerformance}
              className="rounded-xl bg-[#e53e3e] px-4 py-2 text-xs font-bold text-white disabled:opacity-40"
            >
              {isSavingPerformance ? '儲存中...' : editingId ? '更新場次' : '新增場次'}
            </button>
            {editingId && (
              <button
                onClick={resetPerformanceForm}
                className="rounded-xl border border-white/20 px-4 py-2 text-xs text-white/70"
              >
                取消編輯
              </button>
            )}
          </div>
          {performanceMessage && <p className="text-xs text-emerald-300">{performanceMessage}</p>}
          {performanceError && <p className="text-xs text-red-300 break-all">{performanceError}</p>}

          <div className="rounded-xl border border-white/10 divide-y divide-white/10 max-h-[320px] overflow-y-auto">
            {dayPerformances.map((performance) => {
              const stageName =
                stages.find((stage) => stage.id === performance.stage)?.name ?? performance.stage
              return (
                <div key={performance.id} className="px-3 py-2 flex items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white truncate">{performance.name}</p>
                    <p className="text-[11px] text-white/55">
                      {performance.startTime} - {performance.endTime}｜{stageName}
                      {performance.tag ? `｜${performance.tag}` : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => startEditPerformance(performance)}
                    className="rounded-lg border border-white/20 px-2 py-1 text-[11px] text-white/75"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDeletePerformance(performance)}
                    className="rounded-lg border border-red-300/40 px-2 py-1 text-[11px] text-red-200"
                  >
                    刪除
                  </button>
                </div>
              )
            })}
            {dayPerformances.length === 0 && (
              <p className="px-3 py-4 text-xs text-white/50">目前這一天沒有場次資料。</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-[#16213e] border border-white/10 p-4 space-y-2">
          <h2 className="text-sm font-bold">目前公告預覽</h2>
          {announcement.message ? (
            <p className="text-sm text-white/90">{announcement.message}</p>
          ) : (
            <p className="text-sm text-white/50">目前沒有公告。</p>
          )}
        </div>

        <button
          onClick={signOutAdmin}
          className="rounded-xl border border-white/20 px-4 py-2 text-xs text-white/70 hover:text-white hover:border-white/40"
        >
          登出管理者
        </button>
      </div>
    </div>
  )
}
