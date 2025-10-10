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
    
    const updated = await prisma.productInquiry.update({
      where: { id: params.id },
      data: { status: body.status }
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating product inquiry:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update inquiry' 
    }, { status: 500 })
  }
}

