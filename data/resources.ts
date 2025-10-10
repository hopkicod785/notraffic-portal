// NoTraffic Portal - Resources Configuration
// Add your actual files here after uploading them to public/resources/

export interface ResourceItem {
  id: number
  title: string
  description: string
  category: 'manuals' | 'guides' | 'documentation' | 'videos' | 'faqs'
  type: 'PDF' | 'Video' | 'Online' | 'DOCX' | 'ZIP'
  filePath?: string // Path relative to public folder, e.g., '/resources/manuals/user-guide.pdf'
  externalUrl?: string // Or external link for online documentation
  size: string
  pages: number | null
  version: string
  updated: string
}

export const resources: ResourceItem[] = [
  // INSTALLATION GUIDES
  {
    id: 2,
    title: 'Quickstart Installation Guide',
    description: 'Fast-track guide to get your NoTraffic system up and running quickly',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/Quickstart Install Guide - NoTraffic V2.2 - July 2024.pdf.url',
    size: 'External',
    pages: null,
    version: 'v2.2',
    updated: '2024-07'
  },
  {
    id: 3,
    title: 'Full Installation Manual',
    description: 'Complete installation manual with detailed procedures and specifications',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/Full Installation Manual V5.2 - March 2024.pdf.url',
    size: 'External',
    pages: null,
    version: 'v5.2',
    updated: '2024-03'
  },
  {
    id: 4,
    title: 'Cabinet Wi-Fi Hotspot Setup Guide',
    description: 'Configure Wi-Fi hotspot connectivity in traffic cabinets',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/NoTraffic - Guide - Cabinet Wi-Fi Hotspot.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 5,
    title: 'Caltrans Spade Cable Installation',
    description: 'Spade cable installation guide for Caltrans specifications',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/NoTraffic - Guide - Caltrans Spade Cable Installation.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 6,
    title: 'PoE Injector DIN Rail Installation',
    description: 'Guide for adding Power over Ethernet injector to main DIN rail',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/NoTraffic - Guide - Adding PoE injector to Main DIN Rail.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 7,
    title: 'Wired Ethernet Repeater Setup',
    description: 'Configuration guide for wired Ethernet repeater installation',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/NoTraffic - Guide - Wired Ethernet Repeater.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 8,
    title: 'RTSP & Intersection Manager Configuration',
    description: 'Configure RTSP streaming and Intersection Manager on client networks',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/NoTraffic - Guide - Configure RTSP & Intersection Manager on Client Network.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 9,
    title: 'NoTraffic Download Manager Guide',
    description: 'Software download and management tool documentation',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/NoTraffic Download Manager guide v4 - Apr 2025.pdf.url',
    size: 'External',
    pages: null,
    version: 'v4',
    updated: '2024-04'
  },
  {
    id: 10,
    title: 'Accessory Kits for Nexus Omni',
    description: 'Overview and installation of accessory kits for Nexus Omni units',
    category: 'guides',
    type: 'DOCX',
    filePath: '/resources/guides/NoTraffic - Accessory Kits (for Nexus Omni) 0825.pptx',
    size: 'N/A',
    pages: null,
    version: '08-25',
    updated: '2024-08'
  },

  // TECHNICAL DOCUMENTATION
  {
    id: 20,
    title: 'AI Mobility Platform Specification',
    description: 'Complete technical specifications for the NoTraffic AI Mobility Platform',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - AI Mobility Platform Specification (25Q2).pdf',
    size: 'N/A',
    pages: null,
    version: '25Q2',
    updated: '2024-10'
  },
  {
    id: 21,
    title: 'Nexus 2 Datasheet',
    description: 'Technical datasheet for Nexus 2 intersection controller',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - Datasheet - Nexus 2.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 22,
    title: 'Nexus 2 Detection Datasheet',
    description: 'Detection capabilities and specifications for Nexus 2',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - Datasheet - Nexus 2 Detection.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 23,
    title: 'Nexus Omni Datasheet',
    description: 'Complete specifications for Nexus Omni platform',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - Datasheet - Nexus Omni 0825.pdf',
    size: 'N/A',
    pages: null,
    version: '08-25',
    updated: '2024-08'
  },
  {
    id: 24,
    title: 'Sensor Datasheet',
    description: 'Vision sensor technical specifications and capabilities',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - Datasheet - Sensor 0825.pdf',
    size: 'N/A',
    pages: null,
    version: '08-25',
    updated: '2024-08'
  },
  {
    id: 25,
    title: 'Power DIN Rail Datasheet',
    description: 'Power distribution DIN rail specifications',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - Datasheet - Power-DIN-Rail.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 26,
    title: 'Standard DIN Rail Datasheet',
    description: 'Standard DIN rail mounting specifications',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - Datasheet - Standard-DIN-Rail.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 27,
    title: 'Cabinet Power & Wireless Communications Diagram',
    description: 'Wiring diagram for cabinet power and wireless communications',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - Diagram - Cabinet_Power_Wireless_Comms.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },
  {
    id: 28,
    title: 'Nexus Omni AI Detection Flyer',
    description: 'Overview flyer for Nexus Omni AI detection capabilities',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic - Flyer - Nexus Omni AI Detection 0825.pdf',
    size: 'N/A',
    pages: null,
    version: '08-25',
    updated: '2024-08'
  },
  {
    id: 29,
    title: 'Detection Product Technical Specification',
    description: 'Detailed technical specifications for detection products',
    category: 'documentation',
    type: 'PDF',
    filePath: '/resources/Technical Resources/NoTraffic Detection Product - Technical Spec Sheet.pdf',
    size: 'N/A',
    pages: null,
    version: 'Latest',
    updated: '2024-10'
  },

  // TRAINING VIDEOS
  // TO ADD YOUTUBE URLS: 
  // 1. Upload video to YouTube
  // 2. Click "Share" → "Embed" 
  // 3. Copy the URL from src="..." (should be: https://www.youtube.com/embed/VIDEO_ID)
  // 4. Uncomment the externalUrl line and paste your URL
  // 5. Comment out or remove the filePath line
  
  {
    id: 40,
    title: 'AI Mobility Platform Overview',
    description: 'Introduction to the NoTraffic AI Mobility Platform',
    category: 'videos',
    type: 'Video',
    // filePath: '/resources/videos/AI_Mobility_Platform.mp4', // Local only
    externalUrl: '', // ADD YOUTUBE EMBED URL HERE: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 41,
    title: 'Advanced Detection - Far Zone',
    description: 'Demonstration of advanced far-zone detection capabilities',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 42,
    title: 'Pedestrian and Micromobility Detection',
    description: 'Detection capabilities for pedestrians, bikes, and scooters',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 43,
    title: 'Truck Detection Demo',
    description: 'Heavy vehicle and truck detection demonstration',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 44,
    title: 'Weather Performance - Heavy Rain',
    description: 'System performance during heavy rain conditions',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 45,
    title: 'Weather Performance - Snow',
    description: 'System performance in snow conditions',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 46,
    title: 'Weather Performance - Snow and Rain',
    description: 'Mixed weather condition performance',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 47,
    title: 'Weather Performance - Fog',
    description: 'System visibility and performance in foggy conditions',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 48,
    title: 'Weather Performance - Sun Glare',
    description: 'Performance during challenging sun glare conditions',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 49,
    title: 'Front Panel Access Demo',
    description: 'Demonstration of front panel access and controls',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 50,
    title: 'Optimization Case Study',
    description: 'Real-world traffic optimization case study',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 51,
    title: 'V2X Current Challenges',
    description: 'Overview of Vehicle-to-Everything (V2X) technology challenges',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  },
  {
    id: 52,
    title: 'Virtual Transit Signal Priority (vTSP)',
    description: 'Introduction to virtual transit signal priority technology',
    category: 'videos',
    type: 'Video',
    externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
    size: 'N/A',
    pages: null,
    version: '2024',
    updated: '2024-10'
  }
]

