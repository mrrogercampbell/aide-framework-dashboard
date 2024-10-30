// components/forms/CriticalProcessesForm.tsx
import { UseFormRegister, useFieldArray, Control, useWatch } from 'react-hook-form';
import { AwarenessFormInput } from '@/types/awareness';
import { DeleteButton } from '@/components/buttons/DeleteButton';

interface CriticalProcessesFormProps {
    register: UseFormRegister<AwarenessFormInput>;
    errors: any;
    control: Control<AwarenessFormInput>;
}

export function CriticalProcessesForm({ register, errors, control }: CriticalProcessesFormProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "criticalProcesses"
    });

    // Watch businessGoals to populate the goal dropdown
    const businessGoals = useWatch({
        control,
        name: "businessGoals"
    });

    const goalOptions = businessGoals?.map(goal => goal.goal) || [];

    return (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow mt-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Processes for Goal Achievement</h2>
                    <p className="text-sm text-gray-600">
                        For each goal, identify the key processes involved in achieving it.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => append({ goal: '', process: '', description: '', analyzeProcess: false })}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                >
                    Add Process
                </button>
            </div>

            {goalOptions.length === 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-700">
                        Please add business goals first before defining processes.
                    </p>
                </div>
            )}

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 gap-4 p-4 border rounded-md relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Related Goal
                                </label>
                                <select
                                    {...register(`criticalProcesses.${index}.goal`, {
                                        required: 'Please select a goal'
                                    })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Select a goal...</option>
                                    {goalOptions.map((goal) => (
                                        <option key={goal} value={goal}>
                                            {goal}
                                        </option>
                                    ))}
                                </select>
                                {errors.criticalProcesses?.[index]?.goal && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.criticalProcesses[index].goal.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Process Name
                                </label>
                                <input
                                    type="text"
                                    {...register(`criticalProcesses.${index}.process`, {
                                        required: 'Process name is required'
                                    })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Enter process name"
                                />
                                {errors.criticalProcesses?.[index]?.process && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.criticalProcesses[index].process.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Process Description
                            </label>
                            <textarea
                                {...register(`criticalProcesses.${index}.description`, {
                                    required: 'Process description is required'
                                })}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Describe the process and its key steps"
                            />
                            {errors.criticalProcesses?.[index]?.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.criticalProcesses[index].description.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                {...register(`criticalProcesses.${index}.analyzeProcess`)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <label className="text-sm text-gray-700">
                                Analyze this process in detail
                            </label>
                        </div>

                        <DeleteButton
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2"
                        />
                    </div>
                ))}
            </div>

            {fields.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                    No processes added yet. Click &quot;Add Process&quot; to start.
                </div>
            )}
        </div>
    );
}