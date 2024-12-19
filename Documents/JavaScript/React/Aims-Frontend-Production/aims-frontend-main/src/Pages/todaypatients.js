/*eslint-disable*/
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../Components/sidebar.js';
import TodayPatient from "../Components/TodayPatient/TodayPatient.js";
import Searchbar from '../Components/searchbar.js';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Node_API_URL } from '../client';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStateContext } from '../Context/GlobalStateContext.js';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice.js';
import * as XLSX from 'xlsx';

const PatientPage = (props) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(false); 

  const { userInfo } = useSelector((state)=> state.auth)
  const {token,checker,setUser,showToast,userTimezone} = useContext(GlobalStateContext)
  const navigate = useNavigate()
  const dispatch = useDispatch() 

  useEffect(() => {
    checker().then((res)=>{
      if(res==false)
      {
        setUser(false)
      dispatch(logout())
      navigate('/')
      }else{
        fetchData();
      }
    })
    
  }, []);

  const fetchData = async () => {
    setLoading(true);
      try {
        const config = {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      }
      const res = await axios.get(`${Node_API_URL}/api/get/getTodayPatients?userTimezone=${userTimezone}`,config);        console.log(res)
        if(res.data.response === true){
          setPatients(res.data.patients);
          setFilteredPatients(res.data.patients); // Initialize with full data
        }
      } catch (error) {
        showToast("Error fetching patien reports",{type: 'error'})
      }finally{
      setLoading(false);
      }
    };

    const downloadPatientsAsXlxs=()=>{
      // Create a new workbook and add the JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(patients.map(({ _id, createdAt, updatedAt,doc_id, ...rest }) => rest));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate the file name
    const fileName = 'Patients.xlsx';

    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);
    }

  const handleSearch = (searchTerm) => {
    const filtered = patients.filter(patient => 
      patient.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) 
      // ||
      // patient.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  return (
<div className="w-auto dark:bg-slate-900 overflow-hidden">
  <Navbar name={props.name} className="w-screen" /> {/* Ensure Navbar takes full width */}
  <div className='flex'>
    <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
    <div className='flex-1 md:ml-64 m-4 h-full flex flex-col items-center md:items-start md:w-full md:p-4 '>
  <div className='w-full max-w-full'> 
 
    <div className="w-[98vw]  md:w-[calc(100vw-264px)] overflow-x-auto">
    <div >
        <TodayPatient downloadPatientsAsXlxs={downloadPatientsAsXlxs} fetchPatients={fetchData} setPatients={setPatients} patients={patients} loading={loading} />
      </div>
    </div>
  </div>
</div>



  </div>
</div>

  
  );
};

export default PatientPage;
