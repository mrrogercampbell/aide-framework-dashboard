// app/pdf-manager/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface Form {
    id: string;
    fullName: string;
    company: string;
    email: string;
    title: string;
    createdAt: string;
}

export default function PDFManagerPage() {
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedForms, setSelectedForms] = useState<Set<string>>(new Set());
    const [downloading, setDownloading] = useState(false);
    const selectAllRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchForms();
    }, []);

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = selectedForms.size > 0 && selectedForms.size < forms.length;
        }
    }, [selectedForms, forms]);

    const fetchForms = async () => {
        try {
            const response = await fetch('/api/forms');
            const data = await response.json();
            if (data.forms) {
                setForms(data.forms);
            }
        } catch (error) {
            console.error('Error fetching forms:', error);
            toast.error('Failed to load forms');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectForm = (formId: string) => {
        const newSelected = new Set(selectedForms);
        if (newSelected.has(formId)) {
            newSelected.delete(formId);
        } else {
            newSelected.add(formId);
        }
        setSelectedForms(newSelected);
    };

    // Update the handleDownloadSelected function in your PDF Manager page
    const handleDownloadSelected = async () => {
        setDownloading(true);
        try {
            for (const formId of Array.from(selectedForms)) {
                console.log('Downloading PDF for form:', formId);

                const response = await fetch(`/api/forms/${formId}/pdf`);
                const contentType = response.headers.get('content-type');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to generate PDF');
                }

                if (!contentType?.includes('application/pdf')) {
                    console.error('Unexpected content type:', contentType);
                    const text = await response.text();
                    console.error('Response body:', text);
                    throw new Error('Invalid response format');
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const form = forms.find(f => f.id === formId);
                const filename = `${form?.company || 'awareness'}-workbook.pdf`;

                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }

            toast.success(`${selectedForms.size} PDF${selectedForms.size > 1 ? 's' : ''} downloaded successfully`);
        } catch (error) {
            console.error('Error downloading PDFs:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to download PDFs');
        } finally {
            setDownloading(false);
        }
    };

    const handleDeleteSelected = async () => {
        if (!window.confirm('Are you sure you want to delete the selected forms?')) {
            return;
        }

        try {
            const response = await fetch('/api/forms/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ids: Array.from(selectedForms)
                }),
            });

            if (!response.ok) throw new Error('Failed to delete forms');

            toast.success('Forms deleted successfully');
            setSelectedForms(new Set());
            fetchForms();
        } catch (error) {
            console.error('Error deleting forms:', error);
            toast.error('Failed to delete forms');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-bold">PDF Manager</h1>
                    <p className="mt-2 text-gray-600">
                        Manage and download PDF documents generated from the awareness forms.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-2">
                    <button
                        onClick={handleDownloadSelected}
                        disabled={selectedForms.size === 0 || downloading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {downloading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Downloading...
                            </>
                        ) : (
                            'Download Selected'
                        )}
                    </button>
                    <button
                        onClick={handleDeleteSelected}
                        disabled={selectedForms.size === 0}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Delete Selected
                    </button>
                </div>
            </div>

            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedForms(new Set(forms.map(form => form.id)));
                                                    } else {
                                                        setSelectedForms(new Set());
                                                    }
                                                }}
                                                checked={selectedForms.size === forms.length && forms.length > 0}
                                                ref={selectAllRef}
                                            />
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {forms.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-3 py-4 text-sm text-gray-500 text-center">
                                                No forms found
                                            </td>
                                        </tr>
                                    ) : (
                                        forms.map((form) => (
                                            <tr key={form.id} className={selectedForms.has(form.id) ? 'bg-gray-50' : undefined}>
                                                <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                                    <input
                                                        type="checkbox"
                                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        checked={selectedForms.has(form.id)}
                                                        onChange={() => handleSelectForm(form.id)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                    {form.fullName}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                    {form.company}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                    {form.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                    {format(new Date(form.createdAt), 'MM/dd/yyyy')}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
