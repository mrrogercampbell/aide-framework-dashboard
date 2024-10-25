// components/forms/ProcessAnalysisForm.tsx
import { UseFormRegister, useFieldArray, Control, useWatch } from 'react-hook-form';
import { AwarenessFormInput } from '@/types/awareness';

interface ProcessAnalysisFormProps {
    register: UseFormRegister<AwarenessFormInput>;
    errors: any;
    control: Control<AwarenessFormInput>;
}

export function ProcessAnalysisForm({ register, errors, control }: ProcessAnalysisFormProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "processAnalysis"
    });

    // Watch criticalProcesses to get the processes marked for analysis
    const criticalProcesses = useWatch({
        control,
        name: "criticalProcesses"
    });

    const processesToAnalyze = criticalProcesses?.filter(p => p.analyzeProcess) || [];

    if (processesToAnalyze.length === 0) {
        return (
            <div className="space-y-4 bg-white p-6 rounded-lg shadow mt-6">
                <h2 className="text-xl font-bold">Process Analysis</h2>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-700">
                        No processes have been marked for analysis. Return to the Processes section and check "Analyze this process" for any processes you want to analyze in detail.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow mt-6">
            <div>
                <h2 className="text-xl font-bold">Process Analysis</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Break down each selected process into specific tasks and identify potential opportunities for AI integration.
                </p>
            </div>

            {processesToAnalyze.map((process, processIndex) => (
                <div key={process.process} className="mt-6 space-y-4">
                    <div className="border-b pb-2">
                        <h3 className="text-lg font-semibold">
                            Analyzing: {process.process}
                        </h3>
                        <p className="text-sm text-gray-600">
                            Goal: {process.goal}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => append({
                            processName: process.process,
                            goal: process.goal,
                            task: '',
                            currentIssue: ''
                        })}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 text-sm"
                    >
                        Add Task for {process.process}
                    </button>

                    <div className="space-y-4 pl-4">
                        {fields
                            .filter(field => field.processName === process.process)
                            .map((field, index) => {
                                const fieldIndex = fields.findIndex(f => f.id === field.id);
                                return (
                                    <div key={field.id} className="border rounded-md p-4 relative">
                                        <input
                                            type="hidden"
                                            {...register(`processAnalysis.${fieldIndex}.processName`)}
                                            value={process.process}
                                        />
                                        <input
                                            type="hidden"
                                            {...register(`processAnalysis.${fieldIndex}.goal`)}
                                            value={process.goal}
                                        />

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Task Description
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register(`processAnalysis.${fieldIndex}.task`, {
                                                        required: 'Task description is required'
                                                    })}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    placeholder="Describe the specific task"
                                                />
                                                {errors.processAnalysis?.[fieldIndex]?.task && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors.processAnalysis[fieldIndex].task.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Current Issues or Inefficiencies
                                                </label>
                                                <textarea
                                                    {...register(`processAnalysis.${fieldIndex}.currentIssue`, {
                                                        required: 'Please describe current issues'
                                                    })}
                                                    rows={3}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    placeholder="Describe any current issues, inefficiencies, or areas for improvement"
                                                />
                                                {errors.processAnalysis?.[fieldIndex]?.currentIssue && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors.processAnalysis[fieldIndex].currentIssue.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => remove(fieldIndex)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ))}
        </div>
    );
}