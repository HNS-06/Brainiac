'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/' },
    { name: 'AI Hub', icon: 'smart_toy', href: '/agents' },
    { name: 'Memory Timeline', icon: 'history', href: '/timeline' },
    { name: 'Library', icon: 'description', href: '/library' },
    { name: 'Knowledge Graph', icon: 'hub', href: '/graph' },
    { name: 'Insights', icon: 'insights', href: '/insights' },
    { name: 'Settings', icon: 'settings', href: '/settings' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col py-6 z-50 w-64 bg-white/65 backdrop-blur-[30px] border-r border-white/20 shadow-[4px_0_24px_rgba(0,0,0,0.03)] hidden md:flex">
      <div className="px-6 mb-8 mt-12">
        <h2 className="text-lg font-black text-[#8B93FF] font-jakarta">Brainiac</h2>
        <p className="text-xs text-slate-500">External Cortex</p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-jakarta text-sm ${
                isActive 
                  ? 'bg-gradient-to-r from-[#8B93FF]/10 to-transparent text-[#8B93FF] font-semibold border-r-2 border-[#8B93FF]' 
                  : 'text-slate-600 hover:text-[#8B93FF] hover:bg-[#8B93FF]/5'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="px-4 mt-auto">
        <div className="p-4 rounded-2xl bg-secondary-container/10 border border-secondary/10">
          <p className="text-xs font-bold text-slate-500 mb-1">Knowledge Capacity</p>
          <p className="text-[10px] text-slate-400">Unlimited semantic storage active</p>
        </div>
      </div>
    </aside>
  )
}
