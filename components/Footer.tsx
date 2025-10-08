'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center">
            <div className="relative w-24 h-24">
              <Image 
                src="/White logo blue icon - no background (1).png"
                alt="NoTraffic Logo"
                fill
                className="object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
          </Link>
          
          <p className="text-gray-400 max-w-2xl">
            Your central hub for intelligent traffic management solutions, providing access to products, services, tools, and resources.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FiMail className="w-4 h-4" />
              <span>support@notraffic.tech</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="w-4 h-4" />
              <span>Global Operations</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-dark-800 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} NoTraffic. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Intelligent Traffic Management Solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

