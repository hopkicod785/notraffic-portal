'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FiPackage, FiTool, FiFileText, FiRefreshCw, FiDownload, FiEye, FiSettings, FiX, FiLogOut } from 'react-icons/fi'

interface ProductInquiry {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  product: string
  message: string
  status: string
  createdAt: string
}

interface ServiceInquiry {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  service: string
  message: string
  status: string
  createdAt: string
}

interface InstallationAssessment {
  id: string
  deploymentType: string
  cabinetType: string[]
  intersections: number
  equipment: any
  auxiliary: any
  timeline: string
  createdAt: string
}

interface InstallationRegistration {
  id: string
  agency: string
  distributor: string
  intersections: string
  estimatedDate: string
  cabinetType: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'inquiries' | 'services' | 'assessments' | 'registrations'>('inquiries')
  const [inquiries, setInquiries] = useState<ProductInquiry[]>([])
  const [serviceInquiries, setServiceInquiries] = useState<ServiceInquiry[]>([])
  const [assessments, setAssessments] = useState<InstallationAssessment[]>([])
  const [registrations, setRegistrations] = useState<InstallationRegistration[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'inquiries') {
        const res = await fetch('/api/product-inquiry')
        const data = await res.json()
        if (data.success) setInquiries(data.data)
      } else if (activeTab === 'services') {
        const res = await fetch('/api/service-inquiry')
        const data = await res.json()
        if (data.success) setServiceInquiries(data.data)
      } else if (activeTab === 'assessments') {
        const res = await fetch('/api/installation-assessment')
        const data = await res.json()
        if (data.success) setAssessments(data.data)
      } else if (activeTab === 'registrations') {
        const res = await fetch('/api/installation-registration')
        const data = await res.json()
        if (data.success) setRegistrations(data.data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    setSearchQuery('') // Clear search when switching tabs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  // Filter data based on search query
  const filteredInquiries = inquiries.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredServiceInquiries = serviceInquiries.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredAssessments = assessments.filter(item =>
    item.deploymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.timeline.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredRegistrations = registrations.filter(item =>
    item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.distributor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const exportToCSV = () => {
    let csvContent = ''
    let filename = ''

    if (activeTab === 'inquiries') {
      csvContent = 'ID,Name,Email,Company,Phone,Product,Message,Status,Created\n'
      inquiries.forEach(item => {
        csvContent += `"${item.id}","${item.name}","${item.email}","${item.company || ''}","${item.phone || ''}","${item.product}","${item.message}","${item.status}","${new Date(item.createdAt).toLocaleString()}"\n`
      })
      filename = 'product-inquiries.csv'
    } else if (activeTab === 'services') {
      csvContent = 'ID,Name,Email,Company,Phone,Service,Message,Status,Created\n'
      serviceInquiries.forEach(item => {
        csvContent += `"${item.id}","${item.name}","${item.email}","${item.company || ''}","${item.phone || ''}","${item.service}","${item.message}","${item.status}","${new Date(item.createdAt).toLocaleString()}"\n`
      })
      filename = 'service-inquiries.csv'
    } else if (activeTab === 'assessments') {
      csvContent = 'ID,Deployment Type,Intersections,Timeline,Created\n'
      assessments.forEach(item => {
        csvContent += `"${item.id}","${item.deploymentType}","${item.intersections}","${item.timeline}","${new Date(item.createdAt).toLocaleString()}"\n`
      })
      filename = 'installation-assessments.csv'
    } else if (activeTab === 'registrations') {
      csvContent = 'ID,Agency,Distributor,Name,Email,Phone,Estimated Date,Status,Created\n'
      registrations.forEach(item => {
        csvContent += `"${item.id}","${item.agency}","${item.distributor}","${item.firstName} ${item.lastName}","${item.email}","${item.phone}","${new Date(item.estimatedDate).toLocaleDateString()}","${item.status}","${new Date(item.createdAt).toLocaleString()}"\n`
      })
      filename = 'installation-registrations.csv'
    }

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
  }

  // Handle authentication states
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <FiRefreshCw className="w-12 h-12 text-primary-300 animate-spin" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login')
    return null
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-dark-950">
      <section className="py-12 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Admin <span className="text-primary-300">Dashboard</span>
              </h1>
              <p className="text-gray-400">Manage all portal submissions and data</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 glass hover:bg-dark-800 rounded-lg font-semibold transition-all duration-300"
              >
                <FiLogOut className="w-5 h-5" />
                Sign Out
              </button>
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-4 py-2 glass hover:bg-dark-800 rounded-lg font-semibold transition-all duration-300"
              >
                <FiRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold transition-all duration-300"
              >
                <FiDownload className="w-5 h-5" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === 'inquiries'
                  ? 'bg-primary-500 text-white'
                  : 'glass text-gray-300 hover:bg-dark-800'
              }`}
            >
              <FiPackage className="w-5 h-5" />
              Product Inquiries
              <span className="px-2 py-1 bg-dark-900 rounded-full text-xs">{inquiries.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === 'services'
                  ? 'bg-primary-500 text-white'
                  : 'glass text-gray-300 hover:bg-dark-800'
              }`}
            >
              <FiSettings className="w-5 h-5" />
              Service Inquiries
              <span className="px-2 py-1 bg-dark-900 rounded-full text-xs">{serviceInquiries.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('assessments')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === 'assessments'
                  ? 'bg-primary-500 text-white'
                  : 'glass text-gray-300 hover:bg-dark-800'
              }`}
            >
              <FiTool className="w-5 h-5" />
              Installation Assessments
              <span className="px-2 py-1 bg-dark-900 rounded-full text-xs">{assessments.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === 'registrations'
                  ? 'bg-primary-500 text-white'
                  : 'glass text-gray-300 hover:bg-dark-800'
              }`}
            >
              <FiFileText className="w-5 h-5" />
              Install Registrations
              <span className="px-2 py-1 bg-dark-900 rounded-full text-xs">{registrations.length}</span>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-20">
                <FiRefreshCw className="w-12 h-12 text-primary-300 mx-auto mb-4 animate-spin" />
                <p className="text-gray-400">Loading data...</p>
              </div>
            ) : (
              <>
                {/* Product Inquiries */}
                {activeTab === 'inquiries' && (
                  filteredInquiries.length > 0 ? (
                    filteredInquiries.map((inquiry) => (
                      <motion.div
                        key={inquiry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{inquiry.name}</h3>
                            <p className="text-sm text-gray-400">{inquiry.email}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inquiry.status === 'new' ? 'bg-green-500/20 text-green-400' :
                            inquiry.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-500">Company:</span>
                            <span className="ml-2 text-gray-300">{inquiry.company || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Phone:</span>
                            <span className="ml-2 text-gray-300">{inquiry.phone || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Product:</span>
                            <span className="ml-2 text-primary-300">{inquiry.product}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <span className="ml-2 text-gray-300">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-dark-700">
                          <p className="text-sm text-gray-400 mb-2">Message:</p>
                          <p className="text-gray-300">{inquiry.message}</p>
                        </div>
                        <button
                          onClick={() => setSelectedItem(inquiry)}
                          className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500 text-primary-300 hover:text-white rounded-lg font-semibold text-sm transition-all"
                        >
                          <FiEye className="w-4 h-4" />
                          View Details
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-20 glass rounded-xl border border-dark-700">
                      <FiPackage className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No product inquiries yet</p>
                    </div>
                  )
                )}

                {/* Service Inquiries */}
                {activeTab === 'services' && (
                  filteredServiceInquiries.length > 0 ? (
                    filteredServiceInquiries.map((inquiry) => (
                      <motion.div
                        key={inquiry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{inquiry.name}</h3>
                            <p className="text-sm text-gray-400">{inquiry.email}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inquiry.status === 'new' ? 'bg-green-500/20 text-green-400' :
                            inquiry.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-500">Company:</span>
                            <span className="ml-2 text-gray-300">{inquiry.company || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Phone:</span>
                            <span className="ml-2 text-gray-300">{inquiry.phone || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Service:</span>
                            <span className="ml-2 text-primary-300">{inquiry.service}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <span className="ml-2 text-gray-300">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-dark-700">
                          <p className="text-sm text-gray-400 mb-2">Message:</p>
                          <p className="text-gray-300">{inquiry.message}</p>
                        </div>
                        <button
                          onClick={() => setSelectedItem(inquiry)}
                          className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500 text-primary-300 hover:text-white rounded-lg font-semibold text-sm transition-all"
                        >
                          <FiEye className="w-4 h-4" />
                          View Details
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-20 glass rounded-xl border border-dark-700">
                      <FiSettings className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No service inquiries yet</p>
                    </div>
                  )
                )}

                {/* Installation Assessments */}
                {activeTab === 'assessments' && (
                  filteredAssessments.length > 0 ? (
                    filteredAssessments.map((assessment) => (
                      <motion.div
                        key={assessment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{assessment.deploymentType}</h3>
                            <p className="text-sm text-gray-400">{assessment.intersections} intersection(s)</p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(assessment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Timeline:</span>
                            <span className="ml-2 text-gray-300">{assessment.timeline}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Cabinet Types:</span>
                            <span className="ml-2 text-gray-300">{assessment.cabinetType.join(', ') || 'None'}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedItem(assessment)}
                          className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500 text-primary-300 hover:text-white rounded-lg font-semibold text-sm transition-all"
                        >
                          <FiEye className="w-4 h-4" />
                          View Details
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-20 glass rounded-xl border border-dark-700">
                      <FiTool className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No installation assessments yet</p>
                    </div>
                  )
                )}

                {/* Installation Registrations */}
                {activeTab === 'registrations' && (
                  filteredRegistrations.length > 0 ? (
                    filteredRegistrations.map((registration) => (
                      <motion.div
                        key={registration.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-xl p-4 border border-dark-700 hover:border-primary-500/50 transition-all"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold">{registration.agency}</h3>
                            <p className="text-xs text-gray-400">{registration.firstName} {registration.lastName} • {registration.email}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                            registration.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            registration.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {registration.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                          <div>
                            <span className="text-gray-500">Install:</span>
                            <span className="ml-1 text-primary-300">{new Date(registration.estimatedDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Distributor:</span>
                            <span className="ml-1 text-gray-300">{registration.distributor}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Submitted:</span>
                            <span className="ml-1 text-gray-300">{new Date(registration.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedItem(registration)}
                          className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary-500/20 hover:bg-primary-500 text-primary-300 hover:text-white rounded-lg font-semibold text-xs transition-all"
                        >
                          <FiEye className="w-4 h-4" />
                          View Full Details
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-20 glass rounded-xl border border-dark-700">
                      <FiFileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No installation registrations yet</p>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-dark-700"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">
                {selectedItem.agency ? 'Installation Registration Details' : 
                 selectedItem.deploymentType ? 'Assessment Details' :
                 selectedItem.product ? 'Product Inquiry Details' :
                 'Service Inquiry Details'}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Installation Registration Details */}
            {selectedItem.agency && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-900 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Agency</p>
                    <p className="text-lg font-semibold">{selectedItem.agency}</p>
                  </div>
                  <div className="bg-dark-900 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Distributor</p>
                    <p className="text-lg font-semibold">{selectedItem.distributor}</p>
                  </div>
                  <div className="bg-dark-900 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Contact Person</p>
                    <p className="text-lg font-semibold">{selectedItem.firstName} {selectedItem.lastName}</p>
                  </div>
                  <div className="bg-dark-900 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-lg font-semibold">{selectedItem.email}</p>
                  </div>
                  <div className="bg-dark-900 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-lg font-semibold">{selectedItem.phone}</p>
                  </div>
                  <div className="bg-dark-900 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Estimated Install Date</p>
                    <p className="text-lg font-semibold text-primary-300">{new Date(selectedItem.estimatedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="bg-dark-900 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Intersection(s)</p>
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedItem.intersections}</p>
                </div>

                <div className="bg-dark-900 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Cabinet Types</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.cabinetType.map((type: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedItem.signalPhasingFiles && selectedItem.signalPhasingFiles.length > 0 && (
                  <div className="bg-dark-900 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-2">Signal Phasing Files</p>
                    <div className="space-y-2">
                      {selectedItem.signalPhasingFiles.map((file: string, idx: number) => (
                        <a
                          key={idx}
                          href={file}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary-300 hover:text-primary-400 transition-colors"
                        >
                          <FiDownload className="w-4 h-4" />
                          {file.split('/').pop()} {/* Show just filename */}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.signalTimingFiles && selectedItem.signalTimingFiles.length > 0 && (
                  <div className="bg-dark-900 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-2">Signal Timing Files</p>
                    <div className="space-y-2">
                      {selectedItem.signalTimingFiles.map((file: string, idx: number) => (
                        <a
                          key={idx}
                          href={file}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary-300 hover:text-primary-400 transition-colors"
                        >
                          <FiDownload className="w-4 h-4" />
                          {file.split('/').pop()} {/* Show just filename */}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-dark-900 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Submission Date</p>
                  <p className="text-sm text-gray-300">{new Date(selectedItem.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}

            {/* Fallback for other types */}
            {!selectedItem.agency && (
              <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-dark-900 p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}

