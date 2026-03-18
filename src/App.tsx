import { useAuth } from './hooks/useAuth'
import { SetupPage } from './pages/SetupPage'
import { SchedulePage } from './pages/SchedulePage'
import { AdminPage } from './pages/AdminPage'
import { hasFreshAdminLoginIntent } from './utils/adminLoginIntent'

const CANONICAL_ADMIN_HOST = 'megaport-2026.web.app'

function FestivalApp() {
  const { userId, user, loading, createProfile, resetUser } = useAuth()

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#1a1a2e]">
        <div className="text-white/50 text-lg">載入中...</div>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#1a1a2e]">
        <div className="text-white/50">連線中...</div>
      </div>
    )
  }

  if (!user) {
    return <SetupPage userId={userId} onComplete={createProfile} />
  }

  return <SchedulePage user={user} onReset={resetUser} />
}

export default function App() {
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : ''
  const isAdminPath =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')
  const shouldReturnToAdmin = !isAdminPath && hasFreshAdminLoginIntent()
  const shouldRedirectToCanonicalAdminHost =
    isAdminPath && currentHost && currentHost !== CANONICAL_ADMIN_HOST && currentHost !== 'localhost'

  if (shouldRedirectToCanonicalAdminHost && typeof window !== 'undefined') {
    window.location.replace(`https://${CANONICAL_ADMIN_HOST}/admin`)
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#0f172a] text-white/70">
        正在前往官方管理頁...
      </div>
    )
  }

  if (isAdminPath) {
    return <AdminPage />
  }

  if (shouldReturnToAdmin && typeof window !== 'undefined') {
    window.location.replace('/admin')
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#0f172a] text-white/70">
        管理頁轉跳中...
      </div>
    )
  }

  return <FestivalApp />
}
