'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Check for dev bypass mock user
      const isMocked = localStorage.getItem('mock_user_brainiac') === 'true';
      
      if (isMocked) {
        setUser({ displayName: 'Dev User', email: 'dev@brain.os', uid: 'mock-123' } as User);
        setLoading(false);
        if (pathname === '/login' || pathname === '/signup') router.push('/');
        return;
      }

      setUser(user)
      setLoading(false)
      
      const publicPaths = ['/login', '/signup']
      if (!user && !publicPaths.includes(pathname || '')) {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [pathname, router])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
