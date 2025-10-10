import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    
    const updated = await prisma.mOSAccountRegistration.update({
      where: { id: params.id },
      data: { status: body.status }
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating MOS account registration:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update registration' 
    }, { status: 500 })
  }
}

