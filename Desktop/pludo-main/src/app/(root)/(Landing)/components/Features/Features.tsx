import React from 'react';
import { Bot, Brain, Share2, MessageSquare, Database, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Custom AI Training',
      description: 'Train your AI agents with your specific data and requirements.'
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: '3D Avatars',
      description: 'Lifelike 3D avatars for enhanced user interaction and engagement.'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Multi-Platform Integration',
      description: 'Seamlessly integrate with your favorite tools and platforms.'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Natural Conversations',
      description: 'Advanced NLP for human-like interactions and responses.'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Secure Data Storage',
      description: 'Enterprise-grade security for your sensitive information.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Multi-language Support',
      description: 'Communicate with users in their preferred language.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Powerful AI capabilities to transform your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all">
              <div className="text-[#FA0787] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;