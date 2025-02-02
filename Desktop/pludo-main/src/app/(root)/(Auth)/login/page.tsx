// import React from 'react'
// import LoginComponent from '../component/Login'

// const page = () => {
//   return (
//     <div className='h-screen flex justify-center items-center bg-custom-gradient '>
//       <LoginComponent/>
//     </div>
//   )
// }

// export default page

import LoginComponent from "../component/Login"

// Mark page as client component since it uses browser-only features
export default function LoginPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-custom-gradient">
      <LoginComponent />
    </div>
  )
}

