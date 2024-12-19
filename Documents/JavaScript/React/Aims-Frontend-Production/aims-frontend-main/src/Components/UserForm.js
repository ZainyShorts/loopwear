import React, { useState, useRef, useContext ,useEffect} from "react";
import Webcam from "react-webcam";
import Loading from "./loading.js";
import { API_URL, flask_API_URL, Node_API_URL } from "../client";
import axios from "axios";
import { GlobalStateContext } from "../Context/GlobalStateContext.js";
// import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { navigate } from "react-big-calendar/lib/utils/constants.js";
import { useNavigate } from "react-router-dom";
import { CiMicrophoneOff } from "react-icons/ci";
import { CiMicrophoneOn } from "react-icons/ci";
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import { useLocation } from 'react-router-dom';

const Form = (props) => {
  const [loading, setLoading] = useState(false);
  const {token,showToast} = useContext(GlobalStateContext)
  // const { userInfo } = useSelector((state)=>state.auth)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const docID = params.get('doctID');
  const [formData, setFormData] = useState({
    doc_id:docID,
    FullName: "",
    birthDate: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
    provider: "",
    policyName: "",
    groupNB: "",
    memberid: "",
  });

  

  const navigate = useNavigate()


  const [showCamera, setShowCamera] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageType, setImageType] = useState(null); // front or back

  const webcamRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    try {
      const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
      const res = await axios.post(`${Node_API_URL}/api/post/createPatient`,formData,config);
      if (res.data.response===true) {
          toast.error(res.data.msg)
          navigate(`/home/${res.data.id}`);
      }else{
          toast.error(res.data.msg)
      }
    } catch (error) {
      toast.error("Netwok Error try again")
    } finally {
      setLoading(false);
    }
  };

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontImage1, setFrontImage1] = useState(null);
  const [backImage1, setBackImage1] = useState(null);


  // webAudioApi
  const [isRecording, setIsRecording] = useState({});
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  // const [microphoneFlag,setMicrophoneFlag] = useState({})


  useEffect(() => {
    console.log(isRecording," isRecording state")
  }, [isRecording])
  


  

  const audioToText=async(state)=>
  {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    
    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async() => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
      audioChunksRef.current = [];

      try {
    
        // Set headers
        const API_KEY = "da82ab87ef7c3ad6e8250b9774cadc66870ec126"
        const DEEPGRAM_API_URL = 'https://api.deepgram.com/v1/listen';
        const headers = {
          'Authorization': `Token ${API_KEY}`,
          'Content-Type': 'audio/wav' 
        };
    
        // Query parameters for Deepgram API
        const params = {
          model: 'nova-2',
          smart_format: 'true'
        }; 
        setIsRecording({...isRecording,[state]:"loading"});
    
        // Send POST request to Deepgram API
        const response = await axios.post(DEEPGRAM_API_URL, audioBlob, {
          headers: headers,
          params: params
        });
    
        // Check response status
        if (response.status === 200) {
          
          setFormData((prevData) => ({
            ...prevData,
            [state]: response.data.results.channels[0].alternatives[0].transcript.slice(0, -1), // Assuming res.data contains the transcribed text
          }));

          stopRecording(state)
        }
        
      } catch (error) {
        toast.error("Failed try again")
      }
  
    }

    mediaRecorderRef.current.start();
    setIsRecording({...isRecording,[state]:true});
  }

  const handleImageUpload = async (file, isFrontImage) => {
    if (!file) {
      showToast("Please upload an image.");
      return;
    }
    setLoading(true);
    const imageFormData = new FormData();
    imageFormData.append("image", file);
    try {
      const response = await fetch(API_URL + "/extract_text_from_image", {
        method: "POST",
        body: imageFormData,
      });
      const data = await response.json();
      if (data.error) {
        showToast(data.error);
      } else {
        // Replace N/A with empty string
        const cleanedData = {};
        Object.keys(data).forEach((key) => {
          cleanedData[key] = data[key] === "N/A" ? "" : data[key];
        });
        
        setFormData((prevFormData) => ({
          ...prevFormData,
          FullName: prevFormData.FullName || cleanedData.FullName || "",
          birthDate: prevFormData.birthDate || cleanedData.birthDate || "",
          gender: prevFormData.gender || cleanedData.gender || "",
          address: prevFormData.address || cleanedData.primaryInsuranceAddress || "",
          phoneNumber: prevFormData.phoneNumber || cleanedData.phoneNumber || "",
          email: prevFormData.email || cleanedData.email || "",
          provider: prevFormData.provider || cleanedData.provider || "",
          policyName: prevFormData.policyName || cleanedData.policyName || "",
          groupNB: prevFormData.groupNB || cleanedData.groupNB || "",
          memberid: prevFormData.memberid || cleanedData.memberid || "",
        }));
        console.log(formData);
        console.log(data);
      }
    } catch (error) {
      console.error("Error extracting text from image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageBlob = dataURLtoFile(imageSrc, "capturedImage.jpg");

    if (imageType === "front") {
      setFrontImage(imageBlob);
      handleImageUpload(imageBlob, true);
    } else if (imageType === "back") {
      setBackImage(imageBlob);
      handleImageUpload(imageBlob, false);
    } else if (imageType === "front1") {
      setFrontImage1(imageBlob);
      handleImageUpload(imageBlob, true);
    } else if (imageType === "back1") {
      setBackImage1(imageBlob);
      handleImageUpload(imageBlob, false);
    }

    setShowCamera(false);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleCameraOpen = (type) => {
    setImageType(type);
    setShowCamera(true);
  };


  const stopRecording = (state) => {
    mediaRecorderRef.current.stop();
    setIsRecording({...isRecording,[state]:false});
  };


  if(isMobile)
  {
  return (
    <>
    <style>
{
  `
  .loader {
  
    width: 30px;
    height: 30px;
    margin-left:10px;
    border: 4px solid #f3f3f3; /* Smaller border for a smaller spinner */
    border-radius: 50%; /* Circular spinner */
    border-top: 4px solid #3498db; /* Spinner color */
    -webkit-animation: spin 1s linear infinite; /* Smooth and faster rotation */
    animation: spin 1s linear infinite;
  }
  
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  `
} 

</style>



    <ToastContainer />
    <div className="bg-gradient-to-r from-[#44b09e] via-transparent to-[#378B29]">
      {loading ? (
        <Loading />
      ) : (

        <div className="flex justify-center items-center py-40">
          {showCamera && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={400}
                  height={300}
                />
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleCapture}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Capture
                  </button>
                  <button
                    onClick={() => setShowCamera(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* <div className="mx-4">
            <div className="flex flex-col items-center space-y-4 max-w-sm mx-auto p-6 bg-white shadow-xl rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
              <label
                htmlFor="front-upload"
                className="cursor-pointer bg-white shadow-lg rounded-lg p-4 backdrop-blur-md text-gray-800 hover:bg-gray-100 transition duration-300"
              >
                Upload Front of Picture ID
                <input
                  className="hidden"
                  id="front-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFrontImage(file);
                    handleImageUpload(file, true);
                  }}
                />
              </label>
              <button
                onClick={() => handleCameraOpen("front")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Use Camera
              </button>

              {frontImage && typeof frontImage === "object" && (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(frontImage)}
                    alt="Front of ID"
                    className="w-48 h-32 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {frontImage.name}
                  </p>
                </div>
              )}

              <label
                htmlFor="back-upload"
                className="cursor-pointer bg-white shadow-lg rounded-lg p-4 backdrop-blur-md text-gray-800 hover:bg-gray-100 transition duration-300"
              >
                Upload Back of Picture ID
                <input
                  className="hidden"
                  id="back-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setBackImage(file);
                    handleImageUpload(file, false);
                  }}
                />
              </label>
              <button
                onClick={() => handleCameraOpen("back")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Use Camera
              </button>

              {backImage && typeof backImage === "object" && (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(backImage)}
                    alt="Back of ID"
                    className="w-48 h-32 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-xs text-gray-500 mt-2">{backImage.name}</p>
                </div>
              )}
            </div>
          </div> */}

          <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
              <h1 className="font-bold text-xl text-gray-800 mb-4">
                Please enter Patient's information:
              </h1>
              {/* Form Fields */}
              
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="FullName"
                >
                  Full Name
                </label>
                <div className="flex items-center justify-between">
                <input
                  type="text"
                  name="FullName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Full Name"
                  value={formData.FullName}
                  onChange={handleInputChange}
                  />
                  {isRecording["FullName"]== "loading" ?<div class="loader"></div>:
                  !isRecording["FullName"]?<CiMicrophoneOff onClick={()=>audioToText("FullName")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                  isRecording["FullName"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("FullName")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                  
                  </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="birthDate"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="birthDate"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gender
                </label>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-gray-600"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-gray-600"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <div className="flex items-center justify-between">
                <input
                  type="tel"
                  name="phoneNumber"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {isRecording["phoneNumber"]== "loading" ?<div class="loader"></div>:
                  !isRecording["phoneNumber"]?<CiMicrophoneOff onClick={()=>audioToText("phoneNumber")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                  isRecording["phoneNumber"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("phoneNumber")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                  </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="flex items-center justify-between">
                <input
                  type="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {isRecording["email"]== "loading" ?<div class="loader"></div>:
                  !isRecording["email"]?<CiMicrophoneOff onClick={()=>audioToText("email")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                  isRecording["email"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("email")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                  </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Primary Insurance Address
                </label>
                <div className="flex items-center justify-between">
                <input
                  type="text"
                  name="address"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Primary Insurance Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              
                 {isRecording["address"]== "loading" ?<div class="loader"></div>:
                  !isRecording["address"]?<CiMicrophoneOff onClick={()=>audioToText("address")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                  isRecording["address"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("address")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                  
                  </div>
              </div>
              
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="provider"
                >
                  Provider Name
                </label>
                <div className="flex items-center justify-between">
                <input
                  type="text"
                  name="provider"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Provider Name"
                  value={formData.provider}
                  onChange={handleInputChange}
                />
                {isRecording["provider"]== "loading" ?<div class="loader"></div>:
                  !isRecording["provider"]?<CiMicrophoneOff onClick={()=>audioToText("provider")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                  isRecording["provider"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("provider")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                  </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="policyName"
                >
                  Policy Holder Name
                </label>
                <div className="flex items-center justify-between">
                <input
                  type="text"
                  name="policyName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Policy Holder Name"
                  value={formData.policyName}
                  onChange={handleInputChange}
                />
                {isRecording["policyName"]== "loading" ?<div class="loader"></div>:
                  !isRecording["policyName"]?<CiMicrophoneOff onClick={()=>audioToText("policyName")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                  isRecording["policyName"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("policyName")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                  </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="groupNB"
                >
                  Group Number
                </label>
                <div className="flex items-center justify-between">
                <input
                  type="text"
                  name="groupNB"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Group Number"
                  value={formData.groupNB}
                  onChange={handleInputChange}
                />
               {isRecording["groupNB"]== "loading" ?<div class="loader"></div>:
                  !isRecording["groupNB"]?<CiMicrophoneOff onClick={()=>audioToText("groupNB")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                  isRecording["groupNB"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("groupNB")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                  </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="memberid"
                >
                  Member ID Number
                </label>
                <div className="flex items-center justify-between">
                <input
                  type="text"
                  name="memberid"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Member ID Number"
                  value={formData.memberid}
                  onChange={handleInputChange}
                />
               {isRecording["memberid"]== "loading" ?<div class="loader"></div>:
                  !isRecording["memberid"]?<CiMicrophoneOff onClick={()=>audioToText("memberid")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                  isRecording["memberid"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("memberid")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                  </div>
              </div>
              <div className="w-full pr-8">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            
            </div>
          </div>

          {/* <div className="flex flex-col items-center space-y-4 max-w-sm mx-4 p-6 bg-white shadow-xl rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
            <label
              htmlFor="front-upload1"
              className="cursor-pointer bg-white shadow-lg rounded-lg p-4 backdrop-blur-md text-gray-800 hover:bg-gray-100 transition duration-300"
            >
              Upload Front of Insurance Card
              <input
                className="hidden"
                id="front-upload1"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFrontImage1(file);
                  handleImageUpload(file, true);
                }}
              />
            </label>
            <button
              onClick={() => handleCameraOpen("front1")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Use Camera
            </button>

            {frontImage1 && (
              <div className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(frontImage1)}
                  alt="Front of Insurance Card"
                  className="w-48 h-32 object-cover rounded-lg shadow-md"
                />
                <p className="text-xs text-gray-500 mt-2">{frontImage1.name}</p>
              </div>
            )}

            <label
              htmlFor="back-upload1"
              className="cursor-pointer bg-white shadow-lg rounded-lg p-4 backdrop-blur-md text-gray-800 hover:bg-gray-100 transition duration-300"
            >
              Upload Back of Insurance Card
              <input
                className="hidden"
                id="back-upload1"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setBackImage1(file);
                  handleImageUpload(file, false);
                }}
              />
            </label>
            <button
              onClick={() => handleCameraOpen("back1")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Use Camera
            </button>

            {backImage1 && (
              <div className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(backImage1)}
                  alt="Back of Insurance Card"
                  className="w-48 h-32 object-cover rounded-lg shadow-md"
                />
                <p className="text-xs text-gray-500 mt-2">{backImage1.name}</p>
              </div>
            )}
          </div> */}
        </div>
      )}
    </div>
    </>

  );  
  }
  else{
    return (
      <>
      <style>
  {
    `
    .loader {
    
      width: 30px;
      height: 30px;
      margin-left:10px;
      border: 4px solid #f3f3f3; /* Smaller border for a smaller spinner */
      border-radius: 50%; /* Circular spinner */
      border-top: 4px solid #3498db; /* Spinner color */
      -webkit-animation: spin 1s linear infinite; /* Smooth and faster rotation */
      animation: spin 1s linear infinite;
    }
    
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    `
  } 
  
      </style>
      <ToastContainer />
      <div className="bg-gradient-to-r from-[#44b09e] via-transparent to-[#378B29]">
        {loading ? (
          <Loading />
        ) : (
  
          <div className="flex justify-center h-[100vh] items-center py-40">
            {showCamera && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={400}
                    height={300}
                  />
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleCapture}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Capture
                    </button>
                    <button
                      onClick={() => setShowCamera(false)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
  
            {/* <div className="mx-4">
              <div className="flex flex-col items-center space-y-4 max-w-sm mx-auto p-6 bg-white shadow-xl rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
                <label
                  htmlFor="front-upload"
                  className="cursor-pointer bg-white shadow-lg rounded-lg p-4 backdrop-blur-md text-gray-800 hover:bg-gray-100 transition duration-300"
                >
                  Upload Front of Picture ID
                  <input
                    className="hidden"
                    id="front-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFrontImage(file);
                      handleImageUpload(file, true);
                    }}
                  />
                </label>
                <button
                  onClick={() => handleCameraOpen("front")}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Use Camera
                </button>
  
                {frontImage && typeof frontImage === "object" && (
                  <div className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(frontImage)}
                      alt="Front of ID"
                      className="w-48 h-32 object-cover rounded-lg shadow-md"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {frontImage.name}
                    </p>
                  </div>
                )}
  
                <label
                  htmlFor="back-upload"
                  className="cursor-pointer bg-white shadow-lg rounded-lg p-4 backdrop-blur-md text-gray-800 hover:bg-gray-100 transition duration-300"
                >
                  Upload Back of Picture ID
                  <input
                    className="hidden"
                    id="back-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setBackImage(file);
                      handleImageUpload(file, false);
                    }}
                  />
                </label>
                <button
                  onClick={() => handleCameraOpen("back")}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Use Camera
                </button>
  
                {backImage && typeof backImage === "object" && (
                  <div className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(backImage)}
                      alt="Back of ID"
                      className="w-48 h-32 object-cover rounded-lg shadow-md"
                    />
                    <p className="text-xs text-gray-500 mt-2">{backImage.name}</p>
                  </div>
                )}
              </div>
            </div> */}
  
            <div className="w-[800px]
            ">
              <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
                <h1 className="font-bold text-xl text-gray-800 mb-4">
                  Please enter Patient's information:
                </h1>
                {/* Form Fields */}
                <div className="flex justify-center items-center">
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="FullName"
                  >
                    Full Name
                  </label>
                  <div className="flex items-center justify-evenly">
                  <input
                    type="text"
                    name="FullName"
                    className="shadow appearance-none  border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Full Name"
                    value={formData.FullName}
                    onChange={handleInputChange}
                    />
                    {isRecording["FullName"]== "loading" ?<div class="loader"></div>:
                    !isRecording["FullName"]?<CiMicrophoneOff onClick={()=>audioToText("FullName")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                    isRecording["FullName"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("FullName")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                    
                    </div>
                </div>
                <div className="mb-6 pl-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="birthDate"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    className="shadow appearance-none border rounded w-[300px] mr-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
                </div>
                
                
  
                <div className="flex justify-center items-center">
                <div className="mb-6 ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <div className="flex items-center justify-between">
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {isRecording["phoneNumber"]== "loading" ?<div class="loader"></div>:
                    !isRecording["phoneNumber"]?<CiMicrophoneOff onClick={()=>audioToText("phoneNumber")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                    isRecording["phoneNumber"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("phoneNumber")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                    </div>
                </div>
                <div className="mb-6 pl-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="flex items-center justify-between">
                  <input
                    type="email"
                    name="email"
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {isRecording["email"]== "loading" ?<div class="loader"></div>:
                    !isRecording["email"]?<CiMicrophoneOff onClick={()=>audioToText("email")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                    isRecording["email"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("email")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                    </div>
                </div>
                </div>
  
  
  
                <div className="flex justify-center items-center">
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Primary Insurance Address
                  </label>
                  <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="address"
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Primary Insurance Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                
                   {isRecording["address"]== "loading" ?<div class="loader"></div>:
                    !isRecording["address"]?<CiMicrophoneOff onClick={()=>audioToText("address")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                    isRecording["address"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("address")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                    
                    </div>
                </div>
                <div className="mb-6 pl-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="provider"
                  >
                    Provider Name
                  </label>
                  <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="provider"
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Provider Name"
                    value={formData.provider}
                    onChange={handleInputChange}
                  />
                  {isRecording["provider"]== "loading" ?<div class="loader"></div>:
                    !isRecording["provider"]?<CiMicrophoneOff onClick={()=>audioToText("provider")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                    isRecording["provider"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("provider")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                    </div>
                </div>
                </div>
  
  
                <div className="flex justify-center items-center">
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="policyName"
                  >
                    Policy Holder Name
                  </label>
                  <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="policyName"
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Policy Holder Name"
                    value={formData.policyName}
                    onChange={handleInputChange}
                  />
                  {isRecording["policyName"]== "loading" ?<div class="loader"></div>:
                    !isRecording["policyName"]?<CiMicrophoneOff onClick={()=>audioToText("policyName")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                    isRecording["policyName"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("policyName")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                    </div>
                </div>
                <div className="mb-6 pl-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="groupNB"
                  >
                    Group Number
                  </label>
                  <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="groupNB"
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Group Number"
                    value={formData.groupNB}
                    onChange={handleInputChange}
                  />
                 {isRecording["groupNB"]== "loading" ?<div class="loader"></div>:
                    !isRecording["groupNB"]?<CiMicrophoneOff onClick={()=>audioToText("groupNB")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                    isRecording["groupNB"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("groupNB")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                    </div>
                </div>
                </div>
  
                <div className="flex justify-start items-center pl-5">
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="memberid"
                  >
                    Member ID Number
                  </label>
                  <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="memberid"
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Member ID Number"
                    value={formData.memberid}
                    onChange={handleInputChange}
                  />
                 {isRecording["memberid"]== "loading" ?<div class="loader"></div>:
                    !isRecording["memberid"]?<CiMicrophoneOff onClick={()=>audioToText("memberid")}  className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>:
                    isRecording["memberid"]  &&  <CiMicrophoneOn onClick={()=>stopRecording("memberid")} className="ml-3 hover:bg-gray-500 rounded-full cursor-pointer" size={25}/>}
                    </div>
                </div>
                <div className="mb-6 pl-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gender
                  </label>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-gray-600"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-gray-600"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                </div>
                </div>
  
                <div className="w-full px-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2  rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              
              </div>
            </div>
  
            {/* <div className="flex flex-col items-center space-y-4 max-w-sm mx-4 p-6 bg-white shadow-xl rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
              <label
                htmlFor="front-upload1"
                className="cursor-pointer bg-white shadow-lg rounded-lg p-4 backdrop-blur-md text-gray-800 hover:bg-gray-100 transition duration-300"
              >
                Upload Front of Insurance Card
                <input
                  className="hidden"
                  id="front-upload1"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFrontImage1(file);
                    handleImageUpload(file, true);
                  }}
                />
              </label>
              <button
                onClick={() => handleCameraOpen("front1")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Use Camera
              </button>
  
              {frontImage1 && (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(frontImage1)}
                    alt="Front of Insurance Card"
                    className="w-48 h-32 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-xs text-gray-500 mt-2">{frontImage1.name}</p>
                </div>
              )}
  
              <label
                htmlFor="back-upload1"
                className="cursor-pointer bg-white shadow-lg rounded-lg p-4 backdrop-blur-md text-gray-800 hover:bg-gray-100 transition duration-300"
              >
                Upload Back of Insurance Card
                <input
                  className="hidden"
                  id="back-upload1"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setBackImage1(file);
                    handleImageUpload(file, false);
                  }}
                />
              </label>
              <button
                onClick={() => handleCameraOpen("back1")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Use Camera
              </button>
  
              {backImage1 && (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(backImage1)}
                    alt="Back of Insurance Card"
                    className="w-48 h-32 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-xs text-gray-500 mt-2">{backImage1.name}</p>
                </div>
              )}
            </div> */}
          </div>
        )}
      </div>
      </>
  
    );
  }

};

export default Form;
