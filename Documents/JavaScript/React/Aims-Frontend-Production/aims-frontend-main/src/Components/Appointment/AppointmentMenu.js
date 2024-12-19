import React, { useContext } from "react";
import { GlobalStateContext } from "../../Context/GlobalStateContext";
import { Router } from "react-router-dom";

const AppointmentMenu = () => {
  const { navigate } = useContext(GlobalStateContext);

  const services = [
    {
      icon: '📅',
      title: 'Create Appointment',
      description: 'Schedule and manage your appointments with ease.',
      buttonLabel: 'Schedule Now',
      url: "/Appointment"
    },
    {
      icon: '🗓️',
      title: 'View Appointment Calendar',
      description: 'Check your upcoming appointments in the calendar.',
      buttonLabel: 'View Calendar',
      url: "/Calendar"
    },
    {
      icon: '🔄',
      title: 'Change Appointment Status',
      description: 'Update the status of your appointments effortlessly.',
      buttonLabel: 'Update Status',
      url: "/AppointmentStatus"
    },
    {
      icon: '📝',
      title: 'Reports',
      description: 'Download your detailed monthly and weekly reports, including patient registrations, appointment schedules, and records of created or canceled bookings.',
      buttonLabel: 'Generate Report',
      url: '/AppointmentSelection'
    },
  ];

  const navigater = (path) => {
    if (path === '/') {
      alert('Not available right now.');
    } else {
      navigate(path)
    }
  };

  return (
    <section className="dark:bg-slate-900 fade-in-animation p-8 flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-4xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-4 md:p-6 text-center flex flex-col justify-between"
            style={{ minHeight: '180px' }} 
          >
            <div>
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-xl md:text-2xl mb-2 dark:text-white text-black">{service.title}</h3>
              <p className="text-sm md:text-base mb-4 dark:text-gray-400">{service.description}</p>
            </div>
            <button
              onClick={() => navigater(service.url)}
              className="bg-indigo-600 text-white py-2 px-4 md:py-3 md:px-6 mx-auto rounded-lg w-[60%] hover:bg-indigo-700"
              style={{ marginTop: 'auto' }}
            >
              {service.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppointmentMenu;
