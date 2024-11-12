'use client'
import React from 'react';
import axios from 'axios';


const FileUploadComponent = () => {
    return (
        <div>
            <h1>Upload PDF and Download Converted Image</h1>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
        </div>
    );
};

export default FileUploadComponent;


const downloadImage = async (file:File) => {
    try {
        // Create a FormData object to send the PDF file
        const formData = new FormData();
        formData.append('pdf_file', file); // Assuming 'file' is the uploaded PDF file

        // Send the request to the backend
        const response = await axios.post('http://localhost:8000/pdf/', formData, {
            responseType: 'blob',  // Important: receive binary data as a blob
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log(response)
        console.log(new Blob([response.data]))
        // Create a URL from the blob (image) and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'converted_image.jpg'); // Set the file name
        document.body.appendChild(link);
        link.click();

        // Cleanup after download
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Error downloading the image', error);
    }
};

// Example on how you could use this in an input handler
const handleFileUpload = (event:any) => {
    const file = event.target.files[0];  // Get the uploaded PDF file
    if (file) {
        downloadImage(file);  // Call the function to handle the download
    }
};
