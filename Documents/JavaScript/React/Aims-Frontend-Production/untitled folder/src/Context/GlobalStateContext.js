
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Node_API_URL } from '../client';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainModal from '../Components/MainModal';
import { useParams } from "react-router-dom";

// Create the context
export const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):"");

  //recording -> soapnotes
  const [Assessment,setAssessment]=useState("")
  const [Plan,setPlan]=useState("")
  const [soapNotesSummary,setSoapNotesSummary]=useState("")
  const [Allergy,setAllergy]=useState("")
  const [HPI,setHPI]=useState("")
  const [PMH,setPMH]=useState("") 
  const [ROS,setROS]=useState({
    "Constitutional":"",
    "Eyes": "",
    "ENT": "",
    "Cardiovascular":"",
    "Respiratory": "",
    "Gastrointestinal": "",
    "Genitourinary": "",
    "Musculoskeletal":"",
    "Skin": "",
    "Neurological": "",
    "Psychiatric": "",
  })
  
  //TimeZone
  const [userTimezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [Summary, setsummary] = useState(null); 

  const [chiefComplaint,setchiefComplaint]=useState("")
  const [physicalExamination,setphysicalExamination]=useState("")
  const [cptCodes,setCptCodes]=useState(null | [] )
  const [dxCodes,setDxCodes]=useState(null | [] )
  const [med,setmed]=useState("")
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [icdCodes, setIcdCodes] = useState(null | [] ); 
  const { patientId } = useParams();
  const [selectedOption, setSelectedOption] = useState("gpt-4o-mini");
  const [original , setOriginal] = useState("")
  const [Rationale,setRationale]=useState({
    "post_concussion_evaluation":"",
    "dti_brain_mri":"",
    "iv_micronutrients_im_vitamins":"",
    "neurofeedback_clarity_direct":""
  })
   const [SelectedConsultation , setSelectedConsultation] = useState(); 
   const [ConsultationType, setConsultationType] = useState([
    { URL: "/UploadAudio", PageName: "Upload An Audio File" },
    { URL: "/RecordAudio", PageName: "Medical Scribe with Voice Commands" },
    { URL: "/TextToReport", PageName: "Copy And Paste Text" },
    { URL: "/Transcribe", PageName: "Live Speech to Text Transcription" },
    { URL: "/online-consultation", PageName: "Online Consultation via Meeting" },
    { URL: "/manual-report", PageName: "Manual Report Creation" },
  ]);
  

  //loader
  const [loader, setLoader] = useState(false);

  const [meeting,setMeeting]=useState({})

  const [isopen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('empty');

  const defaultOptions = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }; 

  const showToast = (message, options = {}) => {
    toast(message, { ...defaultOptions, ...options });
  };


  //navigtor

  //use valid or not global access
  const [user,setUser]=useState(false)


  const formatCreatedAtDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
 
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    // Format the time
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const checker = async()=>{
    const token = JSON.parse(localStorage.getItem("token"))
    try{
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
      }

      let assistantToken = localStorage.getItem('assistantToken')
      if(assistantToken)
      {
        assistantToken = JSON.parse(assistantToken)
      }else{
        assistantToken = null
      }
      const res = await  axios.post(`${Node_API_URL}/api/post/checkUserToken`,{AssToken:assistantToken},config)
      console.log(res.data.response)
      if(res.data.response === true){
        if(res.data.role == 'Doctor')
        {
          setRole("Doctor")
        }
        else{
          setRole("Assistant")
        }
        return true
      }else{
        localStorage.removeItem('token')
        localStorage.removeItem('assistantToken')
        setToken("")
        return false
      }
    }
    catch(e){
      setToken("")
      localStorage.removeItem('token')
      localStorage.removeItem('assistantToken')
      return false
    }
  }

  const navigate = useNavigate()

  const[totalPatientCount,setTotalPatientCount]=useState("")
  const[todayPatientCount,setTodayPatientCount]=useState("")

  const getPaitentsCount = async () =>{
    try{
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
      const res = await axios.get(`${Node_API_URL}/api/get/getPaitentsCount`,config);
      console.log(res)
      if(res.data.response == true)
      {
        setTotalPatientCount(res.data.totalPatientCount)
        setTodayPatientCount(res.data.todayPatientCount)
      }
    }catch(e)
    {

    }
  }

  //Role
  const [role,setRole] = useState('Assistant')

  const [darkMode, setDarkMode] = useState(false);
  const [ ClearChat , setClearChat] = useState(false); 
  const [get, set]=useState(false); 
  const [Messages , setMessages] = useState ([]);    
  const [CalendarState , setCalendarState] = useState(false); 
  const [AppointmentRender , setAppointmentRender] = useState(false);


  const config = {
    headers:{
      "Authorization":`Bearer ${token}`
    }
  }


  const value = {config,role,setRole,userTimezone,Rationale,setRationale,navigate,meeting,setMeeting,setDarkMode,darkMode,checker,getPaitentsCount,totalPatientCount,todayPatientCount,setOriginal,original, formatCreatedAtDate,formatDateTime,loader,setToken , icdCodes,setIcdCodes,token,subjective,setSubjective,objective,setObjective, med, setmed ,cptCodes , setCptCodes, dxCodes, setDxCodes ,Assessment , setAssessment, Plan , setPlan , soapNotesSummary, setSoapNotesSummary, Allergy , setAllergy, HPI, setHPI, PMH, setPMH, ROS, setROS,chiefComplaint,setchiefComplaint,physicalExamination,setphysicalExamination,setUser ,user,showToast, setIsOpen,     setModalMessage,setClearChat,ClearChat ,set,get ,Messages , setMessages ,setCalendarState , CalendarState , SelectedConsultation , setSelectedConsultation , ConsultationType , setConsultationType , setAppointmentRender , AppointmentRender,Summary, setsummary ,selectedOption, setSelectedOption};

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
      {isopen && <MainModal modalMessage={modalMessage} setIsOpen={setIsOpen}/>}
    </GlobalStateContext.Provider>
  );
};
