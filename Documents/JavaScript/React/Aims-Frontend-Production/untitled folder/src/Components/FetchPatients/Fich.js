/*eslint-disable*/
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Node_API_URL } from '../../client.js';
// import Loading from '../loading.js';  
import Loader from '../ui/Loader/Loader'
import { FaFileDownload } from "react-icons/fa"; 
import { MdNewLabel } from "react-icons/md"; 
import TimePickerModal from './TimePickerModal';
import { saveAs } from 'file-saver'; 
import { IoMdArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { GlobalStateContext } from '../../Context/GlobalStateContext.js';
import { logout } from '../../features/auth/authSlice.js';
import { useDispatch } from 'react-redux';
import { FaEye } from "react-icons/fa"; 
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md"; 
import { HiOutlinePlus } from "react-icons/hi";
import axios from 'axios';
import { BsFiletypeDocx } from "react-icons/bs";
import Docxtemplater from "docxtemplater"; 
import { FaFileInvoiceDollar } from "react-icons/fa6";
import PizZip from "pizzip";
import FilePicker from '../ui/File/FilePicker.js';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";  
import InvoiceModal from '../InvoiceModal.js'; 
import NewModal from '../ui/NewModal/NewModal'; 

import DateEditModal from './DateEditModal.js';  
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordian/Accordian.js'
import { ConstructionOutlined, ContactlessOutlined } from '@mui/icons-material';
const Fich = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();  
  const [modalOpen , setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);   
  const [invoiceOpen , setInvoiceOpen] = useState(false);
  const [invoices , setInvoices] = useState([]); 
  const [ShowInvoice , setShowInvoice] = useState({}); 
  const [modalmsg , setModalmsg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [visit, setVisit] = useState([]);
  const {role,token,setUser,checker,
       setDxCodes,
        setAllergy,
        setAssessment,
        setCptCodes,
        setIcdCodes,
        setHPI,
        setPMH,
        setPlan,
        setphysicalExamination,
        setObjective,
        setSubjective,
        setmed,
        setROS,
        setchiefComplaint,
        setSoapNotesSummary,
        setOriginal, 
        showToast,
        userTimezone,
        config
  } = useContext(GlobalStateContext)
  const dispatch = useDispatch()
  const [patients, setPatients] = useState({
    _id:'',
    FullName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    birthDate: '',
    address: '',
    provider: '',
    policyName: '',
    groupNB: '',
    memberid: ''
  });

  const [docs,setDocs] = useState("")
 
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  

  useEffect(() => {
    checker().then((res)=>{
      if(res==false)
      {
      setUser(false)
      dispatch(logout())
      navigate('/')
      }else{
        setLoading(true);
        fetchData();
      }
    })
  }, []);
 
 
  const fetchData = async () => {
    try {
      const response = await fetch(`${Node_API_URL}/api/get/getPatientById?id=${patientId}`,
      {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if(data.response === true)
      {
        setPatients(data.patient);

      }
    } catch (error) {
      toast.error("Error in fetching patients reload please")
    }finally{
      setLoading(false);
    }
  };

  const fetchVisit = async () => {
    try {
      const response = await fetch(`${Node_API_URL}/api/get/getVists?id=${patientId}&page=${visitPage}&limit=3`,
      {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      const res = await response.json(); 
      if(res.response == true)
      {
        setVisit(res.visits); 
        setTotalVisits(res.pagination.totalPages);
      }
    } catch (error) {
      toast.error("Error fetcing visits")
    }
  };

  const fetchdocs = async () => {
    const data = {
      pId:patientId
    }

    try {
      const res = await axios.post(`${Node_API_URL}/api/get/getDocuments?page=${docPage}&limit=3`, data ,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }, 
    });
      if(res.data.response == true)
      {
        setDocs(res.data.documents); 
        setTotalDocuments(res.data.pagination.totalPages)
      }
    } catch (error) {
      toast.error("Error fetcing Documents")
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatients({
      ...patients,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch(`${Node_API_URL}/api/post/updatePatient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patients)
      });
      const result = await response.json();
      if(result.response == true)
      {
        toast.success(result.msg)
      }else{
        toast.error(result.msg)
      }
    } catch (error) {
      toast.error("Network Try again")
    }finally{
      setLoading(false)
    }
  };

  const ViewReport = (visitid) => {
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
    navigate(`/report/${visitid}`);
  };
  
  const EditReport = (visitid) => {
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
    navigate(`/SOAPnotes/${visitid}?mode=edit`);
  };

  const newVisit = () => {
    navigate(`/Consultation/${patientId}`);
  }; 
  const [Url , setURL] = useState(null);
  const [deleteID , setDeleteID] = useState(null);
  const confirmDelete = (id , type , URL) => {    
    setTypeDelete(type); 
    if (URL!=null) { 
      setURL(URL);
    }
    setDeleteID(id);  
    setIsModalOpen(true);  
    setModalmsg({head: "Are you Sure ?" , desc :"Click confirm to delete the file" });
  } 



  const deleteReport = async() =>{
    setLoading(true)
    try{ 
     

      
      const res = await axios.delete(`${Node_API_URL}/api/del/delVisit?id=${deleteID}`,config)
      if(res.data.response)
      {
        fetchVisit()
        showToast('Deleting Done!', { type: 'success' });
      }else{
        showToast('Error while deleting', { type: 'error' });
      }
    }catch(e)
    {
      showToast('Connection lost or may be server down', { type: 'error' });
    }finally{
        setLoading(false) 
        setDeleteID(null); 
        setIsModalOpen(false);
    }
  } 


  const convertToDocx = async (name) => {
      try {
        const response = await fetch(name);
        const template = await response.arrayBuffer();
        const zip = new PizZip(template);
        const doc = new Docxtemplater(zip);
        
        doc.setData({
          name: patients.fullName === null || patients.fullName === "" ? "The patient didn't answer this question." : patients.fullName,
          email: patients.email === null || patients.email === "" ? "The patient didn't answer this question." : patients.email,
          gender: patients.gender === null || patients.gender === "" ? "The patient didn't answer this question." : patients.gender,
          phone: patients.phoneNumber === null || patients.phoneNumber === "" ? "The patient didn't answer this question." : patients.phoneNumber,
          dob: patients.dateOfBirth === null || patients.dateOfBirth === "" ? "The patient didn't answer this question." : patients.dateOfBirth,
          emergency: patients.emergencyContactPhoneNumber === null || patients.emergencyContactPhoneNumber === "" ? "The patient didn't answer this question." : patients.emergencyContactPhoneNumber,
          provider: patients.insuranceProvider === null || patients.insuranceProvider === "" ? "The patient didn't answer this question." : patients.insuranceProvider,
          policy: patients.insurancePolicyNumber === null || patients.insurancePolicyNumber === "" ? "The patient didn't answer this question." : patients.insurancePolicyNumber,
          holder: patients.policyHolderName === null || patients.policyHolderName === "" ? "The patient didn't answer this question." : patients.policyHolderName,
          group: patients.groupNumber === null || patients.groupNumber === "" ? "The patient didn't answer this question." : patients.groupNumber,
          physician: patients.primaryCarePhysician === null || patients.primaryCarePhysician === "" ? "The patient didn't answer this question." : patients.primaryCarePhysician,
          medication: patients.medications === null || patients.medications === "" ? "The patient didn't answer this question." : patients.medications,
          allergy: patients.allergies === null || patients.allergies === "" ? "The patient didn't answer this question." : patients.allergies,
          chronic: patients.chronicConditions === null || patients.chronicConditions === "" ? "The patient didn't answer this question." : patients.chronicConditions,
          surgery: patients.pastSurgeries === null || patients.pastSurgeries === "" ? "The patient didn't answer this question." : patients.pastSurgeries,
          pmh: patients.familyMedicalHistory === null || patients.familyMedicalHistory === "" ? "The patient didn't answer this question." : patients.familyMedicalHistory,
          visit: patients.visitReason === null || patients.visitReason === "" ? "The patient didn't answer this question." : patients.visitReason,
          description: patients.symptomDescription === null || patients.symptomDescription === "" ? "The patient didn't answer this question." : patients.symptomDescription,
          duration: patients.symptomDuration === null || patients.symptomDuration === "" ? "The patient didn't answer this question." : patients.symptomDuration,
          severity: patients.symptomSeverity === null || patients.symptomSeverity === "" ? "The patient didn't answer this question." : patients.symptomSeverity,
          history: patients.symptomHistory === null || patients.symptomHistory === "" ? "The patient didn't answer this question." : patients.symptomHistory,
          trigger: patients.symptomTriggers === null || patients.symptomTriggers === "" ? "The patient didn't answer this question." : patients.symptomTriggers,
          occupation: patients.occupation === null || patients.occupation === "" ? "The patient didn't answer this question." : patients.occupation,
          lifestyle: patients.lifestyle === null || patients.lifestyle === "" ? "The patient didn't answer this question." : patients.lifestyle,
          diet: patients.exerciseAndDiet === null || patients.exerciseAndDiet === "" ? "The patient didn't answer this question." : patients.exerciseAndDiet,
          living: patients.livingArrangement === null || patients.livingArrangement === "" ? "The patient didn't answer this question." : patients.livingArrangement,
          general: patients.recentHealthChanges === null || patients.recentHealthChanges === "" ? "The patient didn't answer this question." : patients.recentHealthChanges,
          cardio: patients.cardiovascularHistory === null || patients.cardiovascularHistory === "" ? "The patient didn't answer this question." : patients.cardiovascularHistory,
          res: patients.respiratoryHistory === null || patients.respiratoryHistory === "" ? "The patient didn't answer this question." : patients.respiratoryHistory,
          gas: patients.gastrointestinalHistory === null || patients.gastrointestinalHistory === "" ? "The patient didn't answer this question." : patients.gastrointestinalHistory,
          muscu: patients.musculoskeletalHistory === null || patients.musculoskeletalHistory === "" ? "The patient didn't answer this question." : patients.musculoskeletalHistory,
          neuro: patients.neurologicalHistory === null || patients.neurologicalHistory === "" ? "The patient didn't answer this question." : patients.neurologicalHistory
      });
      
        
  
        doc.render();
  
        const outputBuffer = doc.getZip().generate({ type: "blob" });
        const blob = new Blob([outputBuffer], {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(blob, `${patients.fullName}_report.docx`);
      } catch (error) {
        console.error("Error generating DOCX:", error);
      }
    };

  const convertToDocxsummary = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch("/summary.docx");
        const template = await response.arrayBuffer();
        const zip = new PizZip(template);
        const doc = new Docxtemplater(zip);
        
        doc.setData({
          summary:patients.summary,
        });
  
        doc.render();
  
        const outputBuffer = doc.getZip().generate({ type: "blob" });
        const blob = new Blob([outputBuffer], {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(blob, `${patients.fullName}_summary.docx`);
      } catch (error) {
        console.error("Error generating DOCX:", error);
      }
  };
  const handleUploadFile = async () => {
    if (!file) {
      showToast('No File Selected..!', { type: 'error' });
      return;
    }

    setLoading(true); // Start loading
    
    try {
    const awsFileName = Date.now()+'-'+file.name

    
    const formData = {
      'pId':patientId,
      'fileOriginalName':file.name,
      userTimezone,
      key:`Document/${awsFileName}`
    }
    
      const url = await getSignedUrl(awsFileName)
      if(url == "") return
      const result = await putObject(url,file)
      if(!result) return

      const {data} = await axios.post(`${Node_API_URL}/api/post/uploadPDF`, formData ,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }, 
    });

     
      if (data.response) {
        showToast('File Uploaded Successfully', { type: 'success' });
        setIsOpen(false); // Close modal on success
        fetchdocs()
      } else {
        showToast(`Upload failed: ${data.msg}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      showToast('Error uploading file', {type: 'error'});
    } finally {
      setLoading(false); // End loading
    }
  };

  
  const deleteDocument = async() =>{
    setLoading(true)
    try{
     

      
      const res = await axios.delete(`${Node_API_URL}/api/delete/deleteDocument?docId=${deleteID}&publicId=${Url}`,config)
      if(res.data.response)
      {
        fetchdocs()
        showToast('Done..!', { type: 'success' });
      }else{
        alert('Error')
      }
    }catch(e)
    {
      showToast('Connection Lost or Maybe Server down', { type: 'error' });
    }finally{
        setLoading(false)
    }
  }
  
  const deleteInvoice = async() =>{
    setLoading(true)
    try{
    

      
      const res = await axios.delete(`${Node_API_URL}/api/delete/deleteInvoice?id=${deleteID}`,config)
      if(res.data.response)
      {
        FetchAllinvoices()
        showToast('Done..!', { type: 'success' });
      }else{
        alert('Error')
      }
    }catch(e)
    {
      showToast('Connection Lost or Maybe Server down', { type: 'error' });
    }finally{
        setLoading(false)
    }
  }
  
  const FetchAllinvoices = async () => {  
    try { 
    
    const res = await axios.get(`${Node_API_URL}/api/get/getAllInvoices?page=${invoicePage}&pId=${patientId}`,config); 
    console.log('invoice',res)
     if (res.data.response===true){  
      setInvoices(res.data.invoices); 
      setTotalInvoicePages(res.data.pagination.totalPages);
     } 

 
    }
    catch(error) { 
    console.log("Error Fetching Invoices ", error)
    }
   } 

   const ViewInvoice = async (id) => {  
      try { 
      
       const res = await axios.post(`${Node_API_URL}/api/post/getInvoiceById`,{invoiceId:id},config );  
       if (res.data.response===true) { 
      setShowInvoice(res.data.invoice);
      setInvoiceOpen(true) 
       } 
       else { 
        console.log("Error Fetching Invoices");
       }
        }
      catch (e) { 
        console.log(e)
      }
    }
    const CloseInvoice = () => { 
    setInvoiceOpen(false);
    }
   



   //Time edit Modal code
   const [closeModal,setCloseModal] = useState(true)
   const [currentOpenModalId,setCurrenttOpenModalId] = useState("")
   const [modalSelectedDate,setModalSelectedDate]=useState("") 
   const [type,setType] = useState("")
   const [fileName,setFileName]=useState("")
   
   const closeModalfn =()=>{
    setCloseModal(true)
    setCurrenttOpenModalId("")
    setModalSelectedDate("")
    setFileName("")
    setType("")
   }
   const closeTimeModal = () => { 
    setCheckIn(''); 
    setCheckOut(''); 
    setSelectTime(false);
   }
   const editFunction = async()=>{
    try { 
      
      let data ={
        id:currentOpenModalId,
        date:modalSelectedDate.toLocaleDateString("en-CA")

      }
      let path
       if(type == 'Invoice')
       {
        path = 'updateInvoice'
       }
       else if(type == 'Appointment')
       {
        path = 'updateVisitDate'
       }else{
        if(fileName.length=="")
        {
          alert('Cannot set empty file name')
          return
        }
        path = 'updateDocumentDate'
        data['name'] = fileName
       }
       const res = await axios.post(`${Node_API_URL}/api/post/${path}`,data,config );  
       if (res.data.response===true) { 
        closeModalfn()
        if(type == 'Invoice') FetchAllinvoices();
        else if(type == 'Appointment') fetchVisit()
        else fetchdocs()
         
        
        alert(res.data.msg)
       } 
       else { 
        console.log("Error updating ");
       }
        }
      catch (e) { 
        console.log(e)
      }
   }


  const getSignedUrl = async (fileName) =>{

    try{
      const result = await axios.get(`${Node_API_URL}/api/get/getSignedUrlForUpload?fileName=${fileName}&contentType=application/pdf&folder=Document`,config)
      if(result.data.response)
      {
        return result.data.url
      }else{
        alert("session expire trry again.")
        return '' 
      }
    }catch(e)
    {
      alert("session expire try again.")
      return '' 
    }
  }

  const putObject = async(signedUrl,file)=>{
    try {
      const response = await axios.put(signedUrl, file, {
          headers: {
              'Content-Type': file.type  // Set only the content type
          }
      });
      if(response.status == 200){
        return true
      }else{
        return false
      }
  } catch (error) { 
    alert('Session expire upload again')
    console.error("Upload error:", error.response || error.message);
    return false
  }
  }

  const viewObject = async(key)=>{
    try{
      const result = await axios.get(`${Node_API_URL}/api/get/getObject?key=${key}`,config)
      if(result.data.response)
      {
        return result.data.url
      }else{
        return false
      }
    }catch(e)
    {
      return false
    }
  }

  const getObject = async(key)=>{
    const url = await viewObject(key)

    if(url !='')
    {
      window.open(url,'_blank')
    }else{
      alert("try again later ")
    }

  }

  function includesDocOrDocx(string) {
    
    return string.includes('.doc') || string.includes('.docx') || string.includes('.xlsx');
}

    const FileDownloader = async (fileUrl,docName) => {
        try {
            // Fetch the file from the signed URL
            const response = await fetch(fileUrl);

            if (!response.ok) {
                throw new Error('Failed to download file');
            }

            // Convert the response to a Blob
            const blob = await response.blob();

            // Create a URL for the blob
            const downloadUrl = window.URL.createObjectURL(blob);

            // Create a temporary anchor element to trigger the download
            const a = document.createElement('a');
            a.href = downloadUrl;

            // Set the download filename (optional)
            a.download = docName; // Change to 'filename.docx' for DOCX files

            // Append anchor to the body and trigger the click
            document.body.appendChild(a);
            a.click();

            // Clean up
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
        } 
    };  
    const [typeDelete , setTypeDelete] = useState(null);
   const deleteDone =  async () => {   
     if (typeDelete === 'document') {
       if (Url!=null) { 
       await deleteDocument(); 
        setIsModalOpen(false);  
        setTypeDelete(null);
       }  
      } 
       if (typeDelete === 'report') {
        await deleteReport(); 
        setIsModalOpen(false);
       setURL(null);  
       setTypeDelete(null);

      } 
       if (typeDelete === 'invoice') { 
        await deleteInvoice(); 
        setIsModalOpen(false); 
        setTypeDelete(null);
      }
   }

  const setConfirm = () => {  
    setDeleteID(null);
    setIsModalOpen(false);  
    setURL(null);
  } 
  const [selectTime , setSelectTime] = useState(false); 
  const [checkIN , setCheckIn] = useState(''); 
  const [checkOut , setCheckOut] = useState(''); 
  const [date , setDate] = useState('');   
  const [notesPage , setNotesPage] = useState(1);
  const [Dates , setDates] = useState([]);

  const closeTime = () => { 
   setSelectTime(false);
  } 
    const handleCheck = () => { 
    setSelectTime(true);
  } 
  const HandleTime = async () => {  
    setLoading(true);

    const data = { 
      pId : patientId, 
      checkInTime:checkIN, 
      checkOutTime:checkOut, 
      checkInDate:date,
      userTimezone:userTimezone,
    }
    try {  
      const res = await axios.post(`${Node_API_URL}/api/post/addNote`, data, config)
      setDates((prev) => [...prev, res.data.note]);

    }
    catch(e) { 

    } 
    finally{ 
      closeTime() 
      setLoading(false);

    }

  }  
  const pageUp = () => { 
    setNotesPage(prev=>prev+1);
  } 
  const pageBack = () => {  
    if(notesPage > 1) {
    setNotesPage(prev=>prev-1); 
    }
  } 
  useEffect (()=>{ 
    getNotes();  
   }, [notesPage])   
   const [totalNotes , setTotalNotes] = useState(0);
  const getNotes = async () => {
    // setLoading(true); 
    try {
      const res = await axios.get(`${Node_API_URL}/api/get/getNotes?id=${patientId}&page=${notesPage}&limit=3`,config);
      if (res) {
        setDates(res.data.notes);  
        setTotalNotes(res.data.pagination.totalPages)
        console.log("Fetched notes:", res.data); 
      } else {
        console.log("No data returned from the API.");
      }
    } 
    catch (e) {
      console.log("Error fetching notes:", e);
    } 
    finally {
      // setLoading(false); 
    }
  };

  const deleteNote = async (id) => {
    setLoading(true); 
    try {
      const res = await axios.delete(`${Node_API_URL}/api/delete/deleteNote/${id}`,config);
      console.log(res)
      if (res.data) {
        getNotes()
      } else {
        console.log("No data returned from the API.");
      }
    } 
    catch (e) {
      console.log("Error fetching notes:", e);
    } 
    finally {
      setLoading(false); 
    }
  }; 
  const [visitPage , setVisitPage] = useState(1); 
  const [totalVisits , setTotalVisits] = useState(1);
  const visitPageUP = () => { 
    setVisitPage(prev=>prev+1);
  } 
  const visitPageDown = () => {  
    if (visitPage > 1) {
    setVisitPage(prev=>prev-1); 
    }
  } 
  useEffect(()=>{ 
    fetchVisit();
  },[visitPage]) 
  const [docPage , setDocPage] = useState(1); 
  const [Totaldocuments , setTotalDocuments] = useState(1);
  const documentsPageUP = () => { 
    setDocPage(prev=>prev+1);
  } 
  const documentsDown = () => {  
    if (docPage > 1) {
    setDocPage(prev=>prev-1); 
    }
  } 
  useEffect(()=>{ 
    fetchdocs();
  },[docPage]) 

  const [invoicePage , setInvoicePage] = useState(1); 
  const [TotalInvoicePages , setTotalInvoicePages] = useState(1);
  const invoicePageUP = () => { 
    setInvoicePage(prev=>prev+1); 
  } 
  const invoicePageDown = () => {  
    if (invoicePage > 1) {
      setInvoicePage(prev=>prev-1); 
    }
  } 
  useEffect(()=>{ 
    FetchAllinvoices();  
  },[invoicePage])
  return (
    <>

      <ToastContainer /> 
      {invoiceOpen && (
  <div  className="fixed inset-0 flex items-center justify-center z-20 bg-gray-900 bg-opacity-70">
    <div className="relative z-30">
      <InvoiceModal   data={ShowInvoice} onClose={CloseInvoice} name={ patients.fullName } address={ patients.address} token={token} id={ShowInvoice._id} statusShow={ShowInvoice.status}  />
    </div>
  </div>
)}

      {loading ? ( 
      <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
    >
      <Loader />
    </div>
     
     
     
      ) : (
        <> 
        {modalOpen && ( 
           <div
           className="fixed inset-0 flex items-center justify-center z-50"
           style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
         >
            <NewModal head={modalmsg.head} desc={modalmsg.desc} close={setConfirm} confirm={deleteDone}/>
          </div>
        )}
       {!closeModal &&  <DateEditModal state2={fileName} setState2={setFileName} type={type} state={modalSelectedDate} setState={setModalSelectedDate}   editFunction={editFunction} closeModalfn={closeModalfn} title={'Date'} />} 
      { selectTime &&   
      <div className='fixed inset-0 flex justify-center items-center '> 
      <TimePickerModal setCheckIn={setCheckIn} setCheckOut={setCheckOut} closeTime= {closeTime} setDate={setDate} HandleTime={HandleTime} date={date} checkOut={checkOut} checkIN={checkIN} /> 
      </div>
       } 

        <FilePicker  isOpen={isOpen} setIsOpen={setIsOpen} onUpload={handleUploadFile}  Filer={setFile}/>
        <div className="flex dark:bg-slate-900 flex-col justify-center  items-center xl:flex-row gap-8 p-8">
        
          {/* Appoinments And Documents  */}
          <div className='  xl:flex justify-around   flex-wrap w-full'>
         {/* Appoitments  */}
          <div className="  xl:w-[33%]   dark:bg-slate-800 mt-16 xl:mt-0"> 
            <div className='flex gap-3 p-8 '>
            <h1 className="text-xl font-bold text-gray-900   dark:text-gray-200  ">Appointments  </h1> 
            {role === 'Doctor' &&
            <div className='flex justify-center items-center w-full'>
            <span className=' cursor-pointer text-white' onClick={newVisit}><FaMicrophone size={28} /> </span> 
            <span className='text-white text-[10px]  w-full'>Click on mic to start new consultation</span>
            </div>
            }
            </div>
            <div className="dark:bg-slate-800 bg-white p-8 rounded-lg shadow-md">
              <table className="w-full  text-sm text-left text-gray-500">
                <thead className="bg-gray-100 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-3 text-gray-700 dark:text-gray-200 ">Date</th>
                    <th className="px-6 py-3 text-gray-700 dark:text-gray-200 ">Actions</th>
                  </tr>
                </thead>
                <tbody >
                  {visit.map((v, index) => (
                    <tr key={index} className="border-b">
                 <p className=" w-[100px] py-4 font-medium text-gray-900 dark:text-gray-200 ">
                 {v.date ? (
                    <div className='flex items-center'>
                    {v.date}
                    <FaEdit onClick={()=>{
                      setType('Appointment')
                      setCloseModal(false)
                      setCurrenttOpenModalId(v._id)
                    }} className='ml-2 cursor-pointer text-blue-500' size={15} />
                    </div>
                    ) : (
                      <div className='flex items-center'>
                      N/A
                      <FaEdit onClick={()=>{
                      setType('Appointment')
                      setCloseModal(false)
                      setCurrenttOpenModalId(v._id)
                    }} className='ml-2 cursor-pointer text-blue-500' size={15} />
                      </div>
                      ) } 
</p>

                      <td className=" py-4">
                        {/* <div className='flex'> */}

                        <button
                          className="bg-blue-600 mr-2 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300"
                          onClick={() => ViewReport(v._id)}
                        >
                          <FaEye/>
                        </button>
                        <button
                          className="bg-green-600 mr-2 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300"
                          onClick={() => EditReport(v._id)}
                        >
                          <FaEdit/> 
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300"
                          onClick={() => confirmDelete(v._id , 'report')}
                        >
                          <MdDelete/>
                        </button>
                        {/* </div> */}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> 
            <div className='flex gap-5 justify-center items-center text-gray-200 mt-2 mb-4'>   
     <button
  className={`p-1 rounded-sm bg-gray-700 hover:bg-gray-800
  }`}
  disabled={visitPage === 1}
>
  <IoMdArrowBack
    className={` cursor-pointer`}
    onClick={visitPage === 1 ? undefined : visitPageDown}
    size={24}
  />
</button>
<p className="text-sm p-1 px-3 bg-blue-700">{visitPage}</p>
<button
  className={`p-1 bg-gray-700 hover:bg-gray-800
  }`}
  disabled={visitPage === totalVisits}
>
  <IoMdArrowForward
    className={`cursor-pointer`}
    onClick={visitPage === totalVisits ? undefined : visitPageUP}
    size={24}
  />
</button>


     </div>
          </div>  
         {/* Documents  */}
          <div className="xl:w-[33%]     dark:bg-slate-800 mt-16 xl:mt-0">
            <div className=' flex  justify-start items-center'>
            <h1 className="text-2xl font-bold text-gray-900  ml-6 mt-6 dark:text-gray-200  mb-4">Documents</h1>
            <FaCloudUploadAlt onClick={toggleModal} size={30} className='ml-6 text-white cursor-pointer' /> 
            {/* <FilePicker isOpen={isOpen} setIsOpen={setIsOpen} onUpload={handleUploadFile} /> */}

              </div>
              <div className="dark:bg-slate-800 bg-white p-8 rounded-lg shadow-md mt-5 ">

  
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-100 w-[50%] dark:bg-slate-900">
                  <tr>
                    {/* <th className="px-6 py-3 text-gray-700 dark:text-gray-200 ">Date</th> */}
                    <th className="px-6 py-3 text-gray-700 dark:text-gray-200 ">Name</th>
                    <th className="px-6 py-3 text-gray-700 dark:text-gray-200 ">Actions</th>
                  </tr>
                </thead>
                <tbody> 
               
                  {docs && docs.map((v, index) => (
                    <tr key={index} className="border-b lg:mr-10 "> 
                    
<td className="px-6  py-4 font-medium text-gray-900 dark:text-gray-200 break-words md:mr-10">  


                    <div className='flex items-center justify-between'>
                      <div className='flex flex-col'>
                        <span>
                    {v.date?v.date:'N/A'}
                        </span>
                        <span>
                    {v.fileOriginalName.length>10?v.fileOriginalName.slice(0,10)+'...':v.fileOriginalName}
                        </span>

                      </div>
                    <FaEdit onClick={()=>{
                      setFileName(v.fileOriginalName)
                      setType('Document')
                      setCloseModal(false)
                      setCurrenttOpenModalId(v._id)
                    }} className='ml-6 cursor-pointer text-blue-500' size={15} /> 
                     </div>
</td>

                      <td className="x-6 py-4">

                        <div className='flex ' > 
                          

                    
                        <button onClick={()=>{
                          if(includesDocOrDocx(v.secure_url))
                          {
                            alert('cannot open this file here.')
                            return
                          }
                          getObject(v.secure_url)}}  
                          className="bg-blue-600 cursor-pointer  mr-2 mb-2 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300"
                          
                        >
                          <FaEye/>
                        </button>
                        <button
                          className="bg-green-600 mr-2 mb-2 cursor-pointer   hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300"
                          onClick={async() => { 
                            
                            const url = await viewObject(v.secure_url)
                            FileDownloader(url,v.fileOriginalName)

                          }}
                        >
                          <FaFileDownload/> 
                        </button>
                        <button
                          className="bg-red-600 mb-2 cursor-pointer mr-2 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300"
                          onClick={() => confirmDelete(v._id , 'document' , v.secure_url)}
                        >
                          <MdDelete/>
                        </button>
                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> 
            <div className='flex gap-5  justify-center items-center text-gray-200 mt-2 mb-4'>   
     <button
  className={`p-1 rounded-sm bg-gray-700 hover:bg-gray-800
  }`}
  disabled={docPage === 1}
>
  <IoMdArrowBack
    className={` cursor-pointer`}
    onClick={docPage === 1 ? undefined : documentsDown}
    size={24}
  />
</button>
<p className="text-sm p-1 px-3 bg-blue-700">{docPage}</p>
<button
  className={`p-1 bg-gray-700 hover:bg-gray-800
  }`}
  disabled={docPage === Totaldocuments}
>
  <IoMdArrowForward
    className={`cursor-pointer`}
    onClick={docPage === Totaldocuments ? undefined : documentsPageUP}
    size={24}
  />
</button>


     </div>
          </div>
       
         {/* //Invoice  */}
        <div className="xl:w-[33%] dark:bg-slate-800 mt-16 xl:mt-0">
    <div className="flex items-center gap-3 p-8">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200">Invoices</h1>
      <span
        className="cursor-pointer text-white"
        onClick={() => navigate('/Invoice')}
      >
        <FaFileInvoiceDollar size={28} />
      </span>
    </div>
    <div className="dark:bg-slate-800 bg-white p-6 rounded-lg shadow-md">
      <table className="w-full text-sm text-left mt-2 text-gray-500">
        <thead className="bg-gray-100 dark:bg-slate-900">
          <tr>
            <th className="px-4 py-3 text-gray-700 dark:text-gray-200">Date</th>
            <th className="px-4 py-3 text-gray-700 dark:text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.slice(0, 3).map((invoice, index) => (
            <React.Fragment key={invoice._id}>
              <tr className=" dark:bg-slate-700dark:hover:bg-slate-600 transition-all">
                <td className="px-4 py-4">
                  <div className="flex text-white items-center justify-between">
                    {invoice.date || "N/A"}
                    <FaEdit
                      onClick={() => {
                        setType('Invoice');
                        setCloseModal(false);
                        setCurrenttOpenModalId(invoice._id);
                      }}
                      className="ml-2 cursor-pointer text-blue-500"
                      size={15}
                    />
                  </div>
                </td>
                <td className="px-4 py-4 flex items-center gap-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-md shadow-md transition-all duration-300"
                    onClick={() => ViewInvoice(invoice._id)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-md shadow-md transition-all duration-300"
                    onClick={() => confirmDelete(invoice._id, 'invoice')}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <hr
                    style={{
                      height: '2px',
                      backgroundColor: '#ccc',
                      border: 'none',
                    }}
                  />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    <div className='flex gap-5  justify-center items-center text-gray-200 mt-2 mb-4'>   
     <button
  className={`p-1 rounded-sm bg-gray-700 hover:bg-gray-800
  }`}
  disabled={invoicePage === 1}
>
  <IoMdArrowBack
    className={` cursor-pointer`}
    onClick={invoicePage === 1 ? undefined : invoicePageDown}
    size={24}
  />
</button>
<p className="text-sm p-1 px-3 bg-blue-700">{invoicePage}</p>
<button
  className={`p-1 bg-gray-700 hover:bg-gray-800
  }`}
  disabled={invoicePage === TotalInvoicePages}
>
  <IoMdArrowForward
    className={`cursor-pointer`}
    onClick={invoicePage === TotalInvoicePages ? undefined : invoicePageUP}
    size={24}
  />
</button>


     </div>
          </div>


          

          </div>
          

          {/* demographics  */} 
          <div className='grid  grid-cols-1 xl:grid-cols-3 gap-1 justify-center items-stretch dark:bg-slate-900 '>
          <div className='flex flex-col dark:bg-slate-800 p-4 '>
          <div className='flex items-center'>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200  mt-1  ">Notes</h3>
                </div>
                <br/>
                       
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2  ">
                <div className='w-[100%]  mr-16 md:w-[200%] custom-scrollbar'>
                    <textarea
                      rows={12}
                      type="text"
                      id="notes"
                      name="notes"
                      value={patients.notes ?? 'N/A'}
                      onChange={handleInputChange}
                      className="mt-[6px] block w-full p-4 dark:bg-slate-800 dark:text-gray-300 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <br/>
          </div> 
           
            <div className='flex flex-col dark:bg-slate-800 p-4'> 
            <div className=' flex  items-center p-1 '>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200 ml-2 ">Summary</h3>
          <button
                          className="bg-blue-600  hover:bg-blue-700 text-white font-semibold   py-2 px-4 ml-3  rounded-md shadow-md transition-all duration-300"
                          onClick={(e)=>convertToDocxsummary(e)}
                        >
                          <BsFiletypeDocx size={18} /> 
                      </button>
            </div>
                
                     
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2  mt-5 ml-2  ">
                <div className='w-[100%] mr-16 md:w-[200%] custom-scrollbar'>
                <textarea
                      rows={12}
                      type="text"
                      id="summary"
                      name="summary"
                      value={patients.summary ?? 'N/A'}
                      onChange={handleInputChange}
                      className="mt-1 block w-full  p-4 dark:bg-slate-800 dark:text-gray-300 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div> 
                </div>

                {/* checkIN/OUT  */}
          <div className="dark:bg-slate-800 mt-6 xl:mt-0">
  <div className="flex gap-4 p-4 items-center">
    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200">CheckIn/Out</h1>
    <div
      className="flex gap-1 justify-center rounded-md p-2 bg-blue-600 items-center cursor-pointer text-white hover:bg-blue-700"
      onClick={handleCheck}
    >
      <span className="text-sm">Add</span>
      <HiOutlinePlus size={13} />
    </div>
  </div>

  <div className="dark:bg-slate-800 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="bg-gray-100 dark:bg-slate-900">
        <tr>
          <th className="px-6 py-3 text-gray-700 dark:text-gray-200">Date</th>
          <th className="px-6 py-3 text-gray-700 dark:text-gray-200">In / Out</th>
          <th className="px-6 py-3 text-gray-700 dark:text-gray-200 text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {Dates &&
          Dates.map((date, index) => (
            <tr key={index} className="border-b dark:border-white">
              <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                {date.date || "N/A"}
              </td>
              <td className="px-6 py-4 text-gray-900 dark:text-gray-200">
                {date.checkInTime ? (
                  `${date.checkInTime} / ${date.checkOutTime || "N/A"}`
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-md shadow-md transition-all duration-300"
                    onClick={() => deleteNote(date._id)}
                  >
                    <MdDelete />
                  </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>  
  </div>
  
     <div className='flex gap-5 justify-center items-center text-gray-200 mt-2 mb-4'>   
     <button
  className={`p-1 rounded-sm ${
    notesPage === 1 ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-800'
  }`}
  disabled={notesPage === 1}
>
  <IoMdArrowBack
    className={` ${notesPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    onClick={notesPage === 1 ? undefined : pageBack}
    size={24}
  />
</button>
<p className="text-sm p-1 px-3  bg-blue-700">{notesPage}</p>
<button
  className={`p-1 rounded-sm ${
    notesPage === totalNotes ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-800'
  }`}
  disabled={notesPage === totalNotes}
>
  <IoMdArrowForward
    className={`cursor-pointer ${
      notesPage === totalNotes ? 'cursor-not-allowed' : ''
    }`}
    onClick={notesPage === totalNotes ? undefined : pageUp}
    size={24}
  />
</button>


     </div>
</div>

                </div>  
          <div className="w-[90vw] md:w-[65vw] lg:w-full ">
            <div className="dark:bg-slate-800 bg-white p-8 rounded-lg shadow-md">

              {/* summary  */}   
            
               

              


               

              <form  className="space-y-4">   
              <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>  
            
              <div className='flex items-center'> 
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-200  mt-8 ">Personal Info </h3> 

              <button
                          className=" h-8 w-12 bg-blue-600 items-center    mt-12 hover:bg-blue-700 text-white font-semibold ml-3 mb-3 py-2 px-4 rounded-md shadow-md transition-all duration-300"
                          onClick={()=>convertToDocx('/patient.docx')}
                        >
                          <BsFiletypeDocx size={20} /> 
                        </button>     
              </div>
                        </AccordionTrigger>           
             
          <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={patients.fullName}
                      onChange={handleInputChange}
                      placeholder='Full Name<...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={patients.email}
                      onChange={handleInputChange}
                      placeholder='Email...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Gender</label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={patients.gender}
                      onChange={handleInputChange}
                      placeholder='Gender...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={patients.phoneNumber}
                      onChange={handleInputChange}
                      placeholder='Phone Number...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Date of Birth</label>
                    <input
                      type="text"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={patients.dateOfBirth}
                      onChange={handleInputChange}
                      placeholder='Date of Birth...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="adress" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Emergency Contact</label>
                    <input
                      type="text"
                      id="emergencyContactPhoneNumber"
                      name="emergencyContactPhoneNumber"
                      value={patients.emergencyContactPhoneNumber}
                      onChange={handleInputChange}
                      placeholder='Emergency Contact...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="adress" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={patients?.address}
                      onChange={handleInputChange}
                      placeholder='Address...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div> 
                </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>  
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200  mt-8">Primary Insurance</h3> 
                </AccordionTrigger>  
                <AccordionContent>
    
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  <div>
                    <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Insurance Provider</label>
                    <input
                      type="text"
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={patients.insuranceProvider}
                      onChange={handleInputChange}
                      placeholder='Insurance Provider...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="insurancePolicyNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Insurance Policy Number</label>
                    <input
                      type="text"
                      id="insurancePolicyNumber"
                      name="insurancePolicyNumber"
                      value={patients.insurancePolicyNumber}
                      onChange={handleInputChange}
                      placeholder='Insurance Policy Number...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="policyHolderName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Policy Holder Name</label>
                    <input
                      type="text"
                      id="policyHolderName"
                      name="policyHolderName"
                      value={patients.policyHolderName}
                      onChange={handleInputChange}
                      placeholder='Policy Holder Name...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="groupNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Group Number</label>
                    <input
                      type="text"
                      id="groupNumber"
                      name="groupNumber"
                      value={patients.groupNumber}
                      onChange={handleInputChange}
                      placeholder='Group Number...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                </AccordionContent>
        </AccordionItem>
      </Accordion>   
                {/* Sectcion 3 Medical History  */} 
                <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger> 
                <h3 className="text-2xl font-bold text-gray-900  dark:text-gray-200 mt-8">Medical History</h3> 
                </AccordionTrigger>  
                <AccordionContent> 
                  
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  <div>
                    <label htmlFor="primaryCarePhysician" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Primary Care Physician</label>
                    <input
                      type="text"
                      id="primaryCarePhysician"
                      name="primaryCarePhysician"
                      value={patients.primaryCarePhysician}
                      onChange={handleInputChange}
                      placeholder='Primary Care Physician...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="medications" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Medications</label>
                    <input
                      type="text"
                      id="medications"
                      name="medications"
                      value={patients.medications}
                      onChange={handleInputChange}
                      placeholder='Medications...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Allergies</label>
                    <input
                      type="text"
                      id="allergies"
                      name="allergies"
                      value={patients.allergies}
                      onChange={handleInputChange}
                      placeholder='Allergies...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="chronicConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Chronic Conditions</label>
                    <input
                      type="text"
                      id="chronicConditions"
                      name="chronicConditions"
                      value={patients.chronicConditions}
                      onChange={handleInputChange}
                      placeholder='Chronic Conditions...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="pastSurgeries" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Previous Surgeries</label>
                    <input
                      type="text"
                      id="pastSurgeries"
                      name="pastSurgeries"
                      value={patients.pastSurgeries}
                      onChange={handleInputChange}
                      placeholder='Previous Surgeries...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="familyMedicalHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Family Medical History</label>
                    <input
                      type="text"
                      id="familyMedicalHistory"
                      name="familyMedicalHistory"
                      value={patients.familyMedicalHistory}
                      onChange={handleInputChange}
                      placeholder='Family Medical History...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                </AccordionContent> 
                </AccordionItem>
                </Accordion> 

                {/* Section 4  */} 
                <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>  
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200  mt-8">Current Health Concerns</h3> 
                </AccordionTrigger>  
                <AccordionContent> 

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  <div>
                    <label htmlFor="visitReason" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Visit Reason</label>
                    <input
                      type="text"
                      id="visitReason"
                      name="visitReason"
                      value={patients.visitReason}
                      onChange={handleInputChange}
                      placeholder='Visit Reason...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="medications" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Symptoms Description</label>
                    <input
                      type="text"
                      id="symptomDescription"
                      name="symptomDescription"
                      value={patients.symptomDescription}
                      onChange={handleInputChange}
                      placeholder='Symptoms Description...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="symptomDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Symptoms Duration</label>
                    <input
                      type="text"
                      id="symptomDuration"
                      name="symptomDuration"
                      value={patients.symptomDuration}
                      onChange={handleInputChange}
                      placeholder='Symptoms Duration...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="symptomSeverity" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Symptoms Severity</label>
                    <input
                      type="text"
                      id="symptomSeverity"
                      name="symptomSeverity"
                      value={patients.symptomSeverity}
                      onChange={handleInputChange}
                      placeholder='Symptoms Severity...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="symptomHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Symptoms History</label>
                    <input
                      type="text"
                      id="symptomHistory"
                      name="symptomHistory"
                      value={patients.symptomHistory}
                      onChange={handleInputChange}
                      placeholder='Symptoms History...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="symptomTriggers" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Symptoms Triggers</label>
                    <input
                      type="text"
                      id="symptomTriggers"
                      name="symptomTriggers"
                      value={patients.symptomTriggers}
                      onChange={handleInputChange}
                      placeholder='Symptoms Triggers...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div> 
                </AccordionContent> 
                </AccordionItem>
                </Accordion> 
                 {/* Section 5  */} 
                 <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>  
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200  mt-8">Social History</h3> 
                </AccordionTrigger>  
                <AccordionContent> 

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Occupation</label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={patients.occupation}
                      onChange={handleInputChange}
                      placeholder='Occupation...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Lifestyle Habits</label>
                    <input
                      type="text"
                      id="lifestyle"
                      name="lifestyle"
                      value={patients.lifestyle}
                      onChange={handleInputChange}
                      placeholder='Lifestyle Habits...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="exerciseAndDiet" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Exercise and Diet</label>
                    <input
                      type="text"
                      id="exerciseAndDiet"
                      name="exerciseAndDiet"
                      value={patients.exerciseAndDiet}
                      onChange={handleInputChange}
                      placeholder='Exercise and Diet...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="livingArrangement" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Living Situation</label>
                    <input
                      type="text"
                      id="livingArrangement"
                      name="livingArrangement"
                      value={patients.livingArrangement}
                      onChange={handleInputChange}
                      placeholder='Living Situation...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                </div>  
                </AccordionContent> 
                </AccordionItem>
                </Accordion> 
                {/* Section 6  */} 
                <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200  mt-8">Review of Systems (ROS)</h3> 
                </AccordionTrigger>  
                <AccordionContent> 
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  <div>
                    <label htmlFor="recentHealthChanges" className="block text-sm font-medium text-gray-700 dark:text-gray-200 " >General Health</label>
                    <input
                      type="text"
                      id="recentHealthChanges"
                      name="recentHealthChanges"
                      value={patients.recentHealthChanges}
                      onChange={handleInputChange}
                      placeholder='General Health....'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="cardiovascularHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Cardiovascular</label>
                    <input
                      type="text"
                      id="cardiovascularHistory"
                      name="cardiovascularHistory"
                      value={patients.cardiovascularHistory}
                      onChange={handleInputChange}
                      placeholder='Cardiovascular...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="respiratoryHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Respiratory</label>
                    <input
                      type="text"
                      id="respiratoryHistory"
                      name="respiratoryHistory"
                      value={patients.respiratoryHistory}
                      onChange={handleInputChange}
                      placeholder='Respiratory...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="gastrointestinalHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Gastrointestinal</label>
                    <input
                      type="text"
                      id="gastrointestinalHistory"
                      name="gastrointestinalHistory"
                      value={patients.gastrointestinalHistory}
                      onChange={handleInputChange}
                      placeholder='Gastrointestinal...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="musculoskeletalHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Musculoskeletal</label>
                    <input
                      type="text"
                      id="musculoskeletalHistory"
                      name="musculoskeletalHistory"
                      value={patients.musculoskeletalHistory}
                      onChange={handleInputChange}
                      placeholder='Musculoskeletal...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="neurologicalHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Neurological</label>
                    <input
                      type="text"
                      id="neurologicalHistory"
                      name="neurologicalHistory"
                      value={patients.neurologicalHistory}
                      onChange={handleInputChange}
                      placeholder='Neurological...'
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  
                </div>
                </AccordionContent> 
                </AccordionItem>
                </Accordion> 
                <br/>
                <div className="mt-8 bg-blue-600">
                  <button 
                  className="w-full dark:bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-all duration-300"
                  onClick={(e)=>handleFormSubmit(e)}
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            
            </div>
          </div>
          
          

        </div> 
        <style jsx> 
          { 
          ` 
          /* General scrollbar styles */
.custom-scrollbar textarea {
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: gray transparent; /* Scrollbar track and thumb colors for Firefox */
}

/* For WebKit browsers (Chrome, Edge, Safari) */
.custom-scrollbar textarea::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
  height: 8px; /* Height of the scrollbar (for horizontal scrollbar) */
}

.custom-scrollbar textarea::-webkit-scrollbar-thumb {
  background-color: gray; /* Color of the scrollbar thumb */
  border-radius: 8px; /* Roundness of the scrollbar thumb */
}

.custom-scrollbar textarea::-webkit-scrollbar-thumb:hover {
  background-color: darkgray; /* Thumb color on hover */
}

.custom-scrollbar textarea::-webkit-scrollbar-track {
  background: transparent; /* Background color of the scrollbar track */
  border-radius: 8px;
}

          `
          }
        </style>
        </>
      )}
    </>
  );
};

export default Fich;
