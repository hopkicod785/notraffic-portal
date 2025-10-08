'use client'

import { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg shadow-primary-500/50 transition-all duration-300 hover:scale-110"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

