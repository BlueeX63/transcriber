import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { decrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Basic Auth Check
    const session = (await cookies()).get('admin_session')?.value;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await decrypt(session);

    // Next.js 15+ dynamic params handling
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: 'Transcript ID is required' }, { status: 400 });
    }

    await prisma.transcript.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete transcript:', error);
    return NextResponse.json(
      { error: 'Failed to delete transcript. It may have already been deleted.' },
      { status: 500 }
    );
  }
}
