import { NextRequest, NextResponse } from 'next/server'

// Mock analytics data (in production, this would come from a database)
const mockAnalytics = {
  learningTrends: [
    { date: '2024-01-01', topics: 5, interactions: 23 },
    { date: '2024-01-02', topics: 7, interactions: 31 },
    { date: '2024-01-03', topics: 4, interactions: 18 },
    { date: '2024-01-04', topics: 8, interactions: 42 },
    { date: '2024-01-05', topics: 6, interactions: 28 },
    { date: '2024-01-06', topics: 9, interactions: 35 },
    { date: '2024-01-07', topics: 5, interactions: 22 },
  ],
  topicDistribution: [
    { topic: 'Machine Learning', count: 45, percentage: 28 },
    { topic: 'Quantum Computing', count: 32, percentage: 20 },
    { topic: 'AI Ethics', count: 28, percentage: 17 },
    { topic: 'Data Science', count: 25, percentage: 15 },
    { topic: 'Neural Networks', count: 18, percentage: 11 },
    { topic: 'Other', count: 14, percentage: 9 },
  ],
  memoryHeatmap: Array.from({ length: 7 }, (_, week) =>
    Array.from({ length: 24 }, (_, hour) => ({
      week,
      hour,
      activity: Math.random() * 100,
    }))
  ),
  knowledgeGaps: [
    { topic: 'Advanced Calculus', severity: 'high', documents: 2 },
    { topic: 'Distributed Systems', severity: 'medium', documents: 5 },
    { topic: 'Cryptography', severity: 'low', documents: 8 },
  ],
  insights: [
    'You\'ve shown increased interest in AI ethics over the past month',
    'Consider exploring quantum algorithms - you have foundational knowledge',
    'Your learning pattern peaks between 9-11 AM',
    'You might benefit from connecting machine learning concepts with your quantum computing notes',
  ],
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    switch (type) {
      case 'trends':
        return NextResponse.json(mockAnalytics.learningTrends)
      case 'topics':
        return NextResponse.json(mockAnalytics.topicDistribution)
      case 'heatmap':
        return NextResponse.json(mockAnalytics.memoryHeatmap)
      case 'gaps':
        return NextResponse.json(mockAnalytics.knowledgeGaps)
      case 'insights':
        return NextResponse.json(mockAnalytics.insights)
      default:
        return NextResponse.json(mockAnalytics)
    }
  } catch (error) {
    console.error('Analytics Error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}</content>
<parameter name="filePath">e:\Projects_Local_Machine\stitch_aura_knowledge_os\stitch_aura_knowledge_os\app\api\analytics\route.ts