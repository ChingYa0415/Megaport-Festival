import { useState } from 'react'
import { AvatarUploader } from './AvatarUploader'
import { useImageUpload } from '../../hooks/useImageUpload'

interface ProfileSetupProps {
  userId: string
  onComplete: (name: string, avatarUrl: string) => Promise<void>
}

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=e53e3e&color=fff&bold=true&size=200&name='

export function ProfileSetup({ userId, onComplete }: ProfileSetupProps) {
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { uploadAvatar } = useImageUpload()

  const handleFileSelect = (f: File) => {
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setSubmitting(true)
    setError('')
    try {
      let avatarUrl: string
      if (file) {
        avatarUrl = await uploadAvatar(file, userId)
      } else {
        avatarUrl = DEFAULT_AVATAR + encodeURIComponent(name.trim())
      }
      await onComplete(name.trim(), avatarUrl)
    } catch (err) {
      console.error('Profile setup failed:', err)
      const msg = err instanceof Error ? err.message : String(err)
      setError(`設定失敗：${msg}`)
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 bg-[#1a1a2e]">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-white">大港開唱 2026</h1>
          <p className="text-sm text-white/50 mt-1">好友行程共享</p>
        </div>

        <AvatarUploader preview={preview} onFileSelect={handleFileSelect} />

        <input
          type="text"
          placeholder="輸入暱稱"
          maxLength={10}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-center outline-none focus:border-white/50"
        />

        {error && (
          <p className="text-red-400 text-xs break-all">{error}</p>
        )}

        <button
          type="submit"
          disabled={!name.trim() || submitting}
          className="w-full py-3 rounded-xl bg-[#e53e3e] text-white font-bold disabled:opacity-40 transition-opacity"
        >
          {submitting ? '設定中...' : '開始使用'}
        </button>
      </form>
    </div>
  )
}
