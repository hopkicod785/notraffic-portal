'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiCheck, FiArrowRight, FiX, FiAlertTriangle, FiBell, FiActivity, FiCpu, FiBarChart, FiEye, FiMapPin, FiShield, FiUsers, FiTarget, FiSliders, FiMonitor, FiWifi, FiTool } from 'react-icons/fi'
import Link from 'next/link'

const productIcons: Record<string, JSX.Element> = {
  'Emergency Vehicle Preemption (EVP)': <FiAlertTriangle className="w-full h-full" />,
  'Vision-Based Transit Signal Priority': <FiBell className="w-full h-full" />,
  'Intelligent Transit Detection': <FiActivity className="w-full h-full" />,
  'AI Timing Plan': <FiCpu className="w-full h-full" />,
  'Optimization Mode': <FiBarChart className="w-full h-full" />,
  'Dilemma Zone Protection': <FiShield className="w-full h-full" />,
  'Software-Defined Detection': <FiTarget className="w-full h-full" />,
  'Comprehensive Traffic Counts': <FiBarChart className="w-full h-full" />,
  'Situational Awareness': <FiEye className="w-full h-full" />,
  'Near-Miss Insights': <FiMapPin className="w-full h-full" />,
  'Intersection Safety Insights': <FiShield className="w-full h-full" />,
  'Pedestrian Protection Zone': <FiUsers className="w-full h-full" />,
  'ATSPM (Automated Traffic Signal Performance Measures)': <FiSliders className="w-full h-full" />,
  'Ped Actuation': <FiUsers className="w-full h-full" />,
  'Remote Cabinet Access': <FiWifi className="w-full h-full" />,
  'Front Panel Access': <FiMonitor className="w-full h-full" />
}

