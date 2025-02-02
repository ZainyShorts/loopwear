'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactMic } from 'react-mic'
import { Mic, ImageIcon, Send, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onSendImage: (image: File) => void
  onSendAudio: (audio: Blob) => void
  allowImage: boolean
  allowAudio: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendImage,
  onSendAudio,
  allowImage,
  allowAudio,
}) => {
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resetTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px'
    }
  }, [])

  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      resetTextareaHeight()
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`
    }
  }, [resetTextareaHeight])

  useEffect(() => {
    if (!input.trim()) {
      resetTextareaHeight()
    }
  }, [input, resetTextareaHeight])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    adjustTextareaHeight()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  const handleSendMessage = () => {
    if (input.trim() || selectedImage) {
      if (input.trim()) {
        onSendMessage(input)
      }
      if (selectedImage) {
        onSendImage(selectedImage.file)
        setSelectedImage(null)
      }
      setInput('')
      resetTextareaHeight()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage({
        file,
        preview: URL.createObjectURL(file)
      })
    }
  }

  const handleCancelImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview)
      setSelectedImage(null)
    }
  }

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
  }

  const onData = (recordedBlob: Blob) => {
    // Visualization data
  }

  const onStop = (recordedBlob: { blob: Blob; }) => {
    onSendAudio(recordedBlob.blob)
  }

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 w-full max-w-7xl mx-auto"
      >
        <div className="group bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 transition-all duration-300 hover:border-white/20">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3"
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden group/image">
                  <img 
                    src={selectedImage.preview || "/placeholder.svg"} 
                    alt="Selected" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200" />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 w-5 h-5 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-200"
                    onClick={handleCancelImage}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex items-center gap-2 p-2 w-full">
            {allowImage && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-full hover:bg-white/10"
                  >
                    <label className="cursor-pointer">
                      <ImageIcon className="w-5 h-5 text-white/60 hover:text-white/80 transition-colors duration-200" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white/10 backdrop-blur-lg border-white/10">
                  <p>Upload Image</p>
                </TooltipContent>
              </Tooltip>
            )}
            {allowAudio && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-full transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-500/20 hover:bg-red-500/30' 
                        : 'hover:bg-white/10'
                    }`}
                    onMouseDown={handleStartRecording}
                    onMouseUp={handleStopRecording}
                    onTouchStart={handleStartRecording}
                    onTouchEnd={handleStopRecording}
                  >
                    <Mic className={`w-5 h-5 transition-colors duration-200 ${
                      isRecording 
                        ? 'text-red-500' 
                        : 'text-white/60 hover:text-white/80'
                    }`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white/10 backdrop-blur-lg border-white/10">
                  <p>{isRecording ? 'Recording...' : 'Record Audio'}</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-grow bg-transparent border-none text-white placeholder-white/40 resize-none h-[40px] max-h-[150px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 py-5 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-transparent w-full md:w-[calc(100%-120px)] lg:w-[calc(100%-160px)] xl:w-[calc(100%-200px)]"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="h-9 w-9 bg-gradient-to-r from-purple-500/80 to-fuchsia-500/80 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <ReactMic
          record={isRecording}
          className="hidden"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
      </motion.div>
    </TooltipProvider>
  )
}

