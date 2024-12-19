import React from 'react'
const Button = ({text,onclick ,width}) => {  
  return (
<button 
  onClick={onclick}
  style={{ width: width ? `${width}px` : '200px' }}
  className="bg-blue-700 hover:bg-blue-800 p-2 flex justify-center items-center rounded-md text-white"
>
  {text}
</button>
  )
}

export default Button
