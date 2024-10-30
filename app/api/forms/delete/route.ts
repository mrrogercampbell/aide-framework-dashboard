import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: 'Invalid or empty ids array' },
                { status: 400 }
            );
        }

        await prisma.awarenessForm.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting forms:', error);
        return NextResponse.json(
            { error: 'Failed to delete forms' },
            { status: 500 }
        );
    }
}