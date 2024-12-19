import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import { useRef } from "react";
import { flask_API_URL } from "../../client";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { GlobalStateContext } from "../../Context/GlobalStateContext.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { FaFileWord } from 'react-icons/fa'  
import { useParams } from "react-router-dom";
const QuickReportView = () => {
  const { patientId } = useParams();
  const { setUser,checker ,showToast,soapNotesSummary,subjective,objective,Assessment,Plan,cptCodes,icdCodes,physicalExamination,chiefComplaint,PMH,med,Allergy,HPI,ROS,original,userTimeZone , setOriginal,setIcdCodes,setSubjective, setObjective, setmed,setCptCodes, setDxCodes, setAssessment, setPlan, setSoapNotesSummary, setAllergy, setHPI, setPMH, setROS, setchiefComplaint,setphysicalExamination} = useContext(GlobalStateContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state)=>state.auth)

   function getDateInTimezone(timezone) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: timezone };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  }
  
   function getTimeInTimezone(timezone) {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timezone };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  }
  
  

  useEffect(() => {
    checker().then((res)=>{
      if(res==false)
      {
      setUser(false)
      dispatch(logout())
      navigate('/')
      }
    })
    },[]);
 
    useEffect(()=>{    
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
      
    },[])

  const pdfRef = useRef();


   
  const convertToDocx = async () => {
    try {
      const response = await fetch('quickTemplate.docx');
      const template = await response.arrayBuffer();
      const zip = new PizZip(template);
      const doc = new Docxtemplater(zip);
      const formatCodes = (codes) =>
        codes.map((item) => ({
          code: `${item['code']} ${item['description']} `
        }));
      
      doc.setData({
        clinicName:userInfo.clinicName,
        date:getDateInTimezone(userTimeZone),
        time: getTimeInTimezone(userTimeZone),
        soapNotesSummary: soapNotesSummary,
        assessment: Assessment,
        plan: Plan,
        Allergy:Allergy,
        HPI:HPI,
        PMH:PMH,
        subjective,
        objective,
        chiefComplaint:chiefComplaint,
        physicalExamination:physicalExamination,
        cptCodes: formatCodes(cptCodes),
        ictCodes: formatCodes(icdCodes),
        medication: med,
        Constitutional:ROS['Constitutional'],
        Eyes:ROS['Eyes'],
        ENT:ROS['ENT'],
        Cardiovascular:ROS['Cardiovascular'],
        Respiratory:ROS['Respiratory'],
        Gastrointestinal:ROS['Gastrointestinal'],
        Genitourinary:ROS['Genitourinary'],
        Musculoskeletal:ROS['Constitutional'],
        Constitutional:ROS['Musculoskeletal'],
        Skin:ROS['Skin'],
        Neurological:ROS['Neurological'],
        Psychiatric:ROS['Psychiatric'],
      });

      doc.render();

      const outputBuffer = doc.getZip().generate({ type: "blob" });
      const blob = new Blob([outputBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, `quick_Report.docx`);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };
  
  

 
  const [gmail,setGmail]=useState(true)
  const [open,setOpen]=useState(false) 
 const redirectToGmail = () => {
    setOpen(true)
    setGmail(true)
  };

//   const downloadTranscriptionPdf = async () => {
//     try {
//       const response = await fetch("/Transcription.docx");
//       const template = await response.arrayBuffer();
//       const zip = new PizZip(template);
//       const doc = new Docxtemplater(zip);
      
//       doc.setData({
//         conversation:original,
//       });

//       doc.render();

//       const outputBuffer = doc.getZip().generate({ type: "blob" });
//       const blob = new Blob([outputBuffer], {
//         type:
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       });
//       saveAs(blob, `${name}_transcription.docx`);
//     } catch (error) {
//       console.error("Error generating DOCX:", error);
//     }finally{
//       setOpen(false)
//     }
//   };

  
//   const [clientEmail,setClientEmail]=useState("")
//   const [sub,setSub]=useState("")
//   const [body,setBody]=useState("")

//   const send = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('email', clientEmail);
//     formData.append('subject', sub);
//     formData.append('message', body);

//     const input = pdfRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPdf("p", "mm", "a4", true);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//       const imgX = (pdfWidth - imgWidth * ratio) / 2;
//       const imgY = 0;
//       pdf.addImage(
//         imgData,
//         "PNG",
//         imgX,
//         imgY,
//         imgWidth * ratio,
//         imgHeight * ratio
//       );

//       const pdfBlob = pdf.output('blob');
//       formData.append('file', pdfBlob, 'report.pdf'); // append PDF blob with a filename

//       axios.post(`${flask_API_URL}/sendpdf`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })
//       .then(res => {
//         console.log(res);
//         if(res.status === 200) {
//           showToast('Done', { type: 'success' });
//         }
//       })
//       .catch(e => {
//         showToast('Failed to send report', { type: 'error' });
//       });
//     }).catch((e)=>{
//       showToast('Failed to send report', { type: 'error' });
//     })
//   }

