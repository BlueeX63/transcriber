import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import prisma from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

export async function POST(request: Request) {
  let tempFilePath = '';
  let uploadedFileUri = '';
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'File and title are required' }, { status: 400 });
    }

    // Read the file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write file to a temporary location
    const ext = file.name.split('.').pop() || 'mp3';
    tempFilePath = join(tmpdir(), `${uuidv4()}.${ext}`);
    await writeFile(tempFilePath, buffer);

    // Upload to Gemini
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType: file.type || 'audio/mpeg',
      displayName: title,
    });
    uploadedFileUri = uploadResult.file.uri;

    // Call Gemini to transcribe
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResult.file.mimeType,
          fileUri: uploadResult.file.uri
        }
      },
      { text: "Please provide a highly accurate transcription of this audio file. Output only the text transcription, without any extra commentary." }
    ]);

    const transcriptionText = result.response.text();

    // Save to Database
    const savedTranscript = await prisma.transcript.create({
      data: {
        title: title,
        text: transcriptionText,
      }
    });

    return NextResponse.json({ 
      success: true, 
      transcription: transcriptionText,
      transcriptId: savedTranscript.id 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Transcription error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  } finally {
    // Cleanup temporary file
    if (tempFilePath) {
      try { await unlink(tempFilePath); } catch (e) {}
    }
    if (uploadedFileUri) {
      try { await fileManager.deleteFile(uploadedFileUri.split('/').pop()!); } catch (e) {}
    }
  }
}
