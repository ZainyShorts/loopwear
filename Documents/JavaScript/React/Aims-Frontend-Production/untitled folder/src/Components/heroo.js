import React from 'react'
import ded from "../images/ded.png"


const heroo = () => {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100 p-10 lg:p-20  ">
	<div className="box-border w-1700 h-650  p-4 border-4 bg-gray-200 shadow-2xl flex flex-col justify-center  mt-8 mx-auto sm:pt-12 lg:pt-24 lg:flex-row lg:justify-between ">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-xl xl:max-w-lg lg:text-left ">
			<h1 className="text-5xl font-bold leadi sm:text-6xl">Scriber<br></br>
				<span className="text-blue-400 inline">New Future </span> of HealthCare is comming Now ...
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12">Description
				<br className="hidden md:inline lg:hidden"/>
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start ">
				<a rel="noopener noreferrer" href=",," className="px-6 py-12 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900 ">About Us</a>
			</div>
		</div>
		<div className="flex items-center justify-center mt-[2cm]  lg:mt-0 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 mb-[3cm]">
			<img src={ded} alt="" className=" mb-0 scale-105 object-contain h-74 sm:h-76 lg:h-112 xl:h-124 2xl:h-128 " />
		</div>
	</div>
   
</section>
  )
}

export default heroo