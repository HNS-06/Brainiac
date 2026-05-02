'use client'

import Sidebar from './Sidebar'
import TopNavBar from './TopNavBar'

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavBar />
      <Sidebar />

      <main className="md:ml-64 pt-24 px-8 pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Privacy & Settings</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">Configure your external cortex and manage your data footprints.</p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="neumorphic-card p-6 rounded-[24px]">
              <h3 className="text-xl font-bold mb-6 text-on-surface">Categories</h3>
              <nav className="flex flex-col gap-3">
                <button className="flex items-center gap-4 p-4 rounded-2xl neumorphic-card text-primary font-bold w-full text-left">
                  <span className="material-symbols-outlined">person</span>
                  Profile
                </button>
                <button className="flex items-center gap-4 p-4 rounded-2xl text-on-surface-variant hover:bg-white/40 transition-all w-full text-left font-bold">
                  <span className="material-symbols-outlined">shield</span>
                  Data Controls
                </button>
              </nav>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-6">
            <section className="neumorphic-flat rounded-[32px] overflow-hidden">
              <div className="bg-white/40 backdrop-blur-md p-6 border-b border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden neumorphic-flat border-4 border-white bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl">account_circle</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Alex Chen</h3>
                    <p className="text-sm text-on-surface-variant">Chief Cognitive Architect • Joined Oct 2023</p>
                  </div>
                </div>
                <button className="neumorphic-card px-6 py-2 rounded-xl text-primary font-bold text-sm">Edit Profile</button>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant block ml-2">Display Name</label>
                  <div className="neumorphic-inset p-4 rounded-2xl">
                    <span className="text-on-surface font-medium">Alex Chen</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant block ml-2">Cortex ID</label>
                  <div className="neumorphic-inset p-4 rounded-2xl">
                    <span className="text-on-surface font-medium">BRAIN-8892-X</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="neumorphic-flat p-8 rounded-[32px] flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center mb-6 neumorphic-card text-secondary">
                  <span className="material-symbols-outlined text-3xl">cloud_download</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Export Brain</h3>
                <p className="text-on-surface-variant text-sm mb-8 px-4">Download a portable archive of your entire knowledge graph.</p>
                <button className="w-full py-4 neumorphic-card rounded-2xl text-secondary font-bold hover:scale-[1.02] active:scale-95 transition-all">Initialize Data Export</button>
              </div>
              <div className="neumorphic-flat p-8 rounded-[32px] flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-error-container/20 flex items-center justify-center mb-6 neumorphic-card text-error">
                  <span className="material-symbols-outlined text-3xl">delete_forever</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Wipe Cortex</h3>
                <p className="text-on-surface-variant text-sm mb-8 px-4">Irreversibly delete all memories and insights.</p>
                <button className="w-full py-4 neumorphic-card rounded-2xl text-error font-bold hover:scale-[1.02] active:scale-95 transition-all">Delete My Brain</button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
