'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatInput } from '../Input/Input' 
import { Sparkles } from 'lucide-react' 
import { sendMessage } from '@/redux/features/openAI/messageSlice' 
import { useAppDispatch , useAppSelector } from '@/redux/hooks'
import { ChatHeader } from '../Chat-header/Chat-header'
import type { ChatInterfaceProps, Message } from '../types/chat'
import { TypingLoader } from '../typing-Loader/Typing-Loader'   
import { useAIFunctions } from './Functions/Functions' 
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
export const ChatInterface = ({ botName, botAvatar , mainAgent}: ChatInterfaceProps) => {
  const dispatch = useAppDispatch();   
  const {createThread ,createMessage,getRun,getResponse,getReply , deleteThread} = useAIFunctions();
  const messages = useAppSelector((state : any ) => state.message.messages);
  const [isTyping, setIsTyping] = useState<boolean>(false); 
  const [subAgent , setSubAgent] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);    
  const [threadID , setThreadID] = useState<string>('');  

  useEffect(() => {
    if (threadID === '') {
      const create = async () => {
        const id = await createThread();
        setThreadID(id); 
      };
      create(); 
    }
  }, [threadID]);  
   
  useEffect(()=>{ 
    if (botName) { 
      function formatBotName(name: string | undefined): string {
        if (!name) return '';
        return name.replace(/\s+/g, '_').toUpperCase();
    }    
    setSubAgent(formatBotName(botName)); 
  }

  })


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendImage = (image: File) => {
    console.log('Image:', image)
  }

  const handleSendAudio = (audio: Blob) => {
    console.log('Audio:', audio)
    const url = URL.createObjectURL(audio)
    const audio_element = new Audio(url)
    audio_element.play()
  }

  const handleSendMessage = async (message: string) => {
    console.log(mainAgent , subAgent);
    const userMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'user',
        content: message.trim()
      } 
      dispatch(sendMessage(userMessage)); 
      const data = { 
        message: message, 
        threadId: threadID,
      }
      setIsTyping(true)
      await createMessage(data);  
     const runId =  await getRun(mainAgent as string , subAgent as string ,threadID as string); 
       let GetResponse = await getResponse(threadID as string, runId as string); 
           while (GetResponse != 'completed' && GetResponse != 'cancelled' && GetResponse != 'failed' && GetResponse != 'expired') {  
             GetResponse = await getResponse(threadID as string , runId as string); 
           }  
           const Reply = await getReply(threadID as string); 
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          content: Reply.trim()
        }
        dispatch(sendMessage(botMessage))
        setIsTyping(false)
    }
     
    useEffect(() => {
  
      return () => {
        deleteThread(threadID as string);
      };
    }, []);

  return (
    <div className="flex flex-col w-full md:w-[80%] h-[95vh] bg-gradient-to-b from-purple-950 via-gray-950 to-black">
      <div className="absolute lg:ml-64 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Messages Area with enhanced scrollbar */}
      <ChatHeader botName={botName} botAvatar={botAvatar}  />
      <div className="flex-1 p-8 overflow-y-auto space-y-4 relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20"> 

        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mt-10 justify-center space-y-4"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center backdrop-blur-xl border border-white/10">
                <Sparkles className="w-12 h-12 text-white/40 animate-pulse" />
              </div>
              <p className="text-lg font-light tracking-wide text-white/60 bg-white/5 px-6 py-2 rounded-full backdrop-blur-xl border border-white/10">
                Your messages will be shown here
              </p>
            </motion.div>
          ) : (
            messages.map((msg: Message, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4  rounded-2xl backdrop-blur-xl shadow-lg transform transition-all duration-200 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-white/95 to-white/90 text-black ml-auto hover:shadow-purple-500/10'
                      : 'bg-gradient-to-br from-gray-600/90 to-gray-700/80 text-white mr-auto hover:shadow-purple-500/10'
                  }`}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-light"
                  >
                   <Markdown remarkPlugins={[remarkGfm]} className={'font-serif'}  children={msg.content} />
                            </motion.p>
                </div>
              </motion.div>
            ))
            
            
          )}
        </AnimatePresence>
        {isTyping && <TypingLoader />}
        <div ref={chatEndRef} />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 bg-gradient-to-t from-black/40 to-black/20 backdrop-blur-2xl border-t border-white/5"
      >
        <div className="flex items-end gap-2 w-full mx-auto">
          <div className="flex-1 relative">
            <ChatInput
              onSendMessage={handleSendMessage}
              onSendImage={handleSendImage}
              onSendAudio={handleSendAudio}
              allowImage={false}
              allowAudio={false}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

