import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ 
        success: false, 
        message: 'Database not configured' 
      }, { status: 503 })
    }

    const registration = await prisma.installationRegistration.findUnique({
      where: { id: params.id }
    })

    if (!registration) {
      return NextResponse.json({ 
        success: false, 
        message: 'Registration not found' 
      }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: registration })
  } catch (error) {
    console.error('Error fetching registration:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch registration' 
    }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ 
        success: false, 
        message: 'Database not configured' 
      }, { status: 503 })
    }

    const body = await request.json()
    
    const updated = await prisma.installationRegistration.update({
      where: { id: params.id },
      data: { status: body.status }
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating registration:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update registration' 
    }, { status: 500 })
  }
}

