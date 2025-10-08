'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-900 to-dark-950 px-4">
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiAlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Something went wrong
        </h1>
        
        <p className="text-xl text-gray-400 mb-8">
          We're sorry, but something unexpected happened. Please try again.
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-primary-500/50"
        >
          <FiRefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </motion.div>
    </div>
  )
}

