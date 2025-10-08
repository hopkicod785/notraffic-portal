'use client'

import { motion } from 'framer-motion'
import { FiCheck, FiSettings, FiUsers, FiTrendingUp, FiShield, FiZap, FiHeadphones } from 'react-icons/fi'

export default function Services() {
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
                className="glass rounded-xl p-8 hover:border-primary-500/50 transition-all duration-300 border border-dark-700"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
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

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Contact us to discuss which services are right for your organization
            </p>
            <a 
              href="/products#inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70"
            >
              Contact Our Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

