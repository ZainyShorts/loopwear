


/* eslint-disable*/
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import useClipboard from "react-use-clipboard";
// import { useContext, useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { flask_API_URL } from '../../../client';
// import { GlobalStateContext } from '../../../Context/GlobalStateContext';


// const Meet = () => {
//     const {setMeeting} = useContext(GlobalStateContext)
//     const [textToCopy, setTextToCopy] = useState();
//     const [isCopied, setCopied] = useClipboard(textToCopy, {
//         successDuration: 1000
//     });
//     const navigate = useNavigate()
//     const startListening = () => {
//         SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
//     };
//     const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//     if (!browserSupportsSpeechRecognition) {
//         return null;
//     }

//     const stop = () => {
//         SpeechRecognition.stopListening()
//     };

//      const fake =`In our recent project update meeting, several critical aspects were discussed to streamline our development process and enhance the user experience. We focused on the Flutter application's UI, specifically ensuring the use of an already applied theme for the bottom sheet. Attention was given to the Personal Info section, which includes fields like Fullname, Email, Gender, Phone Number, Date of Birth, and Emergency Contact. For the Primary Insurance section, fields such as Insurance Provider, Insurance Policy Number, Policy Holder Name, and Group Number were reviewed. We also delved into the Medical History section, ensuring accurate data input for Primary Care Physician, Medications, Allergies, Chronic Conditions, Previous Surgeries, and Family Medical History.

//      Further, we discussed the creation of professional DOCX reports incorporating doctor details, patient information, and SOAP notes post-consultation. The team is working on a patient profile screen, a doctor profile update screen, and a PasswordUpdate screen in Flutter, with a modal for updating email, first name, or last name in the doctor profile. A new feature for doctors to receive notifications in the app was also highlighted.
     
//      In the React project, efforts were made to enhance the UI for doctors to add patients in an EHR system, including dropdown selections for EHR, API key input, and patient selection lists. Additionally, options for uploading clinic profile pictures and clinic logo pictures were added. The project's styling involves the use of Tailwind CSS and responsiveness improvements. We also explored the integration of a microphone toggle switch, including functionality for audio recording, playback, and stopping recording.
     
//      The team is transitioning to WebSocket for real-time communication, aiming to receive live responses for ringing, pick-up, and speech-to-text. There is also a focus on integrating WebRTC in React to listen to calls directly, moving away from third-party phone systems. Finally, efforts are ongoing to adjust the meeting template size to resemble an A4 page, incorporating borders and React icons for a polished look.`
   
//      const next = async ()=>{
//         const data = {text:"Good morning, everyone. I hope you’re all doing well. Today’s meeting is crucial as we need to review our project's current status and address any issues that have arisen. To start, we’ll go over the milestones we’ve achieved since our last meeting. Jane, could you kick things off with a detailed update on the development phase? Specifically, let us know about any completed tasks, ongoing work, and any challenges your team might be facing. Once Jane has finished, we’ll turn our attention to the feedback from the testing team. This will help us understand any critical bugs or issues that need immediate attention. After that, we’ll open the floor for discussing new features or changes that we might need to integrate based on recent client feedback or market trends. Additionally, we’ll review our project timeline and see if there are any adjustments needed to meet our deadlines. Please be prepared to share your insights, concerns, and any roadblocks you’re encountering. Our goal is to ensure we are all aligned and to find solutions to keep our project on track. Let’s aim for a productive session and make sure to cover all the necessary points to ensure our success."}
//         try{
//             const res = await axios.post(`${flask_API_URL}/meeting`,data);
//             console.log(res)
//             setMeeting(res.data.data)
//             navigate('/MeetingPreview')
//         }catch(e){
//             alert('error')
//         }
//     }

//     return (
//         <>
//             <div className="!bg-transparent container mt-20 ml-24  p-8 flex ">
//                 <div id="div-area" className="main-content max-w-5xl w-full min-h-96 p-8 bg-white border border-gray-200 rounded-lg shadow-md" onClick={() => setTextToCopy(transcript)}>
//                     {transcript}
//                 </div>

//                 <div className="btn-style flex flex-col justify-between mt-8 ml-3">
//                     <button className="btn bg-green-700 text-white rounded-md py-4 px-8 mx-auto  hover:bg-green-600 shadow-lg" onClick={startListening}>Start Meeting</button>
//                     <button className="btn bg-green-700 text-white rounded-md py-4 px-8 mx-auto  hover:bg-green-600 shadow-lg" onClick={stop}>Stop Meeting</button>
//                     <button className="btn bg-green-700 text-white rounded-md py-4 px-8 mx-auto  hover:bg-green-600 shadow-lg" onClick={setCopied}>{isCopied ? 'Copied!' : 'Copytext'}</button>
//                     <button onClick={next} className="btn bg-green-700 text-white rounded-md py-4 px-8 mx-auto  hover:bg-green-600 shadow-lg">Next</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Meet;



// import React, { useContext } from 'react';
// import { FaMicrophone, FaFileAudio } from 'react-icons/fa';
// import { CiText,CiStreamOn } from "react-icons/ci";
// import { Link } from 'react-router-dom';
// import { GlobalStateContext } from '../../../Context/GlobalStateContext';
// const Home = () => {
//   const { setPatient  , router } = useContext(GlobalStateContext)


//   return (
//     <>
//       <section className="text-gray-600 body-font   ">
        
//         <div className="absolute left-[58%] rounded-lg top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[700px] p-[50px] bg-transparent shadow-[0_30px_50px_#b6b6b6] px-5  py-24 mx-auto">
//           <div className="flex flex-col text-center w-full mb-12">
//             <img onClick={()=>router.push('/Chose')} className='h-[200px] w-[200px]  mx-auto cursor-pointer'  src='/logo.png' />
//             <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
//             AIMS offers you the ability to come record your audio, upload an audio file, or use live audio-to-text transmission. At the end of the meeting, we convert the recording into a comprehensive report, highlighting all major meeting points, ensuring no detail is missed.
//             </p>
//           </div>
//           <div className="flex flex-wrap -m-2">
                       
