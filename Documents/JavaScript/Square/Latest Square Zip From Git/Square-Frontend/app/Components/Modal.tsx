import React from 'react';
import { useAuth } from "../Context/authcontext";

const MyModal: React.FC = () => {
  const { formData, setFormData, modal, setModal } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    setModal(false); // Close modal after submission
  };

  if (!modal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-90 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Square Catalog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex justify-between">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Submit
            </button>
            <button type="button" onClick={() => setModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyModal;
