import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json({ 
        success: false, 
        message: 'Database not configured' 
      }, { status: 503 })
    }

    const body = await request.json()
    
    const inquiry = await prisma.serviceInquiry.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company || null,
        phone: body.phone || null,
        service: body.service,
        message: body.message,
        status: 'new'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Service inquiry submitted successfully',
      id: inquiry.id 
    }, { status: 200 })

  } catch (error) {
    console.error('Error submitting service inquiry:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit inquiry' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ success: true, data: [] })
    }

    const inquiries = await prisma.serviceInquiry.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: inquiries })
  } catch (error) {
    console.error('Error fetching service inquiries:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

