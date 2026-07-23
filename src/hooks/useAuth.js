import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth } from '../firebase/config'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function signIn(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  }

  async function signUp(email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    return credential.user
  }

  async function signOut() {
    await firebaseSignOut(auth)
  }

  return { user, loading, signIn, signUp, signOut }
}
