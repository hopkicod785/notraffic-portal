'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiArrowRight, FiArrowLeft, FiCheck, FiDownload } from 'react-icons/fi'

interface Answer {
  [key: string]: string | number | string[] | Record<string, number>
}

export default function InstallationTool() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer>({})
  const [showResults, setShowResults] = useState(false)

  // Equipment state
  const [equipment, setEquipment] = useState({
    nexusUnit: 0,
    sensorPowerUnit: 0,
    type1Sensor: 0,
    type2Sensor: 0
  })

  // Auxiliary equipment state
  const [auxEquipment, setAuxEquipment] = useState({
    shelfMountKit: 0,
    rackMountKit: 0,
    wifiRepeater: 0,
    c1Harness: 0
  })

  const steps = [
    {
      id: 'deployment-type',
      title: 'Deployment Type',
      question: 'What type of deployment are you planning?',
      options: [
        { value: 'single', label: 'Single Intersection', description: 'One intersection with basic setup' },
        { value: 'multiple', label: 'Multiple Intersections', description: '2-10 intersections in one area' },
        { value: 'corridor', label: 'Traffic Corridor', description: 'Coordinated corridor management' },
        { value: 'city-wide', label: 'City-Wide System', description: 'Full city traffic management' }
      ]
    },
    {
      id: 'cabinet-type',
      title: 'Cabinet Type',
      question: 'Select all cabinet types that apply',
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
      id: 'intersections',
      title: 'Number of Intersections',
      question: 'How many intersections will be covered?',
      type: 'number',
      placeholder: 'Enter number of intersections'
    },
    {
      id: 'equipment',
      title: 'Equipment Quantities',
      question: 'Select quantities for each equipment type',
      type: 'equipment-quantity'
    },
    {
      id: 'auxiliary',
      title: 'Auxiliary Equipment',
      question: 'Select quantities for auxiliary equipment',
      type: 'auxiliary-quantity'
    },
    {
      id: 'timeline',
      title: 'Implementation Timeline',
      question: 'What is your preferred implementation timeline?',
      options: [
        { value: 'urgent', label: 'Immediate (1-3 months)', description: 'Urgent deployment needed' },
        { value: 'standard', label: 'Standard (3-6 months)', description: 'Normal project timeline' },
        { value: 'planned', label: 'Planned (6-12 months)', description: 'Long-term planning' },
        { value: 'future', label: 'Future (12+ months)', description: 'Future consideration' }
      ]
    }
  ]

  const handleAnswer = (value: string | number | string[]) => {
    const updatedAnswers = { ...answers, [steps[currentStep].id]: value }
    setAnswers(updatedAnswers)
    
    // If single intersection is selected, skip the intersections question
    if (steps[currentStep].id === 'deployment-type' && value === 'single') {
      updatedAnswers['intersections'] = 1 // Auto-set to 1
    }
    
    if (currentStep < steps.length - 1) {
      // Skip intersections question if single intersection was selected
      const nextStep = (steps[currentStep].id === 'cabinet-type' && updatedAnswers['deployment-type'] === 'single')
        ? currentStep + 2  // Skip the intersections question
        : currentStep + 1
      
      setTimeout(() => setCurrentStep(nextStep), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      // Skip intersections question when going back if single intersection was selected
      const prevStep = (steps[currentStep].id === 'equipment' && answers['deployment-type'] === 'single')
        ? currentStep - 2  // Skip back over the intersections question
        : currentStep - 1
      
      setCurrentStep(prevStep)
    }
  }

  const handleEquipmentContinue = () => {
    setAnswers({ ...answers, equipment: equipment })
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    }
  }

  const handleAuxiliaryContinue = async () => {
    setAnswers({ ...answers, auxiliary: auxEquipment })
    
    // Save to database before showing results
    try {
      const finalData = {
        ...answers,
        auxiliary: auxEquipment,
        deploymentType: answers['deployment-type'],
        cabinetType: answers['cabinet-type'] || [],
        intersections: answers['intersections'],
        timeline: answers['timeline']
      }

      await fetch('/api/installation-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      })
    } catch (error) {
      console.error('Error saving assessment:', error)
    }
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const getRecommendations = () => {
    const recommendations = []
    const deploymentType = answers['deployment-type']
    const cabinetTypes = answers['cabinet-type'] as string[] || []
    const intersections = Number(answers['intersections']) || 1
    const equipmentData = answers['equipment'] as Record<string, number> || equipment
    const auxData = answers['auxiliary'] as Record<string, number> || auxEquipment
    const timeline = answers['timeline']

    // Deployment Summary
    recommendations.push({
      category: 'Deployment Summary',
      items: [
        `Deployment Type: ${deploymentType}`,
        `Number of Intersections: ${intersections}`,
        cabinetTypes.length > 0 ? `Cabinet Types: ${cabinetTypes.join(', ')}` : 'Cabinet Types: Not specified'
      ]
    })

    // Equipment Selected
    const equipmentItems = []
    if (equipmentData.nexusUnit > 0) equipmentItems.push(`${equipmentData.nexusUnit} × Nexus Unit`)
    if (equipmentData.sensorPowerUnit > 0) equipmentItems.push(`${equipmentData.sensorPowerUnit} × Sensor Power Unit`)
    if (equipmentData.type1Sensor > 0) equipmentItems.push(`${equipmentData.type1Sensor} × Type 1 Sensor`)
    if (equipmentData.type2Sensor > 0) equipmentItems.push(`${equipmentData.type2Sensor} × Type 2 Sensor`)

    if (equipmentItems.length > 0) {
      recommendations.push({
        category: 'Primary Equipment',
        items: equipmentItems
      })
    }

    // Auxiliary Equipment
    const auxItems = []
    if (auxData.shelfMountKit > 0) auxItems.push(`${auxData.shelfMountKit} × Shelf Mount Kit`)
    if (auxData.rackMountKit > 0) auxItems.push(`${auxData.rackMountKit} × 19" Rack Mount Kit`)
    if (auxData.wifiRepeater > 0) auxItems.push(`${auxData.wifiRepeater} × Wifi Repeater`)
    if (auxData.c1Harness > 0) auxItems.push(`${auxData.c1Harness} × C1 Harness`)

    if (auxItems.length > 0) {
      recommendations.push({
        category: 'Auxiliary Equipment',
        items: auxItems
      })
    }

    // Additional Services
    recommendations.push({
      category: 'Recommended Services',
      items: [
        'NoTraffic Platform license',
        'Professional installation service',
        'Training and onboarding',
        timeline === 'urgent' ? 'Premium support package' : 'Standard support package',
        'System configuration and testing'
      ]
    })

    // Timeline estimate
    let estimatedWeeks = 4
    if (intersections > 10) estimatedWeeks += Math.ceil((intersections - 10) / 2)
    if (timeline === 'urgent') estimatedWeeks = Math.ceil(estimatedWeeks * 0.7)

    recommendations.push({
      category: 'Estimated Timeline',
      items: [`${estimatedWeeks} weeks from contract signing to full operation`]
    })

    return recommendations
  }

  const resetTool = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setEquipment({
      nexusUnit: 0,
      sensorPowerUnit: 0,
      type1Sensor: 0,
      type2Sensor: 0
    })
    setAuxEquipment({
      shelfMountKit: 0,
      rackMountKit: 0,
      wifiRepeater: 0,
      c1Harness: 0
    })
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Installation <span className="text-primary-300">Assessment Tool</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Answer a few questions to get personalized recommendations for your 
              NoTraffic system installation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showResults ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-8 md:p-12 border border-dark-700"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Question {currentStep + 1} of {steps.length}</span>
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

                  {currentStepData.type === 'number' ? (
                    <div className="space-y-4">
                      <input
                        type="number"
                        min="1"
                        placeholder={currentStepData.placeholder}
                        className="w-full px-6 py-4 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors text-lg"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const value = (e.target as HTMLInputElement).value
                            if (value && Number(value) > 0) {
                              handleAnswer(Number(value))
                            }
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.value) {
                            setAnswers({ ...answers, [currentStepData.id]: Number(e.target.value) })
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          const value = answers[currentStepData.id]
                          if (value && (typeof value === 'string' || typeof value === 'number')) {
                            handleAnswer(value)
                          }
                        }}
                        disabled={!answers[currentStepData.id]}
                        className="w-full px-6 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Continue
                        <FiArrowRight />
                      </button>
                    </div>
                  ) : currentStepData.type === 'multi-select' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentStepData.options?.map((option) => {
                          const selected = (answers[currentStepData.id] as string[] || []).includes(option.value)
                          return (
                            <button
                              key={option.value}
                              onClick={() => {
                                const current = (answers[currentStepData.id] as string[]) || []
                                const newValue = current.includes(option.value)
                                  ? current.filter(v => v !== option.value)
                                  : [...current, option.value]
                                setAnswers({ ...answers, [currentStepData.id]: newValue })
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
                      <button
                        onClick={() => handleAnswer(answers[currentStepData.id] || [])}
                        disabled={!(answers[currentStepData.id] as string[])?.length}
                        className="w-full px-6 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Continue
                        <FiArrowRight />
                      </button>
                    </div>
                  ) : currentStepData.type === 'equipment-quantity' ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {[
                          { key: 'nexusUnit', label: 'Nexus Unit' },
                          { key: 'sensorPowerUnit', label: 'Sensor Power Unit' },
                          { key: 'type1Sensor', label: 'Type 1 Sensor' },
                          { key: 'type2Sensor', label: 'Type 2 Sensor' }
                        ].map((item) => (
                          <div key={item.key} className="glass rounded-lg p-6 border border-dark-700">
                            <div className="flex items-center justify-between">
                              <label className="text-lg font-semibold">{item.label}</label>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setEquipment({ ...equipment, [item.key]: Math.max(0, equipment[item.key as keyof typeof equipment] - 1) })}
                                  className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors flex items-center justify-center text-xl font-bold"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  min="0"
                                  value={equipment[item.key as keyof typeof equipment]}
                                  onChange={(e) => setEquipment({ ...equipment, [item.key]: Math.max(0, Number(e.target.value)) })}
                                  className="w-20 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-center focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                                />
                                <button
                                  onClick={() => setEquipment({ ...equipment, [item.key]: equipment[item.key as keyof typeof equipment] + 1 })}
                                  className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors flex items-center justify-center text-xl font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleEquipmentContinue}
                        className="w-full px-6 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Continue
                        <FiArrowRight />
                      </button>
                    </div>
                  ) : currentStepData.type === 'auxiliary-quantity' ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {[
                          { key: 'shelfMountKit', label: 'Shelf Mount Kit' },
                          { key: 'rackMountKit', label: '19" Rack Mount Kit' },
                          { key: 'wifiRepeater', label: 'Wifi Repeater' },
                          { key: 'c1Harness', label: 'C1 Harness' }
                        ].map((item) => (
                          <div key={item.key} className="glass rounded-lg p-6 border border-dark-700">
                            <div className="flex items-center justify-between">
                              <label className="text-lg font-semibold">{item.label}</label>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setAuxEquipment({ ...auxEquipment, [item.key]: Math.max(0, auxEquipment[item.key as keyof typeof auxEquipment] - 1) })}
                                  className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors flex items-center justify-center text-xl font-bold"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  min="0"
                                  value={auxEquipment[item.key as keyof typeof auxEquipment]}
                                  onChange={(e) => setAuxEquipment({ ...auxEquipment, [item.key]: Math.max(0, Number(e.target.value)) })}
                                  className="w-20 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-center focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                                />
                                <button
                                  onClick={() => setAuxEquipment({ ...auxEquipment, [item.key]: auxEquipment[item.key as keyof typeof auxEquipment] + 1 })}
                                  className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors flex items-center justify-center text-xl font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleAuxiliaryContinue}
                        className="w-full px-6 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Continue
                        <FiArrowRight />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentStepData.options?.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          className="w-full p-6 glass hover:bg-dark-800 hover:border-primary-500/50 border border-dark-700 rounded-lg transition-all duration-300 text-left group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold mb-1 group-hover:text-primary-300 transition-colors">
                                {option.label}
                              </h3>
                              {option.description && (
                                <p className="text-gray-400 text-sm">
                                  {option.description}
                                </p>
                              )}
                            </div>
                            <FiArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary-300 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {currentStep > 0 && !(currentStep === 3 && answers['deployment-type'] === 'single') && (
                <button
                  onClick={handleBack}
                  className="mt-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiArrowLeft />
                  Previous Question
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results */}
              <div className="glass rounded-xl p-8 md:p-12 border border-dark-700 mb-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheck className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">
                    Your Installation Assessment
                  </h2>
                  <p className="text-xl text-gray-400">
                    Based on your requirements, here's what we recommend
                  </p>
                </div>

                <div className="space-y-8">
                  {getRecommendations().map((recommendation, index) => (
                    <motion.div
                      key={recommendation.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-dark-900 rounded-lg p-6 border border-dark-700"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-primary-300">
                        {recommendation.category}
                      </h3>
                      <ul className="space-y-3">
                        {recommendation.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <strong className="text-primary-300">Note:</strong> This is an automated assessment based on your inputs. 
                    For a detailed quote and customized plan, please contact our team for a comprehensive consultation.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetTool}
                  className="flex-1 px-6 py-4 glass hover:bg-dark-800 rounded-lg font-semibold transition-all duration-300"
                >
                  Start New Assessment
                </button>
                <a
                  href="/products#inquiry"
                  className="flex-1 px-6 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Contact Sales
                  <FiArrowRight />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

