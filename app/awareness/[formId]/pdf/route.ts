// app/api/awareness/[formId]/pdf/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';
import { formatDate } from '@/lib/utils';

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { formId: string } }
) {
    try {
        const formData = await prisma.awarenessForm.findUnique({
            where: {
                id: params.formId,
            },
        });

        if (!formData) {
            return NextResponse.json(
                { success: false, error: 'Form not found' },
                { status: 404 }
            );
        }

        // Create a new PDF document
        const doc = new PDFDocument();
        const chunks: Buffer[] = [];

        // Collect the PDF chunks
        doc.on('data', (chunk) => chunks.push(chunk));

        // Return the complete PDF
        return new Promise<NextResponse>((resolve) => {
            doc.on('end', () => {
                const result = Buffer.concat(chunks);
                const response = new NextResponse(result);
                response.headers.set('Content-Type', 'application/pdf');
                response.headers.set(
                    'Content-Disposition',
                    `attachment; filename=${formData.company}-awareness-workbook.pdf`
                );
                resolve(response);
            });

            // Add content to PDF
            generatePDF(doc, formData);
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}

function generatePDF(doc: PDFKit.PDFDocument, formData: any) {
    // Helper function to add a section title
    const addSectionTitle = (title: string) => {
        doc.moveDown()
            .fontSize(16)
            .fillColor('#2563EB')
            .text(title)
            .moveDown()
            .fontSize(12)
            .fillColor('#000000');
    };

    // Add header
    doc.fontSize(24)
        .fillColor('#1E40AF')
        .text('A.I.D.E Framework™ Workbook: Awareness', { align: 'center' })
        .moveDown();

    // Basic Information
    addSectionTitle('Basic Information');
    doc.text(`Full Name: ${formData.fullName}`);
    doc.text(`Email: ${formData.email}`);
    doc.text(`Company: ${formData.company}`);
    doc.text(`Title: ${formData.title}`);
    doc.text(`Date: ${formatDate(formData.date)}`);

    // Current AI Usage
    addSectionTitle('Current AI Tool Usage');
    const aiUsage = formData.aiUsage as any[];
    aiUsage.forEach((tool, index) => {
        doc.text(`Tool ${index + 1}:`)
            .moveDown(0.5)
            .text(`Name: ${tool.toolName}`)
            .text(`Department: ${tool.department}`)
            .text(`Purpose: ${tool.purpose}`)
            .moveDown();
    });

    // Business Goals
    addSectionTitle('Key Business Goals');
    const businessGoals = formData.businessGoals as any[];
    businessGoals.forEach((goal) => {
        doc.text(`Goal (Rank ${goal.rank}):`)
            .moveDown(0.5)
            .text(`Description: ${goal.goal}`)
            .text(`Importance: ${goal.importance}`)
            .moveDown();
    });

    // Critical Processes
    addSectionTitle('Critical Processes');
    const processes = formData.criticalProcesses as any[];
    processes.forEach((process) => {
        doc.text(`Process:`)
            .moveDown(0.5)
            .text(`Related Goal: ${process.goal}`)
            .text(`Name: ${process.process}`)
            .text(`Description: ${process.description}`)
            .moveDown();
    });

    // Process Analysis
    addSectionTitle('Process Analysis');
    const analyses = formData.processAnalysis as any[];
    analyses.forEach((analysis) => {
        doc.text(`Analysis:`)
            .moveDown(0.5)
            .text(`Process: ${analysis.processName}`)
            .text(`Task: ${analysis.task}`)
            .text(`Current Issues: ${analysis.currentIssue}`)
            .moveDown();
    });

    // Integration Summary
    addSectionTitle('AI Integration Opportunities');
    const summaries = formData.integrationSummary as any[];
    summaries.forEach((summary) => {
        doc.text(`Integration Opportunity:`)
            .moveDown(0.5)
            .text(`Goal: ${summary.goal}`)
            .text(`Process: ${summary.process}`)
            .text(`Task: ${summary.task}`)
            .text(`Proposed Solution: ${summary.proposedSolution}`)
            .text(`Expected Benefits: ${summary.expectedBenefits}`)
            .text(`Integration Tier: ${summary.integrationTier}`)
            .moveDown();
    });

    // End the document
    doc.end();
}