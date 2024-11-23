'use client'
import {  useRouter } from "next/navigation";
import React, {  useState , ChangeEvent, useEffect } from "react";
import { useAuth } from "../Context/authcontext";
import * as XLSX from 'xlsx';
import axios from "axios";
import MyModal from "../Components/Modal";
import UILoader from "../Components/UILoader";
import ModalError from "../Components/ModalError";
const DynamicTable: React.FC = () => {

  const [showModal , setShowModal] = useState(true) 
  const [msg,setMsg] = useState("")
  const [columnCounter,setColumnCounter] = useState<number>(0)

  const {
    xlxs, setXlxs,
    formData,
    setFormData,
    tempName,
  setModal} = useAuth();
  //  const [xlxs,setXlxs] = useState([
  //   { "Item": "Small Sandwich", "Description": "Small size", "Unit Price": 500 },
  //   { "Item": "Medium Sandwich", "Description": "Medium size", "Unit Price": 1000 },
  //   { "Item": "Large Sandwich", "Description": "Large size", "Unit Price": 1500 }
  // ])
  function validateArray(dataArray:any) {
    // Iterate over each object in the array
    for (let i = 0; i < dataArray.length; i++) {
        const row = dataArray[i];
        
        // Iterate over each key in the current object
        for (const key in row) {
            const value = row[key];

            // Check if the value is empty, null, or NaN
            if (value === "" || value === null || Number.isNaN(value)) {
                // Return the error message with row and column details
                
                setMsg(`Error: Invalid value at row ${i + 1}, column "${key}"`)
                setShowModal(true)
                return false
            }
        }
    }

    // If no issues found, return success message
    return true
}
 const [showUi,setShowUi] = useState(false)
  useEffect(()=>{
    setMsg("Please ensure that your document includes only the columns: Item, Quantity, Description, Unit Price, and Amount. Kindly remove any other columns for clarity.")
    setShowModal(true)
    const titles = localStorage.getItem('titles');
    setColumnCounter(titles ? JSON.parse(titles).length : 0);
    if(xlxs != null)
    {
      const catalogData = localStorage.getItem('catalog');

      // Check if catalogData is not null before parsing
      if (catalogData) {
          setXlxs(JSON.parse(catalogData));
          setShowUi(true)
      } else {
          router.push('/Template')
      }
    }else{
      router.push('/')
    }
  },[])
  const router = useRouter();
  const [loading,setLoading] = useState(false)

  function isNumber(value: string | number | null | undefined): boolean {
    if (typeof value === 'number') {
      return !isNaN(value);
    } else if (typeof value === 'string') {
      return !isNaN(Number(value)) && value.trim() !== '';
    }
    return false;
  }

  const handleInputChange = (
    index: number,
    field: keyof any,
    value: string
  ) => {
    const updatedData: any = [...xlxs];
    updatedData[index][field] = isNumber(value) ? Number(value) : value;
    setXlxs(updatedData);
  };

  const handleRemoveRow = (index: number) => {
    if(xlxs.length <= 1){
       window.location.reload()
    }
    const updatedData = xlxs.filter((_, rowIndex) => rowIndex !== index);
    setXlxs(updatedData);
  };

  const handleRemoveColumn = (columnKey: string) => {
    if(columnCounter <= 1){
       window.location.reload()
    }
    setColumnCounter(columnCounter-1)
    const updatedData = xlxs.map((row: any) => {
      const newRow = { ...row };
      delete newRow[columnKey]; // Remove the column from each row
      return newRow;
    });
    setXlxs(updatedData);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAddRow = () => {
    const numberOfTitles = Object.keys(xlxs[0]);
    let newObj: any = {};
    for (let i = 0; i < numberOfTitles.length; i++) {
      newObj[numberOfTitles[i]] = "";
    }
    setXlxs([...xlxs, newObj]);
  };

  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(xlxs);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `Square-Inventory(${getCurrentDate()}).xlsx`);
  };

  const [errorMsg,setErrorMsg] = useState("")
  const sendDataToSquare = async () =>{
    try{
      setLoading(true)
      const result = await validateArray(xlxs)

      if(!result) return;
      
      if(formData.name == "")
      {
        // alert('Please fill Catelog info')
        setErrorMsg('Enter catalog name')
        setModal(true)
        return
      }else if(formData.description == "")
      {
        // alert('Please fill Catelog info')
        setErrorMsg('Enter catalog description')
        setModal(true)
        return
      }
      else if(formData.square == "")
      {
        // alert('Please fill Catelog info')
        setErrorMsg('Enter square token')
        setModal(true)
        return
      }
      const data = {
        jsonList:localStorage.getItem('catalog'),
        name:formData.name,
        description:formData.description,
        square:formData.square,
        tempName:localStorage.getItem('tempName')
      } 

      // console.log(data)
      // return

      const res = await axios.post(`http://localhost:8000/squareMethod/`,data)
      if(res.data.success == true)
      {
        alert('Done ️✅')
        setFormData({
          name: '',
          description: ''
        })
      }else{
        alert(res.data.msg)
      }
    }catch(e)
    {
      alert('Incorrect Square catalog template ❌, Required ("Title/Product","Description","Quantity/Qty","Unit Price/Rate","Amount/Price")')
    }finally{
      setLoading(false)
    }
  }

  if(showUi)
  {
    return (
      <>
      
      {
        loading ? 
        <UILoader/>
        :
      <>
       <MyModal errorMsg={errorMsg} />
       {
      showModal ? (
        <div className="h-screen flex justify-center items-center !bg-transparent">
        <ModalError msg={msg} setShowModal={setShowModal}/>
        </div>
      ):
      <div className="flex flex-col py-12 justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl px-4">
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr >
                {xlxs.length > 0  && Object.keys(xlxs[0]).map((key, index) => (
                  <th key={index} className="px-4 py-2 text-left font-semibold">
                    {key.toUpperCase()} 
                    {/* Remove column button */}
                    <button 
                      className="text-red-500 ml-2" 
                      onClick={() => handleRemoveColumn(key)}
                    >
                      Remove
                    </button>
                  </th>
                ))}
                <th className="px-4 py-2 text-left font-semibold">ACTION</th> {/* Add action column */}
              </tr>
            </thead>
            <tbody>
              {xlxs.length > 0 && xlxs.map((item: any, rowIndex) => (
                <tr key={rowIndex} className="border-t">
                  {Object.keys(item).map((key: any, colIndex: any) => (
                    <td key={colIndex} className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={item[key].toString()}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(rowIndex, key, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemoveRow(rowIndex)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <div>
              <button
                onClick={() => router.push('/Template')}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              >
                Back
              </button>
              <span className="mx-2" />
              <button
                onClick={handleAddRow}
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              >
                Add Row
              </button>
              <span className="mx-2" />
              <button
                onClick={handleExport}
                className="bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              >
                Download Excel
              </button>
              <span className="mx-2" />
              <button
                onClick={()=>setModal(true)}
                className="bg-pink-700 text-white font-bold py-2 px-4 rounded "
              >
                Create Catalog Info
              </button>
              <span className="mx-2" />
              <button
                onClick={sendDataToSquare}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              >
                Upload to Square
              </button>
            </div>
          </div>
        </div>
      </div>
    }
      </>
  
  }
      </>
    );
  }
};

export default DynamicTable;

