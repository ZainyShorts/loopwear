'use client'

import Image from 'next/image' 
import { useRouter } from 'next/navigation'
import { type LucideIcon } from 'lucide-react'

interface AgentCardProps {
  name: string
  role: string
  icon: LucideIcon
  avatar: string
  description: string
  features: string[]
}

export default function AgentCard({ 
  name, 
  role, 
  icon: Icon, 
  avatar, 
  description, 
  features 
}: AgentCardProps) { 
    const router = useRouter();
   const handleClick = (name:string) => { 
     router.push(`/agents/${name}`)
   }
  return (
    <div onClick={()=>handleClick(name)} className="group relative overflow-hidden bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 transition-all transform hover:-translate-y-1 cursor-pointer">
      <div className="relative h-[320px]">
        <Image 
          src={avatar} 
          alt={`Avatar for ${name}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onError={(e:React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x280?text=Avatar+Not+Found';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="relative p-6">
        <div className="absolute -top-12 left-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FA0787] text-white shadow-lg shadow-pink-500/30">
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-[#FA0787] font-medium">{role}</p>
          </div>
          
          <p className="text-gray-300 text-sm">{description}</p>
          
          <div className="space-y-2.5">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2.5 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FA0787] mt-1.5" />
                <span className="leading-tight">{feature}</span>
              </div>
            ))}
          </div>
          
          <button className="w-full bg-white/10 text-white py-2.5 rounded-full hover:bg-[#FA0787] transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

