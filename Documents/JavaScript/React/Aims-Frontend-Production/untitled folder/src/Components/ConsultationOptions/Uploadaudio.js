/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaMusic, FaTrashAlt } from 'react-icons/fa'; // Importing MP3 and Delete icons
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { demoURL } from '../../client'; 
import Loader from '../ui/Loader/Loader.js';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; 
import { useNavigate } from "react-router-dom";

const UploadAudioCompo = () => {
  const {user,setUser,checker,setOriginal,setIcdCodes,setSubjective, setObjective, setmed,setCptCodes, setDxCodes, setAssessment, setPlan, setSoapNotesSummary, setAllergy, setHPI, setPMH, setROS, setchiefComplaint,setphysicalExamination} = useContext(GlobalStateContext)
  const [selectedFile, setSelectedFile] = useState(null);
  const { patientId } = useParams();
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const fileUploadLabelStyle = {
    cursor: 'pointer',
    backgroundColor: '#ddd',
    padding: '30px 70px',
    borderRadius: '40px',
    border: '2px dashed rgb(82, 82, 82)',
    boxShadow: '0px 0px 200px -50px rgba(0, 0, 0, 0.719)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  };

  const browseButtonStyle = {
    backgroundColor: 'rgb(82, 82, 82)',
    padding: '5px 15px',
    borderRadius: '10px',
    color: 'white',
    transition: 'all 0.3s',
  };

  const browseButtonHoverStyle = {
    backgroundColor: 'rgb(14, 14, 14)',
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDelete = () => {
    setSelectedFile(null); 
  }; 
 

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
      formData.append('file', selectedFile);
      formData.append('type', 'upload');
      formData.append('practice', 'main-aims')
      
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
      toast.error('Failed to generate report')

      }finally{
    setLoading(false)
  }
  }


  return (
    <>
 <ToastContainer />
    
 {loading && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} 
  >
    <Loader />
  </div>
)}
      <div className="flex flex-col w-full  justify-center items-center">
       <h1 className='text-white mb-4 font-semibold text-2xl'> Choose The Audio File </h1>
        <div >
          <label htmlFor="file" style={fileUploadLabelStyle}>
            <div className="file-upload-design flex mt-4 flex-col">
              {selectedFile!=null  && (
                
                <>
                  <FaMusic size={40} color="green" className='mx-auto' />
                  <p>{selectedFile.name}</p>
                 
                </>
              ) }
              {selectedFile==null && (
                // Display the upload prompt if no file is selected
                <>
                  <svg className='mx-au' viewBox="0 0 660 532" height="4em">
                    <path
                      d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                    ></path>
                  </svg>
                  <p>Select Audio File</p>
                  <span
                    className="browse-button"
                    style={browseButtonStyle}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor =
                        browseButtonHoverStyle.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor =
                        browseButtonStyle.backgroundColor)
                    }
                  >
                    Browse file
                  </span>
                </>
              )}
            </div>
            <input
              id="file"
              type="file"
              style={{ display: 'none' }}
              accept="audio/mp3" 
              onChange={handleFileChange}
            />
          </label>
        </div>  
        <div className="flex gap-4 mt-4">
                   
        <button onClick={() => navigate(`/Consultation/${patientId}`)} className="mt-12 bg-indigo-600 w-32 text-white py-2 px-4 rounded">Back</button> 
        {selectedFile && selectedFile.type === 'audio/mpeg'  && ( 
                        <>
                     <button 
                      className='mt-12 bg-green-600 w-32 text-white py-2 px-4 rounded' 
                      onClick={next}
                    >
                      Next
                    </button>   

                    <div  
                     onClick={handleDelete}
                      className='mt-12 bg-red-600 cursor-pointer  flex gap-1 justify-center items-center w-32 text-white py-2 px-4 rounded' 
                      >  
                      Delete
                    <FaTrashAlt
                      size={15}
                      color="white"
                      style={{ cursor: 'pointer', margin:"5px" }}
                    />   
                    </div>
                    </>
                    )}
 
                  </div>
      </div>
        

    </>
  );
};

export default UploadAudioCompo;
