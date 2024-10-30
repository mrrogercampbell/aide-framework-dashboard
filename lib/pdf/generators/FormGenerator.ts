import { BaseGenerator } from './BaseGenerator';
import type { FormData } from '../types';
import { STYLES } from '../constants/styles';
import type { jsPDF } from 'jspdf';

export class FormGenerator extends BaseGenerator {
    constructor() {
        super();
    }

    private addBasicInfo(data: any) {
        this.addSectionTitle('Basic Information');
        this.addFormField('Full Name:', data.fullName);
        this.addFormField('Email:', data.email);
        this.addFormField('Company:', data.company);
        this.addFormField('Title:', data.title);
        this.addFormField('Date:', new Date(data.date).toLocaleDateString());
        this.addDivider();
    }

    private addAIUsage(aiUsage: any[]) {
        this.addSectionTitle('Current AI Tool Usage');
        aiUsage.forEach((tool, index) => {
            this.addFormField(`Tool ${index + 1}:`, '');
            this.addFormField('Name:', tool.toolName, 5);
            this.addFormField('Department:', tool.department, 5);
            this.addFormField('Purpose:', tool.purpose, 5);
        });
        this.addDivider();
    }

    private addBusinessGoals(goals: any[]) {
        this.addSectionTitle('Key Business Goals');
        this.addSectionDescription('What are your top 1-3 business or team goals for the next year?');
        goals.forEach((goal, index) => {
            // Add more spacing between goals
            if (index > 0) this.y += 8;

            this.doc.setFont('helvetica', 'bold');
            // Fix the spacing in the rank text
            this.doc.text(`Rank ${goal.rank} `, STYLES.page.width - 50, this.y);
            this.addFormField('Goal:', goal.goal, 5);
            this.addFormField('Importance:', goal.importance, 5);
        });
        this.addDivider();
    }

    private addProcessAnalysis(processes: any[], analyses: any[]) {
        this.addSectionTitle('Process Analysis');
        if (processes.length === 0) {
            this.addSectionDescription('No processes marked for analysis.');
            return;
        }

        processes.forEach((process, index) => {
            // Add spacing between processes
            if (index > 0) this.y += 10;

            this.addFormField('Process:', process.process);
            this.addFormField('Goal:', process.goal, 5);

            const processAnalyses = analyses.filter(a => a.processName === process.process);
            processAnalyses.forEach((analysis, analysisIndex) => {
                if (analysisIndex > 0) this.y += 5;
                this.addFormField('Task:', analysis.task, 5);
                this.addFormField('Current Issues:', analysis.currentIssue, 5);
            });
        });
        this.addDivider();
    }

    private addTiersGuide() {
        const startY = this.y;

        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Integration Tiers Guide', this.x, this.y);
        this.y += 8;

        const tiers = [
            { label: 'Tier 1: Isolated Tools', desc: 'Ready-made AI solutions, quick to deploy, independent of existing systems' },
            { label: 'Tier 2: Integrated Processes', desc: 'AI solutions tailored to business needs, enhancing functionality and connecting existing tools' },
            { label: 'Tier 3: Custom Enterprise Solutions', desc: 'Fully integrated AI systems, offering maximum customization and scalability' }
        ];

        tiers.forEach(tier => {
            this.addFormField(tier.label + ':', tier.desc, 5);
        });

        // Draw border only, no background fill
        const height = this.y - startY;
        this.doc.setDrawColor(STYLES.colors.border[0], STYLES.colors.border[1], STYLES.colors.border[2]);
        this.doc.roundedRect(this.x, startY, this.contentWidth, height, 3, 3, 'S'); // Changed 'FD' to 'S'

        this.y += 5;
    }

    private addIntegrationSummary(summary: any[]) {
        this.addSectionTitle('AI Integration Opportunities');
        this.addSectionDescription('Recommended AI solutions and their expected benefits');

        // Add Integration Tiers Guide
        const startY = this.y;

        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Integration Tiers Guide', this.x, this.y);
        this.y += 8;

        const tiers = [
            { label: 'Tier 1: Isolated Tools', desc: 'Ready-made AI solutions, quick to deploy, independent of existing systems' },
            { label: 'Tier 2: Integrated Processes', desc: 'AI solutions tailored to business needs, enhancing functionality and connecting existing tools' },
            { label: 'Tier 3: Custom Enterprise Solutions', desc: 'Fully integrated AI systems, offering maximum customization and scalability' }
        ];

        tiers.forEach(tier => {
            this.addFormField(tier.label + ':', tier.desc, 5);
        });

        this.y += 10; // Increased spacing after guide

        summary.forEach((item, index) => {
            // Add more spacing between opportunities
            if (index > 0) this.y += 12;

            this.addFormField(`Integration Opportunity ${index + 1}:`, '');
            this.y += 2; // Add a bit more space after the opportunity title
            this.addFormField('Goal:', item.goal, 5);
            this.addFormField('Process:', item.process, 5);
            this.addFormField('Task:', item.task, 5);
            this.addFormField('Integration Tier:', item.integrationTier, 5);
            this.addFormField('Proposed Solution:', item.proposedSolution, 5);
            this.addFormField('Expected Benefits:', item.expectedBenefits, 5);
        });
    }

    public generatePDF(data: any) {
        // Title
        this.addTitle('A.I.D.E Framework™ Workbook: Awareness');
        this.addSectionDescription('Assessment and Analysis Report');
        this.addDivider();

        // Parse JSON strings
        const aiUsage = JSON.parse(data.aiUsage as string);
        const businessGoals = JSON.parse(data.businessGoals as string);
        const criticalProcesses = JSON.parse(data.criticalProcesses as string);
        const processAnalysis = JSON.parse(data.processAnalysis as string);
        const integrationSummary = JSON.parse(data.integrationSummary as string);

        // Add sections
        this.addBasicInfo(data);
        this.addAIUsage(aiUsage);
        this.addBusinessGoals(businessGoals);
        this.addProcessAnalysis(
            criticalProcesses.filter((p: any) => p.analyzeProcess),
            processAnalysis
        );
        this.addIntegrationSummary(integrationSummary);

        // Add page numbers
        const pageCount = this.doc.internal.pages.length - 1;
        for (let i = 1; i <= pageCount; i++) {
            this.doc.setPage(i);
            this.doc.setFontSize(10);
            this.doc.setTextColor(STYLES.colors.subtext[0], STYLES.colors.subtext[1], STYLES.colors.subtext[2]);
            this.doc.text(
                `Page ${i} of ${pageCount}`,
                STYLES.page.width / 2,
                285,
                { align: 'center' }
            );
        }

        return this.doc;
    }
}

