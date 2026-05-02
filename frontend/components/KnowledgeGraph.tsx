'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { documentApi } from '../services/api'

interface Node {
  id: string
  name: string
  x: number
  y: number
  type: string
}

export default function KnowledgeGraph() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await documentApi.list()
        // Simple random placement for the graph demonstration
        const mappedNodes = res.data.map((doc: any, i: number) => ({
          id: doc.id,
          name: doc.name,
          type: doc.type,
          x: 200 + Math.random() * 600,
          y: 100 + Math.random() * 400
        }))
        setNodes(mappedNodes)
      } catch (err) {
        console.error('Failed to fetch nodes', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNodes()
  }, [])

  return (
    <div className="h-[calc(100vh-120px)] relative overflow-hidden -mx-6 -mt-6 rounded-3xl bg-[#F0F2F5]">
        {/* Graph Canvas */}
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full">
            {nodes.map((node, i) => (
              nodes.slice(i + 1).map((otherNode) => (
                <line 
                  key={`${node.id}-${otherNode.id}`}
                  x1={node.x} y1={node.y} 
                  x2={otherNode.x} y2={otherNode.y} 
                  stroke="#4b53bb" strokeOpacity="0.1" strokeWidth="1"
                />
              ))
            ))}
            
            {nodes.map((node) => (
              <motion.g 
                key={node.id}
                drag
                dragMomentum={false}
                onDrag={(e, info) => {
                  setNodes(prev => prev.map(n => n.id === node.id ? { ...n, x: n.x + info.delta.x, y: n.y + info.delta.y } : n))
                }}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer"
              >
                <circle cx={node.x} cy={node.y} r="30" fill="white" className="shadow-lg" />
                <foreignObject x={node.x - 30} y={node.y - 30} width="60" height="60">
                  <div className="flex flex-col items-center justify-center h-full text-center p-1">
                    <span className="material-symbols-outlined text-primary text-sm">description</span>
                    <span className="text-[8px] font-bold text-on-surface truncate w-full">{node.name}</span>
                  </div>
                </foreignObject>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <motion.aside 
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            className="absolute top-8 right-8 bottom-8 w-80 glass-panel rounded-3xl p-6 shadow-2xl z-20 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <div className="p-2 bg-purple-100 rounded-xl">
                <span className="material-symbols-outlined text-purple-600">lightbulb</span>
              </div>
              <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-black/5 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedNode.name}</h3>
              <p className="text-sm text-outline leading-relaxed">
                Metadata and AI-discovered relationships for this node are being synchronized.
              </p>
            </div>
            <div className="mt-auto flex gap-2">
              <button className="flex-1 neumorphic-button py-2 rounded-xl text-xs font-bold">View Source</button>
            </div>
          </motion.aside>
        )}

        {/* Graph Controls */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-4">
          <div className="neumorphic-card p-2 rounded-2xl flex flex-col gap-2">
            <button className="neumorphic-button p-2 rounded-xl">
              <span className="material-symbols-outlined">zoom_in</span>
            </button>
            <button className="neumorphic-button p-2 rounded-xl">
              <span className="material-symbols-outlined">zoom_out</span>
            </button>
          </div>
        </div>
    </div>
  )
}
