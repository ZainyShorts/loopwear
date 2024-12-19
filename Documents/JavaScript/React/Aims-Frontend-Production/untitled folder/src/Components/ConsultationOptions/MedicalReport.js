/*eslint-disable*/
import { React, useState, useEffect, useContext } from "react";
import { Node_API_URL } from "../../client.js";
import { GlobalStateContext } from "../../Context/GlobalStateContext.js";
import axios from "axios";
import { head } from "lodash";


export default function MedicalReport({id , setModalMsg}) { 
  const { token} = useContext(GlobalStateContext)
  const [loading, setLoading] = useState(true);
  const [soapNotesSummary, setSoapNotesSummary] = useState("");
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [Plan, setPlan] = useState(""); 
  const [gender , setGender] = useState(null);
  
  // const { visitId } = useParams();
  const fetchReportData = async()=>{
    try
    { 
      setLoading(true)
      const config = {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
      const res = await axios.get(`${Node_API_URL}/api/get/recentVisit?patientId=${id}`,config)
      console.log(res) 
      if (res.data.msg == 'no patient visit'){ 
        setModalMsg({head : 'No Visits', msg:'Patient Dont Have Any Visits'}); 
        return
      }
      if(res.data.response === true) 
      {
        //patient details
        const patient = res.data.patient; 
        setName(patient.fullName ?? 'N/A')
        setAge(patient.dateOfBirth ?? 'N/A')  
        setGender(patient.gender ?? 'N/A');
      
        //visit details
        const visit = res.data.visit;
      
        setPlan(visit.Plan)
        setSoapNotesSummary(visit.soapNotesSummary?? 'N/A')
        setSubjective(visit.subjective ?? 'N/A')
        setObjective(visit.objective?? 'N/A')
      
        setDate(visit.date ?? 'N/A')
     
      } 
      
    }catch(e)
    {
      console.log(e)
    }finally{
      setLoading(false)
    }

  } 
  const [ name, setName] = useState("");
  const [age, setAge] = useState("");
 
  

   const [date, setDate] = useState(''); 
   const [time , setTime] = useState('')
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

  useEffect (()=>{  
    fetchReportData(); 
  },[]);
  return (
      <div className=" fade-in-animation dark:bg-slate-800 h-[450px] w-[350px] p-6 text-gray-50 rounded-l-lg shadow-lg text-slate-100 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">Medical Report</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Patient Information</h2>
          <div className="grid text-gray-200 grid-cols-1 gap-2 text-slate-100">
            <p><span className="font-semibold">Name:</span> {name}</p>
            <p><span className="font-semibold">Age:</span> {age}</p>
            <p><span className="font-semibold">Gender:</span> {gender}</p>
            <p><span className="font-semibold">Date:</span> {date}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-100">Subjective</h2>
          <p className="mt-2 text-gray-200 ">
          {subjective}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-100">Objective</h2>
          <p className="mt-2 text-gray-200">
           {objective}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-100">Summary</h2>
          <p className="mt-2 text-slate-300">
           {soapNotesSummary}
          </p>
        </section>
        <br/>
        <section>
          <h2 className="text-xl font-bold text-slate-100">Plan</h2>
          <p className="mt-2 text-slate-300">
           {Plan}
          </p>
        </section>

        
      </div>
  );
}