// FAQ data - Update with your actual FAQs
export const faqs = [
  {
    question: 'How long does installation take?',
    answer: 'Installation time varies based on the size of deployment. A single intersection typically takes 1-2 days, while larger deployments can take several weeks. Our installation tool can provide a more accurate estimate based on your specific requirements.'
  },
  {
    question: 'What internet connectivity is required?',
    answer: 'NoTraffic systems can work with various connectivity options including fiber optic, 4G/5G cellular, and mixed networks. Minimum recommended bandwidth is 10 Mbps per intersection for optimal performance.'
  },
  {
    question: 'Can NoTraffic integrate with existing systems?',
    answer: 'Yes, NoTraffic is designed to integrate with most existing traffic management systems and infrastructure. We support standard traffic management protocols and can provide custom integration solutions.'
  },
  {
    question: 'What maintenance is required?',
    answer: 'NoTraffic systems require minimal maintenance. Regular software updates are provided automatically, and hardware maintenance is typically needed only annually. Our support team can provide preventive maintenance services.'
  },
  {
    question: 'How is data privacy handled?',
    answer: 'NoTraffic uses privacy-preserving technology that analyzes traffic patterns without storing personally identifiable information. All data is encrypted in transit and at rest, and we comply with all relevant privacy regulations.'
  },
  {
    question: 'What training is provided?',
    answer: 'We provide comprehensive training including on-site sessions, online modules, documentation, and video tutorials. Training can be customized based on your team\'s needs and technical background.'
  }
]

