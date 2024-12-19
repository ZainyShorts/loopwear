import React, { useEffect } from 'react';

const MainModal = ({ modalMessage, setIsOpen }) => {
  // Function to handle clicks outside the modal
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Use useEffect to handle keydown events for closing the modal with the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative p-8 bg-gray-200 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col text-center items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">{modalMessage}</h2>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="px-4 py-2 mt-8 bg-blue-500 w-[30%] text-white rounded-md hover:bg-blue-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MainModal;
