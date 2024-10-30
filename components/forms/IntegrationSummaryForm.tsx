// components/forms/IntegrationSummaryForm.tsx
import { UseFormRegister, useFieldArray, Control, useWatch } from 'react-hook-form';
import { AwarenessFormInput } from '@/types/awareness';

interface IntegrationSummaryFormProps {
    register: UseFormRegister<AwarenessFormInput>;
    errors: any;
    control: Control<AwarenessFormInput>;
}

export function IntegrationSummaryForm({ register, errors, control }: IntegrationSummaryFormProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "integrationSummary"
    });

    // Watch the entire form data
    const businessGoals = useWatch({ control, name: "businessGoals" });
    const criticalProcesses = useWatch({ control, name: "criticalProcesses" });
    const processAnalysis = useWatch({ control, name: "processAnalysis" });
    const integrationSummary = useWatch({ control, name: "integrationSummary" });

    // For debugging
    // console.log('Business Goals:', businessGoals);
    // console.log('Critical Processes:', criticalProcesses);
    // console.log('Integration Summary:', integrationSummary);

    const integrationTiers = [
        { value: 'Isolated Tool', label: 'Tier 1: Isolated Tools', description: 'Ready-made AI solutions, quick to deploy, independent of existing systems' },
        { value: 'Integrated Process', label: 'Tier 2: Integrated Processes', description: 'AI solutions tailored to business needs, enhancing functionality and connecting existing tools' },
        { value: 'Custom Enterprise Solution', label: 'Tier 3: Custom Enterprise Solutions', description: 'Fully integrated AI systems, offering maximum customization and scalability' }
    ];

    return (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow mt-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">AI Integration Opportunities Summary</h2>
                    <p className="text-sm text-gray-600">
                        Based on your analysis, identify the most promising opportunities for AI integration.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => append({
                        goal: '',
                        process: '',
                        task: '',
                        proposedSolution: '',
                        expectedBenefits: '',
                        integrationTier: 'Isolated Tool'
                    })}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                >
                    Add Opportunity
                </button>
            </div>

            {/* Integration Tiers Guide */}
            <div className="bg-gray-50 p-4 rounded-md mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Integration Tiers Guide</h3>
                <div className="space-y-2">
                    {integrationTiers.map((tier) => (
                        <div key={tier.value} className="grid grid-cols-[200px,1fr] gap-2">
                            <div className="font-medium text-sm text-gray-700">{tier.label}</div>
                            <div className="text-sm text-gray-600">{tier.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6 mt-6">
                {fields.map((field, index) => {
                    // Get the current selection
                    const currentSelection = integrationSummary?.[index] || {};

                    return (
                        <div key={field.id} className="border rounded-md p-6 relative">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Business Goal
                                    </label>
                                    <select
                                        {...register(`integrationSummary.${index}.goal`, {
                                            required: 'Please select a goal'
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                    >
                                        <option value="">Select a goal...</option>
                                        {businessGoals?.map((goal) => (
                                            <option key={goal.goal} value={goal.goal}>
                                                {goal.goal}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.integrationSummary?.[index]?.goal && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.integrationSummary[index].goal.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Process
                                    </label>
                                    <select
                                        {...register(`integrationSummary.${index}.process`, {
                                            required: 'Please select a process'
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                    >
                                        <option value="">Select a process...</option>
                                        {criticalProcesses
                                            ?.filter(process => process.goal === currentSelection.goal)
                                            .map((process) => (
                                                <option key={process.process} value={process.process}>
                                                    {process.process}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.integrationSummary?.[index]?.process && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.integrationSummary[index].process.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Task
                                    </label>
                                    <select
                                        {...register(`integrationSummary.${index}.task`, {
                                            required: 'Please select a task'
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                    >
                                        <option value="">Select a task...</option>
                                        {processAnalysis
                                            ?.filter(analysis => analysis.processName === currentSelection.process)
                                            .map((analysis) => (
                                                <option key={analysis.task} value={analysis.task}>
                                                    {analysis.task}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.integrationSummary?.[index]?.task && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.integrationSummary[index].task.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Integration Tier
                                    </label>
                                    <select
                                        {...register(`integrationSummary.${index}.integrationTier`, {
                                            required: 'Please select an integration tier'
                                        })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                    >
                                        <option value="">Select a tier...</option>
                                        {integrationTiers.map((tier) => (
                                            <option key={tier.value} value={tier.value}>
                                                {tier.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.integrationSummary?.[index]?.integrationTier && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.integrationSummary[index].integrationTier.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Proposed AI Solution
                                    </label>
                                    <textarea
                                        {...register(`integrationSummary.${index}.proposedSolution`, {
                                            required: 'Please describe the proposed solution'
                                        })}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                        placeholder="Describe the AI solution you propose for this task"
                                    />
                                    {errors.integrationSummary?.[index]?.proposedSolution && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.integrationSummary[index].proposedSolution.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Expected Benefits
                                    </label>
                                    <textarea
                                        {...register(`integrationSummary.${index}.expectedBenefits`, {
                                            required: 'Please describe the expected benefits'
                                        })}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                        placeholder="Describe the expected benefits and impact of this AI solution"
                                    />
                                    {errors.integrationSummary?.[index]?.expectedBenefits && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.integrationSummary[index].expectedBenefits.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {fields.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                    No integration opportunities added yet. Click &quot;Add Opportunity&quot; to start.
                </div>
            )}
        </div>
    );
}