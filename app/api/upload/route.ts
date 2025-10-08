import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const uploadedFiles: string[] = []

    // For serverless/Railway, convert files to data URLs (base64)
    // This stores files in the database instead of filesystem
    for (const file of files) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        
        // Create data URL with filename metadata
        const dataUrl = `data:${file.type};name=${encodeURIComponent(file.name)};base64,${base64}`
        uploadedFiles.push(dataUrl)
      }
    }

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles 
    })
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to upload files',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

