'use client'

import { useState, useEffect } from 'react'
import { insightApi } from '../../services/api'

export default function InsightsPage() {
  const [insightData, setInsightData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await insightApi.getLatest()
        setInsightData(res.data)
      } catch (error) {
        console.error('Failed to fetch insights', error)
        // Fallback dummy data if endpoint fails
        setInsightData({
          message: 'Synthesis generated from your recent interactions.',
          trends: ['Machine Learning', 'Cognitive Architectures', 'React Performance']
        })
      } finally {
        setLoading(false)
      }
    }
    fetchInsights()
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto w-full">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Cognitive Insights</h1>
        <p className="text-lg text-outline mt-2">AI-generated synthesis of your learning patterns and knowledge gaps.</p>
      </header>

      {loading ? (
        <div className="h-64 neumorphic-flat rounded-[24px] animate-pulse"></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="neumorphic-flat p-8 rounded-[32px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="text-2xl font-bold">Latest Synthesis</h3>
            </div>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              {insightData?.insights || 'You have been focusing heavily on cognitive architectures and generative models recently. Consider reviewing your older notes on React hooks to maintain a balanced full-stack context.'}
            </p>
          </div>

          <div className="neumorphic-flat p-8 rounded-[32px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <h3 className="text-2xl font-bold">Emerging Trends</h3>
            </div>
            <ul className="space-y-4">
              {(insightData?.trendingTopics || ['Generative AI Integration', 'Vector Search', 'Micro-interactions']).map((trend: string, i: number) => (
                <li key={i} className="flex items-center gap-4 p-4 rounded-2xl neumorphic-inset">
                  <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-xs font-bold text-outline">#{i + 1}</span>
                  <span className="font-bold text-on-surface">{trend}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
