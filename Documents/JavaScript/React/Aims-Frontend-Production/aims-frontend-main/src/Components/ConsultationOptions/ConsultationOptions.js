/*eslint-disable*/
import React, { useContext } from "react";
import { GlobalStateContext } from "../../Context/GlobalStateContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const ConsultionOptions = () => {
  const { navigate } = useContext(GlobalStateContext);
  const { patientId } = useParams();
  const services = [
    // {
    //   icon: '🎤',
    //   title: 'Upload an Audio File',
    //   description: 'Easily generate a medical note by uploading an audio file',
    //   buttonLabel: 'Generate Now',
    //   url: `/Consultation/UploadAudio/${patientId}`
    // },
    // {
    //   icon: '🗓️',
    //   title: 'Use Medical Scribe with voice commands',
    //   description: 'Directly speak into the system and scribe will document everything for you in real time',
    //   buttonLabel: 'Speak Now',
    //   url: `/Consultation/RecordAudio/${patientId}`
    // },
    {
      icon: '🔄',
      title: 'Copy and Paste Text',
      description: 'The system will format and organize text into a professional medical note for you.',
      buttonLabel: 'Paste Text',
      url: `/Consultation/TextToReport/${patientId}`
    },
    {
      "icon": "📝",
      "title": "Live Speech to Text Transcription",
      "description": "Easily transcribe your consultations into text in real-time, allowing for efficient note-taking and documentation. Download detailed transcripts of patient consultations for accurate record-keeping and review.",
      "buttonLabel": "Transcribe",
      "url": `/Consultation/Transcribe/${patientId}`
    },
    {
      icon: '💻',
      title: 'Online Consultation via Meeting',
      description: 'Conduct live consultations with patients via video conferencing. The system will capture the details of the session for further documentation.',
      buttonLabel: 'Start Meeting',
      url: `/Consultation/Meeting/${patientId}`
    },
    {
      icon: '📄',
      title: 'Manual Report Creation (AIMS Template)',
      description: 'Create detailed medical reports manually using the AIMS template, allowing you to customize and organize the information for precise documentation.',
      buttonLabel: 'Create Report',
      url: `/SOAPnotes/${patientId}?mode=Manual`
    }
    
  ];
 
  const navigater = (path) => {
    if (path === '/') {
      alert('Available right now.');
    } else {
      navigate(path);
    }
  } 
  
  return (
    <section className="dark:bg-slate-900 p-8 flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4 w-full max-w-6xl"> 
        {patientId !== 'Quick' ? ( 
          services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-4 md:p-6 text-center flex flex-col justify-between"
              style={{ minHeight: '180px' }} // Slightly smaller box height
            >
              <div>
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-xl md:text-2xl mb-2 dark:text-white text-black">{service.title}</h3>
                <p className="text-sm md:text-base mb-4 dark:text-gray-400">{service.description}</p>
              </div>
              <button
                onClick={() => navigater(service.url)}
                className="bg-indigo-600 text-white py-2 px-4 md:py-3 md:px-6 mx-auto rounded-lg w-[60%] hover:bg-indigo-700"
                style={{ marginTop: 'auto' }}
              >
                {service.buttonLabel}
              </button>
            </div>
          )) 
        ):  ( 
          services.slice(0,2).map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-4 md:p-6 text-center flex flex-col justify-between"
              style={{ minHeight: '180px' }} 
            >
              <div>
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-xl md:text-2xl mb-2 dark:text-white text-black">{service.title}</h3>
                <p className="text-sm md:text-base mb-4 dark:text-gray-400">{service.description}</p>
              </div>
              <button
                onClick={() => navigater(service.url)}
                className="bg-indigo-600 text-white py-2 px-4 md:py-3 md:px-6 mx-auto rounded-lg w-[60%] hover:bg-indigo-700"
                style={{ marginTop: 'auto' }}
              >
                {service.buttonLabel}
              </button>
            </div>
          )) 
        )
        }
      </div>
    </section>
  );
};

export default ConsultionOptions;
