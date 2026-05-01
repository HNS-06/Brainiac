'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-white/65 backdrop-blur-[20px] border-b border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold text-[#8B93FF] tracking-tight font-jakarta">BrainOS</div>
          <div className="hidden md:flex items-center neumorphic-inset rounded-full px-4 py-1.5 w-64 bg-surface-container-low border border-white/40">
            <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-full p-0" placeholder="Search your mind..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-transform active:scale-95">
            <span className="material-symbols-outlined text-sm">add</span>
            Add New
          </button>
          <div className="flex items-center gap-2 border-l border-slate-200 ml-2 pl-4">
            <button className="p-2 rounded-lg text-slate-500 hover:bg-white/40 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#8B93FF]/20 flex items-center justify-center text-[#8B93FF] cursor-pointer">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-6 z-50 w-64 bg-white/65 backdrop-blur-[30px] shadow-[4px_0_24px_rgba(0,0,0,0.03)] hidden md:flex">
        <div className="px-6 mb-8 mt-12">
          <h2 className="text-lg font-black text-[#8B93FF] leading-tight">My Brain</h2>
          <p className="text-xs text-slate-500">External Cortex</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#8B93FF]/10 to-transparent text-[#8B93FF] font-semibold border-r-2 border-[#8B93FF] transition-all duration-300">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-jakarta">Dashboard</span>
          </Link>
          <Link href="/agents" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-[#8B93FF] hover:bg-[#8B93FF]/5 transition-all duration-300">
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="text-sm font-jakarta">AI Agents</span>
          </Link>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-[#8B93FF] hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">description</span>
            <span className="text-sm font-jakarta">Notes</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-[#8B93FF] hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">folder_open</span>
            <span className="text-sm font-jakarta">Documents</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-[#8B93FF] hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">hub</span>
            <span className="text-sm font-jakarta">Knowledge Graph</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-[#8B93FF] hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">insights</span>
            <span className="text-sm font-jakarta">Insights</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-[#8B93FF] hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-jakarta">Settings</span>
          </a>
        </nav>
        <div className="px-4 mt-auto">
          <div className="p-4 rounded-2xl bg-primary-fixed text-on-primary-fixed-variant">
            <p className="text-xs font-bold mb-2">92% Storage Used</p>
            <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden mb-4">
              <div className="w-[92%] h-full bg-primary shadow-sm"></div>
            </div>
            <button className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg shadow-sm hover:scale-[1.02] transition-transform">
              Upgrade Storage
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-on-surface leading-tight tracking-tight">Good Morning, Alex.</h1>
              <p className="text-lg text-outline mt-2">Your external brain is synchronized and ready for thinking.</p>
            </div>
            <div className="flex gap-3">
              <div className="neumorphic-card rounded-2xl px-5 py-3 flex items-center gap-3 border border-white/50">
                <div className="p-2 rounded-xl bg-secondary-container/20 text-on-secondary-container">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Neural Focus</p>
                  <p className="text-sm font-bold">Deep Work</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Daily Insights Section */}
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
                {/* Focus Score Widget */}
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

                {/* Synthesis Alert Widget */}
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

              {/* Memory Heatmap */}
              <div className="neumorphic-card rounded-[32px] p-8 border border-white/60">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold">Memory Heatmap</h3>
                    <p className="text-sm text-outline">Activity distribution across your semantic network</p>
                  </div>
                  <div className="flex gap-2 p-1 neumorphic-inset rounded-xl bg-surface-container-low">
                    <button className="px-3 py-1 text-xs font-bold bg-white shadow-sm rounded-lg text-primary">Week</button>
                    <button className="px-3 py-1 text-xs font-bold text-outline">Month</button>
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
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-primary/5"></div>
                      <span className="text-[10px] text-outline">Dormant</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-primary"></div>
                      <span className="text-[10px] text-outline">High Activity</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-primary">42 New connections synthesized today</p>
                </div>
              </div>
            </section>

            {/* Smart Suggestions Panel */}
            <aside className="md:col-span-4 flex flex-col gap-6">
              <div className="glass-panel rounded-[32px] p-6 border border-white/60 flex flex-col h-full shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#8B93FF] to-[#58f9c8] text-white shadow-md">
                    <span className="material-symbols-outlined text-xl">temp_preferences_custom</span>
                  </div>
                  <h2 className="text-xl font-bold">Smart Suggestions</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">You might want to revisit...</h4>
                    <div className="space-y-4">
                      <div className="group cursor-pointer p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white neumorphic-card flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">menu_book</span>
                          </div>
                          <div>
                            <p className="font-bold text-sm">Neural Networks Part II</p>
                            <p className="text-xs text-outline">Last viewed 4 days ago • High relevance</p>
                          </div>
                        </div>
                      </div>
                      <div className="group cursor-pointer p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white neumorphic-card flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">hub</span>
                          </div>
                          <div>
                            <p className="font-bold text-sm">Interconnected Startups</p>
                            <p className="text-xs text-outline">Found 3 new linked documents</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">Neural Maintenance</h4>
                    <div className="neumorphic-inset rounded-2xl p-5 bg-surface-container-low/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold">Concept Pruning</span>
                        <span className="text-xs font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">Ready</span>
                      </div>
                      <p className="text-xs text-outline leading-relaxed mb-4">Archive 12 outdated notes from the "Legacy Project" to free up cognitive space.</p>
                      <button className="w-full py-2.5 bg-white border border-[#8B93FF]/30 text-[#8B93FF] text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                        Execute Clean-up
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-8 flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 200 200">
                      <path d="M40,100c0-33.1,26.9-60,60-60s60,26.9,60,60s-26.9,60-60,60S40,133.1,40,100z" fill="#8B93FF" fillOpacity="0.1"></path>
                      <circle cx="100" cy="100" fill="url(#grad1)" fillOpacity="0.2" r="50"></circle>
                      <path d="M70,80 Q100,60 130,80 Q150,100 130,120 Q100,140 70,120 Q50,100 70,80" fill="none" stroke="#8B93FF" strokeDasharray="10 5" strokeLinecap="round" strokeWidth="4"></path>
                      <circle cx="100" cy="100" fill="#8B93FF" r="10"></circle>
                      <defs>
                        <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#8B93FF" stopOpacity="0.3"></stop>
                          <stop offset="100%" stopColor="#8B93FF" stopOpacity="0"></stop>
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}</content>
<parameter name="filePath">e:\Projects_Local_Machine\stitch_aura_knowledge_os\stitch_aura_knowledge_os\components\Dashboard.tsx