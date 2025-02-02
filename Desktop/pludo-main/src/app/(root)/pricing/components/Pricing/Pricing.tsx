'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { pricingPlans } from './data'
import { AgentDrawer } from '../agent-drawer/AgentDrawer'



export default function PricingPlans() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [planName , setPlanName] = useState<string>('');
  const handlePurchasing = (event: React.MouseEvent<HTMLButtonElement>, name : string) => {
    event.preventDefault()  
    if (name) {
    setPlanName(name);
    setIsDrawerOpen(true) 
    } 
    else { 
      return 
    }
  }

  return (
    <>
      <div className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full mt-24 max-w-7xl mx-auto lg:max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
              Choose Your Plan
            </h2>
            <p className="mt-4 text-xl text-white/90 drop-shadow">
              Select the perfect plan for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="relative backdrop-blur-lg bg-white/10 rounded-3xl transform transition-transform duration-300 hover:scale-[1.02] group flex flex-col h-full will-change-transform"
              >
                {plan.highlight && (
                  <div className="absolute top-[-18px] left-0 right-0 mx-auto w-40 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 text-center shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-8 relative z-10 flex-grow">
                  <h3 className="text-3xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-6xl font-extrabold tracking-tight text-white">
                      {plan.price.split(' ')[0]}
                    </span>
                    <span className="ml-2 text-2xl text-white/70">{plan.price.split(' ')[1]}</span>
                  </div>
                  <p className="text-lg text-white/80 mb-8">{plan.description}</p>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-white/90">
                        <Check className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 pt-0 relative z-20">
                  <button
                    className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 cursor-pointer ${
                      plan.buttonVariant === 'gradient'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                    }`}
                    onClick={(e)=>handlePurchasing(e,plan.name)}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/80 text-lg">
              All plans include 24/7 support and a 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>

      <AgentDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} 
        planType={planName}
      />
    </>
  )
}

