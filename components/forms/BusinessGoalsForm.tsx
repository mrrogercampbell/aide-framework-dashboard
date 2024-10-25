// components/forms/BusinessGoalsForm.tsx
import { UseFormRegister, useFieldArray, Control } from 'react-hook-form';
import { AwarenessFormInput } from '@/types/awareness';

interface BusinessGoalsFormProps {
    register: UseFormRegister<AwarenessFormInput>;
    errors: any;
    control: Control<AwarenessFormInput>;
}

export function BusinessGoalsForm({ register, errors, control }: BusinessGoalsFormProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "businessGoals"
    });

    const handleAddGoal = () => {
        if (fields.length < 3) {
            append({ rank: fields.length + 1, goal: '', importance: '' });
        }
    };

    return (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow mt-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Key Business Goals</h2>
                    <p className="text-sm text-gray-600">What are your top 1-3 business or team goals for the next year?</p>
                </div>
                <button
                    type="button"
                    onClick={handleAddGoal}
                    disabled={fields.length >= 3}
                    className={`px-4 py-2 rounded-md ${fields.length >= 3
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                        }`}
                >
                    Add Goal
                </button>
            </div>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 gap-4 p-4 border rounded-md relative">
                        <div className="absolute top-2 right-2 text-sm font-semibold text-gray-500">
                            Rank: {index + 1}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Goal
                            </label>
                            <input
                                type="text"
                                {...register(`businessGoals.${index}.goal`, {
                                    required: 'Goal description is required'
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Enter your business goal"
                            />
                            {errors.businessGoals?.[index]?.goal && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.businessGoals[index].goal.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Why is this goal important?
                            </label>
                            <textarea
                                {...register(`businessGoals.${index}.importance`, {
                                    required: 'Please explain the importance of this goal'
                                })}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Explain why this goal is important"
                            />
                            {errors.businessGoals?.[index]?.importance && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.businessGoals[index].importance.message}
                                </p>
                            )}
                        </div>

                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-2 right-12 text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {fields.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                    No goals added yet. Click "Add Goal" to start.
                </div>
            )}
        </div>
    );
}