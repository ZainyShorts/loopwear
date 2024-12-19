import React from 'react'

function Loader() {
  return (
    <div class="p-8 h-[100vh] flex items-center justify-center ">
    <span class="circle animate-loader"></span>
    <span class="circle animate-loader animation-delay-200"></span>
    <span class="circle animate-loader animation-delay-400"></span>
  </div>

  )
}

export default Loader
