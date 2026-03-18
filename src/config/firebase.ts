import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import { enableMultiTabIndexedDbPersistence, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA90qiNaKfMhiq25wZeJJ1JZF06Urg2vvk',
  authDomain: 'megaport-2026.firebaseapp.com',
  projectId: 'megaport-2026',
  storageBucket: 'megaport-2026.firebasestorage.app',
  messagingSenderId: '30017272224',
  appId: '1:30017272224:web:444357a7f5cc67d749ccc5',
  measurementId: 'G-S8XT3B53SB',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('設定 Auth 持久化失敗，將使用預設模式:', err)
  })

  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    // 允許在不支援離線持久化的環境繼續運作
    if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
      console.error('啟用 Firestore 離線模式失敗:', err)
    }
  })
}
