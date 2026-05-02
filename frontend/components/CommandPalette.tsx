'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    } else {
      setQuery('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const actions = [
    { name: 'Dashboard', icon: 'dashboard', route: '/' },
    { name: 'AI Hub (Chat)', icon: 'smart_toy', route: '/agents' },
    { name: 'Knowledge Library', icon: 'description', route: '/library' },
    { name: 'Insights', icon: 'auto_awesome', route: '/insights' },
    { name: 'Settings', icon: 'settings', route: '/settings' },
  ]

  const filteredActions = actions.filter(action => 
    action.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (route: string) => {
    router.push(route)
    setIsOpen(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-100 mx-4">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input 
            ref={inputRef}
            type="text" 
            className="w-full bg-transparent border-none text-xl outline-none placeholder:text-slate-300 font-medium"
            placeholder="What do you want to do? (Search routes...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">ESC</button>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {filteredActions.length === 0 ? (
            <p className="text-center text-slate-400 py-8">No results found.</p>
          ) : (
            filteredActions.map((action, i) => (
              <button 
                key={i} 
                onClick={() => handleSelect(action.route)}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined">{action.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 group-hover:text-primary">{action.name}</h4>
                  <p className="text-xs text-slate-400">Navigate to {action.route}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-primary">chevron_right</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
