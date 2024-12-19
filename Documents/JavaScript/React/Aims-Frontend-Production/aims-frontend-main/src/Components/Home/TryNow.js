import React, { useContext } from "react";

const TryNowDemo = () => {
  
 

  const services = [
    {
      icon: '📅', // Calendar for scheduling
      title: 'AIMS Scheduler',
      description: 'Appointment scheduling with automatic text, email, and review reminders',
      buttonLabel: 'Try Now',
      url: "/signup"
    },
    {
      icon: '🎤', // Note-taking
      title: 'AIM Scribe',
      description: 'AI-powered medical note-taking system that structures patient visits into Medical Notes and/or SOAP notes',
      buttonLabel: 'Try Now',
      url: "/signup"
    },
    {
      icon: '📋', // Intake forms
      title: 'AIMS Intake forms',
      description: 'Automates patient intake using voice input and OCR for IDs and insurance cards, eliminating the need for lengthy intake forms',
      buttonLabel: 'Try Now',
      url: '/signup'
    },
    {
      // icon: '🎤', // Microphone for speech recognition
      title: 'AIM Speech Demo',
      description: 'Real-time voice-to-text technology converting speech into accurate medical records Pocket version DEMO',
      buttonLabel: 'Try Now',
      url: "https://www.aidemoscriber.com"
    },
    
    {
      icon: '👥', // Team collaboration
      title: 'AIMS TEAMs talk',
      description: 'Staff meeting summary and task delegation with email reminders for comprehensive documentation of decisions, action items, or company logistics',
      buttonLabel: 'Try Now',
      url: "/signup"
    },
    {
      icon: '🩻', // X-ray for diagnostic tool
      title: 'AIMS Insight',
      description: 'AI diagnostic tool for X-rays/MRIs, offering analysis, treatment suggestions, and medical queries',
      buttonLabel: 'Try Now',
      url: '/signup'
    },
    
    {
      icon: '🤖', // AI Chatbot
      title: 'AIMS Chatbot',
      description: 'Chatbot for doctors providing assistance with dosages, treatments, and medical queries',
      buttonLabel: 'Try Now',
      url: '/signup'
    },
    {
      icon: '💼', // Billing
      title: 'Advanced Medical Billing',
      description: 'Pre-insurance billing analysis ensures code accuracy and compliance checks',
      buttonLabel: 'Try Now',
      url: '/signup'
    },
    {
      icon: '📜', // Legal documents
      title: 'AIMS AttorneyMindAI',
      description: 'Transcribes legal discussions, creating summaries for case building and contract preparation',
      buttonLabel: 'Try Now',
      url: "/signup"
    },
    // {
    //   icon: '🤖', // AI tools
    //   title: 'CaseAIMS',
    //   description: 'Provides attorneys with AI-powered tools for document preparation and case management drafts',
    //   buttonLabel: 'Try Now',
    //   url: "/signup"
    // },
   
    // {
    //   icon: '💊', // Medicine for assistance
    //   title: 'AIMS Assist',
    //   description: 'Virtual assistant providing quick information on dosages, treatments, and medical support to providers',
    //   buttonLabel: 'Try Now',
    //   url: "/signup"
    // },
    
    // {
    //   icon: '💊', // Medicine for prescriptions
    //   title: 'AIMS RxPress',
    //   description: 'Prescription generation with immediate transmission to pharmacies and drug interaction checks',
    //   buttonLabel: 'Try Now',
    //   url: '/signup'
    // },
    
    // {
    //   icon: '📊', // Billing analysis
    //   title: 'AIMS Biller',
    //   description: 'Analyzes billing codes to ensure insurance compliance before submission',
    //   buttonLabel: 'Try Now',
    //   url: '/signup'
    // },
    
];

const links = [

  {
    icon: 'https://img.icons8.com/fluency/48/gmail.png', // Gmail icon
    url: 'mailto:jasmelacosta@gmail.com',
  },
  {
    icon: 'https://img.icons8.com/arcade/64/youtube-squared.png', // YouTube icon
    url: 'https://www.youtube.com/@AIscribers',
  },
  {
    icon: 'https://img.icons8.com/arcade/64/linkedin.png', // YouTube icon
    url: 'https://www.linkedin.com/company/ai-medical-scribers/',
  },
  {
    icon: 'https://img.icons8.com/color/48/instagram-new--v1.png', // Insta icon
    url: 'https://www.instagram.com/aiscribers/',
  },
 
];



  const navigater = (path) => {
    if (path === '/') {
      alert('available right now.');
    } else {
      window.location.href = path;
    }
  }

  return (
    <section className="dark:bg-slate-900 p-8 flex flex-col justify-around items-center h-[100%] ">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {services.map((service, index) => (
        <div key={index} className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-gray-100">
          {index === 3 && (
            <div className="flex justify-center items-center">
              <img src="logo.png" className="w-12 h-12" alt="logo" />
              <div className="text-4xl">{service.icon}</div>
            </div>
          )}
          {index !== 3 && <div className="text-4xl mb-4">{service.icon}</div>}
          <h3 className="text-2xl mb-2 dark:text-white text-black">{service.title}</h3>
          <p className="text-base mb-4 dark:text-gray-400">{service.description}</p>
          <button onClick={() => navigater(service.url)} className="bg-indigo-600 text-white border-none py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-700">
            {service.buttonLabel}
          </button>
    {/* New Row for Links */}
    <div className="mt-8 flex justify-center items-center space-x-4">
      {links.map((link, index) => (
        <img  key={index} onClick={() => navigater(link.url)} src={link.icon} target="_blank" rel="noopener noreferrer" className="h-6 w-6 cursor-pointer text-4xl text-gray-700 hover:text-indigo-600"
        />
      ))}
    </div>
        </div>
      ))}
    </div>

  </section>
  );
};

export default TryNowDemo;

