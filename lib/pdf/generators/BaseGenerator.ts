import jsPDF from 'jspdf';
import { STYLES } from '../constants/styles';

export class BaseGenerator {
    protected doc: jsPDF;
    protected y: number;
    protected x: number;
    protected contentWidth: number;

    constructor() {
        this.doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });
        this.y = STYLES.page.margin;
        this.x = STYLES.page.margin;
        this.contentWidth = STYLES.page.width - (2 * STYLES.page.margin);
    }

    protected checkPageBreak(needed: number) {
        if (this.y + needed > 270) {
            this.doc.addPage();
            this.y = STYLES.page.margin;
        }
    }

    protected addTitle(text: string) {
        this.doc.setFontSize(24);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(STYLES.colors.heading[0], STYLES.colors.heading[1], STYLES.colors.heading[2]);
        this.doc.text(text, this.x, this.y);
        this.y += 12;
    }

    protected addSectionTitle(text: string) {
        this.checkPageBreak(15);
        this.doc.setFontSize(16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(STYLES.colors.heading[0], STYLES.colors.heading[1], STYLES.colors.heading[2]);
        this.doc.text(text, this.x, this.y);
        this.y += 8;
    }

    protected addSectionDescription(text: string) {
        this.doc.setFontSize(11);
        this.doc.setTextColor(STYLES.colors.text[0], STYLES.colors.text[1], STYLES.colors.text[2]);
        const lines = this.doc.splitTextToSize(text, this.contentWidth);
        this.doc.text(lines, this.x, this.y);
        this.y += (lines.length * 5) + 5;
    }

    protected addDivider() {
        this.checkPageBreak(10);
        this.doc.setDrawColor(STYLES.colors.border[0], STYLES.colors.border[1], STYLES.colors.border[2]);
        this.doc.setLineWidth(0.5);
        this.doc.line(this.x, this.y, STYLES.page.width - this.x, this.y);
        this.y += 8;
    }

    protected addFormField(label: string, value: string, indent = 0) {
        this.checkPageBreak(12);
        const xPos = this.x + indent;

        // Add more space before each field
        this.y += 3;

        // Label
        this.doc.setFontSize(11);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(STYLES.colors.heading[0], STYLES.colors.heading[1], STYLES.colors.heading[2]);
        this.doc.text(label, xPos, this.y);

        // Only add value if it's not empty
        if (value) {
            // Increase spacing between label and value
            this.y += 6;
            this.doc.setFont('helvetica', 'normal');
            this.doc.setTextColor(STYLES.colors.text[0], STYLES.colors.text[1], STYLES.colors.text[2]);
            const lines = this.doc.splitTextToSize(value, this.contentWidth - indent);
            this.doc.text(lines, xPos, this.y);
            this.y += (lines.length * 5) + 5; // Increased spacing after value
        } else {
            this.y += 4; // Increased spacing if no value
        }
    }
}
