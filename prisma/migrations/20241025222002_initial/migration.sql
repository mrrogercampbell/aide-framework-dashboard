-- CreateTable
CREATE TABLE "AwarenessForm" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "aiUsage" JSONB NOT NULL,
    "businessGoals" JSONB NOT NULL,
    "criticalProcesses" JSONB NOT NULL,
    "processAnalysis" JSONB NOT NULL,
    "integrationSummary" JSONB NOT NULL,

    CONSTRAINT "AwarenessForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_formId_key" ON "Document"("formId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_formId_fkey" FOREIGN KEY ("formId") REFERENCES "AwarenessForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
