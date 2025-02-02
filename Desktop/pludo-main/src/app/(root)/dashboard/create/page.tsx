'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, Play } from 'lucide-react'
import { GradientButton } from './components/Custom-Button'
import { CustomRadio } from './components/Custom-Radio'
import { CustomSelect } from './components/Custom-Select'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function CreateAgent() {
  const [file, setFile] = useState<File | null>(null)
  const [agentName, setAgentName] = useState('')
  const [subjectArea, setSubjectArea] = useState('')
  const [responseType, setResponseType] = useState('')
  const [complexity, setComplexity] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log({ agentName, subjectArea, responseType, complexity, file })
    // Here you would typically send this data to your backend
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 to-black text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/dashboard" className="text-purple-300 hover:text-purple-200 flex items-center transition-colors duration-300">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </motion.div>

        <motion.h1 
          className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Build Your Custom Agent
        </motion.h1>
        <motion.p 
          className="text-center mb-12 text-xl text-purple-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Customize your own learning assistant for any topic!
        </motion.p>

        <motion.form 
          className="space-y-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="agent-name" className="block text-lg font-medium text-purple-300 mb-2">Name </label>
            <input
              type="text"
              id="agent-name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g., Advanced Calculus Helper"
              className="w-full bg-purple-900 bg-opacity-50 border border-purple-500 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
            />
          </div>

          <CustomSelect
            options={['Mathematics', 'Science', 'Language Arts', 'Social Studies', 'Other']}
            value={subjectArea}
            onChange={setSubjectArea}
            label="Role"
          />

          <div>
            <label htmlFor="course-outline" className="block text-lg font-medium text-purple-300 mb-2">Avatar</label>
            <motion.div 
              className="border-2 border-dashed border-purple-500 rounded-xl p-8 text-center cursor-pointer hover:bg-purple-900 hover:bg-opacity-30 transition duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('course-outline')?.click()}
            >
              <Upload className="h-16 w-16 mx-auto mb-4 text-purple-400" />
              <p className="text-purple-300">
                {file ? file.name : "Drag and drop your course outline here, or click to select a file"}
              </p>
              <input 
                type="file" 
                className="hidden" 
                id="course-outline" 
                onChange={handleFileChange}
              />
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">Custom Behavior Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-purple-300 mb-2">Response Type Preference</label>
                <div className="flex gap-6">
                  {['Text', 'Audio', 'Video'].map((type) => (
                    <CustomRadio
                      key={type}
                      name="response-type"
                      value={type}
                      label={type}
                      checked={responseType === type}
                      onChange={setResponseType}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-lg font-medium text-purple-300 mb-2">Learning Complexity</label>
                <div className="flex gap-6">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <CustomRadio
                      key={level}
                      name="complexity"
                      value={level}
                      label={level}
                      checked={complexity === level}
                      onChange={setComplexity}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <GradientButton
              onClick={() => console.log('Preview agent')}
              className="flex-1 flex items-center justify-center"
            >
              <Play className="h-5 w-5 mr-2" />
              Preview Agent
            </GradientButton>
            <GradientButton type="submit" className="flex-1">
              Create and Save Agent
            </GradientButton>
          </div>
        </motion.form>
      </div>
    </div>
  )
}