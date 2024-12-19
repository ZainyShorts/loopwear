import axios from 'axios';
import React from 'react' 
import { useState } from 'react'
import { Node_API_URL } from '../client';

function InvoiceModal({data,onClose , name , address,token,id,statusShow}) {  
  const [status , setStatus] = useState(statusShow);
  const handleStatus = async (e) => { 
    const val = e.target.value
    setStatus(val); 
    await invoiceStatus(val)
  }

  const invoiceStatus = async(value) =>{
    try{
      const data ={
        invoiceId:id,
        status:value
      }
      
      const result = await axios.post(`${Node_API_URL}/api/post/invoiceStatus`,data,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(result.data.response)
      {
        return true
      }else{
        return false
      }
    }catch(e)
    {
      return false
    }
} 
  return ( 
    <>  
    <div  className='dark:bg-slate-800  w-[90vw] md:w-[50vw] '>
    <div className='relative font-bold text-xl bg-blue-500 p-4'> 
      INVOICE
    </div>  
    <div className='flex justify-between text-gray-200 p-6'>
    <div className='p-2 flex flex-col gap-3'>  
       <p className='font-semibold text-xl'> Billing To : <span className='text-lg'> {name} </span>  </p> 
        {address ? ( 
            <p className='font-semibold text-xl'> Address : <span className='text-lg'> {address} </span>  </p>
        ) :  ( 
         <p className='font-semibold text-xl'>Address: <span > N/A </span> </p>
        )
         } 
       <p className='font-semibold text-xl'>Status : <span className='text-lg'> {status} </span> </p>  
        
    </div> 
    <div className='p-2 font-semibold text-xl mr-2 '> Choose Status : 
       <select className='ml-2 dark:bg-slate-900 p-2 rounded-sm' value={status} onChange={handleStatus}>  
        <option value="Paid"> 
        Paid 
        </option> 
        <option value="Unpaid"> 
        Unpaid 
        </option>
       </select> 
       </div>  
    </div>

    <div className='flex flex-col text-white justify-center items-center w-[100%] p-6 '>  
    <table className="min-w-full ">
        <thead>
          <tr className="bg-gray-700">
            <th className=" p-2">ITEM </th>
            <th className="p-2">PRICE</th>
            <th className=" p-2">QUANTITY</th>
            <th className=" p-2">TOTAL</th>
          </tr>
        </thead>
        <tbody> 
           {data.item.length > 1 ? ( 
               data.item.map((product) => (   
                <React.Fragment key={product.id}>

                <tr  className="text-center">
                  <td className=" p-2"> {product.item}</td> 
                  <td className=" p-2">${product.price}</td>
                  <td className=" p-2">{product.qty}</td>
                  <td className=" p-2">${product.qty*product.price}</td> 
                  
                </tr>  
                <tr>
                    <td colSpan="4">
                      <hr className="my-2 border-gray-300" />
                    </td>
                  </tr>
                </React.Fragment>

              ))
           ): ( 
            data.item.map((product, index) => (
                <React.Fragment key={product.id}>
                  <tr className="text-center">
                    <td className="p-2">{product.itemName}</td> 
                    <td className="p-2">${product.Price}</td>
                    <td className="p-2">{product.itemQuantity}</td>
                    <td className="p-2">${product.itemQuantity * product.Price}</td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <hr className="my-2 border-gray-300" />
                    </td>
                  </tr>
                </React.Fragment>
              ))
              
              
           )} 
       
          <tr className="font-semibold bg-gray-800">
            <td className=" p-2 text-right" colSpan="3">Subtotal</td>
            <td className=" p-2 text-center">${data.subTotal}</td> 
          </tr>
        </tbody>
      </table>

         <div onClick={onClose} className='bg-red-500 mt-2 p-4 rounded-md cursor-pointer'> 
            Close Invoice
         </div> 

    </div>  
    </div>
    </>
  )
}

export default InvoiceModal
