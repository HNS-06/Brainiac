'use client'

import { useState } from 'react'
import { auth } from '../services/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        
        // Generate Cortex ID (e.g., BRAIN-123456)
        const cortexId = `BRAIN-${Math.floor(100000 + Math.random() * 900000)}`
        
        // Initialize user profile in Firestore
        const { db } = await import('../services/firebase')
        const { doc, setDoc } = await import('firebase/firestore')
        
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          cortexId: cortexId,
          createdAt: new Date().toISOString(),
          displayName: email.split('@')[0]
        })
      }
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs for premium feel */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#8B93FF] tracking-tight font-jakarta mb-2">Brainiac</h1>
          <p className="text-slate-500 font-medium">{mode === 'login' ? 'Welcome back to your external brain' : 'Initialize your cognitive extension'}</p>
        </div>

        <form onSubmit={handleSubmit} className="neumorphic-card p-8 space-y-6">
          {error && (
            <div className="flex flex-col gap-2">
              <div className="p-4 bg-error-container/20 border border-error/20 rounded-2xl text-error text-sm font-bold text-center break-words">
                {error}
              </div>
              {error.includes('configuration-not-found') && (
                <button 
                  type="button"
                  onClick={() => {
                    localStorage.setItem('mock_user_brainiac', 'true');
                    window.location.href = '/';
                  }}
                  className="p-2 text-xs font-bold text-primary hover:underline bg-primary/10 rounded-lg transition-colors"
                >
                  🚀 Development Bypass (Skip Auth)
                </button>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="neumorphic-inset px-4 py-3 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm w-full p-0" 
                placeholder="alex@brain.os"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="neumorphic-inset px-4 py-3 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">lock</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm w-full p-0" 
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#8B93FF] text-white font-bold text-lg shadow-[0_8px_20px_rgba(139,147,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-slate-500 font-medium hover:text-[#8B93FF] transition-colors"
          >
            {mode === 'login' ? "Don't have a brain yet? Sign up" : "Already have a brain? Log in"}
          </button>

          <div className="pt-6 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Enterprise Access</p>
            <p className="text-xs text-slate-500">You can also use your <span className="text-[#8B93FF] font-bold">Cortex ID</span> to synchronize across devices.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