//   const viewTranscript = () =>{
//     setOpen(true)
//     setGmail(false)
//   }

  

  return (
        <>
   
          <div className="md:mx-4 mt-6 bg-white border dark:bg-slate-900 border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div
              className="p-6 h-full dark:bg-slate-800 bg-white rounded-md shadow-xl shadow-gray-600/40 ring-1 ring-black backdrop-blur-md"
              ref={pdfRef}
            >
             {/* {visitId!='Quick' && (
              <>
              
              <div className="flex justify-end">
                <p className="dark:text-gray-200">Date:{date}</p>
              </div>
              <div className="flex justify-end">
                <p className="dark:text-gray-200 ">Time:{time}</p>
              </div>
              </>
             )} */}
              <h1 className="text-3xl text-center font-bold leading-none tracking-tight text-black md:text-5xl lg:text-4xl dark:text-white">
               Report
              </h1>
              <form className="mt-6">
                <hr className="h-px my-4 bg-gray-300 border-1 dark:bg-gray-900"></hr>
                <div className= "border dark:border-gray-300 p-4 ">
                  <h1 className="font-semibold dark:text-gray-200 text-black">
                    Consultation Summary:{" "}
                  </h1>
                  <div className="border dark:border-gray-300 dark:text-white w-full p-4 mt-4">
                    {soapNotesSummary}
                  </div>{" "}
                </div>
                <div className="mt-4">
                  <h1 className="font-semibold dark:text-gray-200 text-black">SOAP NOTES: </h1>
                  <div className="border dark:border-gray-300 w-full p-4 mt-4">
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Assessment:
                    </h1> 
                    <div className="dark:text-white">   
                    {Assessment} 
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">Plan:</h1> 
                    <div className="dark:text-white">   
                    {Plan} 
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Allergy:
                    </h1> 
                    <div className="dark:text-white">   
                    {Allergy} 
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">HPI:</h1> 
                    <div className="dark:text-white">   
                    {HPI} 
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold  dark:text-gray-200 text-blue-900">PMH:</h1> 
                    <div className="dark:text-white">   
                    {PMH} 
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">ROS:</h1>
                    <h1 className="text-sm font-bold  dark:text-gray-200 text-blue-900">Constitutional:</h1>
                    <div className="dark:text-white">   
                     {ROS['Constitutional']} 
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Eyes:</h1>  

                    <div className="dark:text-white">   
                    {ROS['Eyes']} 
                    </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">ENT:</h1> 
                    <div className="dark:text-white">   
                    {ROS['ENT']} 
                    </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Cardiovascular:</h1> 
                    <div className="dark:text-white">   
                    {ROS['Cardiovascular']} 
                    </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Respiratory:</h1>
                    <div className="dark:text-white">                     
                    {ROS['Respiratory']} 
                    </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Gastrointestinal:</h1>
                    <div className="dark:text-white">   
                     {ROS['Gastrointestinal']} 
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Genitourinary:</h1>
                    <div className="dark:text-white">   
                     {ROS['Genitourinary']} 
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Musculoskeletal:</h1>
                    <div className="dark:text-white">   
                     {ROS['Musculoskeletal']} 
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Skin:</h1>
                    <div className="dark:text-white">   
                     {ROS['Skin']} 
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Neurological:</h1>
                    <div className="dark:text-white">   
                     {ROS['Neurological']} 
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Psychiatric:</h1>
                    <div className="dark:text-white">   
                     {ROS['Psychiatric']} 
                     </div>
                     <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Chief Complaint:
                    </h1>
                    <div className="dark:text-white">   
                     {chiefComplaint} 
                     </div>
                     <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Physical Examination:
                    </h1> 
                    <br/>
                    <div className="dark:text-white">   
                    {physicalExamination} 
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Subjective:
                    </h1> 
                   <div className="dark:text-white">   
                    {subjective} 
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Objective:
                    </h1> 
                    <div className="dark:text-white">   
                    {objective} 
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Medication:
                    </h1> 
                    <div className="dark:text-white">   
                    {med} 
                    </div>
                  </div>
                </div>

                <div>
                <br/>
                  <h1 className="font-semibold dark:text-gray-200 text-black">Code Extraction:</h1>
                  <div className="border dark:border-gray-300 w-full p-4 mt-4">
                    <h1 className="font-semibold text-sm dark:text-gray-200 text-gray-900 ">
                      CPT Codes{" "}
                    </h1>
                    {cptCodes && (
  <ul>
    {cptCodes.map((code, index) => (
      <li key={index}>
        <div className="flex p-2 mb-4 mt-4">
          <div className="w-full">
            <div
              className="bg-gray-50 rounded w-full p-2 dark:text-gray-800 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
            >
              {code['code']}
              <br />
              {code['description']}
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
)}

                  </div>

                  {/* DX CODE */}
                
                  <div className="border dark:border-gray-300 w-full p-4 mt-4 ">
                    <h1 className="font-semibold text-sm dark:text-gray-200 text-gray-900 ">
                      ICD-10 codes{" "}
                    </h1> 
                    {icdCodes && ( 
                    <ul>
                      {icdCodes.map((code, index) => (
                        <li key={index}>
                          <div className="flex p-2 mb-4 mt-4">
                            <div className="w-full">
                              <div
                                className="bg-gray-50 rounded w-full p-2 dark:text-gray-900 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                              >
                                {`${code['code']}\n${code['description']}`}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    )}

                  </div>
                </div>
                <div></div>
              </form>
            </div>
            <div className="place-content-center ">
              <div className="grid grid-cols-1 px-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={convertToDocx}
                  
                >
                  <FaFileWord className="button-icon mx-3" />  DOCX
                </button>
                {/* <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={() =>convertToDocx("/templateold.docx")
                  }
                >
                  <FaFileWord className="button-icon mx-3" />  DOCX Old Temp
                </button>
                
                <button
                  className="bg-green-300 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={viewTranscript}
                >
                  <CiText className="button-icon mx-3" /> Transcript
                </button> */}
              </div>
            </div>
          </div>
        </>
  );
};

export default QuickReportView;
