import React from "react";

const Modal = ({ open, onClose, children, redirect }) => {
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors p-20 ${open ? "visible bg-black/20 p-20 items-center " : "invisible"}`} >
      <div className={`bg-white rounded-lg shadow p-6 transition-all ${open ? "scale-100 opacity-100 w-[15cm] bg-red-50" : " scale-110 opacitiy-0"}`} onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600" onClick={onClose}>
          x
        </button>
        {children}  
        <div className="pt-4">
        <button type="button"  onClick={onClose} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{"Yes, I agree"}</button>
        <button type="button"  onClick={redirect} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-600 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-600 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{"I don't agree"}</button>

            </div>
      </div>
    
    </div>
  );
};

export default Modal;



















// import React, { useState } from 'react';
// import { Button, Modal } from 'flowbite-react';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';

// const Modalee = () => {
//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
//       <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
//         <Modal.Header />
//         <Modal.Body>
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
//             <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
//               Are you sure you want to delete this product?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button color="failure" onClick={() => setOpenModal(false)}>
//                 {"Yes, I'm sure"}
//               </Button>
//               <Button color="gray" onClick={() => setOpenModal(false)}>
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Modalee;
