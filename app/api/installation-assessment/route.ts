import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const assessment = await prisma.installationAssessment.create({
      data: {
        deploymentType: body.deploymentType,
        cabinetType: body.cabinetType || [],
        intersections: body.intersections,
        equipment: body.equipment,
        auxiliary: body.auxiliary,
        timeline: body.timeline
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Assessment saved successfully',
      id: assessment.id 
    }, { status: 200 })

  } catch (error) {
    console.error('Error saving assessment:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to save assessment' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const assessments = await prisma.installationAssessment.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: assessments })
  } catch (error) {
    console.error('Error fetching assessments:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch assessments' }, { status: 500 })
  }
}

