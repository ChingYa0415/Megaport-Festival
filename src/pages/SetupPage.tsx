import { ProfileSetup } from '../components/profile/ProfileSetup'

interface SetupPageProps {
  userId: string
  onComplete: (name: string, avatarUrl: string) => Promise<void>
}

export function SetupPage({ userId, onComplete }: SetupPageProps) {
  return <ProfileSetup userId={userId} onComplete={onComplete} />
}
