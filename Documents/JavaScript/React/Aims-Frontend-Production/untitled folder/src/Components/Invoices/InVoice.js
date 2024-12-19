import React from 'react'; 
import { useEffect ,useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MdDelete } from "react-icons/md";  
import { useContext } from 'react'; 
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import axios from 'axios'; 
import { Node_API_URL } from "../../client";
import { useSelector } from 'react-redux';
import Card from './Card';

const InVoice = () => {  
    const { userInfo } = useSelector((state)=>state.auth)
    const {token,userTimezone} = useContext(GlobalStateContext);  
    const [Patients , setAllPatients] = useState([]);    
    const [Total , setTotal] = useState (null); 
    const [Count , setCount] = useState (null);
    const [TodayTotal , setTodayTotal] = useState (null);

    const [Invoices , setInvoices] = useState();
    const [showCheckout , setShowcheckout] = useState(false);
    const [totalPrice , setTotalPrice] = useState(null);
    const [selectedPatient ,setSelectedPatient] = useState({name:"",_id:"" }) 
  const { register, control, handleSubmit, watch, reset , formState: { errors } } = useForm({
    defaultValues: {
      items: [{ itemName: 'Panadol', itemQuantity: 0, Price: 0 }] // Initial form with one item
    }
  });
  const Items = watch("items");
  const { fields, append ,remove } = useFieldArray({
    control,
    name: 'items', // Manage 'items' dynamically
  });
 

  const CalculateTotalPrice = () => {
    let total = 0; 
  
    for (let i = 0; i < Items.length; i++) {
      const itemPrice = parseFloat(Items[i].Price); // Convert Price to a float
      const itemQuantity = parseFloat(Items[i].itemQuantity); // Convert itemQuantity to a float
  
    
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        total += itemPrice * itemQuantity; 
      } 
    }
  
    setTotalPrice(total);
  }; 

  

  const getInvoiceAnalyitcs = async () => { 
    try { 

    const config = { 
     headers : { 
       "Authorization" : `Bearer ${token}`
     }
    } 

    const data = {
      userTimezone
    }
    const res = await axios.post(`${Node_API_URL}/api/post/getInvoiceAnalyitcs`,data,config); 
    console.log(res)
     if (res.data.response===true){ 
        setTotal(res.data.subTotal);
       setTodayTotal(res.data.subTotalToday);
        setCount(res.data.count)
     }
 
    }
    catch(error) { 
    console.log("Error Fetching Invoices ", error)
    }
   }
  
  useEffect(()=>{ 
    // fetchAllPatients(); 
    getInvoiceAnalyitcs();
  },[])


  useEffect(()=>{

    CalculateTotalPrice(); 
  },[fields,remove,append])
  
  const assignInvoice = async(e)=>{
    e.preventDefault()
    console.log(selectedPatient)
    if(Patients.length == 0 || selectedPatient.name == "" || selectedPatient._id == "")
    {
      alert('Please select patient')
      return
    }
    try {
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    // return
    const data = {
      docId:userInfo._id,
      pId:selectedPatient._id,
      items:Items,
      subTotal:totalPrice,
      userTimezone
    }
      const res = await axios.post(`${Node_API_URL}/api/post/makeInvoice`,data,config);
      console.log(res)
      if(res.data.response === true){
        getInvoiceAnalyitcs()
        alert(res.data.msg);
      }
    } catch (error) {
      console.log('error')
    }
  } 
  const ChangeSelected = (e) => {
     const value = e.target.value;  
     const [NAME,ID] = value.split('-');  
    setSelectedPatient({name:NAME , _id:ID})
  }

  const SearchByFilter = async (SearchType,query) => { 
    try { 
    const response = await axios.post(`${Node_API_URL}/api/post/searchPatientsByTypeAndLimit5`, 
      {
      type:SearchType,
      query:query
      }, 
      {
        headers: {
          "Authorization": `Bearer ${token}`,  
        },
      }
    ); 
      console.log(response.data.patients)
    if(response.data.response)
    {
      setAllPatients(response.data.patients);
    } 
    
  } catch (error) {
    console.error('Error while searching:', error);
  }


  }; 



  return (
    <> 
     <div className='grid grid-cols-1 lg:grid-cols-3 gap-2  dark:bg-slate-900 p-8 items-center text-gray-200  justify-around'> 
        
        <div  className='w-full  p-6 dark:bg-slate-800 rounded-md '>  
          
         <h2 className='font-semibold text-lg' > Total Earning </h2>   
         <p className='mt-4 font-bold text-4xl'>${Total}</p>
         </div>
         <div className='w-full p-6 dark:bg-slate-800 rounded-md '> 
         <h2 className='font-semibold text-lg'> Today Earning </h2> 
         <p className='mt-4 font-bold text-4xl'>${TodayTotal}</p>

        </div> 
        <div className='w-full  p-6 dark:bg-slate-800  rounded-md'> 
         <h2 className='font-semibold text-lg'> Total Invoices Assigned </h2> 
         <p className='mt-4 font-bold text-4xl'>{Count}</p>
        </div>

       </div>
    <div className='dark:bg-slate-900  flex flex-col items-center justify-center'>

       
     <div className=' flex flex-col items-center '>  

        <form className='p-7 mt-4 h-auto dark:bg-slate-800 flex flex-col gap-3 rounded-md items-center text-black'>
          <div className=' flex justify-evenly items-center text-white text-xl font-bold w-full '>
          <h1>Item</h1>
          <h1>Quantity</h1>
          <h1>Price</h1>
          </div>
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-4  flex-col justify-center items-center lg:flex-row">  
            <p className='text-gray-100 mt-2 font-semibold'> #{index+1} </p> 
             <div className='flex flex-col gap-2'>
              <input
                type='text'
                className='p-2 rounded-sm' 
                // disabled={showCheckout}
                placeholder="Item"
                {...register(`items.${index}.itemName`, { required: true })}
              />
              {errors.items?.[index]?.itemName && <p className='text-red-500'>Item Name is required</p>}
              </div>  
              <div className='flex flex-col gap-2'>
              <input
  type='number'
  className='p-2 rounded-sm'
  placeholder="Qty"
  {...register(`items.${index}.itemQuantity`, {
    required: true,
    valueAsNumber: true,
    onChange: () => { 
      CalculateTotalPrice();
    },
  })}
/>

              {errors.items?.[index]?.itemQuantity && <p className='text-red-500'>Item Quantity is required</p>}
              </div> 
              <div className='flex flex-col gap-2'>
              <input
                type='number'
                className='p-2 rounded-sm' 
                // disabled={showCheckout}
                placeholder="$Price"
                {...register(`items.${index}.Price`, { required: true ,valueAsNumber: true, onChange: () => { 
                  CalculateTotalPrice();
                }})}
              />
              {errors.items?.[index]?.Price && <p className='text-red-500'>Please enter a valid Price</p>}  
              </div>
              
               {fields.length > 1 && ( < MdDelete   onClick={() => {
                if (!showCheckout) { 
                 remove(index)}}} className={`text-red-400 mt-3 mb-3 lg:mt-1 lg:mb-1 hover:text-red-600 cursor-pointer  ${showCheckout ? 'cursor-not-allowed opacity-50' : ''}`}  size={30} /> 
               ) } 
            </div> 
          ))} 
           <div
             className='rounded-lg mt-2 relative w-[35vw] md:w-[12vw] min-h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500 
                '
                onClick={() => {
                    // if (!showCheckout) { // Only append if showCheckout is false
                      append({ itemName: '', itemQuantity: 0, Price: 0 });
                    // }
                  }}
          >
            <span className="text-gray-200 font-semibold ml-8 transform hover:hidden transition-all duration-300">
              Add More
            </span>
            <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
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
          <div className=" mt-2 mb-4 px-24 w-full">
            <label className="block text-lg font-semibold dark:text-gray-200 text-gray-700 mb-1">
              Search Patient
            </label> 

              <input
                type='text'
                className='p-2 block w-full rounded-md ' 
                placeholder="Search for patient"
                onChange={(e)=>SearchByFilter('name',e.target.value)}
                
              />

            <br/>
           
          {Patients && Patients.length>0 &&   <select
              className="block w-full transition-all  p-2 border border-gray-300 rounded-md"
              value={`${selectedPatient.name}-${selectedPatient._id}`} // Update this line
              onChange={ChangeSelected} 
            >  
            <option selected >Select a patient</option>
            {Patients.map((patient) => (
                <option key={patient._id}  value={`${patient.fullName}-${patient._id}`}>
                {patient.fullName} - {patient.email}
              </option>
           ))}
            </select> }
            </div>  



  
    { !showCheckout && <div className="card mt-4 w-[80%] text-gray-200 checkout rounded-[9px_9px_19px_19px]"> 
        <>
  <label className="title text-xl font-semibold">Checkout</label> 
  <div>
    <p className='font-semibold'>Patient name: {selectedPatient['name']}</p>
  </div>
  <div className="details grid grid-cols-[3fr_1fr] gap-5 p-2">
   
    {Items.map((item)=>(  
   <>
   <span className="text-sm font-semibold">{item.itemName}</span> 
   <span className="text-sm font-semibold">{isNaN(item.Price) ? ( 0 ) : ( `${item.Price}`) }  <span className='ml-1'> x{isNaN(item.itemQuantity) ? ( 0 ) : ( `${item.itemQuantity}`) } </span>  </span> 
   </>
   ))}
  </div>
  <div className="checkout--footer flex items-center justify-between p-2 bg-[#efeff3]">
    <label className="price text-2xl font-black text-[#2B2B2F] relative">
      <sup className="text-sm">$</sup>{totalPrice}
    </label>
    <div onClick={assignInvoice} className="checkout-btn cursor-pointer flex items-center justify-center w-[150px] h-[36px]  from-[#4480FF] to-[#115DFC] bg-gradient-to-b !bg-[linear-gradient(to_bottom,#4480FF,#115DFC)] rounded-lg text-white text-sm font-semibold shadow-[0px_0.5px_0.5px_#EFEFEF,0px_1px_0.5px_rgba(239,239,239,0.5)] transition-all duration-300 ease-in-out appearance-none border-none focus:outline-none">
  Assign invoice
</div>

  </div>  
  </>
</div>
}

        </form> 
      </div> 
      
    </div>
    </>
  );
}

export default InVoice;
