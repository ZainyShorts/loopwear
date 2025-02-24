"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileUp, X, Upload } from "lucide-react"

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FileUploadModal({ isOpen, onClose }: FileUploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    // Handle file upload logic here
    console.log("Uploading file:", file)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-zinc-800 bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Upload Excel File</DialogTitle>
        </DialogHeader>
        <div
          className={`mt-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors ${
            dragActive ? "border-white bg-zinc-900" : "border-zinc-800 bg-zinc-900/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!file ? (
            <>
              <FileUp className="h-10 w-10 text-zinc-400 mb-4" />
              <p className="text-sm text-zinc-400 text-center mb-2">
                Drag and drop your Excel file here, or click to select
              </p>
              <input type="file" className="hidden" accept=".xlsx,.xls" onChange={handleChange} id="file-upload" />
              <Button
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Select File
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Upload className="h-4 w-4" />
                {file.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-zinc-400 hover:text-white"
                  onClick={() => setFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleUpload}>Upload File</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

