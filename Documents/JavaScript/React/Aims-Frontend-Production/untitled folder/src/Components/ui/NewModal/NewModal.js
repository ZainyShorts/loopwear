import React from 'react'

const NewModal = ({head, desc , close , confirm}) => {
  return ( 
    <div className=' flex justify-center items-center'>
<div class=" w-[85vw]   md:w-[600px]  dark:bg-slate-900 rounded-xl overflow-hidden">
  <div class=" pt-6 pb-8 px-5 text-start">
   
    <h4 class="text-xl text-gray-100 font-semibold mb-5">
     {head}
    </h4>
    <p class="text-gray-300 font-medium">
      {desc}
    </p>
  </div>
  <div class="pt-5 pb-6 px-6 flex justify-end text-right  dark:bg-slate-900 -mb-2">
    <a 
     onClick={close}
      class="inline-block cursor-pointer w-[100px] p-2 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 dark:bg-slate-800 hover:bg-gray-900 rounded-md transition duration-200"
      > {confirm ? 'No' : 'Close'} </a
    > 
     {confirm && (  
       <a 
       onClick={confirm}
       class="inline-block  cursor-pointer w-[100px] p-2  mb-2 text-center font-semibold leading-6 text-blue-50 bg-blue-800 hover:bg-blue-900 rounded-md transition duration-200"
       >Yes</a>
     )}
      
  </div>
</div>
</div>
  )
}

export default NewModal
