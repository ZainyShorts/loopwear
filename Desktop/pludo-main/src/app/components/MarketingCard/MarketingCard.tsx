'use client'

import { MarketingSectionProps } from './types' 
import Image from 'next/image' 
import { useRouter } from 'next/navigation'

export default function MarketingSection({ 
  mainCard,
  subCard1, 
  subCard2,
}: MarketingSectionProps) { 
  const router = useRouter(); 
  const handleNavigate = (title:string) => { 
   router.push(`/agents/${title}`)
  }
  return (
            
    <div className="w-full flex flex-col items-center justify-center p-4 space-y-4">
      {/* Main Card */}
      <div className="rounded-3xl bg-white/10 backdrop-blur-sm pl-4 pt-4 pr-4 pb-0  md:pl-6 md:pt-6 md:pr-6 md:pb-0 shadow-lg border border-white/30 overflow-hidden relative h-auto w-full lg:w-[90%] flex flex-col md:flex-row">
        <div className="pl-8 pt-8 pr-8 pb-0 flex flex-col md:flex-row items-center justify-between flex-1">
          {/* Text Content */}
          <div className="flex md:pl-16 flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
              {mainCard.title}
            </h2>
            <p className="text-lg md:text-3xl mb-6 font-semibold max-w-[300px] md:max-w-[400px] text-white">
              {mainCard.description}
            </p>
            <ul className="list-none space-y-2 mb-6">
              {mainCard.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start p-1">
                  <span className="text-green-400 mr-2">•</span>
                  <span className="text-gray-200 text-sm md:text-base">{point}</span>
                </li>
              ))}
            </ul>
            <button onClick={()=>handleNavigate(mainCard.title)} className="px-4 py-2 rounded-full text-sm font-medium border border-white text-white hover:bg-white/10 transition-colors">
              Learn more
            </button>
          </div>

          <div className="flex-1 flex p-0 items-center justify-end mt-8 md:mt-0">
          <Image
  width={500}
  height={500}
  src={mainCard.image}
  alt={mainCard.title}
  quality={100}
  sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
  className="w-auto h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-contain"
/>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 w-full lg:w-[90%]">
        <div 
          className="bg-white/10 backdrop-blur-md rounded-3xl pl-4 pt-4 pr-4 pb-0  md:pl-6 md:pt-6 md:pr-6 md:pb-0 shadow-lg border border-white/30 overflow-hidden relative flex flex-col"
        >
          <div className="pl-8 pr-8 pt-8 pb-0 flex flex-col flex-1">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-3 text-white">
                {subCard1.title}
              </h2>
              <p className="text-lg mb-6 max-w-[280px] text-white">
                {subCard1.description}
              </p>
              <ul className="list-none space-y-2 mb-6">
                {subCard1.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start p-1">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span className="text-gray-200 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <button onClick={()=>handleNavigate(subCard1.title)} className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-white hover:bg-white/10 transition-colors">
                Learn more
              </button>
            </div>
            <div className="flex-1 flex items-end justify-center mt-8">
              <Image
                src={subCard1.image}
                height={300} 
                width={300}
                alt={subCard1.title}
                className="w-auto h-[300px] md:h-[500px] object-contain"
              ></Image>
            </div>
          </div>
        </div>

        {/* Sub Card 2 */}
        <div 
          className="rounded-3xl bg-white/10 backdrop-blur-md pl-4 pt-4 pr-4 pb-0  md:pl-6 md:pt-6 md:pr-6 md:pb-0 shadow-lg border border-white/30 overflow-hidden relative flex flex-col"
        >
          <div className="pl-8 pr-8 pt-8 pb-0 flex flex-col flex-1">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-3 text-white">
                {subCard2.title}
              </h2>
              <p className="text-lg mb-6 max-w-[280px] text-white">
                {subCard2.description}
              </p>
              {/* Key Points */}
              <ul className="list-none space-y-2 mb-6">
                {subCard2.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start p-1">
                    <span className="text-blue-400 mr-2 ">•</span>
                    <span className="text-gray-200 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <button onClick={()=>handleNavigate(subCard2.title)} className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-white hover:bg-white/10 transition-colors">
                Learn more
              </button>
            </div>
            <div className="flex-1 flex items-end justify-center mt-10">
            <Image
                src={subCard2.image}
                height={300} 
                width={300}
                alt={subCard2.title}
                className="w-auto h-[300px] md:h-[500px] object-contain"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

