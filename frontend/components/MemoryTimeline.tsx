'use client'

import { useState, useEffect } from 'react'
import api from '../services/api'

export default function MemoryTimeline() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchHistory = async () => {
    try {
      const res = await api.get('/history')
      setHistory(res.data)
    } catch (error) {
      console.error('Failed to fetch history', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto w-full">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Memory Timeline</h1>
        <p className="text-lg text-outline mt-2">A chronological stream of your external brain's activity.</p>
      </header>

      {loading ? (
        <div className="space-y-6">
          {[1,2,3].map(i => <div key={i} className="h-24 neumorphic-flat rounded-[24px] animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-8 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-primary/10">
          {history.length === 0 ? (
            <p className="text-center text-outline py-20 italic">No activity recorded yet. Start by uploading a document!</p>
          ) : history.map((item, i) => (
            <div key={item.id} className="relative pl-24 group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background z-10 group-hover:scale-125 transition-transform"></div>
              <div className="neumorphic-flat p-6 rounded-[32px] flex items-center justify-between group-hover:bg-white/40 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">
                      {item.type === 'UPLOAD' ? 'cloud_upload' : item.type === 'CHAT' ? 'chat' : 'auto_awesome'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">{item.title}</h3>
                    <p className="text-sm text-outline">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <button className="neumorphic-card px-4 py-2 rounded-xl text-primary font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
