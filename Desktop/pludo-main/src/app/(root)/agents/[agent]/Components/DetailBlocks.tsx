'use client';

import React, { useEffect, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';
import { AgentData } from './data';
import { MessageSquareQuote } from 'lucide-react'; 
import Image from 'next/image';

interface Agent {
  name: string;
  role: string;
  subtitle: string;
  avatar: string;
}
 
interface AgentCardsProps {
  Name: string;
}

const DetailBlocks: React.FC<AgentCardsProps> = React.memo(({ Name }) => {
  const [data, setData] = useState<Agent | null>(null);
  const [extractedColor, setExtractedColor] = useState<string>('');

  useEffect(() => {
     AgentData.forEach((agent) => {
      if (Name === agent.name) {
        setData(agent);
        const fac = new FastAverageColor();
        fac
          .getColorAsync(agent.avatar)
          .then((color) => {
            const [r, g, b] = color.value;
            const darkenedR = Math.floor(r * 0.8);
            const darkenedG = Math.floor(g * 0.8);
            const darkenedB = Math.floor(b * 0.8);
            setExtractedColor(
              `linear-gradient(165deg, 
              rgba(${darkenedR},${darkenedG},${darkenedB},1) 0%,
              rgba(${darkenedR * 0.9},${darkenedG * 0.9},${darkenedB * 0.9},0.95) 100%)`
            );
          })
          .catch((e) => console.log(e));
      }
    });
  }, [Name]);

  if (!data) return null;

  return (
    <div className="container mx-auto p-6 md:p-8">
      <div className="grid lg:grid-cols-2 gap-6">
        <div
          className="relative overflow-hidden rounded-[20px] p-8 min-h-[600px]"
          style={{ background: extractedColor }}
        >
          <div className="absolute top-8 left-8">
            <MessageSquareQuote className="w-12 h-12 text-white/20" />
          </div>
          <div className="mt-16 mb-8">
            <h2 className="text-3xl font-bold text-white">
              <span className="text-white">
                {data.name}, {data.role}
              </span>
            </h2>
          </div>
          <div className="relative backdrop-blur-[20px] rounded-2xl bg-white/10 p-6 max-w-[80%]">
            <div className="flex items-center gap-2 mb-4">
              <span role="img" aria-label="document" className="text-2xl">
                📝
              </span>
              <span className="font-medium text-white">{data.role}</span>
            </div>
            <div className="space-y-2">
              <div className="text-white/80 text-sm">Contract Generated:</div>
              <p className="text-white text-sm leading-relaxed">
                &quot;This contract outlines the terms of our agreement. It includes the scope of
                products/services, pricing, delivery timelines, and the mutual responsibilities
                involved.&quot;
              </p>
            </div>
          </div>
          <Image
            width={200}
            height={200}
            src={data.avatar}
            alt={data.name}
            className="absolute bottom-0 right-0 w-40 h-auto lg:w-72 transform translate-y-4"
          />
        </div>
        <div className="relative overflow-hidden rounded-[20px] p-8 bg-black min-h-[600px]">
          <div className="absolute top-8 left-8">
            <MessageSquareQuote className="w-12 h-12 text-white/20" />
          </div>
          <div className="mt-16 mb-8">
            <h2 className="text-3xl font-bold">
              <span className="text-[#b884f3]">{data.name}</span>
              <span className="text-white">, {data.subtitle}</span>
            </h2>
          </div>
          <div className="relative backdrop-blur-[20px] rounded-2xl bg-white/10 p-6 max-w-[80%]">
            <div className="flex items-center gap-2 mb-4">
              <span role="img" aria-label="email" className="text-2xl">
                📨
              </span>
              <span className="font-medium text-white">Follow-Up Email Generator</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              &quot;It was great connecting earlier. I&#39;ve thought further about our conversation,
              and there&#39;s an additional thought that might benefit your current
              strategy...&quot;
            </p>
          </div>
          <Image
            width={200}
            height={200}
            src={data.avatar}
            alt={data.name}
            className="absolute bottom-0 right-0 w-40 h-auto lg:w-72 transform translate-y-4"
          />
        </div>
      </div>
    </div>
  );
});

DetailBlocks.displayName = 'DetailBlocks';

export default DetailBlocks;
