"use client";
import React, { useState, useRef, useEffect } from 'react';
import Filer from './Filer';
import ReactCrop, { Crop } from 'react-image-crop';
import Button from './Button'; 
import 'react-image-crop/dist/ReactCrop.css'; 
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import CropModal from './CropModal'; 
import axios from 'axios'; 
import { useAuth } from '../Context/authcontext';
import { useRouter } from 'next/navigation';
import MyModal from './Modal';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);  
  const {selectedOption,titles,setXlxs} = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter()

  useEffect(()=>{
    if(selectedOption=="")
    {
      router.push('/')
    }
  },[selectedOption])


  const pdfToJpeg = async (file:File) => {
    try {
        const formData = new FormData();
        formData.append('pdf_file', file); 

        const response = await axios.post('http://localhost:8000/pdf/', formData, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return {
          response:true,
          blob:response.data
        }
        

    } catch (error) {
        return {
          response:false,
          blob:''
        }
    }
};


  const handleFileChange = async (selectedFile: File) => {
    if(selectedFile.type.split('/')[1] == 'pdf')
    {
      const result = await pdfToJpeg(selectedFile)
      if(result.response)
      {
        setFile(result.blob);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(result.blob);
      }else{
        return
      }
    }else{
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

    }
    
  };

  const onImageLoaded = (img: HTMLImageElement) => {
    imageRef.current = img;
  };

  const generateCroppedImage = (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!completedCrop || !imageRef.current || !canvasRef.current) {
        resolve(null);
        return;
      }
  
      const image = imageRef.current;
      const canvas = canvasRef.current;
      const crop = completedCrop;
  
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');
  
      if (!ctx) {
        resolve(null);
        return;
      }
  
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Set canvas dimensions based on crop
      canvas.width = crop.width!;
      canvas.height = crop.height!;
  
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        crop.width!,
        crop.height!
      );
  
      const croppedUrl = canvas.toDataURL('image/jpeg');
      resolve(croppedUrl);
    });
  };
  
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    let imageToUpload = previewUrl;

    if (!imageToUpload) {
      toast.error('Please select an image before uploading.');
      setLoading(false);
      return;
    }

    try {
      setTimeout(()=>toast.info('Extracting Data'),2000)
      if(file){
        await callTextExtractionMethod(file,titles)
      }
    } catch (error) {
      toast.error('Error uploading image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleConfirmCrop = async () => {
    const imageToUpload = await generateCroppedImage();
    
    if (imageToUpload) {
      setPreviewUrl(imageToUpload); 
      setCrop({ unit: 'px', width: 0, height: 0, x: 0, y: 0 }); 
    } else {
      toast.error('Failed to cropped image.');
    }
  
    setIsModalOpen(false); 
  };

  const handleRejectCrop = () => { 
    setCrop({ unit: 'px', width: 0, height: 0, x: 0, y: 0 }); 
    setIsModalOpen(false); 
  };


  const callTextExtractionMethod = async(file:any,titles:any) =>{
    try{

      const formdata = new FormData()
      formdata.append('url',file)
      formdata.append('titles',titles)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}items/`,formdata,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      const result = res.data
      if(result.success == true)
      {
        setXlxs(result.data)
        localStorage.setItem('catalog',JSON.stringify(result.data))
        localStorage.setItem('titles',JSON.stringify(titles))

        router.push('/Preview')
      }else{
        alert(result.msg)
      }
    }catch(e)
    {
      alert('Failed ty again') //faizy replacce it with toast 
    }
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={`bg-white p-8 rounded-lg shadow-md flex justify-center flex-col items-center w-full max-w-md ${loading ? 'opacity-70 bg-black bg-opacity-20' : ''}`}>
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
        <Button Click={handleSubmit} />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
      <ToastContainer />

      {/* Hidden Canvas Element */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Crop Confirmation Modal */}
      {isModalOpen && (
        <CropModal 
          isOpen={isModalOpen} 
          onClose={handleRejectCrop} 
          onAccept={handleConfirmCrop} 
          onReject={handleRejectCrop} 
        />
      )}
    </div>
    </>
  );
};

export default Upload;
