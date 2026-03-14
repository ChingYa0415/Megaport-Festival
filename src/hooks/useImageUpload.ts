import { useCallback } from 'react'
import imageCompression from 'browser-image-compression'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'

export function useImageUpload() {
  const uploadAvatar = useCallback(async (file: File, userId: string): Promise<string> => {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 200,
      useWebWorker: true,
    })

    const storageRef = ref(storage, `avatars/${userId}.jpg`)
    await uploadBytes(storageRef, compressed)
    return getDownloadURL(storageRef)
  }, [])

  return { uploadAvatar }
}
