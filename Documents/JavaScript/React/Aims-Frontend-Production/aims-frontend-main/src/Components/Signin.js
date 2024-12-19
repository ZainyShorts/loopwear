/*eslint-disable*/
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './loading.js';
import { Alert } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, getUserInfo } from '../features/auth/authSlice';
import { toast } from "react-toastify";
import axios from 'axios';
import { LOGIN_URL } from '../client.js';
import { GlobalStateContext } from '../Context/GlobalStateContext.js';
import { IoMdArrowRoundBack } from "react-icons/io";
import { isMobile } from 'react-device-detect';
import NewModal from './ui/NewModal/NewModal.js';
const Signin = () => {
  // State variables

  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [openModal , setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData
  const { setUser , setToken , setRole } = useContext(GlobalStateContext)
  // Redux state
  const { userInfo } = useSelector((state) => state.auth);
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Initialize state with "doctor" as the default selected role
  const [selectedRole, setSelectedRole] = useState("doctor");

  // Handle change when checkbox is clicked
  const handleCheckboxChange = (role) => {
    setSelectedRole(role);
  };

  // Redux dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
 const [Modalmsg , setModalmsg] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    const userData = {
      email: formData.email,
      password: formData.password,
      selectedRole
    };

    const config = {
      headers: {
          "Content-type": "application/json",
      }
  }
  try{

    const res = await axios.post(LOGIN_URL, userData, config)
    console.log(res)
    if (res.data.response === true) {
      dispatch(reset())
      localStorage.setItem("token", JSON.stringify(res.data.token.access))

      setToken(res.data.token.access)
      dispatch(getUserInfo())
      setUser(true)
      setAlert(false)
      if(res.data.role === 'Doctor'){
        localStorage.removeItem('assistantToken')
        setRole('Doctor')
      }else{
        localStorage.setItem("assistantToken", JSON.stringify(res.data.assistantToken.access))
        setRole('Assitant')
      }
      // toast.success('Welccome to AIMS')
      navigate('/TodayPatients')
    }else{
      // setAlert(true)
      setModalmsg({head:'Error', desc : res.data.msg }) 
      setModalOpen(true);
    }
    
  }catch(e){
      toast.error("Network Error")
  }finally{
    setLoading(false)
    setTimeout(()=>setAlert(false),2000)

  }

  };

  useEffect(() => {

  }, [isSuccess, isError, user, userInfo]);

  const close = () => { 
     setModalOpen(false);
  }


  return (
    <>
    {loading ? (
      <Loading />
      // <Spinner />
    ):(
     
    <>
    
    {alert? (<div className='flex-col'><Alert color="red">Invalid Credentials.</Alert>
      </div>) : null}
     
{openModal && (
  <div className="modal fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"> 
    <style>
    {`
      .modal {
        background-color: rgba(0, 0, 0, 0.7); 
      }
    `}
  </style>
    <NewModal head={Modalmsg.head} desc={Modalmsg.desc} close={close} />
  
</div>

)}

<div class="  min-h-screen py-40 bg-gradient-to-t  from-indigo-200 dark:from-slate-800 dark:to-slate-900 " >
      <div class="  mx-auto">
        <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
         {!isMobile && <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-image-login-form " >
            <h1 class="text-white text-3xl mb-3">Welcome to Aims</h1>
            <div className="w-full sm:w-96 md:w-[800px] lg:w-[500px] max-w-full rounded-xl">
                 <iframe className="w-full h-56 sm:h-72 md:h-96 lg-h-80 rounded-xl" src="https://www.youtube-nocookie.com/embed/HoHt4dS1V5U?si=aEKOGW9QeiwbLru6&controls=0&rel=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

          </div>}
          <div class="w-full !h-[500px] lg:w-1/2 py-16 px-12">
          <Link to={'/'} className='flex items-center cursor-pointer'>
            <IoMdArrowRoundBack/> 
            <h5>Back to Home</h5>
            </Link>
            <h2  class="text-3xl mb-12">Login</h2>
            
            <form action="#">
              
              <div class="mt-12">
                <input type={selectedRole === 'doctor' ? 'email':'text'} name="email" id="email" value={email}  onChange={handleChange} placeholder={selectedRole === 'doctor' ? 'Email':'Username'} class="border border-gray-400 py-1 px-2 w-full pl-3 rounded-lg"/>
              </div>

              <div class="mt-6">
                <input type="password" name="password" id="password" value={password}  onChange={handleChange} placeholder="Password" class="border border-gray-400 py-1 px-2 w-full pl-3 rounded-lg"/>
              </div>

      
      <div className="flex items-center space-x-8 mt-6">
        {/* Doctor Checkbox */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedRole === "doctor"}
            onChange={() => handleCheckboxChange("doctor")}
            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700 font-medium">Doctor</span>
        </label>

        {/* Assistant Checkbox */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedRole === "assistant"}
            onChange={() => handleCheckboxChange("assistant")}
            className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
          />
          <span className="text-gray-700 font-medium">Assistant</span>
        </label>
      </div>
             
              
              <div class="mt-5">
                <button class="w-full
                  bg-[#1F51FFA1]
                  rounded-md
                  py-3 text-center text-white"
                  onClick={(e)=>handleSubmit(e)}
                  >
                    {loading ? 'Loading...' :'Login'}
                  </button>
              </div>
              {/* <div class="mt-12">
                <button type="submit" onClick={handleSubmit} class="w-full bg-[#1F51FFA1] py-3 text-center text-white">{loading ? 'Loading...' : 'Login'}</button>
              </div> */}
              <br/>
              {/* <span className=' pl-3 mt-12'>
                 Don't have an account?   <span className='pl-3 text-[#1F51FFA1] cursor-pointer'><Link className='cursor-pointer' to={"/signup"}>Register</Link></span>
                </span> */}
            </form>
          </div>
        </div>
      </div>
    </div>


   </>
   
   )}
   </>
  );
};

export default Signin;






