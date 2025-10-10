'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiUser, FiCheck, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

interface FormData {
  firstName: string
  lastName: string
  agency: string
  email: string
  phone: string
}

export default function RegisterMOSAccount() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    agency: '',
    email: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/mos-account-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        console.error('Failed to submit MOS account registration')
        alert('Failed to submit registration. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting MOS account registration:', error)
      alert('Error submitting registration. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      agency: '',
      email: '',
      phone: ''
    })
    setSubmitted(false)
  }

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.agency && formData.email
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Link 
                href="/register"
                className="flex items-center gap-2 text-gray-400 hover:text-primary-300 transition-colors"
              >
                <FiArrowLeft />
                Back to Registration Options
              </Link>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Register <span className="text-primary-300">MOS Account</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Create your Management Operations System account to access advanced NoTraffic platform features
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="glass rounded-xl p-8 border border-dark-700">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 mx-auto mb-6">
                  <FiUser className="w-8 h-8 text-primary-300" />
                </div>

                <h2 className="text-2xl font-bold text-center mb-8">Account Information</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="agency" className="block text-sm font-medium mb-2">
                      Agency *
                    </label>
                    <input
                      type="text"
                      id="agency"
                      name="agency"
                      required
                      value={formData.agency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                      placeholder="City of Springfield DOT"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                      placeholder="john.doe@agency.gov"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                      placeholder="1-202-800-1890"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid() || submitting}
                  className="mt-8 w-full px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70"
                >
                  {submitting ? 'Submitting...' : 'Submit Registration'}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  * Required fields
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-xl p-12 border border-dark-700 text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Registration Submitted!</h2>
              <p className="text-xl text-gray-400 mb-8">
                Thank you for registering for a MOS account. Our team will review your request and contact you shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 glass hover:bg-dark-800 rounded-lg font-semibold transition-all duration-300"
                >
                  Register Another Account
                </button>
                <Link
                  href="/register"
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiArrowLeft />
                  Back to Registration Options
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

