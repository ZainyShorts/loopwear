import React, { useEffect } from 'react'
import { useState } from 'react' 
import axios from 'axios';  
import { useContext } from 'react';
import { Node_API_URL } from '../../client'; 
import { GlobalStateContext } from '../../Context/GlobalStateContext'; 
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";  


function AssistantModal({close , length , editingAssistant , Return , loading , addAssist , editAssist,type} ) {   
    const {token , userTimezone } = useContext(GlobalStateContext);
    const [data , setData] = useState({ 
        username:"", 
        password:"", 
        access:false
    }) 
    const handleData = (e) => {  
        const {value,name} = e.target;
      setData(prevData => ( {
       ...prevData, 
       [name]: value
      }));
    }; 
    const handleSubmit = async () => {       
        // console.log(data.access);   
        close(); 
        loading(true);

        const Data = { 
            username: data.username, 
            password: data.password, 
            access: data.access,
            total : length,
        }
        try { 
        const config = { 
          headers: { 
            "Authorization" : `Bearer ${token}`
          } 
        } 
        const data = await axios.post(`${Node_API_URL}/api/post/${type}`, Data ,config)   
        // console.log(data);
            if (data.data.response)  {  
              
              addAssist({ username: Data.username, 
                password: Data.password, 
                access: Data.access})
                
                setData({username:'', password:'',access:false })  
                  if(type == 'addAssistant'){
                    Return({head:'Assistant Added' , desc: data.data.msg}); 
                  }else{
                    Return({head:'Doctor Added' , desc: data.data.msg});
                }
            }else{
              Return({head:'Limit' , desc: data.data.msg}); 
            } 
            
        } 
        catch (e){ 
       console.log('Big error', e); 
       Return({head:'Error Alert' , desc: 'There is some Error Adding Assistant'}); 
        } 
      finally{ 
        loading(false);
      }
    }   
    const [passShow , setPassShow] = useState(false);
    
    const UpdateAssistant = async (assistantId) => {   
         close(); 
         loading(true);
        const Data = { 
            username : data.username, 
            password : data.password, 
            access: data.access, 
            assistantId,
            userTimezone, 
        } 
         try { 
            const config = { 
                headers: { 
                  "Authorization" : `Bearer ${token}`
                } 
              }
              let route = ""
              if(type == 'addAssistant'){
                route = "updateAssistant"
              }else{
                route = "updateDoctor"
              }
                const res = await axios.post(`${Node_API_URL}/api/post/${route}`, Data  , config)  
              
              if (res.data.response)  { 
                setData({username:'', password:'',access:false}) 
                Return({head:'Assistant Edited' , desc: res.data.msg}); 
                editAssist({username: data.username, 
                  password: data.password, 
                  access: data.access},assistantId)
              }
          } 
          catch (e){ 
         console.log('Error Editing Assistant', e);
          }  
          finally{ 
            loading(false);
          }
        }
    useEffect(()=>{ 
    if (editingAssistant != null) { 
    setData({username:editingAssistant.username, password:editingAssistant.password,access:editingAssistant.access})
    } 
    },[])

  return (
   <> 
<div className="mt-4 fade-in-animation flex flex-col w-[85%] sm:w-[70%] lg:w-[40%] dark:bg-slate-900 rounded-lg p-4 shadow-sm">

    <div className="mt-4">
        <label className="text-white" for="username">Username:</label>
        <input name='username' placeholder="Enter Name" value={data.username} onChange={(e)=>{handleData(e)}} className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1" type="text"></input>
    </div> 
    <div className="mt-4">
        <label className="text-white flex gap-2 " for="password">Password:  
            {passShow ? (
            <FaEye className='cursor-pointer' onClick={()=>{setPassShow(false)}} size={20}/>           
            ): ( 
               <FaEyeSlash className='cursor-pointer' onClick={()=>{setPassShow(true)}} size={20}/>  
            )
        }
        </label>
        <input name='password' placeholder="Enter password" value={data.password} onChange={(e)=>{handleData(e)}}   className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-2 py-1" type={passShow ?`text`: `password`}></input>
    </div>
    <div className='text-white mt-6 flex gap-3 ml-2' >
      <label htmlFor="choice">Access:</label>
      <select id="choice" name="access" value={data.access}  onChange={(e)=>{handleData(e)}}  
       className='dark:bg-slate-800 w-[75px] rounded-sm p-1' >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    </div> 
    <div className='flex justify-end gap-4'>
    <div className="mt-4 ">
        <button onClick={close} className="dark:bg-blue-600 hover:dark:bg-blue-800 text-white rounded-md px-8 py-2   transition-all duration-200" type="submit">Close </button>
    </div>
    <div className="mt-4 "> 
        {editingAssistant != null ? ( 
        <button onClick={()=>UpdateAssistant(editingAssistant._id)} className="dark:bg-blue-600 hover:dark:bg-blue-800 text-white rounded-md px-8 py-2   transition-all duration-200" type="submit">Edit </button>
        ):( 
        <button onClick={handleSubmit} className="dark:bg-blue-600 hover:dark:bg-blue-800 text-white rounded-md px-8 py-2   transition-all duration-200" type="submit">Add </button>
        )}
    </div> 
    </div>
</div>
   </>
  )
}

export default AssistantModal
