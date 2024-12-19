
import React, { useState,useRef } from 'react';
import { FaRegListAlt, FaRegCalendarAlt, FaRegStickyNote, FaRegFileAlt, FaRegClock } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
import ConfirmationModal from '../../Modal/ConfirmationModal'
// Fake data
const initialMeetingData = {
  objectives: "Discuss project updates, plan next steps, and address any issues.",
  highlights: "Project on track, team successfully met milestones.",
  agendaItems: [
    {
      speaker: "John Doe",
      keyPoints: "Reviewed project progress and challenges.",
      decisions: "Decided to move forward with the new development strategy.",
      actionItems: [
        {
          name: "Update project plan",
          person: "Alice Smith",
          dueDate: "2024-07-30",
          dependencies: "Approval from the client",
          resourcesNeeded: "Project management software",
          successCriteria: "Updated plan reviewed and approved",
          progressTracking: "Weekly progress reports"
        }
      ]
    },
    {
      speaker: "Jane Doe",
      keyPoints: "Addressed technical issues and proposed solutions.",
      decisions: "Approved new tech stack.",
      actionItems: [
        {
          name: "Implement new tech stack",
          person: "Bob Johnson",
          dueDate: "2024-08-05",
          dependencies: "Vendor support",
          resourcesNeeded: "Tech stack documentation",
          successCriteria: "Tech stack implemented and tested",
          progressTracking: "Bi-weekly technical reviews"
        }
      ]
    }
  ],
  followUpItems: [
    "Schedule follow-up meeting to review progress on action items.",
    "Prepare a detailed report on the new tech stack implementation."
  ],
  decisionLog: [
    "Approved new development strategy.",
    "Accepted proposal for tech stack change."
  ],
  issuesRisks: [
    {
      issue: "Potential delay in tech stack implementation.",
      mitigationStrategy: "Work with vendor to expedite support."
    }
  ],
  nextSteps: [
    "Finalize updated project plan.",
    "Begin implementation of new tech stack."
  ],
  attachments: [
    "Project Plan Document",
    "Tech Stack Proposal"
  ]
};

