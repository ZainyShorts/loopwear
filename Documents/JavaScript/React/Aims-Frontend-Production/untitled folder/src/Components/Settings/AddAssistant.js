import React, { useEffect } from 'react'
import { useState } from 'react' 
import AssistantModal from './AssistantModal'   
import axios from 'axios';  
import { useContext } from 'react';
import { Node_API_URL } from '../../client'; 
import { GlobalStateContext } from '../../Context/GlobalStateContext';  
import { RiDeleteBin6Fill } from "react-icons/ri";  
import { FaRegEdit } from "react-icons/fa";
import Loader from '../ui/Loader/Loader'; 
import NewModal from '../ui/NewModal/NewModal';
import { FaCopy } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { CollectionsOutlined } from '@mui/icons-material';
function AddAssistant() { 
  const { userInfo } = useSelector((state)=>state.auth); 
    const [isModalOpen , setisOpen] = useState(false);   
    const {token} = useContext(GlobalStateContext);  
    const [loading , setLoading] = useState(false); 
    const [modalmsg , setModalmsg] = useState({});
    const [AssistantList , setAssistantList] = useState([]); 
    const [DoctorstList , setDoctorstList] = useState([]); 
    const [editingAssistant, setEditingAssistant] = useState(null);  
    const [isModalopen,setIsModalOpen] = useState(false);
    const [type,setType] = useState("")
    const [length,setLength] = useState(0)


    const openModal = async (id) => {
      let databyid =""
      if(type == "addAssistant"){
     databyid =  AssistantList.find(assistant=>assistant._id === id);  
      }else{
        databyid =  DoctorstList.find(doc=>doc._id === id);  
      }
       setEditingAssistant(databyid);    
       setisOpen(true); 
    };
  
    const closeModal = () => {
      setEditingAssistant(null);
      setisOpen(false);
    };
    const handleMessageFromChild = (childMessage) => { 
      setModalmsg({ head:childMessage.head, desc:childMessage.desc})   
      handleSubmit();
      setIsModalOpen(true);  
    };

    const close = () => {  
        setEditingAssistant(null);
        setisOpen(false);
    } 
    const open = (type) => { 
        setisOpen(true);
        setType(type)
    }  
    
    const handleSubmit = async (type) => {     
      // setLoading(true);
        try { 
        const config = { 
          headers: { 
            "Authorization" : `Bearer ${token}`
          } 
        } 
        let route = "";
        if(type == "addAssistant"){
          route = "getAssistants";
        }else{
          route="getDoctors";
        }
        const response = await axios.get(`${Node_API_URL}/api/get/${route}` ,config)  
           console.log(response);
            if (response.data.success) { 
              if(type == "addAssistant"){
             setAssistantList(response.data.assistantsList);
              }else{
                setDoctorstList(response.data.doctorsList);
              }
            }
        } 
        catch (e) { 
        console.log('error', e);
        } 
        finally{ 
          // setLoading(false);
        }
    }   

const deleteAssistant = async (id) => { 
  setLoading(true);
  try {
    let route;
    let query=""
    if(type == 'addAssistant'){
      route = 'deleteAssistant'
      query = "assistantId";
    }else{
      route = 'deleteDoctor'
      query = "doctorId"
    }
    const response = await axios.delete(
      `${Node_API_URL}/api/delete/${route}?${query}=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );   
    if (response.data.success) {  
      setModalmsg({ head:'Assistant Deleted', desc:response.data.msg})  
      setIsModalOpen(true); 
      if(type == 'addAssistant'){ 
      setAssistantList(AssistantList.filter(assistant => assistant._id !== id));
      }else{
        setDoctorstList(DoctorstList.filter(doctor => doctor._id !== id));
      }
    } 
  } catch (error) {
    console.error('Error deleting assistant:', error);
    throw error;
  } 
  finally{ 
    setLoading(false);
  }
};

  useEffect (()=>{   
        handleSubmit('addAssistant'); 
        handleSubmit('addDoctor'); 
    },[]);  

   const addassistant = (data,type) => {  
    if(type == 'addAssistant'){
      setAssistantList(prevList => [
      ...prevList , {username:data.username , password:data.password, access:data.access}])
    }else{
      setDoctorstList(prevList => [
        ...prevList , {username:data.username , password:data.password, access:data.access}])
    }
   } 

   

   const editAssist = (data, id) => { 
    if(type == 'addAssistant'){
    setAssistantList(prevList => 
        prevList.map(assist =>  
            assist._id === id 
                ? { ...assist, username: data.username, password: data.password, access: data.access }  
                : assist 
        )
    ); 
  }else{
    setDoctorstList(prevList => 
      prevList.map(assist =>  
          assist._id === id 
              ? { ...assist, username: data.username, password: data.password, access: data.access }  
              : assist 
      )
  ); 
  }

}; 
const [isConfirmopen , setConfirm ] = useState(false);
const [DeleteID , setID ] = useState(null);
 const confirmDelete = (id) =>  { 
  setModalmsg({head: "Confirm Delete " , desc: "Are you sure  you want to delete this"});
  setConfirm(true);   
  setID(id);
  } 
  const DeleteDone = async () => { 
    setConfirm(false);
   await deleteAssistant(DeleteID);   
   setID(null);
 }


  return (  
    <>   
    {isModalopen && ( 
     <div
     className="fixed inset-0 flex items-center justify-center z-50"
     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
   >
     <NewModal head={modalmsg.head} desc={modalmsg.desc} close={()=>{setIsModalOpen(false)}} />
   </div>
   )}
     {isConfirmopen && ( 
     <div
     className="fixed inset-0 flex items-center justify-center z-50"
     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
   >
     <NewModal head={modalmsg.head} desc={modalmsg.desc} close={()=>{setConfirm(false) ; setID(null)}} confirm={DeleteDone} />
   </div>
   )}
    {isModalOpen && ( 
    <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}   
  >
    
    <AssistantModal type={type}  close={close} length={length} editingAssistant={editingAssistant} Return={handleMessageFromChild} loading={setLoading} addAssist = {addassistant} editAssist = {editAssist}/>
  </div> 
  )}
    <div className='flex text-gray-50 p-8 justify-center  flex-col items-center'>  
    { loading && ( 
    <div
    className="fixed  ml-64 h-[100%] inset-0 flex items-center justify-center z-50"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
  >
    <Loader />
    </div> )}
      {AssistantList.length > 0 ? (  
  <>
    <table className="w-[calc(100vw-370px)] border-collapse">
      <thead>
        <tr className="text-center dark:bg-slate-800">
          <th className="border p-2">Username</th>
          <th className="border p-2">Password</th>
          <th className="border p-2">Access</th>  
          <th className="border p-2">Edit</th>  
          <th className="border p-2">Delete</th> 

        </tr>
      </thead>
      <tbody>
        {AssistantList.map((assistant, index) => (
     <tr className="border-b" key={index}>
     <td className="p-2 text-center">{assistant.username ?? 'N/A' }</td>
     <div className='flex  justify-center items-center'>
     <td className="p-2  text-center ">*********</td>
     <FaCopy  onClick={()=>{navigator.clipboard.writeText(assistant.password??'Error copying text')
    .then(() => {
      alert("Password copied to clipboard!");
    })
    .catch(err => {
      console.error("Error copying password: ", err);
    });}} className='mb-2 cursor-pointer ' size={15} />
     </div>
     <td className="p-2 text-center">{assistant.access ? "YES" : "NO"}</td>
   
     <td className="p-2 text-center flex justify-center">
     <button
              onClick={() =>{ setType('addAssistant'); openModal(assistant._id)}}
              className="bg-blue-500 text-white px-4 py-1 cursor-pointer flex items-center gap-2 rounded-md"
            >
         Edit <FaRegEdit size={14} />
       </button> 
     </td>
    
     <td className="p-2 ">
  <button onClick={()=>{setType('addAssistant'); confirmDelete(assistant._id)}} className="bg-red-500 mx-auto text-white px-4 py-1 cursor-pointer flex items-center gap-2 rounded-md">
    Delete <RiDeleteBin6Fill size={15} />
  </button>
</td>

   </tr>
   
    
      
        ))}
      </tbody>
    </table>
  </>
) : (   
  loading ? ( 
    <div
    className="fixed  ml-64 inset-0 flex items-center justify-center z-50"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
  >
    <Loader />
    </div> ) : null

)

}
<div
             className='rounded-lg mt-6 relative w-[205px] min-h-10 cursor-pointer flex items-center border border-blue-500 bg-blue-500 group hover:bg-blue-500 active:bg-blue-500 active:border-blue-500 
                ' 
                onClick={()=>{setLength(AssistantList.length); open('addAssistant')}}
              
          >
            <span className="text-gray-200 font-semibold ml-8 transform hover:hidden transition-all duration-300">
              Add Assistant
            </span>
            <span className="absolute right-0 h-full w-14 rounded-lg bg-blue-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
              <svg
                className="svg w-8 text-white"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
          </div>  
        
<br/>
{/* //fakee */}
<h1 className='text-3xl font-bold mb-3'> Add Doctor </h1>  
      {DoctorstList.length > 0 ? (  
  <>
    <table className="w-[calc(100vw-370px)] border-collapse">
      <thead>
        <tr className="text-center dark:bg-slate-800">
          <th className="border p-2">Username</th>
          <th className="border p-2">Password</th>
          <th className="border p-2">Access</th>  
          <th className="border p-2">Edit</th>  
          <th className="border p-2">Delete</th> 

        </tr>
      </thead>
      <tbody>
        {DoctorstList.map((doc, index) => (
     <tr className="border-b" key={index}>
     <td className="p-2 text-center">{doc.username ?? 'N/A' }</td>
     <div className='flex  justify-center items-center'>
     <td className="p-2  text-center ">*********</td>
     <FaCopy  onClick={()=>{navigator.clipboard.writeText(doc.password??'Error copying text')
    .then(() => {
      alert("Password copied to clipboard!");
    })
    .catch(err => {
      console.error("Error copying password: ", err);
    });}} className='mb-2 cursor-pointer ' size={15} />
     </div>
     <td className="p-2 text-center">{doc.access ? "YES" : "NO"}</td>
   
     <td className="p-2 text-center flex justify-center">
     <button
              onClick={() =>{ setType('addDoctor'); openModal(doc._id)}}
              className="bg-blue-500 text-white px-4 py-1 cursor-pointer flex items-center gap-2 rounded-md"
            >
         Edit <FaRegEdit size={14} />
       </button> 
     </td>
    
     <td className="p-2 ">
  <button onClick={()=>{setType('addDoctor'); confirmDelete(doc._id)}} className="bg-red-500 mx-auto text-white px-4 py-1 cursor-pointer flex items-center gap-2 rounded-md">
    Delete <RiDeleteBin6Fill size={15} />
  </button>
</td>

   </tr>
   
    
      
        ))}
      </tbody>
    </table>
  </>
) : (   
  loading ? ( 
    <div
    className="fixed  ml-64 inset-0 flex items-center justify-center z-50"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
  >
    <Loader />
    </div> ) : null

)

}

<div
             className='rounded-lg mt-6 relative w-[205px] min-h-10 cursor-pointer flex items-center border border-blue-500 bg-blue-500 group hover:bg-blue-500 active:bg-blue-500 active:border-blue-500 
                ' 
                onClick={()=>{setLength(DoctorstList.length); open('addDoctor')}}
              
          >
            <span className="text-gray-200 text-center font-semibold ml-8 transform hover:hidden transition-all duration-300">
              Add Doctor
            </span>
            <span className="absolute right-0 h-full w-14 rounded-lg bg-blue-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
              <svg
                className="svg w-8 text-white"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
          </div>  
        

     

    </div> 
    </>
  )
}

export default AddAssistant
