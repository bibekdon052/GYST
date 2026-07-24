import { useState } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

export function AuthForm({ onSignIn, onSignUp }) {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup' | 'reset'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  function friendlyError(code) {
    const map = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/invalid-credential': 'Incorrect email or password.',
    }
    return map[code] || 'Something went wrong. Please try again.'
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')

    if (mode === 'signup' && password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      if (mode === 'signin') {
        await onSignIn(email, password)
      } else if (mode === 'signup') {
        await onSignUp(email, password)
      }
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center text-3xl mb-4 shadow-lg shadow-accent/20">
          🛩️
        </div>
        <h1 className="text-2xl font-bold text-text tracking-tight">GYST</h1>
        <p className="text-sm text-muted mt-1">
          {mode === 'signin' ? 'Sign in to your workspace' : 'Create your GYST workspace'}
        </p>
      </div>

      {/* Card */}
      <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl shadow-black/30">
        {error && (
          <div className="bg-danger/10 border border-danger/20 rounded-lg px-4 py-3 mb-5 text-sm text-danger">
            {error}
          </div>
        )}
        {info && (
          <div className="bg-success/10 border border-success/20 rounded-lg px-4 py-3 mb-5 text-sm text-success">
            {info}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />
          {mode === 'signup' && (
            <Input
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2"
            size="lg"
          >
            {loading
              ? 'Please wait…'
              : mode === 'signin'
              ? 'Sign In'
              : 'Create Account'}
          </Button>
        </form>

        <div className="h-px bg-border my-5" />

        <p className="text-center text-sm text-muted">
          {mode === 'signin' ? (
            <>
              No account?{' '}
              <button
                onClick={() => { setMode('signup'); setError('') }}
                className="text-accent hover:underline font-medium"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => { setMode('signin'); setError('') }}
                className="text-accent hover:underline font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>

      <p className="text-center text-xs text-muted/60 mt-6">
        GYST stores your dashboard layout and links in your account via Firebase.
        Your email address is held by Firebase Authentication.{' '}
        <a href="/privacy" className="underline hover:text-muted transition-colors">Privacy Policy</a>
      </p>
    </div>
  )
}
