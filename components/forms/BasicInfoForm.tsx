import { UseFormRegister } from 'react-hook-form';
import { AwarenessFormInput } from '@/types/awareness';

interface BasicInfoFormProps {
    register: UseFormRegister<AwarenessFormInput>;  // Make this more specific
    errors: any;
}

export function BasicInfoForm({ register, errors }: BasicInfoFormProps) {
    return (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        {...register('basicInfo.fullName', { required: 'Full name is required' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                    />
                    {errors.basicInfo?.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.basicInfo.fullName.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register('basicInfo.email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.basicInfo?.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.basicInfo.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Company
                    </label>
                    <input
                        type="text"
                        {...register('basicInfo.company', { required: 'Company is required' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.basicInfo?.company && (
                        <p className="mt-1 text-sm text-red-600">{errors.basicInfo.company.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        {...register('basicInfo.title', { required: 'Title is required' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.basicInfo?.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.basicInfo.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="date"
                        {...register('basicInfo.date', { required: 'Date is required' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.basicInfo?.date && (
                        <p className="mt-1 text-sm text-red-600">{errors.basicInfo.date.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}