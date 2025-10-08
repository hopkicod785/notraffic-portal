import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const inquiry = await prisma.productInquiry.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company || null,
        phone: body.phone || null,
        product: body.product,
        message: body.message,
        status: 'new'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      id: inquiry.id 
    }, { status: 200 })

  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit inquiry' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.productInquiry.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: inquiries })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

