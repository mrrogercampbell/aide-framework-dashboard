export interface FormData {
    fullName: string;
    email: string;
    company: string;
    title: string;
    date: string;
    aiUsage: string;
    businessGoals: string;
    criticalProcesses: string;
    processAnalysis: string;
    integrationSummary: string;
}

export interface BusinessGoal {
    rank: number;
    goal: string;
    importance: string;
}

export interface ProcessAnalysis {
    process: string;
    goal: string;
    processName: string;
    task: string;
    currentIssue: string;
}

export interface IntegrationOpportunity {
    goal: string;
    process: string;
    task: string;
    integrationTier: string;
    proposedSolution: string;
    expectedBenefits: string;
}

