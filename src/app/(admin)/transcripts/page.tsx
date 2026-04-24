import React from 'react';
import TranscriptsList from '@/components/TranscriptsList';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function TranscriptsPage() {
  const transcripts = await prisma.transcript.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Pass raw dates to the client component to format properly
  const formattedTranscripts = transcripts.map((t: any) => {
    return {
      id: t.id,
      title: t.title,
      text: t.text,
      createdAt: t.createdAt.toISOString(),
    };
  });

  return <TranscriptsList transcripts={formattedTranscripts} />;
}