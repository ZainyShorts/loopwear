/*eslint-disable*/
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../Components/Sidebar/sidebar.js';
import Patient from "../Components/patients.js";
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
  const [loading, setLoading] = useState(false);  
  const [page , setPage] = useState(1);
  const [totalPages , setTotalPages] = useState(1);
  const [totalCount,setTotaCount] = useState(0)

  const {checker,setUser,showToast,config} = useContext(GlobalStateContext)
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
    
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
      try {
        
        const res = await axios.get(`${Node_API_URL}/api/get/getPatients?page=${page}`,config);
        if(res.data.response === true){
          setPatients(res.data.patients);
          setTotalPages(res.data.pagination.totalPages);
          setTotaCount(res.data.patients.total)
        }
      } catch (error) {
        showToast("Error fetching patien reports",{type: 'error'})
      }finally{
      setLoading(false);
      }
    };
    
    const downloadPatientsAsXlxs=async()=>{
      try{
        setLoading(true);
        // Create a new workbook and add the JSON data to a worksheet
        const res = await axios.get(`${Node_API_URL}/api/get/exportAllPatients`,config);
        const worksheet = XLSX.utils.json_to_sheet(res.data.patients.map(({ _id, createdAt, updatedAt,doc_id, ...rest }) => rest));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        // Generate the file name
        const fileName = 'Patients.xlsx';
        
        // Write the workbook to a file
        XLSX.writeFile(workbook, fileName);
      }catch(e){
        showToast("Error exportig patients",{type: 'error'})
      }finally{
        setLoading(false);
      }
    }

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
        <Patient totalCount={totalCount} downloadPatientsAsXlxs={downloadPatientsAsXlxs} fetchPatients={fetchData} setPatients={setPatients} patients={patients} loading={loading} page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  </div>
</div>



  </div>
</div>

  
  );
};

export default PatientPage;
