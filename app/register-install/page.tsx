'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiArrowRight, FiArrowLeft, FiCheck, FiUpload, FiX } from 'react-icons/fi'

interface FormData {
  agency: string
  distributor: string
  intersections: string
  estimatedDate: string
  cabinetType: string[]
  signalPhasingFiles: File[]
  signalTimingFiles: File[]
  firstName: string
  lastName: string
  email: string
  phone: string
}

export default function RegisterInstall() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    agency: '',
    distributor: '',
    intersections: '',
    estimatedDate: '',
    cabinetType: [],
    signalPhasingFiles: [],
    signalTimingFiles: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const steps = [
    {
      id: 'agency',
      title: 'Agency Information',
      question: 'What is your agency name?',
      type: 'text',
      placeholder: 'Enter agency name',
      field: 'agency'
    },
    {
      id: 'distributor',
      title: 'Distributor',
      question: 'Who is your distributor?',
      type: 'text',
      placeholder: 'Enter distributor name',
      field: 'distributor'
    },
    {
      id: 'intersections',
      title: 'Intersection Names',
      question: 'Enter the intersection name(s)',
      type: 'textarea',
      placeholder: 'Enter intersection names (one per line for multiple intersections)',
      field: 'intersections'
    },
    {
      id: 'estimated-date',
      title: 'Estimated Install Date',
      question: 'When do you estimate the installation will occur?',
      type: 'date',
      field: 'estimatedDate'
    },
    {
      id: 'cabinet-type',
      title: 'Cabinet Type',
      question: 'Select all applicable cabinet types',
      type: 'multi-select',
      options: [
        { value: 'type-170', label: 'Type 170' },
        { value: 'type-332', label: 'Type 332' },
        { value: 'type-2070', label: 'Type 2070' },
        { value: 'nema-ts1', label: 'NEMA TS-1' },
        { value: 'nema-ts2', label: 'NEMA TS-2' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'signal-phasing',
      title: 'Signal Phasing',
      question: 'Upload signal phasing file(s)',
      type: 'file-upload',
      field: 'signalPhasingFiles'
    },
    {
      id: 'signal-timing',
      title: 'Signal Timing',
      question: 'Upload signal timing file(s)',
      type: 'file-upload',
      field: 'signalTimingFiles'
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      question: 'Provide your contact details',
      type: 'contact'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // In a real implementation, you'd upload files to cloud storage first
      // For now, we'll store file names
      const submissionData = {
        ...formData,
        signalPhasingFiles: formData.signalPhasingFiles.map(f => f.name),
        signalTimingFiles: formData.signalTimingFiles.map(f => f.name),
      }

      const response = await fetch('/api/installation-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const data = await response.json()
      
      if (data.success) {
        setShowSuccess(true)
      } else {
        console.error('Failed to submit registration')
      }
    } catch (error) {
      console.error('Error submitting registration:', error)
    }
  }

  const resetForm = () => {
    setCurrentStep(0)
    setFormData({
      agency: '',
      distributor: '',
      intersections: '',
      estimatedDate: '',
      cabinetType: [],
      signalPhasingFiles: [],
      signalTimingFiles: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    })
    setShowSuccess(false)
  }

  const handleFileUpload = (field: 'signalPhasingFiles' | 'signalTimingFiles', files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files)
      setFormData({ ...formData, [field]: [...formData[field], ...fileArray] })
    }
  }

  const removeFile = (field: 'signalPhasingFiles' | 'signalTimingFiles', index: number) => {
    const newFiles = formData[field].filter((_, i) => i !== index)
    setFormData({ ...formData, [field]: newFiles })
  }

  const canProceed = () => {
    const step = steps[currentStep]
    
    if (step.type === 'text' && step.field) {
      return formData[step.field as keyof FormData] !== ''
    }
    if (step.type === 'textarea' && step.field) {
      return formData[step.field as keyof FormData] !== ''
    }
    if (step.type === 'date' && step.field) {
      return formData[step.field as keyof FormData] !== ''
    }
    if (step.type === 'multi-select') {
      return formData.cabinetType.length > 0
    }
    if (step.type === 'file-upload' && step.field) {
      return formData[step.field as keyof FormData].length > 0
    }
    if (step.type === 'contact') {
      return formData.firstName && formData.lastName && formData.email && formData.phone
    }
    return false
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Register <span className="text-primary-300">Install</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Register your upcoming NoTraffic installation with all necessary details
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-8 md:p-12 border border-dark-700"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold mb-2">
                    {currentStepData.title}
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    {currentStepData.question}
                  </p>

                  {/* Text Input */}
                  {currentStepData.type === 'text' && currentStepData.field && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={formData[currentStepData.field as keyof FormData] as string}
                        onChange={(e) => setFormData({ ...formData, [currentStepData.field!]: e.target.value })}
                        placeholder={currentStepData.placeholder}
                        className="w-full px-6 py-4 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors text-lg"
                        autoFocus
                      />
                    </div>
                  )}

                  {/* Textarea Input */}
                  {currentStepData.type === 'textarea' && currentStepData.field && (
                    <div className="space-y-4">
                      <textarea
                        value={formData[currentStepData.field as keyof FormData] as string}
                        onChange={(e) => setFormData({ ...formData, [currentStepData.field!]: e.target.value })}
                        placeholder={currentStepData.placeholder}
                        rows={6}
                        className="w-full px-6 py-4 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors text-lg resize-none"
                        autoFocus
                      />
                    </div>
                  )}

                  {/* Date Input */}
                  {currentStepData.type === 'date' && currentStepData.field && (
                    <div className="space-y-4">
                      <input
                        type="date"
                        value={formData[currentStepData.field as keyof FormData] as string}
                        onChange={(e) => setFormData({ ...formData, [currentStepData.field!]: e.target.value })}
                        className="w-full px-6 py-4 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors text-lg"
                        autoFocus
                      />
                    </div>
                  )}

                  {/* Multi-Select */}
                  {currentStepData.type === 'multi-select' && currentStepData.options && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentStepData.options.map((option) => {
                          const selected = formData.cabinetType.includes(option.value)
                          return (
                            <button
                              key={option.value}
                              onClick={() => {
                                const newValue = selected
                                  ? formData.cabinetType.filter(v => v !== option.value)
                                  : [...formData.cabinetType, option.value]
                                setFormData({ ...formData, cabinetType: newValue })
                              }}
                              className={`p-6 border rounded-lg transition-all duration-300 text-left ${
                                selected
                                  ? 'bg-primary-500/20 border-primary-500'
                                  : 'glass border-dark-700 hover:bg-dark-800 hover:border-primary-500/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                  selected ? 'border-primary-500 bg-primary-500' : 'border-dark-600'
                                }`}>
                                  {selected && <FiCheck className="w-4 h-4 text-white" />}
                                </div>
                                <span className="text-lg font-semibold">{option.label}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* File Upload */}
                  {currentStepData.type === 'file-upload' && currentStepData.field && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-dark-700 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                        <input
                          type="file"
                          multiple
                          id="file-upload"
                          onChange={(e) => handleFileUpload(currentStepData.field as 'signalPhasingFiles' | 'signalTimingFiles', e.target.files)}
                          className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <FiUpload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-lg font-semibold mb-2">Click to upload files</p>
                          <p className="text-sm text-gray-500">or drag and drop</p>
                        </label>
                      </div>

                      {/* Display uploaded files */}
                      {formData[currentStepData.field as keyof FormData].length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400 font-semibold">Uploaded Files:</p>
                          {(formData[currentStepData.field as keyof FormData] as File[]).map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg border border-dark-700">
                              <span className="text-sm">{file.name}</span>
                              <button
                                onClick={() => removeFile(currentStepData.field as 'signalPhasingFiles' | 'signalTimingFiles', index)}
                                className="text-red-500 hover:text-red-400 transition-colors"
                              >
                                <FiX className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contact Information */}
                  {currentStepData.type === 'contact' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                          placeholder="1-202-800-1890"
                        />
                      </div>
                    </div>
                  )}

                  {/* Continue Button */}
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="w-full mt-6 px-6 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {currentStep === steps.length - 1 ? 'Submit Registration' : 'Continue'}
                    <FiArrowRight />
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="mt-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiArrowLeft />
                  Previous Step
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-xl p-12 border border-dark-700 text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Registration Submitted!</h3>
              <p className="text-xl text-gray-400 mb-8">
                Thank you for registering your installation. Our team will review your information and contact you shortly.
              </p>
              <button
                onClick={resetForm}
                className="px-6 py-3 glass hover:bg-dark-800 rounded-lg font-semibold transition-all duration-300"
              >
                Submit Another Registration
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

