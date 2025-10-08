'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { FiCheck, FiSettings, FiUsers, FiTrendingUp, FiShield, FiZap, FiHeadphones, FiArrowRight } from 'react-icons/fi'

export default function Services() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/service-inquiry', {
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
        console.error('Failed to submit service inquiry')
      }
    } catch (error) {
      console.error('Error submitting service inquiry:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const services = [
    {
      icon: <FiSettings className="w-10 h-10" />,
      title: "Professional Installation",
      description: "Expert installation of NoTraffic systems with minimal disruption to existing traffic operations.",
      features: [
        "Site assessment and planning",
        "Professional hardware installation",
        "System configuration and testing",
        "Integration with existing infrastructure",
        "Quality assurance and certification"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiUsers className="w-10 h-10" />,
      title: "Training & Onboarding",
      description: "Comprehensive training programs to ensure your team can effectively use and manage the system.",
      features: [
        "On-site training sessions",
        "Online training modules",
        "Custom training materials",
        "Certification programs",
        "Ongoing educational support"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiTrendingUp className="w-10 h-10" />,
      title: "System Optimization",
      description: "Continuous optimization of traffic patterns and system performance for maximum efficiency.",
      features: [
        "Traffic pattern analysis",
        "AI model tuning",
        "Performance monitoring",
        "Regular system updates",
        "ROI reporting and analytics"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FiShield className="w-10 h-10" />,
      title: "Maintenance & Support",
      description: "Proactive maintenance and 24/7 support to ensure continuous system reliability.",
      features: [
        "24/7 technical support",
        "Preventive maintenance",
        "Emergency response",
        "Remote diagnostics",
        "Parts replacement and warranty"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FiZap className="w-10 h-10" />,
      title: "System Integration",
      description: "Seamless integration with your existing traffic management and city infrastructure systems.",
      features: [
        "Legacy system integration",
        "API development and integration",
        "Data synchronization",
        "Third-party platform connectivity",
        "Custom integration solutions"
      ],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <FiHeadphones className="w-10 h-10" />,
      title: "Consulting Services",
      description: "Expert consulting to help you develop and implement your traffic management strategy.",
      features: [
        "Traffic management consulting",
        "Infrastructure assessment",
        "ROI analysis",
        "Strategic planning",
        "Best practices guidance"
      ],
      color: "from-pink-500 to-rose-500"
    }
  ]

  const supportTiers = [
    {
      name: "Standard Support",
      description: "Essential support for smooth operations",
      features: [
        "Business hours support (9AM-5PM)",
        "Email and phone support",
        "48-hour response time",
        "Quarterly system reviews",
        "Access to knowledge base"
      ],
      highlight: false
    },
    {
      name: "Premium Support",
      description: "Enhanced support with faster response",
      features: [
        "Extended hours support (7AM-9PM)",
        "Priority email and phone support",
        "24-hour response time",
        "Monthly system reviews",
        "Dedicated account manager",
        "Remote system monitoring"
      ],
      highlight: true
    },
    {
      name: "Enterprise Support",
      description: "Maximum uptime and dedicated resources",
      features: [
        "24/7 support coverage",
        "Immediate priority response",
        "4-hour response time SLA",
        "Weekly system reviews",
        "Dedicated support team",
        "On-site support visits",
        "Custom SLA options"
      ],
      highlight: false
    }
  ]

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Our <span className="text-primary-300">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive services to support your traffic management needs from 
              installation to ongoing optimization
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Complete Service Portfolio
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need for successful traffic management implementation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href="/services#inquiry">
                  <div className="group h-full glass rounded-xl p-8 hover:border-primary-500 transition-all duration-300 border border-dark-700 cursor-pointer hover:shadow-lg hover:shadow-primary-500/20">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-300 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FiCheck className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center text-primary-300 font-semibold">
                      Inquire Now
                      <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Tiers */}
      <section className="py-20 bg-gradient-to-b from-dark-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Support Tiers
            </h2>
            <p className="text-xl text-gray-400">
              Choose the support level that matches your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`rounded-xl p-8 border transition-all duration-300 ${
                  tier.highlight
                    ? 'glass border-primary-500 shadow-lg shadow-primary-500/20 scale-105'
                    : 'glass border-dark-700 hover:border-primary-500/50'
                }`}
              >
                {tier.highlight && (
                  <div className="text-center mb-4">
                    <span className="px-4 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2 text-center">
                  {tier.name}
                </h3>
                
                <p className="text-gray-400 text-center mb-6">
                  {tier.description}
                </p>

                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full mt-8 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  tier.highlight
                    ? 'bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/50'
                    : 'glass hover:bg-dark-800'
                }`}>
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Inquiry Form Section */}
      <section id="inquiry" className="py-20 bg-gradient-to-b from-black to-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Request Service Information
              </h2>
              <p className="text-xl text-gray-400">
                Get in touch with our team to learn more about our services
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
                      placeholder="1-202-800-1890"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service of Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
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
                    placeholder="Tell us about your service needs..."
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
                      service: '',
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

