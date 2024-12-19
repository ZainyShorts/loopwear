import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { CiText } from "react-icons/ci";
import jsPdf from "jspdf";
import { useRef } from "react";
import { flask_API_URL, Node_API_URL } from "../client";
import Loading from "./loading.js";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";
import {
  FaFilePdf,
  FaFileWord,
  FaEnvelope,
} from "react-icons/fa";
import { GlobalStateContext } from "../Context/GlobalStateContext.js";
import axios from "axios";
import Modal from "./ui/Modal/Modal.js";
import Input from "./ui/Input/Input.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Report = () => {

  const { token,setUser,checker ,showToast} = useContext(GlobalStateContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state)=>state.auth)
  const [loading, setLoading] = useState(true);
  const [soapNotesSummary, setSoapNotesSummary] = useState("");
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [Assessment, setAssessment] = useState("");
  const [Plan, setPlan] = useState("");
  const [cptCodes, setCptCodes] = useState([]);
  const [icdCodes, setIcdCodes] = useState([]);
  const [dxCodes, setDxCodes] = useState([]);
  const [physicalExamination,setphysicalExamination]=useState("")
  const [ chiefComplaint,setchiefComplaint ] = useState("")
  const [PMH, setPMH]=useState("")
  const [med,setmed]=useState("")
  const [Allergy, setAllergy] = useState("");
  const [HPI, setHPI] = useState([]);
  const [ROS, setROS] = useState("");
  const [Rationale,setRationale]=useState("")
  const { visitId } = useParams();

  

  useEffect(() => {
    checker().then((res)=>{
      if(res==false)
      {
      setUser(false)
      dispatch(logout())
      navigate('/')
      }else{
        fetchReportData();
      }
    })
    },[]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [time, setTime] = useState("fds");
  const [adress, setAdress] = useState("fds");
  const [phone, setPhone] = useState("fs");
  const [date, setDate] = useState("");
  const [provider, setProvider] = useState("");
  const [member, setMember] = useState("");
  const [original,setOriginal]=useState("")
  

  const pdfRef = useRef();


  const textareaRef = useRef(null);

  
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

  const fetchReportData = async()=>{ 
    console.log(visitId);
    try
    {
      setLoading(true)
      const config = {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
      const res = await axios.get(`${Node_API_URL}/api/get/viewReport?visitId=${visitId}`,config)
      console.log(res)
      if(res.data.response === true)
      {
        //patient details
        const patient = res.data.patient;
        setName(patient.fullName)
        setAge(patient.dateOfBirth)
        setAdress(patient.email)
        setPhone(patient.phoneNumber)
        setProvider(patient.insuranceProvider)
        setMember(patient.insurancePolicyNumber)
        //visit details
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
        setDate(formatCreatedAtDate(visit.createdAt))
        setTime(formatDateTime(visit.createdAt))
        setOriginal(visit.all)
        setRationale(JSON.parse(visit.Rationale))
      }
    }catch(e)
    {
      console.log("error in fetching report data refresh page please")
    }finally{
      setLoading(false)
    }

  }

  const convertToDocx = async()=>{
    try {
      const result = await axios.get(`${Node_API_URL}/api/get/reportDocx?visitId=${visitId}`, {
          responseType: 'blob', // Important: Set response type to blob
          headers:{
            "Authorization": `Bearer ${token}`,
          }
        });
      
      if(!result.data)
      {
        alert('Download process failed')
      }
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}.docx`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
    

  } catch (error) {
      console.error('Error downloading file:', error);
  }
  }
  const convertTopdf = async () => {
    try {
        const result = await axios.get(`${Node_API_URL}/api/get/reportPdf?visitId=${visitId}`, {
            responseType: 'blob', // Important for binary data
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (result.status === 200) {
            const url = window.URL.createObjectURL(new Blob([result.data], { type: 'application/pdf' }));
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } else {
            alert('Download process failed: ' + result.data.message);
        }
    } catch (error) {
        console.error('Error downloading file:', error);
        alert('Error downloading file. Please try again later.');
    }
};


 
  const [gmail,setGmail]=useState(true)
  const [open,setOpen]=useState(false) 
 const redirectToGmail = () => {
    setOpen(true)
    setGmail(true)
  };

  const downloadTranscriptionPdf = async () => {
    try {
      const response = await fetch("/Transcription.docx");
      const template = await response.arrayBuffer();
      const zip = new PizZip(template);
      const doc = new Docxtemplater(zip);
      
      doc.setData({
        conversation:original,
      });

      doc.render();

      const outputBuffer = doc.getZip().generate({ type: "blob" });
      const blob = new Blob([outputBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, `${name}_transcription.docx`);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }finally{
      setOpen(false)
    }
  };



  
  const [clientEmail,setClientEmail]=useState("")
  const [sub,setSub]=useState("")
  const [body,setBody]=useState("")

  const send = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', clientEmail);
    formData.append('subject', sub);
    formData.append('message', body);

    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      const pdfBlob = pdf.output('blob');
      formData.append('file', pdfBlob, 'report.pdf'); // append PDF blob with a filename

      axios.post(`${flask_API_URL}/sendpdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res);
        if(res.status === 200) {
          showToast('Done', { type: 'success' });
        }
      })
      .catch(e => {
        showToast('Failed to send report', { type: 'error' });
      });
    }).catch((e)=>{
      showToast('Failed to send report', { type: 'error' });
    })
  }

  const viewTranscript = () =>{
    setOpen(true)
    setGmail(false)
  }

  

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <>
        <Modal isOpen={open} onClose={()=>setOpen(false)} >
         {gmail && <form onSubmit={(e)=>send(e)}>

          <Input placeholder={"Email"} label={"Email"} value={clientEmail} change={setClientEmail}  type={"Email"} disable={false} tag={false}/>
          <br/>
          <Input placeholder={"Subject"} label={"Subject"} value={sub} change={setSub}  type={"text"} disable={false} tag={false}/>
          <br/>
          <Input placeholder={"Body"} label={"Msg"} value={body} change={setBody}  type={"text"} disable={false} tag={true}/>
          <br/>
          <div className="flex items-center">
          <FaFilePdf size={50} color={"red"} />
          <span className="text-white">{name}.pdf</span>
          </div>
          <br/>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105" >
                   Send
          </button>
          </form>}
          {!gmail && 
          ( <>
            <br/>
            <Input  label={"Transcription"} value={original} change={setBody}  type={"text"} disable={false} tag={true}/>
            <br/>
            <FaDownload className="cursor-pointer" onClick={downloadTranscriptionPdf} color="white" size={20}/>
            </>
            )
          }

          </Modal>

          <div className="md:mx-4 mt-6 bg-white border dark:bg-slate-900 border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div
              className="p-6 h-full dark:bg-slate-800 bg-white rounded-md shadow-xl shadow-gray-600/40 ring-1 ring-black backdrop-blur-md"
              ref={pdfRef}
            >
             
              <h1 className="text-3xl text-center font-bold leading-none tracking-tight text-black md:text-5xl lg:text-4xl dark:text-white">
               {visitId=='Quick'?userInfo.clinicName:"Report"}
              </h1>
              <form className="mt-6">
              {visitId!='Quick' &&   <div className="mb-3 flex-col gap-4 border  p-4 border-current dark:border-gray-300">
                  <div className="m-2 w-2/3">
                    <h1 className="font-semibold dark:text-gray-200 text-gray-900 inline-block">
                      Name:
                    </h1>
                    <p className="inline-block ml-2 dark:text-gray-200">{name}</p>
                  </div>

                  <div className="m-2 w-2/3">
                    <h1 className="font-semibold dark:text-gray-200 text-gray-900 inline-block">
                      Date Of Birth:
                    </h1>
                    <p className="inline-block ml-2 dark:text-gray-200">{age}</p>
                  </div>

                  <div className="m-2 w-2/3">
                    <h1 className="font-semibold text-gray-900  dark:text-gray-200 inline-block">
                      Email Address:
                    </h1>
                    <p className="inline-block ml-2 dark:text-gray-200"> {adress}</p>
                  </div>
                  <div className="m-2 w-2/3">
                    <h1 className="font-semibold dark:text-gray-200 text-gray-900 inline-block">
                      Phone Number:
                    </h1>
                    <p className="inline-block ml-2 dark:text-gray-200">{phone} </p>
                  </div>
                  <div className="m-2 w-2/3">
                    <h1 className="font-semibold dark:text-gray-200 text-gray-900 inline-block">
                      Insurance Provider:
                    </h1>
                    <p className="inline-block ml-2 dark:text-gray-200">{provider} </p>
                  </div>
                  <div className="m-2 w-2/3">
                    <h1 className="font-semibold dark:text-gray-200 text-gray-900 inline-block">
                      Insurance number:
                    </h1>
                    <p className="inline-block ml-2  dark:text-gray-200">{member} </p>
                  </div>
                </div>}
                <hr className="h-px my-4 bg-gray-300 border-1 dark:bg-gray-900"></hr>
                <div className= "border dark:border-gray-300 p-4 ">
                  <h1 className="font-semibold dark:text-gray-200 text-black">
                    Consultation Summary:{" "}
                  </h1>
                  <div className="border dark:border-gray-300 dark:text-white w-full p-4 mt-4">
                    {/* {soapNotesSummary} */}
                    <Markdown remarkPlugins={[remarkGfm]} children={soapNotesSummary} />
                  </div>{" "}
                </div>
                <div className="mt-4">
                  <h1 className="font-semibold dark:text-gray-200 text-black">SOAP NOTES: </h1>
                  <div className="border dark:border-gray-300 w-full p-4 mt-4">
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Assessment:
                    </h1> 
                    <div className="dark:text-white">   
                    {/* {Assessment}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={Assessment} />
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">Plan:</h1> 
                    <div className="dark:text-white">   
                    {/* {Plan}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={Plan} />
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Allergy:
                    </h1> 
                    <div className="dark:text-white">   
                    {/* {Allergy}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={Allergy} />
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">HPI:</h1> 
                    <div className="dark:text-white">   
                    {/* {HPI}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={HPI} />
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold  dark:text-gray-200 text-blue-900">PMH:</h1> 
                    <div className="dark:text-white">   
                    {/* {PMH}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={PMH} />
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">ROS:</h1>
                    <div className="pl-3">
                    <h1 className="text-sm font-bold  dark:text-gray-200 text-blue-900">Constitutional:</h1>
                    <div className="dark:text-white">   
                     {/* {ROS['Constitutional']}  */}
                     <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Constitutional']} />
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Eyes:</h1>  

                    <div className="dark:text-white">   
                    {/* {ROS['Eyes']}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Eyes']} />
                    </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">ENT:</h1> 
                    <div className="dark:text-white">   
                    {/* {ROS['ENT']}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['ENT']} />
                    </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Cardiovascular:</h1> 
                    <div className="dark:text-white">   
                    {/* {ROS['Cardiovascular']}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Cardiovascular']} />
                    </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Respiratory:</h1>
                    <div className="dark:text-white">                     
                    {/* {ROS['Respiratory']}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Respiratory']} />
                    </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Gastrointestinal:</h1>
                    <div className="dark:text-white">   
                     {/* {ROS['Gastrointestinal']}  */}
                     <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Gastrointestinal']} />
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Genitourinary:</h1>
                    <div className="dark:text-white">   
                     {/* {ROS['Genitourinary']}  */}
                     <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Genitourinary']} />
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Musculoskeletal:</h1>
                    <div className="dark:text-white">   
                     {/* {ROS['Musculoskeletal']}  */}
                     <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Musculoskeletal']} />
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Skin:</h1>
                    <div className="dark:text-white">   
                     {ROS['Skin']} 
                     <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Skin']} />
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Neurological:</h1>
                    <div className="dark:text-white">   
                     {/* {ROS['Neurological']}  */}
                     <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Neurological']} />
                     </div>
                    <br/>
                    <h1 className="text-sm font-bold dark:text-gray-200 text-blue-900">Psychiatric:</h1>
                    <div className="dark:text-white">   
                     {/* {ROS['Psychiatric']}  */}
                     <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={ROS['Psychiatric']} />
                     </div>
                    </div>
                     <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Chief Complaint:
                    </h1>
                    <div className="dark:text-white">   
                     {/* {chiefComplaint}  */}
                     <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={chiefComplaint} />
                     </div>
                     <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Physical Examination:
                    </h1> 
                    {/* <br/> */}
                    <div className="dark:text-white">   
                    {/* {physicalExamination}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={physicalExamination} />
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Subjective:
                    </h1> 
                   <div className="dark:text-white">   
                    {/* {subjective}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={subjective} />
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Objective:
                    </h1> 
                    <div className="dark:text-white">   
                    {/* {objective}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={objective} />
                    </div>
                    <br/>
                    <h1 className="text-xl font-bold dark:text-gray-200 text-blue-900">
                      Medication:
                    </h1> 
                    <div className="dark:text-white">   
                    {/* {med}  */}
                    <Markdown remarkPlugins={[remarkGfm]} className='pl-6' children={med} />
                    </div>
                    
                  </div>{" "}
                </div>

                <div>
                <br/>
                  <h1 className="font-semibold dark:text-gray-200 text-black">Code Extraction:</h1>
                  <div className="border dark:border-gray-300 w-full p-4 mt-4">
                    <h1 className="font-semibold text-sm dark:text-gray-200 text-gray-900 ">
                      CPT Codes{" "}
                    </h1>
                    <ul>
                      {cptCodes.map((code, index) => (
                        <li key={index}>
                          <div className="flex p-2 mb-4 mt-4">
                            <div className="w-full">
                              <div
                                className="bg-gray-50 rounded w-full p-2 dark:text-gray-800 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                              >
                                {/* {`${code['code']}\n${code['description']}`} */}
                                <Markdown remarkPlugins={[remarkGfm]}  children={`${code['code']}\n${code['description']}`} />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>{" "}
                  </div>

                  {/* DX CODE */}
                
                  <div className="border dark:border-gray-300 w-full p-4 mt-4 ">
                    <h1 className="font-semibold text-sm dark:text-gray-200 text-gray-900 ">
                      ICD-10 codes{" "}
                    </h1>
                    <ul>
                      {icdCodes.map((code, index) => (
                        <li key={index}>
                          <div className="flex p-2 mb-4 mt-4">
                            <div className="w-full">
                              <div
                                className="bg-gray-50 rounded w-full p-2 dark:text-gray-900 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                              >
                                {/* {`${code['code']}\n${code['description']}`} */}
                                <Markdown remarkPlugins={[remarkGfm]}  children={`${code['code']}\n${code['description']}`} />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
                <div></div>
              </form>
            </div>

            <div className="place-content-center ">
              <div className="grid grid-cols-1 px-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {/* <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={convertTopdf}
                >
                  <FaFilePdf className="button-icon mx-3" />  PDF
                </button> */}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={convertToDocx}>
                  <FaFileWord className="button-icon mx-3" />  DOCX 
                </button>
                {/* <button
                  className="bg-amber-300 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={redirectToGmail}
                >
                  <FaEnvelope className="button-icon mx-3" /> Mail
                </button> */}
                <button
                  className="bg-green-300 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={viewTranscript}
                >
                  <CiText className="button-icon mx-3" /> Transcript
                </button>
              </div>
            </div>
          </div>
        </>

        </>
      )}
    </>
  );
};

export default Report;
