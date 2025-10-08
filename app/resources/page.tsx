'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiBook, FiFileText, FiVideo, FiDownload, FiSearch, FiHelpCircle, FiCode, FiSettings, FiExternalLink } from 'react-icons/fi'
import { resources, faqs } from '@/data/resources'

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Resources', icon: <FiBook /> },
    { id: 'guides', name: 'Guides', icon: <FiFileText /> },
    { id: 'documentation', name: 'Documentation', icon: <FiCode /> },
    { id: 'videos', name: 'Videos', icon: <FiVideo /> },
    { id: 'faqs', name: 'FAQs', icon: <FiHelpCircle /> }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Resource <span className="text-primary-300">Center</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Access manuals, guides, documentation, and training materials
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-dark-950 sticky top-16 z-40 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'glass text-gray-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section id="manuals" className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="glass rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 border border-dark-700 flex flex-col"
                >
                      {/* Video Player for video resources */}
                      {resource.type === 'Video' ? (
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                          {resource.externalUrl ? (
                            // Embed external videos (YouTube, Vimeo, etc.)
                            <iframe
                              src={resource.externalUrl}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={resource.title}
                            />
                          ) : resource.filePath ? (
                            // Play local video files
                            <video 
                              controls 
                              className="w-full h-full"
                              preload="metadata"
                            >
                              <source src={resource.filePath} type="video/mp4" />
                              <source src={resource.filePath} type="video/webm" />
                              <source src={resource.filePath} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              <span>Video not available</span>
                            </div>
                          )}
                        </div>
                      ) : null}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        {resource.type === 'Video' ? <FiVideo className="w-6 h-6 text-primary-300" /> :
                         resource.type === 'Online' ? <FiCode className="w-6 h-6 text-primary-300" /> :
                         <FiFileText className="w-6 h-6 text-primary-300" />}
                      </div>
                      <span className="text-xs font-semibold text-primary-300 uppercase">
                        {resource.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">
                      {resource.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                      {resource.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      {resource.pages && <span>{resource.pages} pages</span>}
                      {resource.size !== 'N/A' && <span>{resource.size}</span>}
                      <span>{resource.version}</span>
                    </div>

                        <div className="flex items-center justify-between pt-4 border-t border-dark-700 gap-2">
                          <span className="text-xs text-gray-500">
                            Updated {resource.updated}
                          </span>
                          <div className="flex gap-2">
                            {resource.type === 'Video' ? (
                              // Video resources - show download for local, external link for hosted
                              resource.filePath && !resource.externalUrl ? (
                                <a
                                  href={resource.filePath}
                                  download
                                  className="flex items-center gap-2 px-3 py-2 bg-primary-500/20 hover:bg-primary-500 text-primary-300 hover:text-white rounded-lg font-semibold text-sm transition-all duration-300"
                                  title="Download video"
                                >
                                  <FiDownload className="w-4 h-4" />
                                  Download
                                </a>
                              ) : resource.externalUrl ? (
                                <a
                                  href={resource.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-2 bg-primary-500/20 hover:bg-primary-500 text-primary-300 hover:text-white rounded-lg font-semibold text-sm transition-all duration-300"
                                  title="Open video"
                                >
                                  <FiExternalLink className="w-4 h-4" />
                                  Watch
                                </a>
                              ) : null
                            ) : (resource.filePath || resource.externalUrl) ? (
                              <a
                                href={resource.externalUrl || resource.filePath}
                                target={resource.externalUrl ? '_blank' : '_self'}
                                rel={resource.externalUrl ? 'noopener noreferrer' : undefined}
                                download={resource.filePath && !resource.externalUrl ? true : undefined}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500 text-primary-300 hover:text-white rounded-lg font-semibold text-sm transition-all duration-300"
                              >
                                {resource.type === 'Online' || resource.externalUrl ? 'View' : 'Download'}
                                {resource.type === 'Online' || resource.externalUrl ? <FiExternalLink className="w-4 h-4" /> : <FiDownload className="w-4 h-4" />}
                              </a>
                            ) : (
                              <button 
                                disabled
                                className="flex items-center gap-2 px-4 py-2 bg-dark-700 text-gray-500 rounded-lg font-semibold text-sm cursor-not-allowed"
                              >
                                Coming Soon
                              </button>
                            )}
                          </div>
                        </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiSearch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No resources found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 bg-gradient-to-b from-dark-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="glass rounded-xl p-6 border border-dark-700"
              >
                <h3 className="text-xl font-bold mb-3 flex items-start gap-3">
                  <FiHelpCircle className="w-6 h-6 text-primary-300 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-400 pl-9">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section id="support" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Need Additional Support?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Can't find what you're looking for? Our support team is here to help
            </p>
            <a 
              href="/products#inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

