import React from 'react'

const Loading = () => {
  return (
    <div class="p-8 h-[100vh] flex items-center justify-center dark:bg-slate-900">
  <span class="circle animate-loader"></span>
  <span class="circle animate-loader animation-delay-200"></span>
  <span class="circle animate-loader animation-delay-400"></span>
</div>
  )
}

export default Loading