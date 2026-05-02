import AIAgentsDashboard from '../../components/AIAgentsDashboard'
import Chat from '../../components/Chat'

export default function AgentsPage() {
  return (
    <div className="space-y-12">
      <Chat />
      <AIAgentsDashboard />
    </div>
  )
}