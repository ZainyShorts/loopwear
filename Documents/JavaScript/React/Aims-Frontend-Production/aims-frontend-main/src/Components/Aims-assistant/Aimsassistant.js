import { React, useContext } from 'react';   
import { useState , useRef , useEffect} from 'react'; 
import { FaStethoscope, FaPrescriptionBottleAlt, FaFileMedicalAlt, FaUserNurse } from 'react-icons/fa';
import TypingIndicator from './TypingLoader.js';
import { FaMicrophone, FaTrash } from 'react-icons/fa';   
import ClearChatModal from './ClearChatModal.js';
import logo from '../../images/logo.png';  
import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStateContext } from '../../Context/GlobalStateContext.js';
import { demoURL } from '../../client.js';
import { MdMicOff } from "react-icons/md"; 
import AudioModal from './AudioModal.js';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Aimsassistant = () => {    
  const { userInfo } = useSelector((state) => state.auth);
  const [editedProfile, setEditedProfile] = useState(userInfo);
  const chatEndRef = useRef(null); 
  const [modal , setModal] = useState(false);  
  const [time, setTime] = useState(0);
  const isActive = useRef(false);
  const intervalRef = useRef(null); 
  const [isModalOpen,setisModalOpen] = useState(false);
  const isFirstRender = useRef(true);
  const { token ,ClearChat ,set,Messages , setMessages ,selectedOption } = useContext(GlobalStateContext)

  const [Boxes] = useState([
    {
      icon: <FaUserNurse />, 
      text: "Consult about nursing care and patient management."
    },
    { 
      icon: <FaStethoscope />,
      text: "Inquire about symptoms and diagnoses."
    },
    { 
      icon: <FaPrescriptionBottleAlt />,
      text: "Get advice on medications and treatments."
    },  
    { 
      icon: <FaFileMedicalAlt />,
      text: "Discuss medical reports and lab results."
    },   
]); 
  const [userResponse, setUserResponse] = useState({
    image: null,  
    voice: null, 
    text: null,      
  });   

   
  const handleInput = (e) => { 
    const target = e.target;
    target.style.height = `${Math.min(target.scrollHeight, 20 * window.innerHeight / 100)}px`; 
    setUserResponse({
      ...userResponse,
      text: e.target.value, 
    });
  }; 

  const [textAreaDisable,setTextAreaDisable] = useState(false)
  const handleSubmit = async(event) =>{  
    if (event.key === 'Enter') {
      event.preventDefault(); 
      if(userResponse.text.length==0) return;

      setTextAreaDisable(true)

    setMessages(prevMessages => [
      ...prevMessages,  
      { sent: userResponse.text, reply: null }  ,
    ]);



    try{
      const formData = new FormData();
      if(audioBlob){
        formData.append('type', JSON.stringify({text:false,voice:true}));
        formData.append('file', audioBlob);
      }else{
        formData.append('type', JSON.stringify({text:true,voice:false}));
        formData.append('text', userResponse.text);   
        formData.append('model', selectedOption);
      }
    setUserResponse({
      image: null,
      voice: null,
      text: '',
    }); 
    const config = {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  }
   
    const result = await axios.post(`${demoURL}/post/aimsAssisstant`, formData, config);
    console.log(result) 
    if(result.data.response == true) 
      set(true); 
    {
        setMessages(prevMessages => {
            // Update the last message's reply
            const lastMessageIndex = prevMessages.length - 1;  
            return prevMessages.map((msg, index) => 
                index === lastMessageIndex 
                ? { ...msg, reply: result.data.chat } 
                : msg 
            );
        });
      
    }
    }catch(e)
    {  
      console.log(e)
    }finally{
      setTextAreaDisable(false)
    }
    
    }

  }    
  const openAudioModal = () => { 
    setisModalOpen(true);
  }
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]); 
  const [chunks, setChunks] = useState([]); 

  
  const startRecording = async () => {  
   if(!isActive.current) { 
    isActive.current = true; 
    setTime(1); 
   }
    try {
      setRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      }; 
      
      mediaRecorder.onstop = async() => {
        const allChunks = [...chunks, ...chunksRef.current]; // Combine previous and current chunks
        setChunks(allChunks); 
        let audioBlob;
      
           audioBlob = new Blob(allChunks, { type: 'audio/webm' });
        setAudioBlob(audioBlob)
      };

      mediaRecorder.start(1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (isActive.current === true) { 
      isActive.current=false 
      setTime(0);
    }  
    mediaRecorderRef.current.stop();
    setRecording(false);
  };
 

  const handleDelete = () => {
    setAudioBlob(null);  
    setRecording(false); 
    setChunks([]) 
    chunksRef.current = []; 
  };


  const textareaStyle = {
    height: userResponse?.text?.length <= 125 || userResponse.text == null ? '8vh' : 'auto',
    maxHeight: '18vh',
    transition: 'height 0.3s ease-in-out, width 0.3s ease-in-out',
  };
  useEffect(() => { 
    if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [Messages]);
   
  const openModal = () =>{  
    setModal(true);
  }
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      openModal();
    }
  }, [ClearChat]); 
   
  const CloseModal = () => { 
    setModal(false);
  } 
  const  Clear = () => { 
    setMessages([]);  
    setModal(false); 
    set(false);
  }
  useEffect(()=> { 
  if(isActive.current){ 
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  } 
  if(time === 60 ){ 
    stopRecording();
   }
  return () => clearInterval(intervalRef.current); 
  }, [time]); 

  const RecordingModal = () => {  
  setisModalOpen(false);
  startRecording(); 
  } 

  const CloseRecordingModal = () => { 
  setisModalOpen(false);
  }
  useEffect (()=>{ 
    setEditedProfile(userInfo);
  },[])
  return (  
    <>

    <div  className="dark:bg-slate-900 relative text-white h-screen flex flex-col justify-between p-8">  
      {/* Use grid layout with responsive column settings */}   
     
      <div>
      {Messages.length === 0 ? (
  <div className='flex flex-col mt-[30%] md:mt-[10%] justify-center items-center p-8 sm:p-4 md:p-2'>  
    <div className='p-6'>
      <img src={logo} alt="Logo" className="!w-16 !h-16 nav-logo cursor-pointer" />
    </div>
    <div className="grid mt-6 grid-cols-2 lg:grid-cols-4 w-[75vw] md:w-[50vw] lg:w-[60vw] gap-5 justify-items-center">
      {Boxes.map((box, index) => (
        <div
          key={index}
          className="text-center flex flex-col items-center  border-gray-600 border-[1px] justify-center p-4 w-[35vw] sm:w-[30vw] md:w-[20vw] lg:w-[12vw] text-gray-300 rounded-xl hover:bg-gray-700 dark:hover:bg-slate-800 transition-colors duration-200 hover:cursor-pointer"
        >
          <div className="text-2xl mb-4">{box.icon}</div>
          <div className="text-sm">{box.text}</div>
        </div>
      ))}
    </div>
  </div>  
) : ( 
  <>    
 <div className='h-[70vh] mt-14 overflow-auto scrollbar-hide'>  
 {modal && (
    <div className="fixed inset-0 ml-64 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* Modal */}
      <div className="rounded-lg p-4 z-60">
        <ClearChatModal Clearchat={Clear} CloseModal={CloseModal} />
      </div>
    </div>
  )}

            {Messages.map((message, index) => (
                <div key={index}>    
                <div className='flex justify-center items-center ml-auto mt-1 w-[38vw] rounded-xl text-gray-300'>
      
                <img src={editedProfile.profile_picture} className='h-[20px] w-[23px]' />
             
  
                    <div className=' bg-gray-800 ml-2 p-4 w-[35vw] rounded-xl'> 
                        <p className='break-words'>{message.sent}</p>
                    </div> 
                    </div>
                    {message.reply ? ( 
                       <>   
                       <div className='flex justify-center items-center'>
                       <img className='h-[20px] w-[23px]' src={logo}/>
                        <div className='mr-auto ml-2 bg-gray-800 p-4 w-[35vw] rounded-xl text-gray-300 overflow-hidden'> 

                            <Markdown remarkPlugins={[remarkGfm]} className='' children={message.reply} />
                        </div> 
                        </div>
                       </>    
                    ) : (
                        <div className='mr-auto p-4 w-[35vw] rounded-xl text-gray-300 overflow-hidden'>
                            <TypingIndicator />
                        </div>
                    )}
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
  </>
)} 

{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0  bg-black opacity-50" />
    <div className="relative z-60 rounded-lg p-4">
      <AudioModal Approve={RecordingModal} Reject={CloseRecordingModal} />
    </div>
  </div>
)}
</div>
      <div className="w-[90vw] md:w-[65vw] lg:w-[75vw] fixed bottom-4 mb-2 flex justify-center items-center ">
      <div className="relative w-[95%] flex bg-gray-800 rounded-3xl p-2 items-center">
     
   
      
      <textarea
        placeholder="Type here and enter..."
        className="flex-grow center-placeholder outline-none ml-4 bg-transparent p-3 mr-16 text-gray-300 resize-none max-h-[18vh] transition-all duration-200 overflow-auto custom-scrollbar focus:outline-none focus:ring-0 focus:border-transparent "
        onChange={handleInput}
        onKeyDown={handleSubmit}
        disabled={textAreaDisable}
        value={userResponse.text} 
        style={textareaStyle}
      /> 
      <div className="audio-recorder">
      


      {audioBlob && (
        <div className='flex'>
          <button onClick={handleDelete} className="mr-4  text-red-500">
            <FaTrash size={18} />
          </button>  
         
        </div>
      )}
    </div>
    
    
      
      {/* {
        !recording && !audioBlob &&
        <button onClick={openAudioModal}  className="text-white top-5 absolute righ-5">
         <FaMicrophone size={22} />
      </button>
      } */}
      {
        !recording && audioBlob &&
        <button  className="text-white top-5 absolute righ-5">
         <MdMicOff size={22} />
      </button>
      }
      {
        recording &&
        <RecordButton stopRecording={stopRecording} Timer = {time}/>
      }
    </div>
</div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: auto; /* For Firefox */
          scrollbar-color: #A0AEC0 transparent; /* Thumb color and track color */
        }

        /* For Webkit browsers (Chrome, Safari) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px; /* Increased width of the scrollbar */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #A0AEC0; /* Color of the scrollbar thumb */
          border-radius: 10px; /* Rounded edges for the scrollbar thumb */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* Transparent color of the scrollbar track */
        } 
    
  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
  }
      `}</style>
    </div> 
    </>
  );
};


const RecordButton=({stopRecording , Timer})=>{
  return(
    <> 
    <button onClick={stopRecording} class="button p-4">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#ff342b"><rect y="3" x="9" width="6" rx="3" height="11"></rect><path d="m12 18v3"></path><path d="m8 21h8"></path><path d="m19 11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7"></path></g></svg>
  <span class="lable">End Record</span> 
  <p className='text-white'>{Timer}</p>
</button>

<style>
  {
    `
    /* From Uiverse.io by andrew-demchenk0 */ 
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  height: 40px;
  width: 200px;
  border: none;
  background: #1b1b1cde;
  border-radius: 20px;
  cursor: pointer;
}
 .center-placeholder {
  width: 100%; /* Adjust width as per your design */
  height: 40px; /* Adjust height as needed */
  text-align: center; /* Centers the placeholder text horizontally */
  padding: 0;
  box-sizing: border-box;
}

.center-placeholder::placeholder {
  display: flex;
  justify-content: center; /* Flexbox centering horizontally */
  align-items: center; /* Flexbox centering vertically */
}

.lable {
  line-height: 20px;
  font-size: 17px;
  color: #FF342B;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.button:hover {
  background: #1b1b1c;
}

.button:hover .svg-icon {
  animation: scale 1s linear infinite;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05) rotate(10deg);
  }

  100% {
    transform: scale(1);
  }
}
    `
  }
</style>
    </>
  )
}

export default Aimsassistant;  
