import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA-Zh4HTNkp3zjR5omXEDrlCVcSeMmfcbY',
  authDomain: 'gyst-dashboard.firebaseapp.com',
  projectId: 'gyst-dashboard',
  storageBucket: 'gyst-dashboard.firebasestorage.app',
  messagingSenderId: '550944723777',
  appId: '1:550944723777:web:965759a925b25f5a2687c0',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
