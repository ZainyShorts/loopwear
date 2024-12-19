import React, { useContext, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home  from '../src/Pages/Home.js'
import SignPage from './Pages/signupPag.js';
import SigninPage from './Pages/signPage.js'; 
import Report from './Pages/Report.js'
import Form from'./Components/UserForm.js'
import SOAPnotes from './Pages/SOAPNotes.js';
import ResetPasswordPage from "./Pages/ResetPasswordPage"
import ResetPasswordPageConfirm from "./Pages/ResetPasswordPageConfirm";
import ActivatePage from "./Pages/ActivatePage";
import FichPatient from "./Pages/FichPatient.js"
import AOS from "aos";
import "aos/dist/aos.css";
import Choose from './Pages/choosePage.js' 
import ReportTest from './Pages/reportTest.js';
import Patients from './Pages/Patient.js';
import { useDispatch, useSelector } from 'react-redux';
import { reset, getUserInfo } from './features/auth/authSlice';
import Dashboard from './Pages/Dashboard.js';
import Help from './Pages/Help.js';
import Settings from './Pages/Settings.js';
import Price from './Pages/pricePage.js'
import LiveTranscription from './Pages/teste.js';
import axios from 'axios';
import { Node_API_URL } from './client.js';
import { GlobalStateContext } from './Context/GlobalStateContext.js';
import Meeting from './Pages/Meet/meeting.js';
import CreateMeet from './Pages/Meet/createMeeting.js';
import Share from './Pages/Share/share.js';
import ShareForm from './Pages/Share/shareForm.js';
import TodayPatients from './Pages/todaypatients.js';
import EHR from './Pages/ehr.js';
import Preview from './Pages/Meet/preview.js'
import AboutPage from './Pages/about.js';
import ContactPage from './Pages/contact.js';
import Appointment from './Pages/appointment.js';
import AppointmentStatus from './Pages/appointmentStatus.js';
import UpdatePatientForm from './Pages/VoiceIntake/UpdatePatientForm.js'
import Calender from './Pages/calander.js'
import AppointmentMenuPage from './Pages/appointmentMenu.js';
import Consultation from './Pages/consultation.js'; 
import UploadAudio from './Pages/UploadAudio.js'; 
import RecordAudio from './Pages/RecordAudio.js';
import Transcribe from './Pages/transcribe.js'
import TextData from './Pages/textdata.js'
import QuickReport from './Pages/quickReport.js'
import AimsAssistant from './Pages/AimsAssistant.js'; 
import AppoitmentSelection from './Pages/AppoitmentSelection.js';
import Registration from './Pages/registration.js';
import TawkTo from './lib/tawk/Twak.js';
import AppointmentConfirmation from './Pages/Confirmations/AppointmentConfirmation.js'; 
import Invoice from './Pages/Invoice.js';
import OpenAiReport from './Pages/Report-2.0/OpenAiReport.js';
function App() {
  const { setUser } = useContext(GlobalStateContext)
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const checker = async()=>{
    const token = JSON.parse(localStorage.getItem("token"))
    try{
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
      const res = await  axios.get(`${Node_API_URL}/api/get/checkUserToken`,config)
      if(res.data.response === true){
        setUser(true)
        return true
      }
      return false
    }
    catch(e){
      return false
    }
  }
  
  useEffect(() => {
      
      dispatch(reset())
      if(checker()){
        dispatch(getUserInfo())
      }
  }, [dispatch]);

  
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const {darkMode,setDarkMode} = useContext(GlobalStateContext)

  // useEffect(()=>{
  //   const theme  = localStorage.getItem("theme");
  //   if(theme)
  //   {
  //    if(theme == 'dark')
  //    {
  //     document.body.style.backgroundColor = "#1A202C";
  //     if(isMobile)
  //     {
  //       const html  = document.querySelector('html')
  //       html.style.backgroundColor = '#0F172A'; 
  //     }
  //    }
  //    else if(theme == 'light')
  //    {
  //     document.body.style.backgroundColor = "#ffffff";
  //     if(isMobile)
  //     {
  //       const html  = document.querySelector('html')
  //       html.style.backgroundColor = '#0F172A'; 
  //     }
  //    }else{
  //     document.body.style.backgroundColor = "#1A202C";
  //     if(isMobile)
  //     {
  //       const html  = document.querySelector('html')
  //       html.style.backgroundColor = '#0F172A'; 
  //     }
  //     localStorage.setItem("theme","dark")
  //    }
  //   }
  //   else{
  //     localStorage.setItem("theme","dark")
  //   }
  // },[])
  
  return (
    <div className={`${darkMode ? '' : 'dark'} `}>
        <TawkTo/>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path='/About' element={<AboutPage/>} />
          <Route path='/Meeting' element={<Meeting/>} />
          <Route path='/FeedBack' element={<ContactPage/>} />
          <Route path={'/CreateMeet'} element={<CreateMeet/>}/>
          <Route path="/profile" element={<Choose name={userInfo}/>  } />
          <Route path={'/MeetingPreview'} element={<Preview/>}/>
          <Route path={'/Share/:qrId'} element={<Share/>} />
          <Route path="/PatientFich/:patientId" element={ <FichPatient name={userInfo}/>} />
          <Route path="/Dashboard" element={<Dashboard name={userInfo}/>  } />
          <Route path="/Help" element={<Help name={userInfo}/>  } />
          <Route path="/Settings" element={<Settings name={userInfo}/>   } />
          <Route path="/Patient" element={ <Patients name={userInfo} /> }/>
          <Route path="/TodayPatients" element={ <TodayPatients name={userInfo} /> }/>
          <Route path="/Consultation/:patientId" element={ <Consultation name={userInfo}/>} /> 
          <Route path="/AppointmentConfirmation/:appId" element={ <AppointmentConfirmation name={userInfo}/>} /> 
          <Route path="/Consultation/UploadAudio/:patientId" element={ <UploadAudio name={userInfo}/>} />
          <Route path="/Consultation/RecordAudio/:patientId" element={ <RecordAudio name={userInfo}/>} />
          <Route path="/form" element={<Form name={userInfo}/>} />
          <Route path="/report/:visitId" element={<Report name={userInfo}/>} />
          <Route path="/SOAPnotes/:patientId" element={<SOAPnotes name={userInfo}/>} />
          <Route path="/signup" element={<SignPage />} /> 
          <Route path="/login" element={<SigninPage />} />
          <Route path='/price' element={<Price/>}/> 
          <Route path="/Invoice" element={<Invoice  name={userInfo} />} />
          <Route path='/EHR' element={<EHR/>}/>
          <Route path='/Appointment' element={<Appointment/>}/>
          {/* <Route path='/AppointmentStatus' element={<AppointmentStatus/>}/> */}
          <Route path='/AppointmentMenu' element={<AppointmentMenuPage/>}/> 
          <Route path="/AppointmentSelection" element={<AppoitmentSelection name={userInfo} />} />
          <Route path='/tesing' element={<LiveTranscription/>}/>
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordPageConfirm />} />
          <Route path="/activate/:uid/:token" element={<ActivatePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/registerPatient/:docID" element={<ShareForm/>} />  
          <Route path="/AimsAssistant" element={<AimsAssistant  name={userInfo} />} />
          <Route path="/updatePatient/:docID" element={<UpdatePatientForm/>} />
          {/* <Route path="/Calendar" element={<Calender/>} /> */}
          <Route path='/Consultation/Transcribe/:patientId' element={<Transcribe/>} />
          <Route path='/Consultation/TextToReport/:patientId' element={<TextData/>} />  
          <Route path='/OpenAiReport' element={<OpenAiReport/>} /> 
           
          <Route path='/QuickReport' element={<QuickReport/>} /> 
          <Route path='/AllReports' element={<ReportTest/>} />

          <Route path='/registrationmiami' element={<Registration/>} />
       </Routes>
    </div>
  );
}

export default App;