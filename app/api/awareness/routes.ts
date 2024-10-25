// app/api/awareness/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AwarenessFormData } from '@/types/awareness';

const prisma = new PrismaClient();

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
                aiUsage: data.aiUsage,
                businessGoals: data.businessGoals,
                criticalProcesses: data.criticalProcesses,
                processAnalysis: data.processAnalysis,
                integrationSummary: data.integrationSummary,
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