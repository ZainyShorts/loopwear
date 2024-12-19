// import React, { useState } from "react";

// const ReportGenerator = () => {
//   const [selectedTab, setSelectedTab] = useState("Re-evaluation");

//   return (
//     <div className="bg-slate-800 min-h-screen flex items-center justify-center p-6">
//       <div className="bg-slate-800 border-[1px] border-grey rounded-lg shadow-xl w-full max-w-5xl p-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row justify-between items-center">
//           <h1 className="text-white text-2xl font-bold mb-6 lg:mb-0">
//             Medical Note Generator
//           </h1>
//           <div className="flex gap-4">
//             {["Initial Examination", "Follow-up Visit", "SOAP Note", "Re-evaluation"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedTab(tab)}
//                 className={`px-6 py-3 rounded-lg text-white font-semibold ${
//                   selectedTab === tab ? "bg-blue-500 shadow-md" : "bg-slate-700"
//                 } hover:bg-blue-600 transition-all duration-300`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Textarea */}
//         <textarea
//           className="w-full h-64 bg-slate-900 text-white mt-6 p-5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
//           placeholder="Type your notes here..."
//         ></textarea>

//         {/* Footer Button */}
//         <div className="flex justify-end mt-6">
//           <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 shadow-md">
//             Generate Note
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportGenerator;

// import React, { useState } from "react";

// const ReportGenerator = () => {
//   const [selectedTab, setSelectedTab] = useState("Re-evaluation");

//   return (
//     <div className="bg-slate-800 min-h-screen flex items-center justify-center p-6">
//       <div className="bg-slate-800 border-[1px] border-grey rounded-lg shadow-xl w-full max-w-5xl p-8">
//         {/* Header */}
//         <div className="flex flex-col">
//           <h1 className="text-white text-2xl font-bold mb-6 text-center">
//             Medical Note Generator
//           </h1>
//           <div className="grid grid-cols-2 gap-4">
//             {["Initial Examination", "SOAP Note", "Follow-up Visit", "Re-evaluation"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedTab(tab)}
//                 className={`px-6 py-3 rounded-lg text-white font-semibold ${
//                   selectedTab === tab ? "bg-blue-500 shadow-md" : "bg-slate-700"
//                 } hover:bg-blue-600 transition-all duration-300`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Textarea */}
//         <textarea
//           className="w-full h-64 bg-slate-900 text-white mt-6 p-5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
//           placeholder="Type your notes here..."
//         ></textarea>

//         {/* Footer Button */}
//         <div className="flex justify-end mt-6">
//           <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 shadow-md">
//             Generate Note
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportGenerator;


import React, { useState } from "react";
// import ReactQuill from "react-quill"; // Import ReactQuill
// import "react-quill/dist/quill.snow.css"; // Import styles for ReactQuill

const ReportGenerator = () => {
  const [selectedTab, setSelectedTab] = useState("Re-evaluation");
  const [editorContent, setEditorContent] = useState("");

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-800 border-[1px] border-grey rounded-lg shadow-xl w-full max-w-5xl p-8">
        {/* Header */}
        <div className="flex flex-col">
          <h1 className="text-white text-2xl font-bold mb-6 text-center">
            Medical Note Generator
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {["Initial Examination", "SOAP Note", "Follow-up Visit", "Re-evaluation"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                  selectedTab === tab
                    ? "bg-blue-500 shadow-md"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Text Editor */}
        <div className="mt-6">
          {/* <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            className="bg-slate-900 text-white rounded-lg shadow-sm"
            placeholder="Type your notes here..."
          /> */}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-green-500 w-full text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 shadow-md">
            Generate Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;

