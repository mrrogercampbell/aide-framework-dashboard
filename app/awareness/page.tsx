// app/awareness/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useFormStore } from '@/store/formStore';
import { BasicInfoForm } from '@/components/forms/BasicInfoForm';
import { AIUsageForm } from '@/components/forms/AIUsageForm';
import { BusinessGoalsForm } from '@/components/forms/BusinessGoalsForm';
import { CriticalProcessesForm } from '@/components/forms/CriticalProcessesForm';
import { ProcessAnalysisForm } from '@/components/forms/ProcessAnalysisForm';
import { IntegrationSummaryForm } from '@/components/forms/IntegrationSummaryForm';
import { AwarenessFormInput, AwarenessFormData } from '@/types/awareness';
import { getTestFormData } from '@/utils/testData';

export default function AwarenessPage() {
    const { formData, isSubmitting, setFormData, setIsSubmitting, resetForm } = useFormStore();
    const [formId, setFormId] = useState<string | null>(null);

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isDirty },
    } = useForm<AwarenessFormInput>({
        defaultValues: formData
    });

    useEffect(() => {
        if (formData) {
            reset(formData);
        }
    }, [formData, reset]);

    // Watch for changes in criticalProcesses
    const criticalProcesses = watch('criticalProcesses');
    const hasProcessesToAnalyze = criticalProcesses?.some(p => p.analyzeProcess);

    // Update store only when form is dirty and not submitting
    const formValues = watch();
    useEffect(() => {
        if (isDirty && !isSubmitting) {
            const timeoutId = setTimeout(() => {
                setFormData(formValues);
            }, 1000); // Debounce updates

            return () => clearTimeout(timeoutId);
        }
    }, [formValues, isDirty, isSubmitting, setFormData]);

    const handleFillTestData = () => {
        const testData = getTestFormData() as AwarenessFormInput;
        reset(testData);
        setFormData(testData);
    };

    const onSubmit = async (formData: AwarenessFormInput) => {
        setIsSubmitting(true);
        try {
            const data: AwarenessFormData = {
                ...formData,
                basicInfo: {
                    ...formData.basicInfo,
                    date: new Date(formData.basicInfo.date)
                }
            };

            const response = await fetch('/api/awareness', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit form');
            }

            setFormId(result.formId);
            toast.success('Form submitted successfully!');
            resetForm();

            // PDF download logic
            const pdfResponse = await fetch(`/api/forms/${result.formId}/pdf`);
            if (!pdfResponse.ok || !pdfResponse.headers.get('content-type')?.includes('application/pdf')) {
                throw new Error('Failed to generate PDF');
            }

            const blob = await pdfResponse.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${data.basicInfo.company}-workbook.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            console.error('Error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to submit form');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">The A.I.D.E. Framework&trade; Workbook: Awareness</h1>
                    <p className="mt-2 text-gray-600">
                        Complete this form to assess your organization&apos;s current AI usage and future opportunities.
                    </p>
                </div>

                {/* Only show the test data button in development */}
                {/* {process.env.NODE_ENV === 'development' && ( */}
                <button
                    type="button"
                    onClick={handleFillTestData}
                    className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                >
                    Fill Test Data
                </button>
                {/* )} */}


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <BasicInfoForm register={register} errors={errors} />
                    <AIUsageForm register={register} errors={errors} control={control} />
                    <BusinessGoalsForm register={register} errors={errors} control={control} />
                    <CriticalProcessesForm register={register} errors={errors} control={control} />
                    {hasProcessesToAnalyze && (
                        <ProcessAnalysisForm register={register} errors={errors} control={control} />
                    )}
                    <IntegrationSummaryForm register={register} errors={errors} control={control} />

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                reset({} as AwarenessFormInput);
                                resetForm();
                            }}
                            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Clear Form
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Saving...
                                </div>
                            ) : (
                                'Save Progress'
                            )}
                        </button>
                    </div>
                </form>

                {formId && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-800">
                            Form saved successfully!
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                            A PDF version of your submission will download automatically.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}