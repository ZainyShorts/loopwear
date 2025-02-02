"use client"

import { MoreVertical, Settings } from 'lucide-react' 
import { useAppDispatch} from '@/redux/hooks' 
import { toggleSidebar } from '@/redux/features/chatBox/chatBox'
import { Button } from "@/components/ui/button"

interface ChatHeaderProps {
  botName?: string
  botAvatar?: string
}

export const ChatHeader = ({ botName = 'Bot', botAvatar }: ChatHeaderProps) => { 
  const dispatch = useAppDispatch();    

  return (
    <div className="flex  items-center gap-3 mt-20 md:mt-0 p-4 bg-gradient-to-r from-purple-600 to-blue-700 backdrop-blur-lg border-b rounded-t-2xl border-white/10">
      {/* Custom Avatar */}
      <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white/20 ring-2 ring-white/10 ring-offset-1 ring-offset-blue-600">
        {botAvatar ? (
          <img 
            src={botAvatar || "/placeholder.svg"} 
            alt={botName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full font-playwrite  flex items-center justify-center bg-blue-800 text-white font-medium">
            {botName?.[0] ?? 'B'}
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors" />
      </div>
      
      <div className="flex-1">
        <h2 className="text-white playwrite font-sm tracking-wide">Chat with {botName ?? 'Bot'}</h2>
        <p className="text-xs text-white/70 ">Online</p>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
