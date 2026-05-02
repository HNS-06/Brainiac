'use client'

import { useState, useRef, useEffect } from 'react'
import { ragApi } from '../services/api'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: { title: string, snippet: string }[]
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('Quick')
  const [sources, setSources] = useState<{ title: string, snippet: string }[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setLoading(true)

    try {
      // Get Firebase ID Token for auth
      const { auth } = await import('../services/firebase')
      const token = await auth.currentUser?.getIdToken()

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rag/stream?query=${encodeURIComponent(currentInput)}&mode=${mode}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) throw new Error('Stream request failed')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiMessageContent = ''
      const aiMessageId = (Date.now() + 1).toString()

      // Initial empty AI message
      setMessages(prev => [...prev, { id: aiMessageId, role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const dataStr = line.replace('data: ', '').trim()
          
          if (dataStr === '[DONE]') continue
          
          try {
            const data = JSON.parse(dataStr)
            if (data.type === 'sources') {
              setSources(data.sources)
              setMessages(prev => prev.map(m => m.id === aiMessageId ? { ...m, sources: data.sources } : m))
            } else if (data.type === 'chunk') {
              aiMessageContent += data.text
              setMessages(prev => prev.map(m => m.id === aiMessageId ? { ...m, content: aiMessageContent } : m))
            }
          } catch (e) {
            console.error('Error parsing SSE chunk', e)
          }
        }
      }
    } catch (error) {
      console.error('Chat error', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error while processing your request.'
      }])
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-120px)] -mt-6">
      <section className="flex-1 flex flex-col h-full relative">
          <div className="flex-1 overflow-y-auto space-y-6 px-4 pb-12 custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 opacity-60">
                <div className="w-16 h-16 rounded-3xl ai-bubble flex items-center justify-center text-white shadow-xl">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-on-surface">External Cortex Online</h3>
                  <p className="text-sm text-outline">Ask me anything about your documents, notes, or research.</p>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start items-start gap-4'}`}>
                {m.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-xl ai-bubble flex-shrink-0 flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-xl">smart_toy</span>
                  </div>
                )}
                <div className={`${m.role === 'user' ? 'max-w-[80%] neumorphic-card px-6 py-4 rounded-tr-none' : 'max-w-[85%] space-y-4'}`}>
                  <div className={`${m.role === 'assistant' ? 'glass-panel p-6 rounded-2xl rounded-tl-none shadow-sm' : ''}`}>
                    <p className="text-on-surface leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-start gap-4">
                <div className="w-10 h-10 rounded-xl ai-bubble flex-shrink-0 flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined text-xl">bolt</span>
                </div>
                <div className="neumorphic-card px-4 py-2.5 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-background">
            <div className="neumorphic-inset p-4 rounded-[32px] flex items-center gap-4">
              <button className="p-2 text-outline hover:text-primary transition-colors">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <div className="flex gap-2 mr-2">
                {['Quick', 'Study', 'Research'].map(m => (
                  <button 
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${mode === m ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-100'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-medium resize-none" 
                placeholder={`Type your inquiry (${mode} Mode)...`} 
                rows={1}
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-12 h-12 rounded-full ai-bubble text-white shadow-lg flex items-center justify-center transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>
        </section>

        <aside className="w-full md:w-[400px] bg-surface-container-low border-l border-white/20 flex flex-col p-6 gap-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">data_exploration</span>
            Context Panel
          </h3>
          <div className="space-y-4">
            {sources.map((s, i) => (
              <div key={i} className="neumorphic-card p-4 hover:bg-white transition-all">
                <h4 className="text-sm font-bold text-on-surface">{s.title}</h4>
                <p className="mt-2 p-2 bg-surface rounded-xl border border-dashed border-outline-variant italic text-xs text-on-surface-variant">
                  "{s.snippet}"
                </p>
              </div>
            ))}
          </div>
        </aside>
    </div>
  )
}
