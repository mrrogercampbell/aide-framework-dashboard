// types/awareness.ts
export interface BasicInfoForm {
    fullName: string;
    email: string;
    company: string;
    title: string;
    date: string;
}

export interface BasicInfoData {
    fullName: string;
    email: string;
    company: string;
    title: string;
    date: Date;
}

export interface AIUsage {
    toolName: string;
    department: string;
    purpose: string;
}

export interface BusinessGoal {
    rank: number;
    goal: string;
    importance: string;
}

export interface CriticalProcess {
    goal: string;
    process: string;
    description: string;
    analyzeProcess: boolean;
}

export interface ProcessAnalysis {
    processName: string;
    goal: string;
    task: string;
    currentIssue: string;
}

export interface IntegrationSummary {
    goal: string;
    process: string;
    task: string;
    proposedSolution: string;
    expectedBenefits: string;
    integrationTier: 'Isolated Tool' | 'Integrated Process' | 'Custom Enterprise Solution';
}

// Complete data structure for API/Database
export interface AwarenessFormData {
    basicInfo: BasicInfoData;
    aiUsage: AIUsage[];
    businessGoals: BusinessGoal[];
    criticalProcesses: CriticalProcess[];
    processAnalysis: ProcessAnalysis[];
    integrationSummary: IntegrationSummary[];
}

// Complete form input structure
export interface AwarenessFormInput {
    basicInfo: BasicInfoForm;
    aiUsage: AIUsage[];
    businessGoals: BusinessGoal[];
    criticalProcesses: CriticalProcess[];
    processAnalysis: ProcessAnalysis[];
    integrationSummary: IntegrationSummary[];
}

// Optional: Helper type for form state
export type AwarenessFormState = {
    isSubmitting: boolean;
    activeStep: number;
    completedSteps: number[];
    savedData?: AwarenessFormData;
}

// Optional: Validation schema type
export type ValidationErrors = {
    [K in keyof AwarenessFormInput]?: {
        message: string;
        type: string;
    }[];
}