// MeetingTemplate component
const MeetingTemplate = () => {
  const sec1 = useRef()
  const sec2 = useRef()
  const sec3 = useRef()
  const sec4 = useRef()
  const sec5 = useRef()
  const sec6 = useRef()
  const sec7 = useRef()
  const sec8 = useRef()

  const [meetingData, setMeetingData] = useState(initialMeetingData);

  const handleInputChange = (section, index, key, value) => {
    const updatedMeetingData = { ...meetingData };
    if (section === 'agendaItems') {
      updatedMeetingData[section][index][key] = value;
    } else if (section === 'actionItems') {
      const { agendaIndex, actionIndex } = index;
      updatedMeetingData.agendaItems[agendaIndex].actionItems[actionIndex][key] = value;
    }else if(section === 'objectives')
    {
      updatedMeetingData['objectives'] = value
    }
    else if(section === 'highlights')
    {
      updatedMeetingData['highlights'] = value
    }  
    else {
      updatedMeetingData[section][index] = value;
    }
    setMeetingData(updatedMeetingData);
  };
  
  const [currentRef,setCurrentRef]=useState(0)
  const uiRemover =(currentRef)=>{
      currentRef.current.style.display = "none"
    setIsModalOpen(false);
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false);

   const modalOpener = (ref) =>{
    setIsModalOpen(true)
    setCurrentRef(ref)
   }

  return (
    <>
    <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onDelete={()=>uiRemover(currentRef)}
      />

    <div className="p-8 max-w-[210mm] mx-auto border border-gray-300 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 flex items-center text-teal-700">
        <FaRegListAlt className="mr-3 text-teal-600" /> Meeting Template
      </h1>
      
      <section ref={sec1} className="mb-6 border border-teal-200 bg-white p-4 rounded-lg shadow-sm">
        <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center mb-2 text-teal-600">
          <FaRegCalendarAlt className="mr-2 text-teal-500" /> Meeting Objectives
        </h2>
        <MdCancel onClick={()=>modalOpener(sec1)} className='text-teal-500 size-5 cursor-pointer'/>
        </div>
        <textarea
          value={meetingData.objectives}
          onChange={(e) => handleInputChange('objectives', 0, 'objectives', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </section>
      
      <section ref={sec2} className="mb-6 border border-teal-200 bg-white p-4 rounded-lg shadow-sm">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center mb-2 text-teal-600">
          <FaRegStickyNote className="mr-2 text-teal-500" /> Highlights
        </h2>
        <MdCancel onClick={()=>modalOpener(sec2)} className='text-teal-500 size-5 cursor-pointer'/>
        </div>
        <textarea
          value={meetingData.highlights}
          onChange={(e) => handleInputChange('highlights', 1, 'highlights', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </section>
      
      <section ref={sec3} className="mb-6 border border-teal-200 bg-white p-4 rounded-lg shadow-sm">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center mb-2 text-teal-600">
          <FaRegFileAlt className="mr-2 text-teal-500" /> Detailed Notes by Agenda Items
        </h2>
        <MdCancel onClick={()=>modalOpener(sec3)} className='text-teal-500 size-5 cursor-pointer'/>
        </div>
        {meetingData.agendaItems.map((item, index) => (
          <div key={index} className="mb-4 border border-teal-300 bg-gray-50 p-4 rounded-lg shadow-sm">
            
            <h3 className="font-semibold flex items-center mb-2 text-teal-700">
              <FaRegStickyNote className="mr-2 text-teal-600" /> Speaker: 
              <input
                value={item.speaker}
                onChange={(e) => handleInputChange('agendaItems', index, 'speaker', e.target.value)}
                className="ml-2 p-1 border border-gray-300 rounded"
              />
            </h3>
            <p>
              <strong>Key Points Discussed:</strong> 
              <textarea
                value={item.keyPoints}
                onChange={(e) => handleInputChange('agendaItems', index, 'keyPoints', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </p>
            <p>
              <strong>Decisions Made:</strong> 
              <textarea
                value={item.decisions}
                onChange={(e) => handleInputChange('agendaItems', index, 'decisions', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </p>
            <h4 className="font-semibold flex items-center mt-4 mb-2 text-teal-700">
              <FaRegClock className="mr-2 text-teal-600" /> Action Items:
            </h4>
            <ul className="list-disc pl-5">
              {item.actionItems.map((action, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{action.name}</strong><br />
                  <label>
                    Person: 
                    <input
                      value={action.person}
                      onChange={(e) => handleInputChange('actionItems', { agendaIndex: index, actionIndex: idx }, 'person', e.target.value)}
                      className="ml-2 p-1 border border-gray-300 rounded"
                    />
                  </label><br />
                  <label>
                    Due Date: 
                    <input
                      type="date"
                      value={action.dueDate}
                      onChange={(e) => handleInputChange('actionItems', { agendaIndex: index, actionIndex: idx }, 'dueDate', e.target.value)}
                      className="ml-2 p-1 border border-gray-300 rounded"
                    />
                  </label><br />
                  <label>
                    Dependencies: 
                    <textarea
                      value={action.dependencies}
                      onChange={(e) => handleInputChange('actionItems', { agendaIndex: index, actionIndex: idx }, 'dependencies', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </label><br />
                  <label>
                    Resources Needed: 
                    <textarea
                      value={action.resourcesNeeded}
                      onChange={(e) => handleInputChange('actionItems', { agendaIndex: index, actionIndex: idx }, 'resourcesNeeded', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </label><br />
                  <label>
                    Success Criteria: 
                    <textarea
                      value={action.successCriteria}
                      onChange={(e) => handleInputChange('actionItems', { agendaIndex: index, actionIndex: idx }, 'successCriteria', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </label><br />
                  <label>
                    Progress Tracking: 
                    <textarea
                      value={action.progressTracking}
                      onChange={(e) => handleInputChange('actionItems', { agendaIndex: index, actionIndex: idx }, 'progressTracking', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      
      <section ref={sec4} className="mb-6 border border-teal-200 bg-white p-4 rounded-lg shadow-sm">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center mb-2 text-teal-600">
          <FaRegStickyNote className="mr-2 text-teal-500" /> Follow-Up Items
        </h2>
        <MdCancel onClick={()=>modalOpener(sec4)} className='text-teal-500 size-5 cursor-pointer'/>
        </div>
        <ul className="list-disc pl-5">
          {meetingData.followUpItems.map((item, index) => (
            <span key={index}>
              <textarea
                value={item}
                onChange={(e) => handleInputChange('followUpItems', index, 'followUpItems', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </span>
          ))}
        </ul>
      </section>
      
      <section ref={sec5} className="mb-6 border border-teal-200 bg-white p-4 rounded-lg shadow-sm">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center mb-2 text-teal-600">
          <FaRegFileAlt className="mr-2 text-teal-500" /> Decision Log
        </h2>
        <MdCancel onClick={()=>modalOpener(sec5)} className='text-teal-500 size-5 cursor-pointer'/>
        </div>
        <ul className="list-disc pl-5">
          {meetingData.decisionLog.map((decision, index) => (
            <span key={index}>
              <textarea
                value={decision}
                onChange={(e) => handleInputChange('decisionLog', index, 'decisionLog', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </span>
          ))}
        </ul>
      </section>
      
      <section ref={sec6} className="mb-6 border border-teal-200 bg-white p-4 rounded-lg shadow-sm">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center mb-2 text-teal-600">
          <FaRegStickyNote className="mr-2 text-teal-500" /> Issues/Risks Identified and Mitigation Strategies
        </h2>
        <MdCancel onClick={()=>modalOpener(sec6)} className='text-teal-500 size-5 cursor-pointer'/>
        </div>
        {meetingData.issuesRisks.map((item, index) => (
          <div key={index} className="mb-2 ml-6">
            <p><strong>Issue:</strong> 
              <textarea
                value={item.issue}
                onChange={(e) => handleInputChange('issuesRisks', index, 'issue', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </p>
            <p>
                <strong>Mitigation Strategy:</strong> 
              <textarea
                value={item.mitigationStrategy}
                onChange={(e) => handleInputChange('issuesRisks', index, 'mitigationStrategy', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </p>
          </div>
        ))}
      </section>
      
      <section ref={sec7} className="mb-6 border border-teal-200 bg-white p-4 rounded-lg shadow-sm">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center mb-2 text-teal-600">
          <FaRegClock className="mr-2 text-teal-500" /> Next Steps
        </h2>
        <MdCancel onClick={()=>modalOpener(sec7)} className='text-teal-500 size-5 cursor-pointer'/>
        </div>
        <ul className="list-disc pl-5">
          {meetingData.nextSteps.map((step, index) => (
            <span key={index}>
              <textarea
                value={step}
                onChange={(e) => handleInputChange('nextSteps', index, 'nextSteps', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </span>
          ))}
        </ul>
      </section>
      
      <section ref={sec8} className="mb-6 border border-teal-200 bg-white p-4 rounded-lg shadow-sm">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-semibold flex items-center mb-2 text-teal-600">
          <FaRegFileAlt className="mr-2 text-teal-500" /> Attachments/Resources
        </h2>
        <MdCancel onClick={()=>modalOpener(sec8)} className='text-teal-500 size-5 cursor-pointer'/>
        </div>
        <ul className="list-disc pl-5">
          {meetingData.attachments.map((attachment, index) => (
            <span key={index}>
              <textarea
                value={attachment}
                onChange={(e) => handleInputChange('attachments', index, 'attachments', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </span>
          ))}
        </ul>
      </section>

    </div>
    </>

  );
};

export default MeetingTemplate;

