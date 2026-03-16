import { useState } from 'react'

interface ProfileSetupProps {
  userId: string
  onComplete: (name: string, avatarUrl: string) => Promise<void>
}

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=e53e3e&color=fff&bold=true&size=200&name='

const PRESET_AVATARS = [
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Felix',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Milo',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Luna',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Cleo',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Zara',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Orion',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Nova',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Puck',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Sage',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Wren',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Ash',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=River',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Ember',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Finn',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Ivy',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Jasper',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Kai',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Lena',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Rex',
  'https://api.dicebear.com/9.x/pixel-art/svg?seed=Skye',
]

export function ProfileSetup({ userId: _userId, onComplete }: ProfileSetupProps) {
  const [name, setName] = useState('')
  const [presetUrl, setPresetUrl] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setSubmitting(true)
    setError('')
    try {
      const avatarUrl = presetUrl ?? DEFAULT_AVATAR + encodeURIComponent(name.trim())
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
        </div>

        {/* 預設頭像 */}
        <div>
          <p className="text-xs text-white/40 mb-2">選擇頭像</p>
          <div className="grid grid-cols-5 gap-2 justify-items-center">
            {PRESET_AVATARS.map((url) => (
              <button
                key={url}
                type="button"
                onClick={() => setPresetUrl(url)}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${
                  presetUrl === url ? 'border-white' : 'border-white/20 hover:border-white/50'
                }`}
              >
                <img src={url} alt="preset" className="w-full h-full object-cover bg-white/10" />
              </button>
            ))}
          </div>
        </div>

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
