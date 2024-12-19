// import React from 'react'

// const About = () => {
//   return (
//     <>
//         <div id="about" class="px-4 sm:px-6 md:px-10 lg:px-20 dark:bg-slate-900">
//   <div class="max-w-screen-xl mx-auto py-20 sm:py-24 md:py-32 lg:py-40 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
//     <div class="relative w-full lg:w-1/2">
//       <img
//         class="h-1/4 absolute top-0 left-0 -z-10 hidden lg:block"
//         src="/dots.png"
//         alt=""
//       />
//       <div class="h-full w-full md:w-[500px] rounded-md overflow-hidden">
//         <img class="w-full" src="/about.jpg" alt="About Us Image" />
//       </div>
//     </div>
//     <div class="my-auto flex flex-col gap-3 w-full lg:w-1/2 px-4 sm:px-6 lg:px-0">
//       <h1 class="text-indigo-600 font-bold text-4xl sm:text-5xl md:text-left xl:text-left md:text-6xl lg:text-7xl text-center lg:text-left">
//         ABOUT US
//       </h1>
//       <p class="text-gray-400 text-md sm:text-lg md:text-xl lg:text-lg block lg:hidden">
//         At AIMS, we are passionate about revolutionizing healthcare technology to empower doctors and improve patient care.
//       </p>
//       <p class="text-gray-400 text-md sm:text-lg md:text-xl lg:text-lg hidden lg:block">
//         At AIMS, we are passionate about revolutionizing healthcare technology to empower doctors and improve patient care. Our mission is to provide cutting-edge solutions that seamlessly integrate Electronic Health Records (EHR) with personalized APIs, allowing healthcare providers to access and manage patient reports efficiently. With our innovative live speech-to-text transcription feature, available in multiple languages including French, Russian, English, and Spanish, we enable real-time communication between patients and doctors. Our platform excels in generating detailed reports in both DOCX and PDF formats, offering customizable templates adorned with clinic logos and personalized signatures. We pride ourselves on simplifying patient registration through voice-based input and OCR form capabilities, streamlining administrative processes. Moreover, our meeting report generation tool enhances communication and collaboration among healthcare teams. AIMS stands at the forefront of healthcare technology, dedicated to enhancing operational efficiency and delivering exceptional patient-centered care.
//       </p>
//       <p class="text-gray-400 text-md sm:text-lg md:text-xl lg:text-lg hidden lg:block">
//         Contact: jasmelacosta@gmail.com
//       </p>

//     </div>
//   </div>
// </div>

//     </>
//   )
// }

// export default About


import React from 'react';

const About = () => {
  return (
    <>
      <div id="about" className="px-4 sm:px-6 md:px-10 lg:px-20 dark:bg-slate-900">
        <div className="max-w-screen-xl mx-auto py-20 sm:py-24 md:py-32 lg:py-40 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
          <div className="relative w-full lg:w-1/2">
            <img
              className="h-1/4 absolute top-0 left-0 -z-10 hidden lg:block"
              src="/dots.png"
              alt=""
            />
            <div className="h-full w-full md:w-[500px] rounded-md overflow-hidden">
              <img className="w-full" src="/about.jpg" alt="About Us Image" />
            </div>
          </div>
          <div className="my-auto flex flex-col gap-3 w-full lg:w-1/2 px-4 sm:px-6 lg:px-0">
            <h1 className="text-indigo-600 font-bold text-4xl sm:text-5xl md:text-left xl:text-left md:text-6xl lg:text-7xl text-center lg:text-left">
              ABOUT US
            </h1>
            <p className="text-gray-400 text-md sm:text-lg md:text-xl lg:text-lg">
              AIMS is driven to transform the healthcare landscape through bold innovation. Our purpose is to craft intuitive solutions that harmonize data, amplify provider impact, and elevate patient experiences.
            </p>
            <p className="text-gray-400 text-md sm:text-lg md:text-xl lg:text-lg">
              We achieve this through:
            </p>
            <ul className="list-disc list-inside text-gray-400 text-md sm:text-lg md:text-xl lg:text-lg">
              <li>Synergistic EHR-API fusion for effortless data flow</li>
              <li>Linguistic versatility via AI-driven, real-time transcription</li>
              <li>Dynamic reporting with bespoke templates and branding</li>
              <li>Effortless patient onboarding via voice-activated and OCR technologies</li>
              <li>Seamless team collaboration through intelligent meeting summaries</li>
            </ul>
            <p className="text-gray-400 text-md sm:text-lg md:text-xl lg:text-lg">
              At AIMS, we're pioneering a new era in healthcare technology, where innovation meets empathy, and care meets connection.
            </p>
            <p className="text-gray-400 text-md sm:text-lg md:text-xl lg:text-lg">
              Contact: jasmelacosta@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