//             <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
//               <Link onClick={()=>setPatient({})} href={'/Patient?id=2'} className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
//                 <FaFileAudio className="w-16 h-12 text-red-500 flex-shrink-0 rounded-full mr-4" />
//                 <div className="flex-grow">
//                   <h2 className="text-gray-900 title-font font-medium">Upload Audio</h2>
//                   <p className="text-gray-500">Upload audio file for meeting report generation</p>
//                 </div>
//               </Link>
//             </div>
//             <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
//               <Link onClick={()=>setPatient({})} href={'/Patient?id=3'}  className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
//                 <CiStreamOn className="w-16 h-16 text-red-500  flex-shrink-0 rounded-md mr-4" />
//                 <div className="flex-grow">
//                   <h2 className="text-gray-900 title-font font-medium">Live Audio to Text Transcription</h2>
//                   <p className="text-gray-500">Convert you audio to text live while speaking.</p>
//                 </div>
//               </Link>
//             </div>
//             <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
//               <Link onClick={()=>setPatient({})} href={'/Patient?id=4'} className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
//                 <CiText className="w-16 h-16 text-red-500  flex-shrink-0 rounded-md mr-4" />
//                 <div className="flex-grow">
//                   <h2 className="text-gray-900 title-font font-medium">Text Data</h2>
//                   <p className="text-gray-500">Just paste your meeting text data and get a Ai generated report.</p>
//                 </div>
//               </Link>
//             </div>
//             <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
//               <Link onClick={()=>setPatient({})} href={'/Patient?id=4'} className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
//                 <FaMicrophone className="w-16 h-16 text-red-500  flex-shrink-0 rounded-md mr-4" />
//                 <div className="flex-grow">
//                   <h2 className="text-gray-900 title-font font-medium">Record Audio</h2>
//                   <p className="text-gray-500">Record your meeting.</p>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;


import React, { useContext, useState } from 'react';
import { FaMicrophone, FaFileAudio } from 'react-icons/fa';
import { CiText, CiStreamOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../../../Context/GlobalStateContext';

const Home = () => {
  const { setPatient, router } = useContext(GlobalStateContext);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [date, setDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addEmail = () => {
    if (email) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className={`text-gray-600 body-font ${isModalOpen ? 'blur' : ''}`}>
        <div className=" mx-auto p-5 flex flex-wrap items-center justify-center">
          <div className="w-full lg:w-2/3 mb-12">
            <div className="flex flex-col text-center w-full mb-8">
              <img
                onClick={() => router.push('/Chose')}
                className="h-24 w-24 mx-auto cursor-pointer"
                src="/logo.png"
                alt="Logo"
              />
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                AIMS offers you the ability to come record your audio, upload an audio file, or use live audio-to-text transmission. At the end of the meeting, we convert the recording into a comprehensive report, highlighting all major meeting points, ensuring no detail is missed.
              </p>
            </div>
            <div className="flex flex-wrap -m-2 justify-center">
              <div className="p-2 w-full md:w-1/2 lg:w-1/3">
                <div
                  onClick={openModal}
                  className="h-full flex items-center border-gray-200 border p-4 rounded-lg cursor-pointer"
                >
                  <FaFileAudio className="w-16 h-12 text-red-500 flex-shrink-0 rounded-full mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Upload Audio</h2>
                    <p className="text-gray-500">Upload audio file for meeting report generation</p>
                  </div>
                </div>
              </div>
              <div className="p-2 w-full md:w-1/2 lg:w-1/3">
                <div
                  onClick={openModal}
                  className="h-full flex items-center border-gray-200 border p-4 rounded-lg cursor-pointer"
                >
                  <CiStreamOn className="w-16 h-16 text-red-500 flex-shrink-0 rounded-md mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Live Audio to Text Transcription</h2>
                    <p className="text-gray-500">Convert your audio to text live while speaking.</p>
                  </div>
                </div>
              </div>
              <div className="p-2 w-full md:w-1/2 lg:w-1/3">
                <div
                  onClick={openModal}
                  className="h-full flex items-center border-gray-200 border p-4 rounded-lg cursor-pointer"
                >
                  <CiText className="w-16 h-16 text-red-500 flex-shrink-0 rounded-md mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Text Data</h2>
                    <p className="text-gray-500">Just paste your meeting text data and get an AI-generated report.</p>
                  </div>
                </div>
              </div>
              <div className="p-2 w-full md:w-1/2 lg:w-1/3">
                <div
                  onClick={openModal}
                  className="h-full flex items-center border-gray-200 border p-4 rounded-lg cursor-pointer"
                >
                  <FaMicrophone className="w-16 h-16 text-red-500 flex-shrink-0 rounded-md mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Record Audio</h2>
                    <p className="text-gray-500">Record your meeting.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white shadow-lg rounded-lg p-6 relative">
                <button
                  className="absolute top-0 right-0 p-2"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <h2 className="text-lg font-medium mb-4">Add Email</h2>
                <div className="flex mb-4">
                  <input
                    type="email"
                    className="flex-grow p-2 border rounded-l-lg"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="p-2 bg-blue-500 text-white rounded-r-lg"
                    onClick={addEmail}
                  >
                    Add
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-4">Select Date</h2>
                  <input
                    type="date"
                    className="p-2 border rounded-lg w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-medium">Emails List ({emails.length})</h2>
                  <ul className="list-disc pl-5 mt-2">
                    {emails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;

