// app/api/forms/list/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const forms = await prisma.awarenessForm.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({ forms });
    } catch (error) {
        console.error('Error listing forms:', error);
        return NextResponse.json(
            { error: 'Failed to list forms' },
            { status: 500 }
        );
    }
}