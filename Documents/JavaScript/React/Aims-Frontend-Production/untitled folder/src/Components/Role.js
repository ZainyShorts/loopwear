import React from 'react';
import { motion } from 'framer-motion';
import Img3 from "../images/patt.png";
import Img1 from "../images/off.png";
import Img2 from "../images/docc1.png";
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
const ProductsData = [
  // {
  //   id: 1,
  //   img: Img1,
  //   title: "Front Desk Desk",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  // },
  {
    id: 2,
    img: Img2,
    title: "Doctor",
    description:
      "Join our medical software supply company and revolutionize your practice with our exclusive AI-powered membership.",
  },
  // {
  //   id: 3,
  //   img: Img3,
  //   title: "Patient",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  // },
];

const Hero = () => {
  return (
    <div className="
    bg-gradient-to-r from-amber-200
     py-24 h-screen">
      <div className="container rounded-xl bg-black mx-auto my-28 px-4 md:px-16" style={{background: "#1F51FFA1"}}>
        <div className="text-center mb-52">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-sans border-r-4 border-white pr-6 whitespace-nowrap">
            Choose Your Role ...
          </h1>
        </div>
        <div className="flex justify-center items-center">
          {ProductsData.map((data) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 group max-w-sm w-full ">
                <div className="absolute inset-x-0 top-0 transform -translate-y-1/2 w-full flex justify-center">
                  <motion.img
                    src={data.img}
                    alt={data.title}
                    className="w-32 h-48 object-cover rounded-xl shadow-lg transform group-hover:scale-110 transition duration-500"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  />
                </div>
                <div className="pt-24 pb-6 px-6 text-center">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">{data.title}</h2>
                  <p className="text-gray-500 group-hover:text-gray-700 transition duration-300 text-sm mb-4">
                    {data.description}
                  </p>
                  <Link to="/login">
                    <button className="mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:scale-105 transition duration-300 text-white py-2 px-6 rounded-full">
                      Click
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      
      </div>
    </div>
  );
};

export default Hero;
