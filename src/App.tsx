import { useAuth } from './hooks/useAuth'
import { SetupPage } from './pages/SetupPage'
import { SchedulePage } from './pages/SchedulePage'

export default function App() {
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
