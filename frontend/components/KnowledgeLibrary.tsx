'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { documentApi } from '../services/api'

interface Document {
  id: string
  name: string
  type: string
  createdAt: string
  status: string
  chunkCount: number
}

export default function KnowledgeLibrary() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDocs = async () => {
    try {
      const res = await documentApi.list()
      setDocuments(res.data)
    } catch (err) {
      console.error('Failed to fetch docs', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return
    try {
      await documentApi.delete(id)
      fetchDocs()
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-on-background mb-2 tracking-tight">Resource Library</h1>
              <p className="text-lg text-slate-500">Your digitized wisdom, structured for easy retrieval.</p>
            </div>
            <div className="flex gap-4">
              <button className="neumorphic-card px-6 py-3 rounded-2xl font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">filter_list</span>
                Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({length: 6}).map((_, i) => (
                <div key={i} className="neumorphic-flat h-48 rounded-[32px] animate-pulse"></div>
              ))
            ) : documents.map((doc) => (
              <div key={doc.id} className="neumorphic-flat p-6 rounded-[32px] group hover:-translate-y-1 transition-all duration-300 relative">
                <button 
                  onClick={() => handleDelete(doc.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/10 p-2 rounded-xl text-primary">
                    <span className="material-symbols-outlined">{doc.type.includes('pdf') ? 'picture_as_pdf' : 'description'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-on-background mb-2 line-clamp-1">{doc.name}</h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-3">
                  This document has been processed into {doc.chunkCount} semantic chunks for high-fidelity retrieval.
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-slate-500 border border-slate-100 uppercase tracking-wider">
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}
