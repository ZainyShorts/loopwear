/*eslint-disable*/
import React, { useContext , useState } from 'react';
import { Card, Typography,  Tooltip } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../Context/GlobalStateContext'; 
import { IoMdArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';
import { Node_API_URL } from '../client';
import { MdEditSquare } from "react-icons/md"; 
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMicCircleSharp } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri"; 
import Loader from './ui/Loader/Loader'



const Patient = ({ totalCount, fetchPatients, setPatients , patients, loading,downloadPatientsAsXlxs , page , totalPages , setPage}) => {
  const {token,role} = useContext(GlobalStateContext) 
  const TABLE_HEAD = role ==='Doctor' ? ["#","Name" , "Email","Date of Birth", "Phone Number","Consult", "Edit","Delete","Assistant","QRCODE" ] : ["#","Name" , "Email","Date of Birth", "Phone Number", "Edit","Delete","QRCODE" ];
  const options = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const [isOpen, setIsOpen] = useState(false);  
  const [selectedOption, setSelectedOption] = useState("A");
  const [search ,setSearch] = useState(""); 
  const [query,setQuery] = useState('')
  const [query2,setQuery2] = useState('')
  const navigate = useNavigate(); 


  const SearchByFilter = async (SearchType,query) => { 
    try { 
    const response = await axios.post(`${Node_API_URL}/api/post/searchPatientsByType`, 
      {
      type:SearchType,
      query:query
      }, 
      {
        headers: {
          "Authorization": `Bearer ${token}`,  
        },
      }
    ); 

    // if(response.data.response)
    // {
      setPatients(response.data.patients);
    // } 
    
  } catch (error) {
    console.error('Error while searching:', error);
  }


  };  


  const handleRowClick = (patientId,path) => {
    if(path=='icon')
    {
      navigate(`/Consultation/${patientId}`);
    }else{
      navigate(`/PatientFich/${patientId}`);
    }
  }; 


  const deletePatientHitory = async (patientId) =>{
    try{
    const data = {
      pId:patientId
    }
    const response = await axios.post(`${Node_API_URL}/api/post/deletePatientHitory`, data ,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }, 
  });
  if(response.data.response == true)
  {
    fetchPatients()
    alert(response.data.msg)
  }else{
    alert(response.data.msg)
  }
}catch(e)
{
  alert('Server error')
}
  }

  const handleFilter = ()=>
    {
      SearchByFilter(selected,query);
    }
    
      const [selected, setSelected] = useState('name');
    
      const handleChange = () => {
        setSelected((prevSelected) => (prevSelected === 'name' ? 'email' : 'name'));
      };
      const pageUp = () => { 
        setPage(prev=>prev+1); 
      } 
      const pageBack = () => {  
        if(page > 1) {
          setPage(prev=>prev-1); 
        }
      } 
  return (
    <>  
    <div className="flex h-[70px] items-center text-gray-300 absolute top-0 left-[2px] md:left-64 p-4  w-[65vw]  md:w-[300px] lg:w-[450px] "> 
<div class="relative" id="input">
  <input
    value={query} 
    onChange={(e)=>{setQuery(e.target.value)}}
    placeholder={selected==='email' ? "By Email..." : "By Name..."}
    class="flex justify-center items-center w-full text-sm h-[35px] px-4 text-slate-900 bg-gray-700 rounded-[8px] appearance-none focus:outline-none hover:outline-none peer invalid:outline-none overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
    id="floating_outlined"
    type="text"
  />
  <div class="absolute top-[6px] sm:top-[6px] right-3"> 

  <svg
  xmlns="http://www.w3.org/2000/svg"
  className='text-white cursor-pointer' 
  onClick={handleFilter}
  viewBox="0 0 24 24"
  height="20" 
  width="20"
  fill="white"  // Set fill color to white
>

      <path
        d="M10.979 16.8991C11.0591 17.4633 10.6657 17.9926 10.0959 17.9994C8.52021 18.0183 6.96549 17.5712 5.63246 16.7026C4.00976 15.6452 2.82575 14.035 2.30018 12.1709C1.77461 10.3068 1.94315 8.31525 2.77453 6.56596C3.60592 4.81667 5.04368 3.42838 6.82101 2.65875C8.59833 1.88911 10.5945 1.79039 12.4391 2.3809C14.2837 2.97141 15.8514 4.21105 16.8514 5.86977C17.8513 7.52849 18.2155 9.49365 17.8764 11.4005C17.5979 12.967 16.8603 14.4068 15.7684 15.543C15.3736 15.9539 14.7184 15.8787 14.3617 15.4343C14.0051 14.9899 14.0846 14.3455 14.4606 13.9173C15.1719 13.1073 15.6538 12.1134 15.8448 11.0393C16.0964 9.62426 15.8261 8.166 15.0841 6.93513C14.3421 5.70426 13.1788 4.78438 11.81 4.34618C10.4412 3.90799 8.95988 3.98125 7.641 4.55236C6.32213 5.12348 5.25522 6.15367 4.63828 7.45174C4.02135 8.74982 3.89628 10.2276 4.28629 11.6109C4.67629 12.9942 5.55489 14.1891 6.75903 14.9737C7.67308 15.5693 8.72759 15.8979 9.80504 15.9333C10.3746 15.952 10.8989 16.3349 10.979 16.8991Z"
      ></path>
      <rect
        transform="rotate(-49.6812 12.2469 14.8859)"
        rx="1"
        height="10.1881"
        width="2"
        y="14.8859"
        x="12.2469"
      ></rect>
    </svg>
  </div>
</div>
<div className="flex gap-2">

      {/* Second Checkbox */}
        <span className="ml-3 text-gray-200">Email:</span>
        <input
        type="checkbox"
        checked={selected === 'email'} // Check if 'email' is selected
        onChange={handleChange} // Toggle on change
        className="form-checkbox cursor-pointer h-4 w-4 mt-1 ml-0 mr-1 md:h-5 md:w-5 md:ml-2 text-blue-600 rounded focus:ring focus:ring-blue-300 focus:outline-none"
      />
     
    </div>

</div> 


  
       <div className='flex pb-1 items-center justify-between mx-12'>
        <div className='flex  '>
        <span className='text-white px-3'>Export Patients</span>
        <span className='text-white font-bold text-xl  '>{totalCount ?? 0}</span>
    <RiFileExcel2Line onClick={downloadPatientsAsXlxs}  className='cursor-pointer mx-2 text-white' size={25} />

        </div> 
        <div className='flex gap-5 justify-center items-center text-gray-200 mt-2 mb-4'>  

     <button
  className={`p-1 rounded-sm ${
    page === 1 ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-800'
  }`}
  disabled={page === 1}
>
  <IoMdArrowBack
    className={` ${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    onClick={page === 1 ? undefined : pageBack}
    size={24}
  />
</button>
<p className="text-sm p-1 px-3  bg-blue-700">{page}</p>
<button
  className={`p-1 rounded-sm ${
    page === totalPages ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-800'
  }`}
  disabled={page === totalPages}
>
  <IoMdArrowForward
    // className={`cursor-pointer ${
    //   page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
    // }`}
    className={` ${page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    onClick={page >= totalPages ? undefined : pageUp}
    size={24}
  />
</button>


     </div>
       </div>


       <Card className=" h-[100vh]  w-[98%]  overflow-x-auto border-2 bg-[#FDFEE2] dark:bg-slate-800 border-blue-600 rounded-lg shadow-2xl p-6 dark:text-white">    {loading ? (
      <div className="flex justify-center  items-center h-full">
        <Loader/>
      </div>
    ) : (
      <>
  {patients.length > 0 ? (
    <>
    
  <div className="overflow-x-auto">
  <table className="min-w-full">
    <thead className="bg-blue-600 text-white">
      <tr>
        {TABLE_HEAD.map((head) => (
          <th key={head} className="px-4  py-2 text-left">
            <Typography variant="small" className="font-semibold uppercase">
              {head}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {patients.map((patient, index) => {
        const isLast = index === patients.length - 1;
        const classes = isLast ? "p-2" : "p-1 border-b border-blue-100";

        return (
          <tr
            key={index}
            className="hover:bg-blue-50 transition-colors cursor-pointer dark:hover:text-blue-500"
          >
            <td onClick={() => handleRowClick(patient._id, 'row')} className={classes}>
              {index + 1}
            </td>
            <td onClick={() => handleRowClick(patient._id, 'row')} className={classes}>
              {patient.fullName}
            </td>
            <td onClick={() => handleRowClick(patient._id, 'row')} className={classes}>
              {patient?.email ? patient.email.slice(0, 3) + "..." + patient.email.slice(patient.email.indexOf("@")) : 'N/A'}
            </td>
            <td onClick={() => handleRowClick(patient._id, 'row')} className={classes}>
              {patient?.dateOfBirth || 'N/A'}
            </td>
            <td onClick={() => handleRowClick(patient._id, 'row')} className={classes}>
              {patient?.phoneNumber || 'N/A'}
            </td>
            {role ==='Doctor' && 
            <td className={classes}>
              <Tooltip content="Edit Patient" placement="top">
                <IoMicCircleSharp className="mx-auto" onClick={() => navigate(`/Consultation/${patient._id}`)} size={24} />
              </Tooltip>
            </td>
            }
            <td className={classes}>
              <Tooltip content="Edit Patient" placement="top">
                <MdEditSquare className="mx-auto" onClick={() => handleRowClick(patient._id, 'row')} size={24} />
              </Tooltip>
            </td>
            <td onClick={() => deletePatientHitory(patient._id)} className={classes}>
              <Tooltip content="Delete Patient" placement="top">
                <RiDeleteBin6Fill className="mx-auto" size={24} />
              </Tooltip>
            </td>
            {role ==='Doctor' &&  
            <td onClick={() => navigate('/AimsAssistant')} className={classes}>
              <Tooltip content="Aims Assistant" placement="top">
                <FaRobot className="mx-auto" size={24} />
              </Tooltip>
            </td>}
            <td onClick={() => navigate(`/Share/${patient._id}`)} className={classes}>
              <Tooltip content="Share" placement="top">
                <FaQrcode className="mx-auto" size={24} />
              </Tooltip>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


    </>
  ) : (
    <div className="flex flex-col items-center justify-center p-8 ">
      {/* <NoPatientSvg className="w-64 h-64 " /> */}
      <Typography variant="h5" className="font-bold dark:text-white text-2xl text-center">
        No Patients Yet
      </Typography>
      <Typography variant="body2" className="text-center dark:text-white mt-2">
        Start by adding new patients to see them listed here.
      </Typography>
    </div>
  )}
        </>
      )}
</Card>
    </>

  );
};

export default Patient;
