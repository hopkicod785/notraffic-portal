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
    
    const registration = await prisma.installationRegistration.create({
      data: {
        agency: body.agency,
        distributor: body.distributor,
        intersections: body.intersections,
        estimatedDate: new Date(body.estimatedDate),
        cabinetType: body.cabinetType || [],
        cabinetTypeOther: body.cabinetTypeOther || null,
        signalPhasingFiles: body.signalPhasingFiles || [],
        signalTimingFiles: body.signalTimingFiles || [],
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        status: 'pending'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Registration submitted successfully',
      id: registration.id 
    }, { status: 200 })

  } catch (error) {
    console.error('Error submitting registration:', error)
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

    const registrations = await prisma.installationRegistration.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: registrations })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch registrations' }, { status: 500 })
  }
}

