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
    
    const registration = await prisma.mOSAccountRegistration.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        agency: body.agency,
        email: body.email,
        phone: body.phone || null,
        status: 'pending'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'MOS account registration submitted successfully',
      id: registration.id 
    }, { status: 200 })

  } catch (error) {
    console.error('Error submitting MOS account registration:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit registration' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ success: true, data: [] })
    }

    const registrations = await prisma.mOSAccountRegistration.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: registrations })
  } catch (error) {
    console.error('Error fetching MOS account registrations:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch registrations' }, { status: 500 })
  }
}

