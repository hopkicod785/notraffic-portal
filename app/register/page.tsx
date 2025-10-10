'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiFileText, FiUser, FiArrowRight } from 'react-icons/fi'

export default function RegisterPage() {
  const registrationOptions = [
    {
      icon: <FiFileText className="w-12 h-12" />,
      title: "Register Install",
      description: "Register your upcoming NoTraffic system installation with complete project details, cabinet specifications, and timeline.",
      link: "/register/install",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <FiUser className="w-12 h-12" />,
      title: "Register MOS Account",
      description: "Create a Management Operations System (MOS) account for your agency to access advanced platform features.",
      link: "/register/mos-account",
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="text-primary-300">Register</span> with NoTraffic
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose a registration option to get started with NoTraffic services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Options */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {registrationOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={option.link}>
                  <div className="group h-full glass rounded-xl p-8 hover:border-primary-500 transition-all duration-300 border border-dark-700 cursor-pointer hover:shadow-lg hover:shadow-primary-500/20">
                    <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {option.icon}
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary-300 transition-colors">
                      {option.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 text-lg">
                      {option.description}
                    </p>

                    <div className="flex items-center text-primary-300 font-semibold text-lg">
                      Get Started
                      <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

