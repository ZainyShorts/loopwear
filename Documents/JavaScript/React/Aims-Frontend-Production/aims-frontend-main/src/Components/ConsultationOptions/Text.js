import React, { useContext, useEffect, useState } from 'react';
import ScreenLoader from '../loading.js'
import axios from 'axios';
import { demoURL } from '../../client';
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom"; 
import UploadAudioCompo from './Uploadaudio.js';

const TextAreaComponent = ({ON}) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const { patientId } = useParams();

  const clearText = () => {
    setText('');
  };

  const copyText = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  
  const {navigate,user,setUser,checker,setOriginal,setIcdCodes,setSubjective, setObjective, setmed,setCptCodes, setDxCodes, setAssessment, setPlan, setSoapNotesSummary, setAllergy, setHPI, setPMH, setROS, setchiefComplaint,setphysicalExamination} = useContext(GlobalStateContext)
  
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





  
  const next = async()=>{
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
      setROS({})
      setchiefComplaint("")
      setSoapNotesSummary("")
      setOriginal("")
     
      const formData = new FormData();
      formData.append('text', text);
      formData.append('type', 'text');
      formData.append('practice', 'main-aims');
      const response = await axios.post(`${demoURL}/post/generateReportFromAudioFile`, formData);
      // console.log(response)
      if(response.data.success === true){
        const codes = response.data.code
        const data = response.data.data
        const listofros = response.data.Ros
        // console.log(codes)
        setOriginal(response.data.original) 
        const report = { 
          codes : codes, 
          data:data, 
          listofRos:listofros,
        }
    
        localStorage.setItem('Report',JSON.stringify(report)); 
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
       
        


        setLoading(false);
        navigate(`/SOAPnotes/${patientId}?mode=generate`);
       
      
      }else{
        toast.error(response.data.msg)
      }
      } catch (error) {
        setLoading(false)
      toast.error('Failed to generate report')

      }finally{
    setLoading(false)
  }
  }



  return (
    <>
    <ToastContainer />
    {loading ? (
        <ScreenLoader />
    ) : (
        <div className="flex flex-col items-center justify-center mt-10 dark:bg-slate-900 p-4">
            {ON ? ( 
             <div className="fade-in-animation">
                <UploadAudioCompo /> 
                </div>
            ) : (
                <>
                    <textarea
                        className="h-[10cm] fade-in-animation  w-[75%] dark:bg-slate-800 text-white p-2 border rounded shadow"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your text here..."
                    ></textarea>
                    <div className="flex space-x-4 fade-in-animation mt-4">
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                            onClick={() => navigate(`/Consultation/${patientId}`)}
                        >
                            Back
                        </button>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                            onClick={clearText}
                        >
                            Clear
                        </button>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                            onClick={copyText}
                        >
                            Copy
                        </button>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                            onClick={next}
                        >
                            Next
                        </button>
                    </div>
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
</>


  );
};

export default TextAreaComponent;
