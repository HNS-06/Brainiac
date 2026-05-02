'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TopNavBar({ onUploadClick }: { onUploadClick?: () => void }) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-white/65 backdrop-blur-[20px] border-b border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-[#8B93FF] tracking-tight font-jakarta md:hidden">BrainOS</Link>
        <div className="hidden md:flex items-center neumorphic-inset rounded-full px-4 py-1.5 w-64 bg-surface-container-low border border-white/40 ml-[256px]">
          <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm w-full p-0" placeholder="Search your mind..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onUploadClick}
          className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add New
        </button>
        <div className="flex items-center gap-2 border-l border-slate-200 ml-2 pl-4">
          <button className="p-2 rounded-lg text-slate-500 hover:bg-white/40 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#8B93FF]/20 flex items-center justify-center text-[#8B93FF] cursor-pointer border border-[#8B93FF]/10">
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </div>
      </div>
    </header>
  )
}
