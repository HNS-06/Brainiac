'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopNavBar from './TopNavBar'
import UploadModal from './UploadModal'
import { useAuth } from '../context/AuthContext'
import { insightApi } from '../services/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [insights, setInsights] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await insightApi.getLatest()
        setInsights(res.data.insights)
      } catch (err) {
        console.error('Failed to fetch insights', err)
      } finally {
        setLoading(false)
      }
    }
    fetchInsights()
  }, [])

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Thinker'

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar onUploadClick={() => setIsUploadModalOpen(true)} />
      <Sidebar />

      <main className="md:ml-64 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-on-surface leading-tight tracking-tight">Welcome, {displayName}.</h1>
              <p className="text-lg text-outline mt-2">Your external brain is synchronized and ready for thinking.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <section className="md:col-span-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  </span>
                  Daily Insights
                </h2>
                <button className="text-sm font-semibold text-primary hover:underline">View All Report</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="neumorphic-card rounded-[24px] p-6 border border-white/60 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#8B93FF]/5 rounded-full blur-2xl"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#8B93FF]/10 flex items-center justify-center text-[#8B93FF]">
                      <span className="material-symbols-outlined">track_changes</span>
                    </div>
                    <span className="text-xs font-bold text-secondary px-2 py-1 bg-secondary-container/20 rounded-lg">+12%</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Focus Score</h3>
                  <p className="text-sm text-outline mb-4">Quality of neural connections today</p>
                  <div className="flex items-end gap-1 h-12">
                    {[40,60,45,80,90,100,70].map((height, i) => (
                      <div key={i} className="w-full bg-primary/20 rounded-t-md" style={{height: `${height}%`}}></div>
                    ))}
                  </div>
                </div>

                <div className="neumorphic-card rounded-[24px] p-6 border border-white/60">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined">architecture</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Synthesis Alert</h3>
                  <p className="text-sm text-outline mb-4">3 concepts in "Quantum Computing" need bridging.</p>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                    <div className="w-8 h-8 rounded-full bg-[#8B93FF] flex items-center justify-center text-[10px] text-white font-bold">+1</div>
                  </div>
                </div>
              </div>

              <div className="neumorphic-card rounded-[32px] p-8 border border-white/60">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold">Memory Heatmap</h3>
                    <p className="text-sm text-outline">Activity distribution across your semantic network</p>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-3">
                  {Array.from({length: 42}, (_, i) => {
                    const intensities = [5,20,10,40,5,60,20,5,80,10,30,10,10,50,5,10,90,20,10,10,5,20,10,40,5,10,20,5,10,10,70,20,10,10,50,10]
                    return (
                      <div key={i} className="aspect-square rounded-xl" style={{backgroundColor: `rgba(75, 83, 187, ${intensities[i % intensities.length]/100})`}}></div>
                    )
                  })}
                </div>
              </div>
            </section>

            <aside className="md:col-span-4 flex flex-col gap-6">
              <div className="glass-panel rounded-[32px] p-6 border border-white/60 flex flex-col h-full shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#8B93FF] to-[#58f9c8] text-white shadow-md">
                    <span className="material-symbols-outlined text-xl">temp_preferences_custom</span>
                  </div>
                  <h2 className="text-xl font-bold">AI Insights</h2>
                </div>
                <div className="space-y-6">
                   <p className="text-sm text-on-surface-variant leading-relaxed">
                     {insights || "Analyzing your cognitive patterns... New insights will appear here soon."}
                   </p>
                   {loading && <div className="w-full h-24 bg-slate-100 animate-pulse rounded-2xl"></div>}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadSuccess={() => {
          console.log('Upload success!')
        }}
      />
    </div>
  )
}