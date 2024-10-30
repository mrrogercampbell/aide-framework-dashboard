// app/api/forms/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const forms = await prisma.awarenessForm.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                fullName: true,
                company: true,
                email: true,
                createdAt: true,
                title: true
            }
        });

        return NextResponse.json({ forms });
    } catch (error) {
        console.error('Error fetching forms:', error);
        return NextResponse.json(
            { error: 'Failed to fetch forms' },
            { status: 500 }
        );
    }
}