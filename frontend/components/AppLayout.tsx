'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopNavBar from './TopNavBar'
import UploadModal from './UploadModal'
import CommandPalette from './CommandPalette'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  // Don't show layout on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  // Listen for global upload events
  useEffect(() => {
    const handleOpenUpload = () => setIsUploadModalOpen(true)
    window.addEventListener('open-upload-modal', handleOpenUpload)
    return () => window.removeEventListener('open-upload-modal', handleOpenUpload)
  }, [])

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background flex">
      <CommandPalette />
      <Sidebar />
      
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <TopNavBar onUploadClick={() => setIsUploadModalOpen(true)} />
        <main className="flex-1 pt-24 px-6 pb-12 overflow-x-hidden">
          {children}
        </main>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadSuccess={() => {
          console.log('Global Upload success!')
        }}
      />
    </div>
  )
}
