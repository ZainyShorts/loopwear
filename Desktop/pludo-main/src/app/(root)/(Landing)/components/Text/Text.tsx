

import React from 'react';
import { Sparkles } from 'lucide-react';

const TextComponent = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80"
          alt="AI Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12135F]/80 via-[#440C73]/80 to-[#FA0787]/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6 animate-pulse">
          <Sparkles className="w-12 h-12 text-[#FA0787]" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          {/* Welcome to <span className="text-[#FA0787]">Pludo.ai</span> */}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-in-up">
          Revolutionize your workflow with <strong>Pludo.ai</strong> – the platform that empowers businesses to deploy customizable, AI-driven agents tailored to your unique needs.
        </p>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-300 mb-12 max-w-4xl mx-auto animate-zoom-in">
          <div className="p-4 bg-white/10 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-white mb-2">Intelligent Automation</h3>
            <p className="text-sm">Automate routine tasks and streamline operations effortlessly.</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-white mb-2">Customizable AI Agents</h3>
            <p className="text-sm">Design AI solutions tailored to your specific industry and business goals.</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-white mb-2">Seamless Integration</h3>
            <p className="text-sm">Integrate with your existing tools and systems for a smooth transition.</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Insights</h3>
            <p className="text-sm">Leverage AI-driven analytics to make data-backed decisions.</p>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-bounce">
          <button className="bg-[#FA0787] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#d1066f] transition-colors w-full sm:w-auto">
            Get Started Free
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto">
            Watch Demo
          </button>
        </div> */}

        {/* Additional Note */}
        <div className="mt-8 text-gray-300 text-sm max-w-3xl mx-auto animate-fade-in-delayed">
          Trusted by businesses worldwide, Pludo.ai offers cutting-edge AI solutions that enhance productivity, reduce costs, and drive innovation. Join the future of intelligent business transformation today!
        </div>
      </div>
    </div>
  );
};

export default TextComponent;
