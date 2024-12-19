import React from 'react'

const Footer = () => {
  return (
    <div class="w-full bg-gray-800 px-6">
      <div class=" mx-auto py-5 flex items-center justify-between">
        <div class="flex items-center gap-2 ">
          <img class="w-8" src="/logo.png" alt="" />
        </div>
        {/* <span class="hidden md:block font-medium text-white"
          >© 2024  Aims. All Rights Reserved.</span
        > */}
        <span class="hidden md:block font-medium text-white"
          >CONTACT US TO GAIN ACCESS 786-643-2099</span
        >
        
        <div class="flex gap-3 ">
          <img class="w-4 cursor-pointer" src="/facebook.png" alt="" />
          <img class="w-4 cursor-pointer" src="/instagram.png" alt="" />
          <img class="w-4 cursor-pointer" src="/twitter.png" alt="" />
          <img class="w-4 cursor-pointer" src="/linkedin.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer