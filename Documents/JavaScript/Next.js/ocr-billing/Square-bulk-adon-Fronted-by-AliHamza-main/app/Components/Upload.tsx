// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import Filer from './Filer';
// import Button from './Button'; 
// import 'react-image-crop/dist/ReactCrop.css'; 
// import Loader from './Loader';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
// import axios from 'axios'; 
// import { useAuth } from '../Context/authcontext';
// import { useRouter } from 'next/navigation';

// const Upload = () => {
//   const [file, setFile] = useState<File | null>(null);  
//   const {selectedOption,titles,setXlxs} = useAuth();
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const imageRef = useRef<HTMLImageElement | null>(null);
//   const router = useRouter()

//   useEffect(()=>{
//     if(selectedOption=="")
//     {
//       router.push('/')
//     }
//   },[selectedOption])


//   const pdfToJpeg = async (file:File) => {
//     try {
//         const formData = new FormData();
//         formData.append('pdf_file', file); 

//         const response = await axios.post('http://localhost:8000/pdf/', formData, {
//             responseType: 'blob',
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             }
//         });
//         return {
//           response:true,
//           blob:response.data
//         }
        

//     } catch (error) {
//         return {
//           response:false,
//           blob:''
//         }
//     }
// };


//   const handleFileChange = async (selectedFile: File) => {
//     if(selectedFile.type.split('/')[1] == 'pdf')
//     {
//       const result = await pdfToJpeg(selectedFile)
//       if(result.response)
//       {
//         setFile(result.blob);
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreviewUrl(reader.result as string);
//         };
//         reader.readAsDataURL(result.blob);
//       }else{
//         return
//       }
//     }else{
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(selectedFile);

//     }
    
//   };

//   const onImageLoaded = (img: HTMLImageElement) => {
//     imageRef.current = img;
//   };

  
//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     setLoading(true);

//     let imageToUpload = previewUrl;

//     if (!imageToUpload) {
//       toast.error('Please select an image before uploading.');
//       setLoading(false);
//       return;
//     }

//     try {
//       setTimeout(()=>toast.info('Extracting Data'),2000)
//       if(file){
//         await callTextExtractionMethod(file,titles)
//       }
//     } catch (error) {
//       toast.error('Error uploading image. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
 



//   const callTextExtractionMethod = async(file:any,titles:any) =>{
//     try{

//       const formdata = new FormData()
//       formdata.append('url',file)
//       formdata.append('titles',titles)
//       const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}items/`,formdata,{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         }
//       })
//       const result = res.data
//       if(result.success == true)
//       {
//         setXlxs(result.data)
//         localStorage.setItem('catalog',JSON.stringify(result.data))
//         localStorage.setItem('titles',JSON.stringify(titles))

//         router.push('/Preview')
//       }else{
//         alert(result.msg)
//       }
//     }catch(e)
//     {
//       localStorage.clear()
//       alert('Failed ty again') 
//     }
//   }

//   return (
//     <>

//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className={`bg-white p-8 rounded-lg shadow-md flex justify-center flex-col items-center w-full max-w-md ${loading ? 'opacity-70 bg-black bg-opacity-20' : ''}`}>
//         <h2 className="text-2xl btn-col font-semibold text-center mb-6"> 
//           <p>{selectedOption}</p>
//           Upload Your File
//         </h2>

//         <Filer onFileChange={handleFileChange} />

//         {previewUrl && (
         
//             <img
//               src={previewUrl}
//               alt="Preview"
//               ref={onImageLoaded}
//               className="w-auto mt-8 h-auto rounded-lg shadow"
//             />
//         )}

//         <br />
//         {
//           !loading ?
//           <Button Click={handleSubmit} />
//           : null
//         }
//         {loading && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Loader />
//           </div>
//         )}
//       </div>
//       <ToastContainer />

      
//     </div>
//     </>
//   );
// };

// export default Upload;


"use client";
import React, { useState, useRef, useEffect } from "react";
import Filer from "./Filer";
import Button from "./Button";
import "react-image-crop/dist/ReactCrop.css";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../Context/authcontext";
import { useRouter } from "next/navigation";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { selectedOption, titles, setXlxs } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openAiKey, setOpenAiKey] = useState("");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedOption == "") {
      router.push("/");
    }
  }, [selectedOption]);

    const onImageLoaded = (img: HTMLImageElement) => {
    imageRef.current = img;
  };

  const pdfToJpeg = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("pdf_file", file);

      const response = await axios.post("http://localhost:8000/pdf/", formData, {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        response: true,
        blob: response.data,
      };
    } catch (error) {
      return {
        response: false,
        blob: "",
      };
    }
  };

  const handleFileChange = async (selectedFile: File) => {
    if (selectedFile.type.split("/")[1] === "pdf") {
      const result = await pdfToJpeg(selectedFile);
      if (result.response) {
        setFile(result.blob);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(result.blob);
      } else {
        return;
      }
    } else {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal(true); // Open the modal
  };

  const handleModalProceed = async () => {
    if (!openAiKey) {
      toast.error("Please enter your OpenAI key.");
      return;
    }

    setLoading(true);
    setShowModal(false);

    let imageToUpload = previewUrl;

    if (!imageToUpload) {
      toast.error("Please select an image before uploading.");
      setLoading(false);
      return;
    }

    try {
      toast.info("Extracting Data");
      if (file) {
        await callTextExtractionMethod(file, titles, openAiKey);
      }
    } catch (error) {
      toast.error("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const callTextExtractionMethod = async (file: any, titles: any, key: string) => {
    try {
      const formdata = new FormData();
      formdata.append("url", file);
      formdata.append("titles", titles);
      formdata.append("openai_key", key);
      localStorage.clear();
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}items/`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = res.data;
      if (result.success === true) {
        setXlxs(result.data);
        localStorage.setItem("catalog", JSON.stringify(result.data));
        localStorage.setItem("titles", JSON.stringify(titles));

        router.push("/Preview");
      } else {
        alert(result.msg);
      }
    } catch (e) {
      localStorage.clear();
      alert("Failed to try again");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div
          className={`bg-white p-8 rounded-lg shadow-md flex justify-center flex-col items-center w-full max-w-md ${
            loading ? "opacity-70 bg-black bg-opacity-20" : ""
          }`}
        >
          <h2 className="text-2xl btn-col font-semibold text-center mb-6">
            <p>{selectedOption}</p>
            Upload Your File
          </h2>

          <Filer onFileChange={handleFileChange} />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              ref={onImageLoaded}
              className="w-auto mt-8 h-auto rounded-lg shadow"
            />
          )}

          <br />
          {!loading ? <Button Click={handleSubmit} /> : null}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader />
            </div>
          )}
        </div>
        <ToastContainer />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold ">Enter Your OpenAI Key</h3>
            <h3 className="text-sm  text-gray-500 mb-4">Key must support Model 4o-mini</h3>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full rounded mb-4"
              placeholder="OpenAI Key"
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              onClick={handleModalProceed}
            >
              OK
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
