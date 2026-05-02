'use client'

import { useState } from 'react'
import { documentApi } from '../services/api'

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: { isOpen: boolean, onClose: () => void, onUploadSuccess: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  if (!isOpen) return null

  const handleUpload = async () => {
    if (files.length === 0) return
    setUploading(true)
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    
    try {
      await documentApi.upload(formData)
      onUploadSuccess()
      onClose()
      setFiles([])
    } catch (error) {
      console.error('Upload failed', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl border border-white/20 neumorphic-card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">cloud_upload</span>
          Ingest Knowledge
        </h2>
        
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center mb-6 hover:border-primary transition-colors cursor-pointer" onClick={() => document.getElementById('fileInput')?.click()}>
          <input 
            type="file" 
            id="fileInput" 
            className="hidden" 
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
          <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">upload_file</span>
          <p className="text-sm text-slate-500 text-center">
            {files.length > 0 ? `${files.length} files selected` : 'Click to select PDF or Text files'}
          </p>
          {files.length > 0 && (
            <div className="mt-2 text-[10px] text-slate-400 max-h-20 overflow-y-auto w-full text-center">
              {files.map(f => f.name).join(', ')}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => { onClose(); setFiles([]); }}
            className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button 
            disabled={files.length === 0 || uploading}
            onClick={handleUpload}
            className="flex-1 py-3 rounded-xl font-bold bg-primary text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {uploading ? 'Processing...' : 'Upload & Process'}
          </button>
        </div>
      </div>
    </div>
  )
}
