import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
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
