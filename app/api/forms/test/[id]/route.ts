// app/api/forms/test/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const form = await prisma.awarenessForm.findUnique({
            where: { id: params.id }
        });

        return NextResponse.json({ form });
    } catch (error) {
        console.error('Error fetching form:', error);
        return NextResponse.json(
            { error: 'Failed to fetch form' },
            { status: 500 }
        );
    }
}