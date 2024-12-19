import React from 'react'

const Services = () => {
  return (
    <>
        <div id="services" className="dark:bg-slate-900">
              <div className="mx-auto">
    <div className="flex flex-col gap-3 items-center p-4 sm:p-3 md:p-8 lg:p-12">
      <h1 className="text-indigo-600 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">SERVICES</h1>

    </div>
  <h1 className="text-base text-center sm:text-xl md:text-2xl dark:text-white">What we are offering in aims?</h1>
            <div className="px-4 md:px-24 gap-4 flex flex-wrap justify-evenly items-center">
               <div className="w-full md:w-5/12 lg:w-4/12 shadow-xl rounded-lg p-5 my-3 flex flex-col gap-3">
                <img className="w-10" src="/icon.png" alt="Icon" />
                <h1 className="font-medium text-lg dark:text-white">API Integration for EHR</h1>
                <p className="text-gray-400">
                    Integrate your EHR with AIMS using your own API and view all patient reports seamlessly.
                </p>
              </div>
               <div className="w-full md:w-5/12 lg:w-4/12 shadow-xl rounded-lg p-5 my-3 flex flex-col gap-3">
                <img className="w-10" src="/icon.png" alt="Icon" />
                <h1 className="font-medium text-lg dark:text-white">Email Patient Reports</h1>
                <p className="text-gray-400">
                  Doctors can effortlessly email patient reports directly from AIMS, improving efficiency and patient care.
                </p>
              </div>
              <div className="w-full md:w-5/12 lg:w-4/12 shadow-xl rounded-lg p-5 my-3 flex flex-col gap-3">
                <img className="w-10" src="/icon.png" alt="Icon" />
                <h1 className="font-medium text-lg dark:text-white">Voice-Based Patient Registration</h1>
                <p className="text-gray-400">
                  Allow patients to register using their voice, eliminating the need for typing, with OCR form intake options available.
                </p>
              </div>
              <div className="w-full md:w-5/12 lg:w-4/12 shadow-xl rounded-lg p-5 my-3 flex flex-col gap-3">
                <img className="w-10" src="/icon.png" alt="Icon" />
                <h1 className="font-medium text-lg dark:text-white">Speech to Text</h1>
                <p className="text-gray-400">
                  Accurate live transcription in multiple languages, including French, Russian, English, and Spanish, enhancing doctor-patient communication.
                </p>
              </div>
              <div className="w-full md:w-5/12 lg:w-4/12 shadow-xl rounded-lg p-5 my-3 flex flex-col gap-3">
                <img className="w-10" src="/icon.png" alt="Icon" />
                <h1 className="font-medium text-lg dark:text-white">Meeting Report Generation</h1>
                <p className="text-gray-400">
                  Generate detailed meeting reports to enhance communication and collaboration among healthcare teams.
                </p>
              </div>
              <div className="w-full md:w-5/12 lg:w-4/12 shadow-xl rounded-lg p-5 my-3 flex flex-col gap-3">
                <img className="w-10" src="/icon.png" alt="Icon" />
                <h1 className="font-medium text-lg dark:text-white">Patient Report Generation</h1>
                <p className="text-gray-400">
                  Generate detailed reports in DOCX and PDF formats with customizable templates, including clinic logos and personalized signatures.
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Services