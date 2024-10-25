// utils/testData.ts
import { AwarenessFormInput } from '@/types/awareness';

export const getTestFormData = (): Partial<AwarenessFormInput> => ({
    basicInfo: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Tech Corp Inc.',
        title: 'Technology Director',
        date: new Date().toISOString().split('T')[0]
    },
    aiUsage: [
        {
            toolName: 'ChatGPT',
            department: 'Customer Service',
            purpose: 'Customer inquiry responses'
        },
        {
            toolName: 'Midjourney',
            department: 'Marketing',
            purpose: 'Content creation and design'
        }
    ],
    businessGoals: [
        {
            rank: 1,
            goal: 'Improve Customer Response Time',
            importance: 'Critical for customer satisfaction and retention'
        },
        {
            rank: 2,
            goal: 'Automate Backend Operations',
            importance: 'Reduce operational costs and improve efficiency'
        },
        {
            rank: 3,
            goal: 'Enhance Data Analytics',
            importance: 'Better decision making and predictive capabilities'
        }
    ],
    criticalProcesses: [
        {
            goal: 'Improve Customer Response Time',
            process: 'Customer Ticket Resolution',
            description: 'Process of handling and resolving customer support tickets',
            analyzeProcess: true
        },
        {
            goal: 'Automate Backend Operations',
            process: 'Data Entry and Validation',
            description: 'Manual data entry and verification process',
            analyzeProcess: true
        },
        {
            goal: 'Enhance Data Analytics',
            process: 'Report Generation',
            description: 'Creating and distributing business reports',
            analyzeProcess: true
        }
    ],
    processAnalysis: [
        {
            processName: 'Customer Ticket Resolution',
            goal: 'Improve Customer Response Time',
            task: 'Initial Ticket Classification',
            currentIssue: 'Manual classification is time-consuming and inconsistent'
        },
        {
            processName: 'Data Entry and Validation',
            goal: 'Automate Backend Operations',
            task: 'Document Data Extraction',
            currentIssue: 'Manual data entry prone to errors and very time intensive'
        },
        {
            processName: 'Report Generation',
            goal: 'Enhance Data Analytics',
            task: 'Data Aggregation',
            currentIssue: 'Manual data collection from multiple sources is inefficient'
        }
    ],
    integrationSummary: [
        {
            goal: 'Improve Customer Response Time',
            process: 'Customer Ticket Resolution',
            task: 'Initial Ticket Classification',
            proposedSolution: 'Implement NLP-based ticket classification system',
            expectedBenefits: 'Reduce classification time by 80%, improve accuracy to 95%',
            integrationTier: 'Integrated Process'
        },
        {
            goal: 'Automate Backend Operations',
            process: 'Data Entry and Validation',
            task: 'Document Data Extraction',
            proposedSolution: 'Deploy OCR and AI-based data extraction',
            expectedBenefits: '90% reduction in manual data entry, 99% accuracy',
            integrationTier: 'Custom Enterprise Solution'
        }
    ]
});