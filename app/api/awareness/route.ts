// app/api/awareness/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AwarenessFormData } from '@/types/awareness';

export async function POST(request: Request) {
    try {
        const data: AwarenessFormData = await request.json();

        // Create the form entry
        const form = await prisma.awarenessForm.create({
            data: {
                fullName: data.basicInfo.fullName,
                email: data.basicInfo.email,
                company: data.basicInfo.company,
                title: data.basicInfo.title,
                date: data.basicInfo.date,
                aiUsage: JSON.stringify(data.aiUsage), // Convert array to JSON string
                businessGoals: JSON.stringify(data.businessGoals),
                criticalProcesses: JSON.stringify(data.criticalProcesses),
                processAnalysis: JSON.stringify(data.processAnalysis),
                integrationSummary: JSON.stringify(data.integrationSummary),
            },
        });

        return NextResponse.json({
            success: true,
            formId: form.id,
            message: 'Form submitted successfully',
        });
    } catch (error) {
        console.error('Error saving form:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save form' },
            { status: 500 }
        );
    }
}

// Add a GET route to fetch submissions
export async function GET(request: Request) {
    try {
        const forms = await prisma.awarenessForm.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            forms,
        });
    } catch (error) {
        console.error('Error fetching forms:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch forms' },
            { status: 500 }
        );
    }
}
