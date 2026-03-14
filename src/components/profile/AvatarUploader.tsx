import { useRef } from 'react'

interface AvatarUploaderProps {
  preview: string | null
  onFileSelect: (file: File) => void
}

export function AvatarUploader({ preview, onFileSelect }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-20 h-20 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden hover:border-white/50 transition-colors"
      >
        {preview ? (
          <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl text-white/40">+</span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelect(file)
        }}
      />
      <span className="text-xs text-white/50">點擊上傳大頭貼（選填）</span>
    </div>
  )
}
