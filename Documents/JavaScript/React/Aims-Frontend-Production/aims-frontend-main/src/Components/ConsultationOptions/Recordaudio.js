import React, { useState, useRef, useContext, useEffect } from 'react';
import ScreenLoader from '../ui/Loader/Loader.js';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { detectPlatform } from '../ui/Platform/Platform.js';
import { demoURL } from '../../client.js';
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { useParams } from 'react-router-dom';
import { GlobalStateContext } from '../../Context/GlobalStateContext.js';
import Mic from '../ui/Mic/Mic.js';
const Recordaudio = ({setSwitch}) => {
  const [platform, setPlatform] = useState('Web');
  const {navigate,user,setUser,checker,setRationale,setOriginal,setIcdCodes,setSubjective, setObjective, setmed,setCptCodes, setDxCodes, setAssessment, setPlan, setSoapNotesSummary, setAllergy, setHPI, setPMH, setROS, setchiefComplaint,setphysicalExamination} = useContext(GlobalStateContext)
  const { patientId } = useParams();
  const [showText,setShowText]=useState(true)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

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
  useEffect(()=>{
    const OS = detectPlatform();
    setPlatform(OS)
  },[])





  const getCurrentDateTime = () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return {
      date: `${month}/${day}/${year}`,
      time: `${hours}:${minutes}:${seconds} ${ampm}`
    };
  };



  const next = async(blob)=>{
    try {
      setLoading(true)
      setDxCodes([])
      setAllergy("")
      setAssessment("")
      setCptCodes([])
      setIcdCodes([])
      setHPI("")
      setPMH("")
      setPlan("")
      setphysicalExamination("")
      setObjective("")
      setSubjective("")
      setmed("")
      setROS("")
      setchiefComplaint("")
      setSoapNotesSummary("")
      setOriginal("")

      const formData = new FormData();
      formData.append('file', blob);
      formData.append('type', 'record');
      formData.append('practice', 'main-aims');
     
      const response = await axios.post(`${demoURL}/post/generateReportFromAudioFile`, formData);
      console.log(response)
      if(response.data.success === true){
        const codes = response.data.code
        const data = response.data.data
        const listofros = response.data.Ros
        setOriginal(response.data.original)
        
       

        if(data.Medications==null || data.Medications=="" )
        {
          setmed("Not discussed during the consultation.")
        }else{
          setmed(data.Medications)
        }
        // ------------------------------------
        if(data.Assessment == null || data.Assessment=="")
        {
          setAssessment("Not discussed during the consultation.");
        }else{
          setAssessment(data.Assessment);
        }
        // ---------------------------------------
        if(codes['ICD-10 Codes'] == null || codes['ICD-10 Codes']  == "" || codes['ICD-10 Codes'] == [] ){
          setIcdCodes([{code:"null",description:"Not discussed during the consultation."}])
        }else{
          setIcdCodes(codes['ICD-10 Codes'])
        }
        if(codes['CPT Codes'] == null || codes['CPT Codes'] == "" || codes['CPT Codes']== []){
          setCptCodes([{code:"null",description:"Not discussed during the consultation."}])
        }else{
          setCptCodes(codes['CPT Codes'])
        }
        if(data.Plan==null || data.Plan=="")
        {
          setPlan("Not discussed during the consultation.");
        }else{
          setPlan(data.Plan);
        }

        if(data.SUMMARY==null || data.SUMMARY=="")
        {
          setSoapNotesSummary("Not discussed during the consultation.");
        }else{
          setSoapNotesSummary(data.SUMMARY);
        }

        if(data.Allergies==null || data.Allergies=="")
        {
          setAllergy("Not discussed during the consultation.");
        }else{
          setAllergy(data.Allergies);
        }

        if(data['History of Present Illness (HPI)']==null || data['History of Present Illness (HPI)']=="")
        {
          setHPI("Not discussed during the consultation.");
        }
        else{
          setHPI(data['History of Present Illness (HPI)']);
        }

        if(data['Past Medical History (PMH)']==null || data['Past Medical History (PMH)']=="")
        {
          setPMH("Not discussed during the consultation.");
        }else{
          setPMH(data['Past Medical History (PMH)']);
        }

       
        let rosData = {
          Constitutional: `${listofros.Constitutional['type']}. ${listofros.Constitutional['description']}` || 'Negative',
          Eyes: `${listofros.Eyes['type']}. ${listofros.Eyes['description']}` || 'Negative',
          ENT: `${listofros.ENT['type']}. ${listofros.ENT['description']}` || 'Negative',
          Cardiovascular:`${listofros.Cardiovascular['type']}. ${listofros.Cardiovascular['description']}` || "Negative",
          Respiratory: `${listofros.Respiratory['type']}. ${listofros.Respiratory['description']}` || 'Negative',
          Gastrointestinal: `${listofros.Gastrointestinal['type']}. ${listofros.Gastrointestinal['description']}` || 'Negative',
          Genitourinary: `${listofros.Genitourinary['type']}. ${listofros.Genitourinary['description']}` || 'Negative',
          Musculoskeletal: `${listofros.Musculoskeletal['type']}. ${listofros.Musculoskeletal['description']}` || 'Negative',
          Skin: `${listofros.Skin['type']}. ${listofros.Skin['description']}` || 'Negative',
          Neurological: `${listofros.Neurological['type']}. ${listofros.Neurological['description']}` || 'Negative',
          Psychiatric: `${listofros.Psychiatric['type']}. ${listofros.Psychiatric['description']}` || 'Negative',
        };
      

        setROS(rosData)

        if(data['Chief Complaint']==null || data['Chief Complaint']=="")
        {
          setchiefComplaint("Not discussed during the consultation.");
        }else{
          setchiefComplaint(data["Chief Complaint"]);
        }

        if(data['Physical Examination']==null || data['Physical Examination']=="")
        {
          setphysicalExamination("Not discussed during the consultation.");
        }
        else{          
          setphysicalExamination(data["Physical Examination"]);
        }

        if(data['Subjective']==null || data['Subjective']=="")
        {
          setSubjective("Not discussed during the consultation.");
        }else{

          setSubjective(data["Subjective"])
        }

        if(data['Objective']==null || data['Objective']=="")
        {
          setObjective("Not discussed during the consultation.");
        }else{
          setObjective(data["Objective"])
        }

        
       
        navigate(`/SOAPnotes/${patientId}?mode=generate`);

        
      
      }else{
        toast.error(response.data.msg)
      }
      } catch (error) {
      toast.error('Failed to generate reeport')

      }finally{
    setLoading(false)
  
    
  }
  }

  const downloadBlobAsMP3 = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Consulttation.mp3';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const mediaRecorderRef = useRef(null); // Reference for MediaRecorder object
  const chunksRef = useRef([]); 
  const [recording, setRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const [show,setShow]=useState(false)
  const [binaryObj,setBlob] = useState(null)
  const [chunks, setChunks] = useState([]); 
  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [recording]);

  
  


  // temporary method 
  const startRecording = async () => {
    try {
      setShowText(false)
      setRecording(true);
      setShow(true) 
      setSwitch(false);

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
        if(platform=="IOS")
        {
           audioBlob = new Blob(allChunks, { type: 'audio/mp4' });
        }else{
           audioBlob = new Blob(allChunks, { type: 'audio/webm' });
        }
        setBlob(audioBlob)
      };

      mediaRecorder.start(1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setRecording(false);
      setShow(false)
    }
  };

  const stopRecording = () => {
    if (!recording) return;

    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const clearRecorderState = () => {
    // mediaRecorderRef.current = null;
    chunksRef.current = [];
    setElapsedTime(0);
    setRecording(false);
    // if (mediaRecorderRef.current) {
    //   // Stop all tracks to release the microphone
    //   mediaRecorderRef.current.getTracks().forEach((track) => track.stop());
    //   mediaRecorderRef.current = null;
    // }
  };

  const toggle = () =>{
    if(recording){
      stopRecording()
    }else{
      startRecording()
    }
  }

  const resetAudio = () =>{
    setShowText(true)
    setShow(false)
    setElapsedTime(0);
    setBlob(null)
    setChunks([])
    clearRecorderState() 
    setSwitch(true);
  }
 
  

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      {loading ? (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center">
            <ScreenLoader />
            <p className="mt-4 text-white text-lg">Generating report, please wait...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="dark:bg-slate-800 text-white relative">
            <div className="absolute w-full text-center"></div>
            <div className="flex flex-col items-center dark:bg-slate-800 p-4">
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                  recording ? "bg-red-500 animate-pulse" : "bg-gray-500"
                }`}
                onClick={toggle}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d={`${
                      recording
                        ? "M4 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm10 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z"
                        : "M10 2a2 2 0 00-2 2v6a2 2 0 004 0V4a2 2 0 00-2-2zM5 10a1 1 0 011 1v2a4 4 0 008 0v-2a1 1 0 112 0v2a6 6 0 01-12 0v-2a1 1 0 011-1z"
                    }`}
                    clipRule="evenodd"
                  />
                </svg>
              </div>
  
              <br />
              {recording && <Mic />}
              {show && <div className="mt-6">{elapsedTime} seconds</div>}
  
              {showText && (
                <p className="px-32 text-center text-[15px] w-[600px] mt-6"></p>
              )}
  
              <div className="flex flex-wrap justify-center gap-5">
                {binaryObj != null && !recording && (
                  <button
                    onClick={() => next(binaryObj)}
                    className="mt-12 bg-indigo-600 w-32 text-white py-2 px-4 rounded"
                  >
                    Next
                  </button>
                )}
                {binaryObj != null && !recording && (
                  <button
                    onClick={() => downloadBlobAsMP3(binaryObj)}
                    className="mt-12 w-32 bg-indigo-600 text-white py-2 px-4 rounded"
                  >
                    Download
                  </button>
                )}
                <button
                  onClick={() => toggle()}
                  className="mt-12 w-32 bg-indigo-600 text-white py-2 px-4 rounded"
                >
                  {recording ? "Pause" : binaryObj != null ? "Resume" : "Start"}
                </button>
                {recording && (
                  <button
                    onClick={() => resetAudio()}
                    className="mt-12 w-32 bg-indigo-600 text-white py-2 px-4 rounded"
                  >
                    Reset
                  </button>
                )}
                {!recording && (
                  <button
                    onClick={() => navigate(`/Consultation/${patientId}`)}
                    className="bg-indigo-600 mt-12 w-32 text-white py-2 px-4 rounded"
                  >
                    Back
                  </button>
                )}
              </div>
  
              <style>
                {`
                  .switch:hover {
                    background-color: rgba(60, 64, 67, 0.8);
                  }
  
                  #checkbox:checked + .switch .mic-off {
                    opacity: 1;
                  }
  
                  #checkbox:checked + .switch .mic-on {
                    opacity: 0;
                  }
  
                  #checkbox:checked + .switch {
                    background-color: #DC2626;
                  }
                `}
              </style>
            </div>
          </div>
        </>
      )}
    </>
  );
}  

export default Recordaudio;







