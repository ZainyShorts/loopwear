/* eslint-disable */
import React, { useState, useRef, useEffect, useContext } from "react";
import { RiMicLine } from "react-icons/ri";
import ".././styles.css";
import { demoURL } from "../../client.js";
import { ToastContainer, toast } from "react-toastify";
import { useSpring, animated } from "@react-spring/web";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Pulsating from "../pulsation.js";
import { useNavigate } from "react-router-dom";
import Loading from "../loading.js";
import axios from "axios";
import { GlobalStateContext } from "../../Context/GlobalStateContext.js";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import {isIos} from 'environment'; 
import Recordaudio from "./Recordaudio.js";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const StyledDiv = styled.div`
  align-items: center;
  background: ${({ color }) => color || "#AA0000"};
  border-radius: 32px;
  color: white;
  display: flex;
  height: 32px;
  justify-content: center;
  width: 130px;
  padding: 5px;
`;

function Number({ n }) {
  const { number } = useSpring({
    from: { number: n },
    number: 0,
    delay: 1000,
    config: { mass: 1, tension: 50 },
  });

  return (
    <animated.div className="text-9xl font-extrabold text-blue-800 flex p-20">
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
}

const Transcribing = ({ON,setON , setSwitch , Switch , visit }) => {
 
  const {user,setUser,checker,setOriginal,setIcdCodes,setSubjective, setObjective, setmed,setCptCodes, setDxCodes, setAssessment, setPlan, setSoapNotesSummary, setAllergy, setHPI, setPMH, setROS, setchiefComplaint,setphysicalExamination} = useContext(GlobalStateContext)
  

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { patientId } = useParams();
  const [affirmation,setAffirmation]=useState("")
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(true);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showColor, setShowColor] = useState(false);
  const [iscounting, setIscounting] = useState(false);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const [stop, setStop] = useState(false);
  const textareaRef = useRef(null);
  const [lan,setLang] = useState("en")
  const dispatch = useDispatch()
  const [model,setModel]=useState("nova-medical")
  const [btn,setBtn]=useState(true)  
  const [isPause,setIsPause]=useState(false)
  
  let currentText = '';
  var audioText;
  let socket;
  useEffect(()=>{
    localStorage.removeItem("visit-id")
    checker().then((res)=>{
      if(res==false)
      {
      setUser(false)
      dispatch(logout())
      navigate('/')
      }
    })
    
  },[checker,user])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [affirmation]);





  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState != 'visible') 
      {
        if (mediaRecorder) 
          {
          setIsRecording(false);
          mediaRecorder.pause();
          } 
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);



  const activateMicrophone=async()=>{
    try {
      if(lan != "en")
      {
        setModel("nova")
      }
      setStop(false);
      setShowStartButton(false);
      setIscounting(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // if (!MediaRecorder.isTypeSupported('audio/webm') || ) {
      //   toast.error('Browser not supported');
        
      //   return;
      // }
      let mediaRecorder;
      if(isIos)
      {
          mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/mp4',
        });
      }else{
         mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm',
        });
      }

      setMediaRecorder(mediaRecorder);

      
      console.log(process.env.REACT_APP_DEEPGRAM_API)
      socket = new WebSocket(`wss://api.deepgram.com/v1/listen?Language=${lan}&Model=${model}`, [
        'token',
        process.env.REACT_APP_DEEPGRAM_API,
      ]);
      socketRef.current = socket;

      socket.onopen = () => {
        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0 && socket.readyState === 1) {
            socket.send(event.data);
          }
        });
        mediaRecorder.start(1000);
      };

      socket.onmessage = async (message) => {
        const received = JSON.parse(message.data);
        const transcript = received?.channel?.alternatives[0]?.transcript;
        if (transcript && received.is_final) {
          currentText = currentText.concat(' ' + transcript);
          audioText = currentText;
          setAffirmation(audioText);

        }
      };

      socket.onerror = (error) => {
        console.log(error)
      };

      socket.onclose = () => {
        stream.getTracks().forEach((track) => {
                  if (track.readyState === "live" && track.kind === "audio") {
                    track.stop();
                  }
                });
      };

    } catch (error) {
      console.error('Error');
    }

  }




  const handleInputChange = (event) => {
      setAffirmation(event.target.value);
  };


  const sendMessageToBackend = async () => {
    try {
      setDxCodes([]);
      setAllergy("");
      setAssessment("");
      setCptCodes([]);
      setIcdCodes([]);
      setHPI("");
      setPMH("");
      setPlan("");
      setphysicalExamination("");
      setObjective("");
      setSubjective("");
      setmed("");
      setROS("");
      setchiefComplaint("");
      setSoapNotesSummary("");
      setOriginal("");
  
      if (affirmation.length === 0) {
        toast.error("No conversation");
        setLoading(false);
        return;
      }
  
      const formData = new FormData();
      formData.append('text', affirmation);
      formData.append('type', 'text');
      formData.append('practice', 'main-aims');
      
      const response = await axios.post(`${demoURL}/post/generateReportFromAudioFile`, formData);
      console.log(response)
      if (response.status === 200) {
        const codes = response.data.code;
        const data = response.data.data;
        const listofros = response.data.Ros;
        
        setOriginal(affirmation);
        localStorage.setItem("previous", affirmation);
  
        setmed(data.Medications || "Not discussed during the consultation.");
        setAssessment(data.Assessment || "Not discussed during the consultation.");
        setIcdCodes(codes['ICD-10 Codes'] && codes['ICD-10 Codes'].length > 0 ? codes['ICD-10 Codes'] : [{ code: "null", description: "Not discussed during the consultation." }]);
        setCptCodes(codes['CPT Codes'] && codes['CPT Codes'].length > 0 ? codes['CPT Codes'] : [{ code: "null", description: "Not discussed during the consultation." }]);
        setPlan(data.Plan || "Not discussed during the consultation.");
        setSoapNotesSummary(data.SUMMARY || "Not discussed during the consultation.");
        setAllergy(data.Allergies || "Not discussed during the consultation.");
        setHPI(data['History of Present Illness (HPI)'] || "Not discussed during the consultation.");
        setPMH(data['Past Medical History (PMH)'] || "Not discussed during the consultation.");
        
        const rosData = {
          Constitutional: `${listofros?.Constitutional?.type || 'Negative'}. ${listofros?.Constitutional?.description || ''}`,
          Eyes: `${listofros?.Eyes?.type || 'Negative'}. ${listofros?.Eyes?.description || ''}`,
          ENT: `${listofros?.ENT?.type || 'Negative'}. ${listofros?.ENT?.description || ''}`,
          Cardiovascular: `${listofros?.Cardiovascular?.type || 'Negative'}. ${listofros?.Cardiovascular?.description || ''}`,
          Respiratory: `${listofros?.Respiratory?.type || 'Negative'}. ${listofros?.Respiratory?.description || ''}`,
          Gastrointestinal: `${listofros?.Gastrointestinal?.type || 'Negative'}. ${listofros?.Gastrointestinal?.description || ''}`,
          Genitourinary: `${listofros?.Genitourinary?.type || 'Negative'}. ${listofros?.Genitourinary?.description || ''}`,
          Musculoskeletal: `${listofros?.Musculoskeletal?.type || 'Negative'}. ${listofros?.Musculoskeletal?.description || ''}`,
          Skin: `${listofros?.Skin?.type || 'Negative'}. ${listofros?.Skin?.description || ''}`,
          Neurological: `${listofros?.Neurological?.type || 'Negative'}. ${listofros?.Neurological?.description || ''}`,
          Psychiatric: `${listofros?.Psychiatric?.type || 'Negative'}. ${listofros?.Psychiatric?.description || ''}`,
        };
        
        setROS(rosData);
        setchiefComplaint(data["Chief Complaint"] || "Not discussed during the consultation.");
        setphysicalExamination(data["Physical Examination"] || "Not discussed during the consultation.");
        setSubjective(data["Subjective"] || "Not discussed during the consultation.");
        setObjective(data["Objective"] || "Not discussed during the consultation.");
        
        setLoading(false);
        navigate(`/SOAPnotes/${patientId}?mode=generate`);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  
  

  const redirect = () => {
    socket = null;
    setLoading(true);
    if (socketRef.current) {
      socketRef.current.close();
    }
    if(affirmation.length>50)
    {
      localStorage.setItem('conversation',affirmation)
    }
    sendMessageToBackend();

  };

  return (
    <>
      <ToastContainer />
      {
      loading ? (
        <Loading></Loading>
      ) : (
        <div className={`bg-[#F0F8FF]/50 ${visit ?  `w-[600px]` : `w-[60vw]`} fade-in-animation p-2 mt-4 rounded-lg text-white shadow-lg dark:bg-slate-900 dark:border-gray-700 overflow-hidden`}>
          <div className={`flex ${visit ?  `w-[600px]` : `w-[60vw]`} flex-col  items-center `}>
            
           
            <div className=" items-center w-[95%]  text-white   border-2 border-[#324AB2] dark:bg-slate-800 rounded-md shadow-xl shadow-gray-600/40 ring-1 ring-gray-100">
              <div className="w-full flex-col">
             
                <div className="w-full pl-0 pt-0">
                  <div className={`grid grid-cols-6 gap-4 ${showColor ? "bg-" : "bg-[#142030]"} h-[1.2cm] pt-2 pl-4`}>
                    <div className="flex col-start-1 col-end-6">
                      <RiMicLine size={24} color="white" />
                      {showColor && (
                        <div className="justify-center items-center flex">
                          <Pulsating visible="true">
                            <StyledDiv>
                              <RiMicLine size={24} color="white" />
                              <h1 className="pl-2"> Recording</h1>
                            </StyledDiv>
                          </Pulsating>
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className={`border-t-solid border-1 ${showColor ? "mt-2" : ""} border-[#324AB2]`} />

                  <div className="flex items-center justify-center">
                    {iscounting && <Number n={3} />}
                  </div>

                  <div className="">
                    

                    
                    <div className="h-[10cm]">  
                    {ON ?  ( 
                      <div className="fade-in-animation">
                      <Recordaudio  setSwitch={setSwitch}/>
                    </div>                  
                    ) : 
                    (  
                      <textarea
                        ref={textareaRef}
                        className={`w-full h-full dark:bg-slate-800 p-4 font-bold ${isRecording ? "" : "cursor-pointer"}`}
                        type="text"
                        value={affirmation}
                        onChange={handleInputChange}
                      />
                    )                   
                    }  
                        
                        </div>
                    <hr className="mt-4 border-t-solid border-1 border-[#324AB2]" />
                  </div>
                </div>
              </div>

            
            </div>
                   {btn && ON !=true  && <button
                          className="text-gray-100 mt-4 fade-in-animation bg-indigo-600 rounded-lg px-5 py-2 text-center text-base mr-2 " 

                          onClick={()=>{
                            setBtn(false)
                            setIsRecording(true)
                            activateMicrophone()  
                            setSwitch(false)
                          }}
                         >
                          Start transcribing
                        </button>}
                    {btn && ON !=true && affirmation.length>0 && <button
                          className="text-gray-100 bg-indigo-600 rounded-lg px-5 py-2 text-center text-base mr-2 mb-2" 

                          onClick={()=>{
                              setLoading(true)
                              sendMessageToBackend()
                          }}
                         >
                          Generte Notes
                        </button>}
{/* 
                        {btn && ON !=true && localStorage.getItem("previous") && <button
                          className="text-gray-200 bg-red-700  rounded-lg px-5 py-2 text-center text-base mr-2 mb-2"
                          onClick={()=>{
                            console.log(localStorage.getItem("previous"))
                            setAffirmation(localStorage.getItem("previous"));
                          }}
                         >
                          Previous Transcript
                        </button>} */}
                        {/* {btn && localStorage.getItem("previous") && <button onClick={()=>{
                          localStorage.removeItem('previous'); 

                        }}> 
                          Delete Previous Transcript 

                        </button> } */}


                   

                    
                    {!open && ON !=true && !showStartButton && (
                      <div className="px-8 mt-6">
                       
                       {ON !=true && ( 
                       <>
                      
                        <button
                          className="text-gray-100 bg-indigo-600 rounded-lg px-5 py-2 text-center text-base mr-2 mb-2" 

                          onClick={redirect}
                          disabled={showStartButton}
                         >
                          Generate Notes
                        </button>

                        <button
                          className="text-gray-100 bg-indigo-600 rounded-lg px-5 py-2 text-center text-base mr-2 mb-2" 
                          onClick={()=>{
                            
                              window.location.reload()
                          }}
                         >
                          Start Again
                        </button>  
                        
                        <button
                          className="text-gray-100  bg-indigo-600 rounded-lg px-5 py-2 text-center text-base mr-2 mb-2" 

                          onClick={()=>{
                            if (mediaRecorder && mediaRecorder.state !== "inactive") {
                              if (isPause) {
                                if (mediaRecorder.state === "paused") {
                                  // Resume recording
                                  mediaRecorder.resume();
                                  setIsPause(false);
                                  console.log("Recording resumed");
                                } else {
                                  console.error("Cannot resume: MediaRecorder is not paused");
                                }
                              } else {
                                if (mediaRecorder.state === "recording") {
                                  // Pause recording
                                  mediaRecorder.pause();
                                  setIsPause(true);
                                  console.log("Recording paused");
                                } else {
                                  console.error("Cannot pause: MediaRecorder is not recording");
                                }
                              }
                            } else {
                              console.error("MediaRecorder is inactive or not initialized properly");
                            }
                          }}
                         >
                         {isPause ? 'Resume' : 'Pause'}
                        </button>
                        <button
                          className="text-gray-100 bg-indigo-600 rounded-lg px-5 py-2 text-center text-base mr-2 mb-2" 

                          onClick={()=>{
                            
                              navigate(`/Consultation/${patientId}`)
                          }}
                         >
                          Back
                        </button>
                        
                        </>
                         )}
                       
                      </div>
                    )}
        <style jsx> 
         {` 
      @keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in-animation {
  animation: fadeIn 0.5s ease-in-out;
}
    
         `
         }
        </style>
          </div>
        </div> 
      )}
    </>
  );

}


export default Transcribing;



