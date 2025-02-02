import React from 'react';
import { Facebook, MessageCircle, Cloud } from 'lucide-react';

const integrationCategories = [
  {
    title: 'Social Media',
    icon: <Facebook className="w-8 h-8" />,
    platforms: [
      { name: 'Facebook', features: ['Schedule posts', 'Analyze engagement', 'Manage ads'] },
      { name: 'Instagram', features: ['Schedule content', 'Monitor comments', 'Track analytics'] },
      { name: 'LinkedIn', features: ['Automate posts', 'Network growth', 'Lead generation'] }
    ]
  },
  {
    title: 'Communication',
    icon: <MessageCircle className="w-8 h-8" />,
    platforms: [
      { name: 'WhatsApp', features: ['Auto-responses', 'Bulk messaging', 'Chat management'] },
      { name: 'SMS', features: ['Notifications', '2FA', 'Marketing campaigns'] },
      { name: 'Email', features: ['Automated flows', 'Template management', 'Analytics'] }
    ]
  },
  {
    title: 'Cloud Services',
    icon: <Cloud className="w-8 h-8" />,
    platforms: [
      { name: 'Google Drive', features: ['Auto-sync', 'File management', 'Collaboration'] },
      { name: 'Dropbox', features: ['File sharing', 'Backup', 'Version control'] },
      { name: 'OneDrive', features: ['Document sync', 'Team sharing', 'Security'] }
    ]
  }
];

const Integrations = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful Integrations</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect your AI agents with your favorite platforms and tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {integrationCategories.map((category, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-[#FA0787]">{category.icon}</div>
                <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="space-y-6">
                {category.platforms.map((platform, pIndex) => (
                  <div key={pIndex} className="border-t border-white/10 pt-4">
                    <h4 className="text-lg font-semibold text-white mb-2">{platform.name}</h4>
                    <ul className="space-y-2">
                      {platform.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-gray-300 text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FA0787]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;