import { Facebook, Instagram, Linkedin, Mail, MessageSquare } from 'lucide-react';
import React from 'react';

export const integrationData = [
  {
    icon: React.createElement(Facebook, { className: "w-8 h-8" }),
    name: "Facebook",
    isConnected: true,
    description: "Connect with your audience through Facebook powerful social media platform. Share updates, stories, and engage with your community.",
  },
  {
    icon: React.createElement(Instagram, { className: "w-8 h-8" }),
    name: "Instagram",
    isConnected: false,
    description: "Share your visual story with Instagram integration. Post photos, and stories, and all kind of reels directly from your dashboard.",
  },
  {
    icon: React.createElement(Linkedin, { className: "w-8 h-8" }),
    name: "LinkedIn",
    isConnected: true,
    description: "Build your professional network and share business updates through LinkedIn professional platform.",
  },
  {
    icon: React.createElement(MessageSquare, { className: "w-8 h-8" }),
    name: "WhatsApp",
    isConnected: false,
    description: "Stay connected with your customers through WhatsApps messaging platform. Enable real-time communication and support.",
  },
  {
    icon: React.createElement(Mail, { className: "w-8 h-8" }),
    name: "Email",
    isConnected: true,
    description: "Streamline your email communications with our email integration. Send newsletters, updates, and automated responses.",
  },
];
