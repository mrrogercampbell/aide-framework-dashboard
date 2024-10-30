// app/api/forms/[id]/pdf/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { FormGenerator } from '@/lib/pdf/generators/FormGenerator';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const form = await prisma.awarenessForm.findUnique({
            where: { id: params.id }
        });

        if (!form) {
            return NextResponse.json(
                { error: 'Form not found' },
                { status: 404 }
            );
        }

        const pdfGenerator = new FormGenerator();
        const doc = pdfGenerator.generatePDF(form);
        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

        const response = new NextResponse(pdfBuffer);
        response.headers.set('Content-Type', 'application/pdf');
        response.headers.set(
            'Content-Disposition',
            `attachment; filename="${form.company}-awareness-workbook.pdf"`
        );

        return response;

    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}
