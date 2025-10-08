'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiPackage, FiTool, FiBook, FiSettings, FiFileText } from 'react-icons/fi'

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const features = [
    {
      icon: <FiPackage className="w-8 h-8" />,
      title: "Products",
      description: "Explore our intelligent traffic management solutions",
      link: "/products",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiSettings className="w-8 h-8" />,
      title: "Services",
      description: "Professional installation and support services",
      link: "/services",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiTool className="w-8 h-8" />,
      title: "Installation Tool",
      description: "Assess your infrastructure and installation needs",
      link: "/installation-tool",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: "Register Install",
      description: "Register your upcoming NoTraffic installation",
      link: "/register-install",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <FiBook className="w-8 h-8" />,
      title: "Resources",
      description: "Manuals, guides, and technical documentation",
      link: "/resources",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to the{' '}
              <span className="text-primary-300">notraffic portal</span>.
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your central hub for intelligent traffic management solutions, tools, and resources
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link 
                href="/products"
                className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70"
              >
                Explore Products
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/installation-tool"
                className="px-8 py-4 glass hover:bg-dark-800 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Installation Tool
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 bg-gradient-to-b from-black to-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400">
              Access all NoTraffic resources in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={feature.link}>
                  <div className="group h-full glass rounded-xl p-8 hover:bg-dark-800 transition-all duration-300 cursor-pointer border border-dark-700 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-primary-300 font-semibold">
                      Learn More
                      <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Need Assistance?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Our team is ready to help you find the perfect solution for your traffic management needs
            </p>
            <Link 
              href="/products#inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70"
            >
              Contact Us
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

