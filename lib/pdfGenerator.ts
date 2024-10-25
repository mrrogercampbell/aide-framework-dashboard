// lib/pdfGenerator.ts
import { AwarenessFormData } from '@/types/awareness';
import PDFDocument from 'pdfkit';

export async function generatePDF(data: AwarenessFormData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const chunks: Buffer[] = [];

            // Collect the PDF data chunks
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));

            // Add content to the PDF
            doc
                .fontSize(20)
                .text('A.I.D.E Framework™ Workbook: Awareness', { align: 'center' })
                .moveDown();

            // Basic Information
            doc
                .fontSize(16)
                .text('Basic Information')
                .moveDown()
                .fontSize(12);

            doc.text(`Full Name: ${data.basicInfo.fullName}`);
            doc.text(`Email: ${data.basicInfo.email}`);
            doc.text(`Company: ${data.basicInfo.company}`);
            doc.text(`Title: ${data.basicInfo.title}`);
            doc.text(`Date: ${data.basicInfo.date.toLocaleDateString()}`);
            doc.moveDown();

            // Add other sections...
            // (We can expand this with more detailed formatting)

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
}