'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopNavBar from './TopNavBar'
import { agentApi } from '../services/api'

interface Agent {
  id: string
  name: string
  status: 'idle' | 'working' | 'active'
  description: string
  avatar: string
}

export default function AIAgentsDashboard() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await agentApi.getStatus()
        const mappedAgents = res.data.agents.map((a: any) => ({
          ...a,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${a.id}`,
          description: a.status === 'active' ? 'Currently processing data...' : 'Waiting for tasks.'
        }))
        setAgents(mappedAgents)
      } catch (err) {
        console.error('Failed to fetch agents', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAgents()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar />
      <Sidebar />

      <main className="pt-24 pb-12 pl-6 md:pl-72 pr-6 max-w-[1600px] mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-on-surface leading-tight tracking-tight">AI Hub</h1>
          <p className="text-lg text-outline mt-2">Manage your external cortex agents and monitors.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {loading ? (
              Array.from({length: 3}).map((_, i) => (
                <div key={i} className="neumorphic-flat h-64 rounded-[24px] animate-pulse"></div>
              ))
            ) : agents.map((agent) => (
              <div key={agent.id} className="neumorphic-flat p-6 rounded-[24px] flex flex-col items-center text-center group cursor-pointer border border-white/40">
                <div className="w-24 h-24 rounded-full bg-secondary-container/30 flex items-center justify-center mb-4 relative overflow-hidden">
                  <img alt={agent.name} className="w-16 h-16 z-10" src={agent.avatar} />
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-on-surface">{agent.name}</h3>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-primary' : 'bg-outline'}`}></span>
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

          <div className="md:col-span-12 lg:col-span-4">
            <div className="neumorphic-flat p-6 rounded-[24px] border border-white/40">
              <h4 className="text-xl font-bold mb-4">Cortex Efficiency</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-outline uppercase">Accuracy</span>
                    <span>98.2%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[98%]"></div>
                  </div>
                </div>
                <p className="text-xs text-outline italic">"Your agents are performing optimally."</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}