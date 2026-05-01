'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Agent {
  id: string
  name: string
  status: 'idle' | 'working' | 'pulse'
  description: string
  avatar: string
  lastActivity: string
}

interface ActivityLog {
  id: string
  agent: string
  action: string
  details: string
  timestamp: string
  type: 'success' | 'info' | 'warning' | 'error'
}

export default function AIAgentsDashboard() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'retriever',
      name: 'The Retriever',
      status: 'pulse',
      description: 'Scanning 14 connected sources for new knowledge nodes.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx9BQ3YmIP9TH_dUBrzm1fqcPQC-JNFkxv0dvM-FCfLmAPPeaK7OCVVkpQsqNvI5Z00yjvmQLsHLs_GoJmcXVbnoZPhUauZtOjJWKJGGjAKpYjlQRfJ32UFIuhXmeTf_j2og2pEO7VK9xIcH3T8OrIqNZMBI6Cl1EWo59i3sc20-6GAERJ-J3K3QmgjNu1kcyLoj0VkKj2mqSZFqMsAPwLFG-kktGIgdxo1NuHpk4VgEiTbLcGwPva-iqWPUrssnrG774RVMamijti',
      lastActivity: '2m ago'
    },
    {
      id: 'summarizer',
      name: 'The Summarizer',
      status: 'idle',
      description: 'Waiting for high-density document ingestions to process.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsyjrfiZL3bKJO06VN4kDC91ciMWuw4c5s_UjdIXj-JFISDSlwrJttK8lbrCnN487LX4gOIJENeDBE49RpmKyjWPCNUHqjWjcMmoF4li6PMjGtlMIpiOdLfS2W9B3LIMzQeOFsToy4RUmOwQbpUfsjTpCyCP8faAyZS45sG7rK9_uxabjNcz_su4r1WIHsZmlRNJXOfaJG8OSaJ9ro4GHsyhvV8ONn83sERhc3ZEYAyaAapluxgL6j_AkDdP9U64-3s4ZxmmYcVnWY',
      lastActivity: '1h ago'
    },
    {
      id: 'verifier',
      name: 'The Verifier',
      status: 'working',
      description: 'Cross-referencing \'Project Alpha\' citations with web data.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_Ka9mAW1jo-tZNo2xlHtCRxz0Reyqv4athKDxFn6ee7GwWIB3kRIWQCMGjUMBn0PcvNF6supR-niM_wz4XstEez5dIS6FdwNaaK4MO0r9FTTkcrQdhNRlsVV083xNNms7Aff5L2c8YAmkVJM-elLFzzviRVZfHoHyp0FIA1yecpFfT2IhrradAOcaN4qnqw85dIJHyTZukOYiTZ1yQflsbfH9H3clVYj_te1tyUQOesvlzEJSOBZTgKbg2npmYz7JgRncuWDkJVE_',
      lastActivity: '5m ago'
    }
  ])

  const [activityLog, setActivityLog] = useState<ActivityLog[]>([
    {
      id: '1',
      agent: 'The Verifier',
      action: 'completed cross-check',
      details: 'Verified 12 nodes in "Quantum Physics" cluster.',
      timestamp: '2m ago',
      type: 'success'
    },
    {
      id: '2',
      agent: 'The Retriever',
      action: 'indexed new source',
      details: 'Integrated "Advanced Neural Networks.pdf" into Memory Timeline.',
      timestamp: '15m ago',
      type: 'info'
    },
    {
      id: '3',
      agent: 'The Summarizer',
      action: 'generated briefing',
      details: 'Morning summary of 42 unread notifications ready for review.',
      timestamp: '1h ago',
      type: 'success'
    },
    {
      id: '4',
      agent: 'System',
      action: 'source disconnected',
      details: 'Connection to "Work Calendar" lost. Re-authentication required.',
      timestamp: '3h ago',
      type: 'error'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pulse': return 'bg-secondary shadow-[0_0_8px_#34dfaf]'
      case 'working': return 'bg-primary'
      case 'idle': return 'bg-outline'
      default: return 'bg-outline'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return 'check_circle'
      case 'info': return 'cloud_download'
      case 'warning': return 'auto_awesome'
      case 'error': return 'warning'
      default: return 'info'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-secondary'
      case 'info': return 'text-primary'
      case 'warning': return 'text-tertiary'
      case 'error': return 'text-error'
      default: return 'text-outline'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-white/65 backdrop-blur-[20px] border-b border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-[#8B93FF] tracking-tight font-jakarta">BrainOS</span>
          <div className="hidden md:flex items-center space-x-6">
            <div className="neumorphic-inset px-4 py-2 rounded-full flex items-center gap-2 w-64">
              <span className="material-symbols-outlined text-slate-400">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-full" placeholder="Search cortex..." type="text"/>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary-container text-on-primary px-4 py-2 rounded-xl font-semibold text-sm hover:scale-95 transition-all duration-200 shadow-sm">
            Add New
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-white/40 transition-colors">
              <span className="material-symbols-outlined text-slate-600">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-white/40 transition-colors">
              <span className="material-symbols-outlined text-slate-600">account_circle</span>
            </button>
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-6 z-50 w-64 bg-white/65 backdrop-blur-[30px] border-r border-white/20 shadow-[4px_0_24px_rgba(0,0,0,0.03)] hidden md:flex">
        <div className="px-6 mb-8 mt-12">
          <h2 className="text-lg font-black text-[#8B93FF]">My Brain</h2>
          <p class="text-xs text-slate-500">External Cortex</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-[#8B93FF]/5 transition-all duration-300" href="/">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#8B93FF]/10 to-transparent text-[#8B93FF] font-semibold border-r-2 border-[#8B93FF]" href="#">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
            <span className="text-sm">AI Hub</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">history</span>
            <span className="text-sm">Memory Timeline</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">auto_awesome_motion</span>
            <span className="text-sm">Clusters</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">science</span>
            <span className="text-sm">Playground</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">hub</span>
            <span className="text-sm">Sources</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-[#8B93FF]/5 transition-all duration-300" href="#">
            <span className="material-symbols-outlined">insights</span>
            <span className="text-sm">Insights</span>
          </a>
        </nav>
        <div className="px-6 mt-auto">
          <div className="neumorphic-flat p-4 rounded-2xl bg-gradient-to-br from-white to-primary-fixed/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">Storage Status</p>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-3">
              <div className="bg-primary w-2/3 h-full rounded-full"></div>
            </div>
            <button className="w-full text-xs font-bold py-2 px-4 rounded-lg bg-white shadow-sm border border-primary/10 text-primary">Upgrade Storage</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-24 pb-12 pl-6 md:pl-72 pr-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-on-surface leading-tight tracking-tight">AI Hub</h1>
          <p className="text-lg text-outline mt-2">Manage your external cortex agents and monitors.</p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Active Agents Row */}
          <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="neumorphic-flat p-6 rounded-[24px] flex flex-col items-center text-center group cursor-pointer border border-white/40">
                <div className="w-24 h-24 rounded-full bg-secondary-container/30 flex items-center justify-center mb-4 relative overflow-hidden">
                  <img alt={agent.name} className="w-16 h-16 z-10" src={agent.avatar} />
                  {agent.status === 'working' && (
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[14px] text-primary">sync</span>
                    </div>
                  )}
                  {agent.status === 'pulse' && (
                    <div className="absolute inset-0 bg-secondary-fixed/10 animate-pulse"></div>
                  )}
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-on-surface">{agent.name}</h3>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}></span>
                    <span className="text-xs font-semibold text-outline uppercase">{agent.status}</span>
                  </div>
                </div>
                <p className="text-sm text-outline mb-6">{agent.description}</p>
                <div className="mt-auto w-full">
                  <button className="w-full py-2.5 rounded-xl neumorphic-inset text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats & Insights */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="neumorphic-flat p-6 rounded-[24px] flex-1 border border-white/40">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold">Efficiency</h4>
                <span className="material-symbols-outlined text-primary">trending_up</span>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-outline">Cortex Accuracy</span>
                    <span className="text-on-surface">98.2%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full">
                    <div className="h-full w-[98%] bg-secondary rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-outline">Sync Speed</span>
                    <span className="text-on-surface">450ms</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full">
                    <div className="h-full w-[85%] bg-primary-container rounded-full"></div>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-white/20">
                  <p className="text-xs text-outline leading-relaxed italic">"BrainOS agents are performing 12% faster than last week due to recent Memory Timeline optimizations."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log Section */}
          <div className="md:col-span-12">
            <div className="neumorphic-flat rounded-[32px] overflow-hidden border border-white/40">
              <div className="glass-header px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">event_note</span>
                  <h2 className="text-2xl font-bold">Recent Activity Log</h2>
                </div>
                <button className="text-sm font-bold text-primary hover:underline transition-all">Export Logs</button>
              </div>
              <div className="p-4">
                <div className="space-y-1">
                  {activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors group cursor-default">
                      <div className="w-10 h-10 rounded-full neumorphic-inset flex items-center justify-center shrink-0">
                        <span className={`material-symbols-outlined text-[20px] ${getActivityColor(activity.type)}`}>{getActivityIcon(activity.type)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-semibold text-on-surface">{activity.agent} <span className="font-normal text-outline">{activity.action}</span></p>
                          <span className="text-[11px] font-semibold text-outline">{activity.timestamp}</span>
                        </div>
                        <p className="text-xs text-outline-variant mt-0.5">{activity.details}</p>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 text-sm font-semibold text-outline hover:text-primary transition-colors">Show Older Activities</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAB for quick AI query */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
      </button>
    </div>
  )
}</content>
<parameter name="filePath">e:\Projects_Local_Machine\stitch_aura_knowledge_os\stitch_aura_knowledge_os\components\AIAgentsDashboard.tsx