export default function Products() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const products = [
    // PRIORITY & PREEMPTION
    {
      name: "Emergency Vehicle Preemption (EVP)",
      category: "Priority & Preemption",
      description: "AI-powered emergency vehicle preemption that automatically adjusts signal timing to clear paths for emergency vehicles.",
      features: [
        "Real-time emergency vehicle detection",
        "Automatic signal priority",
        "Reduced emergency response times",
        "Integration with existing systems",
        "Advanced path clearance algorithms"
      ],
      benefits: "Faster emergency response times while maintaining traffic flow efficiency"
    },
    {
      name: "Vision-Based Transit Signal Priority",
      category: "Priority & Preemption",
      description: "Computer vision-based transit signal priority system that identifies and prioritizes public transit vehicles.",
      features: [
        "Camera-based vehicle identification",
        "Route-specific priority logic",
        "Schedule adherence optimization",
        "No onboard equipment required",
        "Real-time priority adjustments"
      ],
      benefits: "Improve transit on-time performance and reduce passenger wait times"
    },
    {
      name: "Intelligent Transit Detection",
      category: "Priority & Preemption",
      description: "Advanced detection system specifically designed to identify and track transit vehicles in real-time.",
      features: [
        "Multi-modal transit detection",
        "Vehicle classification and tracking",
        "Route pattern recognition",
        "Integration with transit systems",
        "Real-time performance monitoring"
      ],
      benefits: "Enhanced transit operations with accurate vehicle detection and tracking"
    },

    // TRAFFIC OPTIMIZATION
    {
      name: "AI Timing Plan",
      category: "Traffic Optimization",
      description: "Machine learning-powered signal timing optimization that adapts to real-time traffic conditions.",
      features: [
        "AI-driven timing adjustments",
        "Predictive traffic modeling",
        "Automated timing plan generation",
        "Historical pattern analysis",
        "Continuous learning and improvement"
      ],
      benefits: "Reduce congestion and improve intersection efficiency with intelligent timing"
    },
    {
      name: "Optimization Mode",
      category: "Traffic Optimization",
      description: "Dynamic traffic optimization that continuously adjusts signal operations for maximum efficiency.",
      features: [
        "Real-time traffic flow optimization",
        "Multi-intersection coordination",
        "Demand-responsive timing",
        "Congestion reduction algorithms",
        "Performance metrics tracking"
      ],
      benefits: "Maximize throughput and minimize delays across your network"
    },
    {
      name: "Dilemma Zone Protection",
      category: "Traffic Optimization",
      description: "Advanced safety feature that eliminates dilemma zones by intelligently managing yellow and red clearance intervals.",
      features: [
        "Real-time vehicle speed detection",
        "Dynamic clearance interval adjustment",
        "Reduced red-light violations",
        "Enhanced intersection safety",
        "Automated zone management"
      ],
      benefits: "Eliminate dangerous dilemma zones and reduce collision risk"
    },

    // DETECTION & MONITORING
    {
      name: "Software-Defined Detection",
      category: "Detection & Monitoring",
      description: "Flexible, AI-powered detection system that can be configured and updated through software.",
      features: [
        "Multi-modal traffic detection",
        "Configurable detection zones",
        "Remote updates and adjustments",
        "Vehicle classification",
        "Real-time data streaming"
      ],
      benefits: "Adaptable detection that evolves with your needs without hardware changes"
    },
    {
      name: "Comprehensive Traffic Counts",
      category: "Detection & Monitoring",
      description: "Detailed traffic counting and classification across all modes of transportation.",
      features: [
        "24/7 automated counting",
        "Vehicle classification by type",
        "Pedestrian and cyclist counts",
        "Turning movement counts",
        "Historical data archives"
      ],
      benefits: "Complete traffic data for informed planning and operations decisions"
    },
    {
      name: "Situational Awareness",
      category: "Detection & Monitoring",
      description: "Real-time visibility into intersection operations with comprehensive monitoring and alerts.",
      features: [
        "Live video feeds",
        "Real-time traffic visualization",
        "Incident detection and alerts",
        "Multi-intersection monitoring",
        "Historical event playback"
      ],
      benefits: "Complete operational awareness for proactive traffic management"
    },

    // SAFETY & ANALYTICS
    {
      name: "Near-Miss Insights",
      category: "Safety & Analytics",
      description: "Advanced analytics that identify and analyze near-miss events to improve intersection safety.",
      features: [
        "Automated near-miss detection",
        "Conflict point analysis",
        "Risk assessment scoring",
        "Trend identification",
        "Actionable safety recommendations"
      ],
      benefits: "Prevent accidents by identifying and addressing safety risks proactively"
    },
    {
      name: "Intersection Safety Insights",
      category: "Safety & Analytics",
      description: "Comprehensive safety analysis platform providing data-driven insights for intersection improvements.",
      features: [
        "Safety performance metrics",
        "Risk factor identification",
        "Comparative safety analysis",
        "Before/after studies",
        "Compliance monitoring"
      ],
      benefits: "Data-driven approach to improving intersection safety outcomes"
    },
    {
      name: "Pedestrian Protection Zone",
      category: "Safety & Analytics",
      description: "Advanced pedestrian safety feature that monitors and protects vulnerable road users in crosswalks.",
      features: [
        "Real-time pedestrian detection",
        "Extended clearance intervals",
        "Protected crossing phases",
        "Pedestrian count tracking",
        "Safety compliance monitoring"
      ],
      benefits: "Enhanced pedestrian safety with intelligent crossing protection"
    },
    {
      name: "ATSPM (Automated Traffic Signal Performance Measures)",
      category: "Safety & Analytics",
      description: "Industry-standard performance measurement system for comprehensive signal performance evaluation.",
      features: [
        "Split monitor analysis",
        "Purdue coordination diagrams",
        "Arrivals on green analysis",
        "Queue length estimation",
        "Custom performance reports"
      ],
      benefits: "Standard performance metrics for optimizing signal operations"
    },

    // ACCESS & ACTUATION
    {
      name: "Ped Actuation",
      category: "Access & Actuation",
      description: "Automated pedestrian detection and actuation that eliminates the need for push buttons.",
      features: [
        "Touchless pedestrian detection",
        "Automatic call placement",
        "ADA compliance support",
        "Crossing demand analytics",
        "Weather-resistant operation"
      ],
      benefits: "Improved accessibility and convenience for pedestrians"
    },
    {
      name: "Remote Cabinet Access",
      category: "Access & Actuation",
      description: "Secure remote access to traffic cabinet controls and diagnostics from anywhere.",
      features: [
        "Secure cloud connectivity",
        "Remote configuration",
        "Live diagnostics",
        "Firmware updates",
        "Multi-user access control"
      ],
      benefits: "Reduce truck rolls and enable rapid response to issues"
    },
    {
      name: "Front Panel Access",
      category: "Access & Actuation",
      description: "Intuitive local access interface for on-site configuration and monitoring.",
      features: [
        "Touchscreen interface",
        "Quick configuration tools",
        "Local diagnostics",
        "Status indicators",
        "Secure access control"
      ],
      benefits: "Fast, efficient local access for technicians and maintenance staff"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/product-inquiry', {
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
        console.error('Failed to submit inquiry')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="text-primary-300">Products</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover intelligent traffic management solutions designed to optimize traffic flow,
              reduce congestion, and improve safety
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link href="/products#inquiry">
                  <div className="group h-full glass rounded-xl p-6 hover:border-primary-500 transition-all duration-300 border border-dark-700 cursor-pointer hover:shadow-lg hover:shadow-primary-500/20">
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 p-3 group-hover:scale-110 transition-transform duration-300">
                        {productIcons[product.name]}
                      </div>
                      
                      {/* Category Badge */}
                      <span className="text-xs font-semibold text-primary-300 uppercase tracking-wide mb-2">
                        {product.category}
                      </span>
                      
                      {/* Product Name */}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-grow">
                        {product.description}
                      </p>

                      {/* Learn More */}
                      <div className="flex items-center text-primary-300 font-semibold text-sm">
                        Learn More
                        <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry" className="py-20 bg-gradient-to-b from-dark-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Request Product Information
              </h2>
              <p className="text-xl text-gray-400">
                Get in touch with our team to learn more about our products
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="glass rounded-xl p-8 border border-dark-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                      placeholder="Your Company"
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
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="product" className="block text-sm font-medium mb-2">
                    Product of Interest *
                  </label>
                  <select
                    id="product"
                    name="product"
                    required
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product.name} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors resize-none"
                    placeholder="Tell us about your traffic management needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70"
                >
                  Submit Inquiry
                  <FiArrowRight />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-xl p-12 border border-dark-700 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheck className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
                <p className="text-xl text-gray-400 mb-8">
                  We've received your inquiry and will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      phone: '',
                      product: '',
                      message: ''
                    })
                  }}
                  className="px-6 py-3 glass hover:bg-dark-800 rounded-lg font-semibold transition-all duration-300"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

