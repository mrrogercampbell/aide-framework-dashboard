// components/forms/AIUsageForm.tsx
import { UseFormRegister, useFieldArray } from 'react-hook-form';
import { AIUsage } from '@/types/awareness';

interface AIUsageFormProps {
    register: UseFormRegister<any>;
    errors: any;
    control: any;
}

export function AIUsageForm({ register, errors, control }: AIUsageFormProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'aiUsage'
    });

    return (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow mt-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Current AI Tool Usage</h2>
                <button
                    type="button"
                    onClick={() => append({ toolName: '', department: '', purpose: '' })}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                >
                    Add Tool
                </button>
            </div>

            {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            AI Tool Name
                        </label>
                        <input
                            type="text"
                            {...register(`aiUsage.${index}.toolName`, { required: 'Tool name is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.aiUsage?.[index]?.toolName && (
                            <p className="mt-1 text-sm text-red-600">{errors.aiUsage[index].toolName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <input
                            type="text"
                            {...register(`aiUsage.${index}.department`, { required: 'Department is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.aiUsage?.[index]?.department && (
                            <p className="mt-1 text-sm text-red-600">{errors.aiUsage[index].department.message}</p>
                        )}
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Primary Purpose
                        </label>
                        <input
                            type="text"
                            {...register(`aiUsage.${index}.purpose`, { required: 'Purpose is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.aiUsage?.[index]?.purpose && (
                            <p className="mt-1 text-sm text-red-600">{errors.aiUsage[index].purpose.message}</p>
                        )}
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}