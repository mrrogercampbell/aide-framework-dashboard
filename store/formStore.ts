import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AwarenessFormInput } from '@/types/awareness';

interface FormState {
    formData: AwarenessFormInput;
    isSubmitting: boolean;
    setFormData: (data: AwarenessFormInput) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    resetForm: () => void;
}

const initialFormState: AwarenessFormInput = {
    basicInfo: {
        date: new Date().toISOString().split('T')[0],
        fullName: '',
        email: '',
        company: '',
        title: ''
    },
    aiUsage: [{
        toolName: '',
        department: '',
        purpose: ''
    }],
    businessGoals: [],
    criticalProcesses: [],
    processAnalysis: [],
    integrationSummary: []
};

export const useFormStore = create<FormState>()(
    persist(
        (set) => ({
            formData: initialFormState,
            isSubmitting: false,
            setFormData: (data) => set({ formData: data }),
            setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
            resetForm: () => set({ formData: initialFormState }),
        }),
        {
            name: 'awareness-form-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ formData: state.formData }),
            onRehydrateStorage: () => (state) => {
                console.log('State rehydrated:', state);
            },
        }
    )
);
