import { NextRequest, NextResponse } from 'next/server'

// Type for file-like objects from FormData in Node.js
interface FileBlob extends Blob {
  name: string
}

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    const formData = await request.formData()
    console.log('FormData parsed')
    
    const files = formData.getAll('files')
    console.log('Files found:', files.length)
    
    const uploadedFiles: string[] = []

    // For serverless/Railway, convert files to data URLs (base64)
    // This stores files in the database instead of filesystem
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      console.log(`Processing file ${i + 1}:`, typeof file, file)
      
      // In Node.js/Next.js API routes, files are Blob objects with a name property
      if (file && typeof file === 'object' && 'arrayBuffer' in file) {
        try {
          const fileBlob = file as FileBlob
          const fileName = fileBlob.name || `file-${i + 1}`
          const fileType = fileBlob.type || 'application/octet-stream'
          const fileSize = fileBlob.size || 0
          
          console.log(`File ${i + 1} name:`, fileName)
          console.log(`File ${i + 1} type:`, fileType)
          console.log(`File ${i + 1} size:`, fileSize)
          
          const bytes = await fileBlob.arrayBuffer()
          console.log(`File ${i + 1} bytes length:`, bytes.byteLength)
          
          const buffer = Buffer.from(bytes)
          console.log(`File ${i + 1} buffer created`)
          
          const base64 = buffer.toString('base64')
          console.log(`File ${i + 1} base64 length:`, base64.length)
          
          // Create data URL with filename metadata
          const dataUrl = `data:${fileType};name=${encodeURIComponent(fileName)};base64,${base64}`
          uploadedFiles.push(dataUrl)
          console.log(`File ${i + 1} converted successfully`)
        } catch (fileError) {
          console.error(`Error processing file ${i + 1}:`, fileError)
          throw fileError
        }
      } else {
        console.warn(`File ${i + 1} is not a valid Blob object`)
      }
    }

    console.log('All files processed successfully:', uploadedFiles.length)
    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles 
    })
  } catch (error) {
    console.error('Error uploading files:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to upload files',
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

