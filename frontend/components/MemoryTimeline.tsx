'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { documentApi } from '../services/api'

interface TimelineEntry {
  id: string
  name: string
  type: string
  createdAt: string
  status: string
}

export default function MemoryTimeline() {
  const [entries, setEntries] = useState<TimelineEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await documentApi.list()
        setEntries(res.data)
      } catch (err) {
        console.error('Failed to fetch timeline', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEntries()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-white/65 backdrop-blur-[20px] border-b border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.05)] md:pl-64">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-[#8B93FF] tracking-tight font-jakarta">BrainOS</Link>
        </div>
      </header>

      <main className="md:ml-64 pt-24 px-8 pb-12 max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Memory Timeline</h2>
          <p className="text-lg text-slate-500">A chronological stream of everything you've learned and processed.</p>
        </div>

        <div className="relative pl-8 md:pl-12">
          {/* Continuous Timeline Line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B93FF]/40 via-[#5cfcca]/40 to-transparent rounded-full"></div>

          {entries.length === 0 && !loading && (
             <p className="text-slate-500 italic py-10">No memories recorded yet. Start by uploading a document!</p>
          )}

          {entries.map((entry, index) => (
            <div key={entry.id} className="relative mb-12 group">
              <div className={`absolute -left-[27px] md:-left-[35px] top-6 w-5 h-5 rounded-full bg-white border-[3px] shadow-sm z-10 transition-transform group-hover:scale-125 ${entry.type.includes('pdf') ? 'border-secondary-container' : 'border-primary'}`}></div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="hidden md:block w-24 pt-6 text-sm font-bold text-slate-400">
                  {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex-1 w-full neumorphic-flat rounded-[24px] p-6 hover:translate-y-[-4px] transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${entry.type.includes('pdf') ? 'bg-secondary-container/20 text-on-secondary-container' : 'bg-primary-container/20 text-primary'}`}>
                        <span className="material-symbols-outlined">{entry.type.includes('pdf') ? 'picture_as_pdf' : 'link'}</span>
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${entry.type.includes('pdf') ? 'text-on-secondary-container' : 'text-primary'}`}>
                          {entry.type.includes('pdf') ? 'Research Paper' : 'Document'}
                        </span>
                        <h5 className="text-lg font-bold leading-tight">{entry.name}</h5>
                      </div>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-4">
                    Automatically processed and indexed at {new Date(entry.createdAt).toLocaleString()}.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold text-primary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">smart_toy</span> AI Enhanced
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
