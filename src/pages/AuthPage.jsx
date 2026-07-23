import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { AuthForm } from '../components/auth/AuthForm'
import { useAuth } from '../hooks/useAuth'
import { db } from '../firebase/config'

export default function AuthPage() {
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()

  async function afterAuth(user) {
    // Check if onboarding is complete
    try {
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists() && snap.data().onboardingComplete) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/onboarding', { replace: true })
      }
    } catch {
      navigate('/onboarding', { replace: true })
    }
  }

  async function handleSignIn(email, password) {
    const user = await signIn(email, password)
    await afterAuth(user)
  }

  async function handleSignUp(email, password) {
    const user = await signUp(email, password)
    await afterAuth(user)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-5">
      <AuthForm onSignIn={handleSignIn} onSignUp={handleSignUp} />
    </div>
  )
}
