/*eslint-disable*/
import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { API_URL, flask_API_URL, GOOGLE_SHEET, Node_API_URL } from "../client";
import useAutoResizeTextarea from "./AutoResize";
import Loading from "./loading";
import axios from "axios";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify"; 
import { useLocation } from 'react-router-dom'; 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SoapNote = () => {
  const {Rationale,setRationale,setUser,original,checker,dxCodes,setDxCodes,icdCodes,setIcdCodes,subjective,objective, med,setmed,cptCodes,setCptCodes,soapNotesSummary,setObjective,setSubjective, Assessment , setAssessment ,setSoapNotesSummary, Plan , setPlan , Allergy , setAllergy, HPI , setHPI, PMH , setPMH , ROS , setROS , chiefComplaint , setchiefComplaint , physicalExamination ,setphysicalExamination, token,showToast,userTimezone ,Summary, setsummary } = useContext(GlobalStateContext)
  const { patientId } = useParams();
  const { userInfo } =useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const query = useQuery();
  const mode = query.get('mode'); 
  const [Manual , setManual] = useState(false);
  useEffect(()=>{
    if(mode=="edit" || mode=="generate" || mode=="Manual")
    {
      if(mode=="generate" && localStorage.getItem("visit-id"))
      {
       navigate('/profile')
      }
      checker().then((res)=>{
        if(res==false)
        {
          setUser(false)
          dispatch(logout())
          navigate('/')
        }else{
          if(mode=="edit")
          {
            fetchReportData()
          }
          
          if (mode=="Manual") { 
            setManual(true);
          }
        }
        
      }) 
    }else{
      navigate('/profile')
    } 
  },[]) 
  useEffect(()=>{    
    if (mode=="generate") {
    const Data = JSON.parse(localStorage.getItem('Report'));  
    if(Data.data.Medications==null || Data.data.Medications=="" )
      {
        setmed("Not discussed during the consultation.")
      }else{
        setmed(Data.data.Medications)
      }
      // ------------------------------------
      if(Data.data.Assessment == null || Data.data.Assessment=="")
      {
        setAssessment("Not discussed during the consultation.");
      }else{
        setAssessment(Data.data.Assessment);
      }
      // ---------------------------------------
      if(Data.codes['ICD-10 Codes'] == null || Data.codes['ICD-10 Codes']  == "" || Data.codes['ICD-10 Codes'] == [] ){
        setIcdCodes([{code:"null",description:"Not discussed during the consultation."}])
      }else{
        setIcdCodes(Data.codes['ICD-10 Codes'])
      }
      if(Data.codes['CPT Codes'] == null || Data.codes['CPT Codes'] == "" || Data.codes['CPT Codes']== []){
        setCptCodes([{code:"null",description:"Not discussed during the consultation."}])
      }else{
        setCptCodes(Data.codes['CPT Codes'])
      }
      if(Data.data.Plan==null || Data.data.Plan=="")
      {
        setPlan("Not discussed during the consultation.");
      }else{
        setPlan(Data.data.Plan);
      }

      if(Data.data.SUMMARY==null || Data.data.SUMMARY=="")
      {
        setSoapNotesSummary("Not discussed during the consultation.");
      }else{
        setSoapNotesSummary(Data.data.SUMMARY);
      }

      if(Data.data.Allergies==null || Data.data.Allergies=="")
      {
        setAllergy("Not discussed during the consultation.");
      }else{
        setAllergy(Data.data.Allergies);
      }

      if(Data.data['History of Present Illness (HPI)']==null || Data.data['History of Present Illness (HPI)']=="")
      {
        setHPI("Not discussed during the consultation.");
      }
      else{
        setHPI(Data.data['History of Present Illness (HPI)']);
      }

      if(Data.data['Past Medical History (PMH)']==null || Data.data['Past Medical History (PMH)']=="")
      {
        setPMH("Not discussed during the consultation.");
      }else{
        setPMH(Data.data['Past Medical History (PMH)']);
      }
      

  
      
       let rosData = {
        Constitutional: `${Data.listofRos.Constitutional['type']}. ${Data.listofRos.Constitutional['description']}` || 'Negative',
        Eyes: `${Data.listofRos.Eyes['type']}. ${Data.listofRos.Eyes['description']}` || 'Negative',
        ENT: `${Data.listofRos.ENT['type']}. ${Data.listofRos.ENT['description']}` || 'Negative',
        Cardiovascular:`${Data.listofRos.Cardiovascular['type']}. ${Data.listofRos.Cardiovascular['description']}` || "Negative",
        Respiratory: `${Data.listofRos.Respiratory['type']}. ${Data.listofRos.Respiratory['description']}` || 'Negative',
        Gastrointestinal: `${Data.listofRos.Gastrointestinal['type']}. ${Data.listofRos.Gastrointestinal['description']}` || 'Negative',
        Genitourinary: `${Data.listofRos.Genitourinary['type']}. ${Data.listofRos.Genitourinary['description']}` || 'Negative',
        Musculoskeletal: `${Data.listofRos.Musculoskeletal['type']}. ${Data.listofRos.Musculoskeletal['description']}` || 'Negative',
        Skin: `${Data.listofRos.Skin['type']}. ${Data.listofRos.Skin['description']}` || 'Negative',
        Neurological: `${Data.listofRos.Neurological['type']}. ${Data.listofRos.Neurological['description']}` || 'Negative',
        Psychiatric: `${Data.listofRos.Psychiatric['type']}. ${Data.listofRos.Psychiatric['description']}` || 'Negative',
      };
    


      setROS(rosData)

      if(Data.data['Chief Complaint']==null || Data.data['Chief Complaint']=="")
      {
        setchiefComplaint("Not discussed during the consultation.");
      }else{
        setchiefComplaint(Data.data["Chief Complaint"]);
      }
     

      if(Data.data['Physical Examination']==null || Data.data['Physical Examination']=="")
      {
        setphysicalExamination("Not discussed during the consultation.");
      }
      else{          
        setphysicalExamination(Data.data["Physical Examination"]);
      }
    
      if(Data.data['Subjective']==null || Data.data['Subjective']=="")
      {
        setSubjective("Not discussed during the consultation.");
      }else{

        setSubjective(Data.data["Subjective"])
      }

      if(Data.data['Objective']==null || Data.data['Objective']=="")
      {
        setObjective("Not discussed during the consultation.");
      }else{
        setObjective(Data.data["Objective"])
      }  
    } 
    else if (mode == "Manual") { 
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
    }
  },[])
  const [medications, setMedications] = useState([]);
 
  const [editStates, setEditStates] = useState(
    new Array(cptCodes.length).fill(true)
  );
  const [editStatesdx, setEditStatesdx] = useState(
    new Array(dxCodes.length).fill(true)
  );
  const [editStatesmed, setEditStatesmed] = useState(
    new Array(icdCodes.length).fill(true)
  );

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading
  const [showInput, setShowInput] = useState({
    cptCodess: false,
    dxCodes: false,
    icdCodes: false,
    medications: false,
    subjective: false,
    objective: false,
    Assessment: false,
    med:false,
    Plan: false,
    HPI: false,
    ROS: false,
    PMH: false,
    chiefComplaint: false,
    physicalExamination: false,
    Rationale:false
  });
  const [medicalData, setMedicalData] = useState();

  useEffect(() => {
    if (Manual) {
      setShowInput(prevState => {
        const updatedState = {};
        Object.keys(prevState).forEach(key => {
          updatedState[key] = true;
        });
        return updatedState;
      });
    } else {
      setShowInput(prevState => {
        const updatedState = {};
        Object.keys(prevState).forEach(key => {
          updatedState[key] = false;
        });
        return updatedState;
      });
    }
  }, [Manual]);

  const HPIRef = useAutoResizeTextarea(HPI);
  const AllergyRef = useAutoResizeTextarea(Allergy);
  const ROSRef = useAutoResizeTextarea(ROS);
  const PMHRef = useAutoResizeTextarea(PMH);
  const chiefComplaintRef = useAutoResizeTextarea(chiefComplaint);
  const physicalRef = useAutoResizeTextarea(physicalExamination);
  const assessmentRef = useAutoResizeTextarea(Assessment);
  const planRef = useAutoResizeTextarea(Plan);
  const cptRef = useAutoResizeTextarea(cptCodes);
  const medicationRef = useAutoResizeTextarea(medications);
  const icdCodesRef = useAutoResizeTextarea(icdCodes);
  const dxCodesRef = useAutoResizeTextarea(dxCodes);
  const medRef = useAutoResizeTextarea(med);
  const subjectiveRef = useAutoResizeTextarea(subjective);
  const objectiveRef = useAutoResizeTextarea(objective);
  const RationaleRef = useAutoResizeTextarea(Rationale);
  const pdfRef = useRef();
  
 



  const SOAPEdit = (code, bool) => {
    setShowInput((prevShowInput) => ({
      ...prevShowInput,
      [code]: bool,
    }));
  };



  const handleEDITClick = async (index, codeType, codet, event) => {
    event.preventDefault();
    setEditIndex(index);
    setEditValue(codet);
  };

  const handleDeleteClick = async (index, codeType, event) => {
    event.preventDefault();
    const check = confirm("Are you sure");
    if(!check)
    {
      return;
    }
        switch (codeType) {
          case "cpt_codes":
            setCptCodes((prevCodes) => prevCodes.filter((_, i) => i !== index));
            break;
          case "icdCodes":
            setIcdCodes((prevCodes) => prevCodes.filter((_, i) => i !== index));
            break;
          case "dxCodes":
            setDxCodes((prevCodes) => prevCodes.filter((_, i) => i !== index));
            break;
          case "Plan":
            setPlan("");
            break;
          case "subjective":
            setSubjective("");
            break;
          case "objective":
            setObjective("");
            break;
          case "Assessment":
            setAssessment("");
            break;
          case "med":
            setmed("");
            break;
          case "Medications":
            console.log("meds");
            setMedications((prevCodes) =>
              prevCodes.filter((_, i) => i !== index)
            );
            break;
          default:
            break;
        }
  };

 

  const handleFormSubmit = (codeType, event) => {
      event.preventDefault();
      if (codeType === "cpt_codes") {
        setCptCodes([...cptCodes, inputValue.cptCode]);
        setInputValue({ ...inputValue, cptCode: "" });
      } else if (codeType === "dxCodes") {
        setDxCodes([...dxCodes, inputValue.dxCodes]);
        setInputValue({ ...inputValue, dxCodes: "" });
      }else if(codeType === "icdCodes")
      {
        setIcdCodes([...icdCodes, inputValue.icdCodes]);
        setInputValue({ ...inputValue, icdCodes: "" });
      }
  };

  const handleInputChangee = (event, index, codeType) => {
    let newCodes;
    switch (codeType) {
      case "dxCodes":
        newCodes = [...dxCodes];
        newCodes[index] = event.target.value;
        setDxCodes(newCodes);
        break;
      case "cptCode":
        newCodes = [...cptCodes];
        newCodes[index] = event.target.value;
        setCptCodes(newCodes);
        break;
      case "icdCodes":
        newCodes = [...icdCodes];
        newCodes[index] = event.target.value;
        setIcdCodes(newCodes);
        break;
      case "medications":
        newCodes = [...medications];
        newCodes[index] = event.target.value;
        setMedications(newCodes);
        break;
      default:
        newCodes = [];
        console.log("error");
    }
  };



  const [data, setData] = useState([]);
  const [showSuggestionList, setShowSuggestionList] = useState(false);



  const getSuggestions = (value, code) => {
    const inputValue = value.trim().toLowerCase();
    // console.log(
    //   medicalData
    //     .filter((item) => item.toLowerCase().includes(inputValue))
    //     .map((item) => ({
    //       displayText: item,
    //     }))
    // );
    return inputValue === 0
      ? []
      : code !== "icdCodes"
      ? data
          .filter(
            (item) =>
              (item.label && item.label.toLowerCase().includes(inputValue)) ||
              (item.code && item.code.toLowerCase().includes(inputValue))
          )
          .map((item) => ({
            ...item,
            displayText: `${item.code} - ${item.label}`,
          }))
      : medicalData
          .filter((item) => item.toLowerCase().includes(inputValue))
          .map((item) => ({
            displayText: item,
          }));
  };

  const onInputChange = (event, codeType) => {
    const value = event.target.value;
    switch (codeType) {
      case "cptCode":
        setInputValue({ ...inputValue, cptCode: event.target.value });
        setSuggestions(getSuggestions(value, codeType));
        setShowSuggestions(true);
        break;
      case "dxCodes":
        setInputValue({ ...inputValue, dxCodes: event.target.value });
        setSuggestions(getSuggestions(value, codeType));
        setShowSuggestions(true);
        break;
      case "icdCodes":
        setInputValue({ ...inputValue, icdCodes: event.target.value });
        setSuggestions(getSuggestions(value, codeType));
        setShowSuggestions(true);
        break;
      default:
        break;
    }
  };

  const onSuggestionClick = (suggestion, codeType) => {
    switch (codeType) {
      case "cptCode":
        setInputValue({
          ...inputValue,
          cptCode: `${suggestion.code} - ${suggestion.displayText}`,
        });
        break;
      case "dxCode":
        setInputValue({
          ...inputValue,
          dxCode: `${suggestion.code} - ${suggestion.displayText}`,
        });
        break;
      case "icdCodes":
        setInputValue({
          ...inputValue,
          icdCodes: `${suggestion.displayText}`,
        });
        break;
      default:
        break;
    }
    setSuggestions([]);
    setShowSuggestions(false);
  }; 
  const setSummary = (e) => { 
    setSoapNotesSummary(e.target.value);
  }
  const storeReport = async(e)=>{
    e.preventDefault() 
    if(patientId == 'Quick')
    {
      navigate(`/QuickReport`)
      return
    }
    try{
      setLoading(true)
      let data;  
      const ObjectROS = Object.keys(ROS).reduce((acc, key) => {
        acc[key] = ROS[key] === "" ? "N/A" : ROS[key];
        return acc;
      }, {});
       
       
      
      if(mode=="generate")
      {
        
        data={
          userTimezone,
          pId:patientId,
          doc_id:userInfo._id,
          all:original,
          soapNotesSummary,
          subjective,
          objective,
          chiefComplaint,
          HPI,
          PMH,
          Allergy,
          ROS:JSON.stringify(ROS),
          physicalExamination,
          Assessment,
          med,
          cptCodes,
          icdCodes,
          dxCodes,
          Plan,
          Rationale:JSON.stringify(Rationale),
          mode,
        }
        }else if(mode=="edit"){
          data={
            userTimezone,
            pId:patientId,
            soapNotesSummary,
            subjective,
            objective,
            chiefComplaint,
            HPI,
            PMH,
            Allergy,
            ROS:JSON.stringify(ObjectROS),
            physicalExamination,
            Assessment,
            med,
            cptCodes,
            icdCodes,
            dxCodes,
            Plan,
            Rationale:JSON.stringify(Rationale),
            mode
        }  
      }
      else if (mode === "Manual") { 
         
        data = {
            userTimezone: userTimezone || 'N/A',
            pId: patientId || 'N/A',
            soapNotesSummary: soapNotesSummary || 'N/A',
            subjective: subjective || 'N/A',
            objective: objective || 'N/A',
            chiefComplaint: chiefComplaint || 'N/A',
            HPI: HPI || 'N/A',
            PMH: PMH || 'N/A',
            Allergy: Allergy || 'N/A',  
            ROS:JSON.stringify(ObjectROS),
            physicalExamination: physicalExamination || 'N/A',
            Assessment: Assessment || 'N/A',
            med: med || 'N/A',
            cptCodes: cptCodes,
            icdCodes: icdCodes,
            dxCodes: dxCodes,
            Plan: Plan || 'N/A',
            mode: 'generate'
        };
    }
    
      
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
      const res  = await axios.post(`${Node_API_URL}/api/post/createVisit`,data,config)
      
      console.log(res);
      if(res.data.response === true)
      {
       if(mode=="generate"){
         showToast('Report generated')
       }else{
        showToast('Report updated')
       }
        // toast.success('Report created')
        if(mode=="edit")
        {
          navigate(`/report/${patientId}`)
        }else{
          localStorage.setItem("visit-id",res.data.id)
          navigate(`/report/${res.data.id}`)
        }
        localStorage.removeItem("previous")
        
      }else{
        // toast.error(res.data.msg)
      }
    }catch(e)
    {
      // toast.error("Error generating report try again")
    }finally{
      setLoading(false)
    }
  }

  const fetchReportData = async()=>{

    try
    {
      // setLoading(true)
      const config = {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
      const res = await axios.get(`${Node_API_URL}/api/get/editReport?visitId=${patientId}`,config) 
      console.log(res);
      if(res.data.response === true)
      {
        const visit = res.data.visit;
        setCptCodes(visit.cptCodes)
        setIcdCodes(visit.icdCodes)
        setDxCodes(visit.dxCodes)
        setAllergy(visit.Allergy)
        setROS(JSON.parse(visit.ROS))
        setPlan(visit.Plan)
        setAssessment(visit.Assessment)
        setSoapNotesSummary(visit.soapNotesSummary)
        setSubjective(visit.subjective)
        setObjective(visit.objective)
        setmed(visit.med)
        setphysicalExamination(visit.physicalExamination)
        setchiefComplaint(visit.chiefComplaint)
        setPMH(visit.PMH)
        setHPI(visit.HPI)
        setRationale(JSON.parse(visit.Rationale))
      }
    }catch(e)
    {
      console.log("error in fetching report data refresh page please")
    }finally{
      setLoading(false)
    }

  }

  const [isOpen, setIsOpen] = useState(false);
  const [modalLoader,setModalLoader]=useState(false)

  const toggleModal = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen);
    setAddCode("")
    setAddDesc("")
  };  
  

  const editToggleModal = (e)=>{
    e.preventDefault()
    setIsEditModalOpen(!isEditModalOpen);
    setEditCode("")
    setEditDesc("")
    setModalLoader(false)
  }
  const [addMode,setAddMode]=useState("")
  const [addCode,setAddCode]=useState("")
  const [addDesc,setAddDesc]=useState("")
  const addICTAndCPTCode = () => {
    if (addCode && addDesc) {
      const obj = {
        code: addCode,
        description: addDesc,
      };
  
        if (addMode === "cptCodes") {
          setCptCodes((prev) => (prev) ? [...prev, obj] : [obj]); 
        } else if (addMode === "icdCodes") {
          setIcdCodes((prev) => (prev) ? [...prev, obj] : [obj]);
      } 
  
      setAddCode("");
      setAddDesc("");
      setIsOpen(false);
    } else {
      console.log("Code and description are required to add.");
    }
  };
  

  const [suggestions, setSuggestions] = useState([]);

  function convertToUppercase(inputString) {
    let result = "";
    for (let char of inputString) {
        if (/[a-zA-Z]/.test(char)) {
            result += char.toUpperCase();
        } else {
            result += char;
        }
    }
    return result;
}
  const handleCodeChange = async (e) => {

      setModalLoader(true)
    const value = e.target.value;
    setAddCode(value);


    if (value) {
       const query = convertToUppercase(value);
       let filteredSuggestions;
       if(addMode=="icdCodes")
       {
        try{
          filteredSuggestions = await axios.get(`${GOOGLE_SHEET}?CODE=${query}*&limit=10`)
        }catch(e){
          toast.error("ICD Codes are not avaialble yet")
        }finally{
          setModalLoader(false)
        }
       }else if(addMode=="cptCodes"){
        try{
          filteredSuggestions = await axios.get(`${GOOGLE_SHEET}?CODE=${query}*&limit=10`)
        }catch(e){
          toast.error("CPT Codes are not avaialble yet")
        }finally{
          setModalLoader(false)
        }
       }
       setSuggestions(filteredSuggestions.data);
    } else {
      setSuggestions([]);
    }

  };


  const handleSuggestionClick = (suggestion) => {
    setAddCode(suggestion['CODE']);
    setAddDesc(suggestion['DESCRIPTION'])
    setSuggestions([]);
  };

  const [editCode,setEditCode]=useState("")
  const [editDesc,setEditDesc]=useState("")
  const [isEditModalOpen,setIsEditModalOpen]=useState(false)
  const [index,setIndex]=useState(0)
  const [name,setName]=useState("")
  const editCodes = (e,name,index) =>{
    e.preventDefault();

    setName(name)
    setIndex(index)
    if(name=="cptCodes")
    {
      setEditCode(cptCodes[index]['code'])
      setEditDesc(cptCodes[index]['description'])
      setIsEditModalOpen(true)
    }else{
      setEditCode(icdCodes[index]['code'])
      setEditDesc(icdCodes[index]['description'])
      setIsEditModalOpen(true)
    }

  }

  const updateCode =()=>{
      const obj={
        code:editCode,
        description:editDesc
      }
      if(name=="cptCodes")
    {
       cptCodes[index]=obj;
    }else{
      icdCodes[index]=obj;
    }
      setName("")
      setIsEditModalOpen(false);
      setEditCode("")
      setEditDesc("")


  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setROS({
      ...ROS,
      [name]: value
    });
  };

  const handleChangeRationale = (e) => {
    const { name, value } = e.target;
    setRationale({
      ...Rationale,
      [name]: value
    });
  };


  const [dis,ddis]=useState({
    "Constitutional":true,
    "Eyes": true,
    "ENT": true,
    "Cardiovascular":true,
    "Respiratory": true,
    "Gastrointestinal": true,
    "Genitourinary": true,
    "Musculoskeletal":true,
    "Skin": true,
    "Neurological": true,
    "Psychiatric": true,
    "post_concussion_evaluation":true,
    "dti_brain_mri":true,
    "iv_micronutrients_im_vitamins":true,
    "neurofeedback_clarity_direct":true,
    
  })


  

  const handleChangeDisable = (e,name,value) => {
    e.preventDefault()
    ddis({
      ...dis,
      [name]: value
    });
  };


  

  return (
    <>
    <>
    {/* edit code modal  */}
    <div className="relative">
      

      {isEditModalOpen && (
        <>
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="text-center text-xl font-semibold mb-4">ICT CODE</div>
          <div className="mb-4">
            <input
              value={editCode}
              onChange={(e)=>setEditCode(e.target.value)}
              type="text"
              placeholder="Code"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              value={editDesc}
              onChange={(e)=>setEditDesc(e.target.value)}
              type="text"
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={editToggleModal}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Close
            </button>
            <button
              onClick={updateCode}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
        </>
      )}
    </div>
    {/* add  code modal  */}
    <div className="relative">
      

      {isOpen && (
        <>
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 z-40">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="text-center text-xl font-semibold mb-4">{addMode == "cptCodes"? "CPT CODE" : "ICT CODE"}</div>
          <div className="mb-4">
            <input
              value={addCode}
              disabled={modalLoader}
              onChange={handleCodeChange}
              type="text"
              placeholder="Code"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            {suggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {`${suggestion['CODE']}\n${suggestion['DESCRIPTION']}`}
                  </li>
                ))}
              </ul>
            )}
            <input
              value={addDesc}
              type="text"
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={toggleModal}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Close
            </button>
            <button
              onClick={addICTAndCPTCode}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
             {modalLoader ? 'Loading' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
        </>
      )}
    </div>

    </>
      {loading ? (
        <Loading />
      ) : (<>
    <ToastContainer />
        <div className="  bg-white border dark:border-gray-700 border-gray-200 rounded-lg shadow  overflow-hidden">
          <div className="bg-gray-200  border-gray-200 dark:border-gray-800 rounded-lg shadow">
            
            <div />
            <div
              className="p-8 h-full dark:bg-slate-800  bg-white rounded-md shadow-xl "
              ref={pdfRef}
            >
              <form className="mt-6">
                <div>
                  <h1 className="font-semibold dark:text-gray-300 text-bl">Consultation Summary:</h1>
                {!Manual ? (
                  <div className="box-border w-full p-4 mt-4 border dark:text-gray-200 border-gray-400">
                  {soapNotesSummary}
                  </div>

                ) : ( 
                  <textarea   
                   className="bg-gray-300 h-auto rounded w-full p-2 text-gray-700 leading-tight resize-none focus:outline-none focus:bg-white focus:border-purple-500"
                   id="inline-full-name" 
                  value={Summary} 
                  onChange={setSummary}
                   />
                )}
                </div>
                <div className="mt-4">
                  <h1 className="font-semibold text-bl dark:text-gray-300">SOAP NOTES</h1>
                  <div className="box-border w-full p-4 mt-4 border border-gray-400">
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">Assessment:</h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 h-auto rounded w-full p-2 text-gray-700 leading-tight resize-none focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          ref={(el) => (assessmentRef.current[0] = el)}
                          value={Assessment}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.Assessment && !Manual}
                          onChange={(event) => setAssessment(event.target.value)}
                        />
                      </div> 
                     {!Manual && ( 
                      !showInput.Assessment ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("Assessment", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick("NaN", "Assessment", Assessment, e);
                            SOAPEdit("Assessment", false);
                          }}
                        >
                          Submit
                        </button>
                      )
                    )} 
                    </div>
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">Plan:</h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 h-auto rounded w-full p-2 text-gray-700 leading-tight resize-none focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          ref={(el) => (planRef.current[0] = el)}
                          value={Plan}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.Plan && !Manual}
                          onChange={(event) => setPlan(event.target.value)}
                        />
                      </div> 
                      {!Manual && ( 
                      !showInput.Plan ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-300 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("Plan", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-300 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick("NaN", "Plan", Plan, e);
                            SOAPEdit("Plan", false);
                          }}
                        >
                          Submit
                        </button>
                      ) )}
                    </div>
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">HPI:</h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={HPI}
                          ref={(el) => (HPIRef.current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.HPI && !Manual}
                          onChange={(event) => {
                            setHPI(event.target.value);
                          }}
                        />
                      </div> 
                      {!Manual && ( 
                       !showInput.HPI ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-300 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("HPI", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-300 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick("NaN", "HPI", HPI, e);
                            SOAPEdit("HPI", false);
                          }}
                        >
                          Submit
                        </button>
                      ))}
                    </div>

                    {/* //////////ROS  */}
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">ROS:</h1>
                    

                    {/* Constitutional */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900 ml-3 dark:text-gray-300">Constitutional:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Constitutional']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Constitutional'] && !Manual}
                          name="Constitutional"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 

                      dis['Constitutional'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Constitutional',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Constitutional',true)}
                        >
                          Submit
                        </button>
                      ))}
                  
                    </div>
                    {/* EYES */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900 dark:text-gray-300 ml-3">EYES:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Eyes']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Eyes'] && !Manual}
                          name="Eyes"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 
                       dis['Eyes'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Eyes',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Eyes',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>
                    {/* ENT */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900  dark:text-gray-300 ml-3">ENT:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['ENT']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['ENT'] && !Manual}
                          name="ENT"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 
                      dis['ENT'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'ENT',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'ENT',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>
                    {/* Cardiovascular */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900 ml-3 dark:text-gray-300">Cardiovascular:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Cardiovascular']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Cardiovascular'] && !Manual}
                          name="Cardiovascular"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 

                      dis['Cardiovascular'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Cardiovascular',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Cardiovascular',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>
                    {/* Respiratory */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900 dark:text-gray-300 ml-3">Respiratory:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Respiratory']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Respiratory'] && !Manual}
                          name="Respiratory"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 
                       dis['Respiratory'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Respiratory',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Respiratory',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>
                    {/* Gastrointestinal */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900  dark:text-gray-300 ml-3">Gastrointestinal:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Gastrointestinal']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Gastrointestinal'] && !Manual}
                          name="Gastrointestinal"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 
                      dis['Gastrointestinal'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Gastrointestinal',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Gastrointestinal',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>
                    {/* Musculoskeletal */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900 dark:text-gray-300 ml-3">Musculoskeletal:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Musculoskeletal']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Musculoskeletal'] && !Manual}
                          name="Musculoskeletal"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 
                       dis['Musculoskeletal'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Musculoskeletal',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Musculoskeletal',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>
                    {/* Skin */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900 ml-3 dark:text-gray-300">Skin:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Skin']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Skin'] && !Manual}
                          name="Skin"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 
                       dis['Skin'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Skin',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Skin',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>
                    {/* Neurological */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900 ml-3 dark:text-gray-300">Neurological:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Neurological']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Neurological'] && !Manual}
                          name="Neurological"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 
                       dis['Neurological'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Neurological',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Neurological',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>
                    {/* Psychiatric */}
                    <h1 className="text-sm font-bold mt-4 text-blue-900 dark:text-gray-300 ml-3">Psychiatric:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={ROS['Psychiatric']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['Psychiatric'] && !Manual}
                          name="Psychiatric"
                          onChange={handleChange}
                        />
                      </div> 
                      {!Manual && ( 
                       dis['Psychiatric'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Psychiatric',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'Psychiatric',true)}
                        >
                          Submit
                        </button>
                      ))}
                      
                    </div>


                    {/* ///////ROS  */}
                    <h1 className="text-xl font-bold text-blue-900  dark:text-gray-300">Allergy:</h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={Allergy}
                          ref={(el) => (AllergyRef.current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.Allergy && !Manual}
                          onChange={(event) => setAllergy(event.target.value)}
                        />
                      </div> 
                      {!Manual && ( 
                      !showInput.Allergy ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("Allergy", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick("NaN", "Allergy", Allergy, e);
                            SOAPEdit("Allergy", false);
                          }}
                        >
                          Submit
                        </button>
                      ))}
                    </div>
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">
                      Chief Complaint:
                    </h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={chiefComplaint}
                          ref={(el) => (chiefComplaintRef.current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.chiefComplaint && !Manual}
                          onChange={(event) => {
                            setchiefComplaint(event.target.value);
                          }}
                        />
                      </div> 
                      {!Manual && ( 
                       !showInput.chiefComplaint ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("chiefComplaint", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick(
                              "NaN",
                              "chiefComplaint",
                              chiefComplaint,
                              e
                            );
                            SOAPEdit("chiefComplaint", false);
                          }}
                        >
                          Submit
                        </button>
                      ))}
                    </div>
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">PMH:</h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={PMH}
                          ref={(el) => (PMHRef.current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.PMH && !Manual}
                          onChange={(event) => {
                            setPMH(event.target.value);
                          }}
                        />
                      </div> 
                      {!Manual && ( 
                       !showInput.PMH ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("PMH", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick("NaN", "PMH", PMH, e);
                            SOAPEdit("PMH", false);
                          }}
                        >
                          Submit
                        </button>
                      ))}
                    </div>
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">
                      Physical Examination:
                    </h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={physicalExamination}
                          ref={(el) => (physicalRef.current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.physicalExamination && !Manual}
                          onChange={(event) => {
                            setphysicalExamination(event.target.value);
                          }}
                        />
                      </div> 
                      {!Manual && ( 
                       !showInput.physicalExamination ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("physicalExamination", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick(
                              "NaN",
                              "physicalExamination",
                              physicalExamination,
                              e
                            );
                            SOAPEdit("physicalExamination", false);
                          }}
                        >
                          Submit
                        </button>
                      ))}
                    </div>
                    {/* /subjective summary  */}
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">
                    Subjective:
                    </h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={subjective}
                          ref={(el) => (subjectiveRef.current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.subjective && !Manual}
                          onChange={(event) => {
                            setSubjective(event.target.value);
                          }}
                        />
                      </div> 
                      {!Manual && ( 
                       !showInput.subjective ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("subjective", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick(
                              "NaN",
                              "subjective",
                              subjective,
                              e
                            );
                            SOAPEdit("subjective", false);
                          }}
                        >
                          Submit
                        </button>
                      ))}
                    </div>

                    {/* /objective summary  */}
                    <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">
                    Objective:
                    </h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={objective}
                          ref={(el) => (objectiveRef.current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.objective && !Manual}
                          onChange={(event) => {
                            setObjective(event.target.value);
                          }}
                        />
                      </div> 
                      {!Manual && ( 
                       !showInput.objective ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("objective", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick(
                              "NaN",
                              "objective",
                              objective,
                              e
                            );
                            SOAPEdit("objective", false);
                          }}
                        >
                          Submit
                        </button>
                      ))}
                    </div>

                      {/* /med summary  */}
                      <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300">
                      Medication:
                    </h1>
                    <div className="flex p-2 mb-4 mt-4 items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={med}
                          ref={(el) => (medRef.current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={!showInput.med  && !Manual}
                          onChange={(event) => {
                            setmed(event.target.value);
                          }}
                        />
                      </div> 
                      {!Manual && ( 
                       !showInput.med ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            SOAPEdit("med", true);
                            e.preventDefault();
                          }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) => {
                            handleEDITClick(
                              "NaN",
                              "med",
                              med,
                              e
                            );
                            SOAPEdit("med", false);
                          }}
                        >
                          Submit
                        </button>
                      ))}
                    </div>
              
                    {/* Rationale */}



                    {/* <h1 className="text-xl font-bold text-blue-900 dark:text-gray-300"> Clinical Assessment and Diagnostic Rationale:</h1> */}
                    {/* post_concussion_evaluation */}
                    {/* <h1 className="text-sm font-bold mt-4 text-blue-900 ml-3 dark:text-gray-300">Post Concussion Evaluation:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={Rationale['post_concussion_evaluation']}
                          style={{ overflow: "hidden" }}
                          disabled={dis['post_concussion_evaluation']}
                          name="post_concussion_evaluation"
                          onChange={handleChangeRationale}
                        />
                      </div>
                      {dis['post_concussion_evaluation'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'post_concussion_evaluation',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'post_concussion_evaluation',true)}
                        >
                          Submit
                        </button>
                      )}
                  
                    </div> */}
                    {/* dti_brain_mri */}
                    {/* <h1 className="text-sm font-bold mt-4 text-blue-900 ml-3 dark:text-gray-300">DTI Brain MRI:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={Rationale['dti_brain_mri']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['dti_brain_mri']}
                          name="dti_brain_mri"
                          onChange={handleChangeRationale}
                        />
                      </div>
                      {dis['dti_brain_mri'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'dti_brain_mri',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'dti_brain_mri',true)}
                        >
                          Submit
                        </button>
                      )}
                  
                    </div> */}
                    {/* iv_micronutrients_im_vitamins */}
                    {/* <h1 className="text-sm font-bold mt-4 text-blue-900 ml-3 dark:text-gray-300">IV Micronutrients Vitamins:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={Rationale['iv_micronutrients_im_vitamins']}
                          // ref={(el) => (ROS['Constitutional'].current[0] = el)}
                          style={{ overflow: "hidden" }}
                          disabled={dis['iv_micronutrients_im_vitamins']}
                          name="iv_micronutrients_im_vitamins"
                          onChange={handleChangeRationale}
                        />
                      </div>
                      {dis['iv_micronutrients_im_vitamins'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'iv_micronutrients_im_vitamins',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'iv_micronutrients_im_vitamins',true)}
                        >
                          Submit
                        </button>
                      )}
                  
                    </div> */}
                    {/* neurofeedback_clarity_direct */}
                    {/* <h1 className="text-sm font-bold mt-4 text-blue-900 ml-3 dark:text-gray-300">Neuro Feedback:</h1>
                    <div className="flex p-2 mb-4  items-center">
                      <div className="w-full">
                        <textarea
                          className="bg-gray-300 rounded w-full p-2 h-auto text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          value={Rationale['neurofeedback_clarity_direct']}
                          style={{ overflow: "hidden" }}
                          disabled={dis['neurofeedback_clarity_direct']}
                          name="neurofeedback_clarity_direct"
                          onChange={handleChangeRationale}
                        />
                      </div>
                      {dis['neurofeedback_clarity_direct'] ? (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'neurofeedback_clarity_direct',false)}
                        >
                          EDIT
                        </button>
                      ) : (
                        <button
                          className="bg-blue-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                          onClick={(e) =>handleChangeDisable(e,'neurofeedback_clarity_direct',true)}
                        >
                          Submit
                        </button>
                      )}
                  
                    </div> */}

                  </div>
                </div>
                <hr className="h-px my-4 bg-black border-1 dark:bg-gray-600"></hr>
                <div>
                  <h1 className="font-semibold text-bl dark:text-gray-300">Code extraction:</h1>

                  {/* CPT  */}
                  <div className="box-border w-full p-4 mt-4 border border-gray-400">
                    <h1 className="font-semibold text-sm  text-gray-900 dark:text-gray-300">
                      CPT Codes
                    </h1>
                    <ul>
                      {cptCodes && cptCodes.map((code, index) => (
                        <li key={index}>
                          <div className="flex flex-col md:flex-row p-2 mb-4 mt-4 items-center">
                            <div className="w-full">
                              <textarea
                                className="bg-gray-300 h-auto rounded w-full p-2  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                value={`${code["code"]}\n${code["description"]}`}
                                style={{ overflow: "hidden" }}
                                ref={(el) => (cptRef.current[index] = el)}
                                disabled={editStates[index]  && !Manual}
                                onChange={(event) =>
                                  handleInputChangee(event, index, "cptCode")
                                }
                              />
                            </div>
                            <button
                              className="bg-blue-300 w-[130px] mt-3 md:ml-3 hover:bg-gray-400 text-gray-800 font-bold py-2 h-3/4 px-4 rounded-l"
                              onClick={(event) =>
                                handleDeleteClick(index, "cpt_codes", event)
                              }
                            >
                              DELETE
                            </button>
                              <button
                                className="bg-blue-300 w-[130px] mt-3 md:ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                                onClick={(e) => {
                                  editCodes(e,'cptCodes',index);
                                  e.preventDefault();
                                }}
                              >
                                EDIT
                              </button>
                            
                          </div>
                        </li>
                      ))}
                      <div className="mt-2 pt-2"> 
                        {!Manual && ( 

                       
                        showInput.cptCodess && (
                          <div className="grid grid-cols-4">
                            <form className="col-span-4 grid grid-cols-4 p-8">
                              <div className="col-span-3 relative">
                                <div className="bg-white shadow-lg rounded-lg p-6">
                                  <input
                                    type="text"
                                    value={inputValue.cptCode}
                                    onChange={(e) => onInputChange(e, "cptCode")}
                                    onFocus={() => setShowSuggestions(true)}
                                    style={{ overflow: "hidden" }}
                                    placeholder="Type a term"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                                  <ul className="absolute w-full mt-1 max-h-48 overflow-y-auto bg-white shadow-lg rounded-lg z-10">
                                    {(showSuggestions || showSuggestionList) &&
                                      suggestions.map((suggestion, index) => (
                                        <li
                                          key={index}
                                          onClick={() =>
                                            onSuggestionClick(
                                              suggestion,
                                              "cptCode"
                                            )
                                          }
                                          className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer"
                                        >
                                          {suggestion.displayText}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="col-span-1 flex items-center justify-center">
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 px-4 py-2 rounded-md"
                                  onClick={(e) => {
                                    handleFormSubmit("cpt_codes", e);
                                  }}
                                >
                                  Submit
                                </button>
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 px-4 py-2 rounded-md"
                                  onClick={(e) => {
                                    setShowInput({
                                      ...showInput,
                                      cptCodess: false,
                                    });
                                  }}
                                >
                                  Done
                                </button>
                              </div>
                            </form>
                          </div>
                        ))}
                        {/* <div className="mt-4">
                          {!showInput.cptCodess && (
                            <button
                              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow"
                              onClick={() => handleButtonClick("cptCodess")}
                            >
                              Add New Code
                            </button>
                          )}
                        </div> */}
                      </div>
                    </ul>
                    <button
                      onClick={(e)=>{toggleModal(e);setAddMode("cptCodes")}}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Add
                    </button>
                  </div>





                    {/* ICT  */}
                  <div className="box-border w-full p-4 mt-4 border border-gray-400">
                    <h1 className="font-semibold text-sm text-gray-900 dark:text-gray-300">
                    ICD-10 Codes
                    </h1>
                    <ul> 
                      {icdCodes && icdCodes.map((code, index) => (
                        <li key={index}>
                          <div className="flex flex-col md:flex-row p-2 mb-4 mt-4 items-center">
                            <div className="w-full">
                              <textarea
                                ref={(el) => (icdCodesRef.current[index] = el)}
                                className="bg-gray-300  rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                style={{ overflow: "hidden" }}
                                type="text"
                                value={`${code["code"]}\n${code["description"]}`}
                                onChange={(event) =>
                                  handleInputChangee(event, index, "icdCodes")
                                }
                                disabled={editStatesmed[index]  && !Manual}
                              />
                            </div>
                            <button
                              className="bg-blue-300  w-[130px] mt-3 md:ml-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 h-3/4 rounded-l"
                              onClick={(event) =>
                                handleDeleteClick(index, "icdCodes", event)
                              }
                            >
                              DELETE
                            </button>
                            <button
                                className="bg-blue-300  w-[130px] mt-3 md:ml-2 hover:bg-gray-400 text-gray-800 font-bold h-3/4 py-2 px-4 rounded-r"
                                onClick={(e) => {
                                  editCodes(e,'icdCodes',index);
                                  e.preventDefault();
                                }}
                              >
                                EDIT
                              </button>
                          </div>
                        </li>
                      ))}
                      <div className="mt-2 pt-2"> 
                       {!Manual && ( 
                        showInput.icdCodes && (
                          <div className="grid grid-cols-4">
                            <form className="col-span-4 grid grid-cols-4 p-8">
                              <div className="col-span-3 relative">
                                <div className="bg-white shadow-lg rounded-lg p-6">
                                  <input
                                    type="text"
                                    value={inputValue.icdCodes}
                                    onChange={(z) => onInputChange(z, "icdCodes")}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Type a term"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                                  <ul className="absolute w-full mt-1 max-h-48 overflow-y-auto bg-white shadow-lg rounded-lg z-10">
                                    {(showSuggestions || showSuggestionList) &&
                                      suggestions.map((suggestion, index) => (
                                        <li
                                          key={index}
                                          onClick={() => {
                                            onSuggestionClick(
                                              suggestion,
                                              "icdCodes"
                                            );
                                            console.log(suggestion);
                                          }}
                                          className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer"
                                        >
                                          {suggestion.displayText}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="col-span-1 flex items-center justify-center">
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 px-4 py-2 rounded-md"
                                  onClick={(e) => {
                                    handleFormSubmit("icdCodes", e);
                                  }}
                                >
                                  Submit
                                </button>
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 px-4 py-2 rounded-md"
                                  onClick={(e) => {
                                    setShowInput({
                                      ...showInput,
                                      icdCodes: false,
                                    });
                                  }}
                                >
                                  Done
                                </button>
                              </div>
                            </form>
                          </div>
                        ))}
                        {/* <div className="mt-4">
                          {!showInput.icdCodes && (
                            <button
                              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow"
                              onClick={() => handleButtonClick("icdCodes")}
                            >
                              Add New Code
                            </button>
                          )}
                        </div> */}
                      </div>
                    </ul>
                    <button
                      onClick={(e)=>{toggleModal(e);setAddMode("icdCodes")}}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="place-content-center">
                  <div>
                   <button
                      className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      // onClick={(e)=>downloadPDF(e)}
                      onClick={(e)=>storeReport(e)}
                    >
                     {mode =="generate" ? 'Approve' : 'Save'}
                    </button>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>

      )} 
    </>
  );
};

export default SoapNote;
