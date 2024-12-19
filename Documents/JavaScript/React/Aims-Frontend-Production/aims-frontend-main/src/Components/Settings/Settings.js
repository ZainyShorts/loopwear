import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Node_API_URL } from "../../client";
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import { getUserInfo, logout, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";  
import Button from '../ui/Button/Button';
import SignatureCanvas from 'react-signature-canvas';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";   
import NewModal from '../ui/NewModal/NewModal'; 
import AddAssistant from './AddAssistant';  
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordian/Accordian.js'

// import Loader from './Loader'; 
import Loader from '../ui/Loader/Loader'
const SettingsPage = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [editedProfile, setEditedProfile] = useState(userInfo);
  const [profilePicture, setProfilePicture] = useState(null); 
  const [isModalopen , setIsModalOpen] = useState(false); 
  const [modalmsg , setModalmsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {token,checker,setUser, showToast,role} = useContext(GlobalStateContext)
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const {darkMode} = useContext(GlobalStateContext)
  const [updatePassword,setUpdatePassword] = useState("") 
  const [ConfirmPassword, setConfirmPassword] = useState("") 
  const [wrongPass , setWrongPass] = useState("");
  const [showPassIcon,setShowPassIcon] = useState(false)
  const [signedUrl,setSignedUrl] = useState({
    'profile_picture':"",
    'clinic_logo':"",
    'signature':""
  })
  const [fileName,setFileName] = useState({
    'profile_picture':"",
    'clinic_logo':"",
    'signature':""
  })

 

const updateProfiePicture=async(url,file,folder)=> 
  {
  setIsLoading(true);
  try{
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
      }
        
        const res = await putObject(url,file)
        if(res)
        {
        const data = {img:fileName[folder],folder}
        try{
          const saveDBImg = await axios.post(`${Node_API_URL}/api/post/updateProfiePicture`,data,config)
          if(saveDBImg.data.response == true)
          {
            setSignedUrl((prevProfile) => ({
              ...prevProfile,
              [folder]: '',
            }));
            setFileName((prevProfile) => ({
              ...prevProfile,
              [folder]: '',
            }));
            
            dispatch(getUserInfo())
            setModalmsg({ head:'Profile Updated', desc:'Clinic Profile Updated Successfully'})  
            setIsModalOpen(true);
          }else{
            showToast(saveDBImg.data.msg)
            return;
          }
        }catch(e){
          showToast('Failed to upload signature', { type: 'error' });

          return;
        }
      }
  }
  catch(e)
  {
    showToast('Failed to upload signature', { type: 'error' });

  } 
  finally{ 
    setIsLoading(false);
  }
}

  useEffect(() => {
   
    checker().then((res)=>{
      if(res==false)
      {
        setUser(false)
        dispatch(logout())
      navigate('/')
      }else{
        setEditedProfile(userInfo);

      }
    })
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const getSignedUrl = async (fileName,contentType,folder) =>{

    try{
      const result = await axios.get(`${Node_API_URL}/api/get/getSignedUrlForUpload?fileName=${fileName}&contentType=${contentType}&folder=${folder}`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(result.data.response)
      {
        setSignedUrl((prevProfile) => ({
          ...prevProfile,
          [folder]: result.data.url,
        }));
        setFileName((prevProfile) => ({
          ...prevProfile,
          [folder]: fileName,
        }));
        return true
      }else{
        alert("Can't changed right now.")
        return false 
      }
    }catch(e)
    {
      alert("Can't changed right now.")
      return false 
    }
  }

  const putObject = async(signedUrl,file)=>{
    try {
      const response = await axios.put(signedUrl, file, {
          headers: {
              'Content-Type': file.type  // Set only the content type
          }
      });
      console.log(response)
      if(response.status == 200){
        return true
      }else{
        return false
      }
  } catch (error) {
    setSignedUrl({
      'profile_picture':"",
      'clinic_logo':"",
      'signature':""
    })
    setFileName({
      'profile_picture':"",
      'clinic_logo':"",
      'signature':""
    })
    
    alert('Session expire upload again')

    console.error("Upload error:", error.response || error.message);
    return false
  }
  }

  const deleteObject = async(key,bucket,name)=>{
    try{
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
      }
      const result = await axios.delete(`${Node_API_URL}/api/delete/deleteObject?key=${key}&bucket=${bucket}&name=${name}`,config)
      if(result.data.response)
      {
        return true
      }else{
        alert("Can't changed right now.")
        return false
      }
    }catch(e)
    {
      alert("Can't changed right now.")
      return false 
    }
  }

  const handleInputChangeForProilePic = (e,folder) => {
    const file = e.target.files[0]; 
    console.log(e.target);
    if (file) {
      const FileName = file.name + Date.now()
      const res = getSignedUrl(FileName,file.type,folder)
      if(res === false) return;
      const { name } = e.target;
      setEditedProfile((prevProfile) => ({
        ...prevProfile,
        [name]: file,
      }));

    }
  };
 
 
  async function delImg(name,key)
   {
    const res = await deleteObject(key,'public',name)
    if(res)
    {
      setEditedProfile((prevProfile) => ({
        ...prevProfile,
        [name]: "",
      }));
    }  
    

}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('data', JSON.stringify(editedProfile));
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    const userData = {
      _id:editedProfile._id,
      first_name:editedProfile.first_name,
      last_name:editedProfile.last_name,
      email:editedProfile.email,
      phone_number:editedProfile.phone_number,
      Address:editedProfile.Address,
      title:editedProfile.title,
      speciality:editedProfile.speciality,
      profile_picture:editedProfile.profile_picture,
      clinicName:editedProfile.clinicName,
      clinicName_logo:editedProfile.clinicName_logo
}
   
    try {
      const response = await axios.post(`${Node_API_URL}/api/post/updateProfile`, userData, {
        headers: {
          "Authorization": `Bearer ${token}`

        },
      });
      if (response.status === 200) {
        dispatch(getUserInfo())  
        setModalmsg({ head:'Profile Updated', desc:'Clinic Profile Updated Successfully'})  
        setIsModalOpen(true);
       } else {
        showToast('Failed to Update Profile', { type: 'error' });

      }
    } catch (error) {
       showToast('An error occurred while updating the profile. Please try again later.', {type: 'error'});
    } finally {
      setIsLoading(false); 
    }
  };

  const updatEmailredentials = async (e)=>{
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      businessMail:editedProfile.businessMail,
      appCode:editedProfile.appCode
}
   
    try {
      const response = await axios.post(`${Node_API_URL}/api/post/updatEmailredentials`, userData, {
        headers: {
          "Authorization": `Bearer ${token}`

        },
      });
      if (response.status === 200) {
        dispatch(getUserInfo())
        setModalmsg({ head:'Profile Updated', desc:'Clinic Profile Updated Successfully'})  
        setIsModalOpen(true);
      } else {
        setModalmsg({ head:'An Error occured', desc:'An error occurred while updating the profile'})  
        setIsModalOpen(true);
      }
    } catch (error) {
       showToast('An error occurred while updating the profile. Please try again later.',{type: 'error'}) ;
    } finally {
      setIsLoading(false);
    }

  } 
  
  const updatePasswordMethod = async (e) => {
    e.preventDefault();
    setWrongPass("");
    if (updatePassword === "") {
        return; 
    }  
    else if (updatePassword != ConfirmPassword) {
      setWrongPass("Password is not Matching") 
    }
    else if (updatePassword === ConfirmPassword) {
        setIsLoading(true);
        
        const userData = {
            updatePasswordState: updatePassword,
        };

        try {
            const response = await axios.post(`${Node_API_URL}/api/post/updatePassword`, userData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setModalmsg({ head:'Password Updated', desc:'Clinic Profile Password Updated Successfully'})  
                setIsModalOpen(true);
                setUpdatePassword("");  
                setConfirmPassword(""); 
            } else {
                setModalmsg({ head:'Failed', desc:'Failed to update clinic password. Please try again.'})  
                setIsModalOpen(true);
                
            }
        } catch (error) {
            showToast('An error occurred while updating the profile. Please try again later.', { type: 'error' });
        } finally {
            setIsLoading(false);
        }
    } else {
        showToast('Passwords do not match. Please try again.', { type: 'error' });
    }
};

  const updatewebsiteURL = async (e)=>{
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      website:editedProfile.website,
      
}
   
    try {
      const response = await axios.post(`${Node_API_URL}/api/post/updatewebsiteURL`, userData, {
        headers: {
          "Authorization": `Bearer ${token}`

        },
      });
      if (response.status === 200) {
        dispatch(getUserInfo())  
        setModalmsg({ head:'Profile Updated', desc:'Clinic Profile Updated Successfully'})  
                setIsModalOpen(true);
      } else {
        setModalmsg({ head:'An Error occured', desc:'An error occurred while updating the profile'})  
        setIsModalOpen(true);
      }
    } catch (error) {
      showToast('An error occurred while updating the profile. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  } 
  useEffect(() => {
    if (isModalopen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isModalopen]); 
  const [Delete , setDelete] = useState({profile : (false) , signature : (false) , clinic : (false)})
  const confirmDelete = (ch) => {  
    setModalmsg({head:"Confirm Delete ", desc : "Are you sure you want to delete this?"})
    setConfirm(true); 
    if (ch === 'P') { 
      setDelete({profile:(true)})
    } 
    if (ch === 'S') { 
      setDelete({signature:(true)})
    } 
    if (ch === 'C') { 
      setDelete({clinic:(true)})
    }
  }  
  const DeleteDone = async () => {   
     if (Delete.profile===true) {
    await delImg('profile_picture',editedProfile.profile_picture)  
    setConfirm(false);
  }   
  if (Delete.signature===true) {
   await delImg("signature",editedProfile.signature)
    setConfirm(false);
  }   
  if (Delete.clinic===true) {
   await delImg("clinic_logo",editedProfile.clinic_logo)
    setConfirm(false);
  }    
  setDelete({profile : (false) , signature : (false) , clinic : (false)})
  
 }
  const [isConfirmopen , setConfirm ] = useState(false);
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

 {isLoading && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
  >
    <Loader />
  </div>
)} 
  {isConfirmopen && ( 
     <div
     className="fixed inset-0 flex items-center justify-center z-50"
     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
   >
     <NewModal head={modalmsg.head} desc={modalmsg.desc} close={()=>{setConfirm(false)}} confirm={DeleteDone} />
   </div>
   )}



    <div className="relative p-3 grid grid-cols-1  bg-white  rounded-lg gap-3  dark:bg-slate-900">  
     
    <div className='border-[1px] w-[95%] justify-self-center pr-1 border-gray-400 dark:bg-slate-800 p-0 bg-white flex items-center xl:items-center  rounded-lg '> 
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>  
        
      <h1 className="text-2xl font-bold text-gray-800 mb-1 p-2 dark:text-white">Edit Profile</h1> 
      </AccordionTrigger>           
             
          <AccordionContent>
      <form >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
          <div className="flex flex-col">
            <label htmlFor="first_name" className="text-lg font-semibold text-gray-800 dark:text-white">First Name:</label>
            <input type="text" id="first_name" name="first_name" value={editedProfile.first_name} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last_name" className="text-lg font-semibold text-gray-800 dark:text-white">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value={editedProfile.last_name} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold text-gray-800 dark:text-white">Email:</label>
            <input type="email" id="email" name="email" value={editedProfile.email} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone_number" className="text-lg font-semibold text-gray-800 dark:text-white">Phone Number:</label>
            <input type="tel" id="phone_number" name="phone_number" value={editedProfile.phone_number} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          {/*  Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-semibold text-gray-800 dark:text-white">Title:</label>
            <input type="text" id="title" name="title" value={editedProfile.title} onChange={handleInputChange} className= "bg-gray100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          {/* Speciality */}
          <div className="flex flex-col">
            <label htmlFor="speciality" className="text-lg font-semibold text-gray-800 dark:text-white">Speciality:</label>
            <input type="text" id="speciality" name="speciality" value={editedProfile.speciality} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          {/* Address and Profile Picture */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-lg font-semibold text-gray-800 dark:text-white">Address:</label>
            <input type="text" id="Address" name="Address" value={editedProfile.Address} onChange={handleInputChange} className="bg-gray-100  dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="clinicName" className="text-lg font-semibold text-gray-800 dark:text-white">Clinic Name:</label>
            <input type="text" id="clinicName" name="clinicName" value={editedProfile.clinicName} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          

        
        </div> 
       

        {/* <button
          className="bg-blue-500 text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          onClick={(e)=>handleSubmit(e)}
        >
        </button> */}  
        <div className='flex mt-4 justify-center items-center '>
        <Button className='' text="save" onclick={handleSubmit}/> 
        </div>
      </form>  
      </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      {/* Email Settings  */}
      <div className='border-[1px] w-[95%] justify-self-center pr-1 dark:bg-slate-800 p-0 bg-white flex items-center xl:items-center  rounded-lg '> 
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>   
      <h1 className="text-2xl font-bold text-gray-800 mb-1 p-2 dark:text-white">Email Settings</h1> 
      </AccordionTrigger>           
      <AccordionContent>
      <h1 className="text-xl font-bold text-gray-800 mb-2 p-2 dark:text-white">Clinic Email</h1>
      <form >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
          <div className="flex flex-col">
            <label htmlFor="businessMail" className="text-lg font-semibold text-gray-800 dark:text-white">Email:</label>
            <input type="text" id="businessMail" name="businessMail" value={editedProfile.businessMail} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="appcode" className="text-lg font-semibold text-gray-800 dark:text-white">App Code:</label>
            <input type="text" id="appCode" name="appCode" value={editedProfile.appCode} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {/* <button
          // type="submit"
          className="bg-blue-500 text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          onClick={(e)=>updatEmailredentials(e)}
        >
          {isLoading ? 'Updating...' : 'Save'} 
        </button> */}   
        <div className='flex justify-center items-center mt-4 '>
         <Button  text="save" onclick={(e)=>updatEmailredentials(e)}/> 
        </div>

      </form> 
      </AccordionContent>
        </AccordionItem>
      </Accordion> 
      </div> 
      <div className='border-[1px] w-[95%] justify-self-center pr-1 border-gray-400 dark:bg-slate-800 p-0 bg-white flex items-center xl:items-center  rounded-lg '> 

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger> 
      <h1 className="text-2xl font-bold text-gray-800 mb-1 p-2 dark:text-white">Clinic Profile <span className='text-xl'>(Site)</span> </h1> 
      </AccordionTrigger>           
      <AccordionContent>
      <form >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col p-4">
            <label htmlFor="website" className="text-lg font-semibold text-gray-800 dark:text-white">Website URL:</label>
            <input type="text" id="website" name="website" value={editedProfile.website} onChange={handleInputChange} className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {/* <button
          // type="submit"
          className="bg-blue-500 text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          onClick={(e)=>updatewebsiteURL(e)}
        >
          {isLoading ? 'Updating...' : 'Save'}
        </button> */}  
        <div className='flex mt-4 justify-center items-center '>
                 <Button text="save" onclick={(e)=>updatewebsiteURL(e)}/>
        </div>

      </form> 
      </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    {/* Password Settings  */}
    <div className='border-[1px] w-[95%] justify-self-center pr-1 border-gray-400 dark:bg-slate-800 p-0 bg-white flex items-center xl:items-center  rounded-lg '> 
      <form className='flex items-center w-full' >
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger> 

      <h1 className="text-2xl font-bold p-2  text-gray-800 dark:text-white">Change Password</h1> 
      </AccordionTrigger>           
      <AccordionContent>
         
          <div className='grid grid-cols-2  items-center  p-4 gap-4'  > 
        <div>
   <h2 className='text-lg text-gray-200 text-nowrap font-bold mb-2 lg:ml-2 '> New Password </h2> 
   <div className='flex w-full   '>
        <input 
            type={showPassIcon ? "text" : "password"} 
            id="updatePassword" 
            name="updatePassword" 
            value={updatePassword} 
            onChange={(e) => setUpdatePassword(e.target.value)} 
            className="bg-gray-100 dark:bg-gray-400 rounded-lg px-4 lg:ml-2  w-full py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        {showPassIcon ?  
            <FaRegEye className='ml-2 cursor-pointer justify-self-center mt-2 lg:mt-0' onClick={() => setShowPassIcon(false)} color='white' size={30}/>  
            : 
            <FaRegEyeSlash className='ml-2 cursor-pointer justify-self-center mt-2 lg:mt-0' onClick={() => setShowPassIcon(true)} color='white' size={30} />
        } 
        </div>
        </div> 
        <div>
    <h2 className='text-lg text-gray-200 text-nowrap font-bold mb-2 lg:ml-2'> Confirm Password </h2>
        <div className='flex  w-full'>
        <input 
            type={showPassIcon ? "text" : "password"} 
            id="ConfirmPassword" 
            name="ConfirmPassword" 
            value={ConfirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="bg-gray-100 dark:bg-gray-400 w-full rounded-lg lg:ml-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        {showPassIcon ?  
            <FaRegEye className='ml-2 cursor-pointer  justify-self-center mt-2 lg:mt-0' onClick={() => setShowPassIcon(false) } color='white' size={30}/>  
            : 
            <FaRegEyeSlash className='ml-2 cursor-pointer  justify-self-center mt-2 lg:mt-0' onClick={() => setShowPassIcon(true)} color='white ' size={30} />
        } 
        </div>
    </div>   
    {wrongPass!="" && ( <p className='mt-2 ml-2 text-red-500'>{wrongPass}</p>)}
    </div>
   

            

         <div className='flex mt-2 justify-center items-center '>
        <Button text="save" onclick={(e)=>updatePasswordMethod(e)}/>
        </div>
      
 
        </AccordionContent>
        </AccordionItem>
      </Accordion>
      </form>
      
    </div>  
             

    {
      role === 'Doctor'  &&    
      <div className='border-[1px] w-[95%] justify-self-center pr-1 border-gray-400 dark:bg-slate-800 p-0 bg-white flex items-center xl:items-center  rounded-lg '> 
    <Accordion type="single" collapsible className="w-full"> 
    <div className='dark:bg-slate-800  '>
        <AccordionItem value="item-1">
          <AccordionTrigger>  
        <div className='font-bold text-2xl p-2'> Add Assistant </div>
      </AccordionTrigger>           
      <AccordionContent> 
     <div className=' md:w-[calc(100vw-295px)] flex justify-center '>
      <AddAssistant/>  
      </div>  
      </AccordionContent>
        </AccordionItem> 
        </div>
      </Accordion> 
      </div>
    }  
    <div className='border-[1px] w-[95%] justify-self-center pr-1  border-gray-400 dark:bg-slate-800 p-0 bg-white flex items-center xl:items-center  rounded-lg '> 
    <Accordion type="single" collapsible className="w-full"> 
      <div className='dark:bg-slate-800  '> 
        <AccordionItem value="item-1">
          <AccordionTrigger> 
       <div className=' text-2xl font-bold  p-2'> Clinic Information </div> 
       </AccordionTrigger>           
       <AccordionContent> 
      <div className=" flex flex-col dark:bg-slate-800 lg:flex-row  sm:items-center lg:items-start justify-around">
          {/* profile pic  */}
          <div className="flex flex-col items-center  mb-2 ">
          <div className='flex items-center'>
        <label htmlFor="clinicName" className="text-lg font-semibold text-gray-800 dark:text-white">Profile Picture: </label>
       {editedProfile.profile_picture &&  <MdDeleteForever onClick={()=>confirmDelete('P')}  size={25} className='ml-3 text-red-500 cursor-pointer' />}
            </div>
        
        { !editedProfile.profile_picture &&  
         <label class="custum-file-upload" for="file">
              <div class="icon mt-2 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
              </div>
              <div class="text">
                <span>Upload Profile Picture</span>
                </div>
                <input name="profile_picture" value={editedProfile.profile_picture} onChange={(e)=>handleInputChangeForProilePic(e,'profile_picture')} type="file" id="file"/>
          </label>}
          
           


              {editedProfile.profile_picture && typeof editedProfile.profile_picture === 'string' && editedProfile.profile_picture.includes("https") && (
                <img src={editedProfile.profile_picture} className='mt-2 w-80 h-80 rounded-md  lg:w-[300px] lg:h-[199px]' />
              )}

              {editedProfile.profile_picture && typeof editedProfile.profile_picture !== 'string' && (
                <img src={URL.createObjectURL(editedProfile.profile_picture)} className='mt-2 w-80 h-80 rounded-md  lg:w-[300px] lg:h-[199px]' />
              )}
          

          {signedUrl.profile_picture != '' && 
          <div className='mt-4'> 
          <Button text="Update Profile Pic" onclick={()=>updateProfiePicture(signedUrl.profile_picture,editedProfile.profile_picture,'profile_picture')} />  
          </div>
}
 


          
            

           
          </div>
          {/* signature */}
          <div className="flex flex-col items-center  mb-2 ">
          <div className='flex items-center'>
        <label htmlFor="clinicsign" className="text-lg font-semibold text-gray-800 dark:text-white">Signature: </label>
       {editedProfile.signature &&  <MdDeleteForever   
       onClick={()=>confirmDelete('S')} 
         size={25} className='ml-3 text-red-500 cursor-pointer' />}
            </div>
        
        { !editedProfile.signature &&  
         <label class="custum-file-upload" for="file">
              <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
              </div>
              <div class="text">
                <span>Upload Signature</span>
                </div>
                <input 
  onChange={(e) => handleInputChangeForProilePic(e, 'signature')} 
  name="signature" 
  value={editedProfile.signature} 
  type="file" 
  id="file" 
  accept="image/png"
/>

          </label>}
          
           


              {editedProfile.signature && typeof editedProfile.signature === 'string' && editedProfile.signature.includes("https") && (
                <img src={editedProfile.signature} className='mt-2 w-80 h-80  lg:w-[300px] rounded-md lg:h-[199px]' />
              )}

              {editedProfile.signature && typeof editedProfile.signature !== 'string' && (
                <img src={URL.createObjectURL(editedProfile.signature)} className='mt-2 w-80 h-80 rounded-md lg:w-[300px] lg:h-[199px] ' />
              )}
          

          {signedUrl.signature != '' &&     
           
          <div className='mt-4'> 
          <Button text="Update Signature"  onclick={()=>updateProfiePicture(signedUrl.signature,editedProfile.signature,'signature')} />  
          </div>
          
          }



          
            

           
          </div>
          {/* clinicName_logo */}
          <div className="flex flex-col items-center  mb-4 ">
            <div className='flex items-center '>
          <label htmlFor="ClinicLogo" className="text-lg font-semibold text-gray-800 dark:text-white">Clinic logo: </label>
          {editedProfile.clinic_logo &&  <MdDeleteForever 
          onClick={()=>confirmDelete('C')}
           size={25} className='ml-3 text-red-500 cursor-pointer' />}
            </div>
          
          { !editedProfile.clinic_logo &&  
          <label class="custum-file-upload" for="file">
                <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                </div>
                <div class="text">
                  <span>Upload Clinic Logo</span>
                  </div>
                  <input name="clinic_logo" value={editedProfile.clinic_logo} onChange={(e)=>{handleInputChangeForProilePic(e,'clinic_logo')}} type="file" id="file"/>
            </label>}
            
            {editedProfile.clinic_logo && typeof editedProfile.clinic_logo === 'string' && editedProfile.clinic_logo.includes("https") && (
                <img src={editedProfile.clinic_logo} className='mt-2 w-80 h-80  lg:w-[300px] rounded-md lg:h-[199px]' />
              )}

              {editedProfile.clinic_logo && typeof editedProfile.clinic_logo !== 'string' && (
                <img src={URL.createObjectURL(editedProfile.clinic_logo)} className='mt-2 w-80 h-80 rounded-md  lg:w-[300px] lg:h-[199px]' />
              )}
          

          {signedUrl.clinic_logo != '' && 
            <div className='mt-4'> 
          <Button text="Update Clinic Logo" onclick={()=>updateProfiePicture(signedUrl.clinic_logo,editedProfile.clinic_logo,'clinic_logo')} />  
          </div>
            
            }

            
              

            
          </div>

      </div> 
      </AccordionContent>
        </AccordionItem> 
        </div>
      </Accordion> 
      </div>
    </div> 
     

      




    
    

    <style>
      {
        `
        .custum-file-upload {
          height: 200px;
          width: 300px;
          display: flex;
          flex-direction: column;
          align-items: space-between;
          gap: 20px;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          border: 2px dashed #cacaca;
          background-color: rgba(255, 255, 255, 1);
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0px 48px 35px -48px rgba(0,0,0,0.1);
        }
        
        .custum-file-upload .icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .custum-file-upload .icon svg {
          height: 80px;
          fill: rgba(75, 85, 99, 1);
        }
        
        .custum-file-upload .text {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .custum-file-upload .text span {
          font-weight: 400;
          color: rgba(75, 85, 99, 1);
        }
        
        .custum-file-upload input {
          display: none;
        }
        `
      }
    </style>
    </>
  );
};

export default SettingsPage;
