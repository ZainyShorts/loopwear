import React from 'react'

function AppointmentModal({data , onClose}) {
  return (
    <div className='p-4 relative flex text-gray-200  justify-center items-center dark:bg-slate-900 rounded-lg  border-gray-600 shadow-lg w-[80%] md:w-[55%] h-[70%]'> 
    <div className="relative h-full w-full ">
  <div className="overflow-y-auto  h-[82%] w-full">
    <table className="min-w-full table-auto border-collapse">
      <thead className="rounded-md">
        <tr className="bg-blue-500">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Time</th>
        </tr>
      </thead>

      <tbody>
        {data.map((app) => (
          <tr className="" key={app.id}>
            <td className="text-center px-4 py-4 border-b border-gray-600">{app.name}</td>
            <td className="text-center px-4 py-4 border-b border-gray-600">
              {app.email.slice(0, 3)}...{app.email.split('@')[1]}
            </td>
            <td className="text-center px-4 py-4 border-b border-gray-600">{app.status}</td>
            <td className="text-center px-4 py-4 border-b border-gray-600">{app.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <button onClick={onClose} className="p-3 w-full bg-blue-500 text-gray-100 absolute bottom-2 mx-auto px-10 rounded-md">
    Close
  </button>
</div>

    </div>
  )
}

export default AppointmentModal
